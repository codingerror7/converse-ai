import React from 'react';
import { Check, Loader2 } from 'lucide-react';

export default function GenerationStageCard({ label, isActive, isCompleted }) {
  return (
    <div 
      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
        isCompleted 
          ? 'bg-success/5 border-success/20 text-success' 
          : isActive 
            ? 'bg-accent/5 border-accent/35 text-accent shadow-sm shadow-accent/5 ring-1 ring-accent/20'
            : 'bg-surface/20 border-border/50 text-secondary'
      }`}
    >
      <div className="flex items-center gap-3">
        <div 
          className={`w-5.5 h-5.5 rounded-md border flex items-center justify-center transition-all duration-300 ${
            isCompleted 
              ? 'bg-success border-success text-background' 
              : isActive 
                ? 'border-accent text-accent'
                : 'border-border text-transparent'
          }`}
        >
          {isCompleted ? (
            <Check size={12} className="stroke-[3.5]" />
          ) : isActive ? (
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          ) : null}
        </div>
        
        <span className={`text-xs font-semibold tracking-tight transition-colors duration-300 ${
          isActive ? 'text-primary font-bold' : ''
        }`}>
          {label}
        </span>
      </div>

      <div className="text-[10px] font-semibold uppercase tracking-wider">
        {isCompleted && 'Complete'}
        {isActive && 'Calibrating'}
        {!isActive && !isCompleted && 'Pending'}
      </div>
    </div>
  );
}
