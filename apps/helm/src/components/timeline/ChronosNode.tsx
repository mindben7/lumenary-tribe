'use client';

import React, { memo, useMemo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TimelineEventNode } from '@/store/useTimelineStore';

const pxPerDay = 50; 

export const ChronosNode = memo(({ data, selected }: NodeProps<TimelineEventNode['data']>) => {
  const isPhase = data.type === 'phase';
  
  const { startDate, endDate, label, type, isAiExtracted, confidence } = data;

  const { dynamicWidth, formattedStart, formattedEnd } = useMemo(() => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    let width = 'auto';
    if (isPhase && start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      width = `${Math.max(150, diffDays * pxPerDay)}px`;
    }

    const fs = !isNaN(start.getTime()) 
      ? start.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Invalid Date';
    
    const fe = end && !isNaN(end.getTime())
      ? end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
      : null;

    return { dynamicWidth: width, formattedStart: fs, formattedEnd: fe };
  }, [startDate, endDate, isPhase]);

  return (
    <div 
      className={`
        px-4 py-3 shadow-sm rounded-lg border bg-white/90 backdrop-blur flex flex-col gap-1 transition-all duration-200
        ${selected ? 'border-blue-500 ring-4 ring-blue-500/20 scale-105 shadow-blue-500/20 shadow-xl' : 'border-zinc-200 hover:border-zinc-400 hover:shadow-md'}
        ${isPhase ? '' : 'min-w-[120px] max-w-[200px]'}
      `}
      style={{ width: isPhase ? dynamicWidth : undefined }}
    >
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-1">
        <span className={`text-[10px] font-bold uppercase tracking-wider ${isPhase ? 'text-indigo-500' : 'text-emerald-600'}`}>
          {type}
        </span>
        {isAiExtracted && (
          <span className="text-[10px] bg-purple-100/50 text-purple-700 px-1.5 py-0.5 rounded flex items-center gap-1 font-mono" title={`AI Extracted Confidence: ${confidence}%`}>
            ✧ {confidence}%
          </span>
        )}
      </div>
      
      <div className="text-sm font-semibold text-zinc-800 break-words leading-tight mt-1">
        {label}
      </div>
      
      <div className="text-[10px] text-zinc-400 font-mono mt-1">
        {formattedStart}
        {formattedEnd && ` → ${formattedEnd}`}
      </div>

      {/* Invisible multi-directional handles for organic routing */}
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  );
});

ChronosNode.displayName = 'ChronosNode';
