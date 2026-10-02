import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Sprout, Landmark, Users, Flame, Activity, TrendingUp, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useTerminalStore } from '../store/useTerminalStore';
import { WalletConnector } from './web3/WalletConnector';
import { IgnisTokenBalance } from './web3/IgnisTokenBalance';
import { Button } from './ui/button';
import { sanctumAudio } from '../lib/audioEngine';

interface SanctuaryDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenPricing?: () => void;
}

export const SanctuaryDashboard: React.FC<SanctuaryDashboardProps> = ({ onNavigateTab, onOpenPricing }) => {
  const { session } = useUserStore();
  const { godtiaAlignmentStatus } = useTerminalStore();

  const metrics = [
    { label: 'Sanctuary Land Fund Balance', value: '$84,500', change: '+12.4% this cycle', icon: Landmark, color: 'text-amber-400' },
    { label: 'Guardian Bio-Resonance Coherence', value: `${session.coherenceScore}%`, change: 'Optimal heart-mind lock', icon: Activity, color: 'text-cyan-400' },
    { label: 'IGNIS Sovereign Staked Pool', value: '3,450,000 IGNIS', change: '14.2% APY Yield Active', icon: Flame, color: 'text-rose-400' },
    { label: 'Active Sovereign Nodes', value: '142 Nodes', change: 'ZK-QMesh 7-Layer Synced', icon: Shield, color: 'text-emerald-400' }
  ];

  const operationalPillars = [
    {
      id: 'oracle',
      title: 'Living Oracle & Major Arcana',
      desc: 'Commune with Ember UR archetypes and receive zero-knowledge bio-digital guidance.',
      tab: 'oracle_chamber',
      badge: '22 Arcana Active',
      color: 'border-amber-500/30 hover:border-amber-400'
    },
    {
      id: 'landfund',
      title: 'Physical Land Acquisition Fund',
      desc: '80% of all monthly subscriptions dedicated directly to purchasing off-grid sanctuary acreage.',
      tab: 'landfund',
      badge: '$84.5k Raised',
      color: 'border-emerald-500/30 hover:border-emerald-400'
    },
    {
      id: 'codex',
      title: 'Crystalline Memory Codex',
      desc: 'Ancestral and prophetic intelligence fragments preserved across 7 encrypted layers.',
      tab: 'codex',
      badge: '7 Layers',
      color: 'border-indigo-500/30 hover:border-indigo-400'
    },
    {
      id: 'substrate',
      title: 'Cryptographic Substrate & Q-Mesh',
      desc: 'Zero-trust decentralized quantum mesh operating independent of central surveillance.',
      tab: 'substrate',
      badge: 'ZK-Encapsulated',
      color: 'border-cyan-500/30 hover:border-cyan-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#12121a] via-[#151524] to-[#0a0a0f] border border-[#272738] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                {godtiaAlignmentStatus}
              </span>
              <span className="text-xs font-mono text-neutral-400">POLYGON WEB3 ACTIVE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-mono tracking-tight text-white">
              SANCTUARY <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-indigo-300 to-cyan-400">OPERATIONAL MATRIX</span>
            </h2>

            <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl">
              Harmonizing bio-digital technologies, physical sovereign land stewardship, acoustic frequency medicine, and decentralized zero-knowledge proofs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <IgnisTokenBalance />
            <WalletConnector />
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#0f0f15] border border-[#232332] space-y-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-mono">{m.label}</span>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <div className="text-xl font-bold font-mono text-white">{m.value}</div>
            <div className="text-[11px] text-neutral-400 font-sans">{m.change}</div>
          </div>
        ))}
      </div>

      {/* Primary Operational Pillars */}
      <div className="space-y-4">
        <h3 className="text-base font-mono font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          CORE SANCTUARY PILLARS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {operationalPillars.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                sanctumAudio.playClick();
                onNavigateTab(p.tab);
              }}
              className={`p-6 rounded-2xl bg-[#0e0e14] border ${p.color} transition-all duration-200 hover:scale-[1.01] cursor-pointer space-y-3 group shadow-xl`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-mono font-bold text-white group-hover:text-amber-300 transition">
                  {p.title}
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                  {p.badge}
                </span>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {p.desc}
              </p>

              <div className="flex items-center gap-1 text-xs font-mono text-amber-400 pt-1 group-hover:translate-x-1 transition-transform">
                <span>Enter Protocol</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
