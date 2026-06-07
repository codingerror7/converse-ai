"use client";

import React from 'react';
import Input from '../common/Input';
import Textarea from '../common/Textarea';

export default function BusinessContextStep({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-primary">
          Tell us about your business
        </h2>
        <p className="text-sm text-secondary">
          This context helps the AI employee understand its working environment, target audience, and product offerings.
        </p>
      </div>

      <div className="space-y-5">
        {/* Business Name */}
        <Input
          label="Business Name"
          placeholder="e.g. Acme Corp, Linear Technology"
          value={data.name || ''}
          onChange={(e) => updateField('name', e.target.value)}
          required
        />

        {/* Industry */}
        <Input
          label="Industry Vertical"
          placeholder="e.g. SaaS, E-commerce, Real Estate, Healthcare"
          value={data.industry || ''}
          onChange={(e) => updateField('industry', e.target.value)}
          required
        />

        {/* Description / Mission */}
        <Textarea
          label="Strategic Objective / Description"
          placeholder="e.g. A B2B software firm building cloud infrastructure. The AI employee should assist users in configuring server instances and resolving load balancing issues."
          value={data.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          rows={5}
          required
        />
        
        <div className="p-4 rounded-2xl bg-surface-elevated/40 border border-border/50 text-xs text-secondary leading-relaxed flex gap-3">
          <span className="text-accent font-semibold">💡 Tip:</span>
          <span>
            Be detailed. Specifying your exact software, user pain points, and support boundaries helps in training the response generation model accurately.
          </span>
        </div>
      </div>
    </div>
  );
}
