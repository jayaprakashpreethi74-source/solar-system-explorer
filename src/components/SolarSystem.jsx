import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Planet from './Planet';
import Starfield from './Starfield';
import { planetData, planets } from '../data/planetData';

const SolarSystem = ({ selectedPlanet, onPlanetClick, cameraRef }) => {
    const sunRef = useRef();

    // Animate sun rotation
    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.001;
        }
    });

    // Camera animation for Focus Mode
    useFrame((state) => {
        if (selectedPlanet && cameraRef.current) {
            const planet = planetData[selectedPlanet];
            const targetPosition = {
                x: planet.distance + planet.radius * 5,
                y: planet.radius * 3,
                z: planet.radius * 5,
            };

            // Smooth camera movement
            cameraRef.current.position.x += (targetPosition.x - cameraRef.current.position.x) * 0.05;
            cameraRef.current.position.y += (targetPosition.y - cameraRef.current.position.y) * 0.05;
            cameraRef.current.position.z += (targetPosition.z - cameraRef.current.position.z) * 0.05;

            cameraRef.current.lookAt(planet.distance, 0, 0);
        } else if (cameraRef.current) {
            // Return to overview position
            const overviewPos = { x: 0, y: 50, z: 80 };
            cameraRef.current.position.x += (overviewPos.x - cameraRef.current.position.x) * 0.03;
            cameraRef.current.position.y += (overviewPos.y - cameraRef.current.position.y) * 0.03;
            cameraRef.current.position.z += (overviewPos.z - cameraRef.current.position.z) * 0.03;
            cameraRef.current.lookAt(0, 0, 0);
        }
    });

    return (
        <>
            {/* Starfield background */}
            <Starfield count={5000} />

            {/* Ambient light */}
            <ambientLight intensity={0.1} />

            {/* Sun */}
            <mesh ref={sunRef} position={[0, 0, 0]}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial color="#FDB813" />
            </mesh>

            {/* Sun glow */}
            <pointLight position={[0, 0, 0]} intensity={2} distance={200} color="#FDB813" />

            <mesh position={[0, 0, 0]} scale={1.3}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial
                    color="#FFA500"
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Planets */}
            {planets.map((planetKey) => (
                <Planet
                    key={planetKey}
                    data={planetData[planetKey]}
                    onClick={() => onPlanetClick(planetKey)}
                    isSelected={selectedPlanet === planetKey}
                />
            ))}
        </>
    );
};

export default SolarSystem;
