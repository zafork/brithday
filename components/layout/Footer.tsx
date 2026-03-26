export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="h-20 w-full flex items-center justify-center relative bg-void border-t border-[rgba(167,139,250,0.05)] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #a78bfa 1px, #a78bfa 2px)' }} />
            <p className="font-mono text-text-secondary text-sm z-10">
                Hecho con ✦ para ti · {currentYear}
            </p>
        </footer>
    );
}
