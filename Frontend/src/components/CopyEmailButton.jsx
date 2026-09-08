"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyEmailButton({ email = 'contact@converse.ai' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback if clipboard API fails
      const el = document.createElement('textarea');
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#101820] hover:bg-[#1E2933] border border-[#1E2933] hover:border-[#3B82F6]/40 text-xs font-mono text-[#94A3B8] hover:text-[#F1F5F9] transition-all cursor-pointer shadow-xs active:scale-95"
      aria-label="Copy email address to clipboard"
    >
      {copied ? (
        <>
          <Check size={13} className="text-[#06B6D4]" />
          <span className="text-[#06B6D4] font-medium">Copied</span>
        </>
      ) : (
        <>
          <Copy size={13} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
