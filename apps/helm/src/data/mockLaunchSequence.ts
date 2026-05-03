import { TimelineEventNode } from '../store/useTimelineStore';
import { Edge } from 'reactflow';

export const MOCK_ANCHOR_DATE = new Date('2026-05-01T00:00:00Z');

const dateToX = (dateStr: string) => {
  const date = new Date(dateStr);
  const diffInDays = (date.getTime() - MOCK_ANCHOR_DATE.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays * 50; 
};

// We scrap the absolute Lane Y positions.
// Instead, nodes will branch off a central horizontal axis.
// Y = 0 is the center line.
// Negative Y goes UP from the center line.
// Positive Y goes DOWN from the center line.
export const BRANCH_POSITIONS = {
  up1: -120,
  up2: -240,
  down1: 120,
  down2: 240,
  center: 0
};

// We map lanes to branch directions just for logic grouping now, not grid rows.
export const MOCK_LANES = [
  { id: 'brickell', label: 'Brickell (Anchor)' },
  { id: 'coral-gables', label: 'Coral Gables' },
  { id: 'aventura', label: 'Aventura' },
  { id: 'marketing', label: 'Brand & Marketing' },
];

export const MOCK_NODES: TimelineEventNode[] = [
  // --- CENTER LINE (Major Anchors) ---
  {
    id: 'b-launch',
    type: 'chronos',
    position: { x: dateToX('2026-08-01'), y: BRANCH_POSITIONS.center },
    data: {
      label: 'Launch: Brickell Chapter',
      startDate: new Date('2026-08-01'),
      type: 'milestone',
      laneId: 'brickell',
      isAiExtracted: true,
      confidence: 98,
    },
  },
  {
    id: 'cg-launch',
    type: 'chronos',
    position: { x: dateToX('2026-11-01'), y: BRANCH_POSITIONS.center },
    data: {
      label: 'Launch: Coral Gables',
      startDate: new Date('2026-11-01'),
      type: 'milestone',
      laneId: 'coral-gables',
      isAiExtracted: true,
      confidence: 90,
    },
  },
  {
    id: 'av-launch',
    type: 'chronos',
    position: { x: dateToX('2027-08-01'), y: BRANCH_POSITIONS.center },
    data: {
      label: 'Launch: Aventura',
      startDate: new Date('2027-08-01'),
      type: 'milestone',
      laneId: 'aventura',
      isAiExtracted: true,
      confidence: 75,
    },
  },

  // --- BRANCHING UP (Prep Work & Marketing) ---
  {
    id: 'm-founder-pitch',
    type: 'chronos',
    position: { x: dateToX('2026-05-04'), y: BRANCH_POSITIONS.up2 },
    data: {
      label: 'Pitch Slice 1 to Founders',
      startDate: new Date('2026-05-04'),
      type: 'milestone',
      laneId: 'marketing',
      isAiExtracted: false,
    },
  },
  {
    id: 'b-prep',
    type: 'chronos',
    position: { x: dateToX('2026-05-15'), y: BRANCH_POSITIONS.up1 },
    data: {
      label: 'Brickell Pre-Marketing',
      startDate: new Date('2026-05-15'),
      endDate: new Date('2026-07-01'),
      type: 'phase',
      laneId: 'brickell',
      isAiExtracted: true,
      confidence: 95,
    },
  },
  {
    id: 'cg-prep',
    type: 'chronos',
    position: { x: dateToX('2026-08-15'), y: BRANCH_POSITIONS.up1 },
    data: {
      label: 'Coral Gables Soft Launch',
      startDate: new Date('2026-08-15'),
      type: 'phase',
      laneId: 'coral-gables',
      isAiExtracted: true,
      confidence: 80,
    },
  },

  // --- BRANCHING DOWN (Post-Launch & Logistics) ---
  {
    id: 'b-core-seats',
    type: 'chronos',
    position: { x: dateToX('2027-02-01'), y: BRANCH_POSITIONS.down1 },
    data: {
      label: '16 Core Seats Filled',
      startDate: new Date('2027-02-01'),
      type: 'milestone',
      laneId: 'brickell',
      isAiExtracted: false,
    },
  },
];

export const MOCK_EDGES: Edge[] = [
  // The central spine
  { id: 'spine-1', source: 'b-launch', target: 'cg-launch', type: 'smoothstep', style: { strokeWidth: 3, stroke: '#3b82f6' } },
  { id: 'spine-2', source: 'cg-launch', target: 'av-launch', type: 'smoothstep', style: { strokeWidth: 3, stroke: '#3b82f6' } },
  
  // Branches
  { id: 'e-m-pitch-b-prep', source: 'm-founder-pitch', target: 'b-prep', type: 'step' },
  { id: 'e-b-prep-launch', source: 'b-prep', target: 'b-launch', type: 'step', animated: true },
  { id: 'e-cg-prep-launch', source: 'cg-prep', target: 'cg-launch', type: 'step', animated: true },
  { id: 'e-b-launch-core', source: 'b-launch', target: 'b-core-seats', type: 'step' },
];