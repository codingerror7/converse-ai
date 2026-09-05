"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Cpu, Activity } from 'lucide-react';
import AIIntelligenceCoreScene from './cta-3d/AIIntelligenceCoreScene';

export default function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

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
    <section className="relative w-full bg-[#06090D] py-16 sm:py-24 lg:py-28 px-3 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Master Chassis Container with Signature Framing */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full max-w-[1380px] mx-auto rounded-[28px] sm:rounded-[44px] md:rounded-[52px] border-4 sm:border-8 md:border-[12px] border-[#06090D] bg-[#0B1117] overflow-hidden ring-1 ring-[#1E2933] shadow-[0_0_0_1px_rgba(30,41,51,0.6),0_30px_90px_-20px_rgba(6,9,13,0.98)] p-6 sm:p-10 md:p-12 lg:p-16 transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(30,41,51,0.9),0_35px_100px_-20px_rgba(59,130,246,0.18)]"
      >
        
        {/* Specular top hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/35 to-transparent pointer-events-none" />

        {/* Ambient Luminous Blue/Cyan Backlight Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] sm:w-[580px] h-[350px] sm:h-[580px] rounded-full bg-gradient-to-tr from-[#3B82F6]/20 via-[#06B6D4]/15 to-[#67E8F9]/10 blur-[130px] pointer-events-none transition-opacity duration-700 opacity-80 group-hover:opacity-100" />
        
        {/* Left Secondary Subtle Blue Fill Glow */}
        <div className="absolute bottom-0 left-10 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full bg-[#3B82F6]/10 blur-[110px] pointer-events-none" />

        {/* Subtle Decorative Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(103, 232, 249, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Faint Abstract Signal Status Notch */}
        <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-40 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse [animation-delay:0.2s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse [animation-delay:0.4s]" />
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* ────────────────────────────────────────────────────────── */}
          {/* Left Column: Eyebrow + Headline + Copy + CTA Buttons      */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left w-full">
            
            {/* Eyebrow Badge */}
            <motion.div
              custom={0}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101820] border border-[#1E2933] mb-4 sm:mb-6 shadow-sm backdrop-blur-md"
            >
              <Sparkles size={12} className="text-[#3B82F6] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-[#67E8F9] font-mono">
                CONVERSE AI // INTELLIGENCE CORE v2.4
              </span>
            </motion.div>

            {/* Dominant Headline */}
            <motion.h2
              custom={0.08}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.1rem] font-black tracking-[-0.035em] text-[#F1F5F9] leading-[1.04] lg:leading-[0.98] font-sans drop-shadow-md mb-4 sm:mb-6"
            >
              Ready to start the <br />
              <span className="text-gradient-primary drop-shadow-[0_0_35px_rgba(103,232,249,0.35)]">
                conversation?
              </span>
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              custom={0.16}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="text-xs sm:text-base md:text-[17px] text-[#94A3B8] max-w-[540px] leading-relaxed mb-6 sm:mb-8 font-normal"
            >
              Build, customize, and deploy an AI chatbot tailored precisely to your brand's voice, personality, and knowledge base—in minutes, without complexity.
            </motion.p>

            {/* Dual CTA Action Buttons */}
            <motion.div
              custom={0.24}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10"
            >
              {/* Primary Glowing Pill CTA */}
              <Link
                href="/create"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-[#F1F5F9] rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891B2] transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_45px_rgba(6,182,212,0.85)] -translate-y-0 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] min-h-[48px] sm:min-h-[52px]"
              >
                <span>Build Your AI</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Frosted Pill CTA */}
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-[#F1F5F9] hover:text-[#67E8F9] rounded-full bg-[#101820] hover:bg-[#101820]/80 border border-[#1E2933] hover:border-[#3B82F6]/50 backdrop-blur-xl transition-all duration-200 shadow-sm active:scale-[0.98] min-h-[48px] sm:min-h-[52px]"
              >
                <span>Explore Workflow</span>
              </a>
            </motion.div>

            {/* Trust & Performance Feature Badges */}
            <motion.div
              custom={0.32}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-wrap items-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-[#94A3B8] font-mono pt-2 border-t border-[#1E2933] w-full"
            >
              <span className="flex items-center gap-1.5">
                <Zap size={12} className="text-[#3B82F6]" />
                No credit card required
              </span>
              <span className="hidden sm:inline text-[#1E2933]">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-[#3B82F6]" />
                Instant embed & webhook
              </span>
              <span className="hidden md:inline text-[#1E2933]">•</span>
              <span className="hidden md:flex items-center gap-1.5 text-[#06B6D4]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                Latency &lt; 180ms
              </span>
            </motion.div>

          </div>

          {/* ────────────────────────────────────────────────────────── */}
          {/* Right Column: Interactive 3D AI Intelligence Core Scene   */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px]">
            
            {/* Ambient Radial Vignette behind 3D Object */}
            <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(59,130,246,0.12)_0%,rgba(6,182,212,0.05)_40%,transparent_80%)] pointer-events-none" />

            {/* Top-Right Floating Telemetry Chip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101820]/90 backdrop-blur-xl border border-[#1E2933] shadow-lg pointer-events-none"
            >
              <Cpu size={11} className="text-[#3B82F6]" />
              <span className="text-[10px] font-mono text-[#94A3B8] tracking-wider">
                CORE: <span className="text-[#06B6D4] font-semibold">100% SYNCD</span>
              </span>
            </motion.div>

            {/* Bottom-Left Floating Neural Stream Chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101820]/90 backdrop-blur-xl border border-[#1E2933] shadow-lg pointer-events-none"
            >
              <Activity size={11} className="text-[#06B6D4] animate-pulse" />
              <span className="text-[10px] font-mono text-[#94A3B8] tracking-wider">
                NEURAL STREAM: <span className="text-[#67E8F9]">ACTIVE</span>
              </span>
            </motion.div>

            {/* Interactive 3D Canvas Mount */}
            <div className="w-full h-full relative z-10">
              <AIIntelligenceCoreScene
                isHovered={isHovered}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
