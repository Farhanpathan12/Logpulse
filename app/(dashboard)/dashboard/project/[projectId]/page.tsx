import { auth } from "@clerk/nextjs/server";
import { getUserPlan } from "@/app/actions";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Heart, Sparkles, Eye, Activity, Zap, ArrowRight } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { CreateUpdateDialog } from "@/components/dashboard/create-update-dialog";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { ProjectTabs } from "@/components/dashboard/project-tabs";

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const userPlan = await getUserPlan();

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
            posts: {
                orderBy: { createdAt: "desc" },
                include: {
                    reactions: true
                }
            },
            subscribers: {
                orderBy: { createdAt: "desc" }
            },
            owner: {
                select: {
                    plan: true
                }
            },
            dailyStats: {
                orderBy: { date: "asc" },
                take: 30
            }
        },
    });

    if (!project || project.ownerId !== userId) {
        redirect("/dashboard");
    }

    // Calculate Stats
    const totalViews = project.posts.reduce((acc, post) => acc + post.views, 0);
    const totalReactions = project.posts.reduce((acc, post) => acc + post.reactions.reduce((rAcc, r) => rAcc + r.count, 0), 0);

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            {/* Header Section */}
            <div className="flex flex-col gap-8 border-b border-white/5 pb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-black/50 bg-zinc-900 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                            {project.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight text-white">{project.name}</h1>
                            <a href={`http://${project.domain}`} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                                {project.domain}
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild className="h-11 border-zinc-800 bg-black text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all rounded-full px-6">
                            <a href={`http://${project.domain}`} target="_blank" rel="noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit Site
                            </a>
                        </Button>
                        <CreateUpdateDialog
                            projectId={project.id}
                            plan={userPlan}
                            trigger={
                                <div className="inline-flex h-11 animate-background-shine items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black cursor-pointer hover:scale-105 transform duration-200 text-sm shadow-lg shadow-black/50">
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Update
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Stats Grid - Redesigned for Premium Monochrome */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/30 p-6 transition-all hover:bg-zinc-900/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Views</p>
                            <p className="text-3xl font-bold text-white tracking-tight">{totalViews.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Eye className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/30 p-6 transition-all hover:bg-zinc-900/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Reactions</p>
                            <p className="text-3xl font-bold text-white tracking-tight">{totalReactions.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Heart className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/30 p-6 transition-all hover:bg-zinc-900/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <p className="text-lg font-bold text-white">Operational</p>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Activity className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Tabs - Passing Plan */}
            <ProjectTabs project={project} plan={project.owner.plan || "FREE"} />
        </div>
    );
}
