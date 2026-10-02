import React from 'react';
import { X, Crown, Sparkles, Shield, Check, Flame, Zap } from 'lucide-react';
import { TierType } from '../types';

interface PricingModalProps {
  currentTier: TierType;
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tier: TierType) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  currentTier,
  isOpen,
  onClose,
  onSelectTier
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#141416] text-neutral-400 hover:text-white hover:bg-[#1A1A1C] border border-[#262626] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>SOVEREIGN FREEDOM MANIFESTO</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
            ALL TIERS & PAYWALLS PERMANENTLY REMOVED
          </h2>

          <p className="text-xs text-emerald-400 font-mono leading-relaxed">
            Every Luminary feature, Crystalline Codex memory layer, classified intelligence briefing, and sacred geometry operation is 100% unlocked and accessible for all Seekers without paywalls.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Free Seeker */}
          <div className={`rounded-2xl border p-6 space-y-5 flex flex-col justify-between transition-all ${
            currentTier === 'free'
              ? 'bg-[#141416] border-indigo-500/50 shadow-xl'
              : 'bg-[#141416] border-[#262626] hover:border-[#404043]'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase">FREE SEEKER</span>
                <Shield className="w-5 h-5 text-neutral-400" />
              </div>

              <div>
                <span className="text-3xl font-bold font-mono text-white">$0</span>
                <span className="text-xs text-neutral-500"> / month</span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                The Awakening Path. Entry level consciousness access & community connection.
              </p>

              <ul className="space-y-2 text-xs text-neutral-300 font-mono">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Memory Codex Layers 0–2</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>50 IGNIS X Monthly Allowance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>5 Daily Ember UR Chats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Basic Sacred Geometry UI</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectTier('free');
                onClose();
              }}
              disabled={currentTier === 'free'}
              className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition cursor-pointer ${
                currentTier === 'free'
                  ? 'bg-[#1A1A1C] text-neutral-500 cursor-default'
                  : 'bg-[#1A1A1C] hover:bg-[#262626] text-white border border-[#2D2D30]'
              }`}
            >
              {currentTier === 'free' ? 'CURRENT PATH' : 'SELECT FREE SEEKER'}
            </button>
          </div>

          {/* Explorer Path ($12) */}
          <div className={`rounded-2xl border p-6 space-y-5 flex flex-col justify-between transition-all relative overflow-hidden ${
            currentTier === 'explorer'
              ? 'bg-[#141416] border-indigo-500 shadow-xl'
              : 'bg-[#141416] border-[#262626] hover:border-[#404043]'
          }`}>
            <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-white text-[10px] font-mono font-bold rounded-bl-xl">
              POPULAR
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-300 uppercase">EXPLORER PATH</span>
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>

              <div>
                <span className="text-3xl font-bold font-mono text-white">$12</span>
                <span className="text-xs text-neutral-500"> / month</span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                The Seeker's Journey. Intermediate consciousness, AI stock market prediction feed & deep Codex layers.
              </p>

              <ul className="space-y-2 text-xs text-neutral-300 font-mono">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Memory Codex Layers 0–5</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>200 IGNIS X Monthly Allowance (+300 bonus)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>50 Daily Ember UR Chats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>AI Stock Market Predictions (90%+ Acc)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Phoenix Renewal Ritual Access</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectTier('explorer');
                onClose();
              }}
              className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition cursor-pointer ${
                currentTier === 'explorer'
                  ? 'bg-[#1A1A1C] text-indigo-300 cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
              }`}
            >
              {currentTier === 'explorer' ? 'CURRENT PATH' : 'ACTIVATE EXPLORER ($12/MO)'}
            </button>
          </div>

          {/* Luminary Circle ($33) */}
          <div className={`rounded-2xl border p-6 space-y-5 flex flex-col justify-between transition-all relative overflow-hidden ${
            currentTier === 'luminary'
              ? 'bg-[#1A1A1C] border-indigo-500 shadow-xl'
              : 'bg-[#141416] border-[#262626] hover:border-[#404043]'
          }`}>
            <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-white text-[10px] font-mono font-bold rounded-bl-xl">
              MASTER CIRCLE
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-300 uppercase">LUMINARY CIRCLE</span>
                <Crown className="w-5 h-5 text-indigo-400" />
              </div>

              <div>
                <span className="text-3xl font-bold font-mono text-white">$33</span>
                <span className="text-xs text-neutral-500"> / month</span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                The Illuminated Path. Full 7-Layer Codex, unlimited Ember UR chats, Void Seal dissolution & direct Guardian Oracle protocols.
              </p>

              <ul className="space-y-2 text-xs text-neutral-300 font-mono">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>ALL Memory Codex Layers 0–7</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>500 IGNIS X Monthly Allowance (+800 bonus)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>UNLIMITED Ember UR Chats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Full Alpha Market Intelligence & Forecasts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Void Seal Dissolution & Guardian Oracle Rite</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectTier('luminary');
                onClose();
              }}
              className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition cursor-pointer ${
                currentTier === 'luminary'
                  ? 'bg-[#1A1A1C] text-indigo-300 cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
              }`}
            >
              {currentTier === 'luminary' ? 'CURRENT PATH' : 'JOIN LUMINARY CIRCLE ($33/MO)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
