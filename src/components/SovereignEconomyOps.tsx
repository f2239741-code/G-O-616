import React, { useState } from 'react';
import { Eye, Coins, Send, Landmark, ShieldCheck, Zap, Sparkles, CheckCircle2, ArrowRight, Layers, Users, Copy, Check, History, Lock, AlertCircle } from 'lucide-react';
import { GuardianProfile, MemoryFragment, IntelligenceBriefing, IgnisTransaction } from '../types';
import { SOVEREIGN_ECONOMY_MECHANICS, IgnisTransactionPayload, IgnisLedgerReceipt } from '../lib/ignisEconomy';
import { sanctumAudio } from '../lib/audioEngine';

interface SovereignEconomyOpsProps {
  profile: GuardianProfile;
  memories: MemoryFragment[];
  briefings: IntelligenceBriefing[];
  transactions: IgnisTransaction[];
  onProcessTransaction: (payload: IgnisTransactionPayload) => IgnisLedgerReceipt;
  onOpenPricing: () => void;
}

export const SovereignEconomyOps: React.FC<SovereignEconomyOpsProps> = ({
  profile,
  memories,
  briefings,
  transactions,
  onProcessTransaction,
  onOpenPricing
}) => {
  const [activeTab, setActiveTab] = useState<'burn' | 'p2p' | 'tribute'>('burn');
  const [lastReceipt, setLastReceipt] = useState<IgnisLedgerReceipt | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form States
  // Burn form
  const lockedItems = [
    ...memories.filter(m => !m.isUnlocked).map(m => ({ id: m.id, title: `Memory: ${m.title} (Layer ${m.layer})`, cost: m.ignisCost, type: 'memory' })),
    ...briefings.filter(b => !b.isUnlocked).map(b => ({ id: b.id, title: `Briefing: ${b.title}`, cost: b.ignisUnlock, type: 'briefing' }))
  ];
  const [selectedLockId, setSelectedLockId] = useState<string>(lockedItems[0]?.id || 'FLAME_L5_VOID');
  const [burnAmount, setBurnAmount] = useState<number>(250);

  // P2P form
  const [recipientSeeker, setRecipientSeeker] = useState<string>('@adept_solaris');
  const [p2pAmount, setP2pAmount] = useState<number>(150);
  const [p2pNote, setP2pNote] = useState<string>('Compute Shard Endowment & Ritual Access');

  // Tribute form
  const [tributeAmount, setTributeAmount] = useState<number>(500);
  const [sanctumNodeTarget, setSanctumNodeTarget] = useState<string>('Prometheus-IV Mountain Refuge');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleBurnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      sanctumAudio.playClick();
      const receipt = onProcessTransaction({
        seekerId: profile.uid,
        actionType: 'BURN_FOR_KNOWLEDGE',
        ignisAmount: burnAmount,
        targetReferenceId: selectedLockId,
        note: `Burned ${burnAmount} IGNIS for Crystalline Codex Layer ${selectedLockId}`
      });
      setLastReceipt(receipt);
    } catch (err: any) {
      setErrorMsg(err.message || 'Transaction failed.');
    }
  };

  const handleP2PSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!recipientSeeker.trim()) return;
    try {
      sanctumAudio.playClick();
      const receipt = onProcessTransaction({
        seekerId: profile.uid,
        actionType: 'SEEKER_TITHING',
        ignisAmount: p2pAmount,
        targetReferenceId: recipientSeeker.trim(),
        note: `Endowment tithe to ${recipientSeeker.trim()}: ${p2pNote}`
      });
      setLastReceipt(receipt);
    } catch (err: any) {
      setErrorMsg(err.message || 'Transaction failed.');
    }
  };

  const handleTributeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      sanctumAudio.playClick();
      const receipt = onProcessTransaction({
        seekerId: profile.uid,
        actionType: 'ORACLE_TRIBUTE',
        ignisAmount: tributeAmount,
        targetReferenceId: sanctumNodeTarget,
        note: `Oracle Tribute to ${sanctumNodeTarget}`
      });
      setLastReceipt(receipt);
    } catch (err: any) {
      setErrorMsg(err.message || 'Transaction failed.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0F0F11] border border-amber-500/30 rounded-2xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-amber-400 animate-pulse" />
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <span>THE SOVEREIGN ECONOMY</span>
              <span className="text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono">
                PHASE IV ACTIVE
              </span>
            </h2>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            IGNIS X is an active, sovereign catalyst for spiritual and architectural alignment.
            Sacrifice transient tokens for eternal knowledge, cross-pollinate intelligence with peer endowments, or fund physical mountain sanctuary land refuges.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#141416] border border-[#262626] rounded-2xl px-5 py-3 text-right">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block">CURRENT IGNIS X BALANCE</span>
            <span className="text-2xl font-mono font-bold text-amber-400 flex items-center justify-end gap-1">
              <Eye className="w-5 h-5 text-amber-500" />
              <span>{profile.ignisBalance.toLocaleString()} IGNIS X</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sanctumAudio.playClick();
              onOpenPricing();
            }}
            className="px-4 py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold rounded-xl transition cursor-pointer shadow-lg shadow-amber-500/10"
          >
            RECHARGE IGNIS X
          </button>
        </div>
      </div>

      {/* 72-Hour Sovereign Rebalance Command War Room */}
      <div className="bg-[#0C0C0E] border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-amber-400 bg-amber-500/10 border-b border-l border-amber-500/30 rounded-bl-xl flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>72-HOUR WINDOW: 71H 48M REMAINING</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>TACTICAL EXECUTION PLAN</span>
          </div>
          <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-3">
            <span>THE 72-HOUR SOVEREIGN REBALANCE</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full font-mono">
              94.2% PROBABILITY SHIFT
            </span>
          </h2>
          <p className="text-xs text-neutral-300 max-w-4xl leading-relaxed font-sans">
            Striking immediately while legacy institutional frameworks are frozen by obsolete macroeconomic indicators. With a 94.2% probability of a systemic shift in sovereign debt valuation and a $3.8T capital reallocation toward energy-backed synthetic reserves, we seize the high ground across three synchronized vectors.
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="bg-[#141418] border border-amber-500/30 rounded-xl p-4 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-bold block">CAPITAL REALLOCATION</span>
            <span className="text-xl font-bold text-amber-300">$3.8T SYNTHETIC SURGE</span>
            <span className="text-[10px] text-neutral-400 block">Moving into energy-backed reserves</span>
          </div>

          <div className="bg-[#141418] border border-indigo-500/30 rounded-xl p-4 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-bold block">BOND YIELD VOLATILITY</span>
            <span className="text-xl font-bold text-indigo-300">+14.2% SPIKE DETECTED</span>
            <span className="text-[10px] text-neutral-400 block">Institutional stop-losses triggering</span>
          </div>

          <div className="bg-[#141418] border border-emerald-500/30 rounded-xl p-4 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-bold block">SYNCHRONIZED VECTORS</span>
            <span className="text-xl font-bold text-emerald-300">3/3 ACTIVE & SYNCED</span>
            <span className="text-[10px] text-neutral-400 block">ZK-Subnet + Fusion Microgrid + Codex</span>
          </div>
        </div>

        {/* 3 Synchronized Vectors Interactive Trigger Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Vector 1 */}
          <div className="bg-[#121215] border border-amber-500/40 rounded-xl p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
                  VECTOR 01
                </span>
                <span className="text-[10px] font-mono text-emerald-400">ACTIVE</span>
              </div>
              <h4 className="font-mono text-xs font-bold text-white uppercase">
                1. Deploy Sovereign Burn & Knowledge Tithing Engine
              </h4>
              <p className="text-[11px] text-neutral-400 leading-normal font-sans">
                Burn IGNIS X to unlock advanced intelligence layers and classified memory fragments in the Memory Codex, locking in crystalline alpha before yield distortion.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sanctumAudio.playClick();
                setActiveTab('burn');
              }}
              className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>EXECUTE KNOWLEDGE BURN</span>
            </button>
          </div>

          {/* Vector 2 */}
          <div className="bg-[#121215] border border-indigo-500/40 rounded-xl p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded font-bold">
                  VECTOR 02
                </span>
                <span className="text-[10px] font-mono text-emerald-400">LOCKED</span>
              </div>
              <h4 className="font-mono text-xs font-bold text-white uppercase">
                2. Anchor Capital Directly to Off-Grid Fusion Compute
              </h4>
              <p className="text-[11px] text-neutral-400 leading-normal font-sans">
                Channel incoming synthetic liquidity surge directly into modular fusion microgrid nodes (The Anchor) for zero-marginal-cost energy backing.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sanctumAudio.playClick();
                setActiveTab('tribute');
              }}
              className="w-full py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 text-indigo-300 font-mono text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Landmark className="w-3.5 h-3.5 text-indigo-400" />
              <span>LOCK LIQUIDITY TO SANCTUARY</span>
            </button>
          </div>

          {/* Vector 3 */}
          <div className="bg-[#121215] border border-emerald-500/40 rounded-xl p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                  VECTOR 03
                </span>
                <span className="text-[10px] font-mono text-emerald-400">REROUTED</span>
              </div>
              <h4 className="font-mono text-xs font-bold text-white uppercase">
                3. Route Order Flow Through Geometric Shield (ZK-DCF)
              </h4>
              <p className="text-[11px] text-neutral-400 leading-normal font-sans">
                Force autonomous trading DAOs to execute inside zero-knowledge verified subnets, bypassing cascading stop-losses and latency arbitrage.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sanctumAudio.playClick();
                setActiveTab('p2p');
              }}
              className="w-full py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>P2P SUBNET ENDOWMENT</span>
            </button>
          </div>
        </div>

        {/* Systemic Command Footer */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between font-mono text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-bold">SYSTEMIC COMMAND:</span>
            <span className="italic text-neutral-200">GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.</span>
          </div>
          <span className="text-[10px] text-amber-400 font-bold bg-amber-500/20 px-2 py-0.5 rounded">
            SYNCHRONIZED
          </span>
        </div>
      </div>

      {/* Mechanics Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SOVEREIGN_ECONOMY_MECHANICS.map((mech) => {
          const isSelected = 
            (mech.actionType === 'BURN_FOR_KNOWLEDGE' && activeTab === 'burn') ||
            (mech.actionType === 'SEEKER_TITHING' && activeTab === 'p2p') ||
            (mech.actionType === 'ORACLE_TRIBUTE' && activeTab === 'tribute');

          return (
            <div
              key={mech.id}
              onClick={() => {
                sanctumAudio.playClick();
                if (mech.actionType === 'BURN_FOR_KNOWLEDGE') setActiveTab('burn');
                if (mech.actionType === 'SEEKER_TITHING') setActiveTab('p2p');
                if (mech.actionType === 'ORACLE_TRIBUTE') setActiveTab('tribute');
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-[#141416] border-amber-500/60 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'bg-[#0F0F11]/80 border-[#262626] hover:border-[#404048]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`p-2 rounded-xl border ${
                    isSelected ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-neutral-900 text-neutral-400 border-[#262626]'
                  }`}>
                    {mech.actionType === 'BURN_FOR_KNOWLEDGE' && <Sparkles className="w-5 h-5" />}
                    {mech.actionType === 'SEEKER_TITHING' && <Users className="w-5 h-5" />}
                    {mech.actionType === 'ORACLE_TRIBUTE' && <Landmark className="w-5 h-5" />}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                    MECHANIC {mech.actionType === 'BURN_FOR_KNOWLEDGE' ? '01' : mech.actionType === 'SEEKER_TITHING' ? '02' : '03'}
                  </span>
                </div>

                <h3 className="font-mono text-sm font-bold text-white leading-tight">
                  {mech.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {mech.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#222226] flex items-center justify-between text-xs font-mono text-amber-400">
                <span>EXECUTE MECHANIC</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Execution Workspace & Receipt Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Execution Form (8 cols) */}
        <div className="lg:col-span-7 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-6">
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs font-mono text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: BURN FOR KNOWLEDGE */}
          {activeTab === 'burn' && (
            <form onSubmit={handleBurnSubmit} className="space-y-5">
              <div className="border-b border-[#262626] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-mono font-bold text-sm text-amber-300 uppercase flex items-center gap-2">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>BURN FOR KNOWLEDGE (CRYSTALLINE CODEX TITHING)</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Burn IGNIS X to decrypt sealed Crystalline Memory Layers 5 through 7 or secret briefings.
                  </p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1 font-bold">SELECT LOCKED CODEX OR BRIEFING</label>
                  <select
                    value={selectedLockId}
                    onChange={(e) => setSelectedLockId(e.target.value)}
                    className="w-full bg-[#141416] border border-[#2A2A30] rounded-xl px-3 py-2.5 text-neutral-200 focus:outline-none focus:border-amber-500"
                  >
                    {lockedItems.length === 0 ? (
                      <option value="ALL_UNLOCKED">All codex items unlocked (Select Custom Burn)</option>
                    ) : (
                      lockedItems.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title} — Cost: {item.cost} IGNIS X
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1 font-bold">IGNIS X BURN AMOUNT</label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[100, 250, 500, 1000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setBurnAmount(amt)}
                        className={`p-2 rounded-lg border text-center transition cursor-pointer font-bold ${
                          burnAmount === amt
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                        }`}
                      >
                        {amt} IGNIS X
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={burnAmount}
                    onChange={(e) => setBurnAmount(Math.max(10, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#141416] border border-[#2A2A30] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-neutral-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>RITUAL EFFECT</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-neutral-400 font-sans">
                    Permanently burns selected tokens on the IGNIS X Ledger, generating a immutable Canon Alignment Hash <code className="text-amber-400 font-mono">0x_CANON_LOCKED</code> and unlocking deep memory archives.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={profile.ignisBalance < burnAmount}
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-40 text-black font-bold font-mono text-xs rounded-xl transition cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>EXECUTE IGNIS X KNOWLEDGE BURN ({burnAmount} IGNIS X)</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SEEKER TO SEEKER TITHING */}
          {activeTab === 'p2p' && (
            <form onSubmit={handleP2PSubmit} className="space-y-5">
              <div className="border-b border-[#262626] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-mono font-bold text-sm text-indigo-300 uppercase flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>SEEKER-TO-SEEKER INTELLIGENCE TITHING (P2P ENDOWMENT)</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Directly endow IGNIS X tokens to peer Seekers to fund compute shards & ritual access.
                  </p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1 font-bold">RECIPIENT SEEKER HANDLE / NODE ID</label>
                  <input
                    type="text"
                    value={recipientSeeker}
                    onChange={(e) => setRecipientSeeker(e.target.value)}
                    placeholder="e.g., @seeker_node_909, @adept_solaris"
                    className="w-full bg-[#141416] border border-[#2A2A30] rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <div className="flex gap-2 mt-1.5">
                    {['@adept_solaris', '@seeker_node_909', '@flamewalker_777', '@qmesh_initiates'].map((handle) => (
                      <button
                        key={handle}
                        type="button"
                        onClick={() => setRecipientSeeker(handle)}
                        className="text-[10px] bg-neutral-900 border border-[#262626] px-2 py-0.5 rounded text-indigo-300 hover:border-indigo-500"
                      >
                        {handle}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1 font-bold">P2P TITHING AMOUNT</label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[50, 150, 300, 750].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setP2pAmount(amt)}
                        className={`p-2 rounded-lg border text-center transition cursor-pointer font-bold ${
                          p2pAmount === amt
                            ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                            : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                        }`}
                      >
                        {amt} IGNIS X
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={p2pAmount}
                    onChange={(e) => setP2pAmount(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#141416] border border-[#2A2A30] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1 font-bold">ENDOWMENT NOTE / PURPOSE</label>
                  <input
                    type="text"
                    value={p2pNote}
                    onChange={(e) => setP2pNote(e.target.value)}
                    placeholder="e.g., Initial Compute Shards & Ritual Access"
                    className="w-full bg-[#141416] border border-[#2A2A30] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={profile.ignisBalance < p2pAmount}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-40 text-white font-bold font-mono text-xs rounded-xl transition cursor-pointer shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT P2P SEEKER ENDOWMENT ({p2pAmount} IGNIS X)</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: ORACLE TRIBUTE */}
          {activeTab === 'tribute' && (
            <form onSubmit={handleTributeSubmit} className="space-y-5">
              <div className="border-b border-[#262626] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-mono font-bold text-sm text-emerald-300 uppercase flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-emerald-400" />
                    <span>GUARDIAN ORACLE TRIBUTE (CANON & SANCTUARY FUND)</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Direct treasury contribution to physical land acquisition & fusion sanctuary expansion.
                  </p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1 font-bold">TARGET SANCTUARY NODE / REFUGE FUND</label>
                  <select
                    value={sanctumNodeTarget}
                    onChange={(e) => setSanctumNodeTarget(e.target.value)}
                    className="w-full bg-[#141416] border border-[#2A2A30] rounded-xl px-3 py-2.5 text-neutral-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Prometheus-IV Mountain Refuge">Prometheus-IV Mountain Refuge (Blue Ridge, 42 Acres)</option>
                    <option value="Sanctum Alpha Retreat">Sanctum Alpha Retreat (Cascade Peaks, 115 Acres)</option>
                    <option value="Aetheric Core Land Vault">Aetheric Core Land Vault (Off-Grid Sovereign Haven)</option>
                  </select>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1 font-bold">TRIBUTE IGNIS X AMOUNT</label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[250, 500, 1200, 5000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setTributeAmount(amt)}
                        className={`p-2 rounded-lg border text-center transition cursor-pointer font-bold ${
                          tributeAmount === amt
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                        }`}
                      >
                        {amt} IGNIS X
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={tributeAmount}
                    onChange={(e) => setTributeAmount(Math.max(10, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#141416] border border-[#2A2A30] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>80% REAL-WORLD LAND FUND MAPPING</span>
                  </div>
                  <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                    Tithing directly accelerates real-world mountain land acquisition. Boosts your Coherence Score by +12% per tribute.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={profile.ignisBalance < tributeAmount}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-40 text-black font-bold font-mono text-xs rounded-xl transition cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Landmark className="w-4 h-4" />
                  <span>COMMIT SANCTUARY TRIBUTE ({tributeAmount} IGNIS X)</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Receipt & Immutable Ledger Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Last Transaction Receipt Card */}
          {lastReceipt ? (
            <div className="bg-[#141418] border border-amber-500/40 rounded-2xl p-5 shadow-2xl space-y-4 font-mono text-xs relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>CANON LEDGER RECEIPT</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-2 text-neutral-300">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">TRANSACTION ID</span>
                  <span className="text-amber-200 font-bold break-all">{lastReceipt.transactionId}</span>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">CANON ALIGNMENT HASH</span>
                  <div className="flex items-center justify-between bg-[#0A0A0C] p-2 rounded border border-[#262626]">
                    <span className="text-[11px] text-indigo-300 truncate mr-2">{lastReceipt.canonAlignmentHash}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(lastReceipt.canonAlignmentHash)}
                      className="text-neutral-400 hover:text-white p-1"
                      title="Copy Hash"
                    >
                      {copiedHash === lastReceipt.canonAlignmentHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between border-t border-[#222226] pt-2">
                  <span className="text-neutral-400">NEW IGNIS X BALANCE:</span>
                  <span className="text-amber-400 font-bold">{lastReceipt.newIgnisBalance} IGNIS X</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0F0F11] border border-dashed border-[#262626] rounded-2xl p-6 text-center space-y-2 font-mono text-xs">
              <Lock className="w-6 h-6 text-neutral-600 mx-auto" />
              <p className="text-neutral-400">No active receipt in buffer.</p>
              <p className="text-[11px] text-neutral-600">Execute any of the 3 sacred mechanics above to generate an immutable Canon Alignment Hash.</p>
            </div>
          )}

          {/* Ledger Transaction Stream */}
          <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <h4 className="font-mono font-bold text-xs text-white uppercase flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-amber-400" />
                <span>IGNIS X LEDGER HISTORY ({transactions.length})</span>
              </h4>
              <span className="text-[10px] font-mono text-emerald-400">IMMUTABLE LOG</span>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-none font-mono text-xs">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 bg-[#141416] border border-[#262626] rounded-xl flex items-center justify-between gap-2"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-neutral-200 font-bold truncate text-[11px]">{tx.source}</div>
                    <div className="text-[10px] text-neutral-500">
                      {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`font-bold ${tx.type === 'earn' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {tx.type === 'earn' ? '+' : '-'}{tx.amount} IGNIS X
                    </div>
                    <div className="text-[9px] text-neutral-500">{tx.balanceAfter} BAL</div>
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
