"use client";
import { LetterContainer } from "@/components/letter/LetterContainer";
import { ReasonCard } from "@/components/letter/ReasonCard";
import { letterData } from "@/lib/letterData";
import { motion } from "framer-motion";

export default function LetterPage() {
    return (
        <div className="w-full min-h-screen pb-24 pt-12 md:pt-20 px-4 mt-8 md:mt-0">
            {/* Letter Section */}
            <div className="mb-24 md:mb-32">
                <LetterContainer />
            </div>

            {/* Reasons Section */}
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-[rgba(251,191,36,0.05)] border border-[rgba(251,191,36,0.1)]">
                        <span className="material-symbols-rounded text-accent-star">auto_awesome</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-text-primary mb-6 capitalize tracking-wide" style={{ textShadow: "0 0 20px rgba(251,191,36,0.2)" }}>
                        {letterData.length} razones por las que eres <br className="hidden md:block" /> mi galaxia favorita
                    </h2>
                    <div className="flex justify-center">
                        <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-accent-star to-transparent opacity-50" />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-0">
                    {letterData.map((reason, index) => (
                        <ReasonCard
                            key={reason.id}
                            id={reason.id}
                            icon={reason.icon}
                            text={reason.text}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
