"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
  selected = false,
  elevation = 'subtle',
  ...props
}) {
  const isClickable = !!onClick || hoverable;
  
  const elevations = {
    none: "border border-border bg-surface",
    subtle: "border border-border bg-surface shadow-sm shadow-background/50",
    elevated: "border border-border/70 bg-surface-elevated shadow-md shadow-background/70",
  };

  const selectionStyles = selected
    ? "border-accent/80 shadow-lg shadow-accent/5 ring-1 ring-accent/30"
    : "hover:border-border/80";

  const content = (
    <div
      onClick={onClick}
      className={`rounded-3xl p-6 transition-colors duration-200 ${elevations[elevation]} ${selectionStyles} ${isClickable ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );

  if (isClickable) {
    return (
      <motion.div
        whileHover={{ 
          y: -4, 
          scale: 1.01,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        whileTap={{ y: 0, scale: 0.99 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
