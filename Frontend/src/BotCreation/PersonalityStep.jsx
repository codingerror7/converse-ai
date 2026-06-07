"use client";

import React from 'react';
import { Briefcase, Heart, Crown, Award, Flame, BookOpen, Check } from 'lucide-react';
import Card from '../common/Card';
import { motion } from 'framer-motion';

export const PERSONALITY_OPTIONS = [
  {
    id: 'professional',
    title: 'Professional',
    tagline: 'Formal, concise, and structured.',
    preview: 'Good morning. I have analyzed your system log files. The primary database cluster is currently executing within standard telemetry bounds. Let me know if you would like me to compile the performance breakdown.',
    icon: Briefcase
  },
  {
    id: 'friendly',
    title: 'Friendly',
    tagline: 'Warm, conversational, and empathetic.',
    preview: "Hi there! I'd love to help you get this database cluster running smoothly again. I've taken a quick look at the logs and everything looks great! Just let me know what we should check next. 😊",
    icon: Heart
  },
  {
    id: 'luxury',
    title: 'Luxury',
    tagline: 'Refined, polished, and exclusive.',
    preview: 'Welcome back. I have compiled the performance metrics for your primary cluster. Every component has been refined to ensure the highest tier of operating efficiency. Your dashboard is ready for view.',
    icon: Crown
  },
  {
    id: 'expert',
    title: 'Expert',
    tagline: 'Technical, deep-dive, and analytical.',
    preview: 'Telemetry logs show standard performance bounds (CPU: 23%, Mem: 4.1GB/8GB). I recommend adjusting your database connection pools to maximize query throughput during peak IO workloads.',
    icon: Award
  },
  {
    id: 'energetic',
    title: 'Energetic',
    tagline: 'High-energy, proactive, and positive.',
    preview: "Hey! Let's get this show on the road! Your database cluster is looking absolutely stellar right now. CPU usage is super low—which means we're ready to scale. Tell me what you want to build next!",
    icon: Flame
  },
  {
    id: 'mentor',
    title: 'Mentor',
    tagline: 'Educational, patient, and guiding.',
    preview: 'Let us take a look at these metrics together. Notice how the memory consumption stays steady while CPU spikes? This indicates a high thread utilization rate. Let me guide you through optimizing your active processes.',
    icon: BookOpen
  }
];

export default function PersonalityStep({ selected, onSelect }) {
  const activePersonality = PERSONALITY_OPTIONS.find(p => p.id === selected) || PERSONALITY_OPTIONS[0];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-primary">
          Design your AI employee's personality
        </h2>
        <p className="text-sm text-secondary">
          Select the conversational tone and relational demeanor. This shapes response structures and formatting styles.
        </p>
      </div>

      {/* Grid options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PERSONALITY_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;

          return (
            <Card
              key={option.id}
              onClick={() => onSelect(option.id)}
              selected={isSelected}
              hoverable
              elevation={isSelected ? 'elevated' : 'subtle'}
              className="p-5 flex items-start gap-4 text-left relative overflow-hidden group"
            >
              <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border transition-colors duration-200 ${
                isSelected 
                  ? 'bg-accent/10 border-accent/30 text-accent shadow-sm' 
                  : 'bg-surface-elevated border-border text-secondary group-hover:text-primary group-hover:border-secondary/35'
              }`}>
                <Icon size={20} />
              </div>

              <div className="space-y-1 pr-6">
                <h3 className="text-sm font-bold text-primary tracking-tight">
                  {option.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {option.tagline}
                </p>
              </div>

              {/* Selection Check Circle */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20"
                >
                  <Check size={10} className="stroke-[3]" />
                </motion.div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Preview behavior segment */}
      <div className="space-y-3 pt-2">
        <p className="text-xs font-bold uppercase tracking-wider text-secondary/60">
          Live Tone Preview
        </p>
        <Card elevation="none" className="bg-surface-elevated/20 border-border/50 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center font-bold text-xs">
              AI
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary">{activePersonality.title} Employee</span>
                <span className="text-[9px] text-secondary">Draft Example</span>
              </div>
              <motion.p 
                key={activePersonality.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-primary leading-relaxed italic bg-background/30 p-3 rounded-xl border border-border/30"
              >
                "{activePersonality.preview}"
              </motion.p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
