"use client";

import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Input from '../common/Input';
import { ShieldCheck, Server, Sparkles, Building, FileText } from 'lucide-react';

export default function ReviewStep({ data, onNameChange, onGenerate }) {
  const purposeLabels = {
    customer_support: 'Customer Support Specialists',
    lead_generation: 'Lead Generation Executive',
    sales_assistant: 'Sales Advisor',
    student_tutor: 'Educational Mentor',
    knowledge_base: 'Knowledge Base Query Hub',
    personal_assistant: 'Personal Executive Assistant'
  };

  const personalityLabels = {
    professional: 'Professional / Formal',
    friendly: 'Friendly / Empathetic',
    luxury: 'Luxury / Refined',
    expert: 'Expert / Deep-Tech',
    energetic: 'Energetic / Proactive',
    mentor: 'Mentor / Educational'
  };

  const botName = data.botName || '';

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-primary">
          Review alignment schema
        </h2>
        <p className="text-sm text-secondary">
          Inspect the cognitive profile and assign an operating alias to deploy your AI employee.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name Input */}
        <Input
          label="AI Employee Name / Alias"
          placeholder="e.g. Aetheris-1, Lyra, Vance"
          value={botName}
          onChange={(e) => onNameChange(e.target.value)}
          required
        />

        {/* Configuration summary grid */}
        <Card elevation="subtle" className="p-5 space-y-5 bg-surface border-border/60">
          <div className="flex items-center gap-2 pb-3 border-b border-border/40">
            <ShieldCheck size={18} className="text-accent" />
            <h3 className="text-sm font-bold text-primary tracking-tight">Cognitive Deployment Specs</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Purpose */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <Server size={10} /> Specialization
              </span>
              <p className="text-xs font-semibold text-primary">
                {purposeLabels[data.purpose] || 'Not Selected'}
              </p>
            </div>

            {/* Personality */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <Sparkles size={10} /> Personality Profile
              </span>
              <p className="text-xs font-semibold text-primary">
                {personalityLabels[data.personality] || 'Not Selected'}
              </p>
            </div>

            {/* Business Industry */}
            <div className="space-y-1 md:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <Building size={10} /> Business Context
              </span>
              <p className="text-xs font-semibold text-primary">
                {data.business?.name ? `${data.business.name} (${data.business.industry || 'General'})` : 'Not Specified'}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1 md:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <FileText size={10} /> Operational Mandate
              </span>
              <p className="text-xs text-secondary leading-relaxed bg-background/40 p-3 rounded-xl border border-border/30">
                {data.business?.description || 'No operating description provided.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Evolving Readiness indicator */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-success/5 border border-success/15">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-success flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span>
              Alignment Ready
            </p>
            <p className="text-[11px] text-secondary">All knowledge graphs and semantic matrices match correctly.</p>
          </div>
          <Badge variant="success">100% Integrity</Badge>
        </div>
      </div>
    </div>
  );
}
