"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const mouse = useRef({ x: 0, y: 0 });
    const cursor = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Determine if it's a touch device
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        let animationFrameId: number;
        const render = () => {
            cursor.current.x += (mouse.current.x - cursor.current.x) * 0.12;
            cursor.current.y += (mouse.current.y - cursor.current.y) * 0.12;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
            }

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null; // hide custom cursor on mobile
    }

    return (
        <>
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                    transform: "translate(-50%, -50%)",
                    border: '1px solid var(--accent-nebula)'
                }}
                animate={{
                    width: isHovering ? 28 : 12,
                    height: isHovering ? 28 : 12,
                    backgroundColor: isHovering ? "var(--glow-purple)" : "transparent",
                }}
            />
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-[4px] h-[4px] rounded-full bg-accent-star pointer-events-none z-[10000]"
                style={{ transform: "translate(-50%, -50%)" }}
            />
        </>
    );
}
