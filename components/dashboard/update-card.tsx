"use client";

import { useState } from "react";
import { Post } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreVertical, Pencil, Trash2, Eye, Calendar, Loader2, Image as ImageIcon } from "lucide-react";
import { updatePost, deletePost } from "@/app/actions";

export function UpdateCard({ post, projectId }: { post: Post; projectId: string }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Extract image and clean content for preview
    const imageMatch = post.content.match(/<img[^>]+src=["']([^"']+)["']/);
    const imgSrc = imageMatch ? imageMatch[1] : null;
    const cleanContent = post.content.replace(/<[^>]*>/g, ' ').trim(); // Strip HTML tags for clean preview

    async function onUpdate(formData: FormData) {
        setIsLoading(true);
        try {
            await updatePost(formData);
            setIsEditOpen(false);
        } catch (error) {
            console.error("Failed to update post:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function onDelete() {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("postId", post.id);
            formData.append("projectId", projectId);
            await deletePost(formData);
            setIsDeleteOpen(false);
        } catch (error) {
            console.error("Failed to delete post:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md hover:bg-zinc-900/80 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardTitle className="text-lg font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
                            {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 font-medium text-zinc-400">
                                {new Date((post as any).createdAt).toLocaleDateString()}
                            </span>
                            {post.published ? (
                                <span className="flex items-center gap-1 text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                    Published
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-amber-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                    Draft
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className={
                                post.category === "NEW"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : post.category === "IMPROVED"
                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }
                        >
                            {post.category}
                        </Badge>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-300">
                                <DropdownMenuItem onClick={() => setIsEditOpen(true)} className="focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer">
                                    <Pencil className="w-4 h-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setIsDeleteOpen(true)} className="text-red-400 focus:bg-red-950/30 focus:text-red-300 cursor-pointer">
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                        {cleanContent}
                    </p>

                    {imgSrc && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 hover:text-indigo-400 text-zinc-400 font-medium transition-all group/btn"
                            onClick={() => setImagePreview(imgSrc)}
                        >
                            <ImageIcon className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                            View Attached Image
                        </Button>
                    )}

                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5 text-xs text-zinc-500 font-medium">
                        <div className="flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            {post.views} views
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[600px] bg-zinc-950 border-zinc-800 text-zinc-100">
                    <DialogHeader>
                        <DialogTitle>Edit Update</DialogTitle>
                    </DialogHeader>
                    <form action={onUpdate} className="grid gap-6 py-4">
                        <input type="hidden" name="postId" value={post.id} />
                        <input type="hidden" name="projectId" value={projectId} />
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-400">Title</label>
                            <Input name="title" defaultValue={post.title} className="bg-zinc-950 border-zinc-800 text-zinc-100" required />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-400">Category</label>
                            <Select name="category" defaultValue={post.category}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                                    <SelectItem value="NEW">✨ New Feature</SelectItem>
                                    <SelectItem value="IMPROVED">🚀 Improvement</SelectItem>
                                    <SelectItem value="FIXED">🐛 Bug Fix</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-zinc-400">Content</label>
                            <Textarea name="content" defaultValue={post.content} className="h-40 bg-zinc-950 border-zinc-800 text-zinc-100" required />
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isLoading}>
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Alert */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                    <DialogHeader>
                        <DialogTitle>Delete Update?</DialogTitle>
                    </DialogHeader>
                    <p className="text-zinc-400">
                        This action cannot be undone. This will permanently delete this update.
                    </p>
                    <DialogFooter className="mt-4">
                        <Button variant="ghost" onClick={() => setIsDeleteOpen(false)} className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">Cancel</Button>
                        <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Image Preview Dialog */}
            <Dialog open={!!imagePreview} onOpenChange={(open) => !open && setImagePreview(null)}>
                <DialogContent className="bg-black/90 border-zinc-800 p-2 sm:max-w-[800px] w-full max-h-[90vh] flex items-center justify-center overflow-hidden">
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-md"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
