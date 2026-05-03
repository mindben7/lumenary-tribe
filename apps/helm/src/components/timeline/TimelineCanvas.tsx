'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sampleTimelineData } from '@/data/sampleTimeline';

// Extend window object to recognize TimelineJS
declare global {
  interface Window {
    TL?: {
      Timeline: any;
    };
  }
}

export const TimelineCanvas = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Load Knight Lab CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css';
    document.head.appendChild(link);

    // 2. Load Knight Lab JS
    const script = document.createElement('script');
    script.src = 'https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js';
    script.async = true;
    script.onload = () => setIsReady(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup to prevent duplicate injections on re-renders
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isReady && timelineRef.current && window.TL) {
      // Initialize TimelineJS natively with our local sample data
      new window.TL.Timeline(timelineRef.current, sampleTimelineData, {
        hash_bookmark: false,
        initial_zoom: 2,
        timenav_position: 'bottom',
      });
    }
  }, [isReady]);

  return (
    <div className="w-full h-full relative bg-gray-50">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-400 z-10">
          Loading Knight Lab TimelineJS...
        </div>
      )}
      {/* TimelineJS requires a container with explicit dimensions, usually 100% width/height */}
      <div ref={timelineRef} className="w-full h-full" id="timeline-embed" />
    </div>
  );
};