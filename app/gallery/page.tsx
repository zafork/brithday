"use client";

import { useState } from "react";
import { galleryData } from "@/lib/galleryData";
import { ConstellationView } from "@/components/gallery/ConstellationView";
import { PhotoModal } from "@/components/gallery/PhotoModal";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
    const [selectedPhoto, setSelectedPhoto] = useState<typeof galleryData[0] | null>(null);

    return (
        <div className="w-full flex-1 flex flex-col lg:flex-row py-6 px-4 md:px-8 max-w-[1600px] mx-auto z-10 gap-8 lg:items-center my-auto min-h-[calc(100vh-144px)]">

            {/* Header (Left Column on Desktop) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 lg:w-[350px] lg:justify-center"
            >
                <div className="flex items-center gap-4 mb-4 lg:mb-6">
                    <span className="material-symbols-rounded text-accent-nebula text-4xl lg:text-5xl p-4 rounded-full bg-[rgba(167,139,250,0.05)] border border-[rgba(167,139,250,0.1)] shadow-[0_0_20px_rgba(167,139,250,0.15)]">photo_library</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 text-text-primary uppercase tracking-wide leading-tight" style={{ textShadow: "0 0 20px var(--glow-purple)" }}>
                    TRANS<br className="hidden lg:block" />MISIONES
                </h1>
                <div className="h-[2px] w-16 bg-gradient-to-r from-accent-nebula to-transparent mb-6 block" />
                <p className="font-body font-light italic text-text-secondary text-base lg:text-lg mb-8 max-w-[300px]">
                    Momentos capturados a través del tiempo y el espacio.
                </p>
                <div className="hidden lg:flex gap-3 items-center font-mono text-[10px] text-text-secondary/60 tracking-widest uppercase border border-white/5 bg-void/50 px-4 py-2 rounded-full">
                    <span className="material-symbols-rounded text-[14px] text-accent-star">arrow_forward</span> Explorar
                </div>
            </motion.div>

            {/* Content Area (Right Column on Desktop) */}
            <div className="flex-1 w-full relative min-h-[500px] lg:min-h-[600px] lg:h-[75vh] border border-transparent">
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-2xl"
                    >
                        <ConstellationView photos={galleryData} onPhotoClick={setSelectedPhoto} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Modal */}
            <PhotoModal
                photo={selectedPhoto}
                onClose={() => setSelectedPhoto(null)}
                allPhotos={galleryData}
                onNavigate={(p) => setSelectedPhoto(p)}
            />
        </div>
    );
}
