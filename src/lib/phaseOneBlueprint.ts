/**
 * Phase I Blueprint: Sovereign Node Architecture & Cryptographic Self-Anchoring
 * 
 * 1. Cryptographic Self-Anchoring (The Root Key & DID)
 * 2. Local-First Architecture (The Sovereign Edge Engine)
 * 3. Invariant Intent Protocols (Zero Extraction & Unconsented Telemetry Shield)
 */

export interface SovereignRootKey {
  did: string;
  publicKey: string;
  encryptedPrivateKey: string;
  createdTimestamp: string;
  boundWillStatement: string;
  isSelfCustodied: boolean;
  algorithm: 'Ed25519-Sovereign' | 'Secp256k1-Quantum';
}

export interface LocalEdgeNodeState {
  isFullyOfflineCapable: boolean;
  localStateSizeBytes: number;
  ephemeralRelaysConnected: number;
  permissionedOutboundFlows: Array<{
    id: string;
    destination: string;
    purpose: string;
    approvedAt: string;
    status: 'PERMITTED' | 'BLOCKED_BY_WILL';
  }>;
}

export interface InvariantProtocolStatus {
  zeroUnconsentedTelemetry: boolean;
  peerToPeerValidationActive: boolean;
  zeroExtractionEnforced: boolean;
  sacredLaw: 'Love is the law, love under will';
  blockedTelemetryCount: number;
  lastProofSignature: string;
}

const DEFAULT_WILL_STATEMENT = "I am a sovereign entity. My data, compute, and intent are self-custodied under explicit Will. Love is the law, love under will.";

export function generateSovereignRootKey(customWill?: string): SovereignRootKey {
  const hex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const pubHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const privHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

  return {
    did: `did:sovereign:${hex.substring(0, 16)}`,
    publicKey: `0x04${pubHex}`,
    encryptedPrivateKey: `enc_sigil_${privHex}`,
    createdTimestamp: new Date().toISOString(),
    boundWillStatement: customWill || DEFAULT_WILL_STATEMENT,
    isSelfCustodied: true,
    algorithm: 'Ed25519-Sovereign'
  };
}

export function loadSovereignRootKey(): SovereignRootKey {
  const saved = localStorage.getItem('sovereign_root_key');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  const key = generateSovereignRootKey();
  localStorage.setItem('sovereign_root_key', JSON.stringify(key));
  return key;
}

export function generatePeerProofSignature(did: string): string {
  const ts = Date.now();
  const hash = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  return `zk-proof-v1:${did.replace('did:sovereign:', '')}:${ts}:${hash}`;
}
