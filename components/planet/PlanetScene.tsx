"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Planet } from "./Planet";
import { Atmosphere } from "./Atmosphere";
import { FloatingParticles } from "./FloatingParticles";
import { Hotspot } from "./Hotspot";
import { planetMessages } from "@/lib/planetData";

type Message = typeof planetMessages[0];

function CameraController({ targetPosition, isModalOpen }: { targetPosition: THREE.Vector3 | null, isModalOpen: boolean }) {
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);
    const defaultPos = useRef(new THREE.Vector3(0, 0, 4.5));

    useFrame(() => {
        if (isModalOpen && targetPosition) {
            const dir = targetPosition.clone().normalize();
            const idealPos = dir.multiplyScalar(2.0);
            camera.position.lerp(idealPos, 0.05);
            if (controlsRef.current) {
                controlsRef.current.target.lerp(targetPosition, 0.05);
                controlsRef.current.autoRotate = false;
            }
        } else {
            camera.position.lerp(defaultPos.current, 0.05);
            if (controlsRef.current) {
                controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
                controlsRef.current.autoRotate = true;
            }
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.4}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
        />
    );
}

function DecoratorRing() {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.z -= 0.0005;
            ref.current.rotation.x += 0.0002;
        }
    });

    return (
        <mesh ref={ref} rotation={[1.2, 0, 0]}>
            <torusGeometry args={[1.6, 0.004, 16, 100]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.25} />
        </mesh>
    );
}

export default function PlanetScene({
    onHotspotClick,
    activeMessage,
    discoveredIds
}: {
    onHotspotClick: (msg: Message, pos: THREE.Vector3) => void,
    activeMessage: Message | null,
    discoveredIds: Set<number>
}) {
    const [targetPos, setTargetPos] = useState<THREE.Vector3 | null>(null);

    useEffect(() => {
        if (!activeMessage) {
            setTargetPos(null);
        }
    }, [activeMessage]);

    const handleHotspotClick = (msg: Message, pos: THREE.Vector3) => {
        setTargetPos(pos);
        onHotspotClick(msg, pos);
    };

    return (
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 4, 5]} intensity={1.5} color="#c4b5fd" />
            <pointLight position={[-6, -4, -6]} intensity={0.6} color="#fbbf24" />
            <directionalLight position={[10, 0, 5]} intensity={1.0} color="#ffffff" />

            <Stars radius={100} depth={50} count={3500} factor={4} saturation={0} fade speed={1.5} />

            <Suspense fallback={null}>
                <Planet />
                <Atmosphere />
                <DecoratorRing />
                <FloatingParticles />

                {planetMessages.map((msg) => (
                    <Hotspot
                        key={msg.id}
                        message={msg}
                        radius={1.02}
                        isDiscovered={discoveredIds.has(msg.id)}
                        onClick={handleHotspotClick}
                    />
                ))}
            </Suspense>

            <CameraController targetPosition={targetPos} isModalOpen={!!activeMessage} />
        </Canvas>
    );
}
