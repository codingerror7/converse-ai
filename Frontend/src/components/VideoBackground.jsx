"use client";

import React, { useRef, useEffect, useState } from 'react';

export default function VideoBackground() {
  const videoRef = useRef(null);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {
      // Browsers can defer autoplay until the media is ready or the page is visible.
    });
  };

  useEffect(() => {
    startPlayback();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* HTML5 Cinematic Video Element */}
      <video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  aria-hidden="true"
  disablePictureInPicture
  className="absolute inset-0 z-0 h-full w-full object-cover object-center"
>
  <source src="/main.mp4" type="video/mp4" />
</video>

      {/* Fallback dark tone if video is loading */}
      <div
      />

      {/* Layer 1: Very light black overlay to preserve video vibrancy */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Layer 2: Subtle radial gradient behind left-center hero copy */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_28%_45%,rgba(2,2,5,0.45)_0%,rgba(2,2,5,0.15)_60%,transparent_100%)]" />

      {/* Layer 3: Subtle bottom edge gradient for smooth dock contrast */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
      
      {/* Layer 4: Subtle top edge gradient for top dock contrast */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
    </div>
  );
}
