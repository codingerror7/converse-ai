"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingTelemetryNodes({ isHovered = false, prefersReducedMotion = false }) {
  const groupRef = useRef();

  const nodes = [
    { pos: [1.8, 1.1, 0.6], color: '#8B5CF6', size: 0.055, speed: 0.8 },
    { pos: [-1.9, -0.9, 0.8], color: '#38BDF8', size: 0.05, speed: 0.9 },
    { pos: [1.2, -1.6, -0.7], color: '#A78BFA', size: 0.045, speed: 0.7 },
    { pos: [-1.4, 1.4, -0.5], color: '#6366F1', size: 0.048, speed: 0.85 },
    { pos: [0.3, 2.1, 0.4], color: '#C084FC', size: 0.04, speed: 0.6 },
  ];

  useFrame((state, delta) => {
    if (prefersReducedMotion || !groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const speedMultiplier = isHovered ? 1.3 : 1.0;

    groupRef.current.rotation.y += delta * 0.15 * speedMultiplier;
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={isHovered ? 2.5 : 1.6}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
