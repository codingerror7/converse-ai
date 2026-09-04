"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import VideoBackground from './VideoBackground';
import NavbarPods from './NavbarPods';
import FloatingCards from './FloatingCards';

export default function HeroFrame() {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.65,
        delay: prefersReducedMotion ? 0 : customDelay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden bg-[#020205]">
      
      {/* Main Outer Rounded Hero Chassis Frame (96vw x 92vh on Desktop) */}
      <div className="relative w-full max-w-[1680px] h-[100svh] sm:h-[92vh] min-h-[640px] max-h-[980px] rounded-none sm:rounded-[36px] lg:rounded-[42px] overflow-hidden border-0 sm:border border-white/[0.14] bg-black shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col justify-between z-10">
        
        {/* Full-Bleed Video Background clipped by the rounded frame */}
        <VideoBackground />

        {/* Top Floating Dock Pods: Logo & Auth */}
        <NavbarPods />

        {/* Center Canvas Area: Left-Center Headline & Right Floating Cards */}
        <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-center lg:items-center justify-between px-6 sm:px-12 lg:px-16 pt-24 sm:pt-28 pb-20 gap-8 lg:gap-12 my-auto">
          
          {/* Left-Center Hero Typography (Max width ~560px) */}
          <div className="w-full max-w-[580px] text-left">
            
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#F5F5F7]">
                AI Chatbot Builder
              </span>
            </motion.div>

            {/* Main Headline (2-3 lines, bold, tight line-height matching reference) */}
            <motion.h1
              custom={0.1}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-[-0.035em] text-white leading-[0.98] font-sans drop-shadow-md"
            >
              Build an AI <br />
              that talks <br />
              like you.
            </motion.h1>

            {/* Concise Supporting Description */}
            <motion.p
              custom={0.2}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-[460px] mt-4 sm:mt-5 mb-6 sm:mb-8 font-normal"
            >
              Create a personalized AI chatbot by defining its purpose, personality, and behavior — in minutes.
            </motion.p>

            {/* Primary Hero CTA Button */}
            <motion.div
              custom={0.3}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4"
            >
              <Link
                href="/create"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-bold text-white rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.45)] hover:shadow-[0_0_40px_rgba(124,58,237,0.7)] -translate-y-0 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Build your AI</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>

          </div>

          {/* Right-Side Stacked Frosted Glass Cards */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0">
            <FloatingCards />
          </div>

        </div>

        {/* Bottom Bar: Left Pill Indicator + Center Anchored CTA Dock Notch */}
        <div className="relative z-30 flex items-end justify-between px-6 sm:px-10 pb-0 pointer-events-none">
          
          {/* Bottom-Left Frosted Glass Swipe Pill (matching reference image) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden sm:flex pointer-events-auto items-center gap-3 px-3.5 py-2 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.16] shadow-lg mb-4 sm:mb-6"
          >
            <div className="w-6 h-6 rounded-full bg-white/90 text-black flex items-center justify-center text-xs font-bold shadow">
              <ChevronRight size={13} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-medium text-white/90 tracking-wide pr-2">
              Swipe to Get Started
            </span>
          </motion.div>

          {/* Bottom-Center Primary CTA Dock Notch (matching reference image) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="pointer-events-auto mx-auto sm:mx-0 absolute left-1/2 -translate-x-1/2 bottom-0 bg-[#050508]/95 backdrop-blur-md border-x border-t border-white/[0.14] rounded-t-[22px] px-6 sm:px-8 py-3 sm:py-3.5 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] flex items-center justify-center"
          >
            <Link
              href="/create"
              className="px-6 sm:px-7 py-2 sm:py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.65)] active:scale-95 whitespace-nowrap"
            >
              Create Your Chatbot →
            </Link>
          </motion.div>

          {/* Invisible spacer on bottom right for symmetrical balance */}
          <div className="hidden sm:block w-[180px]" />

        </div>

      </div>

    </section>
  );
}
