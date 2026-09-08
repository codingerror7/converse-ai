import React from 'react';
import Link from 'next/link';
import { Shield, Lock, FileText, ArrowRight } from 'lucide-react';
import NavbarPods from '../../src/components/NavbarPods';
import Footer from '../../src/components/Footer';

export const metadata = {
  title: 'Privacy Policy — Converse-AI',
  description: 'Understand how Converse-AI collects, uses, and protects your information and chatbot data.',
  keywords: ['Privacy Policy', 'Converse-AI Privacy', 'Data Protection', 'AI Data Practices'],
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#06090D] text-[#F1F5F9] flex flex-col selection:bg-[#3B82F6]/35 selection:text-[#F1F5F9] relative overflow-x-hidden">
      
      {/* Ambient Luminous Glow Layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-b from-[#3B82F6]/10 via-[#06B6D4]/5 to-transparent blur-[140px]" />
        <div className="absolute bottom-1/3 right-10 w-[350px] h-[350px] rounded-full bg-[#3B82F6]/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(rgba(103, 232, 249, 0.6) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-16 pb-16 sm:pb-24">
        
        {/* Page Header */}
        <header className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
        
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F1F5F9] font-sans leading-[1.1] mb-3 sm:mb-4">
            Privacy <span className="text-gradient-primary">Policy</span>
          </h1>
          
          <p className="text-xs sm:text-sm font-mono text-[#94A3B8]">
            Last Updated: September 2026
          </p>
        </header>

        {/* Policy Document Chassis */}
        <div className="p-6 sm:p-10 md:p-12 rounded-[20px] sm:rounded-[32px] bg-[#0B1117]/85 backdrop-blur-xl border border-[#1E2933] shadow-[0_20px_60px_-15px_rgba(6,9,13,0.95)] relative space-y-8 sm:space-y-10">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent pointer-events-none" />

          {/* Intro Statement */}
          <div className="pb-6 border-b border-[#1E2933]">
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              At Converse-AI, we respect your privacy and are committed to protecting the information you share when building and interacting with customized chatbots on our platform. This Privacy Policy explains what information we collect, how it is used, and how we safeguard your data.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">01.</span>
              <span>Information We Collect</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              When using Converse-AI, we collect information you voluntarily provide to configure chatbots, including business names, business categories, operational descriptions, and custom instructions. When interacting with chatbots, we collect the conversation messages submitted during active chat sessions.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">02.</span>
              <span>How We Use Information</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              We use the collected information exclusively to provide and improve the Converse-AI platform. This includes constructing tailored system instructions, synthesizing business-specific knowledge contexts, generating conversational responses, and maintaining chatbot availability.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">03.</span>
              <span>Chatbot and Conversation Data</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              When conversations occur with a created chatbot, message exchanges are processed in real time to maintain conversational context. We do not sell or monetize conversation data to third-party data brokers or advertisers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">04.</span>
              <span>AI Processing</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              Converse-AI utilizes underlying artificial intelligence foundation models to generate responses based on your business configurations and user prompts. Prompts and context are transmitted securely to AI processing endpoints to produce accurate completions.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">05.</span>
              <span>Data Storage</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              Chatbot profiles and operational configurations are stored in secure backend databases. Data transmissions between your browser, our servers, and database storage are protected using standard TLS/HTTPS encryption protocols.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">06.</span>
              <span>Third-Party Services</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              We rely on trusted cloud infrastructure and AI model providers strictly to host our application and generate chat completions. These providers process data according to necessary operational requirements and standard data protection terms.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">07.</span>
              <span>Data Security</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              We implement reasonable technical and organizational safeguards to prevent unauthorized access, disclosure, alteration, or destruction of stored chatbot configurations and conversation logs.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">08.</span>
              <span>Data Retention</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              We retain business configurations and chatbot records as long as necessary to provide uninterrupted service to you and satisfy legitimate operational needs.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">09.</span>
              <span>User Rights</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              You have the right to request access to, correction of, or deletion of chatbot records associated with your use of the platform. Requests can be submitted directly through our contact channel.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-2.5 pt-4 border-t border-[#1E2933]">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#06B6D4]">10.</span>
              <span>Contact for Privacy Inquiries</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              For any questions regarding this Privacy Policy or our data practices, please reach out to our team at{' '}
              <a
                href="mailto:contact@converse.ai"
                className="text-[#3B82F6] hover:text-[#67E8F9] transition-colors font-mono underline underline-offset-2"
              >
                contact@converse.ai
              </a>
              .
            </p>
          </section>

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
