"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Building2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface UpgradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
    const { user } = useUser();

    // Pro Plan URL
    const proCheckoutUrl = user
        ? `https://lassan.lemonsqueezy.com/buy/e2aa1240-806b-47ee-9b05-41e4fc789012?checkout[custom][userId]=${user.id}`
        : "#";

    // Business Plan URL
    // IMPORTANT: You must replace 'REPLACE_WITH_BUSINESS_VARIANT_ID' with your actual Lemon Squeezy Variant ID for the Business Plan.
    // Currently relying on Pro ID which causes the price mismatch (999 vs 2499).
    const businessCheckoutUrl = user
        ? `https://lassan.lemonsqueezy.com/buy/REPLACE_WITH_BUSINESS_VARIANT_ID?checkout[custom][userId]=${user.id}&checkout[custom][plan]=business`
        : "#";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] bg-zinc-950 border-zinc-800 text-zinc-100 p-0 overflow-hidden">
                <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                                Upgrade Plan
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-zinc-400">
                            Choose the plan that fits your needs.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                    {/* PRO PLAN */}
                    <div className="p-6 space-y-6 bg-zinc-900/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none" />

                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white">Pro</h3>
                                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 uppercase tracking-wider shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                    Most Popular
                                </span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-white">₹999</span>
                                <span className="text-zinc-500">/mo</span>
                            </div>
                            <p className="text-sm text-zinc-400">For growing creators & side projects.</p>
                        </div>

                        <div className="space-y-3 relative">
                            {[
                                "5 Projects",
                                "Unlimited History",
                                "Remove Branding",
                                "Custom CSS",
                                "Priority Support"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                                    <div className="p-0.5 rounded-full bg-indigo-500/10 text-indigo-500">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={() => window.open(proCheckoutUrl, "_blank")}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/40 transition-all"
                        >
                            Get Pro
                        </Button>
                    </div>

                    {/* BUSINESS PLAN */}
                    <div className="p-6 space-y-6 bg-zinc-950/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white">Business</h3>
                                <div className="p-1.5 bg-zinc-800/50 rounded-md border border-white/5">
                                    <Building2 className="w-4 h-4 text-zinc-400" />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-white">₹2,499</span>
                                <span className="text-zinc-500">/mo</span>
                            </div>
                            <p className="text-sm text-zinc-400">For startups & serious businesses.</p>
                        </div>

                        <div className="space-y-3 relative">
                            {[
                                "Unlimited Projects",
                                "Everything in Pro",
                                "Newsletter & Webhooks",
                                "Dedicated Support",
                                "SSO (Coming Soon)"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                                    <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={() => window.open(businessCheckoutUrl, "_blank")}
                            variant="outline"
                            className="w-full bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800 hover:text-white text-zinc-300 font-semibold"
                        >
                            Contact Sales
                        </Button>
                    </div>
                </div>

                <DialogFooter className="p-4 bg-zinc-900/50 border-t border-zinc-800 justify-center sm:justify-center">
                    <p className="text-xs text-center text-zinc-500">
                        Secure payment via Lemon Squeezy • Cancel anytime
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
