"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { planetMessages } from "@/lib/planetData";
import { MessageModal } from "@/components/planet/MessageModal";

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

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const handleHotspotClick = (msg: Message) => {
        setActiveMessage(msg);
        if (!discoveredIds.has(msg.id)) {
            setDiscoveredIds(prev => new Set(prev).add(msg.id));
        }
    };

    const progress = (discoveredIds.size / planetMessages.length) * 100;
    const isComplete = discoveredIds.size === planetMessages.length;

    return (
        <div className="w-full relative flex flex-col items-center overflow-hidden h-[calc(100vh-144px)]">

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
                />
            </div>

            {/* Modal */}
            <MessageModal
                message={activeMessage}
                onClose={() => setActiveMessage(null)}
            />

        </div>
    );
}
