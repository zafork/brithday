"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    return (
        <>
            <CustomCursor />

            {isLoading ? (
                <LoadingScreen onComplete={() => setIsLoading(false)} />
            ) : (
                <>
                    <Navbar />
                    <AnimatePresence mode="wait">
                        <motion.main
                            key={pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="flex-1 flex flex-col relative z-10 pt-16"
                        >
                            {children}
                        </motion.main>
                    </AnimatePresence>
                    <Footer />
                </>
            )}
        </>
    );
}
