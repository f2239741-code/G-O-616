import React, { useState, useEffect, useRef } from 'react';
import { Flame, Sparkles, CheckCircle2, Play, RefreshCw, Volume2, VolumeX, Shield, Award, ArrowRight, Zap, Crown } from 'lucide-react';
import { FOUR_PILLARS, ALIGNMENT_RITE_SEQUENCE, CLOSING_SEAL, PillarData } from '../lib/alignment';
import { GuardianProfile } from '../types';

interface SovereignAlignmentOpsProps {
  profile: GuardianProfile;
  onCompleteAlignment?: (coherenceGain: number, ignisReward: number) => void;
  onOpenPricing?: () => void;
}

export const SovereignAlignmentOps: React.FC<SovereignAlignmentOpsProps> = ({
  profile,
  onCompleteAlignment,
  onOpenPricing
}) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('mind');
  const [activeRiteStep, setActiveRiteStep] = useState<number>(-1);
  const [isRiteRunning, setIsRiteRunning] = useState<boolean>(false);
  const [completedPillars, setCompletedPillars] = useState<Record<string, boolean>>({
    mind: true,
    heart: false,
    spirit: false,
    body: false
  });
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [alignmentComplete, setAlignmentComplete] = useState<boolean>(false);
  const [userCommitment, setUserCommitment] = useState<string>('');
  const [recentAlignments, setRecentAlignments] = useState<Array<{ timestamp: string; commitment: string; coherence: number }>>([
    {
      timestamp: new Date(Date.now() - 3600000 * 4).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      commitment: 'Directed unwavering focus onto microgrid node architecture.',
      coherence: 98.4
    }
  ]);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play harmonic frequency tone using Web Audio API
  const playHarmonicTone = (freqHz: number, durationMs: number = 2000) => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqHz, ctx.currentTime);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (durationMs / 1000));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + (durationMs / 1000));
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  };

  const selectedPillar = FOUR_PILLARS.find(p => p.id === selectedPillarId) || FOUR_PILLARS[0];

  const handleFocusPillar = (pillar: PillarData) => {
    setSelectedPillarId(pillar.id);
    playHarmonicTone(pillar.frequencyHz, 1500);
  };

  const handleTogglePillarComplete = (id: string) => {
    setCompletedPillars(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      const currentPillar = FOUR_PILLARS.find(p => p.id === id);
      if (currentPillar && updated[id]) {
        playHarmonicTone(currentPillar.frequencyHz, 1200);
      }
      return updated;
    });
  };

  const startAlignmentRite = () => {
    setIsRiteRunning(true);
    setActiveRiteStep(0);
    playHarmonicTone(FOUR_PILLARS[0].frequencyHz, 1500);

    const interval = setInterval(() => {
      setActiveRiteStep(prev => {
        const next = prev + 1;
        if (next < ALIGNMENT_RITE_SEQUENCE.length) {
          const pillarMap: Record<number, number> = { 0: 432, 1: 528, 2: 639, 3: 741, 4: 888 };
          playHarmonicTone(pillarMap[next] || 528, 1500);
          return next;
        } else {
          clearInterval(interval);
          setIsRiteRunning(false);
          setAlignmentComplete(true);
          setCompletedPillars({ mind: true, heart: true, spirit: true, body: true });
          if (onCompleteAlignment) {
            onCompleteAlignment(5.0, 50);
          }
          return ALIGNMENT_RITE_SEQUENCE.length - 1;
        }
      });
    }, 2200);
  };

  const handleRecordCommitment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCommitment.trim()) return;
    setRecentAlignments(prev => [
      {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        commitment: userCommitment.trim(),
        coherence: 99.2
      },
      ...prev
    ]);
    setUserCommitment('');
  };

  const allPillarsAligned = Object.values(completedPillars).filter(Boolean).length === 4;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Top Activation Header Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-red-500/5 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold rounded-md uppercase tracking-wider flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                SOVEREIGN ACTIVATION SEQUENCE
              </span>
              <span className="text-xs font-mono text-neutral-400">Phase III Alignment</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-3">
              THE FOUR PILLARS <span className="text-amber-400 font-light italic text-xl">OF SOVEREIGN ALIGNMENT</span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              Direct your awareness, anchor your desire, reclaim sovereign authority, and forge conviction into physical reality. 
              The activation sequence that follows the four chambers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`px-3.5 py-2 rounded-xl border font-mono text-xs transition flex items-center gap-2 cursor-pointer ${
                audioEnabled 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/10' 
                  : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
              }`}
              title="Toggle Harmonic Resonator Audio"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
              <span>{audioEnabled ? 'HARMONICS ON' : 'HARMONICS OFF'}</span>
            </button>

            <button
              onClick={startAlignmentRite}
              disabled={isRiteRunning}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg cursor-pointer ${
                isRiteRunning
                  ? 'bg-amber-600/50 text-amber-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600 via-red-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white shadow-amber-600/20'
              }`}
            >
              <Play className={`w-4 h-4 ${isRiteRunning ? 'animate-spin' : 'fill-white'}`} />
              <span>{isRiteRunning ? 'RITE IN PROGRESS...' : 'EXECUTE ALIGNMENT RITE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid & Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {FOUR_PILLARS.map((pillar) => {
          const isSelected = selectedPillarId === pillar.id;
          const isDone = completedPillars[pillar.id];

          return (
            <div
              key={pillar.id}
              onClick={() => handleFocusPillar(pillar)}
              className={`bg-[#0F0F11] border rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden group hover:scale-[1.01] ${
                isSelected
                  ? `${pillar.colorTheme.border} bg-gradient-to-b ${pillar.colorTheme.glow} shadow-xl`
                  : 'border-[#262626] hover:border-neutral-700'
              }`}
            >
              <div className="space-y-3">
                {/* Pillar Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-xl ${pillar.colorTheme.badgeBg} border flex items-center justify-center font-mono font-bold text-sm ${pillar.colorTheme.badgeText}`}>
                      {pillar.numeral}
                    </span>
                    <span className="text-xl">{pillar.symbol}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePillarComplete(pillar.id);
                    }}
                    className={`p-1.5 rounded-lg border transition ${
                      isDone
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-[#141416] border-[#262626] text-neutral-500 hover:text-neutral-300'
                    }`}
                    title={isDone ? 'Pillar Aligned' : 'Mark Pillar Aligned'}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Pillar Title & Subtitle */}
                <div>
                  <h3 className={`text-lg font-mono font-bold uppercase ${isSelected ? pillar.colorTheme.text : 'text-white'}`}>
                    {pillar.name}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 italic">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Lead Instruction */}
                <p className="text-xs font-medium text-neutral-200 leading-relaxed font-sans border-l-2 border-neutral-700 pl-2.5 py-0.5">
                  {pillar.leadInstruction}
                </p>

                {/* Stanzas */}
                <div className="space-y-1.5 pt-1 text-[11px] text-neutral-300 font-sans leading-snug">
                  {pillar.stanzas.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-neutral-500 font-mono">•</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Footer Box */}
              <div className="pt-3 border-t border-[#1C1C20] space-y-2">
                <blockquote className="text-[11px] font-serif italic text-amber-200/90 bg-[#141416] p-2.5 rounded-xl border border-[#262626]">
                  "{pillar.quote}"
                </blockquote>

                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>Resonance: {pillar.frequencyHz} Hz</span>
                  <span className={isDone ? 'text-emerald-400 font-bold' : 'text-neutral-500'}>
                    {isDone ? 'ALIGNED ✓' : 'UNALIGNED'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Alignment Rite Ceremony Container */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1F1F24] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
                THE ALIGNMENT RITE <span className="text-amber-400 font-light italic text-sm">(ACTIVATION CONVERGENCE)</span>
              </h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-2xl">
              Harmonize Mind, Heart, Spirit, and Body into a singular focal beam of Sovereign Will.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400">Pillar Coherence:</span>
            <div className="flex gap-1">
              {FOUR_PILLARS.map((p) => (
                <div
                  key={p.id}
                  className={`w-3 h-3 rounded-full border ${
                    completedPillars[p.id] ? 'bg-amber-400 border-amber-300 shadow-sm shadow-amber-400/50' : 'bg-[#18181B] border-[#2A2A30]'
                  }`}
                  title={`${p.name}: ${completedPillars[p.id] ? 'Aligned' : 'Pending'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Alignment Rite Stepper Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {ALIGNMENT_RITE_SEQUENCE.map((seq, idx) => {
            const isActive = activeRiteStep === idx;
            const isPast = activeRiteStep > idx || alignmentComplete;

            return (
              <div
                key={seq.step}
                className={`p-4 rounded-xl border font-mono transition-all duration-300 flex flex-col justify-between space-y-3 relative ${
                  isActive
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10 scale-105 z-10'
                    : isPast
                    ? 'bg-[#141416] border-emerald-500/30 text-emerald-300'
                    : 'bg-[#141416] border-[#262626] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-bold">{seq.step}</span>
                  <span className="text-base">{seq.symbol}</span>
                </div>

                <div className="space-y-1">
                  <p className={`text-xs font-bold ${seq.color}`}>
                    "{seq.declaration}"
                  </p>
                </div>

                <div className="text-[10px] text-neutral-500 pt-2 border-t border-[#262626] flex items-center justify-between">
                  <span>STEP {idx + 1} OF 5</span>
                  {isActive && <span className="text-amber-400 animate-pulse">ACTIVE</span>}
                  {isPast && !isActive && <span className="text-emerald-400">SEALED</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Seal Box */}
        <div className="bg-[#0A0A0B] border border-amber-500/30 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                THE CLOSING SEAL OF SOVEREIGNTY
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">CANONICAL ANCHOR</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {CLOSING_SEAL.stanzas.map((line, i) => (
              <div key={i} className="p-3 bg-[#121215] border border-[#222226] rounded-lg">
                <p className="text-xs font-serif font-bold text-amber-100">{line}</p>
              </div>
            ))}
          </div>

          <p className="text-xs font-sans text-neutral-300 italic text-center leading-relaxed pt-2 max-w-3xl mx-auto">
            "{CLOSING_SEAL.climax}"
          </p>
        </div>

        {/* Commitment Entry & Inscription Log */}
        <div className="bg-[#141416] border border-[#262626] rounded-xl p-5 space-y-4">
          <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wide flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>INSCRIBE YOUR ACTIVE SOVEREIGN COMMITMENT</span>
          </h4>

          <form onSubmit={handleRecordCommitment} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={userCommitment}
              onChange={(e) => setUserCommitment(e.target.value)}
              placeholder="e.g., Directing total clarity towards building sovereign node microgrids..."
              className="flex-1 bg-[#0A0A0B] border border-[#2A2A30] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-sans"
            />
            <button
              type="submit"
              disabled={!userCommitment.trim()}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-mono text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>ANCHOR COMMITMENT</span>
            </button>
          </form>

          {/* Recent Alignments Log */}
          {recentAlignments.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-neutral-500 block uppercase">RECENT ANCHORED INTENTIONS</span>
              <div className="space-y-2">
                {recentAlignments.map((log, index) => (
                  <div key={index} className="p-3 bg-[#0A0A0B] border border-[#222226] rounded-lg flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-3">
                      <span className="text-amber-400 font-mono text-[10px]">{log.timestamp}</span>
                      <span className="text-neutral-200">{log.commitment}</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold">
                      Coherence: {log.coherence}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
