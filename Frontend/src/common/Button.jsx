"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'lg', 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) {
  const baseStyle = "relative inline-flex items-center justify-center font-semibold transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
  
  const variants = {
    primary: "bg-primary text-background hover:bg-white border border-transparent shadow-lg shadow-primary/5",
    secondary: "bg-surface hover:bg-surface-elevated text-primary border border-border hover:border-secondary/30",
    accent: "bg-accent text-primary hover:bg-opacity-90 border border-transparent shadow-lg shadow-accent/20",
    outline: "bg-transparent text-primary border border-border hover:border-secondary/40 hover:bg-surface/30",
    danger: "bg-error/10 text-error hover:bg-error/20 border border-error/25",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-2.5 text-sm rounded-xl",
    lg: "px-8 py-3.5 text-base rounded-xl",
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: disabled ? 0 : -2, scale: disabled ? 1 : 1.01 }}
      whileTap={{ y: 0, scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
