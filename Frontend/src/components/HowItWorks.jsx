"use client";

import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Check, ArrowUp, Sparkles, Bot, CornerDownLeft, Sliders, Layers, MessageSquare, Copy } from 'lucide-react';

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
    <div className="w-full rounded-[20px] bg-[#07070F] border border-white/[0.1] p-3.5 sm:p-4 shadow-inner select-none">
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/[0.07]">
        <div className="flex items-center gap-1.5">
          <Layers size={12} className="text-[#8B5CF6]" />
          <span className="text-[11px] sm:text-xs font-semibold text-white/80">Select Bot Archetype</span>
        </div>
        <span className="text-[9px] font-mono text-[#A78BFA] uppercase tracking-wider bg-[#8B5CF6]/15 px-2 py-0.5 rounded-full border border-[#8B5CF6]/30">
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
                  ? 'bg-gradient-to-r from-[#8B5CF6]/20 to-[#6366F1]/15 border border-[#8B5CF6]/50 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.25)] translate-x-0.5'
                  : 'bg-white/[0.03] border border-white/[0.05] text-white/60 hover:text-white hover:bg-white/[0.07]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">{cat.icon}</span>
                <span>{cat.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-white/40">{cat.count}</span>
                {isActive && (
                  <div className="w-4 h-4 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-[10px] shadow-sm">
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
  const [creativity, setCreativity] = useState('Balanced');

  const tonePresets = {
    Empathetic: 'Friendly, patient, and warm. Answers with clarity and step-by-step guidance.',
    Analytical: 'Direct, objective, and data-driven. Cites facts and concise bullet points.',
    Creative: 'Engaging, expressive, and conversational. Infuses personality and enthusiasm.',
  };

  return (
    <div className="w-full rounded-[20px] bg-[#07070F] border border-white/[0.1] p-3.5 sm:p-4 shadow-inner select-none space-y-2.5">
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.07]">
        <div className="flex items-center gap-1.5">
          <Sliders size={12} className="text-[#8B5CF6]" />
          <span className="text-[11px] sm:text-xs font-semibold text-white/80">Personality & Tone</span>
        </div>
        <span className="text-[9px] font-mono text-[#A78BFA] uppercase tracking-wider bg-[#8B5CF6]/15 px-2 py-0.5 rounded-full border border-[#8B5CF6]/30">
          Auto-Tuning
        </span>
      </div>

      {/* Tone selection buttons */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/50 font-mono uppercase">Vibe</span>
          <span className="text-[9px] font-mono text-[#A78BFA]">Active: {tone}</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {['Empathetic', 'Analytical', 'Creative'].map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`py-1 px-1.5 rounded-lg text-[10px] font-medium transition-all text-center cursor-pointer ${
                tone === t
                  ? 'bg-[#8B5CF6]/25 border border-[#8B5CF6]/60 text-white shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                  : 'bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white'
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
          <span className="text-[9px] text-white/50 font-mono uppercase">Generated System Directive</span>
          <span className="text-[8px] font-mono text-emerald-400">● 100% Synced</span>
        </div>
        <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.08] text-[10px] text-white/80 leading-relaxed font-mono min-h-[52px]">
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
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full rounded-[20px] bg-[#07070F] border border-white/[0.14] p-3.5 sm:p-4 shadow-[0_15px_40px_rgba(0,0,0,0.65)] select-none relative overflow-hidden">
      {/* Specular top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/60 to-transparent" />

      {/* Header with bot status */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5">
          <Sparkles size={11} className="text-[#8B5CF6]" />
          <span className="text-[11px] sm:text-xs font-bold text-white tracking-tight">Converse-AI Engine</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-mono text-emerald-300">Live Agent</span>
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
              <div className="w-4 h-4 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6] shrink-0 mt-0.5">
                <Bot size={9} />
              </div>
            )}
            <div
              className={`rounded-xl px-2.5 py-1.5 max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white font-medium rounded-tr-xs'
                  : 'bg-white/[0.06] border border-white/[0.08] text-white/95 rounded-tl-xs'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-1.5 text-white/50 text-[9px] pl-6 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce [animation-delay:0.4s]" />
            <span className="text-[#A78BFA] ml-1">Streaming tokens...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="flex items-center gap-1 pt-1.5 overflow-x-auto pb-1 no-scrollbar">
        {samplePrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="text-[9px] px-2 py-0.5 rounded-full bg-white/[0.04] hover:bg-[#8B5CF6]/20 border border-white/[0.08] hover:border-[#8B5CF6]/40 text-white/70 hover:text-white transition-all whitespace-nowrap cursor-pointer shrink-0"
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
        className="mt-1.5 flex items-center gap-1 bg-black/70 border border-white/[0.12] rounded-xl px-2.5 py-1"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything..."
          className="bg-transparent border-none text-[10px] text-white focus:outline-none flex-1 placeholder:text-white/30"
        />
        <button
          type="submit"
          className="w-4 h-4 rounded-md bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex items-center justify-center transition-all cursor-pointer"
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
      className="relative w-full bg-[#020205] py-20 sm:py-28 lg:py-24 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#7C3AED]/8 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] mb-3.5 sm:mb-4 shadow-sm"
          >
            <Sparkles size={11} className="text-[#8B5CF6]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A78BFA] font-mono">
              HOW IT WORKS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.035em] text-[#FDFCFF] font-sans leading-[1.05]"
          >
            From idea to AI in <br className="hidden sm:inline" />
            <span className="text-gradient-violet">minutes.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 sm:mt-4 text-xs sm:text-base text-[#9CA3AF] leading-relaxed max-w-lg font-normal"
          >
            Create, tune, and test an intelligent chatbot tailored precisely to your workflow in three seamless steps.
          </motion.p>
        </div>

        {/* Connected 3-Step Process System */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* Subtle Desktop Connecting Glowing Line */}
          <div className="hidden lg:block absolute top-14 inset-x-[12%] h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/35 to-transparent pointer-events-none z-0" />

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
              className={`relative flex flex-col justify-between p-5 sm:p-7 rounded-[24px] sm:rounded-[28px] bg-[#07070D]/90 backdrop-blur-xl border transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group text-left z-10 overflow-hidden ${
                step.isFinal
                  ? 'border-white/[0.18] hover:border-[#8B5CF6]/60 shadow-[0_0_45px_rgba(139,92,246,0.12)]'
                  : 'border-white/[0.1] hover:border-[#8B5CF6]/45'
              }`}
            >
              {/* Specular top hairline */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Step Backlight Glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#8B5CF6]/10 blur-2xl pointer-events-none group-hover:bg-[#8B5CF6]/20 transition-colors" />

              {/* Top Header: Step Number & Title */}
              <div className="mb-4 sm:mb-5">
                <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                  <span className="text-3xl sm:text-5xl font-black font-mono text-white/20 group-hover:text-[#8B5CF6]/70 transition-colors duration-300">
                    {step.number}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#A78BFA] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2.5 py-0.5 rounded-full">
                    {step.tag}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white mb-1.5 font-sans">
                  {step.title}
                </h3>
                
                <p className="text-xs sm:text-[13px] text-[#9CA3AF] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Center / Bottom: Miniature Visual UI Component */}
              <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-white/[0.07] transform group-hover:scale-[1.01] transition-transform duration-300">
                {step.renderUI()}
              </div>

              {/* Bottom Subtle Indicator Streak */}
              <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/0 group-hover:via-[#8B5CF6]/50 to-transparent transition-all duration-300" />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

