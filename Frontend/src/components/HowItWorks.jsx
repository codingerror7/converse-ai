"use client";

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowUp, Sparkles, Bot, Sliders, Layers } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Sub-Component: Step 01 Miniature Category Selector UI (Interactive)       */
/* -------------------------------------------------------------------------- */
function MiniCategoryUI() {
  const [selected, setSelected] = useState('Customer Support');

  const categories = [
    { name: 'Customer Support', count: '14 templates', icon: '🎧' },
    { name: 'Developer Copilot', count: '8 templates', icon: '⚡' },
    { name: 'Sales & Growth', count: '12 templates', icon: '📈' },
    { name: 'Internal Knowledge', count: '9 templates', icon: '📚' },
  ];

  return (
    <div className="w-full rounded-[20px] bg-[#0B1117] border border-[#1E2933] p-3.5 sm:p-4 shadow-inner select-none">
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#1E2933]">
        <div className="flex items-center gap-1.5">
          <Layers size={12} className="text-[#3B82F6]" />
          <span className="text-[11px] sm:text-xs font-semibold text-[#F1F5F9]">Select Bot Archetype</span>
        </div>
        <span className="text-[9px] font-mono text-[#67E8F9] uppercase tracking-wider bg-[#06B6D4]/15 px-2 py-0.5 rounded-full border border-[#06B6D4]/30">
          Step 1 of 3
        </span>
      </div>

      <div className="space-y-1.5">
        {categories.map((cat) => {
          const isActive = selected === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setSelected(cat.name)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#3B82F6]/20 to-[#06B6D4]/15 border border-[#3B82F6]/60 text-[#F1F5F9] font-semibold shadow-[0_0_15px_rgba(59,130,246,0.25)] translate-x-0.5'
                  : 'bg-[#101820] border border-[#1E2933] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#101820]/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">{cat.icon}</span>
                <span>{cat.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-[#94A3B8]/60">{cat.count}</span>
                {isActive && (
                  <div className="w-4 h-4 rounded-full bg-[#3B82F6] text-[#F1F5F9] flex items-center justify-center text-[10px] shadow-sm">
                    <Check size={10} strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-Component: Step 02 Miniature Configuration UI (Interactive)           */
/* -------------------------------------------------------------------------- */
function MiniConfigUI() {
  const [tone, setTone] = useState('Empathetic');

  const tonePresets = {
    Empathetic: 'Friendly, patient, and warm. Answers with clarity and step-by-step guidance.',
    Analytical: 'Direct, objective, and data-driven. Cites facts and concise bullet points.',
    Creative: 'Engaging, expressive, and conversational. Infuses personality and enthusiasm.',
  };

  return (
    <div className="w-full rounded-[20px] bg-[#0B1117] border border-[#1E2933] p-3.5 sm:p-4 shadow-inner select-none space-y-2.5">
      <div className="flex items-center justify-between pb-2 border-b border-[#1E2933]">
        <div className="flex items-center gap-1.5">
          <Sliders size={12} className="text-[#3B82F6]" />
          <span className="text-[11px] sm:text-xs font-semibold text-[#F1F5F9]">Personality & Tone</span>
        </div>
        <span className="text-[9px] font-mono text-[#67E8F9] uppercase tracking-wider bg-[#06B6D4]/15 px-2 py-0.5 rounded-full border border-[#06B6D4]/30">
          Auto-Tuning
        </span>
      </div>

      {/* Tone selection buttons */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-[#94A3B8] font-mono uppercase">Vibe</span>
          <span className="text-[9px] font-mono text-[#67E8F9]">Active: {tone}</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {['Empathetic', 'Analytical', 'Creative'].map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`py-1 px-1.5 rounded-lg text-[10px] font-medium transition-all text-center cursor-pointer ${
                tone === t
                  ? 'bg-[#3B82F6]/25 border border-[#3B82F6]/60 text-[#F1F5F9] shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                  : 'bg-[#101820] border border-[#1E2933] text-[#94A3B8] hover:text-[#F1F5F9]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* System prompt dynamic preview */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-[#94A3B8] font-mono uppercase">Generated System Directive</span>
          <span className="text-[8px] font-mono text-[#06B6D4]">● 100% Synced</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#06090D] border border-[#1E2933] text-[10px] text-[#F1F5F9] leading-relaxed font-mono min-h-[52px]">
          "{tonePresets[tone]}"
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-Component: Step 03 Miniature Chatbot UI (Live Interactive Simulation)   */
/* -------------------------------------------------------------------------- */
function MiniChatUI() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey! Your custom assistant is live. Try testing a prompt below.' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'How do I deploy on my site?',
    'Explain refund policy',
    'Summarize API limits',
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = '';
      if (text.toLowerCase().includes('deploy')) {
        botReply = 'Simply paste a 1-line script tag or connect your custom webhook domain in seconds.';
      } else if (text.toLowerCase().includes('refund')) {
        botReply = 'Instant 30-day money back guarantee with 1-click self-service cancellation.';
      } else {
        botReply = 'Processed instantly with contextual memory and sub-180ms response stream.';
      }
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="w-full rounded-[20px] bg-[#0B1117] border border-[#1E2933] p-3.5 sm:p-4 shadow-[0_15px_40px_rgba(6,9,13,0.7)] select-none relative overflow-hidden">
      {/* Specular top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent" />

      {/* Header with bot status */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1E2933]">
        <div className="flex items-center gap-1.5">
          <Sparkles size={11} className="text-[#3B82F6]" />
          <span className="text-[11px] sm:text-xs font-bold text-[#F1F5F9] tracking-tight">Converse-AI Engine</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#06B6D4]/15 border border-[#06B6D4]/30 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
          <span className="text-[9px] font-mono text-[#06B6D4]">Live Agent</span>
        </div>
      </div>

      {/* Message stream */}
      <div className="space-y-2 py-1 text-[10px] min-h-[92px] max-h-[115px] overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start gap-1.5 ${
              m.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.sender === 'bot' && (
              <div className="w-4 h-4 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
                <Bot size={9} />
              </div>
            )}
            <div
              className={`rounded-xl px-2.5 py-1.5 max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-[#F1F5F9] font-medium rounded-tr-xs'
                  : 'bg-[#101820] border border-[#1E2933] text-[#F1F5F9] rounded-tl-xs'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-1.5 text-[#94A3B8] text-[9px] pl-6 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce [animation-delay:0.4s]" />
            <span className="text-[#67E8F9] ml-1">Streaming tokens...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="flex items-center gap-1 pt-1.5 overflow-x-auto pb-1 no-scrollbar">
        {samplePrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="text-[9px] px-2 py-0.5 rounded-full bg-[#101820] hover:bg-[#3B82F6]/20 border border-[#1E2933] hover:border-[#3B82F6]/40 text-[#94A3B8] hover:text-[#F1F5F9] transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Miniature input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-1.5 flex items-center gap-1 bg-[#06090D] border border-[#1E2933] rounded-xl px-2.5 py-1"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything..."
          className="bg-transparent border-none text-[10px] text-[#F1F5F9] focus:outline-none flex-1 placeholder:text-[#94A3B8]/40"
        />
        <button
          type="submit"
          className="w-4 h-4 rounded-md bg-[#3B82F6] hover:bg-[#2563EB] text-[#F1F5F9] flex items-center justify-center transition-all cursor-pointer"
        >
          <ArrowUp size={10} />
        </button>
      </form>
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
      tag: "SEED",
      title: "Choose Purpose",
      description: "Select what your AI is built for with pre-trained archetypes.",
      renderUI: () => <MiniCategoryUI />,
      isFinal: false,
    },
    {
      number: "02",
      tag: "TUNE",
      title: "Define Persona",
      description: "Customize tone, directives, behavior, and knowledge sources.",
      renderUI: () => <MiniConfigUI />,
      isFinal: false,
    },
    {
      number: "03",
      tag: "DEPLOY",
      title: "Test & Converse",
      description: "Your personalized AI is live, responsive, and ready to deploy.",
      renderUI: () => <MiniChatUI />,
      isFinal: true,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#0B1117] py-20 sm:py-28 lg:py-24 border-t border-[#1E2933] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#3B82F6]/8 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">


          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.035em] text-[#F1F5F9] font-sans leading-[1.05]"
          >
            From idea to AI in <br className="hidden sm:inline" />
            <span className="text-gradient-primary">minutes.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 sm:mt-4 text-xs sm:text-base text-[#94A3B8] leading-relaxed max-w-lg font-normal"
          >
            Create, tune, and test an intelligent chatbot tailored precisely to your workflow in three seamless steps.
          </motion.p>
        </div>

        {/* Connected 3-Step Process System */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* Subtle Desktop Connecting Glowing Line */}
          <div className="hidden lg:block absolute top-14 inset-x-[12%] h-px bg-gradient-to-r from-transparent via-[#3B82F6]/35 to-transparent pointer-events-none z-0" />

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
              className={`relative flex flex-col justify-between p-5 sm:p-7 rounded-[24px] sm:rounded-[28px] bg-[#101820] backdrop-blur-xl border transition-all duration-300 shadow-[0_20px_50px_rgba(6,9,13,0.8)] group text-left z-10 overflow-hidden ${
                step.isFinal
                  ? 'border-[#1E2933] hover:border-[#3B82F6]/60 shadow-[0_0_45px_rgba(59,130,246,0.12)]'
                  : 'border-[#1E2933] hover:border-[#3B82F6]/45'
              }`}
            >
              {/* Specular top hairline */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/30 to-transparent" />

              {/* Step Backlight Glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#3B82F6]/10 blur-2xl pointer-events-none group-hover:bg-[#06B6D4]/20 transition-colors" />

              {/* Top Header: Step Number & Title */}
              <div className="mb-4 sm:mb-5">
                <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                  <span className="text-3xl sm:text-5xl font-black font-mono text-[#94A3B8]/30 group-hover:text-[#3B82F6]/80 transition-colors duration-300">
                    {step.number}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#67E8F9] bg-[#06B6D4]/15 border border-[#06B6D4]/30 px-2.5 py-0.5 rounded-full">
                    {step.tag}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#F1F5F9] mb-1.5 font-sans">
                  {step.title}
                </h3>
                
                <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Center / Bottom: Miniature Visual UI Component */}
              <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-[#1E2933] transform group-hover:scale-[1.01] transition-transform duration-300">
                {step.renderUI()}
              </div>

              {/* Bottom Subtle Indicator Streak */}
              <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/0 group-hover:via-[#3B82F6]/50 to-transparent transition-all duration-300" />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
