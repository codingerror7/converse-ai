"use client";

import React, { useRef, useEffect, useState } from 'react';

export default function VideoBackground() {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsVideoLoaded(true))
        .catch(() => {
          // Fallback if autoplay is deferred
        });
    }
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
        onLoadedData={() => setIsVideoLoaded(true)}
        disablePictureInPicture
        className={`absolute inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/main.mp4" type="video/mp4" />
      </video>

      {/* Fallback dark tone backdrop */}
      <div className="absolute inset-0 bg-[#06090D] -z-10" />

      {/* Layer 1: Balanced translucent dark overlay for video vibrancy */}
      <div className="absolute inset-0 bg-[#06090D]/50" />

      {/* Layer 2: Precision radial gradient behind hero typography */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_25%_48%,rgba(6,9,13,0.75)_0%,rgba(6,9,13,0.3)_60%,transparent_100%)]" />

      {/* Layer 3: Smooth bottom dock gradient */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#06090D] via-[#06090D]/60 to-transparent" />

      {/* Layer 4: Smooth top navbar pod gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#06090D] via-[#06090D]/50 to-transparent" />

      {/* Layer 5: Subtle top rim specular glass sheen */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/20 to-transparent" />
    </div>
  );
}
