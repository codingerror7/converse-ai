import React from 'react';
import Link from 'next/link';
import { FileText, CheckSquare, AlertTriangle, ShieldCheck } from 'lucide-react';
import NavbarPods from '../../src/components/NavbarPods';
import Footer from '../../src/components/Footer';

export const metadata = {
  title: 'Terms & Conditions — Converse-AI',
  description: 'Review the terms of service governing your access to and use of the Converse-AI platform.',
  keywords: ['Terms of Service', 'Terms and Conditions', 'Converse-AI Terms', 'User Agreement'],
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#06090D] text-[#F1F5F9] flex flex-col selection:bg-[#3B82F6]/35 selection:text-[#F1F5F9] relative overflow-x-hidden">
      
      {/* Ambient Luminous Glow Layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-b from-[#3B82F6]/10 via-[#06B6D4]/5 to-transparent blur-[140px]" />
        <div className="absolute bottom-1/3 left-10 w-[350px] h-[350px] rounded-full bg-[#06B6D4]/5 blur-[120px]" />
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
            <FileText size={11} className="text-[#06B6D4]" />
            <span>Terms of Service</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F1F5F9] font-sans leading-[1.1] mb-3 sm:mb-4">
            Terms & <span className="text-gradient-primary">Conditions</span>
          </h1>
          
          <p className="text-xs sm:text-sm font-mono text-[#94A3B8]">
            Last Updated: September 2026
          </p>
        </header>

        {/* Terms Document Chassis */}
        <div className="p-6 sm:p-10 md:p-12 rounded-[20px] sm:rounded-[32px] bg-[#0B1117]/85 backdrop-blur-xl border border-[#1E2933] shadow-[0_20px_60px_-15px_rgba(6,9,13,0.95)] relative space-y-8 sm:space-y-10">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent pointer-events-none" />

          {/* Intro Statement */}
          <div className="pb-6 border-b border-[#1E2933]">
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              These Terms and Conditions govern your access to and use of Converse-AI. By creating or interacting with chatbots on our website, you agree to comply with and be bound by these terms.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">01.</span>
              <span>Acceptance of Terms</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              By accessing Converse-AI, creating a custom chatbot, or utilizing our chatbot interaction services, you acknowledge that you have read, understood, and agree to these Terms and Conditions in full.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">02.</span>
              <span>Use of Converse-AI</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              Converse-AI provides tools to configure and deploy conversational AI assistants based on business specifications. You agree to use the service solely for lawful purposes and in accordance with these terms.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">03.</span>
              <span>User-Provided Information</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              You are responsible for ensuring that all business descriptions, knowledge inputs, and custom instructions you provide are accurate, lawful, and do not infringe on the intellectual property or legal rights of third parties.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">04.</span>
              <span>AI-Generated Responses</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              Responses generated by Converse-AI assistants are produced by machine learning models based on user inputs. While the system strives for contextual relevance, AI outputs may occasionally contain inaccuracies. Users should review and evaluate responses for sensitive or critical business use cases.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">05.</span>
              <span>Acceptable Use</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              You agree not to use Converse-AI to generate harmful, illegal, harassing, deceptive, fraudulent, or malicious content, nor attempt to reverse-engineer, disrupt, or overload the platform infrastructure.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">06.</span>
              <span>Intellectual Property</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              You retain all rights to the business content and brand materials you provide. Converse-AI retains all ownership, copyright, and intellectual property rights in the platform design, software, interface, and branding.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">07.</span>
              <span>Service Availability</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              We strive to maintain continuous platform availability, but services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. Maintenance, updates, or third-party outages may temporarily affect availability.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">08.</span>
              <span>Limitation of Liability</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              To the fullest extent permitted by applicable law, Converse-AI and its operators shall not be liable for any indirect, incidental, or consequential damages resulting from your use of or inability to use the platform or its generated AI outputs.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#3B82F6]">09.</span>
              <span>Changes to the Service &amp; Terms</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              We reserve the right to modify, enhance, or discontinue features of the platform, as well as update these Terms and Conditions. Continued use after updates constitutes acceptance of the revised terms.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-2.5 pt-4 border-t border-[#1E2933]">
            <h2 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
              <span className="font-mono text-xs text-[#06B6D4]">10.</span>
              <span>Contact Information</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
              If you have any questions or concerns regarding these Terms and Conditions, please contact us at{' '}
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
