import React from 'react';

export default function Badge({
  children,
  variant = 'secondary',
  className = '',
}) {
  const baseStyle = "inline-flex items-center px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md border"
  
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-surface-elevated text-secondary border-border",
    accent: "bg-accent/10 text-accent border-accent/25",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
  }

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
