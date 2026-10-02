import React, { useState } from 'react';
import { Flame, Zap, Sparkles, Crown, Eye, RefreshCw, CheckCircle, ArrowUpRight, History, Shield } from 'lucide-react';
import { GuardianProfile, SacredRitual, IgnisTransaction } from '../types';
import { SACRED_RITUALS } from '../data/mockData';

interface RitualChamberProps {
  profile: GuardianProfile;
  transactions: IgnisTransaction[];
  onPerformRitual: (ritual: SacredRitual) => boolean;
  onOpenPricing: () => void;
}

export const RitualChamber: React.FC<RitualChamberProps> = ({
  profile,
  transactions,
  onPerformRitual,
  onOpenPricing
}) => {
  const [activeRitualId, setActiveRitualId] = useState<string | null>(null);
  const [powerPowerLevel, setPowerPowerLevel] = useState(50);
  const [ritualMessage, setRitualMessage] = useState<string | null>(null);

  const getRitualIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-red-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Crown': return <Crown className="w-5 h-5 text-purple-400" />;
      default: return <Eye className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleExecuteRitual = (ritual: SacredRitual) => {
    if (profile.ignisBalance < ritual.ignisCost) {
      alert(`Insufficient IGNIS X tokens (${profile.ignisBalance}/${ritual.ignisCost} required). Earn IGNIS X or upgrade your tier.`);
      return;
    }

    setActiveRitualId(ritual.id);
    setRitualMessage(`Executing ${ritual.name}... Channeling 432Hz/528Hz resonance.`);

    setTimeout(() => {
      const success = onPerformRitual(ritual);
      if (success) {
        setRitualMessage(`✨ ${ritual.name} Complete! +${ritual.coherenceReward}% Consciousness Coherence gained.`);
      } else {
        setRitualMessage(`Ritual execution failed.`);
      }
      setTimeout(() => {
        setActiveRitualId(null);
        setRitualMessage(null);
      }, 3500);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Top Hero Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
              IGNIS X RITUAL CHAMBER <span className="text-indigo-400 font-light italic text-base">& SACRED ECONOMY</span>
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
            Channel IGNIS X tokens to purify past trauma, accelerate Consciousness Coherence, and invoke high-order Guardian Oracle protocols.
          </p>
        </div>

        {/* Balance Display */}
        <div className="bg-[#141416] border border-[#262626] rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/30" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-neutral-500 block uppercase">AVAILABLE IGNIS X BALANCE</span>
            <span className="text-lg font-mono font-bold text-indigo-300">{profile.ignisBalance} <span className="text-xs font-normal text-indigo-400">IGNIS X</span></span>
          </div>
        </div>
      </div>

      {/* Ritual Power Slider Control */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-300 font-bold uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Ritual Power Level Focus: {powerPowerLevel}%</span>
          </span>
          <span className="text-indigo-400 font-bold">{powerPowerLevel * 10} Hz Harmonic Frequency</span>
        </div>

        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={powerPowerLevel}
          onChange={(e) => setPowerPowerLevel(Number(e.target.value))}
          className="w-full h-2 bg-[#141416] rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />

        <div className="flex justify-between text-[10px] font-mono text-neutral-500">
          <span>100 Hz (Apprentice)</span>
          <span>500 Hz (Adept)</span>
          <span>1000 Hz (Avatar / Seventh Sigil)</span>
        </div>
      </div>

      {/* Active Ritual Message Notification */}
      {ritualMessage && (
        <div className="bg-[#141416] border border-indigo-500/40 rounded-2xl p-4 text-center font-mono text-xs text-indigo-200 shadow-xl flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
          <span>{ritualMessage}</span>
        </div>
      )}

      {/* Rituals Grid */}
      <div>
        <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-indigo-400" />
          <span>AVAILABLE SACRED RITUALS</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SACRED_RITUALS.map((ritual) => {
            const isRunning = activeRitualId === ritual.id;
            const canAfford = profile.ignisBalance >= ritual.ignisCost;

            return (
              <div
                key={ritual.id}
                className={`rounded-2xl border p-5 space-y-4 transition-all relative overflow-hidden ${
                  isRunning
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-xl'
                    : 'bg-[#141416] border-[#262626] hover:border-[#404043]'
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0A0A0B] border border-[#262626] flex items-center justify-center">
                      {getRitualIcon(ritual.icon)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-mono text-white">{ritual.name}</h4>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        Requires Level: {ritual.requiredLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-xs font-bold text-indigo-400 block">{ritual.ignisCost} IGNIS</span>
                    <span className="text-[10px] text-emerald-400">+{ritual.coherenceReward}% Coherence</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {ritual.description}
                </p>

                <button
                  onClick={() => handleExecuteRitual(ritual)}
                  disabled={isRunning || !canAfford}
                  className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    isRunning
                      ? 'bg-indigo-600 text-white animate-pulse'
                      : canAfford
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-[#0A0A0B] text-neutral-500 border border-[#262626] cursor-not-allowed'
                  }`}
                >
                  <Zap className="w-4 h-4 text-indigo-200" />
                  <span>{isRunning ? 'EXECUTION IN PROGRESS...' : canAfford ? 'EXECUTE RITUAL' : 'INSUFFICIENT IGNIS'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* IGNIS Transaction History Ledger */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              IGNIS TRANSACTION HISTORY LEDGER
            </h3>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">REAL-TIME LOG</span>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-60 overflow-y-auto pr-1 scrollbar-none">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-[#141416] border border-[#262626] rounded-xl p-3 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                  tx.type === 'earn' || tx.type === 'tier_upgrade'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                }`}>
                  {tx.type === 'earn' || tx.type === 'tier_upgrade' ? '+' : '-'}
                </div>
                <div>
                  <span className="text-white font-semibold block">{tx.source}</span>
                  <span className="text-[10px] text-neutral-500">{new Date(tx.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <div className="text-right">
                <span className={`font-bold block ${
                  tx.type === 'earn' || tx.type === 'tier_upgrade' ? 'text-emerald-400' : 'text-indigo-400'
                }`}>
                  {tx.type === 'earn' || tx.type === 'tier_upgrade' ? '+' : '-'}{tx.amount} IGNIS
                </span>
                <span className="text-[10px] text-neutral-500">Bal: {tx.balanceAfter}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
