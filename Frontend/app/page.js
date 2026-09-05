"use client";

import React from 'react';
import HeroFrame from '../src/components/HeroFrame';
import HowItWorks from '../src/components/HowItWorks';
import FinalCTA from '../src/components/FinalCTA';
import Footer from '../src/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06090D] text-[#F1F5F9] flex flex-col selection:bg-[#3B82F6]/35 selection:text-[#F1F5F9] overflow-x-hidden">
      {/* Master Cinematic Hero Window Chassis */}
      <HeroFrame />

      {/* 3-Step Process Section */}
      <HowItWorks />

      {/* Final Call To Action */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
