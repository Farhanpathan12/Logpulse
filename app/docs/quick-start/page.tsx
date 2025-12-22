import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

export default function QuickStartPage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-indigo-500/20 bg-indigo-500/10 text-indigo-400">5 Minutes</Badge>
                    <Badge variant="outline" className="border-zinc-700 bg-zinc-800 text-zinc-400">Beginner</Badge>
                </div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
                    Quick Start
                </h1>
                <p className="leading-7 text-zinc-400 text-lg max-w-2xl">
                    Get up and running with LogPulse in three simple steps. No credit card required for the free tier.
                </p>
            </div>

            <div className="grid gap-8">
                {/* Step 1 */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 p-8">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <span className="text-9xl font-bold text-white">1</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 font-bold text-white text-sm">1</div>
                            Create a Project
                        </h3>
                        <p className="text-zinc-400 mb-6 max-w-lg">
                            Log in to your dashboard and click "Create Project". Give it a name (e.g., "My SaaS App") and pick a brand color.
                        </p>
                        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300">
                            Go to Dashboard <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 p-8">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <span className="text-9xl font-bold text-white">2</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 font-bold text-white text-sm">2</div>
                            Get your Project ID
                        </h3>
                        <p className="text-zinc-400 mb-6 max-w-lg">
                            Navigate to your project's <strong>Settings</strong> tab. Copy the <code>Project ID</code> (it looks like a long string of characters).
                        </p>
                        <div className="bg-black/50 border border-white/10 rounded-lg p-3 inline-block">
                            <code className="text-zinc-300 font-mono text-sm">cm4...7d9</code>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 p-8">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <span className="text-9xl font-bold text-white">3</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 font-bold text-white text-sm">3</div>
                            Install the Widget
                        </h3>
                        <p className="text-zinc-400 mb-6 max-w-lg">
                            Paste the installation code into your website. The widget will appear immediately.
                        </p>
                        <Link href="/docs/installation" className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-black hover:bg-zinc-200 transition-colors">
                            View Installation Methods
                        </Link>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-6 flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-emerald-400 mb-1">That's it!</h4>
                    <p className="text-sm text-emerald-400/80">
                        You can now start publishing updates from your dashboard. They will appear on your site in real-time.
                    </p>
                </div>
            </div>
        </div>
    );
}
