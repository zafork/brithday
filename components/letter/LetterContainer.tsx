"use client";
import { config } from "@/lib/config";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sentenceVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, ease: "easeOut" }
    }
};

const wordVariant = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } }
};

function AnimatedParagraph({ text }: { text: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

    return (
        <motion.p
            ref={ref}
            variants={sentenceVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display font-normal text-[1.15rem] leading-[1.9] text-text-primary/90 mb-6"
        >
            {text.split(" ").map((word, i) => (
                <motion.span key={i} variants={wordVariant} className="inline-block mr-[0.25em]">
                    {word}
                </motion.span>
            ))}
        </motion.p>
    );
}

export function LetterContainer() {
    const { birthdayPerson, author, letter } = config;

    return (
        <motion.div
            initial={{ scale: 0.4, opacity: 0, y: 200, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-[680px] mx-auto bg-elevated rounded-md p-8 md:p-[60px] shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(167,139,250,0.15)] -rotate-[0.5deg] z-10 perspective-[1000px]"
        >
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.35] mix-blend-overlay rounded-md overflow-hidden">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <filter id="paperNoise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.05" result="noise" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#paperNoise)" />
                </svg>
            </div>

            <div className="absolute inset-0 p-[1px] rounded-md bg-gradient-to-br from-accent-nebula/60 to-accent-star/60 pointer-events-none -z-10" />
            <div className="absolute inset-[1px] bg-elevated rounded-md pointer-events-none -z-10" />

            <div className="relative z-10">
                <header className="mb-10">
                    <div className="font-mono text-[10px] tracking-[0.4em] text-text-secondary mb-6 text-center">
                        ✦ MENSAJE INTERESTELAR ✦
                    </div>
                    <div className="flex justify-between items-end mb-4 border-b border-[rgba(167,139,250,0.2)] pb-4">
                        <div>
                            <div className="font-display font-medium text-[1.2rem] mb-1 text-white">Para: {birthdayPerson.name}</div>
                            <div className="font-body italic font-light text-[0.9rem] text-text-secondary">Desde: Las estrellas (y yo)</div>
                        </div>
                        <div className="font-mono text-[0.85rem] text-text-secondary text-right">
                            Fecha:<br />{birthdayPerson.birthday}
                        </div>
                    </div>
                </header>

                <div className="mb-12">
                    {letter.paragraphs.slice(0, 2).map((p, i) => (
                        <AnimatedParagraph key={`p1-${i}`} text={p} />
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className="my-12 text-center font-display italic font-light text-[1.4rem] md:text-[1.6rem] text-accent-nebula relative px-8"
                        style={{ textShadow: "0 0 10px rgba(167,139,250,0.3)" }}
                    >
                        <span className="absolute left-0 top-[-15px] text-5xl opacity-40 font-serif">❝</span>
                        {letter.highlightedQuote}
                        <span className="absolute right-0 bottom-[-25px] text-5xl opacity-40 font-serif">❞</span>
                    </motion.div>

                    {letter.paragraphs.slice(2).map((p, i) => (
                        <AnimatedParagraph key={`p2-${i}`} text={p} />
                    ))}
                </div>

                <footer className="mt-16 text-right">
                    <div className="font-display italic font-light text-text-secondary mb-2 text-lg">Con todo el universo,</div>
                    <div className="font-display font-semibold text-3xl md:text-4xl bg-gradient-to-r from-accent-nebula to-accent-star bg-clip-text text-transparent inline-block pb-1">
                        {author.name}
                    </div>
                    <div className="mt-4 text-accent-star text-sm animate-pulse">✦</div>
                </footer>
            </div>
        </motion.div>
    );
}
