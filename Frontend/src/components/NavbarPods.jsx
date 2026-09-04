"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';

export default function NavbarPods() {
  const [themeMode, setThemeMode] = useState('Dark');

  return (
    <div className="absolute top-0 inset-x-0 z-30 flex items-start justify-between pointer-events-none">
      
      {/* Top-Left Structural Black Pod */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-4 bg-black px-6 sm:px-7 py-3 sm:py-3.5 rounded-br-[28px] sm:rounded-br-[32px] border-r-2 border-b-2 border-black shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
      >
        {/* Brand Typographic Lockup matching reference */}
        <Link href="/" className="flex flex-col select-none group leading-tight">
          <span className="text-xs sm:text-[13px] font-black tracking-tight uppercase text-white font-sans">
            CONVERSE
          </span>
          <span className="text-xs sm:text-[13px] font-black tracking-tight uppercase text-white font-sans">
            STUDIO
          </span>
        </Link>

        {/* Dark Theme Pill Toggle matching reference */}
        <button
          onClick={() => setThemeMode(themeMode === 'Dark' ? 'Light' : 'Dark')}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0a0a0f] hover:bg-[#14141d] border border-white/[0.16] text-[11px] font-medium text-white/90 transition-all shadow-inner ml-1"
        >
          <span className="text-xs font-normal text-white/80">Dark</span>
          <div className="w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-[10px] shadow-sm">
            <Moon size={11} fill="currentColor" />
          </div>
        </button>
      </motion.div>

      {/* Top-Right Structural Black Pod */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="pointer-events-auto flex items-center gap-3 sm:gap-4 bg-black px-5 sm:px-7 py-3 sm:py-3.5 rounded-bl-[28px] sm:rounded-bl-[32px] border-l-2 border-b-2 border-black shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
      >
        <Link
          href="/create"
          className="text-xs font-medium text-white/90 hover:text-white px-2 py-1 transition-colors"
        >
          Log in
        </Link>

        <Link
          href="/create"
          className="px-5 sm:px-6 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold tracking-tight transition-all shadow-sm active:scale-95 whitespace-nowrap"
        >
          Sign Up
        </Link>
      </motion.div>

    </div>
  );
}
