"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const stars: { x: number; y: number; s: number; alpha: number; dAlpha: number }[] = [];
        const numStars = 200;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                s: Math.random() * 2 + 0.5,
                alpha: Math.random(),
                dAlpha: (Math.random() - 0.5) * 0.02,
            });
        }

        let scrollY = 0;
        const handleScroll = () => {
            scrollY = window.scrollY;
        };
        window.addEventListener("scroll", handleScroll);

        let animationFrameId: number;
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            stars.forEach((star) => {
                star.alpha += star.dAlpha;
                if (star.alpha <= 0.1 || star.alpha >= 1) {
                    star.dAlpha = -star.dAlpha;
                }

                const speed = star.s < 1 ? 0.3 : (star.s < 2 ? 0.15 : 0.05);
                let y = star.y - scrollY * speed;

                if (y < 0) {
                    y = (y % height) + height;
                } else if (y > height) {
                    y = y % height;
                }

                ctx.beginPath();
                ctx.arc(star.x, y, star.s, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1]"
        />
    );
}
