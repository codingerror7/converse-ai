"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  ChevronDown,
  Check,
  ShieldCheck,
  Lock,
  Sparkles,
  AlertCircle,
  Dumbbell,
  Utensils,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Home,
  Plane,
  Briefcase,
  Cpu,
  Layers,
  HelpCircle,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Categories Configuration with Icons & Context Helpers                      */
/* -------------------------------------------------------------------------- */
const CATEGORIES = [
  {
    id: 'fitness',
    name: 'Fitness & Wellness',
    icon: Dumbbell,
    desc: 'Gyms, personal trainers, yoga studios, health spas',
  },
  {
    id: 'restaurant',
    name: 'Restaurant & Food',
    icon: Utensils,
    desc: 'Dining, cafes, bars, bakeries, catering services',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Retail',
    icon: ShoppingBag,
    desc: 'Online stores, fashion brands, consumer goods',
  },
  {
    id: 'education',
    name: 'Education & Coaching',
    icon: GraduationCap,
    desc: 'Online courses, tutors, bootcamps, schools',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    icon: HeartPulse,
    desc: 'Clinics, dental, therapy, telehealth providers',
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Property',
    icon: Home,
    desc: 'Agencies, property management, rentals, brokers',
  },
  {
    id: 'travel',
    name: 'Travel & Hospitality',
    icon: Plane,
    desc: 'Hotels, resorts, tour operators, travel agencies',
  },
  {
    id: 'professional',
    name: 'Professional Services',
    icon: Briefcase,
    desc: 'Legal, accounting, marketing agencies, consultants',
  },
  {
    id: 'technology',
    name: 'Technology & SaaS',
    icon: Cpu,
    desc: 'Software apps, AI startups, developer tools, IT',
  },
  {
    id: 'other',
    name: 'Other',
    icon: Layers,
    desc: 'Custom business domain, creative agency, non-profit',
  },
];

const SUGGESTED_PROMPTS = [
  'Core services offered',
  'Target audience',
  'Common customer questions',
  'Pricing or turnaround',
];

