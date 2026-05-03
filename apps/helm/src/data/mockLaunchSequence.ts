import { TimelineEventNode } from '../store/useTimelineStore';
import { Edge } from 'reactflow';

// Hardcoded anchor date to orient the timeline (e.g., today's date)
export const MOCK_ANCHOR_DATE = new Date('2026-05-01T00:00:00Z');

// Helper to calculate X position based on date relative to anchor
// (Simplified helper for initial node positioning, store handles live scaling)
const dateToX = (dateStr: string) => {
  const date = new Date(dateStr);
  const diffInDays = (date.getTime() - MOCK_ANCHOR_DATE.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays * 50; // 50px per day roughly
};

// Define the Y positions for our lanes
export const LANE_Y_POSITIONS = {
  'brickell': 100,
  'coral-gables': 300,
  'aventura': 500,
  'marketing': 700,
};

export const MOCK_LANES = [
  { id: 'brickell', label: 'Brickell (Anchor)' },
  { id: 'coral-gables', label: 'Coral Gables' },
  { id: 'aventura', label: 'Aventura' },
  { id: 'marketing', label: 'Brand & Marketing' },
];

export const MOCK_NODES: TimelineEventNode[] = [
  // --- BRICKELL ---
  {
    id: 'b-prep',
    type: 'chronos',
    position: { x: dateToX('2026-05-15'), y: LANE_Y_POSITIONS['brickell'] },
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
    id: 'b-launch',
    type: 'chronos',
    position: { x: dateToX('2026-08-01'), y: LANE_Y_POSITIONS['brickell'] + 50 },
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
    id: 'b-core-seats',
    type: 'chronos',
    position: { x: dateToX('2027-02-01'), y: LANE_Y_POSITIONS['brickell'] },
    data: {
      label: '16 Core Seats Filled',
      startDate: new Date('2027-02-01'),
      type: 'milestone',
      laneId: 'brickell',
      isAiExtracted: false,
    },
  },
  
  // --- CORAL GABLES ---
  {
    id: 'cg-prep',
    type: 'chronos',
    position: { x: dateToX('2026-08-15'), y: LANE_Y_POSITIONS['coral-gables'] },
    data: {
      label: 'Coral Gables Soft Launch',
      startDate: new Date('2026-08-15'),
      type: 'phase',
      laneId: 'coral-gables',
      isAiExtracted: true,
      confidence: 80,
    },
  },
  {
    id: 'cg-launch',
    type: 'chronos',
    position: { x: dateToX('2026-11-01'), y: LANE_Y_POSITIONS['coral-gables'] + 50 },
    data: {
      label: 'Launch: Coral Gables',
      startDate: new Date('2026-11-01'),
      type: 'milestone',
      laneId: 'coral-gables',
      isAiExtracted: true,
      confidence: 90,
    },
  },

  // --- AVENTURA ---
  {
    id: 'av-launch',
    type: 'chronos',
    position: { x: dateToX('2027-08-01'), y: LANE_Y_POSITIONS['aventura'] },
    data: {
      label: 'Launch: Aventura',
      startDate: new Date('2027-08-01'),
      type: 'milestone',
      laneId: 'aventura',
      isAiExtracted: true,
      confidence: 75,
    },
  },

  // --- MARKETING ---
  {
    id: 'm-founder-pitch',
    type: 'chronos',
    position: { x: dateToX('2026-05-04'), y: LANE_Y_POSITIONS['marketing'] },
    data: {
      label: 'Pitch Slice 1 to Founders',
      startDate: new Date('2026-05-04'),
      type: 'milestone',
      laneId: 'marketing',
      isAiExtracted: false,
    },
  },
];

export const MOCK_EDGES: Edge[] = [
  { id: 'e-b-prep-launch', source: 'b-prep', target: 'b-launch', type: 'smoothstep', animated: true },
  { id: 'e-m-pitch-b-prep', source: 'm-founder-pitch', target: 'b-prep', type: 'smoothstep' },
  { id: 'e-b-launch-cg-prep', source: 'b-launch', target: 'cg-prep', type: 'smoothstep', label: 'Triggers', labelBgStyle: { fill: 'white' } },
];