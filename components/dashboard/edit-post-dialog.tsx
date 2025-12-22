"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updatePost } from "@/app/actions";
import { Pencil, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                </>
            ) : (
                "Save Changes"
            )}
        </Button>
    );
}

interface EditPostDialogProps {
    post: {
        id: string;
        title: string;
        content: string;
        category: "NEW" | "IMPROVED" | "FIXED";
        projectId: string;
    };
    trigger?: React.ReactNode;
}

import { RichTextEditor } from "@/components/ui/rich-text-editor";

export function EditPostDialog({ post, trigger }: EditPostDialogProps) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(post.content);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-zinc-950 border-zinc-800 text-zinc-100">
                <DialogHeader>
                    <DialogTitle>Edit Update</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Make changes to your changelog post here.
                    </DialogDescription>
                </DialogHeader>
                <form
                    action={async (formData) => {
                        await updatePost(formData);
                        setOpen(false);
                    }}
                    className="space-y-4"
                >
                    <input type="hidden" name="postId" value={post.id} />
                    <input type="hidden" name="projectId" value={post.projectId} />

                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-zinc-400">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={post.title}
                            className="bg-zinc-900 border-zinc-800 text-zinc-100 focus:ring-indigo-500/20 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category" className="text-zinc-400">Category</Label>
                        <Select name="category" defaultValue={post.category} required>
                            <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                                <SelectItem value="NEW">✨ New Feature</SelectItem>
                                <SelectItem value="IMPROVED">🚀 Improvement</SelectItem>
                                <SelectItem value="FIXED">🐛 Bug Fix</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content" className="text-zinc-400">Content</Label>
                        <input type="hidden" name="content" value={content} />
                        <RichTextEditor
                            value={content}
                            onChange={setContent}
                        />
                    </div>

                    <DialogFooter>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
