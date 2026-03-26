"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
    { name: "INICIO", path: "/", icon: "rocket_launch" },
    { name: "GALERÍA", path: "/gallery", icon: "photo_library" },
    { name: "CARTA", path: "/letter", icon: "mail" },
    { name: "EXPLORAR", path: "/explore", icon: "explore" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav
            className="fixed top-0 left-0 w-full h-16 z-50 backdrop-blur-md bg-transparent border-b border-[rgba(167,139,250,0.1)]"
        >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="font-mono text-accent-nebula tracking-widest text-lg font-bold">
                    ✦ COSMOS
                </Link>

                <ul className="flex items-center gap-6 md:gap-10">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    className={`group relative flex flex-col items-center gap-1 text-[10px] md:text-xs font-mono tracking-wider transition-colors ${isActive ? "text-accent-star" : "text-text-secondary hover:text-text-primary"
                                        }`}
                                >
                                    <span className="material-symbols-rounded text-[20px] transition-transform group-hover:scale-110">
                                        {link.icon}
                                    </span>
                                    <span className="hidden md:inline">{link.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-2 md:-bottom-1 left-0 right-0 h-[2px] bg-accent-star rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
