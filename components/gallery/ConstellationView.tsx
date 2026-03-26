"use client";
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData } from "@/lib/galleryData";

type Photo = typeof galleryData[0];

export function ConstellationView({ photos, onPhotoClick }: { photos: Photo[], onPhotoClick: (p: Photo) => void }) {
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);

    // Generate pseudo-random deterministic positions so they form a nice constellation
    const nodes = useMemo(() => {
        return photos.map((p, i) => {
            const angle = (i / photos.length) * Math.PI * 2 * 2.3; // multiple rotations
            const radius = 25 + (Math.sin(i * 11) * 15); // radius varying 10 to 40%
            const x = 50 + Math.cos(angle) * (radius * 1.5); // elliptic spread
            const y = 50 + Math.sin(angle) * radius;
            return { ...p, x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) };
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
                        return nodes.slice(i + 1).map((targetNode, j) => {
                            const dx = node.x - targetNode.x;
                            const dy = node.y - targetNode.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            // Connect only if close enough
                            if (dist < 35) {
                                const isHoveredLine = hoveredNode === node.id || hoveredNode === targetNode.id;
                                return (
                                    <line
                                        key={`${i}-${j}`}
                                        x1={`${node.x}%`}
                                        y1={`${node.y}%`}
                                        x2={`${targetNode.x}%`}
                                        y2={`${targetNode.y}%`}
                                        stroke={isHoveredLine ? "var(--accent-nebula)" : "rgba(167,139,250,0.15)"}
                                        strokeWidth={isHoveredLine ? 1.5 : 0.8}
                                        className="transition-colors duration-500"
                                    />
                                );
                            }
                            return null;
                        });
                    })}
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
                            width: isHovered ? "260px" : "60px",
                            height: isHovered ? "260px" : "60px",
                            zIndex: isHovered ? 50 : 10,
                            borderRadius: isHovered ? "8px" : "50%",
                        }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => onPhotoClick(node)}
                    >
                        <div className="w-full h-full relative overflow-hidden" style={{ borderRadius: "inherit" }}>
                            <img
                                src={node.src}
                                alt=""
                                className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? "opacity-100 scale-105" : "opacity-60 scale-100"}`}
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
                                        <p className="font-mono text-[10px] text-accent-nebula tracking-widest">{node.date}</p>
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
