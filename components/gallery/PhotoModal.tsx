"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryData } from "@/lib/galleryData";

type Photo = typeof galleryData[0];

export function PhotoModal({ photo, onClose, allPhotos, onNavigate }: { photo: Photo | null, onClose: () => void, allPhotos: Photo[], onNavigate: (p: Photo) => void }) {

    // keyboard nav
    useEffect(() => {
        if (!photo) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const idx = allPhotos.findIndex(p => p.id === photo.id);
                if (e.key === "ArrowRight") onNavigate(allPhotos[(idx + 1) % allPhotos.length]);
                if (e.key === "ArrowLeft") onNavigate(allPhotos[(idx - 1 + allPhotos.length) % allPhotos.length]);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [photo, allPhotos, onClose, onNavigate]);

    return (
        <AnimatePresence>
            {photo && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-void/90 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-10 max-w-[95vw] md:max-w-[85vw] max-h-[90vh] flex flex-col items-center"
                    >
                        <div className="relative rounded overflow-hidden border border-[rgba(167,139,250,0.3)] shadow-[0_0_50px_rgba(167,139,250,0.2)] flex justify-center bg-black group">
                            <img
                                src={photo.src}
                                alt={photo.title}
                                className="max-w-[95vw] md:max-w-[75vw] max-h-[60vh] md:max-h-[70vh] object-contain"
                            />
                        </div>

                        <div className="mt-6 text-center max-w-2xl bg-surface/50 backdrop-blur-xl p-6 rounded-lg border border-[rgba(255,255,255,0.08)] w-full relative shadow-2xl">
                            <h2 className="font-display text-3xl md:text-4xl text-white mb-3" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                                {photo.title}
                            </h2>
                            <p className="font-body text-text-secondary md:text-lg italic font-light mb-4 leading-relaxed">
                                {photo.description}
                            </p>
                            <div className="font-mono text-[10px] md:text-xs text-accent-star tracking-widest uppercase">
                                {photo.date} <span className="mx-2 text-text-secondary">·</span> {photo.category}
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute -top-14 right-0 md:top-6 md:right-6 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300 p-2 bg-void/50 rounded-full border border-white/10"
                            >
                                <span className="material-symbols-rounded text-2xl">close</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Controls */}
                    <div className="absolute inset-y-0 left-2 md:left-8 flex items-center pointer-events-none z-20">
                        <button
                            onClick={(e) => { e.stopPropagation(); const idx = allPhotos.findIndex(p => p.id === photo.id); onNavigate(allPhotos[(idx - 1 + allPhotos.length) % allPhotos.length]); }}
                            className="pointer-events-auto p-3 rounded-full bg-void/50 backdrop-blur-lg text-white/70 hover:text-white hover:bg-void/80 border border-white/10 transition-all hover:-translate-x-1"
                        >
                            <span className="material-symbols-rounded text-3xl">chevron_left</span>
                        </button>
                    </div>
                    <div className="absolute inset-y-0 right-2 md:right-8 flex items-center pointer-events-none z-20">
                        <button
                            onClick={(e) => { e.stopPropagation(); const idx = allPhotos.findIndex(p => p.id === photo.id); onNavigate(allPhotos[(idx + 1) % allPhotos.length]); }}
                            className="pointer-events-auto p-3 rounded-full bg-void/50 backdrop-blur-lg text-white/70 hover:text-white hover:bg-void/80 border border-white/10 transition-all hover:translate-x-1"
                        >
                            <span className="material-symbols-rounded text-3xl">chevron_right</span>
                        </button>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
