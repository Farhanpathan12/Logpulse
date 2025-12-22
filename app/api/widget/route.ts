import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Helper to check origin
// Helper to check origin
function isOriginAllowed(origin: string | null, projectDomain: string | null, allowedOrigins: string[] = []) {
    if (!origin) return true;

    // Always allow Localhost & LogPulse Dashboard
    if (origin.includes("localhost") || origin.includes("127.0.0.1") || origin === "https://logpulse.dev") return true;

    // Strict Mode: Check allowedOrigins list
    if (allowedOrigins.length > 0) {
        const cleanOrigin = origin.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "").toLowerCase();
        return allowedOrigins.some(allowed => allowed.toLowerCase() === cleanOrigin);
    }

    // Public Mode: If list is empty, allow ALL (or at least the project domain)
    return true;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const origin = request.headers.get("origin");

    // 1. Validation
    if (!projectId) {
        return NextResponse.json(
            { error: "Missing projectId" },
            { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
        );
    }

    try {
        // 3. Response - Fetch Project
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            select: {
                name: true,
                domain: true,
                brandColor: true,
                widgetPosition: true,
                widgetIcon: true,
                widgetTheme: true,
                allowedOrigins: true,
                // Plan Specific Features
                removeBranding: true,
                customCSS: true,
                owner: {
                    select: {
                        plan: true
                    }
                }
            },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
            );
        }

        // === SECURITY CHECK: CORS ===
        if (!isOriginAllowed(origin, project.domain, project.allowedOrigins)) {
            return NextResponse.json(
                { error: "Unauthorized Domain" },
                { status: 403, headers: { "Access-Control-Allow-Origin": origin || "*" } }
            );
        }
        // ============================

        // ENFORCE PLAN LIMITS
        // @ts-ignore - DB types might be syncing
        const plan = project.owner?.plan || "FREE";
        const isFree = plan === "FREE";

        const sanitizedProject = {
            ...project,
            // Free users cannot remove branding or use custom CSS
            removeBranding: isFree ? false : project.removeBranding,
            customCSS: isFree ? null : project.customCSS,
            // Security Flags
            isPro: !isFree,
            // Do not leak owner info
            owner: undefined
        };

        // 2. The Query (Prisma) - Fetch Posts
        const posts = await prisma.post.findMany({
            where: {
                projectId: projectId,
                published: true,
                OR: [
                    { scheduledFor: null },
                    { scheduledFor: { lte: new Date() } }
                ]
            },
            orderBy: {
                createdAt: "desc",
            },
            // Free Plan Limit: 10 Posts. Paid: 50 (or 100)
            take: isFree ? 10 : 50,
            select: {
                id: true,
                title: true,
                content: true,
                category: true,
                createdAt: true,
                published: true,
                views: true,
                reactions: {
                    select: {
                        emoji: true,
                        count: true,
                    },
                },
            },
        });

        // 4. CORS & Return
        return NextResponse.json(
            { project: sanitizedProject, posts },
            {
                status: 200,
                headers: {
                    // Return the specific allowed origin instead of *
                    "Access-Control-Allow-Origin": origin || "*",
                    "Cache-Control": "no-store, max-age=0",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching widget data:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
        );
    }
}

export async function POST(request: Request) {
    const origin = request.headers.get("origin");

    try {
        const body = await request.json();
        const { postId, emoji, action } = body; // action: 'like' | 'unlike'

        if (!postId || !emoji) {
            return NextResponse.json(
                { error: "Missing postId or emoji" },
                { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
            );
        }

        // Fetch Post to check Project Domain
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { project: true }
        });

        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
            );
        }

        // === SECURITY CHECK: CORS ===
        if (!isOriginAllowed(origin, post.project.domain)) {
            return NextResponse.json(
                { error: "Unauthorized Domain" },
                { status: 403, headers: { "Access-Control-Allow-Origin": origin || "*" } }
            );
        }
        // ============================

        let reaction;

        if (action === 'unlike') {
            // Decrement count, but don't go below 0
            // We first need to check if it exists to avoid errors
            const existing = await prisma.reaction.findUnique({
                where: {
                    postId_emoji: { postId, emoji }
                }
            });

            if (existing && existing.count > 0) {
                reaction = await prisma.reaction.update({
                    where: {
                        postId_emoji: { postId, emoji }
                    },
                    data: {
                        count: { decrement: 1 }
                    }
                });
            } else {
                // If it doesn't exist or is 0, return current state (or 0)
                reaction = existing || { count: 0 };
            }
        } else {
            // Default to 'like' (increment)
            reaction = await prisma.reaction.upsert({
                where: {
                    postId_emoji: {
                        postId,
                        emoji,
                    },
                },
                update: {
                    count: { increment: 1 },
                },
                create: {
                    postId,
                    emoji,
                    count: 1,
                },
            });
        }

        return NextResponse.json(
            { success: true, count: reaction.count },
            {
                status: 200,
                headers: {
                    "Access-Control-Allow-Origin": origin || "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            }
        );
    } catch (error) {
        console.error("Error toggling reaction:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
        );
    }
}

export async function OPTIONS() {
    return NextResponse.json(
        {},
        {
            headers: {
                "Access-Control-Allow-Origin": "*", // For OPTIONS, we can be lenient or strict. * is easier for preflight.
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        }
    );
}
