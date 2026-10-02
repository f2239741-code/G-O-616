import React, { useState } from 'react';
import { Flame, Zap, ShieldCheck, Cpu, RefreshCw, Sparkles, CheckCircle2, Server, Activity, ArrowUpRight, Globe, Layers, Database } from 'lucide-react';
import { 
  FusionEnergyFeedPayload, 
  SingularityReceipt, 
  synchronizeFusionCompute, 
  MODULAR_FUSION_FACILITIES, 
  ISOTOPE_LEDGER, 
  PLANETARY_EXPANSION_VECTORS 
} from '../lib/fusion';
import { GuardianProfile } from '../types';

interface FusionSingularityOpsProps {
  profile: GuardianProfile;
  onOpenPricing?: () => void;
  onRewardIgnis?: (amount: number, source: string) => void;
}

export const FusionSingularityOps: React.FC<FusionSingularityOpsProps> = ({
  profile,
  onOpenPricing,
  onRewardIgnis
}) => {
  const [facilityId, setFacilityId] = useState<string>('PROMETHEUS_IV');
  const [qFactor, setQFactor] = useState<number>(14.2);
  const [sustainedHours, setSustainedHours] = useState<number>(96);
  const [fusionOutputGW, setFusionOutputGW] = useState<number>(4.8);

  const [recentReceipt, setRecentReceipt] = useState<SingularityReceipt | null>({
    status: 'FUSION_SINGULARITY_LOCKED',
    energyLockedMW: 4800,
    ignisDynamicMultiplier: 5.2,
    secureHash: '0x_FUSION_SINGULARITY_PROMETHEUS_IV_1785689100',
    timestamp: Date.now() - 180000
  });

  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [history, setHistory] = useState<SingularityReceipt[]>([]);

  const handleSyncFusion = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSynchronizing(true);

    setTimeout(() => {
      const payload: FusionEnergyFeedPayload = {
        facilityId,
        qFactor,
        sustainedHours,
        fusionOutputGigawatts: fusionOutputGW
      };

      const receipt = synchronizeFusionCompute(payload);
      setRecentReceipt(receipt);
      setHistory(prev => [receipt, ...prev]);
      setIsSynchronizing(false);

      if (onRewardIgnis && receipt.status === 'FUSION_SINGULARITY_LOCKED') {
        const reward = Math.round(fusionOutputGW * 200 * receipt.ignisDynamicMultiplier);
        onRewardIgnis(reward, `Fusion Singularity Baseload Sync (${payload.facilityId})`);
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 bg-orange-500/10 border border-orange-500/30 text-orange-300 font-mono text-[10px] font-bold rounded uppercase tracking-wider">
                  PROMETHEUS-IV FUSION BREAKTHROUGH
                </span>
                <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
                  FUSION-ANCHORED ORACLE <span className="text-orange-400 text-lg font-light italic">($4.2T SHIFT)</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <div className="px-3.5 py-2 bg-[#141416] border border-[#262626] rounded-xl text-right">
                <div className="text-[10px] text-neutral-400">VALUATION SHIFT</div>
                <div className="text-lg font-bold text-orange-400">$4.2 TRILLION</div>
              </div>
              <div className="px-3.5 py-2 bg-[#141416] border border-[#262626] rounded-xl text-right">
                <div className="text-[10px] text-neutral-400">IGNIS DYNAMIC YIELD</div>
                <div className="text-lg font-bold text-amber-300">5.2X MULTIPLIER</div>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-4xl font-sans leading-relaxed">
            Bridging clean, near-zero-marginal-cost fusion energy with decentralized bio-neural compute. The Oracle anchors raw gigawatt-scale feeds from Prometheus-IV modular reactors to drive planetary regeneration, carbon capture, and sovereign wealth stabilization.
          </p>

          <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl text-xs font-mono text-orange-300 flex items-center justify-between font-bold">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-orange-500/20 rounded border border-orange-500/40">GIGAWATT BASELOAD SECURED</span>
          </div>
        </div>
      </div>

      {/* 3 Core Fusion Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {/* Pillar 1 */}
        <div className="bg-[#0F0F11] border border-[#262626] hover:border-orange-500/40 rounded-2xl p-5 shadow-xl space-y-3 transition">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="px-2 py-0.5 bg-orange-500/10 text-orange-300 border border-orange-500/30 rounded font-bold">
              PILLAR I
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE
            </span>
          </div>
          <h3 className="text-base font-mono font-bold text-white">Fusion-Compute Singularity</h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Anchors Phase III Sovereign Nodes directly to modular fusion reactor (MFR) feeds, running compute at maximum throughput with zero thermal or economic friction.
          </p>
          <div className="pt-2 text-xs font-mono text-amber-300">
            Zero Marginal Energy Cost
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-[#0F0F11] border border-[#262626] hover:border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-3 transition">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded font-bold">
              PILLAR II
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> SECURED
            </span>
          </div>
          <h3 className="text-base font-mono font-bold text-white">Isotope & HTS Coil Ledger</h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Cryptographic supply chain integrity monitoring Lithium-6 breeder pellets, high-purity Tritium, and 20-Tesla REBCO superconducting coils for node builders.
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-400">
            Cryptographic ZK Clearinghouse
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-[#0F0F11] border border-[#262626] hover:border-indigo-500/40 rounded-2xl p-5 shadow-xl space-y-3 transition">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded font-bold">
              PILLAR III
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> EXPANDING
            </span>
          </div>
          <h3 className="text-base font-mono font-bold text-white">Planetary Regeneration Vector</h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Directs surplus fusion baseload power into gigawatt-scale desalination corridors and direct-air thermochemical carbon mineralization arrays verified on Polygon.
          </p>
          <div className="pt-2 text-xs font-mono text-cyan-300">
            1.2B Liters Fresh Water / Day
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Fusion Sync Engine & Live Receipts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-orange-400" />
              <div>
                <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                  SYNCHRONIZE FUSION-COMPUTE BASELOAD
                </h2>
                <p className="text-xs text-neutral-400 font-sans">
                  Execute Prometheus-IV fusion singularity handshake protocol
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2.5 py-1 bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded font-bold">
              PLASMA STABLE
            </span>
          </div>

          <form onSubmit={handleSyncFusion} className="space-y-4 font-mono text-xs">
            {/* Facility Selector */}
            <div>
              <label className="text-neutral-400 block mb-1">FUSION REACTOR FACILITY</label>
              <select
                value={facilityId}
                onChange={(e) => setFacilityId(e.target.value)}
                className="w-full bg-[#141416] border border-[#2A2A30] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-orange-500 font-mono"
              >
                {MODULAR_FUSION_FACILITIES.map(fac => (
                  <option key={fac.id} value={fac.id}>
                    {fac.id} — {fac.name} ({fac.outputGW} GW, Q={fac.qFactor})
                  </option>
                ))}
              </select>
            </div>

            {/* Q-Factor Slider */}
            <div className="space-y-1 bg-[#141416] p-3.5 border border-[#262626] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">PLASMA Q-FACTOR (GAIN MULTIPLIER)</span>
                <span className={`font-bold ${qFactor >= 12.0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  Q = {qFactor} {qFactor >= 12.0 ? '(SINGULARITY LOCKED)' : '(STABILIZING)'}
                </span>
              </div>
              <input
                type="range"
                min="5.0"
                max="25.0"
                step="0.1"
                value={qFactor}
                onChange={(e) => setQFactor(parseFloat(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>Q = 5.0 (Ignition)</span>
                <span>Q = 12.0 (Sovereign Target)</span>
                <span>Q = 25.0 (Apex Pulse)</span>
              </div>
            </div>

            {/* Sustained Hours Slider */}
            <div className="space-y-1 bg-[#141416] p-3.5 border border-[#262626] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">SUSTAINED PLASMA RUNTIME (HOURS)</span>
                <span className="text-orange-400 font-bold">{sustainedHours} HOURS CONTINUOUS</span>
              </div>
              <input
                type="range"
                min="12"
                max="240"
                step="12"
                value={sustainedHours}
                onChange={(e) => setSustainedHours(parseInt(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>12 Hours</span>
                <span>72 Hours Target</span>
                <span>240 Hours (10 Days)</span>
              </div>
            </div>

            {/* Fusion Output Gigawatts Slider */}
            <div className="space-y-1 bg-[#141416] p-3.5 border border-[#262626] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">FUSION BASELOAD OUTPUT (GIGAWATTS)</span>
                <span className="text-amber-300 font-bold">{fusionOutputGW} GW ({fusionOutputGW * 1000} MW)</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.1"
                value={fusionOutputGW}
                onChange={(e) => setFusionOutputGW(parseFloat(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>0.5 GW MFR</span>
                <span>4.8 GW Prometheus</span>
                <span>10.0 GW Planetary Node</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSynchronizing}
              className="w-full py-3.5 bg-gradient-to-r from-orange-600 via-amber-600 to-indigo-600 hover:from-orange-500 hover:to-indigo-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-orange-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSynchronizing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>SYNCHRONIZING PROMETHEUS PLASMA...</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 fill-white" />
                  <span>SYNCHRONIZE FUSION-COMPUTE & LOCK BASELOAD</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output & Receipt Panel (5 cols) */}
        <div className="lg:col-span-5 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <h3 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                  SINGULARITY RECEIPT LOG
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">PROMETHEUS SECURE</span>
            </div>

            {recentReceipt && (
              <div className="p-4 bg-[#141416] border border-orange-500/30 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-orange-400 font-bold">{recentReceipt.status}</span>
                  <span className="text-[10px] text-neutral-400">
                    {new Date(recentReceipt.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="space-y-1.5 bg-[#0A0A0B] p-3 rounded-lg border border-[#222226] text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Energy Locked:</span>
                    <span className="text-emerald-400 font-bold">{recentReceipt.energyLockedMW} MW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Dynamic IGNIS Multiplier:</span>
                    <span className="text-amber-300 font-bold">{recentReceipt.ignisDynamicMultiplier}x</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 pt-1 border-t border-[#1F1F24] truncate">
                    HASH: <span className="text-cyan-400">{recentReceipt.secureHash}</span>
                  </div>
                </div>
              </div>
            )}

            {history.length > 0 && (
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">SYNCHRONIZATION HISTORY</div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto font-mono text-[11px]">
                  {history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-[#141416] rounded border border-[#222226]">
                      <span className="text-emerald-400">{h.energyLockedMW} MW Locked</span>
                      <span className="text-amber-300">{h.ignisDynamicMultiplier}x Multiplier</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#141416] border border-[#262626] rounded-xl text-center font-mono text-[10px] text-neutral-400">
            Infinite Clean Energy Orchestration — Backed by Ken X Cripps & Prometheus-IV
          </div>
        </div>
      </div>

      {/* Isotope & HTS Coil Supply Chain Tracking Ledger */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-mono font-bold text-white uppercase tracking-tight">
                ISOTOPE & HTS FIELD-COIL LEDGER
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-sans">
              Cryptographic supply integrity clearinghouse for modular fusion reactor buildouts.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded font-bold">
            ZK SUPPLY TRACKING
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ISOTOPE_LEDGER.map(item => (
            <div key={item.id} className="p-4 bg-[#141416] border border-[#262626] hover:border-amber-500/40 rounded-xl space-y-3 transition">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  {item.id}
                </span>
                <span className="text-neutral-400">{item.allocatedNodes} Nodes Powered</span>
              </div>

              <div>
                <h4 className="text-sm font-mono font-bold text-white leading-tight">{item.resourceName}</h4>
                <p className="text-xs font-sans text-emerald-400 pt-0.5">{item.purityGrade}</p>
              </div>

              <div className="text-xs font-mono space-y-1 bg-[#0A0A0B] p-2.5 rounded-lg border border-[#222226]">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Reserve Supply:</span>
                  <span className="text-white font-bold">{item.currentReserve}</span>
                </div>
                <div className="text-[10px] text-neutral-500 pt-1 border-t border-[#1F1F24] truncate">
                  HASH: <span className="text-cyan-400">{item.verificationHash}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Planetary Regeneration Gateway Metrics */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-mono font-bold text-white uppercase tracking-tight">
                PLANETARY HYPER-EXPANSION GATEWAY
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-sans">
              Gigawatt fusion baseload powering ecological restoration & carbon mineralization.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded font-bold">
            POLYGON VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLANETARY_EXPANSION_VECTORS.map(vec => (
            <div key={vec.id} className="p-5 bg-[#141416] border border-[#262626] hover:border-cyan-500/40 rounded-xl space-y-3 transition">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-cyan-300 font-bold px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded">
                  {vec.title}
                </span>
                <span className="text-emerald-400 font-bold">{vec.status}</span>
              </div>

              <div className="bg-[#0A0A0B] p-3 rounded-lg border border-[#222226] flex items-center justify-between font-mono">
                <div>
                  <div className="text-[10px] text-neutral-500">{vec.metricLabel}</div>
                  <div className="text-base font-bold text-emerald-400">{vec.metricValue}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-neutral-500">Power Draw</div>
                  <div className="text-sm font-bold text-orange-400">{vec.powerDrawMW} MW</div>
                </div>
              </div>

              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                {vec.impactDescription}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
