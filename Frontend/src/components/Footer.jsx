"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#020205] border-t border-white/[0.08] py-10">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="select-none">
          <span className="text-sm font-bold tracking-tight text-[#F5F5F7]">
            converse<span className="text-[#8B5CF6]">.ai</span>
          </span>
        </Link>

        {/* Minimal Copyright */}
        <p className="text-xs text-[#71717A]">
          © 2026 Converse-AI. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
