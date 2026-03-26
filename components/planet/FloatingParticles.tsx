import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export function FloatingParticles() {
    const count = 80;

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const radius = 1.2 + Math.random() * 1.5;
            const t = Math.random() * Math.PI * 2;
            const speed = 0.001 + Math.random() * 0.005;

            // Elliptic orbits with slight tilt
            const x = Math.cos(t) * radius;
            const z = Math.sin(t) * radius;
            const y = (Math.random() - 0.5) * 0.5;

            temp.push({ t, radius, speed, x, y, z, size: 0.5 + Math.random() * 1.5, opacity: Math.random() });
        }
        return temp;
    }, []);

    const pointsRef = useRef<THREE.Points>(null);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        particles.forEach((p, i) => {
            positions[i * 3] = p.x;
            positions[i * 3 + 1] = p.y;
            positions[i * 3 + 2] = p.z;

            colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
            sizes[i] = p.size;
        });

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        return geo;
    }, [particles]);

    const material = useMemo(() => {
        return new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
    }, []);

    useFrame(() => {
        if (!pointsRef.current) return;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const p = particles[i];
            p.t += p.speed;

            positions[i * 3] = Math.cos(p.t) * p.radius;
            // Keep y and z mostly static but orbiting
            positions[i * 3 + 2] = Math.sin(p.t) * p.radius;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef} geometry={geometry} material={material} />
    );
}
