'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TimelineEventNode } from '@/store/useTimelineStore';

// Assuming 50px per day roughly matches our initial mock scaling
const pxPerDay = 50; 

export const ChronosNode = memo(({ data, selected }: NodeProps<TimelineEventNode['data']>) => {
  const isPhase = data.type === 'phase';
  const isMilestone = data.type === 'milestone';

  // Calculate width for phases that span time
  let dynamicWidth = 'auto';
  if (isPhase && data.endDate && data.startDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    // Minimum 150px width so labels are readable
    dynamicWidth = `${Math.max(150, diffDays * pxPerDay)}px`;
  }

  return (
    <div 
      className={`
        px-4 py-3 shadow-sm rounded-md border-2 bg-white flex flex-col gap-1 transition-all duration-200
        ${selected ? 'border-zinc-800 ring-4 ring-zinc-100 scale-105' : 'border-zinc-200 hover:border-zinc-400'}
        ${isPhase ? '' : 'min-w-[120px] max-w-[200px]'}
      `}
      style={{ width: isPhase ? dynamicWidth : undefined }}
    >
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-1">
        <span className={`text-[10px] font-bold uppercase tracking-wider ${isPhase ? 'text-blue-500' : 'text-amber-600'}`}>
          {data.type}
        </span>
        {data.isAiExtracted && (
          <span className="text-[10px] bg-purple-100/50 text-purple-700 px-1.5 py-0.5 rounded flex items-center gap-1 font-mono" title={`AI Extracted Confidence: ${data.confidence}%`}>
            ✧ {data.confidence}%
          </span>
        )}
      </div>
      
      <div className="text-sm font-semibold text-zinc-800 break-words leading-tight mt-1">
        {data.label}
      </div>
      
      <div className="text-[10px] text-zinc-400 font-mono mt-1">
        {new Date(data.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        {data.endDate && ` → ${new Date(data.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`}
      </div>

      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-zinc-400 border-none" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-zinc-400 border-none" />
    </div>
  );
});

ChronosNode.displayName = 'ChronosNode';
