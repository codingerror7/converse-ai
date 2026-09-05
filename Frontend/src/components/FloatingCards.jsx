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
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="flex-1 relative rounded-[22px] sm:rounded-[26px] bg-[#070712]/75 backdrop-blur-2xl border border-white/[0.14] p-4 sm:p-5 shadow-[0_20px_45px_rgba(0,0,0,0.7)] text-left group overflow-hidden"
      >
        {/* Specular top hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight font-sans">
              Create Your AI
            </h3>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#A78BFA] bg-[#8B5CF6]/15 px-2 py-0.5 rounded-full border border-[#8B5CF6]/30">
            Model Engine
          </span>
        </div>
        
        <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mb-3">
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
                  ? 'bg-[#8B5CF6]/25 border border-[#8B5CF6]/60 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                  : 'bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Footer: Compact Pill Button + Avatar Badge */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.07]">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.12] hover:bg-[#2563EB] border border-white/20 hover:border-transparent text-[11px] font-semibold text-white transition-all duration-200 shadow-sm active:scale-95"
          >
            <span>Customize</span>
            <Sparkles size={11} className="text-[#A78BFA] group-hover:text-white" />
          </Link>

          {/* Avatar Stack preview badge */}
          <div className="flex items-center -space-x-1.5">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 border border-white/40 flex items-center justify-center text-[9px] sm:text-[10px] text-white font-bold shadow">
              ✦
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-violet-600 to-purple-500 border border-white/40 flex items-center justify-center text-[9px] sm:text-[10px] text-white font-bold shadow">
              AI
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#181824] border border-white/30 flex items-center justify-center text-[8px] sm:text-[9px] text-white/90 font-mono">
              +2k
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Card: Your AI is Ready */}
      <motion.div
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="flex-1 relative rounded-[22px] sm:rounded-[26px] bg-[#070712]/75 backdrop-blur-2xl border border-white/[0.14] p-4 sm:p-5 shadow-[0_20px_45px_rgba(0,0,0,0.7)] text-left group overflow-hidden"
      >
        {/* Specular top hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Bot size={13} className="text-[#8B5CF6]" />
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight font-sans">
              Your AI is Ready
            </h3>
          </div>

          <span className="text-[10px] font-medium text-white/70 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-mono text-[9px]">Live</span>
          </span>
        </div>
        
        {/* Mini simulated live stream box */}
        <div 
          onClick={handleTestPrompt}
          className="bg-black/60 border border-white/[0.08] hover:border-[#8B5CF6]/40 rounded-xl p-2.5 mb-3 transition-colors cursor-pointer group/box"
        >
          <div className="flex items-center justify-between text-[9px] text-white/50 mb-1">
            <span className="font-mono">SIMULATION</span>
            <span className="text-[#A78BFA] group-hover/box:underline flex items-center gap-0.5">
              <Zap size={9} /> Tap to test
            </span>
          </div>
          <p className="text-[11px] text-white/90 leading-snug font-mono line-clamp-2">
            {demoResponse}
          </p>
        </div>

        {/* Footer: Compact Pill Button */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.07]">
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.12] hover:bg-[#2563EB] border border-white/20 hover:border-transparent text-[11px] font-semibold text-white transition-all duration-200 shadow-sm active:scale-95"
          >
            <span>Try it</span>
          </Link>

          <span className="text-[10px] font-mono text-white/50">
            Latency &lt; 180ms
          </span>
        </div>
      </motion.div>

    </div>
  );
}

