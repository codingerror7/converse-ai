"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import VideoBackground from './VideoBackground';
import NavbarPods from './NavbarPods';
import FloatingCards from './FloatingCards';

export default function HeroFrame() {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay: prefersReducedMotion ? 0 : customDelay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-7 overflow-hidden bg-black select-none">
      
      {/* Dominant Thick Black Outer Chassis Frame with Responsive Scaling */}
      <div className="relative w-full max-w-[1580px] h-[100svh] sm:h-[94vh] min-h-[560px] max-h-[920px] rounded-[28px] sm:rounded-[44px] md:rounded-[56px] border-4 sm:border-8 md:border-[14px] border-black bg-black overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_25px_80px_rgba(0,0,0,0.98)] flex flex-col justify-between z-10">
        
        {/* Full-Bleed Video Surface clipped inside the rounded frame */}
        <VideoBackground />

        {/* Structural Top Black Pods: Brand Logo + Auth Controls */}
        <NavbarPods />

        {/* Center Screen: Left-Center Headline & Right-Side Frosted Cards */}
        <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-center lg:items-center justify-between px-4 sm:px-10 lg:px-16 pt-16 sm:pt-28 pb-16 sm:pb-20 gap-6 sm:gap-8 lg:gap-10 my-auto w-full">
          
          {/* Left-Center Hero Typography */}
          <div className="w-full max-w-[560px] text-left">
            
            {/* Primary Headline (Responsive typography: 3 lines, tight leading) */}
            <motion.h1
              custom={0}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-[2.15rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold tracking-[-0.04em] text-white lg:leading-[0.98] font-sans drop-shadow-md"
            >
              Build an AI that <br />
            talks like you.
            </motion.h1>

            {/* Concise Supporting Description */}
            <motion.p
              custom={0.15}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-xs sm:text-sm md:text-[15px] text-white/80 leading-relaxed max-w-[420px] mt-3 sm:mt-5 font-normal"
            >
              Build a chatbot tailored to your purpose, personality, and instructions—without the complexity of building an AI from scratch.
            </motion.p>

          </div>

          {/* Right-Side Stacked Frosted Glass Cards (Responsive position) */}
          <div className="w-full lg:w-auto flex justify-start sm:justify-center lg:justify-end shrink-0">
            <FloatingCards />
          </div>

        </div>

        {/* Bottom Bar: Left Swipe Pill + Center Solid Black Notch */}
        <div className="relative z-30 flex items-end justify-between px-4 sm:px-10 pb-0 pointer-events-none w-full">
          
          {/* Bottom-Left Frosted Glass Swipe Pill (hidden on narrow mobile to prevent clutter) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="hidden md:flex pointer-events-auto items-center gap-3 px-3.5 py-2 rounded-full bg-white/[0.12] backdrop-blur-2xl border border-white/20 shadow-lg mb-4 sm:mb-6"
          >
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs font-black shadow">
              <ChevronRight size={14} strokeWidth={3} />
            </div>
            <span className="text-[12px] font-semibold text-white tracking-wide pr-2">
              Swipe to Get Started
            </span>
          </motion.div>

          {/* Bottom-Center Structural Black Notch holding the primary CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="pointer-events-auto mx-auto absolute left-1/2 -translate-x-1/2 bottom-0 bg-black px-5 sm:px-9 py-2.5 sm:py-3.5 rounded-t-[20px] sm:rounded-t-[32px] border-t border-x sm:border-t-2 sm:border-x-2 border-black shadow-[0_-12px_35px_rgba(0,0,0,0.95)] flex items-center justify-center"
          >
            <Link
              href="/create"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] active:scale-95 whitespace-nowrap min-h-[42px] sm:min-h-[46px] flex items-center justify-center"
            >
              Build Your AI
            </Link>
          </motion.div>

          {/* Symmetrical right placeholder */}
          <div className="hidden md:block w-[180px]" />

        </div>

      </div>

    </section>
  );
}
