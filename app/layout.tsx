import type { Metadata } from 'next'
import './globals.css'
import Starfield from '@/components/layout/Starfield'
import ClientLayout from '@/components/layout/ClientLayout'

export const metadata: Metadata = {
    title: 'Cosmos ✦ Birthday',
    description: 'Un universo hecho para ti',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className="bg-void text-text-primary antialiased font-body overflow-x-hidden w-full min-h-screen">
                <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.035]">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <filter id="noiseFilter">
                            <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                    </svg>
                </div>

                <Starfield />
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    )
}
