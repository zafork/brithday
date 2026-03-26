"use client";

import { HeroText } from "@/components/hero/HeroText";
import { Countdown } from "@/components/hero/Countdown";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative w-full flex-grow flex flex-col items-center justify-center overflow-hidden min-h-[calc(100vh-144px)] py-10">
            {/* Background Nebulas */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent-nebula rounded-full blur-[100px] md:blur-[120px] opacity-[0.18] -translate-x-1/2 -translate-y-1/2 animate-drift" />
                <div className="absolute bottom-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#4f46e5] rounded-full blur-[100px] md:blur-[120px] opacity-[0.12] translate-x-1/4 translate-y-1/4 animate-drift-alt" />
                <div className="absolute top-1/2 right-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-accent-star rounded-full blur-[80px] md:blur-[120px] opacity-[0.08] animate-drift" />
            </div>

            <HeroText />
            <Countdown />

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                onClick={() => router.push('/gallery')}
                className="group relative z-10 mt-6 md:mt-8 font-body font-normal text-sm md:text-base px-6 py-3 md:px-8 md:py-3.5 rounded-sm overflow-hidden transition-all duration-300"
            >
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                    Explorar tu universo <span className="material-symbols-rounded text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                </span>

                {/* Border and gradient backgrounds */}
                <div className="absolute inset-0 p-[1px] rounded-sm bg-gradient-to-r from-accent-nebula to-accent-star -z-10" />
                <div className="absolute inset-[1px] bg-void rounded-sm -z-10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(167,139,250,0.15)] to-[rgba(251,191,36,0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />
            </motion.button>

            {/* Scroll indicator */}
            <AnimatePresence>
                {!hasScrolled && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 2.5, duration: 1 }}
                        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 text-text-secondary pointer-events-none"
                    >
                        <motion.span
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="material-symbols-rounded text-xl"
                        >
                            keyboard_arrow_down
                        </motion.span>
                        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em]">DESLIZA</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Invisible spacer to allow some scrolling on home page to trigger header hide/show/scroll indicator hide */}
            <div className="h-[20vh] w-full" />
        </div>
    );
}
