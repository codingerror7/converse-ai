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
    const lerpFactor = Math.min(delta * (isHovered ? 4.2 : 2.8) * motionScale, 0.2);
    masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(masterGroupRef.current.rotation.x, targetRotX * motionScale, lerpFactor);
    masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(masterGroupRef.current.rotation.y, targetRotY * motionScale, lerpFactor);
    masterGroupRef.current.position.x = THREE.MathUtils.lerp(masterGroupRef.current.position.x, targetPosX * motionScale, lerpFactor);
    masterGroupRef.current.position.y = THREE.MathUtils.lerp(masterGroupRef.current.position.y, targetPosY * motionScale, lerpFactor);

    // Responsive viewport-fitted scaling to ensure 100% visibility without clipping
    const safeDimension = Math.min(viewport.width, viewport.height);
    const targetOccupancy = isMobile ? 0.74 : isTablet ? 0.78 : 0.80;
    const baseFitScale = (safeDimension * targetOccupancy) / 4.4;
    const targetScale = (isHovered ? baseFitScale * 1.04 : baseFitScale) * (prefersReducedMotion ? 0.95 : 1);
    
    masterGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), Math.min(delta * 4, 0.25));
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
          count={deviceType === 'mobile' ? 140 : 240}
        />
        <FloatingTelemetryNodes isHovered={isHovered} prefersReducedMotion={prefersReducedMotion} />
      </group>
    </>
  );
}

import CSSAIFallback from './CSSAIFallback';

/* -------------------------------------------------------------------------- */
/* Master 3D Scene Component with Visibility Throttling                        */
/* -------------------------------------------------------------------------- */
export default function AIIntelligenceCoreScene({ isHovered = false, prefersReducedMotion = false }) {
  const containerRef = useRef(null);
  const [deviceType, setDeviceType] = useState('desktop'); // 'mobile' | 'tablet' | 'desktop'
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

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

    // IntersectionObserver to pause RAF loop when scrolled offscreen
    let observer = null;
    if (containerRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  if (!mounted) {
    return <CSSAIFallback isHovered={isHovered} />;
  }

  if (!hasWebGL) {
    return <CSSAIFallback isHovered={isHovered} />;
  }

  return (
    <WebGLErrorBoundary fallback={<CSSAIFallback isHovered={isHovered} />}>
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] xl:min-h-[680px] flex items-center justify-center overflow-hidden rounded-[28px]"
      >
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
            frameloop={isVisible ? "always" : "never"}
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
