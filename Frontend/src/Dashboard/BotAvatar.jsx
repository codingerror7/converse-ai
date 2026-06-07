"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function BotAvatar({ status = 'active', size = 'md' }) {
  const isOk = status === 'active';

  const sizes = {
    sm: "w-10 h-10 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-24 h-24 text-lg"
  };

  const ringSizes = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28"
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulsing status ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.4, 0.15]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className={`absolute rounded-full border ${
          isOk ? 'border-success bg-success/5' : 'border-warning bg-warning/5'
        } ${ringSizes[size]}`}
      />

      {/* Main Avatar Element */}
      <div className={`relative z-10 rounded-2xl flex items-center justify-center border shadow-xl ${
        isOk 
          ? 'bg-accent/10 border-accent/25 text-accent shadow-accent/5' 
          : 'bg-surface-elevated border-border text-secondary'
      } ${sizes[size]}`}>
        <Cpu size={size === 'lg' ? 32 : size === 'md' ? 24 : 16} className={isOk ? 'animate-pulse' : ''} />
        
        {/* Status dot in bottom right */}
        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface-elevated translate-x-0.5 translate-y-0.5 ${
          isOk ? 'bg-success' : 'bg-warning'
        }`} />
      </div>
    </div>
  );
}
