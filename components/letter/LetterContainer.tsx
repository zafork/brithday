"use client";
import { config } from "@/lib/config";
import { motion } from "framer-motion";

const itemVariant = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
};

export function LetterContainer({ part }: { part: number }) {
    const { birthdayPerson, author, letter } = config;

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-full max-w-[680px] bg-elevated rounded-md p-6 md:p-[50px] shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(167,139,250,0.15)] z-10"
        >
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

            <div className="relative z-10 h-full flex flex-col">
                {part === 1 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    >
                        <header className="mb-8">
                            <motion.div variants={itemVariant} className="font-mono text-[10px] tracking-[0.4em] text-text-secondary mb-6 text-center">
                                ✦ MENSAJE INTERESTELAR ✦
                            </motion.div>
                            <motion.div variants={itemVariant} className="flex justify-between items-end mb-4 border-b border-[rgba(167,139,250,0.2)] pb-4">
                                <div>
                                    <div className="font-display font-medium text-[1.2rem] mb-1 text-white">Para: {birthdayPerson.name}</div>
                                    <div className="font-body italic font-light text-[0.9rem] text-text-secondary">Desde: Las estrellas (y yo)</div>
                                </div>
                                <div className="font-mono text-[0.85rem] text-text-secondary text-right">
                                    Fecha:<br />{birthdayPerson.birthday}
                                </div>
                            </motion.div>
                        </header>

                        <div className="flex flex-col gap-6">
                            {letter.paragraphs.slice(0, 2).map((p, i) => (
                                <motion.p key={i} variants={itemVariant} className="font-display font-normal text-[1.1rem] md:text-[1.15rem] leading-[1.9] text-text-primary/90">
                                    {p}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>
                )}

                {part === 2 && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    >
                        <motion.div
                            variants={itemVariant}
                            className="my-8 text-center font-display italic font-light text-[1.3rem] md:text-[1.5rem] text-accent-nebula relative px-6"
                            style={{ textShadow: "0 0 10px rgba(167,139,250,0.3)" }}
                        >
                            <span className="absolute left-0 top-[-10px] text-4xl opacity-40 font-serif">❝</span>
                            {letter.highlightedQuote}
                            <span className="absolute right-0 bottom-[-20px] text-4xl opacity-40 font-serif">❞</span>
                        </motion.div>

                        <div className="flex flex-col gap-5 mb-8">
                            {letter.paragraphs.slice(2).map((p, i) => (
                                <motion.p key={i} variants={itemVariant} className="font-display font-normal text-[1.1rem] md:text-[1.15rem] leading-[1.9] text-text-primary/90">
                                    {p}
                                </motion.p>
                            ))}
                        </div>

                        <motion.footer variants={itemVariant} className="mt-8 text-right">
                            <div className="font-display italic font-light text-text-secondary mb-1 text-lg">Con todo el universo,</div>
                            <div className="font-display font-semibold text-3xl md:text-4xl bg-gradient-to-r from-accent-nebula to-accent-star bg-clip-text text-transparent inline-block pb-1">
                                {author.name}
                            </div>
                            <div className="mt-2 text-accent-star text-sm animate-pulse">✦</div>
                        </motion.footer>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
