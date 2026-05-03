'use client';

import React from 'react';
import { useReactFlow } from 'reactflow';
import { MOCK_LANES, LANE_Y_POSITIONS } from '@/data/mockLaunchSequence';

export const LaneBackgrounds = () => {
  const { getViewport } = useReactFlow();
  const { y, zoom } = getViewport();

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
      <div 
        className="absolute top-0 left-0 w-full"
        style={{
          transform: `translateY(${y}px) scaleY(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {MOCK_LANES.map((lane) => {
          // Adjust y position by subtracting half the approximate node height to center the lane label
          const laneY = LANE_Y_POSITIONS[lane.id as keyof typeof LANE_Y_POSITIONS] - 50; 
          return (
            <div 
              key={lane.id}
              className="absolute left-0 w-full border-t border-dashed border-gray-200/50 flex items-start"
              style={{ top: `${laneY}px`, height: '200px' }}
            >
              <div 
                className="sticky left-4 top-4 text-xs font-bold text-gray-300 uppercase tracking-widest pl-2"
                style={{ transform: `scaleY(${1 / zoom})`, transformOrigin: '0 0' }}
              >
                {lane.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};