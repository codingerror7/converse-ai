"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleConstellation({ isHovered = false, prefersReducedMotion = false, count = 240 }) {
  const pointsRef = useRef();

  // Pre-generate stable spherical particle distribution
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere with variable radius
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.35 + Math.random() * 1.5; // Radius between 1.35 and 2.85

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const motionScale = prefersReducedMotion ? 0.35 : 1;
    const t = state.clock.getElapsedTime();
    const speedMultiplier = (isHovered ? 1.4 : 1.0) * motionScale;

    // Fast GPU-friendly transform: rotation + breathing scale
    pointsRef.current.rotation.y += delta * 0.12 * speedMultiplier;
    pointsRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;

    const breath = 1 + Math.sin(t * 1.5 * speedMultiplier) * 0.04;
    pointsRef.current.scale.set(breath, breath, breath);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        color="#67E8F9"
        transparent
        opacity={isHovered ? 0.85 : 0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
