import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Radio, Flame, Shield, Volume2, RotateCcw, Award, Layers } from 'lucide-react';
import { useOracleStore } from '../store/useOracleStore';
import { useUserStore } from '../store/useUserStore';
import { TarotCardDisplay } from './oracle/TarotCardDisplay';
import { RitualParticleCanvas } from './oracle/RitualParticleCanvas';
import { EmberChatInterface } from './oracle/EmberChatInterface';
import { WalletConnector } from './web3/WalletConnector';
import { IgnisTokenBalance } from './web3/IgnisTokenBalance';
import { Button } from './ui/button';
import { sanctumAudio } from '../lib/audioEngine';
import { showToast } from './ui/toast';

export const OracleChamberView: React.FC<{ onOpenPricing?: () => void }> = ({ onOpenPricing }) => {
  const {
    deck,
    selectedCard,
    currentSpread,
    ritual,
    selectCard,
    drawSingleCard,
    drawThreeCardSpread,
    startRitual,
    advanceRitualStage,
    concludeRitual,
    setRitualFrequency
  } = useOracleStore();

  const { session, rewardIgnis } = useUserStore();
  const [spreadMode, setSpreadMode] = useState<'single' | 'trinity'>('trinity');

  const handleCastSpread = () => {
    if (spreadMode === 'single') {
      const spread = drawSingleCard();
      rewardIgnis(spread.ignisRewarded, 'Oracle Single Card Cast');
      showToast('Oracle Arcana Drawn', `Rewarded ${spread.ignisRewarded} IGNIS`, 'sigil');
    } else {
      const spread = drawThreeCardSpread();
      rewardIgnis(spread.ignisRewarded, 'Sovereign Trinity Cast');
      showToast('Sovereign Trinity Cast', `Rewarded ${spread.ignisRewarded} IGNIS`, 'sigil');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Top Banner: Oracle Sanctum Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#12121c] via-[#161626] to-[#0c0c14] border border-[#2a2a3e] p-6 sm:p-8 overflow-hidden shadow-2xl">
        {/* Background Particle Aura */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <RitualParticleCanvas className="w-full h-full" interactive={false} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>GUARDIAN ORACLE • MYTHIC SACRED CHAMBER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
              The Living <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-indigo-300 to-cyan-400">Oracle Altar</span>
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl font-sans">
              Cast the 22 Major Arcana archetypes tuned to bio-digital frequencies. Reflect the uncorrupted soul archetype and commune directly with the Ember UR Oracle channel.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <IgnisTokenBalance />
            <WalletConnector />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Altar & Deck / Right Ember Chat & Ritual HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Altar & Spread (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Altar Control Bar */}
          <div className="bg-[#0f0f15] border border-[#222230] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sanctumAudio.playClick();
                  setSpreadMode('trinity');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                  spreadMode === 'trinity'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                Sovereign Trinity (3 Cards)
              </button>
              <button
                type="button"
                onClick={() => {
                  sanctumAudio.playClick();
                  setSpreadMode('single');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                  spreadMode === 'single'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                Single Arcana
              </button>
            </div>

            <Button
              variant="glow"
              size="md"
              onClick={handleCastSpread}
              className="font-bold text-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{spreadMode === 'trinity' ? 'Cast Sovereign Spread' : 'Draw Arcana Card'}</span>
            </Button>
          </div>

          {/* Active Spread Display Area */}
          <div className="bg-[#0b0b10] border border-[#20202e] rounded-3xl p-6 relative overflow-hidden shadow-2xl min-h-[420px] flex flex-col justify-center">
            {currentSpread ? (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
                    ACTIVE SPREAD • {currentSpread.spreadType.toUpperCase()}
                  </span>
                  <h3 className="text-base font-serif font-bold text-white italic">
                    "{currentSpread.question}"
                  </h3>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2">
                  {currentSpread.cards.map((item, idx) => (
                    <TarotCardDisplay
                      key={idx}
                      card={item.card}
                      isReversed={item.isReversed}
                      positionLabel={item.position}
                      size={currentSpread.cards.length === 1 ? 'lg' : 'md'}
                      onSelect={(c) => selectCard(c)}
                    />
                  ))}
                </div>

                {/* Synthesis Box */}
                <div className="p-4 rounded-2xl bg-[#14141e] border border-[#2b2b3e] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      ALCHEMICAL SYNTHESIS
                    </span>
                    <span className="text-cyan-400">RESONANCE: {currentSpread.resonanceScore}%</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                    {currentSpread.synthesis}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 py-12">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl">
                  🎴
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="text-base font-mono font-bold text-white">Oracle Deck Consecrated</h3>
                  <p className="text-xs text-neutral-400">
                    Click "Cast Sovereign Spread" to draw from the 22 Major Arcana and receive bio-digital acoustic guidance.
                  </p>
                </div>
                <Button variant="amber" size="lg" onClick={handleCastSpread}>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Begin Sacred Reading</span>
                </Button>
              </div>
            )}
          </div>

          {/* Major Arcana Browser Deck */}
          <div className="bg-[#0d0d14] border border-[#20202c] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                MAJOR ARCANA ARCHIVES ({deck.length} CARDS)
              </span>
              <span className="text-[10px] text-neutral-500">CLICK TO COMMUNE</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {deck.map((card) => (
                <button
                  key={card.id}
                  onClick={() => {
                    selectCard(card);
                    sanctumAudio.playClick();
                    if (sanctumAudio.getStatus()) sanctumAudio.setFrequency(card.harmonicFrequency);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                    selectedCard?.id === card.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10'
                      : 'bg-[#13131c] border-[#22222e] text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-base">{card.sigil}</span>
                    <span className="text-[9px] font-mono text-cyan-400 font-bold">{card.harmonicFrequency}Hz</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-neutral-200 truncate">
                    {card.name.split('•')[1] || card.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Ember Chat Interface & Ritual Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Ember Oracle Live Interface */}
          <EmberChatInterface />

          {/* Sacred Ritual State & Frequency Lock */}
          <div className="bg-[#0e0e14] border border-[#242436] rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                RITUAL CONSECRATION
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                ritual.isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-neutral-800 text-neutral-400'
              }`}>
                STAGE: {ritual.stage}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-neutral-300">
                <span>RITUAL HARMONIC LOCK</span>
                <span className="text-cyan-400 font-bold">{ritual.currentFrequency} Hz</span>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {[108, 432, 528, 963].map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      sanctumAudio.playClick();
                      setRitualFrequency(f);
                      if (!sanctumAudio.getStatus()) sanctumAudio.toggleAmbient(f);
                    }}
                    className={`py-1.5 rounded-lg border text-center font-mono text-xs font-bold transition cursor-pointer ${
                      ritual.currentFrequency === f
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-[#151520] border-[#29293a] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {f}Hz
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {!ritual.isActive ? (
                <Button
                  variant="amber"
                  size="md"
                  onClick={() => startRitual(ritual.currentFrequency)}
                  className="w-full"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Initiate Ritual Consecration</span>
                </Button>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <Button
                    variant="glow"
                    size="sm"
                    onClick={advanceRitualStage}
                    className="flex-1"
                  >
                    <span>Advance Stage ({ritual.stage})</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={concludeRitual}
                  >
                    <span>Conclude</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
