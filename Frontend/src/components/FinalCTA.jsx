"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-[#020205] py-28 sm:py-36 border-t border-white/[0.08] overflow-hidden">
      {/* Restrained Violet Ambient Center Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[300px] rounded-full bg-[#7C3AED]/12 blur-[90px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] text-white font-sans">
            Build your AI.
          </h2>

          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
            Create your personalized chatbot in minutes.
          </p>

          <div className="pt-3">
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-bold text-white rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.45)] hover:shadow-[0_0_45px_rgba(124,58,237,0.7)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Build Your AI</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
