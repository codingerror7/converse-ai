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
function SceneRig({ isHovered, prefersReducedMotion, deviceType }) {
  const masterGroupRef = useRef();

  useFrame((state, delta) => {
    if (!masterGroupRef.current) return;

    const motionScale = prefersReducedMotion ? 0.35 : 1;
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // [-1 to +1]

    // Responsive parallax displacement based on device
    const isMobile = deviceType === 'mobile';
    const isTablet = deviceType === 'tablet';

    // Target rotations derived from cursor + gentle ambient floating
    const targetRotX = pointer.y * -0.26 + Math.sin(t * 0.7) * 0.06;
    const targetRotY = pointer.x * 0.32 + Math.cos(t * 0.5) * 0.07;
    const targetPosX = pointer.x * (isMobile ? 0.04 : 0.08);
    const targetPosY = pointer.y * (isMobile ? 0.04 : 0.08) + Math.sin(t * 1.2) * 0.04;

    // Responsive lerping (damped, restrained: "the object is aware of me")
    const lerpFactor = delta * (isHovered ? 4.2 : 2.8) * motionScale;
    masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(masterGroupRef.current.rotation.x, targetRotX * motionScale, lerpFactor);
    masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(masterGroupRef.current.rotation.y, targetRotY * motionScale, lerpFactor);
    masterGroupRef.current.position.x = THREE.MathUtils.lerp(masterGroupRef.current.position.x, targetPosX * motionScale, lerpFactor);
    masterGroupRef.current.position.y = THREE.MathUtils.lerp(masterGroupRef.current.position.y, targetPosY * motionScale, lerpFactor);

    // Significantly increased prominent scale for maximum visual dominance
    const baseScale = isMobile ? 1.22 : isTablet ? 1.48 : 1.78;
    const targetScale = (isHovered ? baseScale * 1.04 : baseScale) * motionScale;
    masterGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);
  });

  return (
    <>
      {/* Dynamic Lighting Rig */}
      <ambientLight intensity={0.6} color="#C4B5FD" />
      <directionalLight position={[5, 6, 5]} intensity={2.0} color="#FFFFFF" />
      <directionalLight position={[-5, -4, -3]} intensity={1.2} color="#2563EB" />
      <pointLight position={[0, 3, 2]} intensity={1.8} color="#8B5CF6" distance={10} />

      {/* Main Interactive 3D Hierarchy */}
      <group ref={masterGroupRef} position={[0, 0, 0]}>
        <AIOrbCore isHovered={isHovered} prefersReducedMotion={prefersReducedMotion} />
        <OrbitalGimbalRings isHovered={isHovered} prefersReducedMotion={prefersReducedMotion} />
        <ParticleConstellation
          isHovered={isHovered}
          prefersReducedMotion={prefersReducedMotion}
          count={deviceType === 'mobile' ? 140 : 260}
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
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] flex items-center justify-center select-none overflow-hidden">
      {/* Ambient Pulsing Aura */}
      <div className={`absolute w-88 h-88 sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-[#7C3AED]/40 via-[#6366F1]/30 to-[#2563EB]/20 blur-[80px] transition-all duration-700 ${isHovered ? 'scale-110 opacity-90' : 'scale-100 opacity-70'}`} />

      {/* Outer Rotating Dashed Ring */}
      <div className="absolute w-80 h-80 sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-[#8B5CF6]/40 animate-[spin_24s_linear_infinite]" />

      {/* Middle Orbit Ring with Node */}
      <div className="absolute w-64 h-64 sm:w-[290px] sm:h-[290px] rounded-full border border-white/20 animate-[spin_16s_linear_infinite_reverse]">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#A78BFA] shadow-[0_0_16px_#A78BFA]" />
      </div>

      {/* Inner Tilted Ring */}
      <div className="absolute w-48 h-48 sm:w-[210px] sm:h-[210px] rounded-full border border-[#38BDF8]/40 rotate-45 animate-[spin_10s_linear_infinite]">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" />
      </div>

      {/* Center Luminescent Intelligence Orb */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#7C3AED] via-[#6366F1] to-[#2563EB] shadow-[0_0_55px_rgba(124,58,237,0.9)] flex items-center justify-center animate-pulse">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/40 backdrop-blur-sm border border-white/40 flex items-center justify-center">
          <span className="text-white text-sm sm:text-base font-black font-mono tracking-wider">AI</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Master 3D Scene Component                                                  */
/* -------------------------------------------------------------------------- */
export default function AIIntelligenceCoreScene({ isHovered = false, prefersReducedMotion = false }) {
  const [deviceType, setDeviceType] = useState('desktop'); // 'mobile' | 'tablet' | 'desktop'
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
      const w = window.innerWidth;
      if (w < 640) {
        setDeviceType('mobile');
      } else if (w < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
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
      <div className="relative w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] flex items-center justify-center overflow-hidden rounded-[28px]">
        <Suspense fallback={<CSSAIFallback isHovered={isHovered} />}>
          <Canvas
            camera={{ position: [0, 0, 3.5], fov: 44 }}
            dpr={deviceType === 'mobile' ? [1, 1.25] : [1, 1.75]}
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
              deviceType={deviceType}
            />
          </Canvas>
        </Suspense>
      </div>
    </WebGLErrorBoundary>
  );
}
