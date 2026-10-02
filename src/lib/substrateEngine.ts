/**
 * Cryptographic Native Substrate & Indestructible Sovereign Mesh Engine
 * 
 * 1. Cryptographic Native Substrate: Zero-Trust Noise-Encrypted Channels (libp2p transport)
 * 2. Physical Substrate Resiliency: LoRa, Bluetooth Mesh, 802.11s Directional Wi-Fi
 * 3. Ephemeral Memory & Cryptographic Gossip: Content-Addressed DAGs (CID) & GossipSub Protocol
 */

export interface NoiseChannelState {
  handshakePattern: 'Noise_XX_25519_ChaChaPoly_BLAKE2s';
  handshakeStatus: 'COMPLETED' | 'ROTATING' | 'HANDSHAKING';
  localPeerPubKey: string;
  remotePeerPubKey: string;
  ephemeralSessionKey: string;
  bytesEncrypted: number;
  packetLossPercent: number;
  lastRotationTimestamp: number;
}

export interface PhysicalSubstrateLink {
  id: string;
  mediaType: 'LoRa Sub-GHz' | 'Bluetooth LE Mesh' | '802.11s Directional Wi-Fi' | 'Satellite Relay Shard';
  frequency: string;
  rangeKm: number;
  activePeers: number;
  bandwidthKbps: number;
  signalQualityDbm: number;
  status: 'OPTIMAL' | 'MESH_BRIDGED' | 'BACKBONE_ISOLATED_ACTIVE';
}

export interface DAGNodeBlock {
  cid: string;
  authorDid: string;
  timestamp: string;
  payloadType: 'MIND_CODEX_FACT' | 'TACTICAL_REBALANCE_INTENT' | 'SANCTUARY_MEMO' | 'ENERGY_TELEMETRY';
  payloadSummary: string;
  parentCids: string[];
  signature: string;
  gossipReplications: number;
  isCensorshipImmune: boolean;
}

export interface GossipPeerNode {
  nodeId: string;
  alias: string;
  mediaType: 'LoRa' | 'Bluetooth' | 'Wi-Fi' | 'Multi-Homed';
  pubKeyHash: string;
  latencyMs: number;
  isGossipSubRelay: boolean;
  status: 'ONLINE' | 'RE-ROUTING' | 'HEALED';
}

// Default initial state generator
export function createInitialNoiseState(): NoiseChannelState {
  const localKey = '0x_NOISE_PUB_' + Math.random().toString(36).substring(2, 10).toUpperCase();
  const remoteKey = '0x_NOISE_REMOTE_' + Math.random().toString(36).substring(2, 10).toUpperCase();
  const sessionKey = '0x_SESSION_AEAD_' + Math.random().toString(36).substring(2, 12).toUpperCase();

  return {
    handshakePattern: 'Noise_XX_25519_ChaChaPoly_BLAKE2s',
    handshakeStatus: 'COMPLETED',
    localPeerPubKey: localKey,
    remotePeerPubKey: remoteKey,
    ephemeralSessionKey: sessionKey,
    bytesEncrypted: 4892100,
    packetLossPercent: 0.001,
    lastRotationTimestamp: Date.now()
  };
}

export const INITIAL_PHYSICAL_LINKS: PhysicalSubstrateLink[] = [
  {
    id: 'link-lora-915',
    mediaType: 'LoRa Sub-GHz',
    frequency: '915.00 MHz (Sub-GHz)',
    rangeKm: 24.5,
    activePeers: 142,
    bandwidthKbps: 64,
    signalQualityDbm: -82,
    status: 'OPTIMAL'
  },
  {
    id: 'link-bt-mesh',
    mediaType: 'Bluetooth LE Mesh',
    frequency: '2.40 GHz (BLE Mesh v2)',
    rangeKm: 0.8,
    activePeers: 389,
    bandwidthKbps: 1200,
    signalQualityDbm: -54,
    status: 'OPTIMAL'
  },
  {
    id: 'link-wifi-directional',
    mediaType: '802.11s Directional Wi-Fi',
    frequency: '5.80 GHz (802.11s Grid)',
    rangeKm: 12.0,
    activePeers: 78,
    bandwidthKbps: 867000,
    signalQualityDbm: -61,
    status: 'OPTIMAL'
  }
];

export const INITIAL_GOSSIP_PEERS: GossipPeerNode[] = [
  {
    nodeId: 'node-shasta-01',
    alias: 'Mount Shasta Sovereign Alpha',
    mediaType: 'Multi-Homed',
    pubKeyHash: '0x88f1a2...99d1',
    latencyMs: 4,
    isGossipSubRelay: true,
    status: 'ONLINE'
  },
  {
    nodeId: 'node-austin-02',
    alias: 'Austin Off-Grid Fusion Relay',
    mediaType: 'LoRa',
    pubKeyHash: '0x33e9b1...11a4',
    latencyMs: 18,
    isGossipSubRelay: true,
    status: 'ONLINE'
  },
  {
    nodeId: 'node-[#0A]vessel',
    alias: 'Alpine Sanctuary Microgrid',
    mediaType: 'Wi-Fi',
    pubKeyHash: '0x77c2f0...88e3',
    latencyMs: 2,
    isGossipSubRelay: true,
    status: 'ONLINE'
  }
];

export const INITIAL_DAG_BLOCKS: DAGNodeBlock[] = [
  {
    cid: 'bafybeigdyr3567qwertyuiopasdfghjklzxcvbnm1',
    authorDid: 'did:sovereign:flamewalker777',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    payloadType: 'MIND_CODEX_FACT',
    payloadSummary: 'The 72-Hour Sovereign Rebalance: Reallocating $3.8T to Energy-Backed Synthetic Reserves',
    parentCids: ['bafybeicodex000genesisblockhash999'],
    signature: '0x_SIG_ED25519_FAITH_91023',
    gossipReplications: 612,
    isCensorshipImmune: true
  },
  {
    cid: 'bafybeihk33902911223344556677889900aabbcc2',
    authorDid: 'did:sovereign:shastarelay01',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    payloadType: 'SANCTUARY_MEMO',
    payloadSummary: 'Physical Substrate Bridge Operational Across LoRa 915MHz and 802.11s Local Topology',
    parentCids: ['bafybeigdyr3567qwertyuiopasdfghjklzxcvbnm1'],
    signature: '0x_SIG_ED25519_SHASTA_44109',
    gossipReplications: 1420,
    isCensorshipImmune: true
  }
];

export function generateNewCID(payload: string): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';
  for (let i = 0; i < 46; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `bafybei${hash}`;
}
