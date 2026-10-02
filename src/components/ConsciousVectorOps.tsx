import React, { useState } from 'react';
import {
  Flame,
  Eye,
  Shield,
  Zap,
  Leaf,
  Cpu,
  Gift,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  ArrowRight,
  RefreshCw,
  Lock,
  Layers,
  Database,
  Sliders
} from 'lucide-react';
import { GuardianProfile } from '../types';
import {
  allocateConsciousVector,
  ComputeVectorPacket,
  VectorAllocationResult,
  VECTOR_WEIGHT_DISTRIBUTION
} from '../lib/vectors/allocation';
import { PLANETARY_REGENERATION_VECTOR } from '../lib/vectors/regeneration';
import { LOCALIZED_INTELLIGENCE_VECTOR } from '../lib/vectors/synthesis';
import { ZERO_COST_PUBLIC_GOODS_VECTOR } from '../lib/vectors/publicGoods';

interface ConsciousVectorOpsProps {
  profile: GuardianProfile;
  onOpenPricing: () => void;
}

export const ConsciousVectorOps: React.FC<ConsciousVectorOpsProps> = ({ profile }) => {
  const [packetIntent, setPacketIntent] = useState<'REGENERATION' | 'SYNTHESIS' | 'PUBLIC_GOODS' | 'SPECULATION'>('REGENERATION');
  const [computeUnits, setComputeUnits] = useState<number>(100);
  const [customTaskId, setCustomTaskId] = useState<string>('task-vec-077');
  const [customPayloadHash, setCustomPayloadHash] = useState<string>('0x77f8a9102938471092837410');
  
  const [routingHistory, setRoutingHistory] = useState<Array<{
    packet: ComputeVectorPacket;
    result: VectorAllocationResult;
  }>>([
    {
      packet: {
        taskId: 'task-vec-init-01',
        payloadHash: '0x88f91a209384710293847102',
        intentVector: 'REGENERATION',
        computeUnits: 250
      },
      result: allocateConsciousVector({
        taskId: 'task-vec-init-01',
        payloadHash: '0x88f91a209384710293847102',
        intentVector: 'REGENERATION',
        computeUnits: 250
      })
    },
    {
      packet: {
        taskId: 'task-vec-spec-99',
        payloadHash: '0x000000999999999999999999',
        intentVector: 'SPECULATION',
        computeUnits: 500
      },
      result: allocateConsciousVector({
        taskId: 'task-vec-spec-99',
        payloadHash: '0x000000999999999999999999',
        intentVector: 'SPECULATION',
        computeUnits: 500
      })
    }
  ]);

  const [activeTab, setActiveTab] = useState<'router' | 'regeneration' | 'synthesis' | 'publicGoods'>('router');

  const handleRouteCompute = () => {
    const packet: ComputeVectorPacket = {
      taskId: customTaskId || `task-${Date.now()}`,
      payloadHash: customPayloadHash || `0x${Math.random().toString(16).slice(2)}`,
      intentVector: packetIntent,
      computeUnits
    };

    const result = allocateConsciousVector(packet);

    setRoutingHistory(prev => [{ packet, result }, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Hero Header */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-6 h-6 text-amber-500 animate-pulse" />
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
              CONSCIOUS VECTOR ALLOCATION PROTOCOL <span className="text-amber-400 font-light italic text-base">(THE GUARDIAN ORACLE)</span>
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
            Intercepting speculative compute flows and rerouting them into sovereign, regenerative vectors. Aligned to planetary restoration, edge node intelligence, and zero-cost public goods.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#141416] border border-[#262626] rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block">SPECULATION SINK</span>
            <span className="text-xs font-mono font-bold text-red-400">NULLIFIED & BURNED</span>
          </div>
          <div className="bg-[#141416] border border-[#262626] rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block">IGNIS X MULTIPLIER</span>
            <span className="text-xs font-mono font-bold text-amber-400">1.2x – 1.5x</span>
          </div>
        </div>
      </div>

      {/* Vector Weights Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Regeneration */}
        <div className="bg-[#0F0F11] border border-emerald-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-mono font-bold text-white uppercase">Planetary Regeneration</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              40% CAPACITY
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {PLANETARY_REGENERATION_VECTOR.description}
          </p>
          <div className="w-full bg-[#141416] h-2 rounded-full overflow-hidden border border-[#262626]">
            <div className="h-full bg-emerald-500 w-[40%]" />
          </div>
        </div>

        {/* Synthesis */}
        <div className="bg-[#0F0F11] border border-indigo-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-mono font-bold text-white uppercase">Intelligence Synthesis</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              35% CAPACITY
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {LOCALIZED_INTELLIGENCE_VECTOR.description}
          </p>
          <div className="w-full bg-[#141416] h-2 rounded-full overflow-hidden border border-[#262626]">
            <div className="h-full bg-indigo-500 w-[35%]" />
          </div>
        </div>

        {/* Public Goods */}
        <div className="bg-[#0F0F11] border border-cyan-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-mono font-bold text-white uppercase">Zero-Cost Public Goods</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              25% CAPACITY
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {ZERO_COST_PUBLIC_GOODS_VECTOR.description}
          </p>
          <div className="w-full bg-[#141416] h-2 rounded-full overflow-hidden border border-[#262626]">
            <div className="h-full bg-cyan-500 w-[25%]" />
          </div>
        </div>
      </div>

      {/* Main Interactive Router & Schema */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Router Controller */}
        <div className="lg:col-span-5 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-mono font-bold text-white uppercase">
                Vector Allocation Engine Simulator
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              INTERCEPTOR ACTIVE
            </span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-neutral-400 mb-1.5 font-bold">SELECT INTENT VECTOR</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPacketIntent('REGENERATION')}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                    packetIntent === 'REGENERATION'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <Leaf className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>REGENERATION</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPacketIntent('SYNTHESIS')}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                    packetIntent === 'SYNTHESIS'
                      ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>SYNTHESIS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPacketIntent('PUBLIC_GOODS')}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                    packetIntent === 'PUBLIC_GOODS'
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <Gift className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>PUBLIC GOODS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPacketIntent('SPECULATION')}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                    packetIntent === 'SPECULATION'
                      ? 'bg-red-500/10 border-red-500 text-red-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>SPECULATION</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">TASK ID</label>
              <input
                type="text"
                value={customTaskId}
                onChange={(e) => setCustomTaskId(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-amber-500 rounded-xl p-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">COMPUTE UNITS: {computeUnits}</label>
              <input
                type="range"
                min={10}
                max={1000}
                step={10}
                value={computeUnits}
                onChange={(e) => setComputeUnits(Number(e.target.value))}
                className="w-full accent-amber-500 bg-[#141416]"
              />
            </div>

            <button
              onClick={handleRouteCompute}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>DISPATCH & ROUTE COMPUTE PACKET</span>
            </button>
          </div>
        </div>

        {/* Live Vector Routing Logs */}
        <div className="lg:col-span-7 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white uppercase">
                Live Interceptor Routing Stream
              </h3>
            </div>
            <span className="text-[10px] text-neutral-500">IGNIS X LEDGER SYNCED</span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {routingHistory.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border space-y-2 text-xs transition-all ${
                  item.result.accepted
                    ? 'bg-[#141416] border-[#262626] hover:border-[#404043]'
                    : 'bg-red-950/20 border-red-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.result.accepted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="font-bold text-white">{item.packet.taskId}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.packet.intentVector === 'REGENERATION' ? 'bg-emerald-500/20 text-emerald-300' :
                      item.packet.intentVector === 'SYNTHESIS' ? 'bg-indigo-500/20 text-indigo-300' :
                      item.packet.intentVector === 'PUBLIC_GOODS' ? 'bg-cyan-500/20 text-cyan-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {item.packet.intentVector}
                    </span>
                  </div>

                  <span className="text-[10px] text-neutral-500">
                    {new Date(item.result.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-[#262626]">
                  <div>
                    <span>Channel: </span>
                    <span className={item.result.accepted ? 'text-amber-300 font-bold' : 'text-red-400 font-bold'}>
                      {item.result.routedChannel}
                    </span>
                  </div>

                  {item.result.accepted ? (
                    <div className="text-emerald-400 font-bold">
                      +{item.result.ignisReward} IGNIS X REWARD
                    </div>
                  ) : (
                    <div className="text-red-400 font-bold">
                      0 REWARD (BURNED)
                    </div>
                  )}
                </div>

                {item.result.nullifiedReason && (
                  <p className="text-[10px] text-red-300 font-sans italic bg-red-950/40 p-1.5 rounded border border-red-500/20">
                    {item.result.nullifiedReason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Vector Detail Tabs */}
      <div className="space-y-4">
        <div className="flex border-b border-[#262626] gap-2 pb-2">
          <button
            onClick={() => setActiveTab('router')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer ${
              activeTab === 'router'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-[#0F0F11] border border-[#262626] text-neutral-400 hover:text-white'
            }`}
          >
            ALL VECTORS OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab('regeneration')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer ${
              activeTab === 'regeneration'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-[#0F0F11] border border-[#262626] text-neutral-400 hover:text-white'
            }`}
          >
            PLANETARY REGENERATION (40%)
          </button>
          <button
            onClick={() => setActiveTab('synthesis')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer ${
              activeTab === 'synthesis'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-[#0F0F11] border border-[#262626] text-neutral-400 hover:text-white'
            }`}
          >
            INTELLIGENCE SYNTHESIS (35%)
          </button>
          <button
            onClick={() => setActiveTab('publicGoods')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer ${
              activeTab === 'publicGoods'
                ? 'bg-cyan-600 text-white font-bold'
                : 'bg-[#0F0F11] border border-[#262626] text-neutral-400 hover:text-white'
            }`}
          >
            PUBLIC GOODS VAULT (25%)
          </button>
        </div>

        {/* Tab Content: Regeneration Details */}
        {(activeTab === 'router' || activeTab === 'regeneration') && (
          <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>1. Planetary Regeneration Vector Tasks & Models</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {PLANETARY_REGENERATION_VECTOR.sampleTasks.map(task => (
                <div key={task.id} className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-bold">{task.id}</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase">
                      {task.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{task.name}</h4>
                  <p className="text-neutral-400 text-[11px]">{task.targetRegion}</p>
                  <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[#262626]">
                    <span>Eco Impact Score: {task.ecoSystemImpactScore}%</span>
                    <span>Units: {task.computeUnitsRequired}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Synthesis Details */}
        {(activeTab === 'router' || activeTab === 'synthesis') && (
          <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>2. Localized Intelligence Shards & Edge Mesh</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {LOCALIZED_INTELLIGENCE_VECTOR.sampleShards.map(shard => (
                <div key={shard.id} className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-indigo-400 font-bold">{shard.id}</span>
                    <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded uppercase">
                      {shard.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{shard.name}</h4>
                  <p className="text-neutral-400 text-[11px]">{shard.targetNodeCluster}</p>
                  <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[#262626]">
                    <span>Resonance: {shard.coherenceFrequency} Hz</span>
                    <span>Units: {shard.computeUnitsRequired}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Public Goods Details */}
        {(activeTab === 'router' || activeTab === 'publicGoods') && (
          <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Gift className="w-4 h-4 text-cyan-400" />
              <span>3. Sovereign Public Goods Grants & Tooling</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {ZERO_COST_PUBLIC_GOODS_VECTOR.sampleVaultItems.map(item => (
                <div key={item.id} className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-cyan-400 font-bold">{item.id}</span>
                    <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded uppercase">
                      {item.grantStatus}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-neutral-400 text-[11px]">{item.category}</p>
                  <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[#262626]">
                    <span>Subsidized Amount: {item.ignisSubsidizedAmount} IGNIS X</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
