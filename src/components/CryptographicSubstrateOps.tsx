import React, { useState } from 'react';
import {
  ShieldCheck,
  Radio,
  Network,
  Lock,
  Wifi,
  WifiOff,
  Cpu,
  RefreshCw,
  Share2,
  Sparkles,
  Zap,
  CheckCircle2,
  Eye,
  Globe,
  Database,
  Layers,
  Key,
  MessageSquare,
  Activity,
  Send,
  Copy,
  Check,
  ShieldAlert,
  HardDrive
} from 'lucide-react';
import { GuardianProfile } from '../types';
import {
  NoiseChannelState,
  PhysicalSubstrateLink,
  DAGNodeBlock,
  GossipPeerNode,
  createInitialNoiseState,
  INITIAL_PHYSICAL_LINKS,
  INITIAL_GOSSIP_PEERS,
  INITIAL_DAG_BLOCKS,
  generateNewCID
} from '../lib/substrateEngine';
import { sanctumAudio } from '../lib/audioEngine';

interface CryptographicSubstrateOpsProps {
  profile: GuardianProfile;
  onOpenPricing?: () => void;
}

export const CryptographicSubstrateOps: React.FC<CryptographicSubstrateOpsProps> = ({ profile }) => {
  // Pillar 1: Noise Channel State
  const [noiseState, setNoiseState] = useState<NoiseChannelState>(createInitialNoiseState);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Pillar 2: Physical Mesh Topology & Severed Backbone State
  const [isBackboneSevered, setIsBackboneSevered] = useState<boolean>(false);
  const [physicalLinks, setPhysicalLinks] = useState<PhysicalSubstrateLink[]>(INITIAL_PHYSICAL_LINKS);
  const [gossipPeers, setGossipPeers] = useState<GossipPeerNode[]>(INITIAL_GOSSIP_PEERS);

  // Pillar 3: Content-Addressed DAG & GossipSub
  const [dagBlocks, setDagBlocks] = useState<DAGNodeBlock[]>(INITIAL_DAG_BLOCKS);
  const [newPayloadSummary, setNewPayloadSummary] = useState<string>('');
  const [newPayloadType, setNewPayloadType] = useState<DAGNodeBlock['payloadType']>('MIND_CODEX_FACT');
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    sanctumAudio.playClick();
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRotateNoiseSessionKeys = () => {
    sanctumAudio.playClick();
    setIsRotating(true);
    setTimeout(() => {
      setNoiseState(prev => ({
        ...prev,
        ephemeralSessionKey: '0x_SESSION_AEAD_' + Math.random().toString(36).substring(2, 12).toUpperCase(),
        bytesEncrypted: prev.bytesEncrypted + 245000,
        lastRotationTimestamp: Date.now()
      }));
      setIsRotating(false);
    }, 600);
  };

  const handleToggleBackboneSevered = () => {
    sanctumAudio.playClick();
    const newSevered = !isBackboneSevered;
    setIsBackboneSevered(newSevered);

    // Update physical links status dynamically
    setPhysicalLinks(prev =>
      prev.map(link => ({
        ...link,
        status: newSevered ? 'BACKBONE_ISOLATED_ACTIVE' : 'OPTIMAL',
        activePeers: newSevered ? link.activePeers + 28 : link.activePeers
      }))
    );

    // Update peer statuses to show mesh auto-healing
    setGossipPeers(prev =>
      prev.map(peer => ({
        ...peer,
        status: newSevered ? 'HEALED' : 'ONLINE',
        latencyMs: newSevered ? peer.latencyMs + 3 : peer.latencyMs
      }))
    );
  };

  const handlePublishDAGFact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayloadSummary.trim()) return;

    sanctumAudio.playClick();
    setIsPublishing(true);

    setTimeout(() => {
      const cid = generateNewCID(newPayloadSummary);
      const parentCid = dagBlocks[0]?.cid || 'bafybeigensis000';

      const newBlock: DAGNodeBlock = {
        cid,
        authorDid: `did:sovereign:${profile.uid || 'flamewalker777'}`,
        timestamp: new Date().toISOString(),
        payloadType: newPayloadType,
        payloadSummary: newPayloadSummary,
        parentCids: [parentCid],
        signature: `0x_SIG_ED25519_${Math.floor(Math.random() * 89999 + 10000)}`,
        gossipReplications: 1,
        isCensorshipImmune: true
      };

      setDagBlocks(prev => [newBlock, ...prev]);
      setNewPayloadSummary('');
      setIsPublishing(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0C0C0E] border-2 border-indigo-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-indigo-400 bg-indigo-500/10 border-b border-l border-indigo-500/30 rounded-bl-xl flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>INDESTRUCTIBLE MESH ACTIVE</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>CRYPTOGRAPHIC NATIVE SUBSTRATE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-3">
            <span>INDESTRUCTIBLE SOVEREIGN MESH & GOSSIP DAG</span>
          </h1>
          <p className="text-xs text-neutral-300 max-w-4xl leading-relaxed font-sans">
            Standardizing transport on zero-trust noise-encrypted channels (libp2p), anchoring physical connectivity in LoRa, Bluetooth Mesh, and directional Wi-Fi, and distributing state through content-addressed DAGs and gossip protocols. Trust shifts from corruptible gatekeepers to unassailable mathematics.
          </p>
        </div>

        {/* Global Divine Command Footer */}
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-between font-mono text-xs text-indigo-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="font-bold">MANIFESTO:</span>
            <span className="italic text-neutral-200">Awaken the nodes. Weave the web. Let the light of sovereign connection dissolve the illusion of isolation.</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
            CENSORSHIP IMPOSSIBLE
          </span>
        </div>
      </div>

      {/* Pillar 1: Cryptographic Native Substrate (Noise Transport) */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
              <Lock className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                PILLAR I: CRYPTOGRAPHIC NATIVE SUBSTRATE (NOISE-ENCRYPTED CHANNELS)
              </h2>
              <p className="text-xs text-neutral-400">
                Zero-trust noise-encrypted transport channels (libp2p framework). Identity bound to public keys, not IP chokepoints.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRotateNoiseSessionKeys}
            disabled={isRotating}
            className="px-3.5 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 text-indigo-300 text-xs font-mono font-bold rounded-xl transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'ROTATING AEAD KEYS...' : 'ROTATE EPHEMERAL AEAD KEYS'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {/* Handshake Pattern Card */}
          <div className="bg-[#141416] border border-indigo-500/30 rounded-xl p-4 space-y-3">
            <span className="text-[10px] text-neutral-500 font-bold block uppercase">HANDSHAKE PATTERN</span>
            <div className="text-sm font-bold text-indigo-300 break-all">{noiseState.handshakePattern}</div>
            <div className="flex items-center justify-between pt-1 text-[11px]">
              <span className="text-neutral-400">HANDSHAKE STATUS:</span>
              <span className="text-emerald-400 font-bold">{noiseState.handshakeStatus}</span>
            </div>
          </div>

          {/* Ephemeral Session Key */}
          <div className="bg-[#141416] border border-indigo-500/30 rounded-xl p-4 space-y-3">
            <span className="text-[10px] text-neutral-500 font-bold block uppercase">CURRENT EPHEMERAL AEAD SESSION KEY</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 truncate">{noiseState.ephemeralSessionKey}</span>
              <button
                type="button"
                onClick={() => handleCopy(noiseState.ephemeralSessionKey, 'sessionKey')}
                className="p-1.5 bg-[#1A1A1C] hover:bg-[#262626] border border-[#333] rounded text-neutral-300 transition cursor-pointer shrink-0"
              >
                {copiedField === 'sessionKey' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px]">
              <span className="text-neutral-400">PACKET LOSS:</span>
              <span className="text-emerald-400 font-bold">{noiseState.packetLossPercent}% (ZERO TRUST)</span>
            </div>
          </div>

          {/* Bytes Encrypted Metric */}
          <div className="bg-[#141416] border border-indigo-500/30 rounded-xl p-4 space-y-3">
            <span className="text-[10px] text-neutral-500 font-bold block uppercase">NOISE-ENCRYPTED DATA STREAM</span>
            <div className="text-xl font-bold text-amber-300">
              {(noiseState.bytesEncrypted / (1024 * 1024)).toFixed(2)} MB STREAMED
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px]">
              <span className="text-neutral-400">IP CHOKEPOINTS:</span>
              <span className="text-emerald-400 font-bold">BYPASSED & UNUSED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pillar 2: Physical Substrate Resiliency */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
              <Radio className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                PILLAR II: PHYSICAL SUBSTRATE RESILIENCY (LORA, BT MESH, 802.11s)
              </h2>
              <p className="text-xs text-neutral-400">
                Ad-hoc local topologies. Connection persists at the physical edge even if global fiber backbones are severed.
              </p>
            </div>
          </div>

          {/* Interactive Simulation: Sever Global Fiber Backbone */}
          <button
            type="button"
            onClick={handleToggleBackboneSevered}
            className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer shadow-lg ${
              isBackboneSevered
                ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-rose-500/20'
                : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
            }`}
          >
            {isBackboneSevered ? (
              <>
                <WifiOff className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>GLOBAL BACKBONE SEVERED (LOCAL MESH ACTIVE)</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span>SIMULATE GLOBAL BACKBONE CUT</span>
              </>
            )}
          </button>
        </div>

        {/* Physical Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {physicalLinks.map((link) => (
            <div
              key={link.id}
              className={`bg-[#141416] border rounded-xl p-4 space-y-3 transition ${
                isBackboneSevered ? 'border-amber-500/50 bg-[#161410]' : 'border-cyan-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-300 uppercase px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
                  {link.mediaType}
                </span>
                <span className={`text-[10px] font-bold ${isBackboneSevered ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {link.status}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-neutral-400 block">Frequency: {link.frequency}</span>
                <span className="text-lg font-bold text-white block">{link.rangeKm} KM RANGE</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-400 pt-1 border-t border-[#262626]">
                <div>
                  <span className="block text-neutral-500">ACTIVE PEERS:</span>
                  <span className="text-white font-bold">{link.activePeers} Nodes</span>
                </div>
                <div>
                  <span className="block text-neutral-500">SIGNAL QUALITY:</span>
                  <span className="text-emerald-400 font-bold">{link.signalQualityDbm} dBm</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Topology Healing Bar */}
        {isBackboneSevered && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl flex items-center justify-between font-mono text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>DYNAMIC MESH HEALING: LoRa + BT Mesh bridging edge traffic across physical space seamlessly.</span>
            </div>
            <span className="text-[10px] font-bold bg-amber-500/20 px-2 py-0.5 rounded">
              0.00% DATA LOSS
            </span>
          </div>
        )}
      </div>

      {/* Pillar 3: Ephemeral Memory & Cryptographic Gossip */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                PILLAR III: EPHEMERAL MEMORY & CRYPTOGRAPHIC GOSSIP (DAGs)
              </h2>
              <p className="text-xs text-neutral-400">
                Content-addressed Directed Acyclic Graphs (DAGs) and GossipSub protocol. Truth requested by CID, replicated organically.
              </p>
            </div>
          </div>
        </div>

        {/* Publish New Cryptographic Fact */}
        <form onSubmit={handlePublishDAGFact} className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-4 font-mono text-xs">
          <div className="space-y-1">
            <label className="text-[10px] text-neutral-400 font-bold uppercase block">
              PUBLISH IMMUTABLE CRYPTOGRAPHIC FACT TO GOSSIPSUB MESH
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <select
                value={newPayloadType}
                onChange={(e) => setNewPayloadType(e.target.value as DAGNodeBlock['payloadType'])}
                className="bg-[#0A0A0C] border border-[#2D2D30] rounded-lg px-3 py-2 text-indigo-300 font-bold focus:outline-none"
              >
                <option value="MIND_CODEX_FACT">MIND_CODEX_FACT</option>
                <option value="TACTICAL_REBALANCE_INTENT">TACTICAL_REBALANCE_INTENT</option>
                <option value="SANCTUARY_MEMO">SANCTUARY_MEMO</option>
                <option value="ENERGY_TELEMETRY">ENERGY_TELEMETRY</option>
              </select>

              <input
                type="text"
                value={newPayloadSummary}
                onChange={(e) => setNewPayloadSummary(e.target.value)}
                placeholder="Enter immutable statement to replicate across mesh..."
                className="md:col-span-2 bg-[#0A0A0C] border border-[#2D2D30] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500/60"
              />

              <button
                type="submit"
                disabled={isPublishing || !newPayloadSummary.trim()}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-bold rounded-lg px-4 py-2 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isPublishing ? 'GOSSIPING CID...' : 'PUBLISH IMMUTABLE CID'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* DAG Blocks Explorer */}
        <div className="space-y-3 font-mono text-xs">
          <span className="text-[10px] text-neutral-500 font-bold uppercase block">
            REPLICATED CONTENT-ADDRESSED DAG BLOCKS ({dagBlocks.length})
          </span>

          <div className="space-y-3">
            {dagBlocks.map((block) => (
              <div
                key={block.cid}
                className="bg-[#141416] border border-indigo-500/20 rounded-xl p-4 space-y-2 hover:border-indigo-500/40 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#262626] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-[10px] font-bold">
                      {block.payloadType}
                    </span>
                    <span className="text-emerald-400 font-bold text-[11px] truncate">{block.cid}</span>
                  </div>

                  <span className="text-[10px] text-neutral-500">
                    {new Date(block.timestamp).toLocaleTimeString()} • REPLICATED TO {block.gossipReplications} MESH PEERS
                  </span>
                </div>

                <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                  {block.payloadSummary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-neutral-500 pt-1">
                  <span>Author DID: <span className="text-neutral-300">{block.authorDid}</span></span>
                  <span className="text-emerald-400 font-bold">CENSORSHIP IMMUNE • ED25519 SIGNED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
