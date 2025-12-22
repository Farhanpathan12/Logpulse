import { CopyButton } from "@/components/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal } from "lucide-react";

export default function InstallationPage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
                    Installation
                </h1>
                <p className="leading-7 text-zinc-400 text-lg max-w-2xl">
                    Add the LogPulse widget to your website in seconds. Choose your technology stack below.
                </p>
            </div>

            <Tabs defaultValue="html" className="w-full">
                <TabsList className="grid w-full max-w-[400px] grid-cols-3 bg-zinc-900/50 border border-white/10">
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="nextjs">Next.js</TabsTrigger>
                    <TabsTrigger value="react">React</TabsTrigger>
                </TabsList>

                <TabsContent value="html" className="mt-6 space-y-4">
                    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-emerald-400" />
                            Vanilla HTML
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Copy and paste this snippet before the closing body tag of your website.
                        </p>
                        <div className="relative rounded-lg bg-black border border-white/10 p-4">
                            <pre className="overflow-x-auto text-sm text-zinc-300 font-mono leading-relaxed">
                                {`<script 
  src="https://logpulse.com/widget.js" 
  data-project-id="YOUR_PROJECT_ID"
></script>`}
                            </pre>
                            <div className="absolute top-4 right-4">
                                <CopyButton value={`<script src="https://logpulse.com/widget.js" data-project-id="YOUR_PROJECT_ID"></script>`} />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="nextjs" className="mt-6 space-y-4">
                    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold">N</div>
                            Next.js (App Router)
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Use the optimized <code>Script</code> component in your Root Layout.
                        </p>
                        <div className="relative rounded-lg bg-black border border-white/10 p-4">
                            <pre className="overflow-x-auto text-sm text-zinc-300 font-mono leading-relaxed">
                                {`import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script 
          src="https://logpulse.com/widget.js" 
          data-project-id="YOUR_PROJECT_ID" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  )
}`}
                            </pre>
                            <div className="absolute top-4 right-4">
                                <CopyButton value={`import Script from 'next/script'\n\n<Script src="https://logpulse.com/widget.js" data-project-id="YOUR_PROJECT_ID" strategy="lazyOnload" />`} />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="react" className="mt-6 space-y-4">
                    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[10px] font-bold">R</div>
                            React
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Dynamically load the script in a `useEffect` hook.
                        </p>
                        <div className="relative rounded-lg bg-black border border-white/10 p-4">
                            <pre className="overflow-x-auto text-sm text-zinc-300 font-mono leading-relaxed">
                                {`useEffect(() => {
  const script = document.createElement('script');
  script.src = "https://logpulse.com/widget.js";
  script.setAttribute("data-project-id", "YOUR_PROJECT_ID");
  script.async = true;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  }
}, []);`}
                            </pre>
                            <div className="absolute top-4 right-4">
                                <CopyButton value={`const script = document.createElement('script');\nscript.src = "https://logpulse.com/widget.js";`} />
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
