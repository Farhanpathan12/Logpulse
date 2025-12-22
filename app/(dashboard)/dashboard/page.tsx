import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, AlertCircle, Folder, ArrowUpRight, Clock, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Project } from "@prisma/client";

export default async function DashboardPage() {
    const { userId } = await auth();
    if (!userId) redirect("/");

    let projects: Project[] = [];
    let dbError = false;

    try {
        projects = await prisma.project.findMany({
            where: { ownerId: userId },
            orderBy: { id: "desc" },
        });
    } catch (error) {
        console.warn("Failed to fetch projects (DB might be unreachable):", (error as Error).message);
        dbError = true;
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                        Overview
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-md">
                        Manage your projects and track your changelog performance.
                    </p>
                </div>
                <Link href="/dashboard/new">
                    <div className="inline-flex h-12 animate-background-shine items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black cursor-pointer hover:scale-105 transform duration-200">
                        <Plus className="w-5 h-5 mr-2" /> Create Project
                    </div>
                </Link>
            </div>

            {dbError && (
                <Alert variant="destructive" className="bg-red-950/20 border-red-900/50 text-red-400 backdrop-blur-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Database Connection Error</AlertTitle>
                    <AlertDescription>
                        Could not connect to the database. Please check your connection or try again later.
                    </AlertDescription>
                </Alert>
            )}

            {projects.length === 0 && !dbError ? (
                <div className="relative group overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm p-12 text-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-zinc-950 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-black/50 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                            <Folder className="w-10 h-10 text-zinc-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No projects yet</h3>
                        <p className="text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
                            Start your journey by creating your first project. It only takes a few seconds to get set up.
                        </p>
                        <Link href="/dashboard/new">
                            <Button variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 rounded-full px-8">
                                Create Project
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <Link
                            key={project.id}
                            href={`/dashboard/project/${project.id}`}
                            className="group relative"
                        >
                            {/* Card Container with Glass Gradient */}
                            <div className="relative h-full glass-gradient rounded-3xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] border border-white/10">
                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-inner border border-white/10 bg-zinc-900">
                                        {project.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-white/5">
                                        <ArrowUpRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="mt-auto space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-zinc-300 transition-colors">{project.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                                            <Globe className="w-3 h-3" />
                                            {project.domain}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-zinc-500">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" />
                                            <span>Updated recently</span>
                                        </div>
                                        <div className="px-2 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400 flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                            Active
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* "Add New" Card (Always visible at the end) */}
                    <Link href="/dashboard/new" className="group relative min-h-[240px] flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-zinc-800 hover:border-zinc-600 hover:bg-white/5 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-zinc-900">
                            <Plus className="w-8 h-8 text-zinc-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-zinc-500 font-medium group-hover:text-zinc-300 transition-colors">Create New Project</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
