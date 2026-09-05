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
    <section className="relative w-full min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-7 overflow-hidden bg-[#06090D] select-none">
      
      {/* Dominant Outer Chassis Frame with Responsive Scaling */}
      <div className="relative w-full max-w-[1580px] h-[100svh] sm:h-[94vh] min-h-[580px] max-h-[920px] rounded-[28px] sm:rounded-[44px] md:rounded-[56px] border-4 sm:border-8 md:border-[14px] border-[#06090D] bg-[#06090D] overflow-hidden ring-1 ring-[#1E2933] shadow-[0_0_0_1px_rgba(30,41,51,0.6),0_30px_90px_-20px_rgba(6,9,13,0.98)] flex flex-col justify-between z-10">
        
        {/* Full-Bleed Video Surface clipped inside the rounded chassis */}
        <VideoBackground />

        {/* Structural Top Pods: Brand Logo + Auth Controls */}
        <NavbarPods />

        {/* Center Screen: Left-Center Headline & Right-Side Frosted Cards */}
        <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-center lg:items-center justify-between px-4 sm:px-10 lg:px-16 pt-16 sm:pt-28 pb-16 sm:pb-20 gap-6 sm:gap-8 lg:gap-10 my-auto w-full">
          
          {/* Left-Center Hero Typography */}
          <div className="w-full max-w-[580px] text-left">

            {/* Primary Headline */}
            <motion.h1
              custom={0.08}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-[2.25rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-[4.85rem] font-black tracking-[-0.04em] text-[#F1F5F9] lg:leading-[0.98] font-sans drop-shadow-md"
            >
              Build an AI that <br />
              <span className="text-gradient-primary drop-shadow-[0_0_35px_rgba(103,232,249,0.35)]">
                talks like you.
              </span>
            </motion.h1>

            {/* Concise Supporting Description */}
            <motion.p
              custom={0.16}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-xs sm:text-sm md:text-[15px] text-[#94A3B8] leading-relaxed max-w-[440px] mt-3 sm:mt-5 font-normal"
            >
              Build a custom chatbot tailored to your purpose, personality, and knowledge base—without complex infrastructure or AI overhead.
            </motion.p>

          </div>

          {/* Right-Side Stacked Frosted Glass Cards (Responsive position) */}
          <div className="w-full lg:w-auto flex justify-start sm:justify-center lg:justify-end shrink-0">
            <FloatingCards />
          </div>

        </div>

        {/* Bottom Bar: Left Pill + Center Solid Notch + Right Indicator */}
        <div className="relative z-30 flex items-end justify-between px-4 sm:px-10 pb-0 pointer-events-none w-full">
          
          {/* Bottom-Left Frosted Glass Workflow Pill */}
          <motion.a
            href="#how-it-works"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="hidden md:flex pointer-events-auto items-center gap-2.5 px-4 py-2 rounded-full bg-[#101820]/80 hover:bg-[#101820] backdrop-blur-2xl border border-[#1E2933] shadow-lg mb-4 sm:mb-6 transition-all duration-200 group cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-[#3B82F6] text-[#F1F5F9] flex items-center justify-center text-xs font-black shadow group-hover:translate-y-0.5 transition-transform">
              <ArrowDown size={11} strokeWidth={3} />
            </div>
            <span className="text-[11px] font-semibold text-[#F1F5F9] tracking-wide pr-1 font-mono uppercase">
              Explore Workflow
            </span>
          </motion.a>

          {/* Bottom-Center Structural Notch holding the primary CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="pointer-events-auto mx-auto absolute left-1/2 -translate-x-1/2 bottom-0 bg-[#06090D] px-5 sm:px-9 py-2.5 sm:py-3.5 rounded-t-[18px] sm:rounded-t-[28px] border-t border-x border-[#1E2933] shadow-[0_-12px_35px_rgba(6,9,13,0.95)] flex items-center justify-center"
          >
            <Link
              href="/create"
              className="group px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891B2] text-[#F1F5F9] text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 shadow-[0_0_25px_rgba(59,130,246,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] active:scale-95 whitespace-nowrap min-h-[42px] sm:min-h-[46px] flex items-center gap-2"
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
            className="hidden md:flex pointer-events-auto items-center gap-2 px-3.5 py-2 rounded-full bg-[#101820]/80 backdrop-blur-2xl border border-[#1E2933] mb-4 sm:mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
            <span className="text-[11px] font-mono text-[#94A3B8]">
              Instant Setup &lt; 60s
            </span>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
