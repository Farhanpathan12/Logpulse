"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Loader2, Check } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useState } from "react";

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-500 hover:underline cursor-pointer",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-lg border border-zinc-800 my-4 max-h-[400px] object-contain",
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: "min-h-[150px] w-full rounded-md bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const { startUpload } = useUploadThing("imageUploader");

    const handleImageUpload = async () => {
        if (!editor) return;

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                setUploadStatus('uploading');
                const loadingToast = toast.loading("Uploading image...");

                try {
                    const res = await startUpload([file]);

                    if (res && res.length > 0) {
                        editor.chain().focus().setImage({ src: res[0].url }).run();
                        toast.dismiss(loadingToast);
                        toast.success("Image uploaded successfully!");
                        setUploadStatus('success');

                        // Revert to idle after 2 seconds
                        setTimeout(() => {
                            setUploadStatus('idle');
                        }, 2000);
                    }
                } catch (error) {
                    toast.dismiss(loadingToast);
                    toast.error(`Upload failed: ${(error as Error).message}`);
                    setUploadStatus('idle');
                }
            }
        };
        input.click();
    };

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) {
            return;
        }

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-col gap-0 rounded-md bg-transparent h-full relative">
            {/* Toolbar */}
            <div className="flex items-center gap-2 border-b border-zinc-800/50 p-3 overflow-x-auto bg-zinc-900/30 backdrop-blur-md sticky top-0 z-10 transition-all">
                <div className="flex items-center gap-1 bg-zinc-950/50 rounded-lg p-1 border border-white/5">
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("bold")}
                        onPressedChange={() => editor.chain().focus().toggleBold().run()}
                        aria-label="Toggle bold"
                        className="data-[state=on]:bg-white data-[state=on]:text-black hover:bg-white/10 hover:text-white text-zinc-400 transition-all h-8 w-8 rounded-md"
                    >
                        <Bold className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("italic")}
                        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                        aria-label="Toggle italic"
                        className="data-[state=on]:bg-white data-[state=on]:text-black hover:bg-white/10 hover:text-white text-zinc-400 transition-all h-8 w-8 rounded-md"
                    >
                        <Italic className="h-4 w-4" />
                    </Toggle>
                </div>

                <div className="w-px h-5 bg-zinc-800/50" />

                <div className="flex items-center gap-1 bg-zinc-950/50 rounded-lg p-1 border border-white/5">
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("bulletList")}
                        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                        aria-label="Toggle bullet list"
                        className="data-[state=on]:bg-white data-[state=on]:text-black hover:bg-white/10 hover:text-white text-zinc-400 transition-all h-8 w-8 rounded-md"
                    >
                        <List className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("orderedList")}
                        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                        aria-label="Toggle ordered list"
                        className="data-[state=on]:bg-white data-[state=on]:text-black hover:bg-white/10 hover:text-white text-zinc-400 transition-all h-8 w-8 rounded-md"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Toggle>
                </div>

                <div className="w-px h-5 bg-zinc-800/50" />

                <div className="flex items-center gap-1 bg-zinc-950/50 rounded-lg p-1 border border-white/5">
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("link")}
                        onPressedChange={setLink}
                        aria-label="Toggle Link"
                        className="data-[state=on]:bg-white data-[state=on]:text-black hover:bg-white/10 hover:text-white text-zinc-400 transition-all h-8 w-8 rounded-md"
                    >
                        <LinkIcon className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={false}
                        onPressedChange={handleImageUpload}
                        aria-label="Upload Image"
                        disabled={uploadStatus === 'uploading'}
                        className={`transition-all h-8 w-8 rounded-md ${uploadStatus === 'success'
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                : "hover:bg-white/10 hover:text-white text-zinc-400"
                            }`}
                    >
                        {uploadStatus === 'uploading' ? (
                            <Loader2 className="h-4 w-4 animate-spin text-zinc-200" />
                        ) : uploadStatus === 'success' ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <ImageIcon className="h-4 w-4" />
                        )}
                    </Toggle>
                </div>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="p-4 min-h-[500px] prose prose-sm prose-invert max-w-none focus:outline-none" />

            {/* Global Styles for Editor Content */}
            <style jsx global>{`
                .ProseMirror p.is-editor-empty:first-child::before {
                    color: #52525b;
                    content: attr(data-placeholder);
                    float: left;
                    height: 0;
                    pointer-events: none;
                    font-style: italic;
                }
                .ProseMirror:focus {
                    outline: none;
                }
                .ProseMirror ul {
                    list-style-type: disc;
                    padding-left: 1.5em;
                }
                .ProseMirror ol {
                    list-style-type: decimal;
                    padding-left: 1.5em;
                }
                .ProseMirror img {
                    display: block;
                    max-width: 100%;
                    height: auto;
                    margin: 1.5rem 0;
                    border-radius: 0.75rem;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .ProseMirror a {
                    color: #60a5fa;
                    text-decoration: underline;
                    text-underline-offset: 4px;
                }
                .ProseMirror blockquote {
                    border-left: 2px solid #3f3f46;
                    padding-left: 1rem;
                    font-style: italic;
                    color: #a1a1aa;
                }
            `}</style>
        </div>
    );
}
