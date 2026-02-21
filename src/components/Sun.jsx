import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './shaders/SunShader'; // Register shader

const Sun = () => {
    const sunRef = useRef();

    // Animate Sun Shader
    useFrame(({ clock }) => {
        if (sunRef.current) {
            sunRef.current.material.uniforms.time.value = clock.getElapsedTime();
        }
    });

    return (
        <group>
            {/* Main Sun Body with Noise Shader */}
            <mesh ref={sunRef}>
                <sphereGeometry args={[10, 64, 64]} />
                <sunShaderMaterial
                    transparent
                    time={0}
                    color={new THREE.Color("#FDB813").multiplyScalar(1.5)} // Boost for bloom
                />
                <pointLight intensity={2.5} distance={500} decay={1.5} color="#FDB813" />
            </mesh>

            {/* Corona / Glow Halo */}
            <mesh scale={[1.4, 1.4, 1.4]}>
                <sphereGeometry args={[10, 64, 64]} />
                <meshBasicMaterial
                    color={new THREE.Color("#FF4500").multiplyScalar(0.6)}
                    transparent
                    opacity={0.4}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Inner intense glow */}
            <mesh scale={[1.1, 1.1, 1.1]}>
                <sphereGeometry args={[10, 64, 64]} />
                <meshBasicMaterial
                    color={new THREE.Color("#FFaa00").multiplyScalar(2)}
                    transparent
                    opacity={0.3}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Ambient Light for the whole scene so planets aren't pitch black on back side entirely */}
            <ambientLight intensity={0.05} />
        </group>
    );
};

export default Sun;
