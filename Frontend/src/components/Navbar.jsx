"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Create Employee', path: '/create' },
    { name: 'Pricing', path: '/pricing' }
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 px-6 md:px-12 bg-background/70 backdrop-blur-md border-b border-border/50' 
          : 'py-6 px-6 md:px-12 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-primary shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform duration-200">
            <Cpu size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-primary">
            Aetheris<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-surface border border-border/60 rounded-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className="relative px-5 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-tab"
                    className="absolute inset-0 bg-surface-elevated border border-border/80 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <Link href="/create" className="hidden sm:block">
            <Button variant="accent" size="sm" className="gap-2">
              Generate Bot <ArrowRight size={14} />
            </Button>
          </Link>
          
          {/* User Profile Avatar */}
          <div className="relative group cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden ring-1 ring-border group-hover:ring-accent/40 transition-all duration-200">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                alt="Profile"
                className="w-full h-full object-cover" 
              />
            </div>
            {/* Minimal Dropdown Glow on Hover */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface-elevated border border-border rounded-2xl py-2 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 shadow-2xl z-50">
              <div className="px-4 py-2 border-b border-border/50">
                <p className="text-xs font-semibold text-primary">Eleanor Vance</p>
                <p className="text-[10px] text-secondary">eleanor@aetheris.ai</p>
              </div>
              <Link href="/dashboard" className="block px-4 py-2 text-xs text-secondary hover:text-primary hover:bg-surface transition-colors">Workspace</Link>
              <Link href="/billing" className="block px-4 py-2 text-xs text-secondary hover:text-primary hover:bg-surface transition-colors">Billing</Link>
              <div className="border-t border-border/50 my-1"></div>
              <button className="w-full text-left px-4 py-2 text-xs text-error hover:bg-error/5 transition-colors">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
