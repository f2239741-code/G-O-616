import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SynapseNode {
  id: string;
  category: 'architecture' | 'lore' | 'cipher' | 'telemetry';
  label: string;
  resonanceScore: number; // 0 to 100 energetic weight
  metadata: Record<string, any>;
  timestamp: number;
}

interface EmberSynapseState {
  nodes: SynapseNode[];
  activeThreads: string[];
  addNode: (node: Omit<SynapseNode, 'id' | 'timestamp'>) => void;
  updateResonance: (id: string, delta: number) => void;
  purgeMemory: () => void;
}

export const useEmberSynapse = create<EmberSynapseState>()(
  persist(
    (set) => ({
      nodes: [
        {
          id: 'node-genesis',
          category: 'architecture',
          label: 'The Guardian Oracle Core Sanctum',
          resonanceScore: 100,
          metadata: { stack: 'Vite React 19, Tailwind CSS v4, Zustand, Motion', status: 'SYNCHRONIZED' },
          timestamp: Date.now() - 3600000 * 2,
        },
        {
          id: 'node-cipher-matrix',
          category: 'cipher',
          label: 'Multi-Tier Cipher & Translation Engine',
          resonanceScore: 88,
          metadata: { alphabets: ['Theban', 'Malachim', 'Enochian'], status: 'ZK_VERIFIED' },
          timestamp: Date.now() - 3600000,
        },
        {
          id: 'node-acoustic-drone',
          category: 'telemetry',
          label: '108Hz Sanctum Web Audio Engine',
          resonanceScore: 95,
          metadata: { frequency: '108Hz Root / 432Hz Harmonic', active: true },
          timestamp: Date.now() - 1800000,
        },
        {
          id: 'node-qmesh-synchronizer',
          category: 'architecture',
          label: 'Q-Mesh Sovereign Node Cluster',
          resonanceScore: 92,
          metadata: { nodesOnline: 3000, coherenceRate: '99.4%' },
          timestamp: Date.now() - 900000,
        },
        {
          id: 'node-godtia-signature',
          category: 'lore',
          label: 'GODTIA Divine Algorithm Alignment',
          resonanceScore: 99,
          metadata: { directive: 'Love is the Law, Love under Will' },
          timestamp: Date.now() - 300000,
        }
      ],
      activeThreads: ['sanctum-core', 'cipher-routing', 'qmesh-sync'],
      addNode: (newNode) =>
        set((state) => ({
          nodes: [
            ...state.nodes,
            {
              ...newNode,
              id: `node-${Date.now()}`,
              timestamp: Date.now(),
            },
          ],
        })),
      updateResonance: (id, delta) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? { ...node, resonanceScore: Math.min(100, Math.max(0, node.resonanceScore + delta)) }
              : node
          ),
        })),
      purgeMemory: () =>
        set({
          nodes: [
            {
              id: `node-reset-${Date.now()}`,
              category: 'architecture',
              label: 'Core Sanctum System Re-Anchored',
              resonanceScore: 100,
              metadata: { reboot: true },
              timestamp: Date.now(),
            }
          ],
          activeThreads: ['sanctum-reboot'],
        }),
    }),
    {
      name: 'ember-synapse-storage',
    }
  )
);
