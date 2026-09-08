import React from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Briefcase, HelpCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import NavbarPods from '../../src/components/NavbarPods';
import Footer from '../../src/components/Footer';
import CopyEmailButton from '../../src/components/CopyEmailButton';

export const metadata = {
  title: 'Contact Us — Converse-AI',
  description: 'Get in touch with the Converse-AI team for questions, feedback, business inquiries, or support.',
  keywords: ['Contact Converse-AI', 'Support', 'AI Chatbot Enquiries', 'Feedback'],
};

export default function ContactPage() {
  const officialEmail = 'contact@converse.ai';

  return (
    <div className="min-h-screen bg-[#06090D] text-[#F1F5F9] flex flex-col selection:bg-[#3B82F6]/35 selection:text-[#F1F5F9] relative overflow-x-hidden">
      
      {/* Ambient Luminous Glow Layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-b from-[#3B82F6]/10 via-[#06B6D4]/5 to-transparent blur-[140px]" />
        <div className="absolute bottom-1/4 left-10 w-[350px] h-[350px] rounded-full bg-[#06B6D4]/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(rgba(103, 232, 249, 0.6) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Structural Top Pods Navbar */}
      <NavbarPods />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-24">
        
        {/* Page Header */}
        <header className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101820] border border-[#1E2933] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-[#3B82F6] mb-4 sm:mb-5 shadow-xs">
            <Mail size={11} className="text-[#06B6D4]" />
            <span>Contact Us</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F1F5F9] font-sans leading-[1.1] mb-4 sm:mb-5">
            Get in touch with{' '}
            <span className="text-gradient-primary">Converse-AI</span>
          </h1>
          
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Have questions, feedback, support inquiries, or business opportunities? We are here to help.
          </p>
        </header>

        {/* Content Container */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* Primary Contact Email Card */}
          <section className="p-6 sm:p-8 md:p-10 rounded-[20px] sm:rounded-[28px] bg-[#0B1117]/80 backdrop-blur-xl border border-[#1E2933] shadow-[0_20px_50px_-15px_rgba(6,9,13,0.9)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#06B6D4] font-semibold">
                  Official Email
                </span>
                <div className="text-lg sm:text-2xl font-bold text-[#F1F5F9] font-mono tracking-tight break-all">
                  {officialEmail}
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Our primary channel for all inquiries, technical support, and partnership conversations.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <CopyEmailButton email={officialEmail} />
                
                <a
                  href={`mailto:${officialEmail}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891B2] text-[#F1F5F9] text-xs font-bold tracking-tight transition-all duration-200 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95"
                >
                  <span>Send Email</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </section>

          {/* Inquiry Categories Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            
            <div className="p-5 sm:p-6 rounded-2xl bg-[#101820] border border-[#1E2933] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                <HelpCircle size={16} />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9]">
                Support & Feedback
              </h2>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Need assistance with configuring your chatbot, understanding prompt guidelines, or sharing feedback on how we can improve the platform? Send us a note.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#101820] border border-[#1E2933] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/15 border border-[#06B6D4]/30 flex items-center justify-center text-[#06B6D4]">
                <Briefcase size={16} />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9]">
                Business & Partnerships
              </h2>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Exploring tailored deployments, commercial partnerships, or custom integrations? Contact our team with details about your use case.
              </p>
            </div>

          </section>

          {/* Response Time Information Card */}
          <section className="p-5 sm:p-6 rounded-2xl bg-[#0B1117] border border-[#1E2933] flex items-center gap-4 text-xs text-[#94A3B8]">
            <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse shrink-0" />
            <p>
              We typically review and respond to inquiries within <span className="text-[#F1F5F9] font-medium">24 to 48 business hours</span>.
            </p>
          </section>

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
