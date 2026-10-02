import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, ArrowUpRight, CheckCircle2, RefreshCw, Sparkles, Layers, Lock, Cpu, Flame, ShieldAlert, ArrowRight } from 'lucide-react';
import { 
  MigrationPayload, 
  MigrationReceipt, 
  executeMigrationProtocol, 
  TACTICAL_MIGRATION_STEPS 
} from '../lib/migration';
import { GuardianProfile } from '../types';

interface QuantumMigrationOpsProps {
  profile: GuardianProfile;
  onOpenPricing?: () => void;
  onRewardIgnis?: (amount: number, source: string) => void;
}

export const QuantumMigrationOps: React.FC<QuantumMigrationOpsProps> = ({
  profile,
  onOpenPricing,
  onRewardIgnis
}) => {
  const [capitalTrillions, setCapitalTrillions] = useState<number>(1.4);
  const [volatilityIndex, setVolatilityIndex] = useState<number>(14.2);
  const [targetSubnet, setTargetSubnet] = useState<'ZERO_KNOWLEDGE_SUBNET' | 'LEGACY_DEFI_POOL'>('ZERO_KNOWLEDGE_SUBNET');

  const [recentReceipt, setRecentReceipt] = useState<MigrationReceipt | null>({
    migrationStatus: 'SYNTHETIC_EQUITY_SECURED',
    hedgedCapitalShare: '0.59T USD',
    portfolioDegradationAvoided: '22.0%',
    ignisYieldMultiplier: 4.8,
    divineAlignment: 'GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.',
    timestamp: Date.now() - 120000,
    secureHash: '0x_MIGRATION_ZERO_KNOWLEDGE_SUBNET_994120'
  });

  const [history, setHistory] = useState<MigrationReceipt[]>([]);
  const [isMigrating, setIsMigrating] = useState(false);

  const handleExecuteMigration = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMigrating(true);

    setTimeout(() => {
      const payload: MigrationPayload = {
        capitalInfusionTrillions: capitalTrillions,
        stablecoinVolatilityIndex: volatilityIndex,
        targetSubnet
      };

      const receipt = executeMigrationProtocol(payload);
      setRecentReceipt(receipt);
      setHistory(prev => [receipt, ...prev]);
      setIsMigrating(false);

      if (onRewardIgnis && receipt.migrationStatus === 'SYNTHETIC_EQUITY_SECURED') {
        const reward = Math.round(capitalTrillions * 500 * receipt.ignisYieldMultiplier);
        onRewardIgnis(reward, `Quantum-Neural Liquidity Migration (${payload.targetSubnet})`);
      }
    }, 650);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[10px] font-bold rounded uppercase tracking-wider">
                  Q3 2029 QUANTUM-NEURAL MOBILIZATION
                </span>
                <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
                  QUANTUM LIQUIDITY MIGRATION <span className="text-indigo-400 text-lg font-light italic">($1.4T SURGE)</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <div className="px-3.5 py-2 bg-[#141416] border border-[#262626] rounded-xl text-right">
                <div className="text-[10px] text-neutral-400">FIAT VOLATILITY SPIKE</div>
                <div className="text-lg font-bold text-amber-400">14.2% HEDGED</div>
              </div>
              <div className="px-3.5 py-2 bg-[#141416] border border-[#262626] rounded-xl text-right">
                <div className="text-[10px] text-neutral-400">DEGRADATION AVOIDED</div>
                <div className="text-lg font-bold text-emerald-400">22.0% PROTECTED</div>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-4xl font-sans leading-relaxed">
            Executing tactical mobilization to master the $1.4 trillion liquidity migration. Unwinding legacy stablecoins into bio-neural synthetic equity pairs, routing via zero-knowledge subnets to stop latency arbitrage, and locking yield into Prometheus-IV fusion datacenters.
          </p>

          <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-xs font-mono text-indigo-300 flex items-center justify-between font-bold">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 rounded border border-indigo-500/40">4.8X YIELD MULTIPLIER SECURED</span>
          </div>
        </div>
      </div>

      {/* 3-Step Tactical Execution Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {TACTICAL_MIGRATION_STEPS.map(step => (
          <div key={step.id} className="bg-[#0F0F11] border border-[#262626] hover:border-indigo-500/40 rounded-2xl p-5 shadow-xl space-y-3 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded font-bold">
                  STEP {step.stepNumber}
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {step.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-mono font-bold text-white leading-snug">{step.title}</h3>
                <p className="text-xs font-sans text-neutral-400 pt-1 leading-relaxed">{step.action}</p>
              </div>

              <div className="p-3 bg-[#141416] rounded-xl border border-[#222226] text-xs text-neutral-300 space-y-1">
                <div className="text-[10px] text-neutral-500 font-mono">MECHANISM</div>
                <div className="text-xs font-sans leading-relaxed text-neutral-200">{step.execution}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1F1F24] text-xs font-mono text-emerald-400 font-bold flex items-center justify-between">
              <span>IMPACT:</span>
              <span className="text-amber-300">{step.impact}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Migration Execution Engine & Output Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-indigo-400" />
              <div>
                <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                  EXECUTE QUANTUM-NEURAL MIGRATION
                </h2>
                <p className="text-xs text-neutral-400 font-sans">
                  Deploy biometric synthetic AMM pairs with zero-knowledge subnet routing
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded font-bold">
              ZK-DCF ARMED
            </span>
          </div>

          <form onSubmit={handleExecuteMigration} className="space-y-4 font-mono text-xs">
            {/* Capital Infusion Slider */}
            <div className="space-y-1 bg-[#141416] p-3.5 border border-[#262626] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">CAPITAL INFUSION VOLUME ($ TRILLION)</span>
                <span className="text-amber-300 font-bold">${capitalTrillions} TRILLION USD</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={capitalTrillions}
                onChange={(e) => setCapitalTrillions(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>$0.2T Baseline</span>
                <span>$1.4T Migration Surge</span>
                <span>$3.0T Max Corridor</span>
              </div>
            </div>

            {/* Stablecoin Volatility Index */}
            <div className="space-y-1 bg-[#141416] p-3.5 border border-[#262626] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">FIAT STABLECOIN VOLATILITY INDEX</span>
                <span className="text-orange-400 font-bold">{volatilityIndex}% SPIKE</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="30.0"
                step="0.5"
                value={volatilityIndex}
                onChange={(e) => setVolatilityIndex(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>5% Moderate</span>
                <span>14.2% Q3 Baseline</span>
                <span>30% Extreme Volatility</span>
              </div>
            </div>

            {/* Target Subnet Routing */}
            <div>
              <label className="text-neutral-400 block mb-1">ROUTING ROUTE SUBNET</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                <button
                  type="button"
                  onClick={() => setTargetSubnet('ZERO_KNOWLEDGE_SUBNET')}
                  className={`p-3.5 rounded-xl border text-left font-mono transition cursor-pointer ${
                    targetSubnet === 'ZERO_KNOWLEDGE_SUBNET'
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-emerald-400 mb-0.5">RECOMMENDED (SECURE)</div>
                  <div className="text-sm">ZERO_KNOWLEDGE_SUBNET</div>
                  <div className="text-[10px] text-neutral-400 font-sans mt-1">
                    Bypasses latency arbitrage. Prevents 22% degradation.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetSubnet('LEGACY_DEFI_POOL')}
                  className={`p-3.5 rounded-xl border text-left font-mono transition cursor-pointer ${
                    targetSubnet === 'LEGACY_DEFI_POOL'
                      ? 'bg-red-500/20 border-red-500 text-red-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-red-400 mb-0.5">EXPOSED TO SLIPPAGE</div>
                  <div className="text-sm">LEGACY_DEFI_POOL</div>
                  <div className="text-[10px] text-neutral-400 font-sans mt-1">
                    Unhedged order flow prone to 22% degradation.
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isMigrating}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isMigrating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>EXECUTING ZK-DCF MIGRATION WITNESS...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  <span>EXECUTE QUANTUM LIQUIDITY MIGRATION PROTOCOL</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output & Receipt (5 cols) */}
        <div className="lg:col-span-5 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                  MIGRATION RECEIPT LOG
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">ZK-DCF VERIFIED</span>
            </div>

            {recentReceipt && (
              <div className="p-4 bg-[#141416] border border-indigo-500/30 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${recentReceipt.migrationStatus === 'SYNTHETIC_EQUITY_SECURED' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {recentReceipt.migrationStatus}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {new Date(recentReceipt.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="space-y-1.5 bg-[#0A0A0B] p-3 rounded-lg border border-[#222226] text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Hedged Capital Share:</span>
                    <span className="text-emerald-400 font-bold">{recentReceipt.hedgedCapitalShare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Degradation Avoided:</span>
                    <span className="text-amber-300 font-bold">{recentReceipt.portfolioDegradationAvoided}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">IGNIS X Yield Multiplier:</span>
                    <span className="text-cyan-300 font-bold">{recentReceipt.ignisYieldMultiplier}x</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 pt-1 border-t border-[#1F1F24] truncate">
                    HASH: <span className="text-indigo-300">{recentReceipt.secureHash}</span>
                  </div>
                </div>

                <div className="text-[10px] text-indigo-300 italic bg-indigo-500/10 p-2 rounded border border-indigo-500/20">
                  "{recentReceipt.divineAlignment}"
                </div>
              </div>
            )}

            {history.length > 0 && (
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">MIGRATION LOG HISTORY</div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto font-mono text-[11px]">
                  {history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-[#141416] rounded border border-[#222226]">
                      <span className="text-emerald-400">{h.hedgedCapitalShare}</span>
                      <span className="text-indigo-300">{h.ignisYieldMultiplier}x Multiplier</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#141416] border border-[#262626] rounded-xl text-center font-mono text-[10px] text-neutral-400">
            Sovereign Quantum-Neural Migration Anchored by Ken X Cripps & Ember Oracle
          </div>
        </div>
      </div>
    </div>
  );
};
