"use client";

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';
import Button from '../../src/common/Button';
import Card from '../../src/common/Card';
import Footer from '../../src/components/Footer';

export default function Home() {
  return (
    <div className="flex-1 bg-background flex flex-col justify-between pt-24 bg-mesh relative min-h-screen overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 ambient-glow pointer-events-none" />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-16 md:py-24 text-center z-10 flex-1 flex flex-col justify-center items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border/80 text-[10px] uppercase font-bold tracking-widest text-accent mb-6">
          <Sparkles size={10} /> Next-Gen AI Employee Interface
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-primary leading-[1.08] mb-6">
          Create your next <span className="bg-gradient-to-r from-accent via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">AI Employee</span>
        </h1>

        <p className="text-sm sm:text-lg text-secondary max-w-2xl leading-relaxed mb-10">
          Aetheris goes beyond basic chatbot boxes. We specialize in synthesizing structured cognitive profiles, training intelligence layers, and deploying dedicated digital workers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <a href="/create">
            <Button variant="primary" size="lg" className="gap-2 group">
              Instantiate Employee <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a href="/dashboard">
            <Button variant="outline" size="lg">
              Explore Console
            </Button>
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24 text-left">
          <Card elevation="subtle" className="p-6 space-y-4 hover:border-accent/30 transition-all border-border/60">
            <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/15 flex items-center justify-center text-accent">
              <Layers size={18} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-primary tracking-tight">Cognitive Evolution</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Watch your chatbot core grow dynamically from a single node to an aligned intelligence sphere throughout creation.
              </p>
            </div>
          </Card>

          <Card elevation="subtle" className="p-6 space-y-4 hover:border-accent/30 transition-all border-border/60">
            <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/15 flex items-center justify-center text-accent">
              <Zap size={18} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-primary tracking-tight">Real-Time Synthesis</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Cinematic generation pipelines calibrate character profiles, index documents, and configure Webhooks within seconds.
              </p>
            </div>
          </Card>

          <Card elevation="subtle" className="p-6 space-y-4 hover:border-accent/30 transition-all border-border/60">
            <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/15 flex items-center justify-center text-accent">
              <ShieldCheck size={18} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-primary tracking-tight">Production Guardrails</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Rigorous safety parameters and boundary protocols protect corporate datasets and restrict outputs to designated wikis.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
