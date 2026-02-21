import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

const AtmosphereShaderMaterial = shaderMaterial(
  {
    glowColor: new THREE.Color(0.0, 0.0, 0.0),
    viewVector: new THREE.Vector3(0, 0, 0), // Kept for backward compatibility but unused in robust shader
    intensity: 1.0,
    power: 2.0
  },
  // Vertex Shader
  `
    varying float intensityRatio;
    uniform float power;
    void main() {
      vec3 vNormal = normalize(normalMatrix * normal);
      vec3 vViewPosition = vec3(modelViewMatrix * vec4(position, 1.0));
      vec3 vViewDir = normalize(-vViewPosition); 
      float fresnel = dot(vNormal, vViewDir);
      intensityRatio = pow(0.6 - fresnel, power); // Tuned for better edge glow
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 glowColor;
    uniform float intensity;
    varying float intensityRatio;
    void main() {
      vec3 glow = glowColor * intensity * intensityRatio;
      gl_FragColor = vec4(glow, 1.0);
    }
  `
);

extend({ AtmosphereShaderMaterial });

export { AtmosphereShaderMaterial };
