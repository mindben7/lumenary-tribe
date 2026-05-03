'use client';

import React, { useState } from 'react';
import { ingestTimelineData } from '@/actions/ingestTimeline';
import { useTimelineStore } from '@/store/useTimelineStore';
import { TimelineEventNode } from '@/store/useTimelineStore';

export const IngestionPanel = () => {
  const [isIngesting, setIsIngesting] = useState(false);
  const { setNodes, anchorDate, dateToX } = useTimelineStore();

  const handleIngest = async () => {
    setIsIngesting(true);
    try {
      // Hardcoded for MVP demo to target the binder
      const result = await ingestTimelineData('docs/research/00-evidence-binder.md', 'dummy-id', anchorDate);
      
      if (result.success && result.events) {
        // Build a unique list of lanes to assign stable Y coordinates
        const laneIds = Array.from(new Set(result.events.map((e: any) => e.lane_id)));
        
        // Map AI's JSON output to React Flow nodes with scaled X positions
        const newNodes: TimelineEventNode[] = result.events.map((event: any, index: number) => {
          const start = new Date(event.start_date);
          const laneIndex = laneIds.indexOf(event.lane_id);
          const yPos = laneIndex * 150 + 50; // 150px vertical spacing per lane
          
          return {
            id: `node-${index}`,
            type: 'chronos', // Using our custom node
            position: { x: dateToX(start), y: yPos },
            data: {
              label: event.label,
              startDate: start,
              endDate: event.end_date ? new Date(event.end_date) : undefined,
              type: event.type,
              laneId: event.lane_id,
              isAiExtracted: true,
              confidence: event.confidence,
            },
          };
        });
        
        setNodes(newNodes);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsIngesting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl border flex flex-col gap-2">
      <h3 className="font-bold text-sm">AI Ingestion Pipeline</h3>
      <button 
        onClick={handleIngest}
        disabled={isIngesting}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isIngesting ? 'Ingesting Binder...' : 'Extract Miami Launch Sequence'}
      </button>
    </div>
  );
};
