"use client";

import React, { useState } from 'react';

export default function Textarea({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  rows = 4,
  className = '',
  id,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const textareaId = id || `textarea-${label ? label.replace(/\s+/g, '-').toLowerCase() : Math.random()}`;

  return (
    <div className={`relative w-full ${className}`}>
      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder={focused ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={(e) => setFocused(e.target.value !== '')}
        className="w-full px-4 pt-6 pb-2 bg-surface text-primary text-sm border border-border rounded-xl focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200 outline-none resize-none placeholder-secondary/50"
        {...props}
      />
      {label && (
        <label
          htmlFor={textareaId}
          className={`absolute left-4 transition-all duration-200 pointer-events-none text-xs font-medium uppercase tracking-wider ${
            focused || value
              ? 'top-2 text-accent'
              : 'top-4 text-secondary'
          }`}
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
    </div>
  );
}
