"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
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
    <section className="relative w-full bg-[#020204] py-16 sm:py-28 lg:py-24 px-3 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Master Centered Panel Container with Dominant Thick Black Chassis Framing */}
      <div className="relative w-full max-w-[1280px] mx-auto rounded-[28px] sm:rounded-[44px] md:rounded-[52px] border-4 sm:border-8 md:border-[12px] border-[#000000] bg-[#05050A] overflow-hidden ring-1 ring-white/[0.09] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_90px_-20px_rgba(0,0,0,0.98)] px-5 sm:px-12 lg:px-16 py-12 sm:py-20 lg:py-24 flex flex-col items-center justify-center text-center">
        
        {/* Specular top hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Atmosphere: Multi-layer soft violet/indigo ambient backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[650px] h-[240px] sm:h-[380px] rounded-full bg-gradient-to-tr from-[#7C3AED]/15 via-[#6366F1]/10 to-transparent blur-[100px] pointer-events-none" />

        {/* Faint Abstract Conversational Signal Dots */}
        <div className="absolute top-7 sm:top-9 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-30 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse [animation-delay:0.2s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse [animation-delay:0.4s]" />
        </div>

        {/* Inner Content Stack */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center w-full">
          
          {/* Eyebrow */}
          <motion.div
            custom={0}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] mb-4 sm:mb-6 shadow-sm"
          >
            <Sparkles size={11} className="text-[#8B5CF6]" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A78BFA] font-mono">
              READY TO BUILD?
            </span>
          </motion.div>

          {/* Dominant Headline */}
          <motion.h2
            custom={0.1}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.4rem] font-black tracking-[-0.035em] text-[#FDFCFF] leading-[1.04] lg:leading-[0.98] font-sans drop-shadow-md mb-3 sm:mb-5"
          >
            Build an <span className="text-gradient-violet drop-shadow-[0_0_35px_rgba(167,139,250,0.35)]">AI</span> that talks <br className="hidden sm:inline" />
            like you.
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            custom={0.2}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-xs sm:text-base md:text-lg text-[#9CA3AF] max-w-[500px] leading-relaxed mb-6 sm:mb-8 font-normal px-2"
          >
            Join developers, creators, and modern teams building customized AI assistants in minutes.
          </motion.p>

          {/* Primary Compact Pill CTA */}
          <motion.div
            custom={0.3}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="w-full sm:w-auto flex justify-center mb-6 sm:mb-8"
          >
            <Link
              href="/create"
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white rounded-full bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#2563EB] hover:from-[#6D28D9] hover:via-[#4F46E5] hover:to-[#1D4ED8] transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_45px_rgba(124,58,237,0.8)] -translate-y-0 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto max-w-[320px] min-h-[46px] sm:min-h-[50px]"
            >
              <span>Build Your AI</span>
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Micro-Features Checklist */}
          <motion.div
            custom={0.35}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-white/50 font-mono"
          >
            <span className="flex items-center gap-1">
              <Zap size={11} className="text-[#8B5CF6]" />
              No credit card required
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={11} className="text-[#8B5CF6]" />
              Instant embed & webhook
            </span>
          </motion.div>

        </div>

      </div>

    </section>
  );
}

