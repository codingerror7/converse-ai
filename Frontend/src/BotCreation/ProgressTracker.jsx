import React from 'react';
import { Check } from 'lucide-react';

export default function ProgressTracker({ currentStep = 1, totalSteps = 4 }) {
  const steps = [
    { number: 1, label: 'Purpose' },
    { number: 2, label: 'Context' },
    { number: 3, label: 'Personality' },
    { number: 4, label: 'Review' }
  ];

  return (
    <div className="w-full flex items-center justify-between gap-4 py-6 px-1 border-b border-border/40 mb-8 bg-transparent">
      {steps.map((step, idx) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;
        
        return (
          <React.Fragment key={step.number}>
            <div className="flex items-center gap-2">
              <div 
                className={`w-7 h-7 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-accent border-accent text-white' 
                    : isActive 
                      ? 'border-accent text-accent shadow-sm shadow-accent/15'
                      : 'border-border text-secondary'
                }`}
              >
                {isCompleted ? <Check size={12} className="stroke-[3]" /> : step.number}
              </div>
              <span 
                className={`text-xs font-semibold tracking-tight transition-colors duration-300 hidden sm:inline ${
                  isActive ? 'text-primary' : 'text-secondary/70'
                }`}
              >
                {step.label}
              </span>
            </div>
            
            {idx < steps.length - 1 && (
              <div className="flex-1 h-[1px] bg-border relative">
                <div 
                  className="absolute left-0 top-0 h-full bg-accent transition-all duration-500 ease-out" 
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
