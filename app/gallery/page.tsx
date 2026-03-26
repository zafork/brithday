"use client";

import { useState } from "react";
import { galleryData } from "@/lib/galleryData";
import { MasonryGrid } from "@/components/gallery/MasonryGrid";
import { CoverflowCarousel } from "@/components/gallery/CoverflowCarousel";
import { ConstellationView } from "@/components/gallery/ConstellationView";
import { PhotoModal } from "@/components/gallery/PhotoModal";
import { motion, AnimatePresence } from "framer-motion";

export type ViewMode = "GRID" | "CAROUSEL" | "CONSTELLATION";

export default function GalleryPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("GRID");
    const [selectedPhoto, setSelectedPhoto] = useState<typeof galleryData[0] | null>(null);

    return (
        <div className="w-full min-h-[calc(100vh-144px)] flex flex-col py-10 px-4 md:px-8 max-w-[1400px] mx-auto z-10">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center mb-10"
            >
                <span className="material-symbols-rounded text-accent-nebula text-4xl mb-4 p-4 rounded-full bg-[rgba(167,139,250,0.05)] border border-[rgba(167,139,250,0.1)]">photo_library</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 text-text-primary uppercase tracking-wide" style={{ textShadow: "0 0 20px var(--glow-purple)" }}>
                    TRANSMISIONES
                </h1>
                <p className="font-body font-light italic text-text-secondary text-base md:text-lg mb-8">
                    Momentos capturados a través del tiempo y el espacio
                </p>
                <div className="h-[1px] w-[200px] bg-gradient-to-r from-transparent via-accent-nebula to-transparent" />
            </motion.div>

            {/* View Mode Selector */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center mb-12"
            >
                <div className="flex gap-2 p-1.5 bg-elevated rounded-full border border-[rgba(167,139,250,0.3)] shadow-[0_0_20px_var(--glow-purple)] backdrop-blur-md">
                    {([
                        { id: "GRID", icon: "grid_view" },
                        { id: "CAROUSEL", icon: "view_carousel" },
                        { id: "CONSTELLATION", icon: "hub" }
                    ] as const).map(mode => (
                        <button
                            key={mode.id}
                            onClick={() => setViewMode(mode.id)}
                            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${viewMode === mode.id
                                    ? "bg-accent-nebula text-void shadow-[0_0_15px_var(--glow-purple)] scale-100"
                                    : "text-text-secondary hover:text-text-primary hover:bg-[rgba(167,139,250,0.15)] scale-95 hover:scale-100"
                                }`}
                        >
                            <span className="material-symbols-rounded text-[24px]">
                                {mode.icon}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Content Area */}
            <div className="flex-grow w-full relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={viewMode}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        {viewMode === "GRID" && <MasonryGrid photos={galleryData} onPhotoClick={setSelectedPhoto} />}
                        {viewMode === "CAROUSEL" && <CoverflowCarousel photos={galleryData} onPhotoClick={setSelectedPhoto} />}
                        {viewMode === "CONSTELLATION" && <ConstellationView photos={galleryData} onPhotoClick={setSelectedPhoto} />}
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
