"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/config";
import { letterData } from "@/lib/letterData";
import { ReasonCard } from "./ReasonCard";

export function Book() {
    const [currentPage, setCurrentPage] = useState(0);

    const totalSpreads = 2;

    const { birthdayPerson, author, letter } = config;

    return (
        <div className="relative w-full max-w-[850px] h-[600px] md:h-[550px] perspective-[2000px] flex items-center justify-center -mt-16 md:-mt-12">

            {/* Centered Desktop Book Layout */}
            <div className={`relative w-full h-full transition-transform duration-1000 ease-in-out ${currentPage === 0 ? "md:-translate-x-1/4" : "translate-x-0"}`}>

                {/* Right side background (cover & right page) */}
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-elevated rounded-xl md:rounded-l-none shadow-[10px_10px_50px_rgba(0,0,0,0.8),inset_2px_0_10px_rgba(255,255,255,0.05)] border border-[rgba(167,139,250,0.2)] md:border-l-0" />

                {/* Left side background (when open) */}
                <div className={`hidden md:block absolute top-0 left-0 w-1/2 h-full bg-elevated rounded-xl rounded-r-none shadow-[-10px_10px_50px_rgba(0,0,0,0.8),inset_-2px_0_10px_rgba(255,255,255,0.05)] border border-[rgba(167,139,250,0.2)] border-r-0 transition-opacity duration-700 ${currentPage === 0 ? "opacity-0" : "opacity-100"}`} />

                {/* Content depending on spread */}
                <div className="absolute inset-0 flex flex-col md:flex-row pointer-events-none z-10">

                    {/* LEFT PAGE (hidden on mobile if cover or stacked) */}
                    <div className={`w-full md:w-1/2 h-1/2 md:h-full relative p-6 md:p-10 flex flex-col pointer-events-auto overflow-y-auto transition-opacity duration-500 md:opacity-100 ${currentPage === 0 ? "opacity-0 hidden md:flex" : "opacity-100"}`} style={{ scrollbarWidth: "none" }}>
                        <AnimatePresence mode="wait">
                            {currentPage === 1 && (
                                <motion.div key="s1-left" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                                    <header className="mb-6 md:mb-8">
                                        <div className="font-mono text-[10px] tracking-[0.4em] text-text-secondary mb-4 md:mb-6 text-center border-b border-[rgba(167,139,250,0.1)] pb-4">
                                            ✦ REGISTRO ESTELAR ✦
                                        </div>
                                        <div className="font-display font-medium text-[1.1rem] md:text-[1.2rem] mb-1 text-white">Para: {birthdayPerson.name}</div>
                                        <div className="font-body italic font-light text-[0.85rem] text-text-secondary">Fecha: {birthdayPerson.birthday}</div>
                                    </header>
                                    <div className="flex flex-col gap-4 md:gap-6">
                                        {letter.paragraphs.slice(0, 2).map((p, i) => (
                                            <p key={i} className="font-display font-normal text-[0.95rem] md:text-[1.05rem] leading-[1.8] text-text-primary/90 text-justify">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            {currentPage === 2 && (
                                <motion.div key="s2-left" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} exit={{ opacity: 0 }} className="h-full flex flex-col justify-center">
                                    <div className="text-center mb-6 mt-4">
                                        <span className="material-symbols-rounded text-accent-star text-2xl md:text-3xl mb-2 md:mb-4 block">auto_awesome</span>
                                        <h2 className="font-display text-xl md:text-2xl text-text-primary mb-3">Las razones...</h2>
                                        <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-accent-star to-transparent" />
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        {letterData.slice(0, 3).map((reason, i) => (
                                            <ReasonCard key={reason.id} {...reason} index={i} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Book Spine (Desktop) */}
                    <div className={`hidden md:block w-1 h-full bg-gradient-to-r from-black/50 to-white/5 border-[rgba(0,0,0,0.5)] shadow-inner transition-opacity duration-500 ${currentPage === 0 ? "opacity-0" : "opacity-100"}`} />
                    {/* Book Spine Horizontal (Mobile) */}
                    <div className={`md:hidden w-full h-1 bg-gradient-to-b from-black/50 to-white/5 shadow-inner transition-opacity duration-500 ${currentPage === 0 ? "opacity-0 hidden" : "opacity-100 block"}`} />

                    {/* RIGHT PAGE */}
                    <div className="w-full md:w-1/2 h-full md:h-full relative p-6 md:p-10 flex flex-col pointer-events-auto overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                        <AnimatePresence mode="wait">
                            {currentPage === 0 && (
                                <motion.div key="cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-accent-star/30 flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_30px_rgba(251,191,36,0.15)] relative">
                                        <span className="material-symbols-rounded text-3xl md:text-4xl text-accent-star">auto_stories</span>
                                        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-accent-star duration-3000" />
                                    </div>
                                    <h1 className="font-display text-4xl md:text-5xl text-white mb-2 md:mb-4 leading-tight uppercase tracking-widest drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">Diario del <br /> Cosmos</h1>
                                    <p className="font-mono text-xs md:text-sm text-text-secondary tracking-widest uppercase mb-10 md:mb-12">Un mensaje para ti</p>

                                    <button onClick={() => setCurrentPage(1)} className="animate-bounce p-3 md:p-4 rounded-full bg-void border border-accent-nebula/30 text-accent-nebula hover:bg-accent-nebula/10 transition-colors shadow-[0_0_15px_rgba(167,139,250,0.2)] hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] scale-110">
                                        <span className="material-symbols-rounded">menu_book</span>
                                    </button>
                                    <span className="text-[10px] font-mono tracking-widest text-text-secondary mt-4">ABRIR LIBRO</span>
                                </motion.div>
                            )}

                            {currentPage === 1 && (
                                <motion.div key="s1-right" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                                    <div className="my-4 md:my-6 text-center font-display italic font-light text-[1.1rem] md:text-[1.2rem] text-accent-nebula border-y border-[rgba(167,139,250,0.1)] py-4 md:py-6 drop-shadow-[0_0_8px_rgba(167,139,250,0.3)]">
                                        "{letter.highlightedQuote}"
                                    </div>
                                    <div className="flex flex-col gap-4 md:gap-6 mb-6 md:mb-8 flex-1">
                                        {letter.paragraphs.slice(2).map((p, i) => (
                                            <p key={i} className="font-display font-normal text-[0.95rem] md:text-[1.05rem] leading-[1.8] text-text-primary/90 text-justify">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                    <footer className="text-right mt-auto">
                                        <div className="font-display italic text-text-secondary text-sm">Con todo el universo,</div>
                                        <div className="font-display font-semibold text-2xl text-accent-star">{author.name}</div>
                                    </footer>
                                </motion.div>
                            )}

                            {currentPage === 2 && (
                                <motion.div key="s2-right" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} exit={{ opacity: 0 }} className="h-full flex flex-col justify-center">
                                    <div className="space-y-3 md:space-y-4 pt-4 md:pt-16">
                                        {letterData.slice(3, 6).map((reason, i) => (
                                            <ReasonCard key={reason.id} {...reason} index={i + 3} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                {/* Paper texture over right page */}
                <div className="absolute top-0 bottom-0 right-0 w-full md:w-1/2 pointer-events-none opacity-[0.25] mix-blend-overlay rounded-xl md:rounded-l-none overflow-hidden z-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <filter id="bookNoiseRight">
                            <feTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" />
                            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#bookNoiseRight)" />
                    </svg>
                </div>

                {/* Paper texture over left page */}
                <div className={`hidden md:block absolute top-0 bottom-0 left-0 w-1/2 pointer-events-none mix-blend-overlay rounded-xl rounded-r-none overflow-hidden z-20 transition-opacity duration-700 ${currentPage === 0 ? "opacity-0" : "opacity-[0.25]"}`}>
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <filter id="bookNoiseLeft">
                            <feTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" />
                            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#bookNoiseLeft)" />
                    </svg>
                </div>
            </div>

            {/* Book Navigation outside */}
            {currentPage > 0 && (
                <div className="absolute -bottom-16 md:-bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-between w-full max-w-sm px-4">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                        className="p-3 md:p-4 rounded-full border border-[rgba(167,139,250,0.4)] text-text-secondary hover:text-white hover:bg-[rgba(167,139,250,0.2)] transition-all bg-void/80 backdrop-blur shadow-[0_0_15px_rgba(0,0,0,0.5)] font-bold"
                    >
                        <span className="material-symbols-rounded">chevron_left</span>
                    </button>
                    <div className="font-mono text-[10px] md:text-sm tracking-widest text-text-secondary bg-void/90 px-5 py-3 rounded-full border border-[rgba(167,139,250,0.15)] shadow-xl">
                        HOJA {currentPage} DE {totalSpreads}
                    </div>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalSpreads, p + 1))}
                        disabled={currentPage === totalSpreads}
                        className="p-3 md:p-4 rounded-full border border-[rgba(167,139,250,0.4)] text-text-secondary hover:text-white hover:bg-[rgba(167,139,250,0.2)] disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-void/80 backdrop-blur shadow-[0_0_15px_rgba(0,0,0,0.5)] font-bold"
                    >
                        <span className="material-symbols-rounded">chevron_right</span>
                    </button>
                </div>
            )}
        </div>
    );
}
