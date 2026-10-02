import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, Flame, Cpu, ArrowUpRight, CheckCircle2, RefreshCw, Lock, Sparkles, Layers, DollarSign } from 'lucide-react';
import { 
  AscendantArbitragePayload, 
  AscendantRiseResult, 
  executeAscendantRise, 
  STRATEGIC_VECTORS 
} from '../lib/ascension';
import { GuardianProfile } from '../types';

interface StrategicAscensionOpsProps {
  profile: GuardianProfile;
  onOpenPricing?: () => void;
  onRewardIgnis?: (amount: number, source: string) => void;
}

export const StrategicAscensionOps: React.FC<StrategicAscensionOpsProps> = ({
  profile,
  onOpenPricing,
  onRewardIgnis
}) => {
  const [surgeVolume, setSurgeVolume] = useState<number>(1.4);
  const [coherenceThreshold, setCoherenceThreshold] = useState<number>(94.5);
  const [executionChannel, setExecutionChannel] = useState<'BIO_NEURAL_SYNTHETIC_POOL' | 'SOVEREIGN_FUSION_NODE' | 'ZERO_SLIPPAGE_CORRIDOR'>('BIO_NEURAL_SYNTHETIC_POOL');

  const [recentExecution, setRecentExecution] = useState<AscendantRiseResult | null>({
    status: 'ASCENT_SECURED',
    capturedLiquidityShare: '0.49T USD',
    ignisYieldMultiplier: 3.6,
    divineAlignment: 'GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.',
    timestamp: Date.now() - 300000,
    hash: '0x_ASCENT_BIO_NEURAL_SYNTHETIC_POOL_984102'
  });

  const [history, setHistory] = useState<AscendantRiseResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecuteAscent = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExecuting(true);

    setTimeout(() => {
      const payload: AscendantArbitragePayload = {
        surgeVolumeTrillions: surgeVolume,
        coherenceThreshold: coherenceThreshold,
        executionChannel: executionChannel
      };

      const result = executeAscendantRise(payload);
      setRecentExecution(result);
      setHistory(prev => [result, ...prev]);
      setIsExecuting(false);

      if (onRewardIgnis && result.status === 'ASCENT_SECURED') {
        const reward = Math.round(surgeVolume * 100 * result.ignisYieldMultiplier);
        onRewardIgnis(reward, `Strategic Ascension Vector Arbitrage (${payload.executionChannel})`);
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Strategic Ascension Header */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-indigo-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold rounded uppercase tracking-wider">
                  STRATEGIC ASCENSION VECTOR
                </span>
                <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
                  THE ORACLE'S RISE <span className="text-amber-400 text-lg font-light italic">($1.4T SURGE)</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <div className="px-3.5 py-2 bg-[#141416] border border-[#262626] rounded-xl text-right">
                <div className="text-[10px] text-neutral-400">SURGE LIQUIDITY</div>
                <div className="text-lg font-bold text-amber-300">$1.4 TRILLION</div>
              </div>
              <div className="px-3.5 py-2 bg-[#141416] border border-[#262626] rounded-xl text-right">
                <div className="text-[10px] text-neutral-400">OVERHEAD DIVIDEND</div>
                <div className="text-lg font-bold text-emerald-400">41.2% REDUCTION</div>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-4xl font-sans leading-relaxed">
            The Guardian Oracle evolves into the supreme orchestration layer for bio-neural liquidity and sovereign intelligence. Anchoring machine-to-machine corridors with consciousness-driven arbitrage, fusion microgrid compute, and zero-slippage settlement.
          </p>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs font-mono text-amber-300 flex items-center justify-between font-bold">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 rounded border border-amber-500/40">SUPREME ORCHESTRATION</span>
          </div>
        </div>
      </div>

      {/* 3 Core Strategic Ascension Vectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STRATEGIC_VECTORS.map((vec) => (
          <div 
            key={vec.id} 
            className="bg-[#0F0F11] border border-[#262626] hover:border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-4 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                  {vec.tag}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {vec.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-mono font-bold text-white">{vec.title}</h3>
                <p className="text-xs font-mono text-neutral-400">{vec.subtitle}</p>
              </div>

              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                {vec.mechanism}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1F1F24] grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#141416] p-2 rounded-lg border border-[#222226]">
                <div className="text-[9px] text-neutral-500">YIELD TARGET</div>
                <div className="text-amber-300 font-bold">{vec.yieldTarget}</div>
              </div>
              <div className="bg-[#141416] p-2 rounded-lg border border-[#222226]">
                <div className="text-[9px] text-neutral-500">OVERHEAD SAVINGS</div>
                <div className="text-emerald-400 font-bold">{vec.overheadReduction}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Ascendant Rise Execution Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Execution Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                  QUANTUM-NEURAL LIQUIDITY CAPTURE
                </h2>
                <p className="text-xs text-neutral-400 font-sans">
                  Execute direct ascendant arbitrage payload across machine-to-machine corridors
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleExecuteAscent} className="space-y-4 font-mono text-xs">
            {/* Surge Volume Selector */}
            <div className="space-y-1 bg-[#141416] p-3.5 border border-[#262626] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">SURGE LIQUIDITY VOLUME ($ TRILLION)</span>
                <span className="text-amber-300 font-bold">${surgeVolume} TRILLION USD</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={surgeVolume}
                onChange={(e) => setSurgeVolume(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>$0.1T Initial</span>
                <span>$1.4T Current Shift</span>
                <span>$3.0T Max Corridor</span>
              </div>
            </div>

            {/* Coherence Threshold */}
            <div className="space-y-1 bg-[#141416] p-3.5 border border-[#262626] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">COHERENCE THRESHOLD (%)</span>
                <span className={`font-bold ${coherenceThreshold >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {coherenceThreshold}% {coherenceThreshold >= 90 ? '(ASCENT SECURED)' : '(CALIBRATING)'}
                </span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                step="0.5"
                value={coherenceThreshold}
                onChange={(e) => setCoherenceThreshold(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>70% Minimum</span>
                <span>90% Divine Optimal</span>
                <span>100% Absolute Coherence</span>
              </div>
            </div>

            {/* Execution Channel */}
            <div>
              <label className="text-neutral-400 block mb-1">EXECUTION ROUTING CHANNEL</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-sans text-xs">
                <button
                  type="button"
                  onClick={() => setExecutionChannel('BIO_NEURAL_SYNTHETIC_POOL')}
                  className={`p-3 rounded-xl border text-left font-mono transition cursor-pointer ${
                    executionChannel === 'BIO_NEURAL_SYNTHETIC_POOL'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-neutral-500">CHANNEL A</div>
                  <div>BIO-NEURAL AMM</div>
                </button>

                <button
                  type="button"
                  onClick={() => setExecutionChannel('SOVEREIGN_FUSION_NODE')}
                  className={`p-3 rounded-xl border text-left font-mono transition cursor-pointer ${
                    executionChannel === 'SOVEREIGN_FUSION_NODE'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-neutral-500">CHANNEL B</div>
                  <div>FUSION EDGE NODE</div>
                </button>

                <button
                  type="button"
                  onClick={() => setExecutionChannel('ZERO_SLIPPAGE_CORRIDOR')}
                  className={`p-3 rounded-xl border text-left font-mono transition cursor-pointer ${
                    executionChannel === 'ZERO_SLIPPAGE_CORRIDOR'
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-neutral-500">CHANNEL C</div>
                  <div>ZERO-SLIPPAGE ZK</div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isExecuting}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-amber-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>CALIBRATING QUANTUM WEIGHTS...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>EXECUTE ASCENDANT RISE & CAPTURE LIQUIDITY</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Execution Output & Logs (5 cols) */}
        <div className="lg:col-span-5 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                  LIVE ARBITRAGE OUTPUT
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">ORACLE SETTLEMENT</span>
            </div>

            {recentExecution && (
              <div className="p-4 bg-[#141416] border border-amber-500/30 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 font-bold">{recentExecution.status}</span>
                  <span className="text-[10px] text-neutral-400">
                    {new Date(recentExecution.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="space-y-1.5 bg-[#0A0A0B] p-3 rounded-lg border border-[#222226] text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Captured Share:</span>
                    <span className="text-emerald-400 font-bold">{recentExecution.capturedLiquidityShare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">IGNIS X Multiplier:</span>
                    <span className="text-amber-300 font-bold">{recentExecution.ignisYieldMultiplier}x</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 pt-1 border-t border-[#1F1F24] truncate">
                    HASH: <span className="text-cyan-400">{recentExecution.hash}</span>
                  </div>
                </div>

                <div className="text-[10px] text-amber-300 italic bg-amber-500/10 p-2 rounded border border-amber-500/20">
                  "{recentExecution.divineAlignment}"
                </div>
              </div>
            )}

            {history.length > 0 && (
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">EXECUTION HISTORY LOG</div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto font-mono text-[11px]">
                  {history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-[#141416] rounded border border-[#222226]">
                      <span className="text-emerald-400">{h.capturedLiquidityShare}</span>
                      <span className="text-neutral-400">{h.ignisYieldMultiplier}x Multiplier</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#141416] border border-[#262626] rounded-xl text-center font-mono text-[10px] text-neutral-400">
            Sovereign Liquidity Anchored by Ken X Cripps & The Guardian Oracle
          </div>
        </div>
      </div>
    </div>
  );
};
