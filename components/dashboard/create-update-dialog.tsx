"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2, CalendarIcon, Mail, Lock } from "lucide-react";
import { createPost, updatePost } from "@/app/actions";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Post {
    id: string;
    title: string;
    content: string;
    category: "NEW" | "IMPROVED" | "FIXED";
    scheduledFor?: Date;
}

export function CreateUpdateDialog({ projectId, trigger, post, plan = "FREE" }: { projectId: string, trigger?: React.ReactNode, post?: Post, plan?: string }) {
    const [open, setOpen] = useState(false);
    const canSendEmail = plan === "PRO" || plan === "BUSINESS";
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(post?.content || "");
    const [date, setDate] = useState<Date | undefined>(post?.scheduledFor ? new Date(post.scheduledFor) : undefined);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    async function onSubmit(formData: FormData) {
        setIsLoading(true);
        try {
            // Append scheduledFor date if it exists
            if (date) {
                formData.append("scheduledFor", date.toISOString());
            }

            if (post) {
                formData.append("postId", post.id);
                await updatePost(formData);
                toast.success("Update saved!");
            } else {
                await createPost(formData);
                toast.success(date ? "Update scheduled!" : "Update published!");
            }
            setOpen(false); // Auto-close on success
        } catch (error) {
            console.error("Failed to save post:", error);
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ? trigger : (
                    <Button className="bg-white text-black hover:bg-zinc-200 shadow-xl shadow-white/5 border border-white/10 transition-all hover:scale-105 active:scale-95 font-medium rounded-full px-6">
                        <Plus className="w-4 h-4 mr-2" />
                        Write Update
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col p-0 gap-0 bg-zinc-950 border-zinc-800 text-zinc-100 shadow-2xl overflow-hidden">
                <DialogHeader className="p-6 border-b border-zinc-900 bg-zinc-950 z-20 flex-none">
                    <DialogTitle className="text-xl font-bold tracking-tight text-white">{post ? "Edit Update" : "New Update"}</DialogTitle>
                </DialogHeader>

                <form action={onSubmit} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto p-6 grid gap-8">
                        <input type="hidden" name="projectId" value={projectId} />

                        <div className="grid gap-2">
                            <label htmlFor="title" className="text-xs uppercase tracking-wider font-semibold text-zinc-500 ml-1">
                                Title of Update
                            </label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={post?.title}
                                placeholder="e.g. Added generic webhooks"
                                className="bg-zinc-900/50 border-zinc-800 text-zinc-100 text-lg font-medium placeholder:text-zinc-700 focus:border-white/20 focus:ring-0 h-12 rounded-xl transition-all hover:bg-zinc-900"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <label htmlFor="category" className="text-xs uppercase tracking-wider font-semibold text-zinc-500 ml-1">
                                    Category
                                </label>
                                <Select name="category" required defaultValue={post?.category || "NEW"}>
                                    <SelectTrigger className="bg-zinc-900/50 border-zinc-800 text-zinc-100 h-12 rounded-xl focus:ring-0 focus:border-white/20 hover:bg-zinc-900 transition-all">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl">
                                        <SelectItem value="NEW" className="focus:bg-zinc-900">
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-[10px] text-blue-500 border border-blue-500/20">✨</span>
                                                <span>New Feature</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="IMPROVED" className="focus:bg-zinc-900">
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] text-emerald-500 border border-emerald-500/20">🚀</span>
                                                <span>Improvement</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="FIXED" className="focus:bg-zinc-900">
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-[10px] text-orange-500 border border-orange-500/20">🐛</span>
                                                <span>Bug Fix</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-500 ml-1">
                                    Schedule (Optional)
                                </label>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                    className={cn(
                                        "w-full justify-start text-left font-normal bg-zinc-900/50 border-zinc-800 text-zinc-100 h-12 rounded-xl hover:bg-zinc-900 hover:text-white transition-all",
                                        !date && "text-muted-foreground",
                                        isCalendarOpen && "border-white/20 ring-1 ring-white/20 bg-zinc-900"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </div>
                        </div>

                        {/* Newsletter Toggle */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 transition-all hover:bg-zinc-900/50">
                            <div className="flex items-center gap-3">
                                <div className={cn("p-2 rounded-lg", canSendEmail ? "bg-indigo-500/10 text-indigo-500" : "bg-zinc-800 text-zinc-500")}>
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className={cn("text-sm font-medium", canSendEmail ? "text-white" : "text-zinc-500")}>Email Notification</p>
                                        {!canSendEmail && <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-medium">PRO</span>}
                                    </div>
                                    <p className="text-xs text-zinc-500">{canSendEmail ? "Send this update to all subscribers" : "Upgrade to send email blasts"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {!canSendEmail && <Lock className="w-4 h-4 text-zinc-600" />}
                                <input
                                    type="checkbox"
                                    name="sendNewsletter"
                                    defaultChecked={canSendEmail && !post}
                                    disabled={!canSendEmail}
                                    className="w-5 h-5 rounded bg-zinc-950 border-zinc-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed accent-indigo-500 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Calendar Inserted Here */}
                        {isCalendarOpen && (
                            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 animate-in fade-in slide-in-from-top-2">
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="flex-1">
                                        <label className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-3 block">
                                            Select Date
                                        </label>
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={(newDate) => {
                                                setDate(newDate);
                                            }}
                                            initialFocus
                                            className="bg-zinc-950 text-white w-full flex justify-center border border-zinc-900 rounded-lg p-2"
                                            classNames={{
                                                today: "bg-zinc-800 text-white font-bold",
                                                selected: "bg-white text-black hover:bg-white hover:text-black focus:bg-white focus:text-black",
                                                head_cell: "text-zinc-500 w-9 font-normal text-[0.8rem]",
                                                cell: "hidden sm:table-cell text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-zinc-800/50 [&:has([aria-selected])]:bg-zinc-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-zinc-800 rounded-md transition-colors",
                                                day_outside: "text-zinc-500 opacity-50 aria-selected:bg-zinc-800/50 aria-selected:text-zinc-500 aria-selected:opacity-30",
                                                day_disabled: "text-zinc-500 opacity-50",
                                                day_hidden: "invisible",
                                            }}
                                        />
                                    </div>
                                    <div className="w-full sm:w-48 bg-zinc-900/30 rounded-lg p-4 flex flex-col justify-center items-center text-center gap-2 border border-zinc-900">
                                        <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Scheduled For</span>
                                        <span className="text-xl font-medium text-white">
                                            {date ? format(date, "MMM dd, yyyy") : "No Date"}
                                        </span>
                                        <div className="h-px w-full bg-zinc-800 my-2" />
                                        <div className="flex gap-2 w-full">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => {
                                                    setDate(undefined);
                                                    setIsCalendarOpen(false);
                                                }}
                                                className="flex-1 text-zinc-400 hover:text-white"
                                            >
                                                Clear
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() => setIsCalendarOpen(false)}
                                                className="flex-1 bg-white text-black hover:bg-zinc-200"
                                            >
                                                Done
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid gap-2 mb-6">
                            <label htmlFor="content" className="text-xs uppercase tracking-wider font-semibold text-zinc-500 ml-1">
                                Description
                            </label>
                            <input type="hidden" name="content" value={content} />
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/20 transition-all min-h-[300px]">
                                <RichTextEditor
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Tell your users what's new..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="p-6 bg-zinc-950 border-t border-zinc-900 flex justify-end gap-3 z-20 flex-none">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="text-zinc-400 hover:text-white hover:bg-white/5 rounded-full px-6"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 font-medium transition-transform active:scale-95"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                post ? "Save Changes" : (date ? "Schedule Update" : "Publish Update")
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
