"use client";

import { useEffect, useRef } from "react";
import { config } from "@/lib/config";
import gsap from "gsap";
import { motion } from "framer-motion";

export function HeroText() {
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!titleRef.current) return;

        // small delay to let loading screen finish
        const timer = setTimeout(() => {
            const chars = titleRef.current?.querySelectorAll('.char');
            if (chars) {
                gsap.fromTo(chars,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.05,
                        duration: 1,
                        ease: "power3.out"
                    }
                );
            }
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const name = config.birthdayPerson.name;

    return (
        <div className="flex flex-col items-center justify-center text-center z-10 relative">
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes pulse-glow {
          0% { filter: drop-shadow(0 0 10px rgba(167, 139, 250, 0.2)); }
          100% { filter: drop-shadow(0 0 25px rgba(167, 139, 250, 0.6)); }
        }
      `}} />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="font-mono text-text-secondary tracking-[0.3em] text-[11px] mb-6 flex items-center gap-2 uppercase"
            >
                <span className="material-symbols-rounded text-[14px]">my_location</span>
                MISIÓN ESPECIAL · {config.birthdayPerson.birthday}
            </motion.div>

            <h1
                ref={titleRef}
                className="font-display font-light text-[clamp(4rem,12vw,9rem)] leading-none mb-4"
                style={{
                    background: "linear-gradient(to right, var(--accent-nebula), var(--accent-star))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "pulse-glow 3s infinite alternate ease-in-out"
                }}
            >
                {name.split("").map((char, i) => (
                    <span key={i} className="char inline-block opacity-0 translate-y-[60px] pb-2">
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="font-display italic font-light text-[1.5rem] md:text-[1.8rem] text-text-secondary"
            >
                Feliz Cumpleaños
            </motion.div>
        </div>
    );
}
