"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  ArrowLeft,
  Sparkles,
  Share2,
  Check,
  RotateCcw,
  AlertCircle,
  Plus,
  ShieldCheck,
  Building2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { getChatbotAPI, sendChatMessageAPI } from '../../../src/lib/api';

export default function ChatbotPage() {
  const params = useParams();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const chatbotId = params?.chatbotId;

  // Data States
  const [chatbot, setChatbot] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  
  // UI & Network States
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick prompt suggestions tailored for business interactions
  const quickPrompts = [
    'What services do you offer?',
    'Tell me about your business',
    'How do I get started?',
    'What are your specialties?',
  ];

  // Fetch Chatbot Public Profile on Mount
  useEffect(() => {
    let isMounted = true;

    async function loadChatbot() {
      if (!chatbotId) return;
      setIsLoadingProfile(true);
      setErrorMessage(null);

      try {
        const result = await getChatbotAPI(chatbotId);
        if (isMounted && result.success && result.chatbot) {
          setChatbot(result.chatbot);

          // Initialize with personalized welcome greeting
          const initialGreeting = {
            id: 'welcome-1',
            role: 'assistant',
            content:
              result.chatbot.welcomeMessage ||
              `Hello! I'm the AI assistant for ${result.chatbot.businessName}. How can I assist you today?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages([initialGreeting]);
        }
      } catch (err) {
        console.error('Failed to load chatbot:', err);
        if (isMounted) {
          setErrorMessage(
            err.message || 'Chatbot not found or link has expired.'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    }

    loadChatbot();

    return () => {
      isMounted = false;
    };
  }, [chatbotId]);

  // Auto-scroll to bottom of conversation thread
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  // Send Message Handler
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isSending || !chatbot) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Optimistically update conversation
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsSending(true);
    setErrorMessage(null);

    // Format history for backend (role & content)
    const conversationHistory = updatedMessages
      .slice(-14)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    try {
      const responseData = await sendChatMessageAPI({
        chatbotId: chatbot.chatbotId,
        message: text,
        conversationHistory,
      });

      const botReply = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseData.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Failed to send message:', err);
      setErrorMessage(
        err.message || 'Unable to get a response right now. Please try asking again.'
      );
    } finally {
      setIsSending(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Copy Public Link to Clipboard
  const handleCopyShareLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  // Clear / Reset Conversation
  const handleResetChat = () => {
    if (!chatbot) return;
    const initialGreeting = {
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content:
        chatbot.welcomeMessage ||
        `Hello! I'm the AI assistant for ${chatbot.businessName}. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialGreeting]);
    setErrorMessage(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#06090D] text-[#F1F5F9] flex flex-col justify-between selection:bg-[#3B82F6]/35 selection:text-[#F1F5F9] overflow-x-hidden">
      
      {/* ────────────────────────────────────────────────────────── */}
      {/* Background Ambient Lighting & Grid Layer                  */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[160px] left-1/2 -translate-x-1/2 w-[750px] sm:w-[950px] h-[480px] rounded-full bg-gradient-to-b from-[#3B82F6]/15 via-[#06B6D4]/10 to-transparent blur-[140px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-full bg-[#06B6D4]/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(rgba(103, 232, 249, 0.6) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* Top Navbar / Header Bar                                   */}
      {/* ────────────────────────────────────────────────────────── */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-5 pb-2 flex items-center justify-between border-b border-[#1E2933]/50">
        
        {/* Left: Brand Identity Lockup */}
        <Link
          href="/"
          data-cursor="interactive"
          className="group flex items-center gap-2 select-none leading-none rounded-lg p-1 transition-transform"
        >
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] sm:text-[15px] font-black tracking-tight uppercase text-[#F1F5F9] font-sans group-hover:text-white transition-colors">
              CONVERSE
            </span>
            <span className="text-[13px] sm:text-[15px] font-black tracking-tight uppercase text-[#3B82F6] font-sans flex items-center gap-1">
              AI
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
            </span>
          </div>
        </Link>

        {/* Center / Right: Chatbot Identity & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {chatbot && (
            <>
              {/* Share / Copy Link Button */}
              <button
                type="button"
                onClick={handleCopyShareLink}
                data-cursor="interactive"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#101820] hover:bg-[#101820]/80 border border-[#1E2933] hover:border-[#3B82F6]/50 text-xs font-mono text-[#94A3B8] hover:text-[#F1F5F9] transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {copiedLink ? (
                  <>
                    <Check size={12} className="text-[#06B6D4]" />
                    <span className="text-[#06B6D4]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={12} />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </button>

              {/* Reset Conversation Button */}
              <button
                type="button"
                onClick={handleResetChat}
                data-cursor="interactive"
                title="Restart chat"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#101820] hover:bg-[#101820]/80 border border-[#1E2933] text-[#94A3B8] hover:text-[#F1F5F9] transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <RotateCcw size={12} />
              </button>
            </>
          )}

          {/* Build Your Own CTA Button */}
          <Link
            href="/Business"
            data-cursor="cta"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-[#F1F5F9] text-xs font-bold tracking-tight shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all active:scale-95"
          >
            <Plus size={12} strokeWidth={2.5} />
            <span className="hidden sm:inline">Create Bot</span>
            <span className="sm:hidden">New</span>
          </Link>
        </div>
      </header>

      {/* ────────────────────────────────────────────────────────── */}
      {/* Main Chat Workspace Chassis                                */}
      {/* ────────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-2.5 sm:px-6 py-4 sm:py-6 w-full max-w-5xl mx-auto">
        
        {/* Loading Skeleton */}
        {isLoadingProfile ? (
          <div className="w-full max-w-[760px] h-[620px] rounded-[28px] sm:rounded-[36px] border-4 sm:border-8 border-[#06090D] bg-[#0B1117] ring-1 ring-[#1E2933] p-8 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-semibold text-[#F1F5F9]">Loading assistant persona...</p>
            <p className="text-xs font-mono text-[#94A3B8]/60 mt-1">Synchronizing neural knowledge base</p>
          </div>
        ) : !chatbot ? (
          /* Not Found State */
          <div className="w-full max-w-[580px] rounded-[28px] sm:rounded-[36px] border-4 sm:border-8 border-[#06090D] bg-[#0B1117] ring-1 ring-[#1E2933] p-8 sm:p-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-4">
              <AlertCircle size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#F1F5F9] mb-2 font-sans">
              Chatbot Not Found
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] mb-6 max-w-md mx-auto leading-relaxed">
              {errorMessage || 'The requested chatbot ID does not exist or may have expired.'}
            </p>
            <Link
              href="/Business"
              data-cursor="cta"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-[#F1F5F9] text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              <span>Build a New Chatbot</span>
              <Sparkles size={14} />
            </Link>
          </div>
        ) : (
          /* Active Chatbot Chassis Interface */
          <div className="w-full max-w-[820px] h-[82vh] sm:h-[84vh] min-h-[540px] max-h-[820px] rounded-[24px] sm:rounded-[36px] border-4 sm:border-8 border-[#06090D] bg-[#0B1117] ring-1 ring-[#1E2933] shadow-[0_0_0_1px_rgba(30,41,51,0.6),0_30px_90px_-20px_rgba(6,9,13,0.98)] flex flex-col justify-between overflow-hidden relative">
            
            {/* Specular Top Hairline */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/40 to-transparent pointer-events-none z-20" />

            {/* ──────────────────────────────────────────────────────── */}
            {/* Chatbot Profile Top Bar                                  */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="relative z-10 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#06090D]/80 backdrop-blur-xl border-b border-[#1E2933] flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                {/* Bot Avatar */}
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#3B82F6]/25 to-[#06B6D4]/15 border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6] shadow-sm">
                    <Bot size={18} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#06B6D4] ring-2 ring-[#06090D] animate-pulse" />
                </div>

                {/* Identity Name & Category */}
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs sm:text-sm font-bold text-[#F1F5F9] tracking-tight font-sans truncate max-w-[180px] sm:max-w-[280px]">
                      {chatbot.businessName}
                    </h2>
                    <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-wider text-[#67E8F9] bg-[#06B6D4]/15 border border-[#06B6D4]/30 px-2 py-0.5 rounded-full">
                      {chatbot.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#94A3B8] font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                    <span>AI Assistant Active</span>
                  </p>
                </div>
              </div>

              {/* Verified Privacy Badge */}
              <div className="flex items-center gap-1 text-[10px] font-mono text-[#94A3B8]/60 bg-[#101820] border border-[#1E2933] px-2.5 py-1 rounded-full">
                <ShieldCheck size={11} className="text-[#3B82F6]" />
                <span className="hidden md:inline">Isolated Knowledge</span>
              </div>

            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* Conversation Message Stream                              */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="relative z-10 flex-1 overflow-y-auto px-3.5 sm:px-6 py-4 space-y-3.5 select-text">
              
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={msg.id || index}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Bot Avatar for assistant messages */}
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] shrink-0 mt-1">
                        <Bot size={13} />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-[13.5px] leading-relaxed shadow-sm text-left ${
                        isUser
                          ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-[#F1F5F9] font-medium rounded-tr-xs shadow-[0_0_20px_rgba(59,130,246,0.25)]'
                          : 'bg-[#101820] border border-[#1E2933] text-[#F1F5F9] rounded-tl-xs'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      <div
                        className={`text-[9px] font-mono mt-1.5 flex justify-end ${
                          isUser ? 'text-[#F1F5F9]/60' : 'text-[#94A3B8]/50'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>

                    {/* User Avatar */}
                    {isUser && (
                      <div className="w-7 h-7 rounded-lg bg-[#101820] border border-[#1E2933] flex items-center justify-center text-[#94A3B8] shrink-0 mt-1">
                        <User size={13} />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Thinking / Streaming Indicator */}
              {isSending && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 justify-start text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] shrink-0">
                    <Bot size={13} />
                  </div>
                  <div className="bg-[#101820] border border-[#1E2933] rounded-2xl rounded-tl-xs px-4 py-2.5 flex items-center gap-1.5 text-xs text-[#94A3B8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-bounce [animation-delay:0.3s]" />
                    <span className="text-[11px] font-mono text-[#67E8F9] ml-1.5">Thinking...</span>
                  </div>
                </motion.div>
              )}

              {/* Inline Network / API Error Banner */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className="text-rose-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-rose-400 hover:text-white font-mono text-xs px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* Quick Prompt Suggestions & Input Bar                     */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="relative z-20 p-3 sm:p-4 bg-[#06090D]/90 backdrop-blur-xl border-t border-[#1E2933]">
              
              {/* Starter Quick Chips */}
              {messages.length <= 2 && (
                <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto pb-1 no-scrollbar text-left">
                  <span className="text-[10px] text-[#94A3B8]/60 font-mono shrink-0 mr-1">Suggestions:</span>
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isSending}
                      data-cursor="interactive"
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#101820] hover:bg-[#3B82F6]/20 border border-[#1E2933] hover:border-[#3B82F6]/50 text-[#94A3B8] hover:text-[#F1F5F9] transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    maxLength={1500}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Ask ${chatbot.businessName} anything...`}
                    disabled={isSending}
                    className="w-full bg-[#0B1117] text-[#F1F5F9] placeholder:text-[#94A3B8]/40 text-xs sm:text-sm rounded-xl pl-4 pr-10 py-3 border border-[#1E2933] hover:border-[#1E2933]/80 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 outline-none transition-all shadow-inner"
                  />
                  
                  {/* Subtle input character limit */}
                  {inputText.length > 1200 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-rose-400">
                      {1500 - inputText.length}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim() || isSending}
                  data-cursor="cta"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 select-none ${
                    inputText.trim() && !isSending
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-[#F1F5F9] shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] cursor-pointer active:scale-95'
                      : 'bg-[#101820] border border-[#1E2933] text-[#94A3B8]/40 cursor-not-allowed'
                  }`}
                >
                  <Send size={15} className={inputText.trim() && !isSending ? 'translate-x-0.5' : ''} />
                </button>
              </form>

              {/* Bottom Micro Footer */}
              <div className="mt-2 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#94A3B8]/40 select-none">
                <span>Powered by Converse-AI Intelligence Engine</span>
                <span className="hidden sm:inline">Press Enter to send</span>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ────────────────────────────────────────────────────────── */}
      {/* Footer                                                    */}
      {/* ────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 w-full py-3 text-center select-none border-t border-[#1E2933]/40">
        <p className="text-[10px] text-[#94A3B8]/40 font-mono">
          Converse-AI • Real-Time Scoped AI Assistant
        </p>
      </footer>

    </div>
  );
}
