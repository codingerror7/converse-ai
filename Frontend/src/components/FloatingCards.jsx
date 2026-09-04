"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FloatingCards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 w-full max-w-[270px] sm:max-w-[290px] lg:max-w-[310px] pointer-events-auto select-none">
      
      {/* Top Card: Create Your AI / Transform Your Content Today */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        className="relative rounded-[26px] bg-[#0c142c]/40 backdrop-blur-2xl border border-white/20 p-5 sm:p-5.5 shadow-[0_20px_45px_rgba(0,0,0,0.6)] text-left group overflow-hidden"
      >
        {/* Subtle top inner light highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <h3 className="text-sm sm:text-[15px] font-bold text-white tracking-tight mb-1.5 font-sans">
          Create Your AI
        </h3>
        
        <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mb-4">
          Define your chatbot's purpose, personality, and behavior to produce captivating conversations.
        </p>

        {/* Footer: Compact Pill Button + Avatar Community Badge */}
        <div className="flex items-center justify-between pt-0.5">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.12] hover:bg-[#2563EB] border border-white/20 text-[11px] font-semibold text-white transition-all shadow-sm active:scale-95"
          >
            <span>Customize</span>
          </Link>

          {/* Avatar Stack preview badge */}
          <div className="flex items-center -space-x-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-600/90 border border-white/30 flex items-center justify-center text-[10px] text-white font-bold">
              ✦
            </div>
            <div className="w-6 h-6 rounded-full bg-indigo-600/90 border border-white/30 flex items-center justify-center text-[10px] text-white font-bold">
              AI
            </div>
            <div className="w-6 h-6 rounded-full bg-slate-700 border border-white/30 flex items-center justify-center text-[9px] text-white">
              +2k
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Card: Your AI is Ready / Contact Us */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        className="relative rounded-[26px] bg-[#0c142c]/40 backdrop-blur-2xl border border-white/20 p-5 sm:p-5.5 shadow-[0_20px_45px_rgba(0,0,0,0.6)] text-left group overflow-hidden"
      >
        {/* Subtle top inner light highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <h3 className="text-sm sm:text-[15px] font-bold text-white tracking-tight mb-1.5 font-sans">
          Your AI is Ready
        </h3>
        
        <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mb-4">
          Have questions? Need assistance? Start chatting with your personalized assistant now.
        </p>

        {/* Footer: Compact Pill Button */}
        <div className="flex items-center justify-between pt-0.5">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.12] hover:bg-[#2563EB] border border-white/20 text-[11px] font-semibold text-white transition-all shadow-sm active:scale-95"
          >
            <span>Try it</span>
          </Link>

          <span className="text-[10px] font-medium text-white/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>
      </motion.div>

    </div>
  );
}
