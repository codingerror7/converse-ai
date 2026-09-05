"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AIOrbCore({ isHovered = false, prefersReducedMotion = false }) {
  const coreRef = useRef();
  const wireframeRef = useRef();
  const innerGlowRef = useRef();
  const lightRef = useRef();

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    const t = state.clock.getElapsedTime();
    const speedMultiplier = isHovered ? 1.6 : 1.0;

    // Smooth breathing scale oscillation
    const breath = 1 + Math.sin(t * 2.2 * speedMultiplier) * 0.045;
    
    if (coreRef.current) {
      coreRef.current.scale.set(breath, breath, breath);
      coreRef.current.rotation.y += delta * 0.35 * speedMultiplier;
      coreRef.current.rotation.x = Math.sin(t * 0.8) * 0.15;
    }

    if (wireframeRef.current) {
      const wireBreath = 1 + Math.cos(t * 1.8 * speedMultiplier) * 0.05;
      wireframeRef.current.scale.set(wireBreath, wireBreath, wireBreath);
      wireframeRef.current.rotation.y -= delta * 0.5 * speedMultiplier;
      wireframeRef.current.rotation.z += delta * 0.25 * speedMultiplier;
    }

    if (innerGlowRef.current) {
      const pulse = 1 + Math.sin(t * 3.5 * speedMultiplier) * 0.08;
      innerGlowRef.current.scale.set(pulse, pulse, pulse);
    }

    if (lightRef.current) {
      const targetIntensity = isHovered ? 3.5 : 2.2;
      const pulseIntensity = targetIntensity + Math.sin(t * 4 * speedMultiplier) * 0.6;
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, pulseIntensity, 0.1);
    }
  });

  return (
    <group>
      {/* Central Omnidirectional AI Pulse Light */}
      <pointLight
        ref={lightRef}
        color="#8B5CF6"
        distance={6}
        intensity={2.2}
        decay={2}
      />
      
      {/* Secondary Indigo Soft Fill Light */}
      <pointLight
        color="#2563EB"
        position={[0, -0.4, 0.4]}
        distance={4}
        intensity={1.2}
        decay={2}
      />

      {/* Primary Inner Emissive Orb */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.78, 48, 48]} />
        <meshPhysicalMaterial
          color="#0d041a"
          emissive="#6366F1"
          emissiveIntensity={isHovered ? 0.9 : 0.6}
          roughness={0.15}
          metalness={0.7}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          transmission={0.4}
          thickness={0.8}
          ior={1.4}
        />
      </mesh>

      {/* Geodesic Faceted Wireframe Shell */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[0.98, 2]} />
        <meshStandardMaterial
          color="#A78BFA"
          emissive="#8B5CF6"
          emissiveIntensity={isHovered ? 1.4 : 0.8}
          wireframe
          transparent
          opacity={isHovered ? 0.85 : 0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Glowing Plasma Sphere */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial
          color={isHovered ? "#C4B5FD" : "#8B5CF6"}
          transparent
          opacity={isHovered ? 0.9 : 0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
