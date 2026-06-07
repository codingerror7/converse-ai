import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-border/40 bg-background text-secondary">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-semibold text-primary">Aetheris</span> &copy; {new Date().getFullYear()} Aetheris Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
}
