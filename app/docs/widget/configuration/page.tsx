import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sliders } from "lucide-react";

export default function ConfigurationPage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
                    Configuration
                </h1>
                <p className="leading-7 text-zinc-400 text-lg max-w-2xl">
                    Control the behavior of the LogPulse widget using HTML data attributes.
                </p>
            </div>

            <div className="space-y-8">
                <section className="scroll-m-20 rounded-2xl border border-white/10 bg-zinc-900/40 p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Sliders className="w-5 h-5 text-indigo-400" />
                        <h2 className="text-xl font-bold text-white">Script Attributes</h2>
                    </div>

                    <div className="border border-white/10 rounded-xl overflow-hidden mb-8 shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-900 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-zinc-300">Attribute</th>
                                    <th className="px-6 py-4 font-medium text-zinc-300">Description</th>
                                    <th className="px-6 py-4 font-medium text-zinc-300">Default</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-black/20">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-indigo-400 font-semibold">data-project-id</td>
                                    <td className="px-6 py-4 text-zinc-300">The unique ID of your project. Required for the widget to fetch data.</td>
                                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">-</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-indigo-400 font-semibold">data-theme</td>
                                    <td className="px-6 py-4 text-zinc-300">Force 'light' or 'dark' mode. If omitted, respects system preference.</td>
                                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">system</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-indigo-400 font-semibold">data-position</td>
                                    <td className="px-6 py-4 text-zinc-300">Corner position of the launcher. Values: <code>bottom-right</code>, <code>bottom-left</code>.</td>
                                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">bottom-right</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-white mb-2">Example Usage</h3>
                    <div className="relative rounded-lg bg-zinc-950 border border-white/10 p-4">
                        <pre className="overflow-x-auto text-sm text-zinc-300 font-mono">
                            {`<script 
  src="https://logpulse.com/widget.js" 
  data-project-id="YOUR_ID"
  data-theme="dark"
  data-position="bottom-left"
></script>`}
                        </pre>
                    </div>
                </section>
            </div>
        </div>
    );
}
