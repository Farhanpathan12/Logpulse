"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
    value: string;
    label?: string;
    className?: string;
}

export function CopyButton({ value, label, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className={cn(
                "h-8 px-3 text-xs font-medium gap-2 bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-all shadow-sm",
                className
            )}
            onClick={onCopy}
        >
            {copied ? (
                <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                </>
            ) : (
                <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{label || "Copy"}</span>
                </>
            )}
        </Button>
    );
}
