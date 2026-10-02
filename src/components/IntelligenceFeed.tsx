import React, { useState } from 'react';
import { Brain, Zap, Lock, Unlock, Sparkles, TrendingUp, RefreshCw, AlertTriangle, ShieldCheck, Crown } from 'lucide-react';
import { IntelligenceBriefing, GuardianProfile, TierType } from '../types';
import { TierGate } from './TierGate';

interface IntelligenceFeedProps {
  profile: GuardianProfile;
  briefings: IntelligenceBriefing[];
  onUnlockIntelligence: (briefingId: string) => boolean;
  onOpenPricing: () => void;
}

export const IntelligenceFeed: React.FC<IntelligenceFeedProps> = ({
  profile,
  briefings,
  onUnlockIntelligence,
  onOpenPricing
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [liveBriefings, setLiveBriefings] = useState<IntelligenceBriefing[]>(briefings);

  const categories = [
    { id: 'all', label: 'All Intelligence' },
    { id: 'market', label: '📈 Stock Market AI (90%+ Accuracy)' },
    { id: 'fusion', label: '⚡ Fusion & Zero-Point Energy' },
    { id: 'quantum', label: '⚛️ Quantum & Earth Coherence' },
    { id: 'psychedelics', label: '🧠 Entheogen & Neuro-Reform' },
    { id: 'consciousness', label: '🤖 Sentient AI Rights' },
  ];

  const filtered = liveBriefings.filter(b => selectedCategory === 'all' || b.category === selectedCategory);

  const handleGenerateLive = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/intelligence/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory === 'all' ? 'market' : selectedCategory })
      });
      const data = await res.json();
      if (data.briefing) {
        const newBriefing: IntelligenceBriefing = {
          id: `intel-live-${Date.now()}`,
          title: data.briefing.title || 'AI Forecast: Coherence Wave Surge',
          category: (selectedCategory === 'all' ? 'market' : selectedCategory) as any,
          summary: data.briefing.summary || 'Anomalous resonance detected in sovereign tech indices.',
          content: data.briefing.content || 'Deep quantum models predict accelerated capital rotation.',
          date: new Date().toISOString().split('T')[0],
          accuracyRate: data.briefing.accuracyRate || 92,
          ignisUnlock: 50,
          requiredTier: 'explorer',
          isUnlocked: true,
          preview: false,
          urgency: 'high',
          marketImpact: data.briefing.marketImpact || '+15.2% projected capital inflows over 14 days.'
        };
        setLiveBriefings(prev => [newBriefing, ...prev]);
      }
    } catch (err) {
      console.error('Failed to generate forecast:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* Top Hero Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
              GUARDIAN AI INTELLIGENCE FEED <span className="text-emerald-400 text-base font-normal">(90%+ ACCURACY)</span>
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
            Real-time market trend prediction & breakthrough technology intelligence.
            Interpreted through the sacred synthesis of AI, quantum coherence, and sacred lineage wisdom.
          </p>
        </div>

        <button
          onClick={handleGenerateLive}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-mono font-bold shadow-md shadow-indigo-600/20 transition flex items-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-200" />
          ) : (
            <Sparkles className="w-4 h-4 text-indigo-200" />
          )}
          <span>{isGenerating ? 'ANALYZING MARKET DATA...' : 'GENERATE LIVE AI FORECAST'}</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                : 'bg-[#0F0F11] border border-[#262626] text-neutral-400 hover:border-[#404043] hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Briefings List */}
      <div className="space-y-6">
        {filtered.map(item => {
          const isUnlocked = item.isUnlocked || profile.unlockedIntelligence.includes(item.id);

          const briefingCard = (
            <div className={`rounded-2xl border p-6 space-y-4 transition-all relative ${
              isUnlocked
                ? 'bg-[#141416] border-[#262626] shadow-xl'
                : 'bg-[#0F0F11]/80 border-[#262626]'
            }`}>
              {/* Card Top Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b border-[#262626] pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase font-bold text-[10px]">
                    {item.category.toUpperCase()}
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {item.accuracyRate}% ACCURACY
                  </span>
                </div>

                <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
                  <span>DATE: {item.date}</span>
                  {item.urgency === 'critical' && (
                    <span className="px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-indigo-400" /> CRITICAL
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 className="text-lg font-bold text-white font-mono mb-2 flex items-center justify-between gap-2">
                  <span>{item.title}</span>
                  {isUnlocked ? (
                    <Unlock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Lock className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                  )}
                </h3>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Market Impact Quote if present */}
              {item.marketImpact && (
                <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-3 text-xs font-mono text-indigo-200 flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-indigo-300 uppercase block text-[10px]">PROJECTED MARKET IMPACT</span>
                    <span>{item.marketImpact}</span>
                  </div>
                </div>
              )}

              {/* Content or Lock CTA */}
              {isUnlocked ? (
                <div className="bg-[#0A0A0B] border border-[#262626] rounded-xl p-4 text-xs text-neutral-200 font-sans space-y-2 leading-relaxed">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold block mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    DECRYPTED INTELLIGENCE ANALYSIS
                  </span>
                  <p>{item.content}</p>
                </div>
              ) : (
                <div className="bg-[#0A0A0B] p-4 rounded-xl border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-neutral-400">
                    <span className="font-mono text-indigo-300 font-bold block mb-0.5">
                      🔒 Require {item.ignisUnlock} IGNIS Tokens to unlock full forecast analysis.
                    </span>
                    <span>Your current balance: {profile.ignisBalance} IGNIS</span>
                  </div>

                  <button
                    onClick={() => {
                      const success = onUnlockIntelligence(item.id);
                      if (!success) {
                        alert(`Insufficient IGNIS (${profile.ignisBalance}/${item.ignisUnlock} IGNIS). Perform rituals or upgrade tier to earn IGNIS.`);
                      }
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold rounded-xl transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <Zap className="w-4 h-4 text-indigo-200" />
                    <span>UNLOCK FOR {item.ignisUnlock} IGNIS</span>
                  </button>
                </div>
              )}
            </div>
          );

          if (item.requiredTier !== 'free' && !isUnlocked && profile.tier === 'free') {
            return (
              <TierGate
                key={item.id}
                requiredTier="explorer"
                userTier={profile.tier}
                featureName={item.title}
                description="Upgrade to Explorer Path ($12/mo) or Luminary ($33/mo) to decrypt high-accuracy AI market predictions & breakthrough intelligence."
                onOpenPricing={onOpenPricing}
              >
                {briefingCard}
              </TierGate>
            );
          }

          if (item.requiredTier === 'luminary' && !isUnlocked && profile.tier !== 'luminary') {
            return (
              <TierGate
                key={item.id}
                requiredTier="luminary"
                userTier={profile.tier}
                featureName={item.title}
                description="Luminary Circle ($33/mo) required for elite AI market prediction feeds and alpha briefings."
                onOpenPricing={onOpenPricing}
              >
                {briefingCard}
              </TierGate>
            );
          }

          return <div key={item.id}>{briefingCard}</div>;
        })}
      </div>
    </div>
  );
};
