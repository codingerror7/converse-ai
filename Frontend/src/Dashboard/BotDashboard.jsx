"use client";

import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import BotAvatar from './BotAvatar';
import AnalyticsCard from './AnalyticsCard';
import KnowledgeCard from './KnowledgeCard';
import IntegrationCard from './IntegrationCard';
import { Play, Pause, RefreshCw, Send, Activity, Settings, MessageSquare, Terminal } from 'lucide-react';

export default function BotDashboard() {
  const [isActive, setIsActive] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Hello! I am Vance, your AI support specialist. I have fully indexed the Acme Corp knowledge graph. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: `I've registered your query regarding "${userMsg}". Telemetry logs indicate that database indexing handles read requests within standard boundaries.` }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Bot Header summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div className="flex items-center gap-4">
          <BotAvatar status={isActive ? 'active' : 'idle'} size="lg" />
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-extrabold tracking-tight text-primary">Vance AI Employee</h1>
              <Badge variant={isActive ? 'success' : 'warning'}>
                {isActive ? 'Operational' : 'Paused'}
              </Badge>
            </div>
            <p className="text-xs text-secondary">
              Specialized in <span className="text-primary font-semibold">Customer Support</span> &bull; Active since June 8, 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsActive(!isActive)}
            className="gap-2"
          >
            {isActive ? (
              <>
                <Pause size={14} /> Pause Agent
              </>
            ) : (
              <>
                <Play size={14} /> Resume Agent
              </>
            )}
          </Button>
          <Button variant="secondary" size="sm" className="gap-2 p-2.5">
            <RefreshCw size={14} /> Sync
          </Button>
          <Button variant="accent" size="sm" className="gap-2">
            <Settings size={14} /> Configure
          </Button>
        </div>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Main Metrics + Inline Sandbox Chat) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Performance Overview Counters */}
          <AnalyticsCard />

          {/* Chat Sandbox Card */}
          <Card elevation="subtle" className="p-6 space-y-4 border-border/70 relative">
            <div className="flex items-center justify-between border-b border-border/30 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-accent" />
                <h3 className="text-sm font-bold tracking-tight text-primary">Interactive Sandbox</h3>
              </div>
              <span className="text-[10px] uppercase font-bold text-secondary tracking-widest bg-background px-2.5 py-1 rounded-md border border-border/40">
                Local Testing Console
              </span>
            </div>

            {/* Chat Bubbles Container */}
            <div className="h-[250px] overflow-y-auto pr-2 space-y-4 flex flex-col justify-start">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed border ${
                    msg.sender === 'user'
                      ? 'bg-accent/10 border-accent/20 text-accent rounded-tr-none'
                      : 'bg-surface-elevated border-border text-primary rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-elevated border border-border text-secondary max-w-[80%] p-3.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask your AI employee a test query..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-4 py-3 bg-background text-xs text-primary border border-border rounded-xl focus:border-accent focus:ring-1 focus:ring-accent/25 outline-none"
              />
              <button 
                type="submit"
                className="p-3 rounded-xl bg-accent text-white hover:bg-opacity-95 shadow-md shadow-accent/20 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </Card>

          {/* Recent telemetries activity logs */}
          <Card elevation="none" className="p-6 bg-surface-elevated/10 border-border/50 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/30 pb-3">
              <Activity size={16} className="text-secondary" />
              <h3 className="text-sm font-bold tracking-tight text-primary">Live Activity Stream</h3>
            </div>
            
            <div className="space-y-3 font-mono text-[10px] text-secondary">
              <div className="flex items-start gap-3 justify-between bg-surface/30 p-2.5 rounded-lg border border-border/30">
                <span className="text-accent font-semibold">[00:08:44]</span>
                <span className="flex-1 text-primary">Query resolved from slack-connector: "How do I upgrade payment plans?"</span>
                <Badge variant="success">98.5% Accuracy</Badge>
              </div>
              <div className="flex items-start gap-3 justify-between bg-surface/30 p-2.5 rounded-lg border border-border/30">
                <span className="text-accent font-semibold">[00:08:12]</span>
                <span className="flex-1 text-primary">Scraper synchronized: Indexing 4 new web articles from company blog.</span>
                <Badge variant="secondary">4 Files Sync</Badge>
              </div>
              <div className="flex items-start gap-3 justify-between bg-surface/30 p-2.5 rounded-lg border border-border/30">
                <span className="text-accent font-semibold">[00:07:31]</span>
                <span className="flex-1 text-primary">Query flagged as out-of-bounds: "What is your internal backend logic?"</span>
                <Badge variant="warning">Refusal Answer</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (Knowledge Bases + Active Integrations) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Knowledge base summary card */}
          <KnowledgeCard />

          {/* Integrations channels card */}
          <IntegrationCard />
          
        </div>

      </div>
    </div>
  );
}
