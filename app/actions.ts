"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PostCategory } from "@prisma/client";
import { utapi } from "@/lib/utapi";

// --- USER ACTIONS ---

export async function getUserPlan() {
    const { userId } = await auth();
    if (!userId) return "FREE";

    const user = await prisma.user.findUnique({
        where: { id: userId },
        // @ts-ignore
        select: { plan: true }
    });

    // @ts-ignore
    return user?.plan || "FREE";
}

// --- PROJECT ACTIONS ---

export async function createProject(data: { name: string; domain: string; brandColor: string }) {
    const user = await currentUser();
    if (!user) return { error: "Unauthorized" };

    if (!data.name || !data.domain) {
        return { error: "Missing required fields" };
    }

    try {
        // Ensure user exists in DB and get their plan + project count
        // Upsert to ensure they exist
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: {
                id: user.id,
                email: user.emailAddresses[0].emailAddress,
            },
        });

        // Fetch checks
        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            include: {
                _count: {
                    select: { projects: true }
                }
            }
        });

        if (!dbUser) throw new Error("User not found");

        // LIMITS ENFORCEMENT
        const projectCount = dbUser._count.projects;
        // @ts-ignore - Plan field exists in DB but types might be locked by EPERM
        const plan = dbUser.plan || "FREE"; // Default to FREE

        if (plan === "FREE" && projectCount >= 1) {
            return { error: "Free Plan Limit: You can only create 1 Project. Upgrade to Pro." };
        }
        if (plan === "PRO" && projectCount >= 5) {
            return { error: "Pro Plan Limit: You can create up to 5 Projects. Upgrade to Business." };
        }

        const project = await prisma.project.create({
            data: {
                ...data,
                ownerId: user.id,
            },
        });
        return { id: project.id };
    } catch (error: any) {
        console.error("Failed to create project:", error);
        return { error: error.message || "Failed to create project" };
    }
}

export async function updateProject(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const projectId = formData.get("projectId") as string;
    const name = formData.get("name") as string;
    const domain = formData.get("domain") as string;
    const brandColor = formData.get("brandColor") as string;
    const widgetPosition = formData.get("widgetPosition") as string;
    const widgetIcon = formData.get("widgetIcon") as string;
    const widgetTheme = formData.get("widgetTheme") as string;
    const allowedOriginsString = formData.get("allowedOrigins") as string;

    // Pro Features
    const customCSS = formData.get("customCSS") as string;
    const removeBranding = formData.get("removeBranding") === "true";

    // Business Features
    const webhookUrl = formData.get("webhookUrl") as string;

    let allowedOrigins: string[] | undefined;
    if (allowedOriginsString) {
        try {
            allowedOrigins = JSON.parse(allowedOriginsString);
        } catch (e) {
            console.error("Failed to parse allowedOrigins", e);
        }
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { owner: true } // Include owner to check plan
    });

    if (!project || project.ownerId !== userId) {
        throw new Error("Unauthorized");
    }

    // Enforce Plan Limits
    // @ts-ignore
    const plan = project.owner.plan || "FREE";

    const updates: any = {
        name,
        domain,
        brandColor,
        widgetPosition,
        widgetIcon,
        widgetTheme,
        ...(allowedOrigins !== undefined && { allowedOrigins }),
    };

    // Only allow Pro features if on Pro/Business plan
    if (plan === "PRO" || plan === "BUSINESS") {
        updates.customCSS = customCSS;
        updates.removeBranding = removeBranding;
    }

    // Only allow Business features if on Business plan
    if (plan === "BUSINESS") {
        updates.webhookUrl = webhookUrl;
    }

    await prisma.project.update({
        where: { id: projectId },
        data: updates,
    });

    revalidatePath(`/dashboard/project/${projectId}`);
}

export async function deleteProject(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const projectId = formData.get("projectId") as string;

    const project = await prisma.project.findUnique({
        where: { id: projectId },
    });

    if (!project || project.ownerId !== userId) {
        throw new Error("Unauthorized");
    }

    await prisma.project.delete({
        where: { id: projectId },
    });

    redirect("/dashboard");
}

// --- POST ACTIONS ---

