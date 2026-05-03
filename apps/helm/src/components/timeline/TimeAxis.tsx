'use client';

import React from 'react';
import { useReactFlow } from 'reactflow';
import { useTimelineStore } from '@/store/useTimelineStore';

export const TimeAxis = () => {
  const { getViewport } = useReactFlow();
  const { zoomLevel, xToDate } = useTimelineStore();
  
  // Calculate bounds based on viewport
  const viewport = getViewport();
  
  // Simple heuristic: draw a tick every 500px on the screen
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const numTicks = Math.floor(windowWidth / 200);
  
  const ticks = [];
  for (let i = 0; i < numTicks; i++) {
    // X position in the canvas coordinate system
    const canvasX = (-viewport.x + (i * 200)) / viewport.zoom;
    const dateAtX = xToDate(canvasX);
    
    ticks.push({
      x: canvasX,
      label: dateAtX.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
    });
  }

  return (
    <div className="absolute top-0 left-0 w-full h-10 border-b bg-gray-50/90 backdrop-blur z-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full"
        style={{
           transform: `translate(${viewport.x}px, 0) scale(${viewport.zoom})`,
           transformOrigin: '0 0'
        }}
      >
        {ticks.map((tick, i) => (
          <div 
            key={i} 
            className="absolute top-0 h-full border-l border-gray-300 pl-1 text-xs text-gray-500 font-mono flex items-end pb-1"
            style={{ left: `${tick.x}px` }}
          >
            <div style={{ transform: `scale(${1 / viewport.zoom})`, transformOrigin: '0 100%' }}>
              {tick.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
