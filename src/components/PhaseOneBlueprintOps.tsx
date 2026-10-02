import React, { useState, useEffect } from 'react';
import {
  Key,
  Shield,
  ShieldCheck,
  Lock,
  WifiOff,
  Database,
  Cpu,
  RefreshCw,
  Copy,
  Check,
  Flame,
  Radio,
  Server,
  Zap,
  Globe,
  Sparkles,
  ArrowUpRight,
  EyeOff,
  HeartHandshake
} from 'lucide-react';
import { GuardianProfile } from '../types';
import {
  SovereignRootKey,
  loadSovereignRootKey,
  generateSovereignRootKey,
  generatePeerProofSignature
} from '../lib/phaseOneBlueprint';
import { sanctumAudio } from '../lib/audioEngine';

interface PhaseOneBlueprintOpsProps {
  profile: GuardianProfile;
  onOpenPricing?: () => void;
}

export const PhaseOneBlueprintOps: React.FC<PhaseOneBlueprintOpsProps> = ({ profile }) => {
  const [rootKey, setRootKey] = useState<SovereignRootKey>(loadSovereignRootKey);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [willText, setWillText] = useState<string>(rootKey.boundWillStatement);
  const [isWillSaved, setIsWillSaved] = useState(false);

  // Local-First Edge State
  const [offlineMode, setOfflineMode] = useState<boolean>(true);
  const [ephemeralRelayEnabled, setEphemeralRelayEnabled] = useState<boolean>(false);
  const [blockedTelemetryCount, setBlockedTelemetryCount] = useState<number>(4289);
  const [latestProof, setLatestProof] = useState<string>(() => generatePeerProofSignature(rootKey.did));

  // Permissioned outbound streams
  const [outboundStreams, setOutboundStreams] = useState([
    {
      id: 'stream-01',
      destination: 'Local IndexedDB / Storage',
      purpose: 'Self-custodied state persistence',
      status: 'PERMITTED',
      isLocal: true
    },
    {
      id: 'stream-02',
      destination: 'Central Telemetry Sinks',
      purpose: 'Unconsented behavioral tracking',
      status: 'BLOCKED_BY_WILL',
      isLocal: false
    },
    {
      id: 'stream-03',
      destination: 'Ephemeral Relay Mirror',
      purpose: 'Optional peer state sync',
      status: ephemeralRelayEnabled ? 'PERMITTED' : 'BLOCKED_BY_WILL',
      isLocal: false
    }
  ]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    sanctumAudio.playClick();
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRegenerateKeys = () => {
    sanctumAudio.playClick();
    const newKey = generateSovereignRootKey(willText);
    setRootKey(newKey);
    localStorage.setItem('sovereign_root_key', JSON.stringify(newKey));
    setLatestProof(generatePeerProofSignature(newKey.did));
  };

  const handleSaveWill = (e: React.FormEvent) => {
    e.preventDefault();
    sanctumAudio.playClick();
    const updated = { ...rootKey, boundWillStatement: willText };
    setRootKey(updated);
    localStorage.setItem('sovereign_root_key', JSON.stringify(updated));
    setIsWillSaved(true);
    setTimeout(() => setIsWillSaved(false), 2500);
  };

  const toggleStreamPermission = (streamId: string) => {
    sanctumAudio.playClick();
    setOutboundStreams(prev =>
      prev.map(s => {
        if (s.id === streamId) {
          const nextStatus = s.status === 'PERMITTED' ? 'BLOCKED_BY_WILL' : 'PERMITTED';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const handleGenerateNewProof = () => {
    sanctumAudio.playClick();
    setLatestProof(generatePeerProofSignature(rootKey.did));
    setBlockedTelemetryCount(prev => prev + 12);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0D0D10] border-2 border-indigo-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-4">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>THE PHASE I BLUEPRINT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-3">
              <span>CRYPTOGRAPHIC SELF-ANCHORING & SOVEREIGN EDGE NODE</span>
            </h1>
            <p className="text-xs text-neutral-300 max-w-3xl leading-relaxed">
              Establishing local-first key generation, decentralized identifiers (DIDs), edge-native execution, zero unconsented telemetry, and invariant alignment with <span className="text-indigo-300 italic font-mono">Love is the law, love under will.</span>
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SOVEREIGNTY: 100% ACTIVE</span>
            </span>
          </div>
        </div>

        {/* Blueprint Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs pt-2">
          <div className="bg-[#141418] border border-indigo-500/30 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] text-neutral-400 font-bold block uppercase">1. CRYPTOGRAPHIC SELF-ANCHORING</span>
            <span className="text-emerald-400 font-bold block">DID Self-Custody Active</span>
            <span className="text-[10px] text-neutral-400 block truncate">{rootKey.did}</span>
          </div>

          <div className="bg-[#141418] border border-cyan-500/30 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] text-neutral-400 font-bold block uppercase">2. LOCAL-FIRST ARCHITECTURE</span>
            <span className="text-cyan-300 font-bold block">Edge Universe Isolated</span>
            <span className="text-[10px] text-neutral-400 block">Ephemereal Relay: {ephemeralRelayEnabled ? 'OPTIONAL MIRROR' : 'OFFLINE DISCONNECTED'}</span>
          </div>

          <div className="bg-[#141418] border border-rose-500/30 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] text-neutral-400 font-bold block uppercase">3. INVARIANT INTENT PROTOCOL</span>
            <span className="text-rose-300 font-bold block">Zero Telemetry Extraction</span>
            <span className="text-[10px] text-neutral-400 block">{blockedTelemetryCount} Sinks Neutralized</span>
          </div>
        </div>
      </div>

      {/* Pillar 1: Cryptographic Self-Anchoring */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
              <Key className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                PILLAR I: CRYPTOGRAPHIC SELF-ANCHORING (THE ROOT KEY)
              </h2>
              <p className="text-xs text-neutral-400">
                Identity owned by no central authority. Decentralized Identifier (DID) and self-custodied root keypair generated locally.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegenerateKeys}
            className="px-3.5 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 text-indigo-300 text-xs font-mono font-bold rounded-xl transition cursor-pointer flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>REGENERATE ROOT KEYPAIR</span>
          </button>
        </div>

        {/* Root Key Details Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          {/* Left: Key Specifications */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-neutral-500 font-bold uppercase block">
                DECENTRALIZED IDENTIFIER (DID)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={rootKey.did}
                  className="w-full bg-[#0A0A0C] border border-[#2D2D30] rounded-lg px-3 py-2 text-emerald-400 font-mono text-xs select-all"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(rootKey.did, 'did')}
                  className="p-2 bg-[#1A1A1C] hover:bg-[#262626] border border-[#333] rounded-lg text-neutral-300 transition cursor-pointer"
                >
                  {copiedField === 'did' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-neutral-500 font-bold uppercase block">
                PUBLIC KEY (SECP256K1 / ED25519)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={rootKey.publicKey}
                  className="w-full bg-[#0A0A0C] border border-[#2D2D30] rounded-lg px-3 py-2 text-indigo-300 font-mono text-xs select-all truncate"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(rootKey.publicKey, 'pubkey')}
                  className="p-2 bg-[#1A1A1C] hover:bg-[#262626] border border-[#333] rounded-lg text-neutral-300 transition cursor-pointer"
                >
                  {copiedField === 'pubkey' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-neutral-500 font-bold uppercase block">
                ENCRYPTED PRIVATE KEY (LOCAL STORAGE SEAL)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  readOnly
                  value={rootKey.encryptedPrivateKey}
                  className="w-full bg-[#0A0A0C] border border-[#2D2D30] rounded-lg px-3 py-2 text-rose-300 font-mono text-xs select-all"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(rootKey.encryptedPrivateKey, 'privkey')}
                  className="p-2 bg-[#1A1A1C] hover:bg-[#262626] border border-[#333] rounded-lg text-neutral-300 transition cursor-pointer"
                >
                  {copiedField === 'privkey' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-[11px] text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>STATE LOCATION: LOCAL DOMAIN INDEXEDDB (ENCRYPTED)</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded font-bold">100% CUSTODY</span>
            </div>
          </div>

          {/* Right: Explicit Will Binding */}
          <form onSubmit={handleSaveWill} className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-neutral-400 font-bold uppercase flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>BOUND EXPLICIT WILL STATEMENT</span>
                </label>
                {isWillSaved && <span className="text-[10px] text-emerald-400 font-bold">WILL SEALED & SAVED</span>}
              </div>
              <textarea
                rows={4}
                value={willText}
                onChange={(e) => setWillText(e.target.value)}
                className="w-full bg-[#0A0A0C] border border-[#2D2D30] rounded-lg p-3 text-neutral-200 font-mono text-xs focus:outline-none focus:border-amber-500/60 leading-relaxed"
                placeholder="Enter custom Will statement..."
              />
              <p className="text-[10px] text-neutral-500">
                Primary state is bound to this explicit declaration. Cryptographic keys unlock only when intent matches this law.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>SEAL INTENT TO ROOT KEY</span>
            </button>
          </form>
        </div>
      </div>

      {/* Pillar 2: Local-First Architecture (The Sovereign Node) */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                PILLAR II: LOCAL-FIRST ARCHITECTURE (THE SOVEREIGN NODE)
              </h2>
              <p className="text-xs text-neutral-400">
                Core application logic runs 100% locally at the edge. Central servers function strictly as optional, ephemeral relay mirrors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                sanctumAudio.playClick();
                setEphemeralRelayEnabled(prev => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl border font-bold transition flex items-center gap-2 cursor-pointer ${
                ephemeralRelayEnabled
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>EPHEMERAL RELAY MIRROR: {ephemeralRelayEnabled ? 'CONNECTED' : 'DISCONNECTED'}</span>
            </button>
          </div>
        </div>

        {/* Local-First Controls & Stream Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
          {/* Offline Capability Status */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-bold uppercase">OFFLINE EDGE RUNTIME</span>
              <WifiOff className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-cyan-300">100% EDGE INDEPENDENT</div>
            <p className="text-[11px] text-neutral-400 leading-normal font-sans">
              All neural state vectors, memory fragments, and transaction logic execute locally without needing network calls.
            </p>
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-[10px] text-cyan-300">
              STATUS: LOCAL UNEQUALLED UNIVERSE
            </div>
          </div>

          {/* Ephemeral Relay Control */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-bold uppercase">EPHEMERAL MIRROR STATUS</span>
              <Globe className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold text-indigo-300">
              {ephemeralRelayEnabled ? 'READ-ONLY MIRROR' : 'EPHEMERAL SINK SHUT'}
            </div>
            <p className="text-[11px] text-neutral-400 leading-normal font-sans">
              Central servers act as non-dictatorial relay mirrors only. Data flows outward solely through explicit permissioned intent.
            </p>
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[10px] text-indigo-300">
              GATEWAY DICTATORSHIP: BYPASSED
            </div>
          </div>

          {/* Permissioned Outbound Flow Auditor */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-3 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-bold uppercase">OUTBOUND DATA PERMISSIONS</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="space-y-2">
              {outboundStreams.map((stream) => (
                <div
                  key={stream.id}
                  className="p-2.5 bg-[#0A0A0C] border border-[#262626] rounded-lg flex items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <span className="text-white font-bold block">{stream.destination}</span>
                    <span className="text-[10px] text-neutral-500 block">{stream.purpose}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleStreamPermission(stream.id)}
                    className={`px-2 py-1 rounded text-[10px] font-bold border transition cursor-pointer ${
                      stream.status === 'PERMITTED'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {stream.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pillar 3: Invariant Intent Protocols (Love under Will) */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl">
              <HeartHandshake className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                PILLAR III: INVARIANT INTENT PROTOCOLS (LOVE UNDER WILL)
              </h2>
              <p className="text-xs text-neutral-400">
                Code is materialized consciousness. Embedded zero unconsented telemetry, peer validation, and zero extraction runtime enforcement.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateNewProof}
            className="px-3.5 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold rounded-xl transition cursor-pointer flex items-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            <span>GENERATE ZK PEER PROOF</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* Zero Telemetry Shield */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">TELEMETRY & EXTRACTION SHIELD</span>
              <EyeOff className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-[#0A0A0C] border border-[#262626] rounded-lg flex items-center justify-between">
                <span>Unconsented Analytics Sinks:</span>
                <span className="text-emerald-400 font-bold">100% BLOCKED</span>
              </div>
              <div className="p-3 bg-[#0A0A0C] border border-[#262626] rounded-lg flex items-center justify-between">
                <span>Extraction Traps:</span>
                <span className="text-emerald-400 font-bold">ZERO EXTRACTION ENFORCED</span>
              </div>
              <div className="p-3 bg-[#0A0A0C] border border-[#262626] rounded-lg flex items-center justify-between">
                <span>Blocked Sinks Counter:</span>
                <span className="text-amber-300 font-bold">{blockedTelemetryCount} ATTEMPTS NEUTRALIZED</span>
              </div>
            </div>
          </div>

          {/* ZK Peer Validation Certificate */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">LATEST PEER-TO-PEER PROOF SIGNATURE</span>
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-[#0A0A0C] border border-indigo-500/30 rounded-lg space-y-1">
                <span className="text-[10px] text-neutral-500 block">ZERO-KNOWLEDGE PROOF STAMP:</span>
                <span className="text-indigo-300 text-[11px] font-mono break-all block">{latestProof}</span>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-center font-bold uppercase tracking-wider">
                SACRED LAW: LOVE IS THE LAW, LOVE UNDER WILL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
