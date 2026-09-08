"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

/**
 * Reusable Premium Legal Accordion Component
 * Handles expandable/collapsible dropdown sections with smooth animation and accessible ARIA attributes.
 *
 * @param {Array<{id: string, number: string, title: string, content: React.ReactNode}>} items
 * @param {string} [initialOpenId] - Optional section id to be open by default
 */
export default function LegalAccordion({ items = [], initialOpenId }) {
  const prefersReducedMotion = useReducedMotion();
  const [openIds, setOpenIds] = useState(() => {
    const initial = new Set();
    if (initialOpenId) {
      initial.add(initialOpenId);
    }
    return initial;
  });

  const toggleItem = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full space-y-3 sm:space-y-3.5">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`w-full rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-[#0B1117]/95 border border-[#3B82F6]/45 shadow-[0_12px_35px_-10px_rgba(59,130,246,0.12)] ring-1 ring-[#3B82F6]/20'
                : 'bg-[#0B1117]/80 backdrop-blur-xl border border-[#1E2933] hover:border-[#1E2933]/90 hover:bg-[#101820]/70'
            }`}
          >
            {/* Clickable Header Trigger */}
            <button
              id={headerId}
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-4.5 text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-2xl select-none"
            >
              {/* Left: Section Number & Title */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                <span
                  className={`font-mono text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border shrink-0 transition-colors duration-200 ${
                    isOpen
                      ? 'bg-[#3B82F6]/15 text-[#67E8F9] border-[#3B82F6]/40'
                      : 'bg-[#101820] text-[#3B82F6] border-[#1E2933] group-hover:border-[#3B82F6]/30'
                  }`}
                >
                  {item.number}
                </span>

                <span
                  className={`text-xs sm:text-sm md:text-[15px] font-bold tracking-tight transition-colors duration-200 truncate sm:whitespace-normal ${
                    isOpen
                      ? 'text-[#F1F5F9]'
                      : 'text-[#F1F5F9]/90 group-hover:text-[#F1F5F9]'
                  }`}
                >
                  {item.title}
                </span>
              </div>

              {/* Right: Expand/Collapse Indicator Icon */}
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                  isOpen
                    ? 'bg-[#3B82F6] text-[#F1F5F9] border-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                    : 'bg-[#101820] text-[#94A3B8] border-[#1E2933] group-hover:border-[#3B82F6]/40 group-hover:text-[#F1F5F9]'
                }`}
                aria-hidden="true"
              >
                {isOpen ? (
                  <Minus size={13} strokeWidth={2.5} />
                ) : (
                  <Plus size={13} strokeWidth={2.5} />
                )}
              </div>
            </button>

            {/* Expandable Content Panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: prefersReducedMotion ? 1 : 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: prefersReducedMotion ? 1 : 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-4.5 sm:pb-6 pt-2 sm:pt-2.5 text-xs sm:text-[13.5px] text-[#94A3B8] leading-relaxed border-t border-[#1E2933]/60 space-y-2.5">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
