"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Bot, Zap, Check } from 'lucide-react';

export default function FloatingCards() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedPersona, setSelectedPersona] = useState('Support');
  const [isSimulating, setIsSimulating] = useState(false);
  const [demoResponse, setDemoResponse] = useState('Assistant ready. Ask me anything.');

  const personas = [
    { id: 'Support', label: 'Support', desc: 'Helpful & 24/7' },
    { id: 'Copilot', label: 'Dev Copilot', desc: 'Code & APIs' },
    { id: 'Growth', label: 'Growth', desc: 'Lead generation' },
  ];

  const handleTestPrompt = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setDemoResponse('Analyzing inquiry...');
    setTimeout(() => {
      setDemoResponse('Resolution delivered in 1.2s. 99.4% satisfaction score.');
      setIsSimulating(false);
    }, 900);
  };

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 w-full max-w-[340px] sm:max-w-[620px] lg:max-w-[325px] pointer-events-auto select-none">
      
      {/* Top Card: Create Your AI */}
      <motion.div
        data-cursor="card"
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="flex-1 relative rounded-[22px] sm:rounded-[26px] bg-[#101820]/85 backdrop-blur-2xl border border-[#1E2933] p-4 sm:p-5 shadow-[0_20px_45px_rgba(6,9,13,0.8)] text-left group overflow-hidden"
      >
        {/* Specular top hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/30 to-transparent" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
            <h3 className="text-xs sm:text-sm font-bold text-[#F1F5F9] tracking-tight font-sans">
              Create Your AI
            </h3>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#67E8F9] bg-[#06B6D4]/15 px-2 py-0.5 rounded-full border border-[#06B6D4]/30">
            Model Engine
          </span>
        </div>
        
        <p className="text-[11px] sm:text-xs text-[#94A3B8] leading-relaxed mb-3">
          Define your chatbot's purpose, personality, and knowledge base in seconds.
        </p>

        {/* Interactive Persona Pills */}
        <div className="flex items-center gap-1.5 mb-3.5">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                selectedPersona === p.id
                  ? 'bg-[#3B82F6]/25 border border-[#3B82F6]/60 text-[#F1F5F9] shadow-[0_0_12px_rgba(59,130,246,0.35)]'
                  : 'bg-[#0B1117] border border-[#1E2933] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#101820]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Footer: Compact Pill Button + Avatar Badge */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1E2933]">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] border border-transparent text-[11px] font-semibold text-[#F1F5F9] transition-all duration-200 shadow-sm active:scale-95"
          >
            <span>Customize</span>
            <Sparkles size={11} className="text-[#67E8F9]" />
          </Link>

        
        </div>
      </motion.div>

      {/* Bottom Card: Your AI is Ready */}
      <motion.div
        data-cursor="card"
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="flex-1 relative rounded-[22px] sm:rounded-[26px] bg-[#101820]/85 backdrop-blur-2xl border border-[#1E2933] p-4 sm:p-5 shadow-[0_20px_45px_rgba(6,9,13,0.8)] text-left group overflow-hidden"
      >
        {/* Specular top hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/30 to-transparent" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Bot size={13} className="text-[#3B82F6]" />
            <h3 className="text-xs sm:text-sm font-bold text-[#F1F5F9] tracking-tight font-sans">
              Your AI is Ready
            </h3>
          </div>

          <span className="text-[10px] font-medium text-[#94A3B8] flex items-center gap-1.5 bg-[#06B6D4]/15 border border-[#06B6D4]/30 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
            <span className="text-[#06B6D4] font-mono text-[9px]">Live</span>
          </span>
        </div>
        
        {/* Mini simulated live stream box */}
        <div 
          onClick={handleTestPrompt}
          className="bg-[#0B1117] border border-[#1E2933] hover:border-[#3B82F6]/50 rounded-xl p-2.5 mb-3 transition-colors cursor-pointer group/box"
        >
          <div className="flex items-center justify-between text-[9px] text-[#94A3B8] mb-1">
            <span className="font-mono">SIMULATION</span>
            <span className="text-[#67E8F9] group-hover/box:underline flex items-center gap-0.5">
              <Zap size={9} /> Tap to test
            </span>
          </div>
          <p className="text-[11px] text-[#F1F5F9] leading-snug font-mono line-clamp-2">
            {demoResponse}
          </p>
        </div>

        {/* Footer: Compact Pill Button */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1E2933]">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] border border-transparent text-[11px] font-semibold text-[#F1F5F9] transition-all duration-200 shadow-sm active:scale-95"
          >
            <span>Try it</span>
          </Link>

          <span className="text-[10px] font-mono text-[#94A3B8]">
            Latency &lt; 180ms
          </span>
        </div>
      </motion.div>

    </div>
  );
}
