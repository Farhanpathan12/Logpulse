import Link from "next/link";
import { ArrowRight, Zap, Globe, Shield, Code } from "lucide-react";

export default function DocsPage() {
    return (
        <>
            {/* Hero Section */}
            < div className="relative mb-16 pt-8 pb-8 border-b border-white/5" >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

                <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                        <Zap className="mr-1 h-3 w-3" />
                        Developer Documentation
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Build with LogPulse
                    </h1>
                    <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
                        Everything you need to integrate LogPulse into your application.
                        From a simple script tag to a fully custom API implementation.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Link href="/docs/installation" className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
                            Start Building
                        </Link>
                        <Link href="/docs/api" className="inline-flex h-10 items-center justify-center rounded-md border border-white/10 bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-white/10">
                            Read API Docs
                        </Link>
                    </div>
                </div>
            </div >

            {/* Quick Access Cards */}
            < div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" >
                <Link href="/docs/installation" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-8 transition-all duration-500 hover:bg-zinc-900/50 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 transition-all duration-500 shadow-lg">
                            <Zap className="h-7 w-7" />
                        </div>

                        <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">Quick Start</h3>
                        <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                            Get the widget running in less than 2 minutes.
                            Copy-paste snippets for HTML, React, and Next.js.
                        </p>

                        <div className="flex items-center text-sm font-semibold text-white/40 group-hover:text-white transition-colors">
                            Read Guide <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>

                <Link href="/docs/api" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-8 transition-all duration-500 hover:bg-zinc-900/50 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 transition-all duration-500 shadow-lg">
                            <Globe className="h-7 w-7" />
                        </div>

                        <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-emerald-200 transition-colors">API Reference</h3>
                        <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                            Fetch raw data for custom implementations.
                            Secure, fast, and fully typed.
                        </p>

                        <div className="flex items-center text-sm font-semibold text-white/40 group-hover:text-white transition-colors">
                            Explore API <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
            </div >

            {/* Features Grid */}
            < div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-white/10 transition-colors">
                    <Shield className="w-6 h-6 text-zinc-500 mb-4" />
                    <h4 className="text-white font-semibold mb-2">Secure by Default</h4>
                    <p className="text-sm text-zinc-500">Read-only API tokens ensure your data remains safe while being publicly accessible.</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-white/10 transition-colors">
                    <Zap className="w-6 h-6 text-zinc-500 mb-4" />
                    <h4 className="text-white font-semibold mb-2">Edge Cached</h4>
                    <p className="text-sm text-zinc-500">All responses are cached at the edge for sub-millisecond latency worldwide.</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-white/10 transition-colors">
                    <Code className="w-6 h-6 text-zinc-500 mb-4" />
                    <h4 className="text-white font-semibold mb-2">Type Safe</h4>
                    <p className="text-sm text-zinc-500">Full TypeScript support and detailed schema validation for all endpoints.</p>
                </div>
            </div >
        </>
    );
}
