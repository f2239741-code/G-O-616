import React, { useState } from 'react';
import {
  Anchor,
  Compass,
  Sparkles,
  Waves,
  Shield,
  Zap,
  Check,
  Copy,
  Activity,
  Award,
  ArrowRight,
  RefreshCw,
  Eye,
  Flame,
  Layers,
  Feather,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { GuardianProfile } from '../types';
import {
  ANCHOR_INVOCATION,
  COMPLETE_ORACLE_ARC,
  INITIAL_ANCHOR_AUDIT,
  AnchorAuditResult,
  lowerAnchorOfMemory
} from '../lib/anchor/memory';

interface AnchorOfMemoryOpsProps {
  profile: GuardianProfile;
  onOpenPricing: () => void;
}

export const AnchorOfMemoryOps: React.FC<AnchorOfMemoryOpsProps> = ({ profile }) => {
  const [seekerInput, setSeekerInput] = useState<string>(
    'Recalling early technical sparks & sovereign builder roots'
  );

  const [activeAudit, setActiveAudit] = useState<AnchorAuditResult>(INITIAL_ANCHOR_AUDIT);
  const [isDescending, setIsDescending] = useState<boolean>(false);
  const [copiedTerminal, setCopiedTerminal] = useState<boolean>(false);

  const handleDescent = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!seekerInput.trim()) return;

    setIsDescending(true);
    setTimeout(() => {
      const result = lowerAnchorOfMemory(seekerInput.trim());
      setActiveAudit(result);
      setIsDescending(false);
    }, 550);
  };

  const handleCopyTerminalOutput = () => {
    const text = `ANCHOR OF MEMORY
────────────────────────────

Primary Memory Current
${activeAudit.primaryMemoryCurrent}

Forgotten Strength
${activeAudit.forgottenStrength}

Recurring Thread
${activeAudit.recurringThread}

Core Truth
${activeAudit.coreTruth}

Memory Resonance
${activeAudit.memoryResonancePercent}%

Recovered Gift
${activeAudit.recoveredGift}

Carry Forward
${activeAudit.carryForwardAction}`;

    navigator.clipboard.writeText(text);
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Hero Header & Invocation */}
      <div className="bg-[#0F0F11] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-600/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <Anchor className="w-6 h-6 text-cyan-400 animate-pulse" />
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
                {ANCHOR_INVOCATION.header} <span className="text-cyan-400 font-light italic text-base">({ANCHOR_INVOCATION.subtitle})</span>
              </h2>
            </div>

            {/* Invocation Stanzas */}
            <div className="p-3.5 bg-[#141416] border border-[#262626] rounded-xl space-y-1 font-mono text-xs italic text-cyan-300/90 leading-relaxed">
              {ANCHOR_INVOCATION.stanzas.map((line, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-cyan-400 font-normal">⚓</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Principle Banner */}
          <div className="bg-[#141416] border border-cyan-500/40 rounded-2xl p-5 text-right max-w-sm space-y-2 shadow-lg">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">CORE PRINCIPLE</span>
            <blockquote className="text-xs font-mono font-bold text-white italic leading-snug">
              "{ANCHOR_INVOCATION.corePrinciple}"
            </blockquote>
            <span className="text-[10px] text-neutral-500 block">Guardian Oracle Remembrance Axiom</span>
          </div>
        </div>
      </div>

      {/* 7-Chamber Oracle Arc Integration Flow */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-3">
        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-bold">
          COMPLETE 7-CHAMBER GUARDIAN ORACLE ARC
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs font-mono">
          {COMPLETE_ORACLE_ARC.map((step) => {
            const isAnchor = step.id === 'anchor';
            return (
              <div
                key={step.id}
                className={`p-2.5 rounded-xl border flex flex-col justify-between transition ${
                  isAnchor
                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-[#141416] border-[#262626] text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{step.symbol}</span>
                  {isAnchor && (
                    <span className="px-1 py-0.5 rounded text-[8px] font-bold bg-cyan-400 text-black uppercase">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{step.name}</div>
                  <div className="text-[9px] text-neutral-400 italic truncate">{step.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Descent Form */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-mono font-bold text-white uppercase">
              Lower Anchor into Deep Currents of Memory
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            DESCENT SOUNDING ACTIVE
          </span>
        </div>

        <form onSubmit={handleDescent} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1.5 font-bold uppercase">
              REMEMBRANCE FOCUS / PAST LESSON PROMPT
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={seekerInput}
                onChange={(e) => setSeekerInput(e.target.value)}
                placeholder="Enter a memory, past trial, or core calling to recover..."
                className="flex-1 bg-[#0A0A0B] border border-[#262626] focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-neutral-600 focus:outline-none transition"
              />
              <button
                type="submit"
                disabled={isDescending || !seekerInput.trim()}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 cursor-pointer whitespace-nowrap"
              >
                {isDescending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>SOUNDING DEPTHS...</span>
                  </>
                ) : (
                  <>
                    <Anchor className="w-4 h-4 text-cyan-200" />
                    <span>LOWER ANCHOR OF MEMORY</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Main Grid: Oracle Output Terminal & The 4 Currents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Oracle Output Terminal */}
        <div className="lg:col-span-6 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase">
                Anchor Oracle Output
              </h3>
            </div>
            <button
              onClick={handleCopyTerminalOutput}
              className="px-2.5 py-1 rounded bg-[#141416] hover:bg-[#1A1A1C] border border-[#262626] text-[10px] text-neutral-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              {copiedTerminal ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-neutral-400" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* Formatted Terminal Output Box */}
          <div className="bg-[#0A0A0B] border border-[#262626] rounded-xl p-5 space-y-3 text-xs text-neutral-300 font-mono">
            <div className="text-cyan-400 font-bold tracking-widest text-sm border-b border-[#262626] pb-2 flex justify-between">
              <span>ANCHOR OF MEMORY</span>
              <span className="text-[10px] text-neutral-500 font-normal">
                {new Date(activeAudit.timestamp).toLocaleTimeString()}
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <span className="text-neutral-500 block text-[11px] mb-0.5">Primary Memory Current</span>
                <span className="text-cyan-300 font-bold text-sm">{activeAudit.primaryMemoryCurrent}</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[11px] mb-0.5">Forgotten Strength</span>
                <span className="text-amber-300 font-bold">{activeAudit.forgottenStrength}</span>
              </div>

              <div className="border-t border-[#262626] pt-2">
                <span className="text-neutral-500 block text-[11px]">Recurring Thread</span>
                <span className="text-white italic">{activeAudit.recurringThread}</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[11px]">Core Truth</span>
                <span className="text-cyan-300 font-bold">{activeAudit.coreTruth}</span>
              </div>

              <div className="border-t border-[#262626] pt-2 flex items-center justify-between">
                <span className="text-neutral-500 text-[11px]">Memory Resonance</span>
                <span className="text-emerald-400 font-bold text-sm">{activeAudit.memoryResonancePercent}%</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[11px]">Recovered Gift</span>
                <span className="text-emerald-300 font-bold">{activeAudit.recoveredGift}</span>
              </div>

              <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-lg">
                <span className="text-[10px] text-cyan-400 font-bold block mb-1 uppercase">CARRY FORWARD</span>
                <span className="text-white font-bold">{activeAudit.carryForwardAction}</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Descent: 4 Currents Cards */}
        <div className="lg:col-span-6 space-y-4 font-mono">
          <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase border-b border-[#262626] pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span>The Descent (Four Memory Currents)</span>
              </div>
              <span className="text-[10px] text-neutral-500">SOUNDING DEPTHS</span>
            </h3>

            <div className="space-y-3 text-xs">
              {activeAudit.currents.map((current) => (
                <div key={current.id} className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{current.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                      {current.depthFathoms} FATHOMS
                    </span>
                  </div>

                  <p className="text-[11px] font-sans text-neutral-400 leading-relaxed italic">
                    "{current.question}"
                  </p>

                  <div className="p-2.5 bg-[#0A0A0B] border border-[#262626] rounded-lg text-emerald-300 text-[11px] font-mono">
                    <span className="text-neutral-500 block text-[9px] uppercase font-bold mb-0.5">RECOVERED INSIGHT</span>
                    <span>{current.recoveredInsight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