export async function createPost(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as PostCategory;
    const projectId = formData.get("projectId") as string;
    const scheduledForString = formData.get("scheduledFor") as string;
    const scheduledFor = scheduledForString ? new Date(scheduledForString) : null;

    if (!title || !content || !category || !projectId) {
        throw new Error("Missing required fields");
    }

    // Verify ownership via project
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
            owner: { select: { plan: true } }
        }
    });

    if (!project || project.ownerId !== userId) {
        throw new Error("Unauthorized");
    }

    const post = await prisma.post.create({
        data: {
            title,
            content,
            category,
            projectId,
            published: true,
            scheduledFor,
        },
    });

    // Fire Webhook (Business Feature)
    // @ts-ignore
    if (project.webhookUrl) {
        try {
            // @ts-ignore
            console.log(`Firing webhook for Project ${projectId} to ${project.webhookUrl}`);
            // Fire and forget
            // @ts-ignore
            fetch(project.webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event: "post.created",
                    post: {
                        id: post.id,
                        title: post.title,
                        category: post.category,
                        content: post.content.substring(0, 200) + "...",
                        publishedAt: post.createdAt,
                    },
                    project: {
                        id: project.id,
                        name: project.name
                    }
                }),
            }).catch(err => console.error("Webhook fetch failed:", err));
        } catch (e) {
            console.error("Webhook Trigger Error:", e);
        }
    }

    // Send Email Newsletter (Pro & Business Feature)
    const sendNewsletter = formData.get("sendNewsletter") === "on";

    // @ts-ignore
    if ((project.owner.plan === "PRO" || project.owner.plan === "BUSINESS") && sendNewsletter) {
        try {
            const subscribers = await prisma.subscriber.findMany({
                where: { projectId: project.id }
            });

            if (subscribers.length > 0) {
                console.log(`Sending email to ${subscribers.length} subscribers for ${project.name}`);
                const { resend } = await import("@/lib/resend");

                await Promise.all(subscribers.map(sub =>
                    resend.emails.send({
                        from: `updates@logpulse.com`, // Ideally verifies domain, but using default/verified sender
                        to: sub.email,
                        subject: `New Update: ${title}`,
                        html: `
                            <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                                <h1>${title}</h1>
                                <p><strong>${project.name}</strong> has a new update!</p>
                                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                                <div style="color: #333; line-height: 1.6;">
                                    ${post.content.substring(0, 300)}...
                                </div>
                                <div style="margin-top: 30px;">
                                    <a href="https://${project.domain || 'logpulse.com'}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Read Full Update</a>
                                </div>
                            </div>
                        `
                    }).catch(e => console.error(`Failed to send to ${sub.email}`, e))
                ));
            }
        } catch (error) {
            console.error("Newsletter Error:", error);
        }
    }

    revalidatePath(`/dashboard/project/${projectId}`);
}

export async function updatePost(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const postId = formData.get("postId") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as PostCategory;
    const projectId = formData.get("projectId") as string;
    const scheduledForString = formData.get("scheduledFor") as string;
    const scheduledFor = scheduledForString ? new Date(scheduledForString) : null;

    // Verify ownership via project
    const project = await prisma.project.findUnique({
        where: { id: projectId },
    });

    if (!project || project.ownerId !== userId) {
        throw new Error("Unauthorized");
    }

    const post = await prisma.post.update({
        where: { id: postId },
        data: { title, content, category, scheduledFor },
    });

    // Fire Webhook (Business Feature)
    // @ts-ignore
    if (project.webhookUrl) {
        try {
            // @ts-ignore
            console.log(`Firing webhook update for Project ${projectId} to ${project.webhookUrl}`);
            // @ts-ignore
            fetch(project.webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event: "post.updated",
                    post: {
                        id: post.id,
                        title: post.title,
                        category: post.category,
                        content: post.content.substring(0, 200) + "...",
                        updatedAt: post.updatedAt,
                    },
                    project: {
                        id: project.id,
                        name: project.name
                    }
                }),
            }).catch(err => console.error("Webhook fetch failed:", err));
        } catch (e) {
            console.error("Webhook Trigger Error:", e);
        }
    }

    revalidatePath(`/dashboard/project/${projectId}`);
}

export async function deletePost(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const postId = formData.get("postId") as string;
    const projectId = formData.get("projectId") as string;

    // Verify ownership via project
    const project = await prisma.project.findUnique({
        where: { id: projectId },
    });

    if (!project || project.ownerId !== userId) {
        throw new Error("Unauthorized");
    }

    // Fetch post content to get image URL
    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (post) {
        // Extract image URL from content
        const imageMatch = post.content.match(/src=["'](.*?)["']/);
        if (imageMatch && imageMatch[1]) {
            const imageUrl = imageMatch[1];
            const fileKey = imageUrl.split("/f/")[1];

            if (fileKey) {
                try {
                    console.log("Deleting image from UploadThing:", fileKey);
                    await utapi.deleteFiles(fileKey);
                } catch (error) {
                    console.error("Failed to delete image from UploadThing:", error);
                }
            }
        }
    }

    await prisma.post.delete({
        where: { id: postId },
    });

    revalidatePath(`/dashboard/project/${projectId}`);
}
