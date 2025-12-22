"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Plus, Trash2, Globe, AlertTriangle, CheckCircle2 } from "lucide-react";
import { updateProject } from "@/app/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SecurityFormProps {
    project: {
        id: string;
        name: string;
        domain: string;
        brandColor: string;
        widgetPosition: string;
        widgetIcon: string;
        widgetTheme: string;
        allowedOrigins: string[];
    };
}

export function SecurityForm({ project }: SecurityFormProps) {
    const [origins, setOrigins] = useState<string[]>(project.allowedOrigins || []);
    const [newOrigin, setNewOrigin] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Add Domain
    const handleAddOrigin = () => {
        if (!newOrigin) return;

        // Basic validation/cleanup
        let clean = newOrigin.trim().toLowerCase();
        // Remove protocol if user pasted it
        clean = clean.replace(/^https?:\/\//, "").replace(/\/$/, "");

        if (origins.includes(clean)) {
            toast.error("Domain already allows");
            return;
        }

        setOrigins([...origins, clean]);
        setNewOrigin("");
    };

    // Remove Domain
    const handleRemoveOrigin = (origin: string) => {
        setOrigins(origins.filter(o => o !== origin));
    };

    // Save functionality
    const handleSave = async () => {
        setIsSaving(true);
        const formData = new FormData();
        formData.append("projectId", project.id);
        // We need to pass strictly what updateProject expects.
        // currently updateProject expects individual fields or spreads... 
        // We might need to handle sending the array. 
        // JSON.stringify is a safe bet if server action parses it, otherwise we update server action.
        // Let's assume we will update server action to read "allowedOrigins" as JSON string.
        formData.append("allowedOrigins", JSON.stringify(origins));

        // Pass other required fields to avoid validation errors if any
        formData.append("name", project.name);
        formData.append("domain", project.domain);
        formData.append("brandColor", project.brandColor);
        formData.append("widgetPosition", project.widgetPosition);
        formData.append("widgetIcon", project.widgetIcon);
        formData.append("widgetTheme", project.widgetTheme);

        try {
            await updateProject(formData);
            toast.success("Security settings updated");
        } catch (error) {
            toast.error("Failed to update security settings");
        } finally {
            setIsSaving(false);
        }
    };

    const isSecureMode = origins.length > 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="border-b border-white/5 bg-transparent">
                        <div className="flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-emerald-500" />
                            <CardTitle className="text-base font-medium text-zinc-100">
                                Domain Whitelisting
                            </CardTitle>
                        </div>
                        <CardDescription>
                            Restrict which websites can load your widget. If empty, the widget works everywhere (Not Recommended).
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">

                        {/* Status Indicator */}
                        <div className={cn(
                            "rounded-lg p-4 border flex items-start gap-4",
                            isSecureMode
                                ? "bg-emerald-500/10 border-emerald-500/20"
                                : "bg-amber-500/10 border-amber-500/20"
                        )}>
                            {isSecureMode ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                            ) : (
                                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                            )}
                            <div className="space-y-1">
                                <h4 className={cn("text-sm font-semibold", isSecureMode ? "text-emerald-500" : "text-amber-500")}>
                                    {isSecureMode ? "Strict Mode Active" : "Public Mode (Insecure)"}
                                </h4>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    {isSecureMode
                                        ? "Your widget will ONLY load on the domains listed below. All other requests will be blocked."
                                        : "Your widget can be embedded on ANY website. We recommend adding your domain to lock it down."
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="space-y-3">
                            <Label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Add Trusted Domain</Label>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <Input
                                        value={newOrigin}
                                        onChange={(e) => setNewOrigin(e.target.value)}
                                        placeholder="myapp.com"
                                        className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-300 focus:border-white"
                                        onKeyDown={(e) => e.key === "Enter" && handleAddOrigin()}
                                    />
                                </div>
                                <Button onClick={handleAddOrigin} className="bg-white text-black hover:bg-zinc-200">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add
                                </Button>
                            </div>
                            <p className="text-[10px] text-zinc-600">
                                Enter domain without protocol (e.g. use google.com, not https://google.com)
                            </p>
                        </div>

                        {/* Domain List */}
                        <div className="space-y-3">
                            <Label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Allowed Domains ({origins.length})</Label>
                            <div className="space-y-2 min-h-[100px]">
                                {origins.length === 0 && (
                                    <div className="text-sm text-zinc-600 italic py-4 text-center border border-dashed border-zinc-800 rounded-lg">
                                        No domains restricted. Widget is public.
                                    </div>
                                )}
                                {origins.map((origin) => (
                                    <div key={origin} className="group flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span className="font-mono text-sm text-zinc-300">{origin}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveOrigin(origin)}
                                            className="h-8 w-8 p-0 text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Save Action */}
                        <div className="flex justify-end pt-4 border-t border-white/5">
                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="bg-emerald-600 text-white hover:bg-emerald-700 min-w-[120px]"
                            >
                                {isSaving ? "Saving..." : "Save Security Rules"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right: Info Panel */}
            <div className="lg:col-span-1 space-y-6">
                <div className="rounded-xl border border-blue-500/10 bg-blue-500/5 p-5 space-y-4">
                    <h4 className="text-sm font-semibold text-blue-400">Why Whitelist?</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        Without whitelisting, anyone can inspect your site, copy your LogPulse embed code, and place it on their own site (phishing, spoofing).
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        By adding your domain here, our API will strictly reject requests from any other origin.
                    </p>
                </div>
            </div>
        </div>
    );
}
