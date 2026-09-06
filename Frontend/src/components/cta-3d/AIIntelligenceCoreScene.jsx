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
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!masterGroupRef.current) return;

    const motionScale = prefersReducedMotion ? 0.35 : 1;
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // [-1 to +1]

    const isMobile = deviceType === 'mobile';
    const isTablet = deviceType === 'tablet';

    // Restrained parallax displacement
    const targetRotX = pointer.y * -0.22 + Math.sin(t * 0.7) * 0.05;
    const targetRotY = pointer.x * 0.28 + Math.cos(t * 0.5) * 0.06;
    const targetPosX = pointer.x * (isMobile ? 0.04 : 0.08);
    const targetPosY = pointer.y * (isMobile ? 0.04 : 0.08) + Math.sin(t * 1.2) * 0.04;

    // Responsive lerping
    const lerpFactor = delta * (isHovered ? 4.2 : 2.8) * motionScale;
    masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(masterGroupRef.current.rotation.x, targetRotX * motionScale, lerpFactor);
    masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(masterGroupRef.current.rotation.y, targetRotY * motionScale, lerpFactor);
    masterGroupRef.current.position.x = THREE.MathUtils.lerp(masterGroupRef.current.position.x, targetPosX * motionScale, lerpFactor);
    masterGroupRef.current.position.y = THREE.MathUtils.lerp(masterGroupRef.current.position.y, targetPosY * motionScale, lerpFactor);

    // Responsive viewport-fitted scaling to ensure 100% visibility without clipping
    // The model occupies ~75-80% of the canvas area, leaving comfortable breathing room around all outer rings/particles
    const safeDimension = Math.min(viewport.width, viewport.height);
    const targetOccupancy = isMobile ? 0.74 : isTablet ? 0.78 : 0.80;
    const baseFitScale = (safeDimension * targetOccupancy) / 4.4;
    const targetScale = (isHovered ? baseFitScale * 1.04 : baseFitScale) * (prefersReducedMotion ? 0.95 : 1);
    
    masterGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 4);
  });

  return (
    <>
      {/* Dynamic Lighting Rig */}
      <ambientLight intensity={0.65} color="#94A3B8" />
      <directionalLight position={[5, 6, 5]} intensity={2.5} color="#F1F5F9" />
      <directionalLight position={[-5, -4, -3]} intensity={1.5} color="#06B6D4" />
      <pointLight position={[0, 3, 2]} intensity={2.2} color="#3B82F6" distance={15} />

      {/* Main Interactive 3D Hierarchy */}
      <group ref={masterGroupRef} position={[0, 0, 0]}>
        <AIOrbCore isHovered={isHovered} prefersReducedMotion={prefersReducedMotion} />
        <OrbitalGimbalRings isHovered={isHovered} prefersReducedMotion={prefersReducedMotion} />
        <ParticleConstellation
          isHovered={isHovered}
          prefersReducedMotion={prefersReducedMotion}
          count={deviceType === 'mobile' ? 160 : 280}
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
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] xl:min-h-[680px] flex items-center justify-center select-none overflow-hidden">
      {/* Ambient Pulsing Aura */}
      <div className={`absolute w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-tr from-[#3B82F6]/40 via-[#06B6D4]/30 to-[#67E8F9]/20 blur-[90px] transition-all duration-700 ${isHovered ? 'scale-110 opacity-90' : 'scale-100 opacity-70'}`} />

      {/* Outer Rotating Dashed Ring */}
      <div className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] rounded-full border border-dashed border-[#3B82F6]/40 animate-[spin_24s_linear_infinite]" />

      {/* Middle Orbit Ring with Node */}
      <div className="absolute w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full border border-[#1E2933] animate-[spin_16s_linear_infinite_reverse]">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#67E8F9] shadow-[0_0_16px_#67E8F9]" />
      </div>

      {/* Inner Tilted Ring */}
      <div className="absolute w-[190px] h-[190px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] rounded-full border border-[#06B6D4]/40 rotate-45 animate-[spin_10s_linear_infinite]">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#06B6D4] shadow-[0_0_12px_#06B6D4]" />
      </div>

      {/* Center Luminescent Intelligence Orb */}
      <div className="relative w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#67E8F9] shadow-[0_0_65px_rgba(59,130,246,0.85)] flex items-center justify-center animate-pulse">
        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-[#06090D]/80 backdrop-blur-sm border border-[#1E2933] flex items-center justify-center">
          <span className="text-[#F1F5F9] text-base sm:text-xl lg:text-2xl font-black font-mono tracking-wider">AI</span>
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
      <div className="relative w-full h-full min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] xl:min-h-[680px] flex items-center justify-center overflow-hidden rounded-[28px]">
        <Suspense fallback={<CSSAIFallback isHovered={isHovered} />}>
          <Canvas
            camera={{ position: [0, 0, 5.6], fov: 45 }}
            dpr={deviceType === 'mobile' ? [1, 1.25] : [1, 2]}
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
