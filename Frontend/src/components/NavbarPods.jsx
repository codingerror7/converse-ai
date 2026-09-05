"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';

export default function NavbarPods() {
  const [themeMode, setThemeMode] = useState('Dark');

  return (
    <div className="absolute top-0 inset-x-0 z-30 flex items-start justify-between pointer-events-none w-full">
      
      {/* Top-Left Structural Black Pod */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-2 sm:gap-4 bg-black px-3.5 sm:px-7 py-2 sm:py-3.5 rounded-br-[20px] sm:rounded-br-[32px] border-r border-b sm:border-r-2 sm:border-b-2 border-black shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
      >
        {/* Brand Typographic Lockup */}
        <Link href="/" className="flex flex-col select-none group leading-tight">
          <span className="text-[11px] sm:text-[22px] font-black tracking-tight uppercase text-white font-sans">
            CONVERSE
          </span>
          <span className="text-[11px] sm:text-[22px] font-black tracking-tight uppercase text-white font-sans">
            AI.
          </span>
        </Link>

      </motion.div>

      {/* Top-Right Structural Black Pod */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="pointer-events-auto flex items-center gap-2 sm:gap-4 bg-black px-3.5 sm:px-7 py-2 sm:py-3.5 rounded-bl-[20px] sm:rounded-bl-[32px] border-l border-b sm:border-l-2 sm:border-b-2 border-black shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
      >
        <Link
          href="/create"
          className="text-[15px] sm:text-xs font-medium text-white/90 hover:text-white px-1 sm:px-2 py-1 transition-colors"
        >
          Log in
        </Link>

        <Link
          href="/create"
          className="px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-[15px] sm:text-xs font-bold tracking-tight transition-all shadow-sm active:scale-95 whitespace-nowrap"
        >
          Sign Up
        </Link>
      </motion.div>

    </div>
  );
}
