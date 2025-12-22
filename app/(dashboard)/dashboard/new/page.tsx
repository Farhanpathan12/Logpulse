"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createProject } from "@/app/actions";

export default function NewProjectPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const domain = formData.get("domain") as string;
        const brandColor = formData.get("brandColor") as string;

        try {
            const result = await createProject({ name, domain, brandColor });
            if (result.error) {
                setError(result.error);
            } else {
                router.push(`/dashboard/project/${result.id}`);
            }
        } catch (e) {
            setError("Failed to create project. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <Link href="/dashboard" className="flex items-center text-zinc-500 hover:text-zinc-900 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Project</CardTitle>
                    <CardDescription>Set up a new changelog for your product.</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Project Name</label>
                            <Input id="name" name="name" placeholder="e.g. LogPulse" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="domain" className="text-sm font-medium">Domain</label>
                            <Input id="domain" name="domain" placeholder="e.g. logpulse.com" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="brandColor" className="text-sm font-medium">Brand Color</label>
                            <div className="flex gap-2">
                                <Input id="brandColor" name="brandColor" type="color" className="w-12 h-10 p-1 cursor-pointer" defaultValue="#4f46e5" />
                                <Input name="brandColorText" placeholder="#4f46e5" className="flex-1" defaultValue="#4f46e5" readOnly />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                                </>
                            ) : (
                                "Create Project"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
