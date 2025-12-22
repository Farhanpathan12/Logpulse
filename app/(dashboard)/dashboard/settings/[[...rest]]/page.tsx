"use client";

import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold text-zinc-100">Account Settings</h1>
                <p className="text-zinc-500 mt-1">Manage your account preferences and profile.</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <UserProfile
                    path="/dashboard/settings"
                    routing="path"
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            rootBox: "w-full",
                            card: "shadow-none border-none w-full bg-transparent",
                            navbar: "hidden",
                            pageScrollBox: "p-8",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            viewSectionTitle: "text-zinc-100 font-bold",
                            viewSectionSubtitle: "text-zinc-500",
                            profileSectionTitle: "text-zinc-100 border-b border-zinc-800 pb-2",
                            userPreviewMainIdentifier: "text-zinc-100 font-bold",
                            userPreviewSecondaryIdentifier: "text-zinc-400",
                        }
                    }}
                />
            </div>
        </div>
    );
}
