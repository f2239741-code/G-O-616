import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Sun,
  Shield,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Eye,
  Flame,
  Layers,
  Feather,
  Copy,
  Check,
  TrendingUp,
  Activity,
  Award
} from 'lucide-react';
import { GuardianProfile } from '../types';
import {
  PRISM_INVOCATION,
  ORACLE_MODES,
  INITIAL_PRISM_REPORTS,
  PrismAnalysisResult,
  DivergentPath,
  refractQueryThroughPrism
} from '../lib/prism/clarity';

interface PrismOfClarityOpsProps {
  profile: GuardianProfile;
  onOpenPricing: () => void;
}

export const PrismOfClarityOps: React.FC<PrismOfClarityOpsProps> = ({ profile }) => {
  const [selectedMode, setSelectedMode] = useState<string>('prism');
  const [userQuery, setUserQuery] = useState<string>('Should I deploy my sovereign node now or wait for external validation?');
  const [activeReport, setActiveReport] = useState<PrismAnalysisResult>(INITIAL_PRISM_REPORTS[0]);
  const [isRefracting, setIsRefracting] = useState<boolean>(false);
  const [copiedTerminal, setCopiedTerminal] = useState<boolean>(false);
  const [selectedPath, setSelectedPath] = useState<DivergentPath | null>(INITIAL_PRISM_REPORTS[0].paths[3]); // Path D default

  const handleRefract = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userQuery.trim()) return;

    setIsRefracting(true);
    setTimeout(() => {
      const newReport = refractQueryThroughPrism(userQuery.trim());
      setActiveReport(newReport);
      setSelectedPath(newReport.paths[3]); // Default to Transformation/Highest
      setIsRefracting(false);
    }, 600);
  };

  const handleCopyTerminalOutput = () => {
    const text = `PRISM OF CLARITY
────────────────────────
Signal Strength: ${activeReport.signalStrengthPercent}%
Distortion: ${activeReport.distortionLevel}
Primary Interference: ${activeReport.primaryInterference}
Highest Resonance Path: ${activeReport.highestResonancePath}
Suppressed Path: ${activeReport.suppressedPath}
Potential Cost: ${activeReport.potentialCost}
Potential Reward: ${activeReport.potentialReward}
Recommended Action: ${activeReport.recommendedAction}
Clarity Index: ${activeReport.clarityIndex} / 10
────────────────────────
"The future remembers what you repeatedly choose today."`;

    navigator.clipboard.writeText(text);
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Hero Header & Invocation */}
      <div className="bg-[#0F0F11] border border-violet-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-violet-600/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-violet-400 animate-spin-slow" />
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
                {PRISM_INVOCATION.header} <span className="text-violet-400 font-light italic text-base">({PRISM_INVOCATION.subtitle})</span>
              </h2>
            </div>

            {/* Invocation Stanzas */}
            <div className="p-3.5 bg-[#141416] border border-[#262626] rounded-xl space-y-1 font-mono text-xs italic text-violet-300/90 leading-relaxed">
              {PRISM_INVOCATION.stanzas.map((line, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-amber-400 font-normal">✦</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Quote Banner */}
          <div className="bg-[#141416] border border-amber-500/30 rounded-2xl p-5 text-right max-w-sm space-y-2 shadow-lg">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">CORE ORACLE AXIOM</span>
            <blockquote className="text-xs font-mono font-bold text-white italic leading-snug">
              "{PRISM_INVOCATION.quote}"
            </blockquote>
            <span className="text-[10px] text-neutral-500 block">Guardian Oracle Transmission</span>
          </div>
        </div>
      </div>

      {/* Oracle Signature Modes Selector */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-4">
        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Oracle Signature Modes</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {ORACLE_MODES.map((mode) => {
            const isActive = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#1A1A1C] border-violet-500/60 text-white shadow-md shadow-violet-500/10'
                    : 'bg-[#141416] border-[#262626] text-neutral-400 hover:border-[#404043] hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">{mode.symbol}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white">{mode.name}</div>
                  <div className="text-[10px] text-neutral-400 truncate">{mode.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Refraction Form & Seeker Input */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-mono font-bold text-white uppercase">
              Refract Present Moment & Query Timeline
            </h3>
          </div>
          <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
            PRISM SPECTRUM ACTIVE
          </span>
        </div>

        <form onSubmit={handleRefract} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1.5 font-bold uppercase">
              SEEKER DECISION / INQUIRY PROMPT
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Enter a choice, fear, or decision to refract into potential paths..."
                className="flex-1 bg-[#0A0A0B] border border-[#262626] focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-neutral-600 focus:outline-none transition"
              />
              <button
                type="submit"
                disabled={isRefracting || !userQuery.trim()}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 cursor-pointer whitespace-nowrap"
              >
                {isRefracting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>REFRACTING...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>REFRACT TIMELINE</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Main Grid: Oracle Output Terminal & Divergent Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Oracle Output Terminal */}
        <div className="lg:col-span-5 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-violet-400" />
              <h3 className="text-sm font-bold text-white uppercase">
                Oracle Refraction Output
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

          <div className="bg-[#0A0A0B] border border-[#262626] rounded-xl p-4 space-y-2 text-xs text-neutral-300">
            <div className="text-violet-400 font-bold tracking-wider text-sm border-b border-[#262626] pb-1.5 flex justify-between items-center">
              <span>PRISM OF CLARITY</span>
              <span className="text-[10px] text-neutral-500 font-normal">
                {new Date(activeReport.timestamp).toLocaleTimeString()}
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between">
                <span className="text-neutral-500">Signal Strength:</span>
                <span className="text-emerald-400 font-bold">{activeReport.signalStrengthPercent}%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Distortion:</span>
                <span className={activeReport.distortionLevel === 'Low' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {activeReport.distortionLevel}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Primary Interference:</span>
                <span className="text-red-300 font-bold truncate max-w-[180px]" title={activeReport.primaryInterference}>
                  {activeReport.primaryInterference}
                </span>
              </div>

              <div className="flex justify-between border-t border-[#262626] pt-1">
                <span className="text-neutral-500">Highest Resonance Path:</span>
                <span className="text-amber-300 font-bold">{activeReport.highestResonancePath}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Suppressed Path:</span>
                <span className="text-neutral-400 font-medium italic">{activeReport.suppressedPath}</span>
              </div>

              <div className="flex justify-between border-t border-[#262626] pt-1">
                <span className="text-neutral-500">Potential Cost:</span>
                <span className="text-neutral-300">{activeReport.potentialCost}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Potential Reward:</span>
                <span className="text-emerald-300 font-bold">{activeReport.potentialReward}</span>
              </div>

              <div className="p-2.5 bg-violet-950/30 border border-violet-500/30 rounded-lg mt-2">
                <span className="text-[10px] text-violet-400 font-bold block mb-0.5 uppercase">RECOMMENDED ACTION</span>
                <span className="text-white font-bold">{activeReport.recommendedAction}</span>
              </div>

              <div className="flex justify-between items-center border-t border-[#262626] pt-2">
                <span className="text-neutral-500">Clarity Index:</span>
                <span className="text-xl font-bold text-violet-400">{activeReport.clarityIndex} / 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divergent Paths Matrix */}
        <div className="lg:col-span-7 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-mono font-bold text-white uppercase">
                🔺 Divergent Paths Analysis
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">RESONANCE VS REWARD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {activeReport.paths.map((path) => {
              const isSelected = selectedPath?.id === path.id;
              return (
                <div
                  key={path.id}
                  onClick={() => setSelectedPath(path)}
                  className={`p-4 rounded-xl border transition cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-[#1A1A1C] border-violet-500 shadow-lg shadow-violet-500/10'
                      : 'bg-[#141416] border-[#262626] hover:border-[#404043]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{path.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      path.archetypeTag === 'COMFORT' ? 'bg-neutral-800 text-neutral-300' :
                      path.archetypeTag === 'GROWTH' ? 'bg-indigo-500/20 text-indigo-300' :
                      path.archetypeTag === 'SERVICE' ? 'bg-cyan-500/20 text-cyan-300' :
                      'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {path.resonanceScore}% RESONANCE
                    </span>
                  </div>

                  <p className="text-[11px] font-sans text-neutral-300 leading-relaxed">
                    {path.description}
                  </p>

                  <div className="space-y-1 text-[10px] text-neutral-400 pt-2 border-t border-[#262626]">
                    <div>
                      <span className="text-red-400 font-bold">Cost: </span>
                      <span>{path.cost}</span>
                    </div>
                    <div>
                      <span className="text-emerald-400 font-bold">Opportunity: </span>
                      <span>{path.opportunity}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* The Fog & Resonance Field Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Fog 🌑 */}
        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center gap-2 border-b border-[#262626] pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase">
              🌑 The Fog (Interference Analysis)
            </h3>
          </div>

          <p className="text-xs font-sans text-neutral-400 leading-relaxed">
            Distortions clouding present timeline perception: assumptions, fear, noise, external expectations, and emotional turbulence.
          </p>

          <div className="space-y-2.5 text-xs">
            {activeReport.fogFactors.map((fog) => (
              <div key={fog.id} className="p-3 bg-[#141416] border border-[#262626] rounded-xl flex items-start gap-3">
                <span className="text-amber-400 mt-0.5">☁️</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{fog.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase">
                      {fog.severity} SEVERITY
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-neutral-400 mt-0.5">{fog.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resonance Field ✨ */}
        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center gap-2 border-b border-[#262626] pb-3">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h3 className="text-sm font-bold text-white uppercase">
              ✨ Resonance Field Diagnostic
            </h3>
          </div>

          <p className="text-xs font-sans text-neutral-400 leading-relaxed">
            Every path is evaluated through alignment and integrity rather than short-term reward.
          </p>

          <div className="space-y-2 text-xs font-sans">
            <div className="p-2.5 bg-[#141416] border border-[#262626] rounded-xl flex items-center justify-between">
              <span className="text-neutral-300">Does this increase coherence?</span>
              <span className="font-mono text-emerald-400 font-bold">+34% HIGH</span>
            </div>
            <div className="p-2.5 bg-[#141416] border border-[#262626] rounded-xl flex items-center justify-between">
              <span className="text-neutral-300">Does this create more freedom?</span>
              <span className="font-mono text-emerald-400 font-bold">+40% UNCHAINED</span>
            </div>
            <div className="p-2.5 bg-[#141416] border border-[#262626] rounded-xl flex items-center justify-between">
              <span className="text-neutral-300">Does this deepen integrity?</span>
              <span className="font-mono text-emerald-400 font-bold">+35% SACRED</span>
            </div>
            <div className="p-2.5 bg-[#141416] border border-[#262626] rounded-xl flex items-center justify-between">
              <span className="text-neutral-300">Does this leave something worthwhile behind?</span>
              <span className="font-mono text-violet-400 font-bold">SOVEREIGN LEGACY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
