"use client";

import { motion } from "framer-motion";

export function ReasonCard({ id, icon, text, index }: { id: string, icon: string, text: string, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
            className="relative p-3 md:p-4 rounded-lg border border-[rgba(167,139,250,0.15)] bg-surface/50 hover:bg-surface transition-colors duration-300 group overflow-hidden shadow-md hover:shadow-[0_0_15px_var(--glow-purple)] flex flex-row items-center gap-4 cursor-default"
        >
            <div className="absolute top-1 right-2 font-display font-bold text-[3rem] leading-none text-white opacity-[0.03] pointer-events-none select-none">
                {id}
            </div>

            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-accent-star/30 flex items-center justify-center bg-void/50 group-hover:bg-void group-hover:scale-110 transition-all duration-300">
                <span className="material-symbols-rounded text-[20px] md:text-[24px] text-accent-nebula drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]">
                    {icon}
                </span>
            </div>

            <div className="relative z-10 flex-1">
                <p className="font-body font-light text-text-primary text-[0.8rem] md:text-[0.9rem] leading-[1.5] drop-shadow-md">
                    {text}
                </p>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
}
