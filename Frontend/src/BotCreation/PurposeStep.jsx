"use client";

import React from 'react';
import { MessageSquare, UserPlus, TrendingUp, GraduationCap, Database, UserCheck } from 'lucide-react';
import Card from '../common/Card';

export const PURPOSE_OPTIONS = [
  {
    id: 'customer_support',
    title: 'Customer Support',
    description: 'Resolve queries, manage tickets, and support users 24/7 with zero latency.',
    icon: MessageSquare
  },
  {
    id: 'lead_generation',
    title: 'Lead Generation',
    description: 'Interact with landing page visitors, capture details, and schedule qualified calls.',
    icon: UserPlus
  },
  {
    id: 'sales_assistant',
    title: 'Sales Assistant',
    description: 'Provide personalized recommendations, compare plans, and close transactions.',
    icon: TrendingUp
  },
  {
    id: 'student_tutor',
    title: 'Student Tutor',
    description: 'Guide learners, critique materials, and clarify complex concepts interactively.',
    icon: GraduationCap
  },
  {
    id: 'knowledge_base',
    title: 'Knowledge Base Integrator',
    description: 'Index company documents, wikis, and guidelines to query operational answers.',
    icon: Database
  },
  {
    id: 'personal_assistant',
    title: 'Personal Executive',
    description: 'Manage individual schedules, draft emails, summarize logs, and log task queues.',
    icon: UserCheck
  }
];

export default function PurposeStep({ selected, onSelect }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-primary">
          What should your AI employee do?
        </h2>
        <p className="text-sm text-secondary">
          Select the core specialization. This builds the foundational cognitive logic, response formats, and APIs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PURPOSE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;

          return (
            <Card
              key={option.id}
              onClick={() => onSelect(option.id)}
              selected={isSelected}
              hoverable
              elevation={isSelected ? 'elevated' : 'subtle'}
              className="p-5 flex flex-col justify-between min-h-[160px] text-left relative overflow-hidden group"
            >
              {/* Subtle background glow on selected */}
              {isSelected && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />
              )}
              
              <div className="space-y-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-200 ${
                  isSelected 
                    ? 'bg-accent/10 border-accent/30 text-accent shadow-sm' 
                    : 'bg-surface-elevated border-border text-secondary group-hover:text-primary group-hover:border-secondary/35'
                }`}>
                  <Icon size={20} />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-primary tracking-tight">
                    {option.title}
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                    {option.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
