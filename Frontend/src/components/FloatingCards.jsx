"use client";

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageSquare, Bot } from 'lucide-react';

export default function FloatingCards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-4 w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px] pointer-events-auto select-none">
      
      {/* Card 1: Create Your AI */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="relative rounded-[22px] bg-[#0A0A18]/40 backdrop-blur-2xl border border-white/[0.16] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] text-left group overflow-hidden"
      >
        {/* Subtle top inner light streak */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-1.5 font-sans">
          Create Your AI
        </h3>
        
        <p className="text-[11px] sm:text-xs text-[#A1A1AA] leading-relaxed mb-4">
          Define your chatbot's purpose, personality and behavior with intuitive natural language controls.
        </p>

        {/* Footer: Customize Button + Member Avatar Stack */}
        <div className="flex items-center justify-between pt-1">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.1] hover:bg-[#7C3AED] border border-white/[0.14] text-[11px] font-semibold text-white transition-all shadow-sm group-hover:border-[#8B5CF6]/50"
          >
            <span>Customize</span>
            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Mini avatar stack preview */}
          <div className="flex items-center -space-x-1.5">
            <div className="w-6 h-6 rounded-full bg-violet-600/80 border border-white/20 flex items-center justify-center text-[10px] text-white font-bold">
              ✦
            </div>
            <div className="w-6 h-6 rounded-full bg-indigo-600/80 border border-white/20 flex items-center justify-center text-[10px] text-white font-bold">
              AI
            </div>
            <div className="w-6 h-6 rounded-full bg-blue-600/80 border border-white/20 flex items-center justify-center text-[9px] text-white">
              +5k
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Your AI is Ready */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="relative rounded-[22px] bg-[#0A0A18]/40 backdrop-blur-2xl border border-white/[0.16] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] text-left group overflow-hidden"
      >
        {/* Subtle top inner light streak */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-1.5 font-sans">
          Your AI is Ready
        </h3>
        
        <p className="text-[11px] sm:text-xs text-[#A1A1AA] leading-relaxed mb-4">
          Start a conversation with your personalized assistant and test responses in real time.
        </p>

        {/* Footer: Try it Button */}
        <div className="flex items-center justify-between pt-1">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.1] hover:bg-[#7C3AED] border border-white/[0.14] text-[11px] font-semibold text-white transition-all shadow-sm group-hover:border-[#8B5CF6]/50"
          >
            <span>Try it</span>
            <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          <span className="text-[10px] font-mono text-[#71717A] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Instant Deploy
          </span>
        </div>
      </motion.div>

    </div>
  );
}
