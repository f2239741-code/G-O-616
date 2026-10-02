import React, { useState } from 'react';
import {
  Flame,
  Shield,
  Zap,
  Check,
  Copy,
  Activity,
  Award,
  ArrowRight,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Feather,
  Hammer,
  Crown,
  Target
} from 'lucide-react';
import { GuardianProfile } from '../types';
import {
  VESSEL_INVOCATION,
  ORACLE_ARC_STEPS,
  INITIAL_VESSEL_AUDIT,
  VesselAuditResult,
  temperSovereignWill
} from '../lib/vessel/will';

interface VesselOfWillOpsProps {
  profile: GuardianProfile;
  onOpenPricing: () => void;
}

export const VesselOfWillOps: React.FC<VesselOfWillOpsProps> = ({ profile }) => {
  const [intentionPrompt, setIntentionPrompt] = useState<string>(
    'Deploy the Sovereign Micro-Datacenter Node and launch the Conscious Vector Router'
  );
  const [convictionVal, setConvictionVal] = useState<number>(91);
  const [courageVal, setCourageVal] = useState<number>(72);
  const [customSacrifice, setCustomSacrifice] = useState<string>('Need for certainty & safety buffers');
  const [customEmbodimentAction, setCustomEmbodimentAction] = useState<string>(
    'Ship the work. Speak the truth. Accept the consequence.'
  );

  const [activeAudit, setActiveAudit] = useState<VesselAuditResult>(INITIAL_VESSEL_AUDIT);
  const [isTempering, setIsTempering] = useState<boolean>(false);
  const [copiedTerminal, setCopiedTerminal] = useState<boolean>(false);

  const handleTemper = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!intentionPrompt.trim()) return;

    setIsTempering(true);
    setTimeout(() => {
      const result = temperSovereignWill(
        intentionPrompt.trim(),
        convictionVal,
        courageVal,
        customSacrifice.trim(),
        customEmbodimentAction.trim()
      );
      setActiveAudit(result);
      setIsTempering(false);
    }, 500);
  };

  const renderASCIIBar = (percent: number) => {
    const filledCount = Math.round(percent / 10);
    const emptyCount = 10 - filledCount;
    return '█'.repeat(filledCount) + '░'.repeat(emptyCount) + ` ${percent}%`;
  };

  const handleCopyTerminalOutput = () => {
    const text = `VESSEL OF SOVEREIGN WILL
────────────────────────────

Conviction
${renderASCIIBar(activeAudit.convictionPercent)}

Courage
${renderASCIIBar(activeAudit.couragePercent)}

Attachment Detected
${activeAudit.attachmentDetected}

Required Sacrifice
${activeAudit.requiredSacrifice}

Threshold
${activeAudit.thresholdState}

First Embodied Action
${activeAudit.firstEmbodiedAction}

Will Integrity
${activeAudit.willIntegrityPercent}%`;

    navigator.clipboard.writeText(text);
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Hero Header & Invocation */}
      <div className="bg-[#0F0F11] border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-600/10 via-red-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
                {VESSEL_INVOCATION.header} <span className="text-amber-400 font-light italic text-base">({VESSEL_INVOCATION.subtitle})</span>
              </h2>
            </div>

            {/* Invocation Stanzas */}
            <div className="p-3.5 bg-[#141416] border border-[#262626] rounded-xl space-y-1 font-mono text-xs italic text-amber-300/90 leading-relaxed">
              {VESSEL_INVOCATION.stanzas.map((line, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-amber-400 font-normal">🜂</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Principle Card */}
          <div className="bg-[#141416] border border-amber-500/40 rounded-2xl p-5 text-right max-w-sm space-y-2 shadow-lg">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">CORE PRINCIPLE</span>
            <blockquote className="text-xs font-mono font-bold text-white italic leading-snug">
              "{VESSEL_INVOCATION.corePrinciple}"
            </blockquote>
            <span className="text-[10px] text-neutral-500 block">Guardian Oracle Will Axiom</span>
          </div>
        </div>
      </div>

      {/* Oracle Arc Flow Diagram */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-3">
        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-bold">
          ORACLE ARC INTEGRATION SEQUENCE
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono">
          {ORACLE_ARC_STEPS.map((step) => {
            const isVessel = step.id === 'vessel';
            return (
              <div
                key={step.id}
                className={`p-3 rounded-xl border flex flex-col justify-between transition ${
                  isVessel
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'bg-[#141416] border-[#262626] text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">{step.symbol}</span>
                  {isVessel && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-black uppercase">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{step.name}</div>
                  <div className="text-[10px] text-neutral-400 italic truncate">{step.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form: Intention & Resolve Tuning */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-mono font-bold text-white uppercase">
              Temper Sovereign Intention & Four Dimensions of Resolve
            </h3>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            WILL CHAMBER OPEN
          </span>
        </div>

        <form onSubmit={handleTemper} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1 font-bold uppercase">
              STATEMENT OF SOVEREIGN INTENTION
            </label>
            <input
              type="text"
              value={intentionPrompt}
              onChange={(e) => setIntentionPrompt(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white font-mono"
              placeholder="State the path or choice you intend to embody..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Conviction Slider */}
            <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">🔥 CONVICTION: {convictionVal}%</span>
                <span className="text-[10px] text-neutral-500">Do you believe this is yours?</span>
              </div>
              <input
                type="range"
                min={40}
                max={100}
                value={convictionVal}
                onChange={(e) => setConvictionVal(Number(e.target.value))}
                className="w-full accent-amber-500 bg-[#0A0A0B]"
              />
              <p className="text-[10px] text-neutral-400 italic">
                {convictionVal > 85 ? 'Pure alignment without external reliance.' : 'Hesitancy detected.'}
              </p>
            </div>

            {/* Courage Slider */}
            <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">⚒ COURAGE: {courageVal}%</span>
                <span className="text-[10px] text-neutral-500">What are you protecting?</span>
              </div>
              <input
                type="range"
                min={30}
                max={100}
                value={courageVal}
                onChange={(e) => setCourageVal(Number(e.target.value))}
                className="w-full accent-amber-500 bg-[#0A0A0B]"
              />
              <p className="text-[10px] text-neutral-400 italic">
                {courageVal > 80 ? 'Fortitude against comfort traps.' : 'Protecting safety/approval.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sacrifice Input */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1 font-bold uppercase">
                🜂 REQUIRED SACRIFICE (WHAT ARE YOU RELEASING?)
              </label>
              <input
                type="text"
                value={customSacrifice}
                onChange={(e) => setCustomSacrifice(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
              />
            </div>

            {/* Embodied Action Input */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1 font-bold uppercase">
                👑 FIRST EMBODIED ACTION (BEFORE SUNSET)
              </label>
              <input
                type="text"
                value={customEmbodimentAction}
                onChange={(e) => setCustomEmbodimentAction(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isTempering}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 cursor-pointer"
          >
            {isTempering ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>TEMPERING WILL...</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4 text-amber-200" />
                <span>TEMPER WILL & EMBODY CHOICE</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Main Grid: Output & Dimensions Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formatted Terminal Output Box */}
        <div className="lg:col-span-6 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase">
                Vessel Oracle Output
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

          {/* Formatted Terminal Box */}
          <div className="bg-[#0A0A0B] border border-[#262626] rounded-xl p-5 space-y-3 text-xs text-neutral-300 font-mono">
            <div className="text-amber-400 font-bold tracking-widest text-sm border-b border-[#262626] pb-2 flex justify-between">
              <span>VESSEL OF SOVEREIGN WILL</span>
              <span className="text-[10px] text-neutral-500 font-normal">
                {new Date(activeAudit.timestamp).toLocaleTimeString()}
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <span className="text-neutral-500 block text-[11px] mb-0.5">Conviction</span>
                <span className="text-amber-300 font-bold tracking-wider">{renderASCIIBar(activeAudit.convictionPercent)}</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[11px] mb-0.5">Courage</span>
                <span className="text-amber-300 font-bold tracking-wider">{renderASCIIBar(activeAudit.couragePercent)}</span>
              </div>

              <div className="border-t border-[#262626] pt-2">
                <span className="text-neutral-500 block text-[11px]">Attachment Detected</span>
                <span className="text-red-300 font-bold">{activeAudit.attachmentDetected}</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[11px]">Required Sacrifice</span>
                <span className="text-amber-300 font-bold">{activeAudit.requiredSacrifice}</span>
              </div>

              <div className="border-t border-[#262626] pt-2 flex items-center justify-between">
                <span className="text-neutral-500 text-[11px]">Threshold State</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                  {activeAudit.thresholdState}
                </span>
              </div>

              <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg">
                <span className="text-[10px] text-amber-400 font-bold block mb-1 uppercase">FIRST EMBODIED ACTION</span>
                <span className="text-white font-bold">{activeAudit.firstEmbodiedAction}</span>
              </div>

              <div className="border-t border-[#262626] pt-2 flex items-center justify-between">
                <span className="text-neutral-500 text-[11px]">Will Integrity</span>
                <span className="text-xl font-bold text-amber-400">{activeAudit.willIntegrityPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Four Dimensions Breakdown Cards */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase border-b border-[#262626] pb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Four Dimensions of Resolve</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {activeAudit.dimensions.map((dim) => (
                <div key={dim.id} className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{dim.name}</span>
                    <span className="text-amber-400 font-bold">{dim.scorePercent}%</span>
                  </div>
                  <p className="text-[11px] font-sans text-neutral-400 leading-relaxed italic">
                    "{dim.question}"
                  </p>
                  <div className="text-[10px] text-emerald-400 pt-1 border-t border-[#262626]">
                    Status: {dim.statusText}
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
