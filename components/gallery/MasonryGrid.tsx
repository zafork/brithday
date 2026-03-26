"use client";
import { PhotoCard } from "./PhotoCard";
import { galleryData } from "@/lib/galleryData";
import { motion } from "framer-motion";

type Photo = typeof galleryData[0];

export function MasonryGrid({ photos, onPhotoClick }: { photos: Photo[], onPhotoClick: (p: Photo) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="columns-1 md:columns-2 lg:columns-3 gap-6 w-full pb-10"
        >
            {photos.map(p => (
                <PhotoCard key={p.id} photo={p} onClick={() => onPhotoClick(p)} />
            ))}
        </motion.div>
    );
}
