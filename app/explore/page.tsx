"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { planetMessages } from "@/lib/planetData";
import { MessageModal } from "@/components/planet/MessageModal";
import { config } from "@/lib/config";

const PlanetScene = dynamic(() => import("@/components/planet/PlanetScene"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-accent-nebula animate-spin" />
        </div>
    )
});

type Message = typeof planetMessages[0];

export default function ExplorePage() {
    const [activeMessage, setActiveMessage] = useState<Message | null>(null);
    const [discoveredIds, setDiscoveredIds] = useState<Set<number>>(new Set());
    const [showFinalMessage, setShowFinalMessage] = useState(false);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const handleHotspotClick = (msg: Message) => {
        setActiveMessage(msg);
        if (!discoveredIds.has(msg.id)) {
            setDiscoveredIds(prev => new Set(prev).add(msg.id));
        }
    };

    const handleCloseModal = () => {
        setActiveMessage(null);
        if (discoveredIds.size === planetMessages.length) {
            setTimeout(() => setShowFinalMessage(true), 600);
        }
    };

    const progress = (discoveredIds.size / planetMessages.length) * 100;
    const isComplete = discoveredIds.size === planetMessages.length;

    return (
        <div className="flex-1 w-full relative flex flex-col items-center overflow-hidden">

            {/* Header UI over Canvas */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-6 left-0 right-0 z-10 flex flex-col items-center text-center px-4 pointer-events-none"
            >
                <h1 className="font-display text-3xl md:text-5xl text-white tracking-widest uppercase mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                    Explorar el planeta
                </h1>
                <p className="font-body text-text-secondary text-sm md:text-base italic font-light mb-6 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                    Encuentra los {planetMessages.length} mensajes ocultos en su superficie
                </p>

                {mounted && (
                    <div className="w-full max-w-[280px] bg-void/60 backdrop-blur-md border border-[rgba(167,139,250,0.2)] rounded-full p-1 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                        <div className="flex justify-between font-mono text-[10px] text-text-secondary px-3 mb-1.5 pt-1">
                            <span>PROGRESO</span>
                            <span className={isComplete ? "text-accent-star font-bold" : "text-white"}>
                                {discoveredIds.size} / {planetMessages.length}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-void rounded-full overflow-hidden border border-[rgba(255,255,255,0.05)]">
                            <motion.div
                                className="h-full bg-gradient-to-r from-accent-nebula to-accent-star"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                )}
            </motion.div>

            {/* 3D Canvas Container */}
            <div className="absolute inset-0 z-0">
                <PlanetScene
                    activeMessage={activeMessage}
                    onHotspotClick={handleHotspotClick}
                    discoveredIds={discoveredIds}
                />
            </div>

            {/* Item Modal */}
            <MessageModal
                message={activeMessage}
                onClose={handleCloseModal}
            />

            {/* Final Message Modal */}
            <AnimatePresence>
                {showFinalMessage && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-void/80 backdrop-blur-lg"
                            onClick={() => setShowFinalMessage(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 30 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="relative z-10 w-full max-w-lg bg-surface rounded-xl border border-accent-star/50 shadow-[0_0_50px_rgba(251,191,36,0.2)] overflow-hidden text-center p-8 md:p-12 pointer-events-auto"
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-star to-accent-nebula" />

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="mx-auto w-20 h-20 mb-6 bg-[rgba(251,191,36,0.1)] rounded-full flex items-center justify-center border border-accent-star/30 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                            >
                                <span className="material-symbols-rounded text-5xl text-accent-star">rocket_launch</span>
                            </motion.div>

                            <h2 className="font-display text-3xl md:text-5xl text-white mb-4 leading-tight">
                                Misión Cumplida
                            </h2>
                            <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-accent-star to-transparent mb-6 opacity-50" />
                            <p className="font-body text-text-primary/90 text-sm md:text-lg mb-8 leading-relaxed font-light">
                                Has explorado todos los rincones de este pequeño planeta y descubierto cada uno de los mensajes. Gracias por orbitar conmigo, {config.birthdayPerson.name}. Mi universo es más hermoso porque tú existes en él.
                            </p>

                            <button
                                onClick={() => setShowFinalMessage(false)}
                                className="font-mono text-xs tracking-widest text-void bg-accent-star hover:bg-white px-8 py-3 rounded-full transition-colors font-bold shadow-[0_0_15px_rgba(251,191,36,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                            >
                                VOLVER A LA NAVE
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
