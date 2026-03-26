"use client";
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { galleryData } from "@/lib/galleryData";

type Photo = typeof galleryData[0];

export function ConstellationView({ photos, onPhotoClick }: { photos: Photo[], onPhotoClick: (p: Photo) => void }) {
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);

    // Generate pseudo-random deterministic positions so they form a nice constellation
    const nodes = useMemo(() => {
        return photos.map((p, i) => {
            const t = (i / photos.length) * Math.PI * 2;

            // X: 16 sin^3(t) -> range is [-16, 16]
            let baseX = 16 * Math.pow(Math.sin(t), 3);

            // Y: 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t) 
            // Negative to flip it upright. Range is approx [-6, 17]
            let baseY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

            // Normalize coordinates to [0, 1]
            // X spans -16 to 16
            let normX = (baseX + 16) / 32;
            // The top of the lobes mathematically reaches approx -12, and bottom tip is 17. Total range = 29
            let normY = (baseY + 12) / 29;

            // Se elimina la distorsión orgánica para que la silueta del corazón sea absolutamente clara y perfecta
            // Map to interior bounds [25%, 75%] to make the heart noticeably smaller
            const finalX = 20 + normX * 60;
            const finalY = 15 + normY * 70;

            return { ...p, x: finalX, y: finalY };
        });
    }, [photos]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full min-h-[500px] lg:min-h-0 relative bg-surface/30 rounded-2xl border border-[rgba(167,139,250,0.1)] shadow-inner flex"
        >
            <div className="absolute inset-0 overflow-hidden bg-surface/30 rounded-2xl">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {nodes.map((node, i) => {
                        if (i === nodes.length - 1) return null;
                        const targetNode = nodes[i + 1];
                        const isHoveredLine = hoveredNode === node.id || hoveredNode === targetNode.id;

                        return (
                            <line
                                key={`line-${i}`}
                                x1={`${node.x}%`}
                                y1={`${node.y}%`}
                                x2={`${targetNode.x}%`}
                                y2={`${targetNode.y}%`}
                                stroke={isHoveredLine ? "var(--accent-nebula)" : "rgba(167,139,250,0.25)"}
                                strokeWidth={isHoveredLine ? 2 : 1}
                                className="transition-colors duration-500"
                            />
                        );
                    })}
                    {/* Closes the heart loop */}
                    {nodes.length > 1 && (
                        <line
                            x1={`${nodes[nodes.length - 1].x}%`}
                            y1={`${nodes[nodes.length - 1].y}%`}
                            x2={`${nodes[0].x}%`}
                            y2={`${nodes[0].y}%`}
                            stroke={hoveredNode === nodes[nodes.length - 1].id || hoveredNode === nodes[0].id ? "var(--accent-nebula)" : "rgba(167,139,250,0.25)"}
                            strokeWidth={hoveredNode === nodes[nodes.length - 1].id || hoveredNode === nodes[0].id ? 2 : 1}
                            className="transition-colors duration-500"
                        />
                    )}
                </svg>
            </div>

            {nodes.map((node) => {
                const isHovered = hoveredNode === node.id;

                return (
                    <div
                        key={node.id}
                        className="absolute rounded-full border border-[rgba(167,139,250,0.6)] cursor-pointer shadow-[0_0_10px_var(--glow-purple)] z-10 bg-void flex items-center justify-center transition-all duration-500 ease-out"
                        style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            transform: "translate(-50%, -50%)",
                            width: isHovered ? "280px" : "44px",
                            height: isHovered ? "280px" : "44px",
                            zIndex: isHovered ? 50 : 10,
                            borderRadius: isHovered ? "8px" : "50%",
                        }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => onPhotoClick(node)}
                    >
                        <div className="w-full h-full relative overflow-hidden" style={{ borderRadius: "inherit" }}>
                            <Image
                                src={node.src}
                                alt={node.title || "Fotografía de nuestra constelación"}
                                fill
                                sizes="(max-width: 768px) 100vw, 280px"
                                className={`object-cover transition-opacity duration-500 ${isHovered ? "opacity-100 scale-105" : "opacity-60 scale-100"}`}
                            />
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/90 to-transparent pt-12 pb-4 px-4"
                                    >
                                        <h4 className="font-display text-xl text-white leading-tight mb-1">{node.title}</h4>
                                        <p className="font-mono text-[10px] text-accent-nebula tracking-widest uppercase">{node.category}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {!isHovered && (
                            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-accent-nebula duration-[3000ms]" />
                        )}

                        {/* Little core dot when not hovered */}
                        {!isHovered && (
                            <div className="absolute w-1.5 h-1.5 bg-accent-star rounded-full shadow-[0_0_5px_var(--glow-gold)]" />
                        )}
                    </div>
                );
            })}
        </motion.div>
    );
}
