"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePost } from "@/app/actions";
import { toast } from "sonner";

interface DeletePostDialogProps {
    projectId: string;
    postId: string;
    trigger?: React.ReactNode;
}

export function DeletePostDialog({ projectId, postId, trigger }: DeletePostDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const formData = new FormData();
        formData.append("projectId", projectId);
        formData.append("postId", postId);

        try {
            await deletePost(formData);
            toast.success("Post deleted successfully");
            setOpen(false);
        } catch (error) {
            toast.error("Failed to delete post");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {trigger || (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-400/10">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400">
                        This action cannot be undone. This will permanently delete this update and remove it from your widget.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-white">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        className="bg-red-600 text-white hover:bg-red-700 border-0"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
