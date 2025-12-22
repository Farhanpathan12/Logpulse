import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function Page() {
    return (
        <div className="min-h-screen w-full bg-black flex flex-col relative overflow-x-hidden">
            {/* Background Effects (Fixed to viewport) */}
            <div className="fixed top-0 left-0 w-full h-full bg-black -z-20" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] -z-10" />
            <div className="fixed bottom-0 left-0 w-[800px] h-[600px] bg-zinc-800/[0.05] rounded-full blur-[100px] -z-10" />

            {/* Grid Pattern (Fixed) */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 opacity-50" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#ffffff05,transparent)] -z-10" />

            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-[480px] flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                <Zap className="w-6 h-6 text-black fill-black" />
                            </div>
                            <span className="text-white font-bold text-2xl tracking-tight">
                                LogPulse
                            </span>
                        </Link>
                        <h1 className="text-zinc-400 text-sm">Start turning updates into revenue.</h1>
                    </div>

                    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
                        <SignUp
                            appearance={{
                                variables: {
                                    colorBackground: '#09090b',
                                    colorText: '#ffffff',
                                    colorInputBackground: '#18181b',
                                    colorInputText: '#ffffff',
                                    colorPrimary: '#ffffff',
                                    colorTextSecondary: '#a1a1aa',
                                    colorTextOnPrimaryBackground: '#000000',
                                },
                                elements: {
                                    rootBox: "w-full mx-auto",
                                    card: "bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl w-full",
                                    headerTitle: "text-white",
                                    headerSubtitle: "text-zinc-400",
                                    socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10 !text-white",
                                    socialButtonsBlockButtonText: "!text-white font-medium",
                                    socialButtonsBlockButtonArrow: "text-white",
                                    dividerLine: "bg-white/10",
                                    dividerText: "text-zinc-500",
                                    formFieldLabel: "text-zinc-400",
                                    formFieldInput: "bg-black/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-white transition-colors",
                                    footerActionLink: "text-white hover:text-zinc-300 underline decoration-zinc-700 underline-offset-4",
                                    formButtonPrimary: "bg-white hover:bg-zinc-200 text-black font-bold",
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
