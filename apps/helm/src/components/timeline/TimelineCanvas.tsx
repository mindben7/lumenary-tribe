'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Panel,
  useReactFlow,
  ReactFlowProvider,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useTimelineStore } from '@/store/useTimelineStore';
import { IngestionPanel } from './IngestionPanel';
import { ChronosNode } from './ChronosNode';
import { TimeAxis } from './TimeAxis';
import { LaneBackgrounds } from './LaneBackgrounds';
import { MOCK_NODES, MOCK_EDGES } from '@/data/mockLaunchSequence';

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
    setNodes,
    setEdges
  } = useTimelineStore();
  
  const { setViewport, getViewport } = useReactFlow();
  const [isMounted, setIsMounted] = useState(false);

  // Initialize nodes/edges only on mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    if (nodes.length === 0) {
      setNodes(MOCK_NODES);
      setEdges(MOCK_EDGES);
    }
  }, []);
  
  const handleWheel = useCallback((event: React.WheelEvent) => {
    if (!event.shiftKey) {
      const { x, y, zoom } = getViewport();
      setViewport({ x: x - event.deltaY, y, zoom }, { duration: 0 });
    }
  }, [getViewport, setViewport]);

  if (!isMounted) return <div className="w-full h-full bg-gray-50 flex items-center justify-center text-zinc-400">Loading Chronos...</div>;

  return (
    <div className="w-full h-full relative overflow-hidden" onWheel={handleWheel}>
      <TimeAxis />
      <LaneBackgrounds />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        minZoom={0.1}
        maxZoom={2}
      >
        <Background gap={50} color="#f0f0f0" />
        <Controls />
        <Panel position="top-left" className="!top-12">
          <IngestionPanel />
        </Panel>
        <Panel position="top-right" className="bg-white p-2 border rounded shadow-md !top-12 text-xs">
          <b>Controls:</b><br/>
          Scroll: Pan time<br/>
          Drag node: Move in time
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
