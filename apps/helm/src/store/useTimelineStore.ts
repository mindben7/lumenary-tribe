import { create } from 'zustand';
import { 
  Connection, 
  Edge, 
  EdgeChange, 
  Node, 
  NodeChange, 
  addEdge, 
  applyNodeChanges, 
  applyEdgeChanges 
} from 'reactflow';
import { MOCK_NODES, MOCK_EDGES, MOCK_ANCHOR_DATE, MOCK_LANES } from '../data/mockLaunchSequence';

export type TimelineEventNode = Node & {
  data: {
    label: string;
    startDate: Date;
    endDate?: Date;
    type: 'milestone' | 'task' | 'phase';
    laneId: string;
    isAiExtracted: boolean;
    confidence?: number;
  };
};

interface TimelineState {
  nodes: TimelineEventNode[];
  edges: Edge[];
  zoomLevel: number;
  anchorDate: Date;
  activeLanes: string[];
  
  // React Flow handlers
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  
  // Timeline actions
  setNodes: (nodes: TimelineEventNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  setZoomLevel: (zoom: number) => void;
  setAnchorDate: (date: Date) => void;
  toggleLane: (laneId: string) => void;
  
  // Scaling helpers
  dateToX: (date: Date) => number;
  xToDate: (x: number) => Date;
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  nodes: MOCK_NODES,
  edges: MOCK_EDGES,
  zoomLevel: 10, // 10px per hour
  anchorDate: MOCK_ANCHOR_DATE,
  activeLanes: MOCK_LANES.map(l => l.id),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as TimelineEventNode[],
    });
  },
  
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setZoomLevel: (zoomLevel) => set({ zoomLevel }),
  setAnchorDate: (anchorDate) => set({ anchorDate }),
  
  toggleLane: (laneId) => {
    const { activeLanes } = get();
    set({
      activeLanes: activeLanes.includes(laneId)
        ? activeLanes.filter((id) => id !== laneId)
        : [...activeLanes, laneId],
    });
  },

  dateToX: (date: Date) => {
    const { anchorDate, zoomLevel } = get();
    const diffInHours = (date.getTime() - anchorDate.getTime()) / (1000 * 60 * 60);
    return diffInHours * zoomLevel;
  },

  xToDate: (x: number) => {
    const { anchorDate, zoomLevel } = get();
    const diffInHours = x / zoomLevel;
    return new Date(anchorDate.getTime() + diffInHours * 1000 * 60 * 60);
  },

  scrollTime: (deltaX: number) => {
    // This will be used to update the viewport based on mouse wheel
    // React Flow handles its own viewport state, but we can sync with it
  },
}));
