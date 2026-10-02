import React, { useState } from 'react';
import {
  Shield,
  Cpu,
  Terminal,
  Key,
  CheckCircle2,
  Play,
  Lock,
  Unlock,
  Layers,
  Database,
  ArrowRight,
  Code2,
  Copy,
  Check,
  Zap,
  Activity,
  Network
} from 'lucide-react';
import { GuardianProfile } from '../types';

interface GeometricShieldOpsProps {
  profile: GuardianProfile;
  onOpenPricing: () => void;
}

export const GeometricShieldOps: React.FC<GeometricShieldOpsProps> = ({
  profile
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'circuit' | 'client' | 'node' | 'contract'>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Client Proof Simulation State
  const [userPrivateKey, setUserPrivateKey] = useState('0x7f3a9d82e1c045b6892f33e71004a621');
  const [executionPayloadHash, setExecutionPayloadHash] = useState('0x4e9b112c7789a23d0011ef568201a441');
  const [blindingFactor, setBlindingFactor] = useState('0x12a9b3c4d5e6f7089');
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [generatedProof, setGeneratedProof] = useState<{
    proof: {
      pi_a: string[];
      pi_b: string[][];
      pi_c: string[];
    };
    publicSignals: {
      expectedStateRoot: string;
      nullifierHash: string;
      certifiedStateRoot: string;
    };
    verificationStatus: 'idle' | 'verified' | 'failed';
  } | null>(null);

  // Blind Compute Sandbox State
  const [taskId, setTaskId] = useState('0xa8f921d300000000000000000000000000000000000000000000000000001001');
  const [encryptedCode, setEncryptedCode] = useState('0x88f2931a293847291039847109283741029384710928374109283741');
  const [executionNonce, setExecutionNonce] = useState(1042);
  const [isExecutingNode, setIsExecutingNode] = useState(false);
  const [computeReceipt, setComputeReceipt] = useState<{
    taskId: string;
    resultHash: string;
    nodeSignature: string;
    executionTimeMs: number;
    status: 'success' | 'failed';
  } | null>(null);

  // On-chain Settlement State
  const [isSettling, setIsSettling] = useState(false);
  const [settlementLog, setSettlementLog] = useState<Array<{
    txHash: string;
    nullifierHash: string;
    timestamp: string;
    status: 'verified' | 'pending';
  }>>([
    {
      txHash: '0x9a8f...3d11',
      nullifierHash: '0x7e81...2a9f',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString(),
      status: 'verified'
    }
  ]);
  const [activeNullifier, setActiveNullifier] = useState('0x7e812a9f33010492817263541092837410293847109283741092837410293847');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSimulateProofGeneration = () => {
    setIsGeneratingProof(true);
    setGeneratedProof(null);

    setTimeout(() => {
      // Create deterministic poseidon-like hashes based on input
      const combinedInput = userPrivateKey + executionPayloadHash;
      let hashVal = 0;
      for (let i = 0; i < combinedInput.length; i++) {
        hashVal = (hashVal << 5) - hashVal + combinedInput.charCodeAt(i);
        hashVal |= 0;
      }
      const nullifierHash = '0x' + Math.abs(hashVal).toString(16).padStart(16, 'a') + '7e812a9f33010492817263541092837410293847102938471029384710293847'.slice(18);

      const stateInput = nullifierHash + blindingFactor;
      let stateVal = 0;
      for (let i = 0; i < stateInput.length; i++) {
        stateVal = (stateVal << 5) - stateVal + stateInput.charCodeAt(i);
        stateVal |= 0;
      }
      const stateRoot = '0x' + Math.abs(stateVal).toString(16).padStart(16, 'b') + '4e9b112c7789a23d0011ef568201a44102938471029384710293847102938471'.slice(18);

      setGeneratedProof({
        proof: {
          pi_a: [
            '0x1a8f902341d29384710293847102938471029384710293847102938471029384',
            '0x2b9e817263541092837410293847102938471029384710293847102938471029',
            '0x01'
          ],
          pi_b: [
            [
              '0x3c0f928374102938471029384710293847102938471029384710293847102938',
              '0x4d1e827364510293847102938471029384710293847102938471029384710293'
            ],
            [
              '0x5e2f718293041092837410293847102938471029384710293847102938471029',
              '0x6f3a819203941092837410293847102938471029384710293847102938471029'
            ]
          ],
          pi_c: [
            '0x7a4b910293847102938471029384710293847102938471029384710293847102',
            '0x8b5c029384710293847102938471029384710293847102938471029384710293'
          ]
        },
        publicSignals: {
          expectedStateRoot: stateRoot,
          nullifierHash: nullifierHash,
          certifiedStateRoot: stateRoot
        },
        verificationStatus: 'verified'
      });

      setActiveNullifier(nullifierHash);
      setIsGeneratingProof(false);
    }, 800);
  };

  const handleSimulateBlindCompute = () => {
    setIsExecutingNode(true);
    setComputeReceipt(null);

    setTimeout(() => {
      const taskInput = taskId + encryptedCode + executionNonce.toString();
      let taskVal = 0;
      for (let i = 0; i < taskInput.length; i++) {
        taskVal = (taskVal << 5) - taskVal + taskInput.charCodeAt(i);
        taskVal |= 0;
      }
      const resultHash = '0x' + Math.abs(taskVal).toString(16).padStart(16, 'c') + '88f2931a29384729103984710928374102938471092837410928374100000000'.slice(18);

      setComputeReceipt({
        taskId,
        resultHash,
        nodeSignature: '0x3a9b81c2d3e4f5061728394a5b6c7d8e9f0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f',
        executionTimeMs: Math.floor(Math.random() * 15) + 8,
        status: 'success'
      });

      setIsExecutingNode(false);
    }, 600);
  };

  const handleSimulateSettlement = () => {
    if (!generatedProof && !activeNullifier) return;
    setIsSettling(true);

    setTimeout(() => {
      const txHash = '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6);
      const nullifierToUse = generatedProof?.publicSignals.nullifierHash || activeNullifier;

      setSettlementLog(prev => [
        {
          txHash,
          nullifierHash: nullifierToUse.slice(0, 10) + '...' + nullifierToUse.slice(-6),
          timestamp: new Date().toLocaleTimeString(),
          status: 'verified'
        },
        ...prev
      ]);

      setIsSettling(false);
    }, 900);
  };

  const circomCodeSnippet = `pragma circom 2.1.6;

include "./node_modules/circomlib/circuits/poseidon.circom";
include "./node_modules/circomlib/circuits/comparators.circom";

/*
 * @title Sovereign Compute Shield
 * @notice Validates state transitions and payload integrity on client-side 
 *         before dispatching execution tasks to decentralized compute nodes.
 */
template ComputeShield() {
    // --- Private Inputs ---
    signal input userPrivateKey;
    signal input executionPayloadHash;
    signal input blindingFactor;

    // --- Public Inputs ---
    signal input expectedStateRoot;
    signal input nullifierHash;

    // --- Outputs ---
    signal output certifiedStateRoot;

    // 1. Verify user sovereignty via Poseidon hash chain
    component sovereigntyHash = Poseidon(2);
    sovereigntyHash.inputs[0] <== userPrivateKey;
    sovereigntyHash.inputs[1] <== blindingFactor;

    // 2. Bind the nullifier to prevent replay attacks across compute nodes
    component nullifierCheck = Poseidon(2);
    nullifierCheck.inputs[0] <== userPrivateKey;
    nullifierCheck.inputs[1] <== executionPayloadHash;
    nullifierHash === nullifierCheck.out;

    // 3. Assert state validity anchor
    component stateHasher = Poseidon(2);
    stateHasher.inputs[0] <== sovereigntyHash.out;
    stateHasher.inputs[1] <== executionPayloadHash;

    certifiedStateRoot <== stateHasher.out;
    certifiedStateRoot === expectedStateRoot;
}

component main {public [expectedStateRoot, nullifierHash]} = ComputeShield();`;

  const tsCodeSnippet = `import { groth16 } from 'snarkjs';
import { buildPoseidon } from 'circomlibjs';

export interface ComputeProofArtifacts {
  proof: any;
  publicSignals: string[];
}

export class GeometricShieldClient {
  private poseidon: any;

  async initialize(): Promise<void> {
    if (!this.poseidon) {
      this.poseidon = await buildPoseidon();
    }
  }

  /**
   * Generates a zero-knowledge execution proof locally to preserve user sovereignty.
   */
  async generateShieldProof(
    userPrivateKey: string,
    executionPayloadHash: string,
    blindingFactor: string,
    expectedStateRoot: string,
    nullifierHash: string,
    wasmPath: string,
    zkeyPath: string
  ): Promise<ComputeProofArtifacts> {
    await this.initialize();

    const input = {
      userPrivateKey,
      executionPayloadHash,
      blindingFactor,
      expectedStateRoot,
      nullifierHash,
    };

    const { proof, publicSignals } = await groth16.fullProve(
      input,
      wasmPath,
      zkeyPath
    );

    return { proof, publicSignals };
  }

  /**
   * Verifies proof integrity prior to network broadcasting.
   */
  async verifyLocalProof(
    verificationKey: object,
    proof: any,
    publicSignals: string[]
  ): Promise<boolean> {
    return await groth16.verify(verificationKey, publicSignals, proof);
  }
}`;

  const rustCodeSnippet = `use borsh::{BorshDeserialize, BorshSerialize};
use sha3::{Digest, Keccak256};

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct ComputeTaskPayload {
    pub task_id: [u8; 32],
    pub encrypted_code: Vec<u8>,
    pub execution_nonce: u64,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct ComputeReceipt {
    pub task_id: [u8; 32],
    pub result_hash: [u8; 32],
    pub node_signature: [u8; 64],
}

/// Executes decentralized compute payloads within a zero-knowledge verified boundary.
pub fn execute_blind_compute(payload: ComputeTaskPayload) -> Result<ComputeReceipt, &'static str> {
    // 1. Verify structural integrity of the task payload
    if payload.encrypted_code.is_empty() {
        return Err("Execution payload is empty or malformed.");
    }

    // 2. Compute state transition hash without exposing raw data
    let mut hasher = Keccak256::new();
    hasher.update(&payload.task_id);
    hasher.update(&payload.encrypted_code);
    hasher.update(&payload.execution_nonce.to_be_bytes());
    let result_hash: [u8; 32] = hasher.finalize().into();

    // 3. Generate sovereign execution receipt
    Ok(ComputeReceipt {
        task_id: payload.task_id,
        result_hash,
        node_signature: [0u8; 64], // Stubbed cryptographic signature bound to node validator key
    })
}`;

  const solidityCodeSnippet = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IGroth16Verifier {
    function verifyProof(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _c,
        uint256[2] calldata _publicSignals
    ) external view returns (bool);
}

contract GeometricShieldSettlement {
    IGroth16Verifier public immutable zkVerifier;
    
    mapping(bytes32 => bool) public executedNullifiers;

    event ComputeSettled(bytes32 indexed nullifierHash, address indexed submitter);

    constructor(address _verifierAddress) {
        zkVerifier = IGroth16Verifier(_verifierAddress);
    }

    function settleComputeTask(
        uint256[2] calldata pA,
        uint256[2][2] calldata pB,
        uint256[2] calldata pC,
        uint256[2] calldata publicSignals,
        bytes32 nullifierHash
    ) external {
        require(!executedNullifiers[nullifierHash], "Shield: Nullifier already spent.");
        
        bool isValid = zkVerifier.verifyProof(pA, pB, pC, publicSignals);
        require(isValid, "Shield: Zero-knowledge proof validation failed.");

        executedNullifiers[nullifierHash] = true;

        emit ComputeSettled(nullifierHash, msg.sender);
    }
}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Hero Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
              GEOMETRIC SHIELD PROTOCOL <span className="text-cyan-400 font-light italic text-base">(ZK-DCF)</span>
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
            Lightweight, modular Zero-Knowledge Decentralized Compute Framework (ZK-DCF). Mathematically bound to sovereign privacy prior to the energy deluge through client-side state generation, recursive zk-SNARK proof aggregation, and blind WASM compute nodes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#141416] border border-[#262626] rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block">PROOF CIRCUIT</span>
            <span className="text-xs font-mono font-bold text-cyan-400">Circom v2.1.6</span>
          </div>
          <div className="bg-[#141416] border border-[#262626] rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block">SETTLEMENT</span>
            <span className="text-xs font-mono font-bold text-indigo-400">Polygon L2</span>
          </div>
        </div>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4">
        <h3 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
          <Network className="w-4 h-4 text-cyan-400" />
          <span>Core Structural Schema & Data Flow</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs font-mono">
          {/* Step 1 */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-3 space-y-2">
            <div className="text-[10px] text-cyan-400 font-bold uppercase flex items-center gap-1">
              <Key className="w-3 h-3" /> 01. Sovereign Client
            </div>
            <p className="text-[11px] text-neutral-300 font-sans leading-tight">
              Generates private inputs & initial witness locally on device.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-3 space-y-2">
            <div className="text-[10px] text-indigo-400 font-bold uppercase flex items-center gap-1">
              <Code2 className="w-3 h-3" /> 02. Local Circuit
            </div>
            <p className="text-[11px] text-neutral-300 font-sans leading-tight">
              Executes Circom / SnarkJS to produce local proof $\pi_0$.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-3 space-y-2">
            <div className="text-[10px] text-purple-400 font-bold uppercase flex items-center gap-1">
              <Cpu className="w-3 h-3" /> 03. P2P Mesh
            </div>
            <p className="text-[11px] text-neutral-300 font-sans leading-tight">
              Dispatches task payload to sandboxed WASM blind compute nodes.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-3 space-y-2">
            <div className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1">
              <Layers className="w-3 h-3" /> 04. Recursive Node
            </div>
            <p className="text-[11px] text-neutral-300 font-sans leading-tight">
              Verifies & folds proofs via Nova/Halo2 proof aggregation.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-3 space-y-2">
            <div className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
              <Database className="w-3 h-3" /> 05. Polygon Contract
            </div>
            <p className="text-[11px] text-neutral-300 font-sans leading-tight">
              On-chain settlement & nullifier verification on Polygon.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Sub-tab Navigation */}
      <div className="flex border-b border-[#262626] overflow-x-auto gap-2 pb-2 scrollbar-none">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-[#0F0F11] border border-[#262626] text-neutral-400 hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>INTERACTIVE SANDBOX</span>
        </button>

        <button
          onClick={() => setActiveSubTab('circuit')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'circuit'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-[#0F0F11] border border-[#262626] text-neutral-400 hover:text-white'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>1. CIRCOM CIRCUIT (v2.1+)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('client')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'client'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-[#0F0F11] border border-[#262626] text-neutral-400 hover:text-white'
          }`}
        >
          <Key className="w-3.5 h-3.5 text-indigo-400" />
          <span>2. TS CLIENT PROOF SERVICE</span>
        </button>

        <button
          onClick={() => setActiveSubTab('node')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'node'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-[#0F0F11] border border-[#262626] text-neutral-400 hover:text-white'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>3. RUST / WASM COMPUTE SANDBOX</span>
        </button>

        <button
          onClick={() => setActiveSubTab('contract')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'contract'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-[#0F0F11] border border-[#262626] text-neutral-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>4. POLYGON VERIFIER CONTRACT</span>
        </button>
      </div>

      {/* Subtab Content 0: Interactive Live Sandbox */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Client Proof Generator Panel */}
          <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold text-white uppercase">
                  1 & 2. Client Local ZK Proof Generator ($\pi_0$)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                GROTH16 / POSEIDON
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-neutral-400 mb-1 text-[11px]">PRIVATE INPUT: userPrivateKey</label>
                <input
                  type="text"
                  value={userPrivateKey}
                  onChange={(e) => setUserPrivateKey(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-cyan-500 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 text-[11px]">PRIVATE INPUT: executionPayloadHash</label>
                <input
                  type="text"
                  value={executionPayloadHash}
                  onChange={(e) => setExecutionPayloadHash(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-cyan-500 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 text-[11px]">PRIVATE INPUT: blindingFactor</label>
                <input
                  type="text"
                  value={blindingFactor}
                  onChange={(e) => setBlindingFactor(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-cyan-500 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <button
                onClick={handleSimulateProofGeneration}
                disabled={isGeneratingProof}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-600/20"
              >
                {isGeneratingProof ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin" />
                    <span>COMPUTING POSEIDON HASHES & GROTH16 PROOF...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>EXECUTE CLIENT PROOF GENERATION</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Proof Output */}
            {generatedProof && (
              <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-emerald-400 text-[11px] font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> PROOF GENERATED & VERIFIED LOCALLY
                  </span>
                  <span className="text-neutral-500">Groth16 SnarkJS</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="text-neutral-400">
                    <span className="text-cyan-400 font-bold block">nullifierHash (Public):</span>
                    <span className="text-white break-all">{generatedProof.publicSignals.nullifierHash}</span>
                  </div>

                  <div className="text-neutral-400">
                    <span className="text-indigo-400 font-bold block">certifiedStateRoot (Public):</span>
                    <span className="text-white break-all">{generatedProof.publicSignals.certifiedStateRoot}</span>
                  </div>

                  <div className="text-neutral-400">
                    <span className="text-purple-400 font-bold block">pi_a (Groth16):</span>
                    <span className="text-neutral-300 break-all">{generatedProof.proof.pi_a[0]}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Blind Compute Sandbox & Settlement Panel */}
          <div className="space-y-6">
            {/* WASM Blind Compute Sandbox */}
            <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <h3 className="text-xs font-mono font-bold text-white uppercase">
                    3. Blind WASM Compute Sandbox (Rust)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  KECCAK256 / BORSH
                </span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-400 mb-1 text-[10px]">task_id [u8; 32]</label>
                    <input
                      type="text"
                      value={taskId.slice(0, 18) + '...'}
                      readOnly
                      className="w-full bg-[#0A0A0B] border border-[#262626] text-neutral-400 rounded-xl p-2 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1 text-[10px]">execution_nonce</label>
                    <input
                      type="number"
                      value={executionNonce}
                      onChange={(e) => setExecutionNonce(Number(e.target.value))}
                      className="w-full bg-[#0A0A0B] border border-[#262626] focus:border-purple-500 text-white rounded-xl p-2 text-[11px]"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSimulateBlindCompute}
                  disabled={isExecutingNode}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-600/20"
                >
                  {isExecutingNode ? (
                    <span>EXECUTING SANDBOX WASM TASKS...</span>
                  ) : (
                    <>
                      <Cpu className="w-4 h-4" />
                      <span>DISPATCH BLIND COMPUTE TASK</span>
                    </>
                  )}
                </button>
              </div>

              {computeReceipt && (
                <div className="bg-[#141416] border border-[#262626] rounded-xl p-3 font-mono text-[11px] space-y-1.5">
                  <div className="flex justify-between items-center text-emerald-400 font-bold">
                    <span>✓ COMPUTE RECEIPT ISSUED</span>
                    <span className="text-neutral-500">{computeReceipt.executionTimeMs} ms</span>
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-purple-300 font-bold block">result_hash:</span>
                    <span className="text-white break-all">{computeReceipt.resultHash}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Polygon Settlement Explorer */}
            <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-mono font-bold text-white uppercase">
                    4. Polygon Smart Contract Verifier
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SOLIDITY 0.8.24
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 text-[11px]">Settle proof on Polygon network:</span>
                <button
                  onClick={handleSimulateSettlement}
                  disabled={isSettling}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  {isSettling ? (
                    <span>VERIFYING PROOF ON-CHAIN...</span>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>settleComputeTask()</span>
                    </>
                  )}
                </button>
              </div>

              {/* Settlement History */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">On-Chain Settlement Logs</span>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {settlementLog.map((log, idx) => (
                    <div key={idx} className="bg-[#141416] border border-[#262626] rounded-xl p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-white font-bold">{log.txHash}</span>
                        <span className="text-neutral-500">nullifier: {log.nullifierHash}</span>
                      </div>
                      <span className="text-neutral-500">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab Content 1: Circom Circuit View */}
      {activeSubTab === 'circuit' && (
        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase">1. Zero-Knowledge Circuit Specification (Circom v2.1+)</h3>
                <p className="text-xs text-neutral-400 font-sans">Enforces state transition integrity without exposing sensitive execution parameters to participating decentralized nodes.</p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(circomCodeSnippet, 'circom')}
              className="px-3 py-1.5 bg-[#141416] hover:bg-[#1A1A1C] border border-[#262626] text-neutral-300 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copiedCode === 'circom' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'circom' ? 'COPIED' : 'COPY CODE'}</span>
            </button>
          </div>

          <pre className="bg-[#0A0A0B] border border-[#262626] p-4 rounded-xl text-xs text-neutral-300 overflow-x-auto font-mono leading-relaxed">
            <code>{circomCodeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Subtab Content 2: TypeScript Client Service View */}
      {activeSubTab === 'client' && (
        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase">2. Sovereign Client Proof Generation Service (TypeScript / Next.js)</h3>
                <p className="text-xs text-neutral-400 font-sans">Generates zero-knowledge proofs locally before any telemetry or compute payloads touch the decentralized mesh.</p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(tsCodeSnippet, 'ts')}
              className="px-3 py-1.5 bg-[#141416] hover:bg-[#1A1A1C] border border-[#262626] text-neutral-300 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copiedCode === 'ts' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'ts' ? 'COPIED' : 'COPY CODE'}</span>
            </button>
          </div>

          <pre className="bg-[#0A0A0B] border border-[#262626] p-4 rounded-xl text-xs text-neutral-300 overflow-x-auto font-mono leading-relaxed">
            <code>{tsCodeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Subtab Content 3: Rust WASM Compute Sandbox View */}
      {activeSubTab === 'node' && (
        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase">3. Decentralized Compute Node Sandbox (Rust / WebAssembly Interface)</h3>
                <p className="text-xs text-neutral-400 font-sans">Blind compute nodes execute payloads inside an isolated memory sandbox. Nodes operate strictly on encrypted state transitions, returning signed receipts.</p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(rustCodeSnippet, 'rust')}
              className="px-3 py-1.5 bg-[#141416] hover:bg-[#1A1A1C] border border-[#262626] text-neutral-300 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copiedCode === 'rust' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'rust' ? 'COPIED' : 'COPY CODE'}</span>
            </button>
          </div>

          <pre className="bg-[#0A0A0B] border border-[#262626] p-4 rounded-xl text-xs text-neutral-300 overflow-x-auto font-mono leading-relaxed">
            <code>{rustCodeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Subtab Content 4: Polygon Verifier Contract View */}
      {activeSubTab === 'contract' && (
        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase">4. Polygon Smart Contract Verifier (Solidity)</h3>
                <p className="text-xs text-neutral-400 font-sans">Immutable settlement contract verifying zero-knowledge proofs on-chain, anchoring user sovereignty directly to the Polygon network.</p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(solidityCodeSnippet, 'solidity')}
              className="px-3 py-1.5 bg-[#141416] hover:bg-[#1A1A1C] border border-[#262626] text-neutral-300 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copiedCode === 'solidity' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'solidity' ? 'COPIED' : 'COPY CODE'}</span>
            </button>
          </div>

          <pre className="bg-[#0A0A0B] border border-[#262626] p-4 rounded-xl text-xs text-neutral-300 overflow-x-auto font-mono leading-relaxed">
            <code>{solidityCodeSnippet}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
