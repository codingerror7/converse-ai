"use client";

import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Cable, MessageCircle, MessageSquareCode, Globe, Radio } from 'lucide-react';
import { FaSlack, FaDiscord, FaWhatsapp } from 'react-icons/fa';

export default function IntegrationCard() {
  const [integrations, setIntegrations] = useState([
    { id: 'slack', name: 'Slack Workplace', icon: FaSlack, status: 'connected', color: 'text-[#4A154B]' },
    { id: 'discord', name: 'Discord Guild', icon: FaDiscord, status: 'disconnected', color: 'text-[#5865F2]' },
    { id: 'whatsapp', name: 'WhatsApp Business', icon: FaWhatsapp, status: 'disconnected', color: 'text-[#25D366]' },
    { id: 'webhooks', name: 'HTTP Webhooks', icon: Radio, status: 'connected', color: 'text-accent' }
  ]);

  const toggleStatus = (id) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === 'connected' ? 'disconnected' : 'connected'
          };
        }
        return item;
      })
    );
  };

  return (
    <Card elevation="subtle" className="p-6 border-border/70 text-left space-y-5">
      <div className="flex items-center gap-2">
        <Cable size={16} className="text-accent" />
        <h3 className="text-sm font-bold tracking-tight text-primary">Live Integrations</h3>
      </div>

      <div className="space-y-3">
        {integrations.map((item) => {
          const Icon = item.icon;
          const isConnected = item.status === 'connected';

          return (
            <div 
              key={item.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-surface border border-border/40"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center ${item.color}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary">{item.name}</p>
                  <p className="text-[10px] text-secondary">
                    {isConnected ? 'Syncing active' : 'Inactive'}
                  </p>
                </div>
              </div>

              {/* Connected status switcher toggle */}
              <button
                onClick={() => toggleStatus(item.id)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                  isConnected ? 'bg-accent' : 'bg-border'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isConnected ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
