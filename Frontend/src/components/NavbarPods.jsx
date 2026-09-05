"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NavbarPods() {
  return (
    <div className="absolute top-0 inset-x-0 z-30 flex items-start justify-between pointer-events-none w-full">
      
      {/* Top-Left Structural Black Pod */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-2.5 sm:gap-4 bg-[#000000] px-3.5 sm:px-6 py-2 sm:py-3 rounded-br-[18px] sm:rounded-br-[26px] border-r border-b border-white/[0.08] shadow-[0_12px_30px_rgba(0,0,0,0.95)] backdrop-blur-xl"
      >
        {/* Brand Typographic Lockup */}
        <Link href="/" className="flex items-center gap-2 select-none group leading-none">
          <div className="flex flex-col select-none group leading-tight">
            <span className="text-[11px] sm:text-[18px] md:text-[20px] font-black tracking-tight uppercase text-white font-sans transition-colors group-hover:text-white">
              CONVERSE
            </span>
            <span className="text-[11px] sm:text-[18px] md:text-[20px] font-black tracking-tight uppercase text-[#A78BFA] font-sans flex items-center gap-1">
              AI<span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Top-Right Structural Black Pod */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-[#000000] px-3.5 sm:px-6 py-2 sm:py-3 rounded-bl-[18px] sm:rounded-bl-[26px] border-l border-b border-white/[0.08] shadow-[0_12px_30px_rgba(0,0,0,0.95)] backdrop-blur-xl"
      >
        <Link
          href="/create"
          className="text-xs sm:text-[13px] font-medium text-white/70 hover:text-white px-2 py-1 transition-colors duration-200"
        >
          Log in
        </Link>

        <Link
          href="/create"
          className="relative inline-flex items-center justify-center px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white text-black hover:bg-[#F3F4F6] text-xs sm:text-[13px] font-bold tracking-tight transition-all duration-200 shadow-[0_2px_10px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 whitespace-nowrap"
        >
          Sign Up
        </Link>
      </motion.div>

    </div>
  );
}