export default function BusinessSetupPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  // Form State
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // UI / Interaction State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [touched, setTouched] = useState({
    businessName: false,
    category: false,
    description: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const dropdownRef = useRef(null);
  const textareaRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation for dropdown
  useEffect(() => {
    function handleKeyDown(e) {
      if (!isDropdownOpen) return;
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen]);

  // Load existing draft from sessionStorage if available
  useEffect(() => {
    try {
      const savedData = sessionStorage.getItem('converse_ai_business_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.businessName) setBusinessName(parsed.businessName);
        if (parsed.category) setCategory(parsed.category);
        if (parsed.description) setDescription(parsed.description);
      }
    } catch (e) {
      // Ignore storage errors in private browsing
    }
  }, []);

  // Validation Logic
  const errors = {
    businessName:
      !businessName.trim()
        ? 'Business name is required.'
        : businessName.trim().length < 2
        ? 'Business name must be at least 2 characters.'
        : null,
    category: !category ? 'Please select a business category.' : null,
    description:
      !description.trim()
        ? 'Please tell us a little about your business.'
        : description.trim().length < 20
        ? `Tell us a little more (${20 - description.trim().length} more chars needed).`
        : description.length > 1000
        ? 'Description must be 1000 characters or fewer.'
        : null,
  };

  const isFormValid = !errors.businessName && !errors.category && !errors.description;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFocusedField(null);
  };

  const handleSelectCategory = (catName) => {
    setCategory(catName);
    setIsDropdownOpen(false);
    setTouched((prev) => ({ ...prev, category: true }));
  };

  const handleAddPromptSuggestion = (promptText) => {
    if (description.includes(promptText)) return;
    const prefix = description.trim() ? (description.endsWith('.') ? '\n• ' : '.\n• ') : '• ';
    const updated = `${description}${prefix}${promptText}: `;
    if (updated.length <= 1000) {
      setDescription(updated);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      businessName: true,
      category: true,
      description: true,
    });

    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const businessPayload = {
      businessName: businessName.trim(),
      category,
      description: description.trim(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // Save to sessionStorage and localStorage for multi-step product flow
      sessionStorage.setItem('converse_ai_business_data', JSON.stringify(businessPayload));
      localStorage.setItem('converse_ai_business_data', JSON.stringify(businessPayload));

      // Simulate smooth step transition
      await new Promise((resolve) => setTimeout(resolve, 850));

      // Route to Chatbot creation / preview step
      router.push('/create');
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
    }
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.name === category);

  // Animations
  const fadeIn = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full bg-[#06090D] text-[#F1F5F9] flex flex-col justify-between selection:bg-[#3B82F6]/35 selection:text-[#F1F5F9] overflow-x-hidden">
      
      {/* ────────────────────────────────────────────────────────── */}
      {/* Background Ambient Lighting & Specular Atmosphere        */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-Center Primary Ambient Glow */}
        <div className="absolute -top-[180px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full bg-gradient-to-b from-[#3B82F6]/15 via-[#06B6D4]/10 to-transparent blur-[140px]" />
        
        {/* Center-Bottom Subtle Cyan Fill Glow */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-full bg-[#06B6D4]/6 blur-[130px]" />

        {/* Minimal Subtle Geometric Grid Layer */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(rgba(103, 232, 249, 0.6) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* Top Header / Minimal Product Setup Bar                    */}
      {/* ────────────────────────────────────────────────────────── */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-2 flex items-center justify-between">
        
        {/* Left: Brand Identity Lockup */}
        <Link
          href="/"
          data-cursor="interactive"
          className="group flex items-center gap-2.5 select-none leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-lg p-1 transition-transform"
        >
          <div className="flex flex-col leading-tight">
            <span className="text-[14px] sm:text-[16px] font-black tracking-tight uppercase text-[#F1F5F9] font-sans group-hover:text-white transition-colors">
              CONVERSE
            </span>
            <span className="text-[14px] sm:text-[16px] font-black tracking-tight uppercase text-[#3B82F6] font-sans flex items-center gap-1">
              AI
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
            </span>
          </div>
        </Link>

        {/* Center/Right: Step Indicator Badge & Exit Action */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1117] border border-[#1E2933] text-[10px] sm:text-[11px] font-mono shadow-sm">
            <span className="text-[#3B82F6] font-semibold">STEP 01</span>
            <span className="text-[#94A3B8]/40">/</span>
            <span className="text-[#94A3B8]">02</span>
          </div>

          <Link
            href="/"
            data-cursor="interactive"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#F1F5F9] px-2.5 py-1 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft size={13} />
            <span>Exit setup</span>
          </Link>
        </div>
      </header>

      {/* ────────────────────────────────────────────────────────── */}
      {/* Main Content Workspace                                    */}
      {/* ────────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-3.5 sm:px-6 py-6 sm:py-10 md:py-12 w-full">
        
        <div className="w-full max-w-[680px] mx-auto flex flex-col items-center">

          {/* ──────────────────────────────────────────────────────── */}
          {/* Subtle Stepper Flow Header                               */}
          {/* ──────────────────────────────────────────────────────── */}
          <motion.div
            custom={0.05}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 select-none"
          >
            {/* Step 01 Pill: Active */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101820] border border-[#3B82F6]/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-[#F1F5F9] text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                01
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#F1F5F9] tracking-tight">
                Business Details
              </span>
            </div>

            {/* Connecting Subtle Tracer */}
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-[#3B82F6]/60 via-[#1E2933] to-[#1E2933]" />

            {/* Step 02 Pill: Upcoming */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1117] border border-[#1E2933] opacity-60">
              <span className="w-4 h-4 rounded-full bg-[#1E2933] text-[#94A3B8] text-[9px] font-mono font-bold flex items-center justify-center">
                02
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-[#94A3B8] tracking-tight">
                Chatbot Persona
              </span>
            </div>
          </motion.div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* Heading & Contextual Subtitle                            */}
          {/* ──────────────────────────────────────────────────────── */}
          <motion.div
            custom={0.1}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center mb-6 sm:mb-8 max-w-[540px]"
          >
            <h1 className="text-2xl sm:text-4xl md:text-[2.65rem] font-black tracking-[-0.035em] text-[#F1F5F9] font-sans leading-[1.1] mb-2 sm:mb-3 drop-shadow-md">
              Tell us about your{' '}
              <span className="text-gradient-primary drop-shadow-[0_0_30px_rgba(103,232,249,0.3)]">
                business.
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#94A3B8] leading-relaxed font-normal">
              Give your assistant the context it needs to represent your business accurately.
            </p>
          </motion.div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* Form Chassis / Control Surface Container                 */}
          {/* ──────────────────────────────────────────────────────── */}
          <motion.div
            custom={0.16}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            data-cursor="card"
            className="w-full relative rounded-[24px] sm:rounded-[36px] border-4 sm:border-8 border-[#06090D] bg-[#0B1117] ring-1 ring-[#1E2933] shadow-[0_0_0_1px_rgba(30,41,51,0.6),0_25px_80px_-15px_rgba(6,9,13,0.98)] p-5 sm:p-8 md:p-10 transition-all duration-300"
          >
            {/* Specular Top Hairline Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/35 to-transparent pointer-events-none" />

            {/* Subtle Surface Radial Backlight */}
            <div className="absolute -top-12 right-10 w-44 h-44 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-5 sm:space-y-6">
              
              {/* ────────────────────────────────────────────────────── */}
              {/* Field 1: Business Name                                */}
              {/* ────────────────────────────────────────────────────── */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="businessName"
                    className="text-xs sm:text-[13px] font-semibold text-[#F1F5F9] tracking-tight flex items-center gap-1.5"
                  >
                    <span>Business name</span>
                    <span className="text-[#3B82F6] text-xs font-bold" aria-hidden="true">*</span>
                  </label>
                  {touched.businessName && !errors.businessName && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-[#06B6D4]">
                      <Check size={11} strokeWidth={3} /> Verified
                    </span>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Building2 size={16} className={focusedField === 'businessName' ? 'text-[#3B82F6]' : 'text-[#94A3B8]/60'} />
                  </div>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    autoComplete="organization"
                    value={businessName}
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                      if (touched.businessName) {
                        setTouched((prev) => ({ ...prev, businessName: true }));
                      }
                    }}
                    onFocus={() => setFocusedField('businessName')}
                    onBlur={() => handleBlur('businessName')}
                    placeholder="e.g. Apex Fitness Studio"
                    aria-invalid={touched.businessName && !!errors.businessName}
                    aria-describedby={touched.businessName && errors.businessName ? 'businessName-error' : undefined}
                    className={`w-full bg-[#06090D] text-[#F1F5F9] placeholder:text-[#94A3B8]/40 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 sm:py-3.5 border transition-all duration-200 outline-none ${
                      touched.businessName && errors.businessName
                        ? 'border-rose-500/70 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                        : focusedField === 'businessName'
                        ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                        : 'border-[#1E2933] hover:border-[#1E2933]/80 hover:bg-[#06090D]/90'
                    }`}
                  />
                </div>

                {/* Inline Validation Error */}
                <AnimatePresence>
                  {touched.businessName && errors.businessName && (
                    <motion.p
                      id="businessName-error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1.5 text-[11px] text-rose-400 pl-1 font-medium pt-0.5"
                    >
                      <AlertCircle size={12} className="shrink-0" />
                      <span>{errors.businessName}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* ────────────────────────────────────────────────────── */}
              {/* Field 2: Business Category (Custom Dropdown)          */}
              {/* ────────────────────────────────────────────────────── */}
              <div className="space-y-1.5 text-left" ref={dropdownRef}>
                <div className="flex items-center justify-between">
                  <label
                    id="category-label"
                    className="text-xs sm:text-[13px] font-semibold text-[#F1F5F9] tracking-tight flex items-center gap-1.5"
                  >
                    <span>Business category</span>
                    <span className="text-[#3B82F6] text-xs font-bold" aria-hidden="true">*</span>
                  </label>
                  {category && !errors.category && (
                    <span className="text-[10px] font-mono text-[#06B6D4]">Selected</span>
                  )}
                </div>

                <div className="relative">
                  {/* Trigger Button */}
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    aria-labelledby="category-label"
                    onClick={() => {
                      setIsDropdownOpen((prev) => !prev);
                      setFocusedField('category');
                    }}
                    onBlur={() => {
                      if (!isDropdownOpen) handleBlur('category');
                    }}
                    data-cursor="interactive"
                    className={`w-full flex items-center justify-between bg-[#06090D] text-xs sm:text-sm rounded-xl px-4 py-3 sm:py-3.5 border transition-all duration-200 outline-none text-left cursor-pointer ${
                      touched.category && errors.category
                        ? 'border-rose-500/70 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                        : isDropdownOpen
                        ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                        : 'border-[#1E2933] hover:border-[#1E2933]/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      {selectedCategoryObj ? (
                        <>
                          <div className="w-5 h-5 rounded-md bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] shrink-0">
                            <selectedCategoryObj.icon size={12} />
                          </div>
                          <span className="text-[#F1F5F9] font-medium truncate">
                            {selectedCategoryObj.name}
                          </span>
                        </>
                      ) : (
                        <span className="text-[#94A3B8]/40">Select your category</span>
                      )}
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-[#94A3B8] transition-transform duration-200 shrink-0 ${
                        isDropdownOpen ? 'rotate-180 text-[#3B82F6]' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Surface */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        role="listbox"
                        aria-labelledby="category-label"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-[#0B1117]/95 backdrop-blur-2xl border border-[#1E2933] shadow-[0_20px_50px_rgba(6,9,13,0.95)] max-h-[290px] overflow-y-auto p-1.5 space-y-1 divide-y divide-[#1E2933]/30"
                      >
                        {/* Specular highlight */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/40 to-transparent pointer-events-none" />

                        {CATEGORIES.map((cat) => {
                          const isSelected = category === cat.name;
                          const IconComp = cat.icon;
                          return (
                            <button
                              key={cat.id}
                              role="option"
                              aria-selected={isSelected}
                              type="button"
                              onClick={() => handleSelectCategory(cat.name)}
                              data-cursor="interactive"
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-150 cursor-pointer text-left ${
                                isSelected
                                  ? 'bg-gradient-to-r from-[#3B82F6]/25 to-[#06B6D4]/15 border border-[#3B82F6]/60 text-[#F1F5F9] font-semibold shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                                  : 'hover:bg-[#101820] hover:text-[#F1F5F9] text-[#94A3B8] border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? 'bg-[#3B82F6] text-[#F1F5F9]'
                                      : 'bg-[#101820] border border-[#1E2933] text-[#94A3B8]'
                                  }`}
                                >
                                  <IconComp size={13} />
                                </div>
                                <div className="flex flex-col">
                                  <span className={isSelected ? 'text-[#F1F5F9] font-semibold' : 'text-[#F1F5F9]/90'}>
                                    {cat.name}
                                  </span>
                                  <span className="text-[10px] text-[#94A3B8]/60 line-clamp-1 font-normal">
                                    {cat.desc}
                                  </span>
                                </div>
                              </div>

                              {isSelected && (
                                <div className="w-4 h-4 rounded-full bg-[#3B82F6] text-[#F1F5F9] flex items-center justify-center text-[10px] shrink-0 ml-2 shadow-sm">
                                  <Check size={10} strokeWidth={3} />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Inline Validation Error */}
                <AnimatePresence>
                  {touched.category && errors.category && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1.5 text-[11px] text-rose-400 pl-1 font-medium pt-0.5"
                    >
                      <AlertCircle size={12} className="shrink-0" />
                      <span>{errors.category}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* ────────────────────────────────────────────────────── */}
              {/* Field 3: Business Description (Controlled Textarea)   */}
              {/* ────────────────────────────────────────────────────── */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="description"
                    className="text-xs sm:text-[13px] font-semibold text-[#F1F5F9] tracking-tight flex items-center gap-1.5"
                  >
                    <span>Tell us about your business</span>
                    <span className="text-[#3B82F6] text-xs font-bold" aria-hidden="true">*</span>
                  </label>
                  
                  {/* Character Counter */}
                  <span
                    className={`text-[10px] font-mono transition-colors ${
                      description.length > 950
                        ? 'text-rose-400 font-bold'
                        : description.length >= 20
                        ? 'text-[#06B6D4]'
                        : 'text-[#94A3B8]/60'
                    }`}
                  >
                    {description.length} / 1000
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    ref={textareaRef}
                    rows={5}
                    maxLength={1000}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (touched.description) {
                        setTouched((prev) => ({ ...prev, description: true }));
                      }
                    }}
                    onFocus={() => setFocusedField('description')}
                    onBlur={() => handleBlur('description')}
                    placeholder="Describe what your business does, the services you offer, and what customers usually ask about."
                    aria-invalid={touched.description && !!errors.description}
                    aria-describedby={touched.description && errors.description ? 'description-error' : undefined}
                    className={`w-full bg-[#06090D] text-[#F1F5F9] placeholder:text-[#94A3B8]/40 text-xs sm:text-sm rounded-xl p-3.5 sm:p-4 border transition-all duration-200 outline-none resize-none leading-relaxed min-h-[140px] sm:min-h-[160px] ${
                      touched.description && errors.description
                        ? 'border-rose-500/70 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                        : focusedField === 'description'
                        ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                        : 'border-[#1E2933] hover:border-[#1E2933]/80 hover:bg-[#06090D]/90'
                    }`}
                  />
                </div>

                {/* Prompt Helpers / Guidance Chips */}
                <div className="pt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-[#94A3B8]/60 font-mono mr-1">Include:</span>
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleAddPromptSuggestion(prompt)}
                      data-cursor="interactive"
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#101820] hover:bg-[#3B82F6]/15 text-[#94A3B8] hover:text-[#67E8F9] border border-[#1E2933] hover:border-[#3B82F6]/40 transition-colors cursor-pointer"
                    >
                      + {prompt}
                    </button>
                  ))}
                </div>

                {/* Inline Validation Error */}
                <AnimatePresence>
                  {touched.description && errors.description && (
                    <motion.p
                      id="description-error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1.5 text-[11px] text-rose-400 pl-1 font-medium pt-0.5"
                    >
                      <AlertCircle size={12} className="shrink-0" />
                      <span>{errors.description}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* ────────────────────────────────────────────────────── */}
              {/* Primary Action Button (CTA)                            */}
              {/* ────────────────────────────────────────────────────── */}
              <div className="pt-3 sm:pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="cta"
                  data-cursor-magnetic="true"
                  className={`group relative w-full inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold text-[#F1F5F9] transition-all duration-300 min-h-[48px] sm:min-h-[52px] select-none ${
                    isSubmitting
                      ? 'bg-[#101820] border border-[#1E2933] text-[#94A3B8] cursor-wait'
                      : 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891B2] shadow-[0_0_25px_rgba(59,130,246,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] active:scale-[0.99] cursor-pointer'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 border-2 border-[#06B6D4] border-t-transparent rounded-full animate-spin" />
                      <span className="font-mono text-xs text-[#67E8F9] tracking-wide">
                        Preparing your assistant...
                      </span>
                    </div>
                  ) : (
                    <>
                      <span>Continue to Assistant Setup</span>
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Bottom Subtle Divider */}
            <div className="mt-6 pt-4 border-t border-[#1E2933]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-[#94A3B8]/60 select-none">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-[#3B82F6]" />
                <span>Isolated & encrypted AI workspace</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                <span>Context synced in real-time</span>
              </div>
            </div>

          </motion.div>

        </div>

      </main>

      {/* ────────────────────────────────────────────────────────── */}
      {/* Footer / Privacy & Reassurance                            */}
      {/* ────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 w-full py-4 text-center select-none">
        <p className="text-[11px] text-[#94A3B8]/40 font-mono flex items-center justify-center gap-1.5">
          <Lock size={10} />
          <span>Your business context is private and used solely to train your custom model.</span>
        </p>
      </footer>

    </div>
  );
}
