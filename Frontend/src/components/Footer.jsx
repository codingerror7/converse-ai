"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#06090D] border-t border-[#1E2933] pt-14 sm:pt-20 pb-10 sm:pb-12 relative overflow-hidden select-none">
      
      {/* Top hairline accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-[#1E2933]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 select-none group">
              <span className="text-xl sm:text-2xl font-black tracking-tight uppercase text-[#F1F5F9] font-sans">
                CONVERSE<span className="text-[#3B82F6]">.AI</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              The intelligent AI chatbot engine. Build, customize, and deploy hyper-personalized assistants in minutes.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
              <span className="text-[11px] font-mono text-[#06B6D4]">
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#94A3B8] font-semibold">
              PRODUCT
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <a href="#how-it-works" className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-150">
                  How it works
                </a>
              </li>
              <li>
                <Link href="/create" className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-150">
                  AI Builder
                </Link>
              </li>
              <li>
                <a href="#templates" onClick={(e) => e.preventDefault()} className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-150 cursor-pointer">
                  Templates
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#94A3B8] font-semibold">
              RESOURCES
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <a href="#docs" onClick={(e) => e.preventDefault()} className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-150 cursor-pointer">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#api" onClick={(e) => e.preventDefault()} className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-150 cursor-pointer">
                  API Reference
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-150">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#94A3B8] font-semibold">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <a href="#about" onClick={(e) => e.preventDefault()} className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-150 cursor-pointer">
                  About
                </a>
              </li>
              <li>
                <a href="mailto:contact@converse.ai" className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-150">
                  Contact
                </a>
              </li>
              <li>
                <a href="#changelog" onClick={(e) => e.preventDefault()} className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-150 cursor-pointer">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© 2026 Converse-AI Inc. Built for the modern web.</p>
          <div className="flex items-center gap-5">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#F1F5F9] transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#F1F5F9] transition-colors cursor-pointer">
              Terms of Service
            </a>
            <span>·</span>
            <a href="#security" onClick={(e) => e.preventDefault()} className="hover:text-[#F1F5F9] transition-colors cursor-pointer">
              Security
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}
