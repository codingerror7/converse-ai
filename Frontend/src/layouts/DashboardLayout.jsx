"use client";

import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sidebar + Main Viewport Wrapper */}
      <div className="flex flex-1 relative">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-[calc(100vh-96px)] mt-24 px-8 py-10 overflow-y-auto">
          <div className="flex-1 max-w-7xl w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer at very bottom */}
      <Footer />
    </div>
  );
}
