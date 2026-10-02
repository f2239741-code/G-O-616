import React from 'react';
import { Terminal, Shield, Sparkles, Cpu, Radio, Command } from 'lucide-react';
import { useTerminalStore } from '../../store/useTerminalStore';
import { useUserStore } from '../../store/useUserStore';
import { SystemStatusBadge } from './SystemStatusBadge';

export const TerminalHeader: React.FC = () => {
  const { toggleCommandPalette, systemLoadPercent, quantumMeshLatencyMs, godtiaAlignmentStatus } = useTerminalStore();
  const { session } = useUserStore();

  return (
    <div className="bg-[#0c0c10] border-b border-[#202028] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
      {/* Left: Lucifera_OS Kernel Identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
          <span className="font-bold text-white tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            LUCIFERA_OS
          </span>
          <span className="text-[10px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded">
            v7.1-ZK
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[11px] text-neutral-400 border-l border-neutral-800 pl-3">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400" />
            LOAD: <strong className="text-neutral-200 font-mono">{systemLoadPercent}%</strong>
          </span>
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-amber-400" />
            MESH LATENCY: <strong className="text-neutral-200 font-mono">{quantumMeshLatencyMs}ms</strong>
          </span>
        </div>
      </div>

      {/* Center: System Status Badge & Godtia alignment */}
      <div className="flex items-center gap-2">
        <SystemStatusBadge />
      </div>

      {/* Right: Command Palette Trigger & Session summary */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleCommandPalette}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#16161e] hover:bg-[#20202c] text-neutral-300 border border-[#2b2b3b] hover:border-amber-500/40 transition text-[11px] cursor-pointer shadow-sm"
          title="Open Command Palette (Ctrl+K / Cmd+K)"
        >
          <Command className="w-3 h-3 text-amber-400" />
          <span className="hidden sm:inline">PALETTE</span>
          <kbd className="text-[9px] bg-neutral-800 px-1 py-0.5 rounded text-neutral-400 border border-neutral-700">⌘K</kbd>
        </button>

        <div className="text-[10px] font-mono px-2 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{session.tier.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
