"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    <section className="relative w-full bg-[#030303] py-16 sm:py-28 lg:py-36 px-3 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Master Centered Panel Container with Thick Black Framing & Responsive Scaling */}
      <div className="relative w-full max-w-[1240px] mx-auto rounded-[24px] sm:rounded-[36px] lg:rounded-[42px] border-4 sm:border-[8px] border-black bg-[#08080e] overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_25px_80px_rgba(0,0,0,0.85)] px-4 sm:px-12 lg:px-16 py-10 sm:py-18 lg:py-24 flex flex-col items-center justify-center text-center">
        
        {/* Atmosphere: Low-opacity radial violet ambient backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[220px] sm:h-[360px] rounded-full bg-[#7C3AED]/10 blur-[90px] pointer-events-none" />

        {/* Faint Abstract Conversational Signal */}
        <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-20 pointer-events-none">
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
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-3.5 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            <span className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B5CF6]">
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
            className="text-2xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.035em] text-white leading-[1.05] lg:leading-[0.98] font-sans drop-shadow-sm mb-3 sm:mb-5"
          >
            Build an <span className="text-[#A78BFA]">AI</span> that talks <br className="hidden sm:inline" />
            like you.
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            custom={0.2}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-xs sm:text-base md:text-lg text-[#A1A1AA] max-w-[480px] leading-relaxed mb-6 sm:mb-10 font-normal px-2"
          >
            Create your personalized AI chatbot in minutes.
          </motion.p>

          {/* Primary Compact Pill CTA */}
          <motion.div
            custom={0.3}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="w-full sm:w-auto flex justify-center"
          >
            <Link
              href="/create"
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold text-white rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] transition-all duration-300 shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] -translate-y-0 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto max-w-[320px] min-h-[44px] sm:min-h-[48px]"
            >
              <span>Build Your AI</span>
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
