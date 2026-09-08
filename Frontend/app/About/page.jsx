import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Zap, Sliders, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import NavbarPods from '../../src/components/NavbarPods';
import Footer from '../../src/components/Footer';

export const metadata = {
  title: 'About — Converse-AI',
  description: 'Learn about Converse-AI — a simple, modern platform for creating AI-powered chatbots tailored to your business.',
  keywords: ['About Converse-AI', 'Custom AI Chatbots', 'Business AI Assistant', 'AI Platform'],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#06090D] text-[#F1F5F9] flex flex-col selection:bg-[#3B82F6]/35 selection:text-[#F1F5F9] relative overflow-x-hidden">
      
      {/* Ambient Luminous Glow Layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-b from-[#3B82F6]/10 via-[#06B6D4]/5 to-transparent blur-[140px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#3B82F6]/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(rgba(103, 232, 249, 0.6) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-24">
        
        {/* Page Header */}
        <header className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F1F5F9] font-sans leading-[1.1] mb-4 sm:mb-5">
            Build an AI that{' '}
            <span className="text-gradient-primary">talks like you</span>
          </h1>
          
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Converse-AI is a simple platform for creating AI-powered chatbots tailored to your business.
          </p>
        </header>

        {/* Content Container Chassis */}
        <div className="space-y-8 sm:space-y-12">
          
          {/* Section 1: Overview Statement */}
          <section className="p-6 sm:p-8 md:p-10 rounded-[20px] sm:rounded-[28px] bg-[#0B1117]/80 backdrop-blur-xl border border-[#1E2933] shadow-[0_20px_50px_-15px_rgba(6,9,13,0.9)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent pointer-events-none" />
            
            <h2 className="text-lg sm:text-xl font-bold text-[#F1F5F9] mb-3 sm:mb-4 flex items-center gap-2.5">
              <Bot size={20} className="text-[#3B82F6]" />
              <span>What is Converse-AI?</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Converse-AI enables entrepreneurs, small businesses, and creators to generate intelligent, customized chat assistants without coding, complex machine learning workflows, or confusing setup pipelines. You define who you are and what your business does — Converse-AI handles the intelligence.
            </p>
          </section>

          {/* Section 2: What We Do */}
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-[#94A3B8] font-semibold">
                What We Do
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              
              <div className="p-5 sm:p-6 rounded-2xl bg-[#101820] border border-[#1E2933] flex flex-col justify-between hover:border-[#3B82F6]/40 transition-colors duration-200">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                    <Bot size={16} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#F1F5F9]">
                    Custom AI Chatbots
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Help businesses create customized AI chatbots designed specifically for their brand tone, domain knowledge, and customer interactions.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#101820] border border-[#1E2933] flex flex-col justify-between hover:border-[#3B82F6]/40 transition-colors duration-200">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/15 border border-[#06B6D4]/30 flex items-center justify-center text-[#06B6D4]">
                    <Sliders size={16} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#F1F5F9]">
                    Define Behavior
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Allow users to define business information, operational guidelines, and precise chatbot behavior through simple guided prompts.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#101820] border border-[#1E2933] flex flex-col justify-between hover:border-[#3B82F6]/40 transition-colors duration-200">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#67E8F9]/15 border border-[#67E8F9]/30 flex items-center justify-center text-[#67E8F9]">
                    <Zap size={16} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#F1F5F9]">
                    Instant Generation
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Automatically generate and configure a responsive chatbot built around your specific business context, ready for live testing.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Section 3: Why Converse-AI */}
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-[#94A3B8] font-semibold">
                Why Converse-AI
              </h2>
            </div>

            <div className="p-6 sm:p-8 rounded-[20px] sm:rounded-[28px] bg-[#0B1117]/80 backdrop-blur-xl border border-[#1E2933] shadow-[0_20px_50px_-15px_rgba(6,9,13,0.9)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                
                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#F1F5F9] mb-1">
                      Simple Setup
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Go from an idea to a functioning business chatbot in under 60 seconds with our streamlined workflow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#F1F5F9] mb-1">
                      Business-Specific Responses
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Your assistant stays grounded in your specified business profile, answering queries with accuracy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#F1F5F9] mb-1">
                      Zero Complicated Configuration
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      No vector databases, API keys, or technical knowledge required to create and interact with your bot.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#F1F5F9] mb-1">
                      Fast Chatbot Creation
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Instant testing interface and shareable link generation directly after creation.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Bottom Action Card */}
          <section className="p-6 sm:p-8 rounded-[20px] sm:rounded-[28px] bg-gradient-to-br from-[#101820] to-[#0B1117] border border-[#1E2933] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-[#F1F5F9]">
                Ready to build your chatbot?
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Get started now — configure your business assistant in minutes.
              </p>
            </div>
            <Link
              href="/Business"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891B2] text-[#F1F5F9] text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] active:scale-95 shrink-0"
            >
              <span>Build AI Now</span>
              <ArrowRight size={14} />
            </Link>
          </section>

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
