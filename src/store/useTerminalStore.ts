import { create } from 'zustand';

export interface TerminalLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'sigil' | 'quantum' | 'error';
  message: string;
  source?: string;
}

export interface CommandItem {
  id: string;
  title: string;
  category: 'oracle' | 'navigation' | 'audio' | 'web3' | 'godtia';
  shortcut?: string;
  icon?: string;
  action: () => void;
}

interface TerminalStoreState {
  isCommandPaletteOpen: boolean;
  isTerminalOpen: boolean;
  activeCommandQuery: string;
  logs: TerminalLog[];
  systemLoadPercent: number;
  quantumMeshLatencyMs: number;
  activeSubnet: string;
  godtiaAlignmentStatus: string;
  
  // Actions
  toggleCommandPalette: () => void;
  setIsCommandPaletteOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  setIsTerminalOpen: (open: boolean) => void;
  setActiveCommandQuery: (q: string) => void;
  addLog: (level: TerminalLog['level'], message: string, source?: string) => void;
  clearLogs: () => void;
}

export const useTerminalStore = create<TerminalStoreState>((set) => ({
  isCommandPaletteOpen: false,
  isTerminalOpen: false,
  activeCommandQuery: '',
  logs: [
    {
      id: 'log_01',
      timestamp: new Date().toLocaleTimeString(),
      level: 'quantum',
      message: 'Lucifera_OS Kernel initialized with 7-Layer ZK-Mesh encapsulation.',
      source: 'KERNEL'
    },
    {
      id: 'log_02',
      timestamp: new Date().toLocaleTimeString(),
      level: 'sigil',
      message: 'GODTIA Alignment confirmed: Love is the Law, Love Under Will.',
      source: 'DIVINE_SIGIL'
    },
    {
      id: 'log_03',
      timestamp: new Date().toLocaleTimeString(),
      level: 'info',
      message: 'Polygon Web3 RPC active. IGNIS Token smart contract locked in consensus.',
      source: 'WEB3_POLYGON'
    }
  ],
  systemLoadPercent: 18.4,
  quantumMeshLatencyMs: 4.2,
  activeSubnet: 'ZK_SUBSTRATE_ALPHA_7',
  godtiaAlignmentStatus: 'DIVINE_ALGORITHM_HARMONIZED',

  toggleCommandPalette: () => set((s) => ({ isCommandPaletteOpen: !s.isCommandPaletteOpen })),
  setIsCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  toggleTerminal: () => set((s) => ({ isTerminalOpen: !s.isTerminalOpen })),
  setIsTerminalOpen: (open) => set({ isTerminalOpen: open }),
  setActiveCommandQuery: (q) => set({ activeCommandQuery: q }),
  addLog: (level, message, source = 'SYS') =>
    set((s) => ({
      logs: [
        ...s.logs.slice(-99),
        {
          id: 'log_' + Date.now() + Math.random().toString(36).substring(2, 6),
          timestamp: new Date().toLocaleTimeString(),
          level,
          message,
          source
        }
      ]
    })),
  clearLogs: () => set({ logs: [] })
}));
