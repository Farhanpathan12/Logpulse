"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


const items = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Installation", href: "/docs/installation" },
            { title: "Quick Start", href: "/docs/quick-start" },
        ],
    },
    {
        title: "Widget",
        items: [
            { title: "Configuration", href: "/docs/widget/configuration" },
            { title: "Customization", href: "/docs/widget/customization" },
            { title: "API Reference", href: "/docs/api" },
        ],
    },
];

export function DocsSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-full px-2">
            {items.map((item, index) => (
                <div key={index} className="pb-8">
                    <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-semibold text-zinc-100">
                        {item.title}
                    </h4>
                    <div className="grid grid-flow-row auto-rows-max text-sm">
                        {item.items.map((subItem, subIndex) => (
                            <Link
                                key={subIndex}
                                href={subItem.href}
                                className={cn(
                                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white",
                                    pathname === subItem.href
                                        ? "bg-indigo-500/10 font-medium text-indigo-400"
                                        : ""
                                )}
                            >
                                {subItem.title}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
