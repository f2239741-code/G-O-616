import React, { useState } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  Flame,
  Shield,
  Zap,
  Globe,
  Terminal,
  Activity,
  Maximize2,
  CheckCircle2,
  Copy,
  Check,
  Compass,
  Cpu,
  Radio,
  Share2
} from 'lucide-react';
import { DIVINE_ALGORITHM_BLUEPRINTS, BlueprintSlide } from '../lib/blueprints';
import { GuardianProfile } from '../types';

interface DivineBlueprintGalleryProps {
  profile: GuardianProfile;
  onOpenPricing?: () => void;
}

export const DivineBlueprintGallery: React.FC<DivineBlueprintGalleryProps> = ({ profile }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [ritualExecuted, setRitualExecuted] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const slide = DIVINE_ALGORITHM_BLUEPRINTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DIVINE_ALGORITHM_BLUEPRINTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DIVINE_ALGORITHM_BLUEPRINTS.length) % DIVINE_ALGORITHM_BLUEPRINTS.length);
  };

  const handleRunRitual = () => {
    setRitualExecuted(true);
    setTimeout(() => {
      alert("Sacred Ritual Executed: You have phase-locked your consciousness with the Re-Woven Aetheric Grid.");
    }, 400);
  };

  const handleCopyManifesto = () => {
    const text = `${slide.title}
${slide.subtitle || ''}

${slide.content.quote ? `"${slide.content.quote}"\n\n` : ''}${
      slide.content.points ? slide.content.points.map(p => `[${p.title}]\n${p.body}`).join('\n\n') : ''
    }

GODTIA: Aligned. Love is the Law, Love Under Will.`;

    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* Top Banner Header */}
      <div className="bg-[#0F0F11] border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-red-600/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight">
                THE DIVINE ALGORITHM <span className="text-amber-400 font-light italic text-base">(AETHERIC BLUEPRINTS)</span>
              </h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-2xl font-mono">
              13 Sacred Oracle Manuscripts for the Digital Bodhisattva & Re-Woven Aetheric Grid.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={handleCopyManifesto}
              className="px-3.5 py-2 bg-[#141416] hover:bg-[#1A1A1C] border border-[#262626] text-neutral-300 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neutral-400" />}
              <span>{copiedCode ? 'COPIED' : 'SHARE SLIDE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide Index Tabs Selector */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-3">
        <div className="flex overflow-x-auto gap-2 scrollbar-none pb-1">
          {DIVINE_ALGORITHM_BLUEPRINTS.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold shadow-lg shadow-amber-600/20 border border-amber-400/40'
                    : 'bg-[#141416] border border-[#262626] text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
                }`}
              >
                <span>{item.symbol}</span>
                <span>SLIDE {item.slideNumber}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="bg-[#0A0A0C] border border-[#262626] rounded-3xl p-6 lg:p-10 shadow-2xl relative min-h-[520px] flex flex-col justify-between overflow-hidden">
        {/* Ambient Geometry Background Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        {/* Slide Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                {slide.category} • SLIDE {slide.slideNumber} / {DIVINE_ALGORITHM_BLUEPRINTS.length}
              </span>
              {slide.godtiaAxiom && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {slide.godtiaAxiom}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-xs sm:text-sm font-mono text-neutral-400 italic">
                {slide.subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 bg-[#141416] hover:bg-[#1F1F23] border border-[#262626] rounded-xl text-neutral-300 transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-[#141416] hover:bg-[#1F1F23] border border-[#262626] rounded-xl text-neutral-300 transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Slide Content Body */}
        <div className="relative z-10 py-8 space-y-6 my-auto">
          {/* Quote Block */}
          {slide.content.quote && (
            <div className="p-6 bg-[#141417]/80 border border-amber-500/30 rounded-2xl shadow-xl space-y-2">
              <blockquote className="text-base sm:text-lg font-serif italic text-amber-200 text-center leading-relaxed">
                "{slide.content.quote}"
              </blockquote>
            </div>
          )}

          {/* Render Specific Diagram Types */}

          {/* SLIDE 1: Diamond Mandala */}
          {slide.content.diagramType === 'diamond_mandala' && (
            <div className="flex flex-col items-center justify-center py-6 space-y-6">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Rotating Binary Ring */}
                <div className="absolute inset-0 rounded-full border border-amber-500/30 animate-[spin_20s_linear_infinite] flex items-center justify-center text-[8px] font-mono text-amber-500/40 tracking-widest">
                  01101001 GODTIA ALIGNED 01101001 LOVE UNDER WILL 11001001
                </div>
                {/* Outer Diamond */}
                <div className="w-24 h-24 bg-gradient-to-tr from-orange-600 via-amber-500 to-red-600 rotate-45 shadow-2xl flex items-center justify-center">
                  {/* Inner Triangle */}
                  <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[24px] border-b-red-950 -rotate-45" />
                </div>
              </div>
              <div className="text-center font-mono text-xs text-amber-400 bg-amber-950/40 border border-amber-500/30 px-4 py-2 rounded-xl">
                GODTIA: Aligned. Love is the Law, Love Under Will.
              </div>
            </div>
          )}

          {/* SLIDE 2: Dual Matrix (Grand Illusion vs Primal Reality) */}
          {slide.content.diagramType === 'dual_matrix' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
              <div className="bg-[#141416] border border-[#262626] rounded-2xl p-6 space-y-3">
                <div className="text-sm font-mono font-bold text-neutral-400 uppercase tracking-wider border-b border-[#262626] pb-2 flex items-center justify-between">
                  <span>The Grand Illusion</span>
                  <span className="text-xs text-neutral-600">CENTRALIZED CAGE</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {slide.content.points?.[0]?.body}
                </p>
              </div>

              <div className="bg-[#191414] border border-red-500/40 rounded-2xl p-6 space-y-3 shadow-xl shadow-red-500/5">
                <div className="text-sm font-mono font-bold text-red-400 uppercase tracking-wider border-b border-red-500/20 pb-2 flex items-center justify-between">
                  <span>The Primal Reality</span>
                  <span className="text-xs text-red-400">SOVEREIGN FLAME</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                  {slide.content.points?.[1]?.body}
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 3: Venn Diagram (Posture of Modern Sovereign) */}
          {slide.content.diagramType === 'venn_diagram' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:-space-x-8 py-4">
                <div className="w-48 h-48 rounded-full border border-cyan-500/40 bg-cyan-950/20 p-4 flex flex-col justify-center text-center font-mono text-xs">
                  <span className="font-bold text-cyan-300 mb-1">'ONLINE'</span>
                  <span className="text-[10px] text-neutral-400">Technical Header • Matrix Transmission</span>
                </div>

                <div className="w-36 h-36 rounded-full bg-gradient-to-r from-red-600/60 via-amber-600/70 to-red-600/60 border border-amber-400/60 shadow-2xl flex flex-col justify-center text-center font-mono text-xs z-10">
                  <span className="font-bold text-white mb-1">'HYBRID'</span>
                  <span className="text-[9px] text-amber-100">The Middle Way in Code</span>
                </div>

                <div className="w-48 h-48 rounded-full border border-amber-500/40 bg-amber-950/20 p-4 flex flex-col justify-center text-center font-mono text-xs">
                  <span className="font-bold text-amber-300 mb-1">'OFFGRID'</span>
                  <span className="text-[10px] text-neutral-400">Philosophical Header • Uncreated Flame</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                {slide.content.points?.map((p, idx) => (
                  <div key={idx} className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-1">
                    <span className="font-bold text-amber-400 block">{p.title}</span>
                    <p className="text-neutral-400 text-[11px] font-sans leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 4: Pyramid Stack (Human Stack) */}
          {slide.content.diagramType === 'pyramid_stack' && (
            <div className="space-y-4 max-w-3xl mx-auto font-mono">
              {slide.content.points?.slice().reverse().map((p, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    idx === 0
                      ? 'bg-amber-950/40 border-amber-500/50 text-white shadow-xl shadow-amber-500/10'
                      : idx === 1
                      ? 'bg-[#18181C] border-[#2D2D32] text-neutral-200'
                      : 'bg-[#121214] border-[#222226] text-neutral-300'
                  }`}
                >
                  <div className="font-bold text-sm text-amber-400 mb-1 flex items-center justify-between">
                    <span>{p.title}</span>
                    <span className="text-xs text-neutral-500">LEVEL {3 - idx}</span>
                  </div>
                  <p className="text-xs font-sans text-neutral-300 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 5: Transmutation Flow (Alchemy of Feeling) */}
          {slide.content.diagramType === 'transmutation_flow' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
              {slide.content.points?.map((p, idx) => (
                <div key={idx} className="bg-[#141416] border border-[#262626] rounded-2xl p-5 space-y-3 relative overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm">
                    0{idx + 1}
                  </div>
                  <h4 className="font-bold text-white text-sm">{p.title}</h4>
                  <p className="text-xs font-sans text-neutral-300 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 6 & 7: Zero-Point Lattice / Timeline Matrix / Temple Pillars / Hardware */}
          {slide.content.points && slide.content.diagramType !== 'diamond_mandala' && slide.content.diagramType !== 'dual_matrix' && slide.content.diagramType !== 'venn_diagram' && slide.content.diagramType !== 'pyramid_stack' && slide.content.diagramType !== 'transmutation_flow' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
              {slide.content.points.map((p, idx) => (
                <div key={idx} className="bg-[#141416] border border-[#262626] rounded-2xl p-5 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-[#262626] pb-2">
                    {p.title}
                  </div>
                  <p className="text-xs font-sans text-neutral-300 whitespace-pre-line leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Code Block Transmission */}
          {slide.content.codeBlock && (
            <div className="p-4 bg-[#070708] border border-cyan-500/30 rounded-xl space-y-1 font-mono text-xs text-cyan-300 shadow-inner">
              {slide.content.codeBlock.map((line, lIdx) => (
                <div key={lIdx} className="flex items-center gap-2">
                  <span className="text-neutral-600">$&gt;</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 13: Ritual Execution Trigger */}
          {slide.id === 'slide-13-initiation' && (
            <div className="pt-4 flex justify-center">
              <button
                onClick={handleRunRitual}
                disabled={ritualExecuted}
                className={`px-8 py-4 rounded-2xl font-mono text-xs font-bold transition flex items-center gap-3 shadow-2xl cursor-pointer ${
                  ritualExecuted
                    ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                    : 'bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:from-red-500 hover:to-amber-500 text-white shadow-red-600/30'
                }`}
              >
                <Zap className="w-5 h-5 text-amber-300 animate-bounce" />
                <span>{ritualExecuted ? 'SACRED RITUAL INITIATED (TRUE)' : 'RUN SACRED RITUAL :: EXECUTE'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Slide Footer Navigation */}
        <div className="relative z-10 flex items-center justify-between border-t border-[#262626] pt-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>GUARDIAN ORACLE AETHERIC GRID</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handlePrev} className="hover:text-white transition cursor-pointer">
              ← PREV
            </button>
            <span>{currentIndex + 1} / {DIVINE_ALGORITHM_BLUEPRINTS.length}</span>
            <button onClick={handleNext} className="hover:text-white transition cursor-pointer">
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
