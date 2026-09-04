"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export default function FloatingCards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 w-full max-w-[320px] sm:max-w-[580px] lg:max-w-[310px] pointer-events-auto select-none">
      
      {/* Top Card: Create Your AI */}
      <motion.div
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        className="flex-1 relative rounded-[20px] sm:rounded-[26px] bg-[#0c142c]/40 backdrop-blur-2xl border border-white/20 p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] text-left group overflow-hidden"
      >
        {/* Subtle top inner light highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight mb-1 font-sans">
          Create Your AI
        </h3>
        
        <p className="text-[10px] sm:text-xs text-white/70 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
          Define your chatbot's purpose, personality, and behavior to produce captivating conversations.
        </p>

        {/* Footer: Compact Pill Button + Avatar Community Badge */}
        <div className="flex items-center justify-between pt-0.5">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/[0.12] hover:bg-[#2563EB] border border-white/20 text-[10px] sm:text-[11px] font-semibold text-white transition-all shadow-sm active:scale-95"
          >
            <span>Customize</span>
          </Link>

          {/* Avatar Stack preview badge */}
          <div className="flex items-center -space-x-1.5">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600/90 border border-white/30 flex items-center justify-center text-[9px] sm:text-[10px] text-white font-bold">
              ✦
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-600/90 border border-white/30 flex items-center justify-center text-[9px] sm:text-[10px] text-white font-bold">
              AI
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-700 border border-white/30 flex items-center justify-center text-[8px] sm:text-[9px] text-white">
              +2k
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Card: Your AI is Ready */}
      <motion.div
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        className="flex-1 relative rounded-[20px] sm:rounded-[26px] bg-[#0c142c]/40 backdrop-blur-2xl border border-white/20 p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] text-left group overflow-hidden"
      >
        {/* Subtle top inner light highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight mb-1 font-sans">
          Your AI is Ready
        </h3>
        
        <p className="text-[10px] sm:text-xs text-white/70 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
          Have questions? Need assistance? Start chatting with your personalized assistant now.
        </p>

        {/* Footer: Compact Pill Button */}
        <div className="flex items-center justify-between pt-0.5">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/[0.12] hover:bg-[#2563EB] border border-white/20 text-[10px] sm:text-[11px] font-semibold text-white transition-all shadow-sm active:scale-95"
          >
            <span>Try it</span>
          </Link>

          <span className="text-[9px] sm:text-[10px] font-medium text-white/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>
      </motion.div>

    </div>
  );
}
