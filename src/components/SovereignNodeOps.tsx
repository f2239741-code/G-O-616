import React, { useState } from 'react';
import {
  Anchor,
  Zap,
  Cpu,
  ShieldCheck,
  Globe,
  Radio,
  Activity,
  BatteryCharging,
  Thermometer,
  PlusCircle,
  CheckCircle2,
  AlertOctagon,
  Power,
  Server
} from 'lucide-react';
import { GuardianProfile } from '../types';
import {
  initializeSovereignNode,
  MicrogridNodeConfig,
  NodeTelemetryReceipt,
  SovereignNodeItem,
  SAMPLE_SOVEREIGN_NODES
} from '../lib/nodes/microgrid';

interface SovereignNodeOpsProps {
  profile: GuardianProfile;
  onOpenPricing: () => void;
}

export const SovereignNodeOps: React.FC<SovereignNodeOpsProps> = ({ profile }) => {
  const [nodes, setNodes] = useState<SovereignNodeItem[]>(SAMPLE_SOVEREIGN_NODES);
  
  // Deployment Simulator Form State
  const [newNodeId, setNewNodeId] = useState<string>('node-appalachia-04');
  const [locationTag, setLocationTag] = useState<string>('Blue Ridge Sanctuary (36.12° N, 81.67° W)');
  const [fusionWatts, setFusionWatts] = useState<number>(4200);
  const [activeShards, setActiveShards] = useState<number>(14);

  const [lastReceipt, setLastReceipt] = useState<NodeTelemetryReceipt | null>(null);

  const handleDeployNode = (e: React.FormEvent) => {
    e.preventDefault();
    const config: MicrogridNodeConfig = {
      nodeId: newNodeId || `node-${Date.now()}`,
      locationTag: locationTag || 'Sovereign Refuge',
      fusionOutputWatts: fusionWatts,
      activeComputeShards: activeShards,
      autonomyStatus: 'FULL_SOVEREIGN_OFFGRID'
    };

    const receipt = initializeSovereignNode(config);
    setLastReceipt(receipt);

    const newNode: SovereignNodeItem = {
      id: config.nodeId,
      name: `${config.nodeId.toUpperCase()} Node`,
      location: config.locationTag,
      fusionOutputWatts: config.fusionOutputWatts,
      activeComputeShards: config.activeComputeShards,
      powerSurplusWatts: receipt.powerSurplusWatts,
      temperatureCelsius: 22.4,
      batteryReservePercent: 100,
      status: receipt.gatekeeperBypassed ? 'ONLINE_OFFGRID' : 'HYBRID',
      gatekeeperBypassed: receipt.gatekeeperBypassed,
      latitude: 36.12,
      longitude: -81.67
    };

    setNodes(prev => [newNode, ...prev]);
  };

  const totalWattsGenerated = nodes.reduce((sum, n) => sum + n.fusionOutputWatts, 0);
  const totalWattsSurplus = nodes.reduce((sum, n) => sum + n.powerSurplusWatts, 0);
  const totalActiveShards = nodes.reduce((sum, n) => sum + n.activeComputeShards, 0);
  const bypassPercentage = Math.round((nodes.filter(n => n.gatekeeperBypassed).length / nodes.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Hero Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Anchor className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
              SOVEREIGN NODE LOCALIZATION <span className="text-cyan-400 font-light italic text-base">(THE ANCHOR)</span>
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
            Off-grid micro-datacenter nodes paired directly with local fusion microgrids. Complete bypass of corporate ISP/cloud gatekeepers with zero-latency edge compute intelligence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#141416] border border-[#262626] rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block">GATEKEEPER BYPASS</span>
            <span className="text-xs font-mono font-bold text-emerald-400">{bypassPercentage}% FULL OFF-GRID</span>
          </div>
          <div className="bg-[#141416] border border-[#262626] rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block">FUSION POWER SURPLUS</span>
            <span className="text-xs font-mono font-bold text-amber-400">+{totalWattsSurplus} W</span>
          </div>
        </div>
      </div>

      {/* Phase I Blueprint Local Alignment Callout */}
      <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <span className="text-indigo-300 font-bold block uppercase">PHASE I BLUEPRINT: SOVEREIGN NODE ALIGNED</span>
            <span className="text-neutral-400 text-[11px] font-sans">
              Cryptographic Root Keys, Edge Execution, Ephemeral Relays, and Zero Unconsented Telemetry active.
            </span>
          </div>
        </div>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold">
          LOVE IS THE LAW, LOVE UNDER WILL
        </span>
      </div>

      {/* Metric Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase">ACTIVE MICRO-NODES</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{nodes.length}</div>
          <p className="text-[10px] font-mono text-emerald-400">100% Autonomy Operational</p>
        </div>

        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase">FUSION MICROGRID OUTPUT</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{totalWattsGenerated} W</div>
          <p className="text-[10px] font-mono text-amber-400">+{totalWattsSurplus} W Net Energy Surplus</p>
        </div>

        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase">EDGE COMPUTE SHARDS</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{totalActiveShards}</div>
          <p className="text-[10px] font-mono text-indigo-400">Ember UR Local Weight Shards</p>
        </div>

        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase">CENSORSHIP BYPASS</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-400">ACTIVE</div>
          <p className="text-[10px] font-mono text-neutral-500">Corporate Cloud Sinks Depowered</p>
        </div>
      </div>

      {/* Main Grid: Deployment Form & Node List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Node Deployment Form */}
        <div className="lg:col-span-5 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-mono font-bold text-white uppercase">
                Initialize Micro-Datacenter
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              FUSION LINK READY
            </span>
          </div>

          <form onSubmit={handleDeployNode} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-neutral-400 mb-1">NODE ID</label>
              <input
                type="text"
                value={newNodeId}
                onChange={(e) => setNewNodeId(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-cyan-500 rounded-xl p-2.5 text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">LOCATION & REGION</label>
              <input
                type="text"
                value={locationTag}
                onChange={(e) => setLocationTag(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-cyan-500 rounded-xl p-2.5 text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">FUSION OUTPUT (WATTS): {fusionWatts} W</label>
              <input
                type="range"
                min={1000}
                max={10000}
                step={200}
                value={fusionWatts}
                onChange={(e) => setFusionWatts(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-[#141416]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">ACTIVE COMPUTE SHARDS: {activeShards}</label>
              <input
                type="range"
                min={2}
                max={32}
                step={2}
                value={activeShards}
                onChange={(e) => setActiveShards(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-[#141416]"
              />
              <span className="text-[10px] text-neutral-500 mt-1 block">
                Load Power Requirement: {activeShards * 120} W
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              <Power className="w-4 h-4" />
              <span>SPAWN & ANCHOR SOVEREIGN NODE</span>
            </button>
          </form>

          {lastReceipt && (
            <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl space-y-1 text-xs font-mono text-cyan-300">
              <div className="flex items-center gap-2 font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Node Initialized</span>
              </div>
              <div className="text-[11px] text-neutral-300">Receipt Hash: {lastReceipt.secureHash}</div>
              <div className="text-[10px] text-emerald-400">Surplus Power: +{lastReceipt.powerSurplusWatts} W | Gatekeeper Bypassed</div>
            </div>
          )}
        </div>

        {/* Sovereign Edge Nodes List */}
        <div className="lg:col-span-7 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase">
                Active Sovereign Micro-Datacenters
              </h3>
            </div>
            <span className="text-[10px] text-neutral-500">OFF-GRID TELEMETRY MESH</span>
          </div>

          <div className="space-y-4">
            {nodes.map(node => (
              <div
                key={node.id}
                className="bg-[#141416] border border-[#262626] hover:border-cyan-500/40 rounded-xl p-4 space-y-3 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="font-bold text-white text-sm">{node.name}</span>
                    <span className="text-[10px] text-neutral-500">({node.id})</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {node.status}
                  </span>
                </div>

                <p className="text-xs text-neutral-400">{node.location}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-2 border-t border-[#262626]">
                  <div>
                    <span className="text-neutral-500 block text-[9px]">FUSION POWER</span>
                    <span className="text-amber-300 font-bold">{node.fusionOutputWatts} W</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[9px]">SURPLUS</span>
                    <span className="text-emerald-400 font-bold">+{node.powerSurplusWatts} W</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[9px]">BATTERY</span>
                    <span className="text-cyan-300 font-bold flex items-center gap-1">
                      <BatteryCharging className="w-3 h-3 text-cyan-400" />
                      {node.batteryReservePercent}%
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[9px]">THERMAL</span>
                    <span className="text-indigo-300 font-bold flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-indigo-400" />
                      {node.temperatureCelsius}°C
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
