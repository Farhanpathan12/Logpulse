import { Badge } from "@/components/ui/badge";
import { Palette } from "lucide-react";

export default function CustomizationPage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-indigo-500/20 bg-indigo-500/10 text-indigo-400">Pro Feature</Badge>
                </div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
                    Customization
                </h1>
                <p className="leading-7 text-zinc-400 text-lg max-w-2xl">
                    Match the widget to your brand using CSS variables.
                </p>

                <div className="p-4 bg-zinc-900/50 border border-indigo-500/20 rounded-lg max-w-2xl">
                    <h4 className="text-sm font-semibold text-indigo-400 mb-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                        Security & Integrity
                    </h4>
                    <p className="text-sm text-zinc-400">
                        LogPulse uses <strong>Enterprise-Grade Security</strong> to enforce plan limits.
                        Branding removal and Pro features are controlled Server-Side.
                        Tampering with the widget client-side will trigger self-protection mechanisms.
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                <section className="scroll-m-20 rounded-2xl border border-white/10 bg-zinc-900/40 p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Palette className="w-5 h-5 text-indigo-400" />
                        <h2 className="text-xl font-bold text-white">CSS Variables</h2>
                    </div>

                    <p className="text-zinc-400 mb-4">
                        Override these variables in your global CSS to change the widget's appearance. The widget uses Shadow DOM but inherits these specific variables if defined on the <code>:root</code>.
                    </p>

                    <div className="border border-white/10 rounded-xl overflow-hidden mb-8 shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-900 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-zinc-300">Variable</th>
                                    <th className="px-6 py-4 font-medium text-zinc-300">Description</th>
                                    <th className="px-6 py-4 font-medium text-zinc-300">Default</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-black/20">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-indigo-400 font-semibold">--logpulse-primary</td>
                                    <td className="px-6 py-4 text-zinc-300">Primary brand color (buttons, links).</td>
                                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">#6366f1</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-indigo-400 font-semibold">--logpulse-bg</td>
                                    <td className="px-6 py-4 text-zinc-300">Background color of the widget panel.</td>
                                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">#ffffff</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-indigo-400 font-semibold">--logpulse-text</td>
                                    <td className="px-6 py-4 text-zinc-300">Main text color.</td>
                                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">#18181b</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-white mb-2">Example Usage</h3>
                    <div className="relative rounded-lg bg-zinc-950 border border-white/10 p-4">
                        <pre className="overflow-x-auto text-sm text-zinc-300 font-mono">
                            {`:root {
  --logpulse-primary: #ec4899; /* Pink brand color */
  --logpulse-bg: #0f172a;      /* Dark blue background */
  --logpulse-text: #f8fafc;    /* Light text */
}`}
                        </pre>
                    </div>
                </section>
            </div>
        </div>
    );
}
