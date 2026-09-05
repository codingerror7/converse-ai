"use client";

import React from 'react';
import HeroFrame from '../src/components/HeroFrame';
import HowItWorks from '../src/components/HowItWorks';
import FinalCTA from '../src/components/FinalCTA';
import Footer from '../src/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020204] text-[#FDFCFF] flex flex-col selection:bg-[#7C3AED]/35 selection:text-white overflow-x-hidden">
      {/* Master Cinematic Hero Window Chassis */}
      <HeroFrame />

      {/* 3-Step Process Section */}
      <HowItWorks />

      {/* Final Minimal Call To Action */}
      <FinalCTA />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}

