'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TimelineEventNode } from '@/store/useTimelineStore';

export const ChronosNode = memo(({ data, selected }: NodeProps<TimelineEventNode['data']>) => {
  const isPhase = data.type === 'phase';
  const isMilestone = data.type === 'milestone';

  return (
    <div className={`
      px-4 py-2 shadow-md rounded-md border-2 bg-white
      ${selected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
      ${isPhase ? 'min-w-[150px]' : 'min-w-[100px]'}
    `}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase text-gray-400">
            {data.type}
          </span>
          {data.isAiExtracted && (
            <span className="text-[10px] bg-purple-100 text-purple-700 px-1 rounded" title={`Confidence: ${data.confidence}%`}>
              AI
            </span>
          )}
        </div>
        
        <div className="text-sm font-bold text-gray-800 truncate">
          {data.label}
        </div>
        
        <div className="text-[10px] text-gray-500 mt-1">
          {data.startDate.toLocaleDateString()}
          {data.endDate && ` - ${data.endDate.toLocaleDateString()}`}
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-blue-400" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-blue-400" />
    </div>
  );
});

ChronosNode.displayName = 'ChronosNode';
