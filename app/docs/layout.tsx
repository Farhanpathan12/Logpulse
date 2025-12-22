import { DocsSidebar } from "@/components/docs/sidebar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] opacity-10" />
            </div>

            {/* Header / Nav */}
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
                <div className="container flex h-14 items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg mr-4 pl-4 md:pl-6">
                        <div className="h-6 w-6 bg-indigo-500 rounded-md flex items-center justify-center">
                            <span className="text-white text-xs">L</span>
                        </div>
                        LogPulse Docs
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium text-zinc-400">
                        <Link href="/dashboard" className="transition-colors hover:text-white">Dashboard</Link>
                        <Link href="https://github.com/logpulse" className="transition-colors hover:text-white">GitHub</Link>
                    </nav>
                    <div className="ml-auto pr-4 md:pr-6">
                        <Link href="/dashboard" className="text-sm border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all">
                            Go to App
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 pt-8 pb-20">
                <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-white/5 md:sticky md:block">
                    <div className="h-full py-6 pr-2 pl-4 lg:py-8">
                        <DocsSidebar />
                    </div>
                </aside>
                <main className="relative py-6 lg:gap-10 lg:py-8 w-full max-w-5xl mx-auto">
                    <div className="mx-auto w-full min-w-0">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
