"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const STEPS = [
  {
    number: "01",
    title: "Choose",
    description: "Select your chatbot's purpose and primary capabilities."
  },
  {
    number: "02",
    title: "Define",
    description: "Set its behavior, personality, tone, and response constraints."
  },
  {
    number: "03",
    title: "Converse",
    description: "Your customized AI is ready to chat and deploy everywhere."
  }
];

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#020205] py-24 sm:py-32 border-t border-white/[0.08]"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-xl text-left mb-16">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#8B5CF6] block mb-3">
            Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#F5F5F7] font-sans">
            From idea to AI in minutes.
          </h2>
        </div>

        {/* 3 Minimal Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.6,
                delay: prefersReducedMotion ? 0 : idx * 0.12,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="p-7 sm:p-8 rounded-[24px] bg-[#07070C] border border-white/[0.1] hover:border-[#8B5CF6]/40 transition-all duration-300 shadow-lg group text-left"
            >
              <div className="text-xs font-mono font-bold text-[#8B5CF6] tracking-wider mb-6">
                {step.number} — {step.title}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
