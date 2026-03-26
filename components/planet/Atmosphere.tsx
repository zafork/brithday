import * as THREE from "three";

export function Atmosphere() {
    const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec3 viewDir = normalize(-vPosition);
      float fresnel = dot(viewDir, vNormal);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 4.0); // sharp edge
      
      vec3 color = vec3(0.48, 0.22, 0.93); // #7c3aed
      gl_FragColor = vec4(color, fresnel * 0.4);
    }
  `;

    return (
        <mesh scale={[1.04, 1.04, 1.04]}>
            <sphereGeometry args={[1, 64, 64]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                side={THREE.BackSide}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
}
