"use client";

import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, BarChart3, Settings, Layers, Zap, Crown, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { UpgradeModal } from "./upgrade-modal";

interface SidebarProps {
    plan: string;
}

export function Sidebar({ plan }: SidebarProps) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <aside className="w-72 hidden md:flex flex-col fixed top-4 bottom-4 left-4 z-20 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl shadow-black/90 ring-1 ring-white/10">
            {/* Logo Area */}
            <div className="p-6 pb-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white blur-lg opacity-10 group-hover:opacity-20 transition-opacity" />
                        <div className="relative bg-gradient-to-br from-zinc-800 to-black p-2 rounded-xl shadow-lg shadow-white/5 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-white tracking-tight leading-none">LogPulse</span>
                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest mt-0.5">Back to Home</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                <div className="px-2 mb-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Menu</div>

                <Link
                    href="/dashboard"
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all group",
                        pathname === "/dashboard" || pathname?.startsWith("/dashboard/project") || pathname === "/dashboard/new"
                            ? "bg-white/10 text-white shadow-lg shadow-black/20 border border-white/10"
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                    )}
                >
                    <LayoutDashboard className={cn("w-4 h-4 transition-colors",
                        pathname === "/dashboard" || pathname?.startsWith("/dashboard/project") ? "text-white" : "text-zinc-500 group-hover:text-white"
                    )} />
                    Projects
                </Link>

                <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-600 cursor-not-allowed opacity-60">
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                    <span className="ml-auto text-[9px] font-bold bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded-md border border-zinc-800">
                        SOON
                    </span>
                </div>

                <Link
                    href="/docs"
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all group",
                        pathname?.startsWith("/docs")
                            ? "bg-white/10 text-white shadow-lg shadow-black/20 border border-white/10"
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                    )}
                >
                    <BookOpen className={cn("w-4 h-4 transition-colors",
                         pathname?.startsWith("/docs") ? "text-white" : "text-zinc-500 group-hover:text-white"
                    )} />
                    Documentation
                </Link>

                <Link
                    href="/dashboard/settings"
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all group",
                        pathname?.startsWith("/dashboard/settings")
                            ? "bg-white/10 text-white shadow-lg shadow-black/20 border border-white/10"
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                    )}
                >
                    <Settings className={cn("w-4 h-4 transition-colors",
                        pathname?.startsWith("/dashboard/settings") ? "text-white" : "text-zinc-500 group-hover:text-white"
                    )} />
                    Settings
                </Link>
            </nav>

            {/* Pro Banner - Only show if FREE */}
            {(plan === "FREE" || !plan) && (
                <div className="p-4 mt-auto">
                    <div
                        onClick={() => setShowUpgradeModal(true)}
                        className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-4 relative overflow-hidden group cursor-pointer hover:border-indigo-500/50 transition-colors"
                    >
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="p-2 bg-white/10 rounded-lg border border-white/5 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
                                <Zap className="w-4 h-4 text-white fill-white group-hover:text-indigo-400 group-hover:fill-indigo-400 transition-colors" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white group-hover:text-indigo-100">Upgrade Plan</div>
                                <div className="text-[10px] text-zinc-400 group-hover:text-indigo-200/70">Unlock Pro features</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Plan Indicator for Paid Users (Premium UI) */}
            {(plan === "PRO" || plan === "BUSINESS") && (
                <div className="px-4 mt-auto pb-6">
                    <div
                        onClick={() => setShowUpgradeModal(true)}
                        className={cn(
                            "group relative overflow-hidden rounded-xl border p-3 transition-all duration-300 cursor-pointer",
                            plan === "PRO"
                                ? "bg-indigo-950/10 border-indigo-500/20 hover:border-indigo-500/40 hover:bg-indigo-950/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                                : "bg-emerald-950/10 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-950/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                        )}
                    >
                        {/* Animated Gradient Shine */}
                        <div className={cn(
                            "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-[linear-gradient(110deg,transparent,45%,rgba(255,255,255,0.1),55%,transparent)] bg-[length:200%_100%] animate-shine pointer-events-none"
                        )} />

                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "flex items-center justify-center w-8 h-8 rounded-lg shadow-lg ring-1 ring-inset ring-white/10",
                                    plan === "PRO" ? "bg-indigo-600 shadow-indigo-500/20" : "bg-emerald-600 shadow-emerald-500/20"
                                )}>
                                    {plan === "PRO" ? (
                                        <Zap className="w-4 h-4 text-white fill-white" />
                                    ) : (
                                        <Crown className="w-4 h-4 text-white fill-white" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className={cn(
                                        "text-xs font-bold tracking-wide uppercase flex items-center gap-1.5",
                                        plan === "PRO" ? "text-indigo-200" : "text-emerald-200"
                                    )}>
                                        {plan}
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    </div>
                                    <div className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                        Manage Subscription
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className={cn(
                                "w-4 h-4 transition-transform duration-300 group-hover:translate-x-1",
                                plan === "PRO" ? "text-indigo-500 group-hover:text-indigo-400" : "text-emerald-500 group-hover:text-emerald-400"
                            )} />
                        </div>
                    </div>
                </div>
            )}

            <UpgradeModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />

            {/* User Profile */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-9 h-9">
                        {mounted ? (
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-9 h-9 ring-2 ring-white/10 hover:ring-white/30 transition-all",
                                        userButtonPopoverCard: "bg-zinc-950 border border-zinc-800 text-zinc-100",
                                        userButtonPopoverFooter: "hidden",
                                        userButtonTrigger: "focus:shadow-none w-full h-full",
                                    },
                                }}
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse" />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-zinc-200">Account</span>
                        <span className="text-xs text-zinc-500">Manage profile</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
