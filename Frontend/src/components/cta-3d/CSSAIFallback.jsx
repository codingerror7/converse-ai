"use client";

import React from 'react';

/**
 * High-Fidelity CSS / SVG Graceful WebGL Fallback (Zero Three.js dependencies)
 */
export default function CSSAIFallback({ isHovered = false }) {
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
