import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Starfield = ({ count = 5000 }) => {
    const points1 = useRef();
    const points2 = useRef();
    const points3 = useRef();

    // Generate random star positions
    const generateStars = (numStars, spread) => {
        const positions = new Float32Array(numStars * 3);
        for (let i = 0; i < numStars * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * spread;
            positions[i + 1] = (Math.random() - 0.5) * spread;
            positions[i + 2] = (Math.random() - 0.5) * spread;
        }
        return positions;
    };

    const stars1 = generateStars(count, 200);
    const stars2 = generateStars(count / 2, 300);
    const stars3 = generateStars(count / 3, 400);

    // Animate stars for parallax effect
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (points1.current) {
            points1.current.rotation.y = time * 0.01;
        }
        if (points2.current) {
            points2.current.rotation.y = time * 0.005;
        }
        if (points3.current) {
            points3.current.rotation.y = time * 0.002;
        }
    });

    return (
        <>
            {/* Layer 1 - Closest stars */}
            <points ref={points1}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={stars1.length / 3}
                        array={stars1}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.15}
                    color="#ffffff"
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={0.9}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Layer 2 - Medium distance stars */}
            <points ref={points2}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={stars2.length / 3}
                        array={stars2}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.12}
                    color="#00f0ff"
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={0.7}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Layer 3 - Distant stars */}
            <points ref={points3}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={stars3.length / 3}
                        array={stars3}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.09}
                    color="#ffd700"
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={0.5}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </>
    );
};

export default Starfield;
