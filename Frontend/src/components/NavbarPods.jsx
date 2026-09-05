"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NavbarPods() {
  return (
    <div className="absolute top-0 inset-x-0 z-30 flex items-start justify-between pointer-events-none w-full">
      
      {/* Top-Left Structural Pod */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-2.5 sm:gap-4 bg-[#06090D] px-3.5 sm:px-6 py-2 sm:py-3 rounded-br-[18px] sm:rounded-br-[26px] border-r border-b border-[#1E2933] shadow-[0_12px_30px_rgba(6,9,13,0.95)] backdrop-blur-xl"
      >
        {/* Brand Typographic Lockup */}
        <Link href="/" className="flex items-center gap-2 select-none group leading-none">
          <div className="flex flex-col select-none group leading-tight">
            <span className="text-[11px] sm:text-[18px] md:text-[20px] font-black tracking-tight uppercase text-[#F1F5F9] font-sans transition-colors group-hover:text-[#F1F5F9]">
              CONVERSE
            </span>
            <span className="text-[11px] sm:text-[18px] md:text-[20px] font-black tracking-tight uppercase text-[#3B82F6] font-sans flex items-center gap-1">
              AI<span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Top-Right Structural Pod */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-[#06090D] px-3.5 sm:px-6 py-2 sm:py-3 rounded-bl-[18px] sm:rounded-bl-[26px] border-l border-b border-[#1E2933] shadow-[0_12px_30px_rgba(6,9,13,0.95)] backdrop-blur-xl"
      >
        <Link
          href="/create"
          className="text-xs sm:text-[13px] font-medium text-[#94A3B8] hover:text-[#F1F5F9] px-2 py-1 transition-colors duration-200"
        >
          Log in
        </Link>

        <Link
          href="/create"
          className="relative inline-flex items-center justify-center px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#3B82F6] text-[#F1F5F9] hover:bg-[#2563EB] text-xs sm:text-[13px] font-bold tracking-tight transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] active:scale-95 whitespace-nowrap"
        >
          Sign Up
        </Link>
      </motion.div>

    </div>
  );
}
