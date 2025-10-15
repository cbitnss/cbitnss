/* eslint-disable react/no-unknown-property */
"use client";
import React, { forwardRef, useRef, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color } from "three";

// Removed the hexToNormalizedRGB utility as Color().set(hex) is more robust.
// const hexToNormalizedRGB = (hex) => {
//   hex = hex.replace("#", "");
//   return [
//     parseInt(hex.slice(0, 2), 16) / 255,
//     parseInt(hex.slice(2, 4), 16) / 255,
//     parseInt(hex.slice(4, 6), 16) / 255,
//   ];
// };

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

// New uniforms for the three gradient colors
uniform vec3 uColor1; // Now #303093 (Deep Indigo)
uniform vec3 uColor2; // Now #eb1c24 (Red)
uniform vec3 uColor3; // #ffffff (White)

uniform float uTime;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

// Standard noise function
float noise(vec2 texCoord) {
  float G = e;
  vec2 r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

// Rotates UVs for wave direction control
vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2 rot = mat2(c, -s, s, c);
  return rot * uv;
}

// Calculates the three-step gradient color based on the horizontal position (x)
vec3 getGradientColor(float x) {
    // x ranges from 0.0 (left) to 1.0 (right)

    // Define the transition points
    // INCREASED to 0.70: This makes the Blue->Red transition cover 70% of the screen, 
    // heavily favoring the Indigo/Blue side.
    const float midpoint = 0.70; 

    // Blend from Color 1 (Indigo) to Color 2 (Red) across the first section (0.0 to midpoint)
    if (x < midpoint) {
        float mixFactor = x / midpoint; // Normalize 0.0-midpoint to 0.0-1.0
        return mix(uColor1, uColor2, mixFactor);
    }
    // Blend from Color 2 (Red) to Color 3 (White) across the second section (midpoint to 1.0)
    else {
        float range = 1.0 - midpoint; // The size of the second range (e.g., 0.30)
        float mixFactor = (x - midpoint) / range; // Normalize midpoint-1.0 to 0.0-1.0
        return mix(uColor2, uColor3, mixFactor);
    }
}


void main() {
  float rnd = noise(gl_FragCoord.xy);
  vec2 uv = rotateUvs(vUv * uScale, uRotation);
  vec2 tex = uv * uScale;
  float tOffset = uSpeed * uTime;

  // 1. Calculate the base gradient color based on horizontal position (vUv.x)
  // This replaces the old uColor uniform
  vec3 baseColor = getGradientColor(vUv.x);


  // Apply the wave distortion to the texture coordinates (for silk pattern)
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  // Generate the flowing silk/light pattern
  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                          sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  // Apply the pattern (light/shadow) and noise to the base gradient color
  vec4 col = vec4(baseColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

const SilkPlane = forwardRef(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    // Scale the plane to cover the entire viewport
    if (ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  useFrame((_, delta) => {
    // Animate uTime for movement
    if (ref.current) {
      ref.current.material.uniforms.uTime.value += 0.1 * delta;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        // Ensure the fragment shader runs smoothly
        needsUpdate={true}
      />
    </mesh>
  );
});
SilkPlane.displayName = "SilkPlane";

// Main component that sets up the scene and passes uniforms
const Silk = ({
  speed = 5,
  scale = 1,
  colors = ["#eb1c24", "#303093", "#ffffff"], // Default colors as requested
  noiseIntensity = 1.5,
  rotation = 0,
}) => {
  const meshRef = useRef();

  // Memoize uniforms to prevent unnecessary shader recompilation
  const uniforms = useMemo(
    () => {
      // FIX: Use Color().toArray() to get a simple [r, g, b] array (vec3), 
      // avoiding R3F reconciliation issues with the complex Color object itself.
      const colorToVec3 = (hex) => new Color(hex).toArray();

      return {
        uSpeed: { value: speed },
        uScale: { value: scale },
        uNoiseIntensity: { value: noiseIntensity },
        uRotation: { value: rotation },
        uTime: { value: 0 },
        // SWAPPED: colors[1] (Indigo/Blue) is now uColor1, colors[0] (Red) is now uColor2
        uColor1: { value: colorToVec3(colors[1]) }, // Passing [r, g, b] array (#303093)
        uColor2: { value: colorToVec3(colors[0]) }, // Passing [r, g, b] array (#eb1c24)
        uColor3: { value: colorToVec3(colors[2]) }, // Passing [r, g, b] array (#ffffff)
      };
    },
    [speed, scale, noiseIntensity, colors, rotation]
  );

  return (
    <div className="absolute inset-0 bg-gray-900">
      <Canvas dpr={[1, 2]} frameloop="always" camera={{ position: [0, 0, 1] }}>
        <SilkPlane ref={meshRef} uniforms={uniforms} />
      </Canvas>
      {/* Removed the top left print statement as requested */}
    </div>
  );
};

// Exporting the component as 'App' for consistency
export default function App() {
    return (
        <Silk />
    );
}
