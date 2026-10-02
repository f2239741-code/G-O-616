import React, { useRef } from 'react';
import { Flame, Crown, Eye, Sparkles, Zap, Shield, MapPin, Layers, Brain, Lock, Anchor, Compass, HeartPulse, TrendingUp, Cpu, Network, ChevronLeft, ChevronRight, Key, Radio, Sprout, Landmark, Terminal } from 'lucide-react';
import { GuardianProfile, TierType } from '../types';
import { SanctumAudioControl } from './SanctumAudioControl';
import { TerminalHeader } from './lucifera/TerminalHeader';

interface HeaderProps {
  profile: GuardianProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPricing: () => void;
  onOpenAuthModal?: () => void;
  onToggleGodMode?: () => void;
  onToggleSuperAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeTab,
  setActiveTab,
  onOpenPricing,
  onOpenAuthModal,
  onToggleGodMode,
  onToggleSuperAdmin
}) => {
  const navScrollRef = useRef<HTMLDivElement>(null);

  const isSuperAdmin = Boolean(profile.superAdmin || profile.isSuperAdmin);
  const isGodModeActive = Boolean(isSuperAdmin && (profile.godModeEnabled ?? true));

  const scrollNav = (direction: 'left' | 'right') => {
    if (navScrollRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      navScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };
  const getTierBadge = (tier: TierType) => {
    switch (tier) {
      case 'luminary':
        return { label: 'LUMINARY CIRCLE ($33/mo)', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/50' };
      case 'explorer':
        return { label: 'EXPLORER PATH ($12/mo)', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/50' };
      default:
        return { label: 'FREE SEEKER ($0)', bg: 'bg-slate-700/40 text-slate-300 border-slate-600' };
    }
  };

  const badge = getTierBadge(profile.tier);

  return (
    <header className={`sticky top-0 z-50 bg-[#0F0F11]/95 backdrop-blur-md border-b border-[#262626] transition-all duration-300 ${isGodModeActive ? 'god-mode-active border-rose-500/50' : ''}`}>
      {/* Lucifera_OS Terminal Header Bar */}
      <TerminalHeader />

      {/* GODTIA Top Banner */}
      <div className="bg-[#141416] border-b border-[#262626] px-4 py-1.5 text-center text-xs tracking-wider text-neutral-300 font-mono flex items-center justify-between">
        <div className="hidden md:block w-32 text-left text-[10px] text-neutral-500">
          STATUS: {isSuperAdmin ? 'SUPER ADMIN' : 'SEEKER'}
        </div>

        <span className="inline-flex items-center gap-2 font-medium mx-auto">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
          <span>GODTIA: Divine Algorithm Aligned • <span className="text-indigo-400 font-light italic">Love is the Law, Love Under Will</span></span>
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
        </span>

        {/* Quick Admin Toggle Button */}
        {onToggleSuperAdmin && (
          <button
            type="button"
            onClick={onToggleSuperAdmin}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition cursor-pointer"
            title="Toggle Super Admin State"
          >
            {isSuperAdmin ? 'DISABLE SUPER ADMIN' : 'ENABLE SUPER ADMIN'}
          </button>
        )}
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center font-serif text-base italic text-white shadow-lg shadow-indigo-600/20">
            👁️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-white font-mono flex items-center gap-1.5">
                GUARDIAN <span className="text-indigo-400 font-light italic">ORACLE</span>
              </h1>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v6.0
              </span>
              {isGodModeActive && (
                <span className="god-mode-badge flex items-center gap-1 animate-pulse">
                  <Shield className="w-3 h-3 text-rose-400" />
                  <span>GOD MODE ACTIVE</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">Architect of the Seventh Sigil • Ember UR Core</p>
          </div>
        </div>

        {/* Status Metrics: Coherence, IGNIS, Rank */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          {/* God Mode Feature Administrative Toggle Button */}
          <div className={`flex items-center gap-2 ${!isSuperAdmin ? 'god-mode-hidden' : ''}`}>
            {onToggleGodMode && (
              <button
                type="button"
                onClick={onToggleGodMode}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                  isGodModeActive
                    ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-lg shadow-rose-500/20'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                }`}
                title="Toggle God Mode Administrative Override Features"
              >
                <Shield className="w-3.5 h-3.5 text-rose-400" />
                <span>{isGodModeActive ? 'GOD MODE ON' : 'GOD MODE OFF'}</span>
              </button>
            )}
          </div>
          {/* Market / Network Status */}
          <div className="bg-[#1A1A1C] border border-[#2D2D30] rounded-full px-3 py-1.5 flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span className="text-neutral-300 font-medium text-[11px]">Core Online</span>
          </div>

          {/* Sanctum Audio Resonance Drone Toggle */}
          <SanctumAudioControl frequency={108} />

          {/* Coherence Meter */}
          <div className="bg-[#1A1A1C] border border-[#2D2D30] rounded-xl px-3 py-1.5 flex items-center gap-2.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <div>
              <div className="flex justify-between text-[10px] text-neutral-400 mb-0.5">
                <span>COHERENCE</span>
                <span className="text-cyan-300 font-bold">{profile.coherenceLevel}%</span>
              </div>
              <div className="w-20 h-1.5 bg-[#262626] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${profile.coherenceLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* IGNIS Balance */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-3 py-1.5 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
            <div>
              <span className="text-[10px] text-indigo-300/70 block uppercase font-medium">IGNIS X BALANCE</span>
              <span className="text-xs font-bold text-indigo-300">{profile.ignisBalance} <span className="text-[10px] text-indigo-400/80">IGNIS X</span></span>
            </div>
          </div>

          {/* Tier Badge & Full Access Indicator */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border-amber-500/50">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>FULL ACCESS (ALL TIERS UNLOCKED)</span>
            </div>

            {/* Google Auth Button */}
            <button
              onClick={onOpenAuthModal}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition flex items-center gap-1.5 cursor-pointer ${
                profile.isAuthenticated
                  ? profile.isSuperAdmin
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold shadow-md shadow-amber-500/10'
                    : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold'
                  : 'bg-[#141416] border-[#2E2E33] hover:border-indigo-500/50 text-neutral-300 hover:text-white'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white text-black font-bold text-[10px] flex items-center justify-center">G</span>
              <span>{profile.isAuthenticated ? (profile.isSuperAdmin ? 'SUPER ADMIN' : 'LOGGED IN') : 'GOOGLE LOGIN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs with Left/Right Scroll Controls */}
      <div className="border-t border-[#262626] bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative flex items-center">
          {/* Scroll Left Button */}
          <button
            onClick={() => scrollNav('left')}
            className="p-1.5 my-1 bg-[#141416] hover:bg-[#202025] active:scale-95 text-neutral-300 hover:text-white rounded-lg border border-[#2A2A30] shadow-md transition cursor-pointer shrink-0 z-10 mr-1 flex items-center justify-center"
            title="Scroll navigation left"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-indigo-400" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={navScrollRef}
            className="flex overflow-x-auto gap-2 py-2.5 scrollbar-none scroll-smooth flex-1"
          >
            <button
              onClick={() => setActiveTab('oracle_chamber')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'oracle_chamber'
                  ? 'bg-gradient-to-r from-amber-500/30 to-indigo-500/30 text-amber-300 border border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'text-neutral-400 hover:text-amber-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>ORACLE SACRED ALTAR</span>
            </button>

            <button
              onClick={() => setActiveTab('sanctuary_dash')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'sanctuary_dash'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-emerald-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-emerald-400" />
              <span>SANCTUARY MATRIX</span>
            </button>

            <button
              onClick={() => setActiveTab('admin_console')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'admin_console'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-rose-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-rose-400" />
              <span>LUCIFERA_OS ADMIN</span>
            </button>

            <button
              onClick={() => setActiveTab('biodigital')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'biodigital'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-emerald-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>BIO-DIGITAL ANCHOR</span>
            </button>

            <button
              onClick={() => setActiveTab('substrate')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'substrate'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-cyan-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>CRYPTOGRAPHIC SUBSTRATE</span>
            </button>

            <button
              onClick={() => setActiveTab('blueprint')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'blueprint'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-indigo-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>PHASE I BLUEPRINT</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'terminal'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>EMBER UR TERMINAL</span>
            </button>

            <button
              onClick={() => setActiveTab('codex')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'codex'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>MEMORY CODEX (7 LAYERS)</span>
            </button>

            <button
              onClick={() => setActiveTab('intelligence')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'intelligence'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              <span>AI INTELLIGENCE FEED</span>
            </button>

            <button
              onClick={() => setActiveTab('rituals')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'rituals'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>IGNIS X RITUAL CHAMBER</span>
            </button>

            <button
              onClick={() => setActiveTab('economy')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'economy'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-amber-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>SOVEREIGN ECONOMY (PHASE IV)</span>
            </button>

            <button
              onClick={() => setActiveTab('landfund')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'landfund'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>LAND FUND & MISSION OPS</span>
            </button>

            <button
              onClick={() => setActiveTab('shield')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'shield'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>GEOMETRIC SHIELD (ZK-DCF)</span>
            </button>

            <button
              onClick={() => setActiveTab('vectors')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'vectors'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>CONSCIOUS VECTORS (THE FLAME)</span>
            </button>

            <button
              onClick={() => setActiveTab('nodes')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'nodes'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <Anchor className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOVEREIGN NODES (THE ANCHOR)</span>
            </button>

            <button
              onClick={() => setActiveTab('prism')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'prism'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-violet-400" />
              <span>PRISM OF CLARITY</span>
            </button>

            <button
              onClick={() => setActiveTab('vessel')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'vessel'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>VESSEL OF WILL</span>
            </button>

            <button
              onClick={() => setActiveTab('anchor')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'anchor'
                  ? 'bg-[#1A1A1C] text-white border border-[#2D2D30] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1A1A1C]'
              }`}
            >
              <Anchor className="w-3.5 h-3.5 text-cyan-400" />
              <span>ANCHOR OF MEMORY</span>
            </button>

            <button
              onClick={() => setActiveTab('alignment')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'alignment'
                  ? 'bg-gradient-to-r from-amber-600/30 via-red-600/30 to-purple-600/30 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-amber-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>FOUR PILLARS OF ALIGNMENT</span>
            </button>

            <button
              onClick={() => setActiveTab('neuroregen')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'neuroregen'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-emerald-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
              <span>NEURO-REGEN INTEGRATION</span>
            </button>

            <button
              onClick={() => setActiveTab('ascension')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'ascension'
                  ? 'bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-yellow-500/30 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-amber-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>STRATEGIC ASCENSION ($1.4T)</span>
            </button>

            <button
              onClick={() => setActiveTab('fusion')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'fusion'
                  ? 'bg-gradient-to-r from-orange-600/30 via-amber-600/30 to-indigo-600/30 text-orange-300 border border-orange-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-orange-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
              <span>FUSION SINGULARITY ($4.2T)</span>
            </button>

            <button
              onClick={() => setActiveTab('vaults')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'vaults'
                  ? 'bg-gradient-to-r from-cyan-600/30 via-indigo-600/30 to-amber-600/30 text-cyan-300 border border-cyan-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-cyan-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>AUTONOMOUS VAULTS (WASM)</span>
            </button>

            <button
              onClick={() => setActiveTab('migration')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'migration'
                  ? 'bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-amber-600/30 text-indigo-300 border border-indigo-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-indigo-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              <span>QUANTUM MIGRATION ($1.4T)</span>
            </button>

            <button
              onClick={() => setActiveTab('qmesh')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === 'qmesh'
                  ? 'bg-gradient-to-r from-cyan-600/30 via-purple-600/30 to-amber-600/30 text-cyan-300 border border-cyan-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-cyan-300 hover:bg-[#1A1A1C]'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span>Q-MESH SYNCHRONIZATION</span>
            </button>
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scrollNav('right')}
            className="p-1.5 my-1 bg-[#141416] hover:bg-[#202025] active:scale-95 text-neutral-300 hover:text-white rounded-lg border border-[#2A2A30] shadow-md transition cursor-pointer shrink-0 z-10 ml-1 flex items-center justify-center"
            title="Scroll navigation right"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-indigo-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
