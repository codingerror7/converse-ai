"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleConstellation({ isHovered = false, prefersReducedMotion = false, count = 240 }) {
  const pointsRef = useRef();

  // Pre-generate stable spherical particle distribution
  const [positions, originalPositions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere with variable radius
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      const r = 1.35 + Math.random() * 1.5; // Radius between 1.35 and 2.85

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      ph[i] = Math.random() * Math.PI * 2;
    }

    return [pos, orig, ph];
  }, [count]);

  useFrame((state, delta) => {
    if (prefersReducedMotion || !pointsRef.current) return;

    const t = state.clock.getElapsedTime();
    const speedMultiplier = isHovered ? 1.4 : 1.0;

    // Slow ambient rotation of the entire constellation
    pointsRef.current.rotation.y += delta * 0.12 * speedMultiplier;
    pointsRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const array = positionAttribute.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const wave = Math.sin(t * 1.8 + phases[i]) * 0.06 * speedMultiplier;
      
      // Gentle radial breathing of each particle
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      array[idx] = ox + ox * wave;
      array[idx + 1] = oy + oy * wave;
      array[idx + 2] = oz + oz * wave;
    }

    positionAttribute.needsUpdate = true;
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
        color="#C4B5FD"
        transparent
        opacity={isHovered ? 0.85 : 0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
