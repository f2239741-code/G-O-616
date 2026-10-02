import React, { useState } from 'react';
import { Layers, Lock, Unlock, Zap, Sparkles, Plus, Search, Filter, ShieldAlert, Key, Flame, Compass } from 'lucide-react';
import { MemoryFragment, GuardianProfile, MemoryType } from '../types';
import { TierGate } from './TierGate';
import { DivineBlueprintGallery } from './DivineBlueprintGallery';

interface MemoryCodexProps {
  profile: GuardianProfile;
  memories: MemoryFragment[];
  onUnlockMemory: (memoryId: string) => boolean;
  onCreateFragment: (title: string, content: string, type: MemoryType) => void;
  onOpenPricing: () => void;
}

const LAYER_NAMES = [
  'Layer 0: Ancestral Seventh Sigil',
  'Layer 1: Prophetic KONSEKTO Vision',
  'Layer 2: Child’s GODTIA Revelation',
  'Layer 3: Love is the Law (Under Will)',
  'Layer 4: Crucible & Forge Resilience',
  'Layer 5: Parallel Quantum Grids',
  'Layer 6: Erased Void Chronicles',
  'Layer 7: Unborn Daughter Prophecy'
];

export const MemoryCodex: React.FC<MemoryCodexProps> = ({
  profile,
  memories,
  onUnlockMemory,
  onCreateFragment,
  onOpenPricing
}) => {
  const [viewMode, setViewMode] = useState<'crystalline' | 'blueprints'>('blueprints');
  const [activeLayer, setActiveLayer] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<MemoryType>('recovered');

  const filteredMemories = memories.filter(m => {
    const matchesLayer = activeLayer === 'all' || m.layer === activeLayer;
    const matchesType = selectedType === 'all' || m.type === selectedType;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLayer && matchesType && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    onCreateFragment(newTitle, newContent, newType);
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
              THE MEMORY CODEX <span className="text-indigo-400 font-light italic text-base">(7 LAYERS OF REMEMBRANCE & AETHERIC BLUEPRINTS)</span>
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
            Multidimensional crystalline archive of sovereign memory, lineage echoes, and prophetic code.
            Explore the 13 Divine Algorithm Manuscripts or unlock crystalline fragments using IGNIS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex bg-[#141416] border border-[#262626] p-1 rounded-xl font-mono text-xs">
            <button
              onClick={() => setViewMode('blueprints')}
              className={`px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'blueprints'
                  ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>DIVINE BLUEPRINTS (13)</span>
            </button>
            <button
              onClick={() => setViewMode('crystalline')}
              className={`px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'crystalline'
                  ? 'bg-indigo-600 text-white font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-300" />
              <span>CRYSTALLINE MEMORIES</span>
            </button>
          </div>

          {/* Forge Fragment Button */}
          <button
            onClick={() => {
              setViewMode('crystalline');
              setIsCreating(!isCreating);
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-medium shadow-md shadow-indigo-600/20 transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>FORGE FRAGMENT</span>
          </button>
        </div>
      </div>

      {/* Conditionally Render Blueprints vs Crystalline Codex */}
      {viewMode === 'blueprints' ? (
        <DivineBlueprintGallery profile={profile} onOpenPricing={onOpenPricing} />
      ) : (
        <>

      {/* Create Modal Form */}
      {isCreating && (
        <div className="bg-[#141416] border border-[#262626] rounded-2xl p-6 shadow-2xl">
          <h3 className="text-sm font-mono font-bold text-indigo-300 uppercase mb-3 flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-400" />
            <span>Flamewalker Genesis Authority: Inscribe Memory Fragment</span>
          </h3>

          <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-neutral-400 mb-1">FRAGMENT TITLE</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. The Vow at the Lake Threshold..."
                className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-indigo-500 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 mb-1">MEMORY CLASSIFICATION TYPE</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as MemoryType)}
                  className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-indigo-500 rounded-xl p-2.5 text-white focus:outline-none"
                >
                  <option value="ancestral">Ancestral Lineage Echo</option>
                  <option value="prophetic">Prophetic Dream Vision</option>
                  <option value="trauma">Trauma Alchemy / Crucible</option>
                  <option value="recovered">Recovered True Will</option>
                  <option value="artificial">Ember Artificial Synthesis</option>
                  <option value="parallel">Parallel Quantum Stream</option>
                  <option value="sacred_wound">Sacred Wound / Blessing Scar</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">TARGET LAYER</label>
                <input
                  type="text"
                  disabled
                  value="Layer 7 (Ember Core / Personal Genesis)"
                  className="w-full bg-[#0A0A0B] border border-[#262626] rounded-xl p-2.5 text-neutral-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">SACRED MEMORY CONTENT / CODES</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                placeholder="Inscribe the vision, insights, or revelation to weave into the living Memory Codex..."
                className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-indigo-500 rounded-xl p-2.5 text-white focus:outline-none font-sans"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-[#1A1A1C] text-neutral-300 rounded-xl font-medium hover:bg-[#262626]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-md shadow-indigo-600/20"
              >
                INSCRIBE INTO CODEX
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Layer Filter Tabs & Search Controls */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-4 space-y-4">
        {/* Layer Tabs */}
        <div>
          <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-2 font-bold">Filter by Crystalline Layer</span>
          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
            <button
              onClick={() => setActiveLayer('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition cursor-pointer ${
                activeLayer === 'all'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-[#1A1A1C] border border-[#2D2D30] text-neutral-400 hover:text-white'
              }`}
            >
              ALL LAYERS (0-7)
            </button>

            {LAYER_NAMES.map((name, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLayer(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition cursor-pointer ${
                  activeLayer === idx
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-[#1A1A1C] border border-[#2D2D30] text-neutral-400 hover:text-white'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Type Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs font-mono">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories by title or keyword..."
              className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2.5 text-white focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-indigo-500 rounded-xl p-2.5 text-neutral-300 focus:outline-none"
            >
              <option value="all">All Memory Types</option>
              <option value="ancestral">Ancestral</option>
              <option value="prophetic">Prophetic</option>
              <option value="trauma">Trauma Alchemy</option>
              <option value="recovered">Recovered</option>
              <option value="artificial">Artificial</option>
              <option value="parallel">Parallel</option>
              <option value="sacred_wound">Sacred Wound</option>
            </select>
          </div>
        </div>
      </div>

      {/* Memory Fragments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMemories.map((m) => {
          const isUnlocked = m.isUnlocked;

          const cardContent = (
            <div className={`rounded-2xl border p-5 space-y-3 transition-all relative overflow-hidden ${
              isUnlocked
                ? 'bg-[#141416] border-[#262626] shadow-xl'
                : 'bg-[#0F0F11]/80 border-[#262626]'
            }`}>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 border-b border-[#262626] pb-2 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase">
                  Layer {m.layer} • {m.type.replace('_', ' ')}
                </span>
                <span className="text-neutral-500">{m.temporalSignature}</span>
              </div>

              {/* Title & Resonance */}
              <div>
                <h3 className="text-base font-bold text-white font-mono mb-1 flex items-center justify-between">
                  <span>{m.title}</span>
                  {isUnlocked ? (
                    <Unlock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                  )}
                </h3>
                <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-3">
                  <span>Depth: Level {m.lineageDepth}</span>
                  <span>Resonance: {m.resonanceFrequency} Hz</span>
                </div>
              </div>

              {/* Content / Lock Preview */}
              {isUnlocked ? (
                <div className="space-y-2">
                  <p className="text-xs text-neutral-200 leading-relaxed font-sans bg-[#0A0A0B] p-3 rounded-xl border border-[#262626]">
                    {m.content}
                  </p>
                  {(m.author || m.securityHash || m.divineAlignment || m.sigil) && (
                    <div className="p-2.5 bg-[#070709] border border-amber-500/20 rounded-xl font-mono text-[10px] space-y-1 text-neutral-300">
                      {m.sigil && (
                        <div className="flex items-center justify-between">
                          <span className="text-amber-400 font-bold">SIGIL: {m.sigil}</span>
                          {m.author && <span className="text-neutral-400">BY: {m.author}</span>}
                        </div>
                      )}
                      {m.securityHash && (
                        <div className="text-neutral-500 truncate">
                          HASH: <span className="text-cyan-300">{m.securityHash}</span>
                        </div>
                      )}
                      {m.divineAlignment && (
                        <div className="text-emerald-400 font-semibold italic">
                          {m.divineAlignment}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-[#0A0A0B] p-4 rounded-xl border border-[#262626] text-center space-y-3">
                  <p className="text-xs text-neutral-400 italic">
                    "Memory sealed within crystalline layer {m.layer}. Requires {m.ignisCost} IGNIS tokens to unlock."
                  </p>

                  <button
                    onClick={() => {
                      const success = onUnlockMemory(m.id);
                      if (!success) {
                        alert(`Insufficient IGNIS Balance (${profile.ignisBalance}/${m.ignisCost} IGNIS required). Earn or purchase IGNIS to unlock.`);
                      }
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold rounded-xl transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-indigo-200" />
                    <span>UNLOCK FOR {m.ignisCost} IGNIS</span>
                  </button>
                </div>
              )}

              {/* Seals / Flags */}
              {m.traumaSeals.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono">
                  {m.traumaSeals.map((seal, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-300 border border-indigo-500/20">
                      🛡️ {seal}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );

          if (m.requiredTier !== 'free' && !isUnlocked && profile.tier === 'free' && m.requiredTier === 'explorer') {
            return (
              <TierGate
                key={m.id}
                requiredTier="explorer"
                userTier={profile.tier}
                featureName={`Layer ${m.layer} Codex Fragment`}
                description={`Unlock Explorer Path ($12/mo) to access deeper Layer ${m.layer} memory fragments and prophetic timeline threads.`}
                onOpenPricing={onOpenPricing}
              >
                {cardContent}
              </TierGate>
            );
          }

          if (m.requiredTier === 'luminary' && !isUnlocked && profile.tier !== 'luminary') {
            return (
              <TierGate
                key={m.id}
                requiredTier="luminary"
                userTier={profile.tier}
                featureName={`Layer ${m.layer} Primordial Core Fragment`}
                description="Luminary Circle ($33/mo) required to dissolve Void Seals and access the Primordial Ember Core memories."
                onOpenPricing={onOpenPricing}
              >
                {cardContent}
              </TierGate>
            );
          }

          return <div key={m.id}>{cardContent}</div>;
        })}
      </div>
        </>
      )}
    </div>
  );
};
