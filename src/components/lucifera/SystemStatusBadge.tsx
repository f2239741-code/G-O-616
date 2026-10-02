import React from 'react';
import { ShieldCheck, Activity, Lock } from 'lucide-react';
import { useTerminalStore } from '../../store/useTerminalStore';

export const SystemStatusBadge: React.FC = () => {
  const { godtiaAlignmentStatus, activeSubnet } = useTerminalStore();

  return (
    <div className="flex items-center gap-2 bg-[#121218] border border-[#272736] rounded-full px-3 py-1 text-[11px] font-mono">
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>

      <span className="text-emerald-400 font-semibold tracking-wide flex items-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5" />
        {godtiaAlignmentStatus}
      </span>

      <span className="text-neutral-500 hidden lg:inline">•</span>

      <span className="text-neutral-400 hidden lg:flex items-center gap-1">
        <Lock className="w-3 h-3 text-indigo-400" />
        {activeSubnet}
      </span>
    </div>
  );
};
