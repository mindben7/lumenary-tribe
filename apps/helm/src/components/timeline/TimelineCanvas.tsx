'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scaleTime } from 'd3-scale';
import { assignTracks, TimelineEvent } from '@/utils/timelineLogic';

// Sample Data derived from the Slice 1 Launch Sequence, but with explicit start/end dates for the overlap algorithm
const sampleData: TimelineEvent[] = [
  { id: "1", title: "Founder Pitch", start: new Date("2026-05-04"), end: new Date("2026-05-05"), description: "Presenting Slice 1 Research Binder to founding team." },
  { id: "2", title: "Brickell Pre-Marketing", start: new Date("2026-05-15"), end: new Date("2026-07-01"), description: "Activating warm channels: BNI, Rotary, Founders." },
  { id: "3", title: "Launch: Brickell Chapter", start: new Date("2026-08-01"), end: new Date("2026-08-15"), description: "The Anchor Chapter goes live. Target 16 core seats." },
  { id: "4", title: "Coral Gables Soft Launch", start: new Date("2026-08-15"), end: new Date("2026-10-15"), description: "Absorbing Brickell overflow. Skew towards medical/multinational." },
  { id: "5", title: "Launch: Coral Gables", start: new Date("2026-11-01"), end: new Date("2026-11-15"), description: "Chapter 2 goes live." },
  { id: "6", title: "Brickell 16 Core Seats Filled", start: new Date("2027-02-01"), end: new Date("2027-02-15"), description: "Legal/financial/CRE triangle locked in." },
  { id: "7", title: "Launch: Aventura", start: new Date("2027-08-01"), end: new Date("2027-08-15"), description: "Chapter 3 goes live. Wealth management corridor." }
];

export const TimelineCanvas = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  
  // Calculate vertical track assignments automatically to prevent overlap
  const events = useMemo(() => assignTracks(sampleData), []);

  // Map Time to X-Axis Pixels
  const timeScale = scaleTime()
    .domain([new Date("2026-04-01"), new Date("2027-12-01")])
    .range([100, 3900]); // Total scrollable canvas width (4000px)
    
  const TRACK_HEIGHT = 100; // Pixels between vertical branches

  // Escape key listener for modal dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden font-sans text-white">
      
      {/* --- THE TIMELINE CANVAS --- */}
      <motion.div 
        className="absolute top-1/2 left-0 w-[4000px] h-[800px] -translate-y-1/2 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -3000, right: 0 }}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }} // Physics-based inertia friction
      >
        {/* X-Axis Center Trunk Line */}
        <div className="absolute w-full h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-amber-500/50 top-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(59,130,246,0.3)] rounded-full" />

        {/* SVG Bezier Curves (Connecting Branches to Trunk) */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {events.map((event) => {
            const xPos = timeScale(event.start) + 20; 
            const yCenter = 400; // Half of our 800px wrapper height
            const yNode = yCenter + ((event.track || 0) * TRACK_HEIGHT);
            
            // Draw a smooth bezier curve from the center line to the node
            return (
              <path
                key={`line-${event.id}`}
                d={`M ${xPos} ${yCenter} Q ${xPos} ${yNode}, ${xPos + 20} ${yNode}`}
                stroke="rgba(148, 163, 184, 0.3)" // slate-400 with opacity
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </svg>

        {/* Interactive Morphing Nodes */}
        {events.map((event) => {
          const xPos = timeScale(event.start);
          const width = timeScale(event.end) - timeScale(event.start);
          const yPos = (event.track || 0) * TRACK_HEIGHT;

          return (
            <motion.div
              layoutId={`event-container-${event.id}`}
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="absolute h-12 bg-slate-800/90 backdrop-blur-md border border-slate-600 rounded-full flex items-center px-4 cursor-pointer hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:bg-slate-700 transition-colors z-10"
              style={{
                left: xPos,
                width: Math.max(width, 180), // Ensures very short events still look like clickable pills
                top: `calc(50% - 24px + ${yPos}px)`, // Center vertically around its track line
              }}
            >
              <motion.span layoutId={`event-title-${event.id}`} className="text-sm text-slate-100 font-semibold truncate pointer-events-none">
                {event.title}
              </motion.span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* --- THE FULL-SCREEN EXPANSION MODAL --- */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* Background Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 cursor-pointer"
            />
            
            {/* The Morphing Card */}
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
              <motion.div
                layoutId={`event-container-${selectedEvent.id}`}
                className="w-[90%] max-w-2xl h-[60vh] bg-slate-900 border border-blue-500/50 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.2)] p-10 flex flex-col pointer-events-auto overflow-hidden"
              >
                <motion.h2 layoutId={`event-title-${selectedEvent.id}`} className="text-3xl font-bold text-blue-400 mb-2">
                  {selectedEvent.title}
                </motion.h2>
                
                {/* Content fades in AFTER the layout morph finishes to avoid layout jank during animation */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ delay: 0.15 }}
                  className="flex flex-col h-full mt-4"
                >
                  <p className="text-xs text-slate-400 mb-6 tracking-widest uppercase font-mono">
                    {selectedEvent.start.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} 
                    {selectedEvent.start.getTime() !== selectedEvent.end.getTime() && ` — ${selectedEvent.end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`}
                  </p>
                  
                  <div className="text-slate-300 leading-relaxed text-lg flex-grow">
                    {selectedEvent.description}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="self-end mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full text-slate-200 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Close (Esc)
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};