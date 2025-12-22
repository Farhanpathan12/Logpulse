import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe } from "lucide-react";

export default function ApiPage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400">Public API</Badge>
                    <Badge variant="outline" className="border-indigo-500/20 bg-indigo-500/10 text-indigo-400">v1.0</Badge>
                </div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
                    API Reference
                </h1>
                <p className="leading-7 text-zinc-400 text-lg max-w-2xl">
                    Build completely custom changelogs by fetching raw data from your project.
                </p>
            </div>

            <div className="space-y-8">
                <section id="get-widget" className="scroll-m-20 rounded-2xl border border-white/10 bg-zinc-900/40 p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Globe className="w-5 h-5 text-indigo-400" />
                                Get Project Data
                            </h2>
                            <p className="text-zinc-400 text-sm">
                                Retrieve public configuration and published posts.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 font-mono text-xs text-indigo-300">
                            <span className="font-bold text-indigo-500">GET</span>
                            https://logpulse.com/api/widget
                        </div>
                    </div>

                    {/* Parameters */}
                    <div className="border border-white/10 rounded-xl overflow-hidden mb-8 shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-900 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-zinc-300">Parameter</th>
                                    <th className="px-6 py-4 font-medium text-zinc-300">Type</th>
                                    <th className="px-6 py-4 font-medium text-zinc-300">Description</th>
                                    <th className="px-6 py-4 font-medium text-zinc-300 text-right">Required</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-black/20">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-indigo-400 font-semibold">projectId</td>
                                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">string</td>
                                    <td className="px-6 py-4 text-zinc-300">The unique identifier for your project.</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">Required</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Response */}
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 pl-1">Response Example</h3>
                        <div className="relative rounded-xl bg-black border border-white/10 p-5 shadow-inner">
                            <pre className="overflow-x-auto text-sm text-zinc-300 font-mono leading-relaxed">
                                {`{
  "project": {
    "name": "My App",
    "brandColor": "#3b82f6",
    "widgetPosition": "bottom-right",
    "widgetTheme": "dark"
  },
  "posts": [
    {
      "id": "post_123...",
      "title": "New Dashboard Design",
      "content": "<p>We completely redesigned...</p>",
      "category": "NEW",
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ]
}`}
                            </pre>
                            <div className="absolute top-4 right-4">
                                <CopyButton value={`curl "https://logpulse.com/api/widget?projectId=YOUR_ID"`} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
