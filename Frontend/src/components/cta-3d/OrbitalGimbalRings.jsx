"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function OrbitalGimbalRings({ isHovered = false, prefersReducedMotion = false }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const node1Ref = useRef();
  const node2Ref = useRef();
  const node3Ref = useRef();

  useFrame((state, delta) => {
    const motionScale = prefersReducedMotion ? 0.35 : 1;
    const t = state.clock.getElapsedTime();
    const speed = (isHovered ? 1.5 : 1.0) * motionScale;

    // Ring 1: Inner Dynamic Gimbal
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4 * speed;
      ring1Ref.current.rotation.y += delta * 0.6 * speed;
    }

    // Ring 2: Middle Polar Gimbal
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.5 * speed;
      ring2Ref.current.rotation.z += delta * 0.35 * speed;
    }

    // Ring 3: Outer Horizon Ring
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.25 * speed;
      ring3Ref.current.rotation.z += delta * 0.45 * speed;
    }

    // Orbiting Synaptic Nodes along ring perimeters
    if (node1Ref.current) {
      const angle1 = t * 1.2 * speed;
      node1Ref.current.position.set(Math.cos(angle1) * 1.35, Math.sin(angle1) * 1.35, 0);
    }

    if (node2Ref.current) {
      const angle2 = t * -0.9 * speed + 1.2;
      node2Ref.current.position.set(0, Math.cos(angle2) * 1.75, Math.sin(angle2) * 1.75);
    }

    if (node3Ref.current) {
      const angle3 = t * 0.8 * speed + 2.5;
      node3Ref.current.position.set(Math.cos(angle3) * 2.15, 0, Math.sin(angle3) * 2.15);
    }
  });

  return (
    <group>
      {/* ─── Ring 1: Inner Gimbal ─── */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.35, 0.016, 16, 100]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#2563EB"
            emissiveIntensity={isHovered ? 1.2 : 0.65}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        
        {/* Orbital Node on Ring 1 */}
        <mesh ref={node1Ref}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial
            color="#F1F5F9"
            emissive="#67E8F9"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* ─── Ring 2: Middle Gimbal ─── */}
      <group ref={ring2Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[1.75, 0.013, 16, 100]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#0891B2"
            emissiveIntensity={isHovered ? 1.0 : 0.5}
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>

        {/* Orbital Node on Ring 2 */}
        <mesh ref={node2Ref}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial
            color="#F1F5F9"
            emissive="#3B82F6"
            emissiveIntensity={2.2}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* ─── Ring 3: Outer Horizon Ring ─── */}
      <group ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[2.15, 0.01, 16, 120]} />
          <meshStandardMaterial
            color="#67E8F9"
            emissive="#06B6D4"
            emissiveIntensity={isHovered ? 0.9 : 0.4}
            metalness={0.9}
            roughness={0.25}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Orbital Node on Ring 3 */}
        <mesh ref={node3Ref}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial
            color="#67E8F9"
            emissive="#06B6D4"
            emissiveIntensity={2.0}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}
