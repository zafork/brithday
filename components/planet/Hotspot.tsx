"use client";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { planetMessages } from "@/lib/planetData";

type Message = typeof planetMessages[0];

export function Hotspot({
    message,
    radius = 1,
    isDiscovered = false,
    onClick
}: {
    message: Message,
    radius?: number,
    isDiscovered?: boolean,
    onClick: (msg: Message, pos: THREE.Vector3) => void
}) {
    const groupRef = useRef<THREE.Group>(null);
    const outerSphereRef = useRef<THREE.Mesh>(null);
    const innerSphereRef = useRef<THREE.Mesh>(null);

    const x = radius * Math.sin(message.phi) * Math.cos(message.theta);
    const y = radius * Math.cos(message.phi);
    const z = radius * Math.sin(message.phi) * Math.sin(message.theta);

    const position = new THREE.Vector3(x, y, z);
    const color = isDiscovered ? "#a78bfa" : "#fbbf24";

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (innerSphereRef.current) {
            const scale = 1 + Math.sin(t * 3) * 0.1;
            innerSphereRef.current.scale.set(scale, scale, scale);
        }

        if (outerSphereRef.current) {
            const opacity = (Math.sin(t * 2) + 1) / 2 * 0.5;
            const mat = outerSphereRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = opacity;
        }

        if (groupRef.current) {
            groupRef.current.lookAt(new THREE.Vector3(0, 0, 0));
        }
    });

    const handlePointerDown = (e: any) => {
        e.stopPropagation();
        onClick(message, position);
    };

    return (
        <group ref={groupRef} position={position} onPointerDown={handlePointerDown} className="cursor-pointer">
            <mesh ref={innerSphereRef}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color={color} depthTest={false} />
            </mesh>

            <mesh ref={outerSphereRef}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={color} transparent={true} opacity={0.5} blending={THREE.AdditiveBlending} depthTest={false} />
            </mesh>

            <Html distanceFactor={10} occlude>
                <div className="pointer-events-none transform -translate-x-1/2 -translate-y-[200%] transition-opacity duration-300 opacity-0 group-hover:opacity-100 peer-hover:opacity-100">
                    <div className="bg-void/80 backdrop-blur border border-accent-star/50 text-white font-mono text-[8px] tracking-widest px-2 py-1 rounded whitespace-nowrap shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                        {isDiscovered ? "✓ EXPLORADO" : `MENSAJE #${message.id}`}
                    </div>
                </div>
            </Html>
        </group>
    );
}
