'use client';

import React, { useCallback, useMemo, useRef } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Panel,
  useReactFlow,
  ReactFlowProvider,
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useTimelineStore } from '@/store/useTimelineStore';
import { IngestionPanel } from './IngestionPanel';
import { ChronosNode } from './ChronosNode';
import { TimeAxis } from './TimeAxis';

const nodeTypes: NodeTypes = {
  chronos: ChronosNode,
};

const TimelineCanvasInner = () => {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    zoomLevel
  } = useTimelineStore();
  
  const { setViewport, getViewport } = useReactFlow();
  
  const handleWheel = useCallback((event: React.WheelEvent) => {
    // Only scroll horizontally if not holding Shift
    if (!event.shiftKey) {
      const { x, y, zoom } = getViewport();
      // Translate Y delta to X translation
      setViewport({ x: x - event.deltaY, y, zoom }, { duration: 0 });
    }
  }, [getViewport, setViewport]);

  return (
    <div className="w-full h-full relative" onWheel={handleWheel}>
      <TimeAxis />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-left" className="!top-12">
          <IngestionPanel />
        </Panel>
        <Panel position="top-right" className="bg-white p-2 border rounded shadow-md !top-12">
          Zoom: {zoomLevel}px/day
        </Panel>
      </ReactFlow>
    </div>
  );
};

export const TimelineCanvas = () => (
  <ReactFlowProvider>
    <TimelineCanvasInner />
  </ReactFlowProvider>
);
