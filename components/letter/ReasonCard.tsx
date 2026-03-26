"use client";
import { motion } from "framer-motion";

export function ReasonCard({ id, icon, text, index }: { id: string, icon: string, text: string, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative p-6 md:p-8 rounded-lg border border-[rgba(167,139,250,0.15)] bg-surface/50 hover:bg-surface transition-colors duration-300 group overflow-hidden shadow-lg hover:shadow-[0_0_20px_var(--glow-purple)]"
        >
            {/* Big Number Background */}
            <div className="absolute -right-2 -bottom-6 font-display font-bold text-[8rem] leading-none text-white opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none select-none">
                {id}
            </div>

            <div className="relative z-10">
                <span className="material-symbols-rounded text-3xl md:text-4xl text-accent-nebula mb-5 block drop-shadow-[0_0_8px_rgba(167,139,250,0.4)] group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 origin-left">
                    {icon}
                </span>
                <p className="font-body font-light text-text-primary text-base md:text-lg leading-relaxed shadow-black drop-shadow-md">
                    {text}
                </p>
            </div>

            {/* Subtle hover glow gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
}
