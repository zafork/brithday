"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { galleryData } from "@/lib/galleryData";
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

type Photo = typeof galleryData[0];

export function CoverflowCarousel({ photos, onPhotoClick }: { photos: Photo[], onPhotoClick: (p: Photo) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="w-full py-10 relative"
        >
            {/* Custom Navigation */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-24 flex items-center justify-center z-20 cursor-pointer text-text-secondary hover:text-accent-nebula hover:scale-110 transition-all custom-swiper-prev">
                <span className="material-symbols-rounded text-4xl md:text-5xl drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">chevron_left</span>
            </div>
            <div className="absolute inset-y-0 right-0 w-12 md:w-24 flex items-center justify-center z-20 cursor-pointer text-text-secondary hover:text-accent-nebula hover:scale-110 transition-all custom-swiper-next">
                <span className="material-symbols-rounded text-4xl md:text-5xl drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">chevron_right</span>
            </div>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 15,
                    stretch: 0,
                    depth: 250,
                    modifier: 1,
                    slideShadows: false, // Turned off default shadows for custom styling
                }}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination'
                }}
                navigation={{
                    prevEl: '.custom-swiper-prev',
                    nextEl: '.custom-swiper-next',
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="w-full max-w-[100vw] overflow-y-visible"
            >
                {photos.map((photo) => (
                    <SwiperSlide key={photo.id} className="w-[300px] md:w-[600px] h-[400px] md:h-[700px] my-4" onClick={() => onPhotoClick(photo)}>
                        <div className="w-full h-full rounded-md border border-[rgba(167,139,250,0.3)] overflow-hidden relative group shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                            <img
                                src={photo.src}
                                alt={photo.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <h3 className="font-display text-3xl md:text-4xl text-white mb-2">{photo.title}</h3>
                                <p className="font-body text-sm md:text-base text-[rgba(255,255,255,0.8)] italic mb-4">{photo.description}</p>
                                <div className="font-mono text-[10px] md:text-xs text-accent-nebula tracking-wider">
                                    {photo.date} · {photo.category.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="custom-pagination mt-12 flex justify-center gap-3 relative z-20" />
        </motion.div>
    );
}
