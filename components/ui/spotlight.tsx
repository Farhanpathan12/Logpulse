"use client";

import React, { useRef, useState, useEffect } from "react";

export function Spotlight({
    className = "",
    fill = "white",
}: {
    className?: string;
    fill?: string;
}) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${fill}, transparent 40%)`,
                }}
            />
            <div className="relative">{/* Children would go here if needed, but this is a background overlay */}</div>
        </div>
    );
}

export function BackgroundSpotlight() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[80%] rounded-full bg-indigo-900/20 blur-[120px] animate-pulse" />
            <div className="absolute top-[20%] -right-[20%] w-[60%] h-[80%] rounded-full bg-violet-900/20 blur-[120px] animate-pulse delay-1000" />
        </div>
    );
}
