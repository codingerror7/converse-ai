"use client";

import React from 'react';
import Card from '../common/Card';
import { MessageSquare, Zap, Target, Sparkles, ArrowUpRight } from 'lucide-react';

export default function AnalyticsCard() {
  const metrics = [
    { name: 'Total Chats', value: '1,842', change: '+12.4%', icon: MessageSquare, color: 'text-accent' },
    { name: 'Avg Latency', value: '420ms', change: '-85ms', icon: Zap, color: 'text-warning' },
    { name: 'Task Accuracy', value: '99.4%', change: '+0.2%', icon: Target, color: 'text-success' },
    { name: 'Ticket Deflection', value: '87.1%', change: '+4.3%', icon: Sparkles, color: 'text-accent' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Metric Counters grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx} elevation="subtle" className="p-5 space-y-3 border-border/50 text-left">
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center ${m.color}`}>
                  <Icon size={16} />
                </div>
                <span className="text-[10px] font-bold text-success flex items-center gap-0.5">
                  {m.change} <ArrowUpRight size={10} />
                </span>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase font-bold tracking-wider text-secondary/70">{m.name}</p>
                <p className="text-lg font-extrabold text-primary">{m.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Analytics Chart Container */}
      <Card elevation="subtle" className="p-6 border-border/70 text-left">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold tracking-tight text-primary">Conversation Volume</h3>
            <p className="text-[11px] text-secondary">Active user chats processed daily across all integrations.</p>
          </div>
          <div className="flex items-center gap-1.5 p-0.5 bg-surface-elevated border border-border rounded-lg text-[10px] font-bold">
            <button className="px-3 py-1 bg-surface border border-border text-primary rounded-md">7 Days</button>
            <button className="px-3 py-1 text-secondary hover:text-primary transition-colors">30 Days</button>
          </div>
        </div>

        {/* Minimalist SVG Line Chart */}
        <div className="h-48 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
            {/* Grids */}
            <line x1="0" y1="50" x2="700" y2="50" stroke="#26282E" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="0" y1="100" x2="700" y2="100" stroke="#26282E" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="0" y1="150" x2="700" y2="150" stroke="#26282E" strokeWidth="0.5" strokeDasharray="4 4" />
            
            {/* Area fill */}
            <path
              d="M 0 170 Q 116 110, 233 130 T 466 70 T 700 40 L 700 200 L 0 200 Z"
              fill="url(#chart-glow)"
              opacity="0.12"
            />
            
            {/* Line */}
            <path
              d="M 0 170 Q 116 110, 233 130 T 466 70 T 700 40"
              fill="none"
              stroke="#7C5CFF"
              strokeWidth="2.5"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C5CFF" />
                <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Data points */}
            <circle cx="233" cy="130" r="4.5" fill="#7C5CFF" stroke="#F5F5F7" strokeWidth="1.5" />
            <circle cx="466" cy="70" r="4.5" fill="#7C5CFF" stroke="#F5F5F7" strokeWidth="1.5" />
            <circle cx="700" cy="40" r="4.5" fill="#7C5CFF" stroke="#F5F5F7" strokeWidth="1.5" />
          </svg>

          {/* Time markings */}
          <div className="absolute bottom-[-16px] left-0 right-0 flex justify-between text-[9px] font-mono text-secondary">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
