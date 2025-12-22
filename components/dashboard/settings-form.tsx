"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Bell, Megaphone, Zap, LayoutTemplate, Palette, MousePointer2, Lock } from "lucide-react";
import { updateProject } from "@/app/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface SettingsFormProps {
    project: {
        id: string;
        name: string;
        domain: string;
        brandColor: string;
        widgetPosition: string;
        widgetIcon: string;
        widgetTheme: string;
        customCSS?: string | null;
        removeBranding?: boolean;
        webhookUrl?: string | null;
    };
    plan: string;
}

export function SettingsForm({ project, plan }: SettingsFormProps) {
    const [brandColor, setBrandColor] = useState(project.brandColor || "#2563eb");
    const [position, setPosition] = useState(project.widgetPosition || "bottom-right");
    const [icon, setIcon] = useState(project.widgetIcon || "sparkles");
    const [theme, setTheme] = useState(project.widgetTheme || "dark");
    // Pro Features
    const [customCSS, setCustomCSS] = useState(project.customCSS || "");
    const [removeBranding, setRemoveBranding] = useState(project.removeBranding || false);

    // Business Features
    const [webhookUrl, setWebhookUrl] = useState(project.webhookUrl || "");

    const [isSaving, setIsSaving] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);

    const isPro = plan === "PRO" || plan === "BUSINESS";
    const isBusiness = plan === "BUSINESS";

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData();
        formData.append("projectId", project.id);
        formData.append("name", project.name); // Keep existing name
        formData.append("domain", project.domain); // Keep existing domain
        formData.append("brandColor", brandColor);
        formData.append("widgetPosition", position);
        formData.append("widgetIcon", icon);
        formData.append("widgetTheme", theme);

        if (isPro) {
            formData.append("customCSS", customCSS);
            formData.append("removeBranding", String(removeBranding));
        }

        if (isBusiness) {
            formData.append("webhookUrl", webhookUrl);
        }

        try {
            await updateProject(formData);
            toast.success("Settings saved successfully");
        } catch (error) {
            toast.error("Failed to save settings");
        } finally {
            setIsSaving(false);
        }
    };

    const icons = [
        { id: "sparkles", icon: Sparkles, label: "Sparkles" },
        { id: "bell", icon: Bell, label: "Bell" },
        { id: "megaphone", icon: Megaphone, label: "Megaphone" },
        { id: "zap", icon: Zap, label: "Zap" },
    ];

    const positions = [
        { id: "bottom-right", label: "Bottom Right" },
        { id: "bottom-left", label: "Bottom Left" },
        { id: "top-right", label: "Top Right" },
        { id: "top-left", label: "Top Left" },
    ];

    const themes = [
        { id: "dark", label: "Dark Mode", icon: "🌙" },
        { id: "light", label: "Light Mode", icon: "☀️" },
        { id: "system", label: "System", icon: "💻" },
    ];

    const colors = [
        "#2563eb", // Blue
        "#7c3aed", // Violet
        "#db2777", // Pink
        "#ea580c", // Orange
        "#16a34a", // Green
        "#000000", // Black
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSave} className="space-y-8">

                    {/* Brand Color */}
                    <Card className="bg-zinc-900/40 border-zinc-800/50 overflow-hidden backdrop-blur-sm">
                        <CardHeader className="border-b border-white/5 bg-transparent">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-400" />
                                <CardTitle className="text-base font-medium text-zinc-100">Brand Appearance</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-3">
                                <Label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Accent Color</Label>
                                <div className="flex flex-wrap gap-3 items-center">
                                    {colors.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setBrandColor(c)}
                                            className={cn(
                                                "w-10 h-10 rounded-full border-2 transition-all hover:scale-110",
                                                brandColor === c ? "border-white ring-2 ring-white/20 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-transparent opacity-60 hover:opacity-100"
                                            )}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                    <div className="relative ml-2">
                                        <input
                                            type="color"
                                            value={brandColor}
                                            onChange={(e) => setBrandColor(e.target.value)}
                                            className="w-10 h-10 rounded-full overflow-hidden border-0 p-0 cursor-pointer opacity-0 absolute inset-0 z-10"
                                        />
                                        <div className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors pointer-events-none">
                                            <Palette className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="ml-4 flex items-center gap-3">
                                        <Label className="text-zinc-500 text-xs uppercase font-semibold">Hex Code</Label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-zinc-600" style={{ backgroundColor: brandColor }} />
                                            <Input
                                                value={brandColor}
                                                onChange={(e) => setBrandColor(e.target.value)}
                                                className="w-28 pl-8 h-9 bg-zinc-950 border-zinc-800 text-zinc-300 focus:border-white font-mono text-sm uppercase transition-colors"
                                                placeholder="#000000"
                                                maxLength={7}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Widget Theme */}
                    <Card className="bg-zinc-900/40 border-zinc-800/50 overflow-hidden backdrop-blur-sm">
                        <CardHeader className="border-b border-white/5 bg-transparent">
                            <div className="flex items-center gap-2">
                                <MousePointer2 className="w-4 h-4 text-zinc-400" />
                                <CardTitle className="text-base font-medium text-zinc-100">Widget Theme</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-3 gap-4">
                                {themes.map((t) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => setTheme(t.id)}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300",
                                            theme === t.id
                                                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                                                : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
                                        )}
                                    >
                                        <span className="text-2xl">{t.icon}</span>
                                        <span className="text-xs font-bold tracking-wide">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Widget Icon */}
                    <Card className="bg-zinc-900/40 border-zinc-800/50 overflow-hidden backdrop-blur-sm">
                        <CardHeader className="border-b border-white/5 bg-transparent">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-zinc-400" />
                                <CardTitle className="text-base font-medium text-zinc-100">Widget Icon</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-4 gap-4">
                                {icons.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setIcon(item.id)}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300",
                                            icon === item.id
                                                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                                                : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
                                        )}
                                    >
                                        <item.icon className="w-6 h-6" />
                                        <span className="text-xs font-bold tracking-wide">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Widget Position */}
                    <Card className="bg-zinc-900/40 border-zinc-800/50 overflow-hidden backdrop-blur-sm">
                        <CardHeader className="border-b border-white/5 bg-transparent">
                            <div className="flex items-center gap-2">
                                <LayoutTemplate className="w-4 h-4 text-zinc-400" />
                                <CardTitle className="text-base font-medium text-zinc-100">Widget Position</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                {positions.map((pos) => (
                                    <button
                                        key={pos.id}
                                        type="button"
                                        onClick={() => setPosition(pos.id)}
                                        className={cn(
                                            "relative h-24 rounded-xl border transition-all duration-300 bg-zinc-950 overflow-hidden group",
                                            position === pos.id
                                                ? "border-white ring-1 ring-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                                : "border-zinc-800 hover:border-zinc-600"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute w-3 h-3 rounded-full transition-all duration-300",
                                            position === pos.id ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-zinc-800 group-hover:bg-zinc-600",
                                            pos.id.includes("top") ? "top-4" : "bottom-4",
                                            pos.id.includes("left") ? "left-4" : "right-4"
                                        )} />
                                        <span className={cn(
                                            "absolute text-[10px] font-bold uppercase tracking-widest",
                                            "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                                            position === pos.id ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
                                        )}>
                                            {pos.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pro Features Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 px-1">
                            <Zap className="w-4 h-4 text-indigo-400" />
                            <h3 className="text-sm font-medium text-indigo-100">Pro Customization</h3>
                        </div>

                        {/* Remove Branding */}
                        <Card className={cn(
                            "overflow-hidden backdrop-blur-sm relative transition-all duration-300",
                            isPro ? "bg-zinc-900/40 border-zinc-800/50" : "bg-zinc-900/20 border-zinc-800/20"
                        )}>
                            {!isPro && (
                                <div className="absolute inset-0 z-10 bg-zinc-950/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
                                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 shadow-xl shadow-black/50">
                                        <Lock className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <h4 className="text-zinc-200 font-semibold mb-1">Remove Branding</h4>
                                    <div className="px-3 py-1.5 mt-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold uppercase tracking-wider">
                                        Pro Plan Only
                                    </div>
                                </div>
                            )}
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-white">Remove Branding</h4>
                                        {!isPro && <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-700">Pro</span>}
                                    </div>
                                    <p className="text-sm text-zinc-400">Hide the "Powered by LogPulse" link.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => isPro && setRemoveBranding(!removeBranding)}
                                    disabled={!isPro}
                                    className={cn(
                                        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed",
                                        removeBranding ? "bg-indigo-600" : "bg-zinc-700"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                                            removeBranding ? "translate-x-5" : "translate-x-0"
                                        )}
                                    />
                                </button>
                            </CardContent>
                        </Card>

                        {/* Custom CSS */}
                        <Card className={cn(
                            "overflow-hidden backdrop-blur-sm relative transition-all duration-300",
                            isPro ? "bg-zinc-900/40 border-zinc-800/50" : "bg-zinc-900/20 border-zinc-800/20"
                        )}>
                            {!isPro && (
                                <div className="absolute inset-0 z-10 bg-zinc-950/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
                                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 shadow-xl shadow-black/50">
                                        <Lock className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <h4 className="text-zinc-200 font-semibold mb-1">Custom CSS</h4>
                                    <p className="text-xs text-zinc-500 max-w-[200px] mb-4">Inject custom styles.</p>
                                    <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold uppercase tracking-wider">
                                        Pro Plan Only
                                    </div>
                                </div>
                            )}
                            <CardHeader className="border-b border-white/5 bg-transparent">
                                <div className="flex items-center gap-2">
                                    <LayoutTemplate className="w-4 h-4 text-zinc-400" />
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-base font-medium text-zinc-100">Custom CSS</CardTitle>
                                        {!isPro && <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-700">Pro</span>}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <Textarea
                                    value={customCSS}
                                    onChange={(e) => setCustomCSS(e.target.value)}
                                    disabled={!isPro}
                                    placeholder={isPro ? ".widget-container { ... }" : "Upgrade to Pro to inject custom CSS"}
                                    className="font-mono text-xs min-h-[150px] bg-black/50 border-zinc-800 focus:border-indigo-500/50 text-zinc-100"
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Business Features Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 px-1">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <h3 className="text-sm font-medium text-emerald-100">Business Integrations</h3>
                        </div>

                        {/* Webhooks */}
                        <Card className={cn(
                            "overflow-hidden backdrop-blur-sm relative transition-all duration-300",
                            isBusiness ? "bg-zinc-900/40 border-zinc-800/50" : "bg-zinc-900/20 border-zinc-800/20"
                        )}>
                            {!isBusiness && (
                                <div className="absolute inset-0 z-10 bg-zinc-950/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
                                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 shadow-xl shadow-black/50">
                                        <Lock className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <h4 className="text-zinc-200 font-semibold mb-2">Business Integration</h4>
                                    <p className="text-sm text-zinc-500 max-w-[240px] mb-6">
                                        {plan === "PRO" ? "Upgrade directly to Business Plan to unlock." : "Upgrade to Business Plan to unlock."}
                                    </p>
                                    <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                                        Business Plan Only
                                    </div>
                                </div>
                            )}
                            <CardHeader className="border-b border-white/5 bg-transparent">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-base font-medium text-zinc-100">Outgoing Webhooks</CardTitle>
                                        {!isBusiness && <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-700">Business</span>}
                                    </div>
                                </div>
                                <CardDescription className="text-zinc-500">
                                    Automatically send post data to your external API when you publish an update.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-3">
                                    <Label className="text-zinc-400 text-xs">Webhook URL</Label>
                                    <Input
                                        type="url"
                                        placeholder="https://api.your-app.com/webhooks/logpulse"
                                        value={webhookUrl}
                                        onChange={(e) => setWebhookUrl(e.target.value)}
                                        disabled={!isBusiness}
                                        className="bg-black/50 border-zinc-800 text-zinc-100 focus:border-emerald-500/50"
                                    />
                                    {isBusiness && (
                                        <p className="text-[10px] text-zinc-500">
                                            We'll send a POST request with the post data payload.
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="bg-white text-black hover:bg-zinc-200 min-w-[120px]"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Right: Live Preview */}
            <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">Live Preview</Label>
                        <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-1 rounded-full border border-zinc-800">Interactive</span>
                    </div>

                    <div className="relative aspect-[9/16] bg-white rounded-[2rem] border-[8px] border-zinc-900 shadow-2xl overflow-hidden">
                        {/* Mock Website Content */}
                        <div className="absolute inset-0 bg-zinc-50 p-6 space-y-4 opacity-50 pointer-events-none">
                            <div className="h-4 w-24 bg-zinc-200 rounded-full" />
                            <div className="h-32 w-full bg-zinc-200 rounded-xl" />
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-zinc-200 rounded-full" />
                                <div className="h-3 w-3/4 bg-zinc-200 rounded-full" />
                            </div>
                        </div>

                        {/* Widget Trigger Preview */}
                        <div
                            className={cn(
                                "absolute transition-all duration-500 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95",
                                previewOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                            )}
                            style={{
                                bottom: position.includes("bottom") ? "20px" : "auto",
                                top: position.includes("top") ? "20px" : "auto",
                                left: position.includes("left") ? "20px" : "auto",
                                right: position.includes("right") ? "20px" : "auto",
                            }}
                            onClick={() => setPreviewOpen(true)}
                        >
                            <div
                                className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-colors duration-300"
                                style={{ backgroundColor: brandColor }}
                            >
                                {icon === "sparkles" && <Sparkles className="w-5 h-5" />}
                                {icon === "bell" && <Bell className="w-5 h-5" />}
                                {icon === "megaphone" && <Megaphone className="w-5 h-5" />}
                                {icon === "zap" && <Zap className="w-5 h-5" />}
                            </div>
                        </div>

                        {/* Widget Deck Preview */}
                        <div
                            className={cn(
                                "absolute inset-x-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                                previewOpen
                                    ? "opacity-100 translate-y-0 scale-100"
                                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                            )}
                            style={{
                                bottom: position.includes("bottom") ? "80px" : "auto",
                                top: position.includes("top") ? "80px" : "auto",
                            }}
                        >
                            <div className={cn(
                                "rounded-xl shadow-xl border overflow-hidden h-[300px] flex flex-col",
                                theme === "light" ? "bg-white border-zinc-100" : "bg-zinc-900 border-zinc-800"
                            )}>
                                <div className={cn(
                                    "p-4 border-b flex items-center justify-between backdrop-blur-sm",
                                    theme === "light" ? "bg-white/80 border-zinc-100" : "bg-zinc-900/80 border-zinc-800"
                                )}>
                                    <span className={cn(
                                        "font-semibold text-sm",
                                        theme === "light" ? "text-zinc-900" : "text-white"
                                    )}>Changelog</span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setPreviewOpen(false); }}
                                        className={cn(
                                            "hover:text-zinc-600",
                                            theme === "light" ? "text-zinc-400" : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                                <div className={cn(
                                    "p-4 space-y-4 overflow-y-auto flex-1",
                                    theme === "light" ? "bg-zinc-50/50" : "bg-black/20"
                                )}>
                                    <div className={cn(
                                        "p-3 rounded-lg border shadow-sm space-y-2",
                                        theme === "light" ? "bg-white border-zinc-100" : "bg-zinc-800 border-zinc-700"
                                    )}>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase border border-blue-500/20">New</span>
                                            <span className="text-[10px] text-zinc-500">Just now</span>
                                        </div>
                                        <div className={cn(
                                            "h-2 w-3/4 rounded-full",
                                            theme === "light" ? "bg-zinc-100" : "bg-zinc-700"
                                        )} />
                                        <div className={cn(
                                            "h-2 w-full rounded-full",
                                            theme === "light" ? "bg-zinc-100" : "bg-zinc-700"
                                        )} />
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-lg border shadow-sm space-y-2 opacity-60",
                                        theme === "light" ? "bg-white border-zinc-100" : "bg-zinc-800 border-zinc-700"
                                    )}>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase border border-orange-500/20">Fixed</span>
                                            <span className="text-[10px] text-zinc-500">2 days ago</span>
                                        </div>
                                        <div className={cn(
                                            "h-2 w-1/2 rounded-full",
                                            theme === "light" ? "bg-zinc-100" : "bg-zinc-700"
                                        )} />
                                    </div>
                                </div>
                                <div className={cn(
                                    "p-3 border-t text-center",
                                    theme === "light" ? "bg-white border-zinc-100" : "bg-zinc-900 border-zinc-800"
                                )}>
                                    <span className="text-[10px] text-zinc-500 font-medium">Powered by LogPulse</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
