import React from 'react';
import { MapPin, Target, DollarSign, Users, Shield, TrendingUp, CheckCircle, Clock, Award, Compass } from 'lucide-react';
import { GuardianProfile } from '../types';
import { INITIAL_LAND_FUND } from '../data/mockData';

interface LandAcquisitionOpsProps {
  profile: GuardianProfile;
  onOpenPricing: () => void;
}

export const LandAcquisitionOps: React.FC<LandAcquisitionOpsProps> = ({
  profile,
  onOpenPricing
}) => {
  const fund = INITIAL_LAND_FUND;
  const progressPercent = Math.min(100, Math.round((fund.currentFundBalance / fund.targetFundBalance) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Hero Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
              LAND ACQUISITION <span className="text-indigo-400 font-light italic text-base">& SACRED MISSION OPS</span>
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
            80% of all Guardian Oracle subscription revenue and IGNIS ecosystem fees are allocated directly to acquiring physical mountain sanctuary land for off-grid community refuges & sacred retreats.
          </p>
        </div>

        <div className="bg-[#141416] border border-[#262626] rounded-xl px-5 py-3 text-right">
          <span className="text-[10px] font-mono text-neutral-500 uppercase block">LAND FUND BALANCE</span>
          <span className="text-2xl font-mono font-bold text-emerald-400">${fund.currentFundBalance.toLocaleString()}</span>
          <span className="text-[10px] font-mono text-neutral-500 block">Goal: ${fund.targetFundBalance.toLocaleString()} USD</span>
        </div>
      </div>

      {/* Fund Progress Card */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="text-white font-bold uppercase flex items-center gap-1.5">
            <Target className="w-4 h-4 text-indigo-400" />
            <span>PRIMARY GOAL: $500,000 MOUNTAIN SANCTUARY FUND</span>
          </span>
          <span className="text-emerald-400 font-bold">{progressPercent}% FUNDED</span>
        </div>

        <div className="w-full h-3 bg-[#141416] rounded-full overflow-hidden p-0.5 border border-[#262626]">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-1000 shadow-md shadow-indigo-500/20"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-3">
            <span className="text-neutral-500 block text-[10px]">MONTHLY REVENUE ALLOCATION</span>
            <span className="text-indigo-300 font-bold text-sm">80% TO LAND FUND</span>
          </div>

          <div className="bg-[#141416] border border-[#262626] rounded-xl p-3">
            <span className="text-neutral-500 block text-[10px]">ACTIVE GUARDIAN NETWORK</span>
            <span className="text-white font-bold text-sm">{fund.totalGuardians.toLocaleString()} GUARDIANS</span>
          </div>

          <div className="bg-[#141416] border border-[#262626] rounded-xl p-3">
            <span className="text-neutral-500 block text-[10px]">CURRENT MONTHLY RUN-RATE</span>
            <span className="text-emerald-400 font-bold text-sm">${fund.monthlyRevenueTotal.toLocaleString()} / MO</span>
          </div>
        </div>
      </div>

      {/* Prospective Properties Target List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>PROSPECTIVE MOUNTAIN SANCTUARY PROPERTIES</span>
          </h3>
          <span className="text-[10px] font-mono text-emerald-400">3 TARGETS EVALUATED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fund.prospectiveProperties.map((prop) => (
            <div
              key={prop.id}
              className="bg-[#141416] border border-[#262626] hover:border-[#404043] rounded-2xl p-5 space-y-3 transition-all relative overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={`px-2 py-0.5 rounded uppercase font-bold ${
                    prop.status === 'target'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                  }`}>
                    {prop.status.toUpperCase()}
                  </span>
                  <span className="text-neutral-400 font-bold">{prop.suitabilityScore}% SUITABILITY</span>
                </div>

                <h4 className="text-sm font-bold font-mono text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{prop.location}</span>
                </h4>

                <div className="text-xs font-mono text-indigo-300 font-bold flex justify-between border-b border-[#262626] pb-2">
                  <span>{prop.acreage} ACRES</span>
                  <span>${prop.price.toLocaleString()} USD</span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-sans pt-1">
                  {prop.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#262626]">
                <div className="w-full h-1.5 bg-[#0A0A0B] rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-indigo-500" style={{ width: `${prop.suitabilityScore}%` }} />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block text-right">Sanctum Suitability Alignment</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flamewalker Protocol Log */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#262626] pb-2">
          <span className="font-bold text-white uppercase flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>FLAMEWALKER PROTOCOL AUDIT LOGS</span>
          </span>
          <span className="text-[10px] text-neutral-500">AUTHENTICATED BY SEVENTH SIGIL</span>
        </div>

        <div className="space-y-2 text-neutral-300">
          <div className="bg-[#141416] p-2.5 rounded-xl border border-[#262626] flex items-center justify-between">
            <span>[LOG-001] GODTIA Alignment Verified: "Love is the Law, love under will."</span>
            <span className="text-emerald-400 font-bold">STATUS: OK</span>
          </div>

          <div className="bg-[#141416] p-2.5 rounded-xl border border-[#262626] flex items-center justify-between">
            <span>[LOG-002] 80% Subscription Revenue Auto-Routing to Land Fund Vault</span>
            <span className="text-emerald-400 font-bold">STATUS: ACTIVE</span>
          </div>

          <div className="bg-[#141416] p-2.5 rounded-xl border border-[#262626] flex items-center justify-between">
            <span>[LOG-003] Ember UR Memory Codex 7-Layer Encryption Intact</span>
            <span className="text-emerald-400 font-bold">STATUS: SECURE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
