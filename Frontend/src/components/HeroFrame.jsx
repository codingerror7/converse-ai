"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
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
    <section className="relative w-full min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-7 overflow-hidden bg-[#020204] select-none">
      
      {/* Dominant Thick Black Outer Chassis Frame with Responsive Scaling */}
      <div className="relative w-full max-w-[1580px] h-[100svh] sm:h-[94vh] min-h-[580px] max-h-[920px] rounded-[28px] sm:rounded-[44px] md:rounded-[56px] border-4 sm:border-8 md:border-[14px] border-[#000000] bg-[#000000] overflow-hidden ring-1 ring-white/[0.09] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_90px_-20px_rgba(0,0,0,0.98)] flex flex-col justify-between z-10">
        
        {/* Full-Bleed Video Surface clipped inside the rounded chassis */}
        <VideoBackground />

        {/* Structural Top Black Pods: Brand Logo + Auth Controls */}
        <NavbarPods />

        {/* Center Screen: Left-Center Headline & Right-Side Frosted Cards */}
        <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-center lg:items-center justify-between px-4 sm:px-10 lg:px-16 pt-16 sm:pt-28 pb-16 sm:pb-20 gap-6 sm:gap-8 lg:gap-10 my-auto w-full">
          
          {/* Left-Center Hero Typography */}
          <div className="w-full max-w-[580px] text-left">
            
            {/* Eyebrow Badge */}
            <motion.div
              custom={0}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.12] mb-3 sm:mb-4 shadow-sm"
            >
              <Sparkles size={11} className="text-[#A78BFA]" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 font-mono">
                AI CHATBOT ENGINE
              </span>
            </motion.div>

            {/* Primary Headline */}
            <motion.h1
              custom={0.08}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-[2.25rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-[4.85rem] font-black tracking-[-0.04em] text-white lg:leading-[0.98] font-sans drop-shadow-md"
            >
              Build an AI that <br />
              <span className="text-gradient-violet drop-shadow-[0_0_35px_rgba(167,139,250,0.35)]">
                talks like you.
              </span>
            </motion.h1>

            {/* Concise Supporting Description */}
            <motion.p
              custom={0.16}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-xs sm:text-sm md:text-[15px] text-white/80 leading-relaxed max-w-[440px] mt-3 sm:mt-5 font-normal"
            >
              Build a custom chatbot tailored to your purpose, personality, and knowledge base—without complex infrastructure or AI overhead.
            </motion.p>

          </div>

          {/* Right-Side Stacked Frosted Glass Cards (Responsive position) */}
          <div className="w-full lg:w-auto flex justify-start sm:justify-center lg:justify-end shrink-0">
            <FloatingCards />
          </div>

        </div>

        {/* Bottom Bar: Left Pill + Center Solid Black Notch + Right Indicator */}
        <div className="relative z-30 flex items-end justify-between px-4 sm:px-10 pb-0 pointer-events-none w-full">
          
          {/* Bottom-Left Frosted Glass Workflow Pill */}
          <motion.a
            href="#how-it-works"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="hidden md:flex pointer-events-auto items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-2xl border border-white/20 shadow-lg mb-4 sm:mb-6 transition-all duration-200 group cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-xs font-black shadow group-hover:translate-y-0.5 transition-transform">
              <ArrowDown size={11} strokeWidth={3} />
            </div>
            <span className="text-[11px] font-semibold text-white tracking-wide pr-1 font-mono uppercase">
              Explore Workflow
            </span>
          </motion.a>

          {/* Bottom-Center Structural Black Notch holding the primary CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="pointer-events-auto mx-auto absolute left-1/2 -translate-x-1/2 bottom-0 bg-[#000000] px-5 sm:px-9 py-2.5 sm:py-3.5 rounded-t-[18px] sm:rounded-t-[28px] border-t border-x border-white/[0.08] shadow-[0_-12px_35px_rgba(0,0,0,0.95)] flex items-center justify-center"
          >
            <Link
              href="/create"
              className="group px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] active:scale-95 whitespace-nowrap min-h-[42px] sm:min-h-[46px] flex items-center gap-2"
            >
              <span>Build Your AI</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Symmetrical right indicator pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="hidden md:flex pointer-events-auto items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/10 mb-4 sm:mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-white/70">
              Instant Setup &lt; 60s
            </span>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
