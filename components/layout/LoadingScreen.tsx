"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const name = `✦ ${config.birthdayPerson.name} ✦`;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800);
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center font-display"
                >
                    <div className="text-3xl tracking-widest text-text-primary flex gap-1 mb-8">
                        {name.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.08,
                                    duration: 0.5,
                                    ease: "easeOut"
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>

                    <div className="w-48 h-[2px] bg-[var(--glow-purple)] rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute top-0 left-0 h-full bg-accent-nebula"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
