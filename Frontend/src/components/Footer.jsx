"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#030303] border-t border-white/[0.06] pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 relative overflow-hidden select-none">
      
      {/* Subtle top hairline accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/25 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Top Row: Brand Lockup on Left + Action CTA on Right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 pb-8 sm:pb-12 border-b border-white/[0.06]">
          
          {/* Brand & Tagline */}
          <div className="space-y-1">
            <Link href="/" className="inline-block select-none group">
              <span className="text-lg sm:text-2xl font-bold tracking-tight text-white font-sans">
                converse<span className="text-[#8B5CF6]">.ai</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#A1A1AA] font-normal">
              Build AI that talks like you.
            </p>
          </div>

          {/* Primary Compact Footer CTA */}
          <Link
            href="/create"
            className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] text-xs sm:text-sm font-bold text-white transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_30px_rgba(124,58,237,0.55)] -translate-y-0 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto max-w-[280px] min-h-[42px] sm:min-h-[46px]"
          >
            <span>Build Your AI</span>
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

        </div>

        {/* Middle Row: Limited Essential Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 py-8 sm:py-12 max-w-2xl">
          
          {/* Column 1: Product */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] text-[#71717A] font-semibold">
              PRODUCT
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-[13px]">
              <li>
                <a href="#how-it-works" className="text-[#A1A1AA] hover:text-white transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <Link href="/create" className="text-[#A1A1AA] hover:text-white transition-colors">
                  AI Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] text-[#71717A] font-semibold">
              COMPANY
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-[13px]">
              <li>
                <a href="#about" onClick={(e) => e.preventDefault()} className="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer">
                  About
                </a>
              </li>
              <li>
                <a href="mailto:contact@converse.ai" className="text-[#A1A1AA] hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-2.5 sm:space-y-3 col-span-2 sm:col-span-1">
            <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em] text-[#71717A] font-semibold">
              RESOURCES
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-[13px]">
              <li>
                <a href="#docs" onClick={(e) => e.preventDefault()} className="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#71717A]">
          <p>© 2026 Converse-AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors cursor-pointer">
              Privacy
            </a>
            <span>·</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors cursor-pointer">
              Terms
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}
