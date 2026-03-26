"use client";
import { motion, AnimatePresence } from "framer-motion";
import { planetMessages } from "@/lib/planetData";

type Message = typeof planetMessages[0];

export function MessageModal({
    message,
    onClose
}: {
    message: Message | null,
    onClose: () => void
}) {
    return (
        <AnimatePresence>
            {message && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-void/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative z-10 w-full max-w-md bg-elevated rounded-lg border border-accent-nebula/50 shadow-[0_0_30px_rgba(167,139,250,0.2)] overflow-hidden"
                    >
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-nebula to-accent-star" />

                        <div className="p-6 md:p-8">
                            <header className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="font-mono text-[10px] text-text-secondary tracking-widest mb-1">
                                        ✦ COORDENADAS {message.coordinates}
                                    </div>
                                    <div className="font-mono text-xs text-accent-nebula tracking-widest font-bold">
                                        MENSAJE #{message.id}
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-text-secondary hover:text-white hover:rotate-90 transition-all p-1"
                                >
                                    <span className="material-symbols-rounded">close</span>
                                </button>
                            </header>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-void border border-accent-star/30 flex items-center justify-center text-accent-star shadow-[0_0_15px_rgba(251,191,36,0.15)] flex-shrink-0">
                                    <span className="material-symbols-rounded text-[24px]">{message.icon}</span>
                                </div>
                                <h2 className="font-display text-2xl text-white leading-tight">
                                    {message.title}
                                </h2>
                            </div>

                            <div className="h-[1px] w-full bg-gradient-to-r from-[rgba(167,139,250,0.2)] to-transparent mb-6" />

                            <p className="font-body font-light text-text-primary/90 text-[1rem] leading-[1.8]">
                                {message.body}
                            </p>
                        </div>

                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#fff_1px,#fff_2px)]" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
