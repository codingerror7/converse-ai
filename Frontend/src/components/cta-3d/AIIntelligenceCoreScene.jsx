"use client";

import React, { useRef, useState, useEffect, Suspense, Component } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import AIOrbCore from './AIOrbCore';
import OrbitalGimbalRings from './OrbitalGimbalRings';
import ParticleConstellation from './ParticleConstellation';
import FloatingTelemetryNodes from './FloatingTelemetryNodes';

/* -------------------------------------------------------------------------- */
/* WebGL Error Boundary to prevent crashes and trigger CSS fallback           */
/* -------------------------------------------------------------------------- */
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("WebGL Canvas failed, falling back to CSS visual:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/* Inner Scene Hierarchy with Silky-Smooth Parallax & Lighting Rig           */
/* -------------------------------------------------------------------------- */
function SceneRig({ isHovered, prefersReducedMotion, isMobile }) {
  const masterGroupRef = useRef();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!masterGroupRef.current) return;

    const motionScale = prefersReducedMotion ? 0.35 : 1;
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // [-1 to +1]

    // Target rotations derived from cursor + gentle ambient floating
    const targetRotX = pointer.y * -0.35 + Math.sin(t * 0.7) * 0.08;
    const targetRotY = pointer.x * 0.45 + Math.cos(t * 0.5) * 0.1;
    const targetPosX = pointer.x * (isMobile ? 0.08 : 0.18);
    const targetPosY = pointer.y * (isMobile ? 0.08 : 0.18) + Math.sin(t * 1.2) * 0.06;

    // Responsive lerping (damped, restrained: "the object is aware of me")
    const lerpFactor = delta * (isHovered ? 4.5 : 3.0) * motionScale;
    masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(masterGroupRef.current.rotation.x, targetRotX * motionScale, lerpFactor);
    masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(masterGroupRef.current.rotation.y, targetRotY * motionScale, lerpFactor);
    masterGroupRef.current.position.x = THREE.MathUtils.lerp(masterGroupRef.current.position.x, targetPosX * motionScale, lerpFactor);
    masterGroupRef.current.position.y = THREE.MathUtils.lerp(masterGroupRef.current.position.y, targetPosY * motionScale, lerpFactor);

    // Scale responsive adjustment
    const baseScale = isMobile ? 0.85 : 1.0;
    const targetScale = (isHovered ? baseScale * 1.05 : baseScale) * motionScale;
    masterGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);
  });

  return (
    <>
      {/* Dynamic Lighting Rig */}
      <ambientLight intensity={0.5} color="#C4B5FD" />
      <directionalLight position={[5, 6, 5]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-5, -4, -3]} intensity={1.0} color="#2563EB" />
      <pointLight position={[0, 3, 2]} intensity={1.5} color="#8B5CF6" distance={8} />

      {/* Main Interactive 3D Hierarchy */}
      <group ref={masterGroupRef} position={[0, 0, 0]}>
        <AIOrbCore isHovered={isHovered} prefersReducedMotion={prefersReducedMotion} />
        <OrbitalGimbalRings isHovered={isHovered} prefersReducedMotion={prefersReducedMotion} />
        <ParticleConstellation
          isHovered={isHovered}
          prefersReducedMotion={prefersReducedMotion}
          count={isMobile ? 120 : 240}
        />
        <FloatingTelemetryNodes isHovered={isHovered} prefersReducedMotion={prefersReducedMotion} />
      </group>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* High-Fidelity CSS / SVG Graceful WebGL Fallback                            */
/* -------------------------------------------------------------------------- */
export function CSSAIFallback({ isHovered = false }) {
  return (
    <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] flex items-center justify-center select-none overflow-hidden">
      {/* Ambient Pulsing Aura */}
      <div className={`absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#7C3AED]/40 via-[#6366F1]/30 to-[#2563EB]/20 blur-[60px] transition-all duration-700 ${isHovered ? 'scale-110 opacity-90' : 'scale-100 opacity-70'}`} />

      {/* Outer Rotating Dashed Ring */}
      <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-dashed border-[#8B5CF6]/40 animate-[spin_24s_linear_infinite]" />

      {/* Middle Orbit Ring with Node */}
      <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-white/20 animate-[spin_16s_linear_infinite_reverse]">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#A78BFA] shadow-[0_0_12px_#A78BFA]" />
      </div>

      {/* Inner Tilted Ring */}
      <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-[#38BDF8]/40 rotate-45 animate-[spin_10s_linear_infinite]">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
      </div>

      {/* Center Luminescent Intelligence Orb */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#7C3AED] via-[#6366F1] to-[#2563EB] shadow-[0_0_40px_rgba(124,58,237,0.8)] flex items-center justify-center animate-pulse">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/40 flex items-center justify-center">
          <span className="text-white text-xs sm:text-sm font-black font-mono tracking-wider">AI</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Master 3D Scene Component                                                  */
/* -------------------------------------------------------------------------- */
export default function AIIntelligenceCoreScene({ isHovered = false, prefersReducedMotion = false }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);

    const detectWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl =
          canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl');

        if (!gl) {
          setHasWebGL(false);
        }
      } catch {
        setHasWebGL(false);
      }
    };

    detectWebGL();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return <CSSAIFallback isHovered={isHovered} />;
  }

  if (!hasWebGL) {
    return <CSSAIFallback isHovered={isHovered} />;
  }

  return (
    <WebGLErrorBoundary fallback={<CSSAIFallback isHovered={isHovered} />}>
      <div className="relative w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden rounded-[28px]">
        <Suspense fallback={<CSSAIFallback isHovered={isHovered} />}>
          <Canvas
            camera={{ position: [0, 0, 5.4], fov: 42 }}
            dpr={isMobile ? [1, 1.25] : [1, 1.75]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: false,
            }}
            frameloop="always"
            className="pointer-events-auto h-full w-full"
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 0);
            }}
          >
            <SceneRig
              isHovered={isHovered}
              prefersReducedMotion={prefersReducedMotion}
              isMobile={isMobile}
            />
          </Canvas>
        </Suspense>
      </div>
    </WebGLErrorBoundary>
  );
}
