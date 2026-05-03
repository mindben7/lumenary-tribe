'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sampleTimelineData } from '@/data/sampleTimeline';

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
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent injecting scripts multiple times
    if (document.getElementById('timelinejs-css')) {
      setIsReady(true);
      return;
    }

    // 1. Load Knight Lab CSS
    const link = document.createElement('link');
    link.id = 'timelinejs-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css';
    document.head.appendChild(link);

    // 2. Load Knight Lab JS
    const script = document.createElement('script');
    script.id = 'timelinejs-script';
    script.src = 'https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js';
    script.async = true;
    script.onload = () => setIsReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    // Only initialize if ready, ref exists, timeline object exists, and NOT already initialized
    if (isReady && timelineRef.current && window.TL && !initialized.current) {
      initialized.current = true; // Lock it so React Strict Mode doesn't double-render
      
      new window.TL.Timeline(timelineRef.current, sampleTimelineData, {
        hash_bookmark: false,
        initial_zoom: 2,
        timenav_position: 'bottom',
        width: '100%',
        height: '100%',
      });
    }
  }, [isReady]);

  return (
    <div className="w-full h-full relative bg-white">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-400 z-10">
          Loading Knight Lab TimelineJS...
        </div>
      )}
      <div 
        ref={timelineRef} 
        className="w-full h-full absolute inset-0" 
        id="timeline-embed" 
      />
    </div>
  );
};