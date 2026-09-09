import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Bot } from 'lucide-react';
import NavbarPods from '../src/components/NavbarPods';
import Footer from '../src/components/Footer';

export const metadata = {
  title: 'Page Not Found — Converse-AI',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#06090D] text-[#F1F5F9] flex flex-col selection:bg-[#3B82F6]/35 selection:text-[#F1F5F9] relative overflow-x-hidden">
      <NavbarPods />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] mb-5">
          <Bot size={24} />
        </div>
        <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#3B82F6] mb-2 font-semibold">
          404 Error
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F1F5F9] mb-3">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm mb-6 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-[#F1F5F9] text-xs font-bold shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] active:scale-95 transition-all"
        >
          <ArrowLeft size={14} />
          <span>Return Home</span>
        </Link>~
      </main>

      <Footer />
    </div>
  );
}
