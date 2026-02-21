import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTextureWithFallback } from '../hooks/useTextureWithFallback';
import './shaders/AtmosphereShader'; // Register shader

const Planet = ({ data, onClick, isSelected }) => {
    const meshRef = useRef();
    const glowRef = useRef();
    const cloudsRef = useRef();
    const orbitRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Robust texture loading
    const { texture, error } = useTextureWithFallback(data.textureUrl);

    // Animate planet orbit and rotation
    useFrame((state) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y += data.orbitSpeed;
        }
        if (meshRef.current) {
            meshRef.current.rotation.y += data.rotationSpeed;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += data.rotationSpeed * 1.2; // Clouds move faster
        }
    });

    // Create orbital path
    const orbitGeometry = useMemo(() => {
        const orbitPoints = [];
        for (let i = 0; i <= 128; i++) {
            const angle = (i / 128) * Math.PI * 2;
            orbitPoints.push(
                new THREE.Vector3(
                    Math.cos(angle) * data.distance,
                    0,
                    Math.sin(angle) * data.distance
                )
            );
        }
        return new THREE.BufferGeometry().setFromPoints(orbitPoints);
    }, [data.distance]);

    return (
        <group ref={orbitRef}>
            {/* Orbital path */}
            <line geometry={orbitGeometry} rotation={[Math.PI / 2, 0, 0]}>
                <lineBasicMaterial
                    color={data.glowColor}
                    transparent
                    opacity={0.15}
                    linewidth={1}
                />
            </line>

            {/* Planet group at orbital distance */}
            <group position={[data.distance, 0, 0]}>
                {/* Main planet mesh */}
                <mesh
                    ref={meshRef}
                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
                    scale={hovered || isSelected ? 1.05 : 1}
                    castShadow
                    receiveShadow
                >
                    <sphereGeometry args={[data.radius, 128, 128]} /> {/* Increased geometry resolution */}
                    <meshStandardMaterial
                        map={texture}
                        bumpMap={texture} // Use color texture for surface detail
                        bumpScale={0.05}
                        color={texture ? "white" : data.color}
                        metalness={data.type === 'Terrestrial' ? 0.2 : 0.0}
                        roughness={data.type === 'Terrestrial' ? 0.6 : 1.0} // Gas giants are matte/hazy
                        emissive={new THREE.Color(data.color)}
                        emissiveIntensity={0.02} // Very subtle ambient glow
                    />
                </mesh>

                {/* Cloud Layer (Earth) */}
                {data.name === 'Earth' && (
                    <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
                        <sphereGeometry args={[data.radius, 64, 64]} />
                        <meshStandardMaterial
                            map={texture}
                            transparent
                            opacity={0.4}
                            depthWrite={false}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                )}

                {/* Saturn's Rings - Enhanced */}
                {data.name === 'Saturn' && (
                    <mesh rotation={[Math.PI / 2.4, 0, 0]}>
                        <ringGeometry args={[data.radius * 1.4, data.radius * 2.5, 128]} />
                        <meshStandardMaterial
                            color="#C0B090"
                            side={THREE.DoubleSide}
                            transparent
                            opacity={0.7}
                            roughness={0.8}
                            emissive="#554433"
                            emissiveIntensity={0.2}
                        />
                    </mesh>
                )}

                {/* Atmospheric glow (Fresnel Shader) */}
                <mesh ref={glowRef} scale={1.2}>
                    <sphereGeometry args={[data.radius, 32, 32]} />
                    <atmosphereShaderMaterial
                        transparent
                        side={THREE.BackSide}
                        blending={THREE.AdditiveBlending}
                        glowColor={new THREE.Color(data.glowColor)}
                        intensity={data.type === 'Terrestrial' ? 1.0 : 0.4} // Stronger for Earth/Venus
                        power={4.0}
                        depthWrite={false}
                    />
                </mesh>

                {/* Selection indicator */}
                {isSelected && (
                    <mesh scale={1.25}>
                        <sphereGeometry args={[data.radius, 32, 32]} />
                        <meshBasicMaterial
                            color={data.glowColor}
                            transparent
                            opacity={0.15}
                            wireframe
                        />
                    </mesh>
                )}
            </group>
        </group>
    );
};

export default Planet;
