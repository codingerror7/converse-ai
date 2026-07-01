"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import AIEntityVisualizer from '../../src/BotCreation/AIEntityVisualizer';
import ProgressTracker from '../../src/BotCreation/ProgressTracker';
import PurposeStep from '../../src/BotCreation/PurposeStep';
import BusinessContextStep from '../../src/BotCreation/BusinessContextStep';
import PersonalityStep from '../../src/BotCreation/PersonalityStep';
import ReviewStep from '../../src/BotCreation/ReviewStep';
import Card from '../../src/common/Card';
import Button from '../../src/common/Button';

export default function CreateBot() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Unified creation states
  const [purpose, setPurpose] = useState('customer_support');
  const [business, setBusiness] = useState({ name: '', industry: '', description: '' });
  const [personality, setPersonality] = useState('professional');
  const [botName, setBotName] = useState('Vance');

  // Handle back-navigation
  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // Handle next-navigation & final compilation trigger
  const handleContinue = () => {
    if (step < 4) {
      // Basic validations before proceeding
      if (step === 2 && (!business.name.trim() || !business.industry.trim() || !business.description.trim())) {
        alert("Please fill out all business context details before continuing.");
        return;
      }
      setStep((prev) => prev + 1);
    } else {
      // Step 4 Generate trigger
      if (!botName.trim()) {
        alert("Please enter a name for your AI employee.");
        return;
      }
      // Route to Cinematic Generating screen
      router.push('/generating');
    }
  };

  const currentStepData = {
    purpose,
    business,
    personality,
    botName
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pt-20">
      
      {/* LEFT PANEL - 60% Width visual panel */}
      <div className="w-full md:w-[60%] border-r border-border/40 bg-[#070708] flex flex-col justify-center items-center p-6 relative">
        <div className="absolute top-10 left-10 text-xs font-bold text-secondary flex items-center gap-2 uppercase tracking-widest z-10">
          <Sparkles size={12} className="text-accent" /> AI Core Evolution Node
        </div>

        {/* Evolving Living Entity */}
        <AIEntityVisualizer step={step} />

        {/* Stage counter overlay */}
        <div className="absolute bottom-6 left-10 text-[10px] font-mono text-secondary">
          Node Alignment: <span className="text-primary font-bold">{step * 25}%</span>
        </div>
      </div>                              

      {/* RIGHT PANEL - 40% Width Workspace */}
      <div className="w-full md:w-[40%] flex flex-col justify-center p-6 sm:p-10 md:p-12 z-10 bg-background">
        <div className="w-full max-w-[540px] mx-auto space-y-6">
          
          {/* Top Progress steps header */}
          <ProgressTracker currentStep={step} />

          {/* Form Content container card */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <PurposeStep selected={purpose} onSelect={setPurpose} />
                )}
                {step === 2 && (
                  <BusinessContextStep data={business} onChange={setBusiness} />
                )}
                {step === 3 && (
                  <PersonalityStep selected={personality} onSelect={setPersonality} />
                )}
                {step === 4 && (
                  <ReviewStep
                    data={currentStepData}
                    onNameChange={setBotName}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav Controls bottom bar */}
          <div className="flex items-center justify-between pt-6 border-t border-border/40">
            {step > 1 ? (
              <Button 
                variant="outline" 
                size="md" 
                onClick={handleBack}
                className="gap-1.5 pl-4"
              >
                <ChevronLeft size={16} /> Back
              </Button>
            ) : (
              <div />
            )}

            <Button
              variant={step === 4 ? 'accent' : 'primary'}
              size="md"
              onClick={handleContinue}
              className="gap-1.5 pr-4 ml-auto"
            >
              {step === 4 ? (
                <>Synthesize AI Employee</>
              ) : (
                <>
                  Continue <ChevronRight size={16} />
                </>
              )}
            </Button>
          </div>

        </div>
      </div>

    </div>
  );
}
