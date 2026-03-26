"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Countdown() {
    const { timeLeft, isBirthday } = useCountdown();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!isBirthday || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = canvas.clientWidth;
        let height = canvas.height = canvas.clientHeight;

        const colors = ["#a78bfa", "#fbbf24", "#34d399"];
        const particles: { x: number, y: number, r: number, dx: number, dy: number, color: string, a: number }[] = [];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: width / 2,
                y: height / 2,
                r: Math.random() * 4 + 1,
                dx: (Math.random() - 0.5) * 10,
                dy: (Math.random() - 0.5) * 10 - 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                a: 1
            });
        }

        let animationId: number;
        let opacity = 1;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            let allDead = true;
            opacity -= 0.005; // Fade out whole system over 4s~ approx

            particles.forEach(p => {
                if (p.a > 0) allDead = false;

                ctx.globalAlpha = Math.max(0, p.a * opacity);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;
                p.dy += 0.2; // gravity
                p.a -= 0.01;
            });

            if (!allDead && opacity > 0) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [isBirthday]);

    if (isBirthday) {
        return (
            <div className="relative mt-8 mb-4 md:mt-12 md:mb-8 flex justify-center items-center z-10 w-full min-h-[120px]">
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "backOut", delay: 1.5 }}
                    className="font-display text-2xl md:text-3xl text-accent-star tracking-widest text-center"
                    style={{ textShadow: "0 0 15px var(--glow-gold)" }}
                >
                    ✦ HOY ES TU DÍA ✦
                </motion.div>
            </div>
        );
    }

    const timeUnits = [
        { label: "DÍAS", value: timeLeft.days },
        { label: "HRS", value: timeLeft.hours },
        { label: "MIN", value: timeLeft.minutes },
        { label: "SEG", value: timeLeft.seconds }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex gap-3 md:gap-6 mt-12 mb-8 z-10"
        >
            <AnimatePresence mode="popLayout">
                {timeUnits.map((unit, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 md:gap-3">
                        <div className="w-12 h-14 md:w-16 md:h-20 bg-elevated rounded-md flex justify-center items-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-[rgba(167,139,250,0.1)] relative overflow-hidden">
                            <motion.span
                                key={unit.value}
                                initial={{ rotateX: 90, opacity: 0 }}
                                animate={{ rotateX: 0, opacity: 1 }}
                                exit={{ rotateX: -90, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="font-mono text-xl md:text-3xl text-text-primary absolute"
                            >
                                {unit.value.toString().padStart(2, "0")}
                            </motion.span>
                        </div>
                        <span className="font-mono text-[9px] md:text-[10px] text-text-secondary tracking-widest">
                            {unit.label}
                        </span>
                    </div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
}
