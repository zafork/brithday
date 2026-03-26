"use client";
import { motion } from "framer-motion";
import { galleryData } from "@/lib/galleryData";

type Photo = typeof galleryData[0];

export function PhotoCard({ photo, onClick }: { photo: Photo; onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={onClick}
            className="group relative rounded border border-[rgba(167,139,250,0.2)] overflow-hidden cursor-pointer hover:shadow-[0_0_20px_var(--glow-purple)] transition-all duration-500 w-full mb-6 break-inside-avoid bg-surface"
        >
            <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-auto object-cover block group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <span className="material-symbols-rounded absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                open_in_full
            </span>

            <motion.div
                className="absolute bottom-0 left-0 right-0 p-5 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
            >
                <h3 className="font-display text-2xl text-white mb-1 drop-shadow-lg">{photo.title}</h3>
                <p className="font-body text-sm text-[rgba(255,255,255,0.7)] line-clamp-2 drop-shadow-md">{photo.description}</p>
            </motion.div>
        </motion.div>
    );
}
