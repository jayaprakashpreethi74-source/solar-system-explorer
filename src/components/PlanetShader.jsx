import React, { useMemo } from 'react';
import * as THREE from 'three';

const PlanetShader = ({ planetColor, glowColor, glowIntensity = 1.0 }) => {
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color(glowColor) },
                viewVector: { value: new THREE.Vector3() },
                intensity: { value: glowIntensity },
            },
            vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
          intensity = pow(dot(normalize(viewVector), actual_normal), 6.0);
        }
      `,
            fragmentShader: `
        uniform vec3 glowColor;
        uniform float intensity;
        varying float vIntensity;
        
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, 1.0);
        }
      `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
        });
    }, [glowColor, glowIntensity]);

    return <primitive object={shaderMaterial} attach="material" />;
};

export default PlanetShader;
