import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Sun from './Sun';
import Planet from './Planet';
import Starfield from './Starfield';
// import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'; // Commented out for debug
import { planetData, planets } from '../data/planetData';
import useStore from '../store/useStore';

const Scene = () => {
    const { focusedPlanet, setFocusedPlanet } = useStore();

    return (
        <div className="w-full h-screen bg-black absolute top-0 left-0 z-0 text-white">
            <Canvas camera={{ position: [0, 20, 45], fov: 60 }} gl={{ antialias: true }}>
                <Suspense fallback={null}>
                    {/* Deep Space Environment */}
                    <color attach="background" args={['#000000']} />
                    {/* High density stars for realism */}
                    <Stars radius={300} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
                    {/* Faint brighter stars to break monotony */}
                    <Starfield count={1000} />

                    {/* Realistic Lighting */}
                    {/* Ambient light simulates starlight/scattering - keep very low for contrast */}
                    <ambientLight intensity={0.05} />

                    {/* Solar System Objects - Sun contains the main pointLight */}
                    <Sun />

                    {/* Planets */}
                    {planets.map((key) => (
                        <Planet
                            key={key}
                            data={planetData[key]}
                            isSelected={focusedPlanet?.name === planetData[key].name}
                            onClick={() => setFocusedPlanet(key)}
                        />
                    ))}

                    {/* Post-Processing - Temporarily Disabled to ensure stability first */}
                    {/* <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer> */}

                    {/* Controls */}
                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={10}
                        maxDistance={300}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;
