"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Moon, Sparkles } from 'lucide-react';

export default function NavbarPods() {
  const [themeMode, setThemeMode] = useState('Dark');

  return (
    <div className="absolute top-0 inset-x-0 z-30 flex items-start justify-between px-4 sm:px-8 pointer-events-none">
      
      {/* Top-Left Pod: Logo + Theme Controller */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-3.5 bg-[#050508]/95 backdrop-blur-md border-x border-b border-white/[0.14] rounded-b-[22px] px-5 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
      >
        {/* Typographic Logo */}
        <Link href="/" className="flex flex-col select-none group">
          <span className="text-xs sm:text-sm font-extrabold tracking-tight uppercase text-[#F5F5F7] font-sans leading-none">
            CONVERSE<span className="text-[#8B5CF6]">.AI</span>
          </span>
          <span className="text-[8px] font-mono tracking-widest text-[#71717A] uppercase mt-0.5">
            STUDIO
          </span>
        </Link>

        {/* Vertical subtle separator */}
        <div className="w-px h-5 bg-white/10 mx-0.5" />

        {/* Theme Capsule Toggle */}
        <button
          onClick={() => setThemeMode(themeMode === 'Dark' ? 'Light' : 'Dark')}
          className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-[11px] font-medium text-[#A1A1AA] hover:text-[#F5F5F7] transition-all"
        >
          <span>Dark</span>
          <div className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-[10px]">
            <Moon size={9} fill="currentColor" />
          </div>
        </button>
      </motion.div>

      {/* Top-Right Pod: Login + Sign Up */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="pointer-events-auto flex items-center gap-3 bg-[#050508]/95 backdrop-blur-md border-x border-b border-white/[0.14] rounded-b-[22px] px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
      >
        <Link
          href="/create"
          className="text-xs font-medium text-[#A1A1AA] hover:text-[#F5F5F7] px-2 py-1 transition-colors"
        >
          Log in
        </Link>

        <Link
          href="/create"
          className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white text-black hover:bg-[#E5E5E5] text-xs font-semibold tracking-tight transition-all shadow-[0_2px_12px_rgba(255,255,255,0.2)] active:scale-95"
        >
          Sign Up
        </Link>
      </motion.div>

    </div>
  );
}
