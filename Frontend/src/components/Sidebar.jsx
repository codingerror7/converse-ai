"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BarChart3, Database, Cable, Settings, HelpCircle, Compass } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { name: 'Knowledge', icon: Database, path: '/dashboard/knowledge' },
    { name: 'Integrations', icon: Cable, path: '/dashboard/integrations' },
    { name: 'Explore Templates', icon: Compass, path: '/create' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border h-screen sticky top-0 flex flex-col justify-between p-6 z-10 pt-28">
      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/60 px-3 mb-3">Management</p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-surface-elevated text-primary border-l-2 border-accent shadow-sm' 
                      : 'text-secondary hover:text-primary hover:bg-surface-elevated/40'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-accent' : 'text-secondary'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Support / Bottom Segment */}
      <div className="border-t border-border/50 pt-4">
        <Link 
          href="/support" 
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-secondary hover:text-primary hover:bg-surface-elevated/40 transition-all cursor-pointer"
        >
          <HelpCircle size={18} />
          <span>Support & Docs</span>
        </Link>
        <div className="mt-4 px-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          <span className="text-[11px] font-medium text-secondary/80">All systems operational</span>
        </div>
      </div>
    </aside>
  );
}
