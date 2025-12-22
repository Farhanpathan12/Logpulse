"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Heart, Sparkles, Eye, Calendar, MoreHorizontal, Trash2, Edit2, Clock } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { CreateUpdateDialog } from "@/components/dashboard/create-update-dialog";
import { DeletePostDialog } from "@/components/dashboard/delete-post-dialog";
import { SettingsForm } from "@/components/dashboard/settings-form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AudienceTab } from "@/components/dashboard/audience-tab";
import { SecurityForm } from "@/components/dashboard/security-form";
import { AnalyticsView } from "@/components/dashboard/analytics-view";

interface ProjectTabsProps {
    project: any;
    plan: string;
}

export function ProjectTabs({ project, plan }: ProjectTabsProps) {
    return (
        <Tabs defaultValue="updates" className="space-y-8">
            <div className="flex items-center justify-between">
                <TabsList className="bg-zinc-900/50 p-1 rounded-full border border-white/10 inline-flex h-auto gap-1 backdrop-blur-sm">
                    <TabsTrigger
                        value="updates"
                        className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg text-zinc-500 hover:text-zinc-300"
                    >
                        Updates
                    </TabsTrigger>
                    <TabsTrigger
                        value="analytics"
                        className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg text-zinc-500 hover:text-zinc-300"
                    >
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger
                        value="audience"
                        className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg text-zinc-500 hover:text-zinc-300"
                    >
                        Audience
                    </TabsTrigger>
                    <TabsTrigger
                        value="settings"
                        className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg text-zinc-500 hover:text-zinc-300"
                    >
                        Settings & Customization
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg text-zinc-500 hover:text-zinc-300"
                    >
                        Security
                    </TabsTrigger>
                    <TabsTrigger
                        value="widget"
                        className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg text-zinc-500 hover:text-zinc-300"
                    >
                        Installation
                    </TabsTrigger>
                </TabsList>
            </div>

            {/* Updates Tab - Redesigned Timeline/Card UI */}
            <TabsContent value="updates" className="space-y-8">
                {project.posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
                        <div className="h-20 w-20 rounded-full bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800 shadow-inner">
                            <Sparkles className="h-8 w-8 text-zinc-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No updates yet</h3>
                        <p className="text-zinc-500 max-w-sm mb-8 text-sm">
                            Share your first product update to engage your users. It only takes a minute.
                        </p>
                        <CreateUpdateDialog
                            projectId={project.id}
                            trigger={
                                <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-12 font-medium">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create First Update
                                </Button>
                            }
                        />
                    </div>
                ) : (
                    <div className="relative space-y-8">
                        {/* Timeline Line */}
                        <div className="absolute left-24 top-4 bottom-4 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent hidden md:block" />

                        {project.posts.map((post: any) => {
                            const isScheduled = post.scheduledFor && new Date(post.scheduledFor) > new Date();
                            return (
                                <div key={post.id} className="relative pl-0 md:pl-32 group">
                                    {/* Timeline Dot */}
                                    <div className={`absolute left-[90px] top-8 w-3 h-3 rounded-full border-2 transition-all z-10 hidden md:block ${isScheduled ? 'bg-amber-500 border-amber-500/20 group-hover:border-amber-500/60' : 'bg-black border-white/20 group-hover:border-white/60 group-hover:scale-125'}`} />

                                    {/* Date Label (Mobile: Top, Desktop: Left) */}
                                    <div className="md:absolute md:left-0 md:top-[30px] md:w-24 md:text-right pr-6 mb-2 md:mb-0">
                                        <div className="flex flex-col items-end">
                                            <span className={`text-xs font-mono transition-colors ${isScheduled ? 'text-amber-500 font-bold' : 'text-zinc-500 group-hover:text-white'}`}>
                                                {isScheduled
                                                    ? new Date(post.scheduledFor).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                                    : new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                                }
                                            </span>
                                            {isScheduled && <span className="text-[10px] text-amber-500/80 hidden md:block">Scheduled</span>}
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <div className={`glass-gradient rounded-3xl p-1 border transition-all duration-500 ${isScheduled ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/5 group-hover:border-white/10'}`}>
                                        <div className="bg-black/40 rounded-[22px] p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
                                            {isScheduled && (
                                                <div className="absolute top-0 right-0 bg-amber-500/10 border-l border-b border-amber-500/20 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wider">
                                                    <Clock className="w-3 h-3" />
                                                    <span>Scheduled Release</span>
                                                </div>
                                            )}

                                            <div className="flex items-start justify-between gap-4 mb-4">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <Badge
                                                            variant="outline"
                                                            className={`uppercase text-[10px] tracking-widest font-bold px-3 py-1 border-0 rounded-full ${post.category === 'NEW' ? 'bg-blue-500/10 text-blue-400' :
                                                                post.category === 'IMPROVED' ? 'bg-emerald-500/10 text-emerald-400' :
                                                                    'bg-orange-500/10 text-orange-400'
                                                                }`}
                                                        >
                                                            {post.category}
                                                        </Badge>
                                                        {isScheduled && (
                                                            <span className="text-xs text-amber-500 font-mono flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {new Date(post.scheduledFor).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                                                        {post.title}
                                                    </h3>
                                                </div>

                                                {/* Actions Dropdown */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full" suppressHydrationWarning>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-zinc-200">
                                                        <CreateUpdateDialog
                                                            projectId={project.id}
                                                            post={post}
                                                            trigger={
                                                                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-zinc-800 hover:text-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
                                                                    <Edit2 className="mr-2 h-4 w-4" />
                                                                    <span>Edit</span>
                                                                </div>
                                                            }
                                                        />
                                                        <DeletePostDialog
                                                            projectId={project.id}
                                                            postId={post.id}
                                                            trigger={
                                                                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-900/20 hover:text-red-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-red-500">
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    <span>Delete</span>
                                                                </div>
                                                            }
                                                        />
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            <div
                                                className="prose prose-invert max-w-none mb-6 text-zinc-400 text-sm md:text-base leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: post.content }}
                                            />

                                            <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                                                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                    <Heart className="h-4 w-4" />
                                                    <span>{post.reactions.reduce((acc: number, r: any) => acc + r.count, 0)} Reactions</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                                    <Eye className="h-4 w-4" />
                                                    <span>{post.views} Views</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
                <AnalyticsView dailyStats={project.dailyStats || []} />
            </TabsContent>

            {/* Audience Tab */}
            <TabsContent value="audience" className="space-y-6">
                <AudienceTab subscribers={project.subscribers || []} />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
                <SettingsForm project={project} plan={plan} />
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
                <SecurityForm project={project} />
            </TabsContent>

            {/* Widget Code Tab */}
            <TabsContent value="widget" className="space-y-6">
                <Card className="bg-zinc-900/30 border-white/5">
                    <CardHeader>
                        <CardTitle className="text-white">Installation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm text-zinc-400">Copy and paste this code snippet into your website's <code className="text-indigo-400">&lt;body&gt;</code> tag.</p>
                            <div className="relative rounded-lg bg-black border border-white/10 p-6 font-mono text-sm">
                                <code className="break-all text-zinc-300">
                                    &lt;script src="{process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/widget.js" data-project-id="{project.id}"&gt;&lt;/script&gt;
                                </code>
                                <div className="absolute top-4 right-4">
                                    <CopyButton value={`<script src="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/widget.js" data-project-id="${project.id}"></script>`} />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
