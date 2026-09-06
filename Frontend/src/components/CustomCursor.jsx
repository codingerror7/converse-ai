"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const arrowRef = useRef(null);

  // Use local state only for initial mount & pointer capability
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if device has a fine pointer (mouse) and hover support
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointerQuery.matches) {
      return; // Do not enable on mobile / touch devices
    }

    setIsEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    // High-performance direct coordinates (no React state updates in render loop)
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isInitialized = false;
    let hoverType = 'default'; // 'default' | 'action' | 'card' | 'text' | 'hidden'
    let rafId = null;

    // Subtle magnetic target offset
    let magneticOffsetX = 0;
    let magneticOffsetY = 0;

    const handlePointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isInitialized) {
        ringX = mouseX;
        ringY = mouseY;
        isInitialized = true;
      }

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check for magnetic elements nearby
      const target = e.target;
      const magneticEl = target ? target.closest('[data-cursor-magnetic], .group:has(a[href="/create"])') : null;
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
        if (distFromCenter < 90) {
          magneticOffsetX = (centerX - mouseX) * 0.12;
          magneticOffsetY = (centerY - mouseY) * 0.12;
          // Clamp magnetic offset to max 5px
          magneticOffsetX = Math.max(-5, Math.min(5, magneticOffsetX));
          magneticOffsetY = Math.max(-5, Math.min(5, magneticOffsetY));
        } else {
          magneticOffsetX = 0;
          magneticOffsetY = 0;
        }
      } else {
        magneticOffsetX = 0;
        magneticOffsetY = 0;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check interactive types
      const interactiveEl = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], [data-cursor="interactive"], [data-cursor="cta"]');
      const cardEl = target.closest('[data-cursor="card"], .frosted-glass-card, [data-cursor="focus"]');
      const textEl = target.closest('input[type="text"], input[type="email"], input[type="search"], textarea');
      const hiddenEl = target.closest('[data-cursor="none"]');

      if (hiddenEl) {
        hoverType = 'hidden';
      } else if (textEl) {
        hoverType = 'text';
      } else if (interactiveEl) {
        hoverType = 'action';
      } else if (cardEl) {
        hoverType = 'card';
      } else {
        hoverType = 'default';
      }

      updateCursorStyles();
    };

    const updateCursorStyles = () => {
      if (!dotRef.current || !ringRef.current || !arrowRef.current) return;

      if (hoverType === 'hidden') {
        dotRef.current.style.opacity = '0';
        ringRef.current.style.opacity = '0';
        return;
      }

      if (hoverType === 'text') {
        dotRef.current.style.opacity = '0.3';
        ringRef.current.style.opacity = '0.2';
        ringRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(0.75)';
        arrowRef.current.style.opacity = '0';
        return;
      }

      dotRef.current.style.opacity = isVisible ? '1' : '0';
      ringRef.current.style.opacity = isVisible ? '1' : '0';

      if (hoverType === 'action') {
        // Button / Link hover: ring expands, dot morphs into small right arrow
        ringRef.current.style.width = '42px';
        ringRef.current.style.height = '42px';
        ringRef.current.style.borderColor = 'rgba(103, 232, 249, 0.75)';
        ringRef.current.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
        ringRef.current.style.boxShadow = '0 0 14px rgba(6, 182, 212, 0.28)';

        // Show arrow, hide solid dot circle
        dotRef.current.style.width = '14px';
        dotRef.current.style.height = '14px';
        dotRef.current.style.backgroundColor = 'transparent';
        dotRef.current.style.boxShadow = 'none';
        arrowRef.current.style.opacity = '1';
        arrowRef.current.style.transform = 'scale(1)';
      } else if (hoverType === 'card') {
        // Card hover: ring expands gently, center remains dot
        ringRef.current.style.width = '38px';
        ringRef.current.style.height = '38px';
        ringRef.current.style.borderColor = 'rgba(103, 232, 249, 0.55)';
        ringRef.current.style.backgroundColor = 'rgba(6, 182, 212, 0.04)';
        ringRef.current.style.boxShadow = '0 0 12px rgba(6, 182, 212, 0.2)';

        // Dot remains center dot
        dotRef.current.style.width = '6px';
        dotRef.current.style.height = '6px';
        dotRef.current.style.backgroundColor = '#06B6D4';
        dotRef.current.style.boxShadow = '0 0 8px rgba(6, 182, 212, 0.7)';
        arrowRef.current.style.opacity = '0';
        arrowRef.current.style.transform = 'scale(0.5)';
      } else {
        // Default state
        ringRef.current.style.width = '32px';
        ringRef.current.style.height = '32px';
        ringRef.current.style.borderColor = 'rgba(103, 232, 249, 0.45)';
        ringRef.current.style.backgroundColor = 'rgba(6, 182, 212, 0.03)';
        ringRef.current.style.boxShadow = '0 0 8px rgba(6, 182, 212, 0.15)';

        dotRef.current.style.width = '6px';
        dotRef.current.style.height = '6px';
        dotRef.current.style.backgroundColor = '#06B6D4';
        dotRef.current.style.boxShadow = '0 0 8px rgba(6, 182, 212, 0.6)';
        arrowRef.current.style.opacity = '0';
        arrowRef.current.style.transform = 'scale(0.5)';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    // Smooth render loop with RAF
    const prefersReduced = reducedMotionQuery.matches;
    const lerpFactor = prefersReduced ? 1 : 0.18;

    const renderLoop = () => {
      if (isInitialized) {
        // Center dot follows mouse instantly + subtle magnetic attraction
        const targetDotX = mouseX + magneticOffsetX;
        const targetDotY = mouseY + magneticOffsetY;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${targetDotX}px, ${targetDotY}px, 0) translate(-50%, -50%)`;
        }

        // Outer ring follows with buttery smooth lerp
        ringX += (targetDotX - ringX) * lerpFactor;
        ringY += (targetDotY - ringY) * lerpFactor;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    window.addEventListener('blur', handleMouseLeave, { passive: true });
    window.addEventListener('focus', handleMouseEnter, { passive: true });

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleMouseLeave);
      window.removeEventListener('focus', handleMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
    >
      {/* Outer Smooth Following Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid rgba(103, 232, 249, 0.45)',
          backgroundColor: 'rgba(6, 182, 212, 0.03)',
          boxShadow: '0 0 8px rgba(6, 182, 212, 0.15)',
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          transition: 'width 200ms cubic-bezier(0.16, 1, 0.3, 1), height 200ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, opacity 180ms ease',
          willChange: 'transform, width, height',
        }}
      />

      {/* Immediate Center Dot / Action Arrow */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#06B6D4',
          boxShadow: '0 0 8px rgba(6, 182, 212, 0.6)',
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          transition: 'width 180ms cubic-bezier(0.16, 1, 0.3, 1), height 180ms cubic-bezier(0.16, 1, 0.3, 1), background-color 180ms ease, box-shadow 180ms ease, opacity 180ms ease',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Minimal Clean SVG Arrow Icon for Action State */}
        <svg
          ref={arrowRef}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '10px',
            height: '10px',
            opacity: 0,
            transform: 'scale(0.5)',
            transition: 'opacity 180ms ease, transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <path
            d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
            stroke="#67E8F9"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
