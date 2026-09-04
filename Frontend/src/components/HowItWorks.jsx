"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowUp, Sparkles, Bot } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Sub-Component: Step 01 Miniature Category Selector UI                      */
/* -------------------------------------------------------------------------- */
function MiniCategoryUI() {
  const categories = [
    { name: 'Education', active: false },
    { name: 'Fitness', active: false },
    { name: 'Business', active: false },
    { name: 'Customer Support', active: true },
  ];

  return (
    <div className="w-full rounded-[18px] bg-[#09090E] border border-white/[0.08] p-3 sm:p-3.5 shadow-inner select-none">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
        <span className="text-[10px] sm:text-[11px] font-medium text-white/70">What is your AI for?</span>
        <span className="text-[8px] sm:text-[9px] font-mono text-[#8B5CF6] uppercase tracking-wider">Select</span>
      </div>

      <div className="space-y-1.5">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`flex items-center justify-between px-2.5 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-[11px] transition-all ${
              cat.active
                ? 'bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-white font-semibold shadow-[0_0_12px_rgba(139,92,246,0.18)]'
                : 'bg-white/[0.02] border border-white/[0.04] text-white/60'
            }`}
          >
            <span>{cat.name}</span>
            {cat.active && (
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-[9px] sm:text-[10px]">
                <Check size={9} strokeWidth={3} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-Component: Step 02 Miniature Configuration UI                          */
/* -------------------------------------------------------------------------- */
function MiniConfigUI() {
  return (
    <div className="w-full rounded-[18px] bg-[#09090E] border border-white/[0.08] p-3 sm:p-3.5 shadow-inner select-none space-y-2">
      <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.06]">
        <span className="text-[10px] sm:text-[11px] font-medium text-white/70">Define your AI</span>
        <span className="text-[8px] sm:text-[9px] font-mono text-[#8B5CF6] uppercase tracking-wider">Tuning</span>
      </div>

      {/* Tone selection */}
      <div className="space-y-0.5">
        <span className="text-[9px] text-white/50 block font-mono uppercase">Tone</span>
        <div className="flex items-center gap-1.5">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[9px] sm:text-[10px] text-white font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            Friendly
          </div>
          <div className="px-2 py-0.5 sm:py-1 rounded-full bg-white/[0.02] border border-white/[0.04] text-[9px] sm:text-[10px] text-white/40">
            Concise
          </div>
        </div>
      </div>

      {/* Behavior summary */}
      <div className="space-y-0.5">
        <span className="text-[9px] text-white/50 block font-mono uppercase">Behavior</span>
        <div className="px-2 py-1 rounded-lg bg-black/40 border border-white/[0.06] text-[9px] sm:text-[10px] text-white/80 font-medium truncate">
          Helpful, empathetic & concise
        </div>
      </div>

      {/* Description snippet */}
      <div className="space-y-0.5">
        <span className="text-[9px] text-white/50 block font-mono uppercase">Description</span>
        <div className="p-1.5 sm:p-2 rounded-lg bg-black/40 border border-white/[0.06] text-[9px] sm:text-[10px] text-white/60 leading-tight">
          Helps users resolve questions effortlessly...
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-Component: Step 03 Miniature Chatbot UI                                */
/* -------------------------------------------------------------------------- */
function MiniChatUI() {
  return (
    <div className="w-full rounded-[18px] bg-[#09090E] border border-white/[0.12] p-3 sm:p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] select-none relative overflow-hidden">
      {/* Subtle top inner gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent" />

      {/* Header with bot status */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <Sparkles size={10} className="text-[#8B5CF6]" />
          <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-tight">Converse-AI</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] sm:text-[9px] font-mono text-emerald-400">Ready</span>
        </div>
      </div>

      {/* Message stream */}
      <div className="space-y-1.5 py-1 text-[9px] sm:text-[10px] min-h-[80px]">
        {/* Bot Message 1 */}
        <div className="flex items-start gap-1.5">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] shrink-0 mt-0.5">
            <Bot size={8} />
          </div>
          <div className="bg-white/[0.05] border border-white/[0.06] text-white/90 rounded-xl rounded-tl-xs px-2 sm:px-2.5 py-1 max-w-[85%]">
            Hey! How can I help?
          </div>
        </div>

        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-[#8B5CF6]/20 border border-[#8B5CF6]/35 text-white font-medium rounded-xl rounded-tr-xs px-2 sm:px-2.5 py-1 max-w-[85%]">
            Help me get started
          </div>
        </div>

        {/* Bot Message 2 */}
        <div className="flex items-start gap-1.5">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] shrink-0 mt-0.5">
            <Bot size={8} />
          </div>
          <div className="bg-white/[0.05] border border-white/[0.06] text-white/90 rounded-xl rounded-tl-xs px-2 sm:px-2.5 py-1 max-w-[85%]">
            Absolutely. Let's go.
          </div>
        </div>
      </div>

      {/* Miniature input */}
      <div className="mt-1.5 flex items-center gap-1 bg-black/60 border border-white/[0.1] rounded-xl px-2 py-1">
        <span className="text-[9px] sm:text-[10px] text-white/40 flex-1">Ask anything...</span>
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-md bg-[#8B5CF6] text-white flex items-center justify-center">
          <ArrowUp size={9} />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main HowItWorks Component                                                  */
/* -------------------------------------------------------------------------- */
export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      number: "01",
      title: "Choose",
      description: "Select what your AI is built for.",
      renderUI: () => <MiniCategoryUI />,
      isFinal: false,
    },
    {
      number: "02",
      title: "Define",
      description: "Give it a personality, purpose and behavior.",
      renderUI: () => <MiniConfigUI />,
      isFinal: false,
    },
    {
      number: "03",
      title: "Converse",
      description: "Your customized AI is ready to chat.",
      renderUI: () => <MiniChatUI />,
      isFinal: true,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#050505] py-20 sm:py-28 lg:py-16 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Subtle background atmosphere with low-opacity violet glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-3 sm:mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]">
              HOW IT WORKS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] text-[#F5F5F7] font-sans leading-[1.05]"
          >
            From idea to AI in minutes.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2.5 sm:mt-4 text-xs sm:text-base text-[#A1A1AA] leading-relaxed max-w-lg font-normal"
          >
            Create a personalized chatbot in three simple steps.
          </motion.p>
        </div>

        {/* Connected 3-Step Process System */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* Subtle Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-12 inset-x-[12%] h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/25 to-transparent pointer-events-none z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.65,
                delay: prefersReducedMotion ? 0 : idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative flex flex-col justify-between p-5 sm:p-7 rounded-[22px] sm:rounded-[26px] bg-[#07070C]/90 backdrop-blur-xl border transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group text-left z-10 overflow-hidden ${
                step.isFinal
                  ? 'border-white/[0.14] hover:border-[#8B5CF6]/50 shadow-[0_0_40px_rgba(139,92,246,0.08)]'
                  : 'border-white/[0.08] hover:border-[#8B5CF6]/35'
              }`}
            >
              {/* Optional subtle violet backlight on Final Step */}
              {step.isFinal && (
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#8B5CF6]/15 blur-2xl pointer-events-none" />
              )}

              {/* Top Header: Step Number & Title */}
              <div className="mb-4 sm:mb-5">
                <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                  <span className="text-3xl sm:text-5xl font-extrabold font-mono text-white/20 group-hover:text-[#8B5CF6]/60 transition-colors duration-300">
                    {step.number}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#8B5CF6]">
                    STEP {step.number}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1 font-sans">
                  {step.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Center / Bottom: Miniature Visual UI Component */}
              <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-white/[0.06] transform group-hover:scale-[1.01] transition-transform duration-300">
                {step.renderUI()}
              </div>

              {/* Bottom Subtle Indicator Streak */}
              <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/0 group-hover:via-[#8B5CF6]/40 to-transparent transition-all duration-300" />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
