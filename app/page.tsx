"use client";

import { HeroText } from "@/components/hero/HeroText";
import { Countdown } from "@/components/hero/Countdown";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Floating comets to make the scene richer
function ShootingStars() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                initial={{ x: "100%", y: "-100%", opacity: 1 }}
                animate={{ x: "-100%", y: "100%", opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "linear" }}
                className="absolute top-1/4 left-1/2 w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rotate-45 transform-gpu"
            />
            <motion.div
                initial={{ x: "120%", y: "-120%", opacity: 1 }}
                animate={{ x: "-50%", y: "50%", opacity: 0 }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, ease: "linear", delay: 2 }}
                className="absolute top-[10%] right-[10%] w-[100px] h-[1px] bg-gradient-to-r from-transparent via-accent-star to-transparent rotate-45 transform-gpu"
            />
            <motion.div
                initial={{ x: "150%", y: "-50%", opacity: 1 }}
                animate={{ x: "-50%", y: "150%", opacity: 0 }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 12, ease: "linear", delay: 5 }}
                className="absolute bottom-1/2 right-1/4 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-accent-nebula to-transparent rotate-45 transform-gpu"
            />
        </div>
    );
}

// Subtle grid lines to add "technical/space mission" feel
function TechGrid() {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
            <div className="w-full h-full bg-[linear-gradient(rgba(167,139,250,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.5)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>
    );
}

// Subtle rotating celestial radar
function OrbitalMap() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 3 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] pointer-events-none z-0 flex items-center justify-center"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[0.5px] border-white rounded-full border-dashed"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 md:inset-24 border-[0.5px] border-accent-nebula rounded-full"
            />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute inset-32 md:inset-48 border-[0.5px] border-accent-star rounded-full border-dotted"
            />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            {/* Little decorative orbit dots */}
            <div className="absolute top-16 left-1/2 w-2 h-2 rounded-full bg-accent-nebula/50 shadow-[0_0_10px_var(--glow-purple)]" />
            <div className="absolute bottom-48 right-1/2 w-1.5 h-1.5 rounded-full bg-accent-star/50 shadow-[0_0_10px_var(--glow-gold)]" />
        </motion.div>
    );
}

// Corner HUD
function CornerBrackets() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute inset-4 md:inset-8 lg:inset-12 pointer-events-none z-10"
        >
            <div className="absolute top-0 left-0 w-8 md:w-12 h-8 md:h-12 border-t-[1.5px] border-l-[1.5px] border-accent-nebula/50" />
            <div className="absolute top-0 right-0 w-8 md:w-12 h-8 md:h-12 border-t-[1.5px] border-r-[1.5px] border-accent-nebula/50" />
            <div className="absolute bottom-0 left-0 w-8 md:w-12 h-8 md:h-12 border-b-[1.5px] border-l-[1.5px] border-accent-star/50" />
            <div className="absolute bottom-0 right-0 w-8 md:w-12 h-8 md:h-12 border-b-[1.5px] border-r-[1.5px] border-accent-star/50" />

            <div className="hidden md:block absolute top-[50px] left-[-30px] text-[9px] font-mono text-white/50 tracking-[0.3em] -rotate-90 origin-top-left">SYS.INIT.01</div>
            <div className="hidden md:block absolute bottom-[50px] right-[-30px] text-[9px] font-mono text-white/50 tracking-[0.3em] rotate-90 origin-bottom-right">ORBIT.STABLE</div>
        </motion.div>
    );
}

export default function Home() {
    const router = useRouter();

    return (
        <div className="relative flex-1 w-full flex flex-col items-center justify-center overflow-hidden py-12 md:py-20 lg:py-24">

            <ShootingStars />
            <TechGrid />
            <OrbitalMap />
            <CornerBrackets />

            {/* Background Nebulas */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-accent-nebula rounded-full blur-[100px] md:blur-[150px] opacity-[0.25] -translate-x-1/2 -translate-y-1/2 animate-drift" />
                <div className="absolute bottom-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#4f46e5] rounded-full blur-[100px] md:blur-[150px] opacity-[0.15] translate-x-1/4 translate-y-1/4 animate-drift-alt" />
                <div className="absolute top-1/2 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent-star rounded-full blur-[80px] md:blur-[120px] opacity-[0.12] animate-drift" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">

                <div className="w-full flex justify-between absolute top-0 px-6 font-mono text-[10px] text-text-secondary/50 tracking-widest pointer-events-none md:block hidden">
                    <span>[ LAT: 34.0522 ]</span>
                    <span>[ LON: -118.2437 ]</span>
                </div>

                <HeroText />
                <Countdown />

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1, ease: "easeOut" }}
                    onClick={() => router.push('/gallery')}
                    className="group relative z-10 mt-10 md:mt-16 font-mono font-medium tracking-[0.2em] text-[10px] md:text-sm px-10 py-4 md:px-14 md:py-5 rounded-full overflow-hidden transition-all duration-500 shadow-[0_0_20px_rgba(167,139,250,0.1)] hover:shadow-[0_0_35px_rgba(167,139,250,0.3)] hover:-translate-y-1 border border-accent-nebula/30 hover:border-accent-nebula/80"
                >
                    <span className="relative z-10 text-white flex items-center gap-3">
                        INICIAR MISIÓN
                        <span className="material-symbols-rounded text-[18px] md:text-[22px] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-accent-nebula">rocket_launch</span>
                    </span>

                    {/* Subtle hover background */}
                    <div className="absolute inset-0 bg-accent-nebula opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none -z-10" />
                    <div className="absolute inset-0 bg-void -z-20" />
                </motion.button>

            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary/60 pointer-events-none"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent-nebula/50 to-transparent" />
            </motion.div>
        </div>
    );
}
