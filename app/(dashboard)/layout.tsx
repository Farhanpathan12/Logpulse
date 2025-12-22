import { Sidebar } from "@/components/dashboard/sidebar";
import { getUserPlan } from "@/app/actions";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const plan = await getUserPlan();

    return (
        <div className="flex h-screen bg-black text-zinc-100 overflow-hidden selection:bg-white/20 relative">
            {/* Ambient Glow (Global) - Monochrome Smoke */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/10 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            {/* Sidebar */}
            <Sidebar plan={plan} />

            {/* Main Content Area - Floating Panel */}
            <main className="flex-1 md:ml-[300px] h-full p-4 overflow-hidden relative z-10">
                <div className="h-full w-full rounded-3xl bg-zinc-950/50 border border-white/10 backdrop-blur-2xl overflow-y-auto shadow-2xl shadow-black/80 relative ring-1 ring-white/5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
                    <div className="max-w-6xl mx-auto p-8 md:p-12 relative z-10">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
