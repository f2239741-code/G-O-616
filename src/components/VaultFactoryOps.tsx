import React, { useState } from 'react';
import { Cpu, ShieldCheck, Zap, Database, Server, RefreshCw, Sparkles, CheckCircle2, Code, ArrowUpRight, Lock, Flame, Coins, Terminal } from 'lucide-react';
import { 
  VaultSpawnRequest, 
  DeployedAutonomousVault, 
  INITIAL_SPAWNED_VAULTS, 
  COMPUTE_SHARDS, 
  spawnIntelligenceVault 
} from '../lib/vaultFactory';
import { GuardianProfile } from '../types';

interface VaultFactoryOpsProps {
  profile: GuardianProfile;
  onOpenPricing?: () => void;
  onRewardIgnis?: (amount: number, source: string) => void;
}

export const VaultFactoryOps: React.FC<VaultFactoryOpsProps> = ({
  profile,
  onOpenPricing,
  onRewardIgnis
}) => {
  const [vaultName, setVaultName] = useState<string>('Aetheria Sovereign Treasury DAO');
  const [governanceType, setGovernanceType] = useState<'EMBER_UR_WEIGHTED' | 'ZK_SOLOMONIC_COUNCIL' | 'SOVEREIGN_SINGLE_AGENT'>('EMBER_UR_WEIGHTED');
  const [initialLiquidity, setInitialLiquidity] = useState<number>(100000);

  const [vaults, setVaults] = useState<DeployedAutonomousVault[]>(INITIAL_SPAWNED_VAULTS);
  const [selectedVault, setSelectedVault] = useState<DeployedAutonomousVault>(INITIAL_SPAWNED_VAULTS[0]);
  const [isSpawning, setIsSpawning] = useState<boolean>(false);
  const [execLogs, setExecLogs] = useState<string[]>([
    '0x71C...98A2: Executed Ember UR Autonomous decision payload [Verified Wasm witness]',
    '0x34B...41F0: Executed ZK Solomonic council rebalance [0x_ZK_PROOF_ACCEPTED]'
  ]);
  const [showCode, setShowCode] = useState<boolean>(false);

  const handleSpawnVault = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSpawning(true);

    setTimeout(() => {
      const request: VaultSpawnRequest = {
        creatorEmail: profile.email || 'guardian@oracle',
        vaultName,
        governanceType,
        initialLiquidityIgnis: initialLiquidity
      };

      const newVault = spawnIntelligenceVault(request);
      setVaults(prev => [newVault, ...prev]);
      setSelectedVault(newVault);
      setIsSpawning(false);

      if (onRewardIgnis) {
        onRewardIgnis(1500, `Autonomous Web3 Intelligence Vault Spawned (${newVault.vaultAddress})`);
      }
    }, 700);
  };

  const handleExecuteDecision = (vault: DeployedAutonomousVault) => {
    setVaults(prev => prev.map(v => {
      if (v.vaultAddress === vault.vaultAddress) {
        return { ...v, execCount: v.execCount + 1, ignisTreasury: v.ignisTreasury + 2500 };
      }
      return v;
    }));

    setExecLogs(prev => [
      `${vault.vaultAddress}: Executed autonomous decision via ${vault.wasmShardId} [Receipt 0x_EXEC_${Date.now().toString().slice(-6)}]`,
      ...prev
    ]);

    if (onRewardIgnis) {
      onRewardIgnis(250, `Autonomous Decision Executed on ${vault.vaultName}`);
    }
  };

  const SOLIDITY_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract IntelligenceVaultFactory {
    event VaultSpawned(address indexed vaultAddress, bytes32 indexed creatorHash, uint256 timestamp);

    mapping(address => bool) public activeVaults;

    function spawnIntelligenceVault(bytes32 creatorHash) external returns (address) {
        address newVault = address(new AutonomousVault(msg.sender, creatorHash));
        activeVaults[newVault] = true;
        
        emit VaultSpawned(newVault, creatorHash, block.timestamp);
        return newVault;
    }
}

contract AutonomousVault {
    address public immutable owner;
    bytes32 public immutable creatorHash;
    bool public operational = true;

    constructor(address _owner, bytes32 _creatorHash) {
        owner = _owner;
        creatorHash = _creatorHash;
    }

    function executeAutonomousDecision(bytes calldata decisionPayload) external view returns (bool) {
        require(operational, "Vault: Offline");
        return decisionPayload.length > 0;
    }
}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold rounded uppercase tracking-wider">
                  AI-DIRECTED DAOS & WEB3 VAULTS
                </span>
                <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
                  AUTONOMOUS VAULT FACTORY <span className="text-cyan-400 text-lg font-light italic">(WASM SHARDED)</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-3.5 py-2 bg-[#141416] hover:bg-[#1C1C20] border border-cyan-500/40 rounded-xl text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Code className="w-4 h-4" />
                <span>{showCode ? 'HIDE SOLIDITY SPEC' : 'VIEW SOLIDITY SPEC'}</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-4xl font-sans leading-relaxed">
            Instant zero-knowledge instantiation of AI-directed Web3 DAOs and intelligence vaults. Powered by Solidity factory contracts on Polygon, sandboxed Rust Wasm edge shards, and automated IGNIS X token contributor incentives.
          </p>

          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-xs font-mono text-cyan-300 flex items-center justify-between font-bold">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 rounded border border-cyan-500/40">ZERO-LATENCY WASM RUNTIME</span>
          </div>
        </div>
      </div>

      {/* Code Inspector Collapsible */}
      {showCode && (
        <div className="bg-[#0A0A0C] border border-cyan-500/40 rounded-2xl p-5 shadow-2xl space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs border-b border-[#1F1F24] pb-3">
            <span className="text-cyan-400 font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              IntelligenceVaultFactory.sol — Deployed Polygon Factory Contract
            </span>
            <span className="text-neutral-500 text-[10px]">Solidity ^0.8.24</span>
          </div>
          <pre className="text-xs text-emerald-400 bg-[#050507] p-4 rounded-xl overflow-x-auto font-mono leading-relaxed border border-[#1A1A1E]">
            {SOLIDITY_CODE}
          </pre>
        </div>
      )}

      {/* 3 Strategic Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        <div className="bg-[#0F0F11] border border-[#262626] hover:border-cyan-500/40 rounded-2xl p-5 shadow-xl space-y-3 transition">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded font-bold">
              PILLAR 1
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> AUTOMATED
            </span>
          </div>
          <h3 className="text-base font-mono font-bold text-white">Autonomous Vault Spawning</h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Solidity factory contracts instantiate modular treasuries governed directly by Ember UR agent weights upon client-side ZK proof verification.
          </p>
          <div className="pt-2 text-xs font-mono text-cyan-300">
            Zero-Latency Polygon Deployment
          </div>
        </div>

        <div className="bg-[#0F0F11] border border-[#262626] hover:border-indigo-500/40 rounded-2xl p-5 shadow-xl space-y-3 transition">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded font-bold">
              PILLAR 2
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 40%+ SAVINGS
            </span>
          </div>
          <h3 className="text-base font-mono font-bold text-white">Sovereign Edge Compute Shards</h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Distributes DAO decision logic across sandboxed Rust Wasm binaries executing locally without relying on centralized cloud providers.
          </p>
          <div className="pt-2 text-xs font-mono text-indigo-300">
            1.2ms Sub-Millisecond Latency
          </div>
        </div>

        <div className="bg-[#0F0F11] border border-[#262626] hover:border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-3 transition">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded font-bold">
              PILLAR 3
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> REWARD ENGINE
            </span>
          </div>
          <h3 className="text-base font-mono font-bold text-white">IGNIS X Token Contributor Engine</h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Binds contributor payouts directly to verified regenerative and synthetic intelligence outputs, rewarding developers deploying open-source modules.
          </p>
          <div className="pt-2 text-xs font-mono text-amber-300">
            +1,500 IGNIS X per Vault Spawn
          </div>
        </div>
      </div>

      {/* Interactive Factory Spawner & Active Vault List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spawn Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-cyan-400" />
              <div>
                <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                  SPAWN NEW AUTONOMOUS INTELLIGENCE VAULT
                </h2>
                <p className="text-xs text-neutral-400 font-sans">
                  Execute factory contract instantiation with Circom ZK proof witness
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded font-bold">
              FACTORY READY
            </span>
          </div>

          <form onSubmit={handleSpawnVault} className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-neutral-400 block mb-1">VAULT / DAO NAME</label>
              <input
                type="text"
                value={vaultName}
                onChange={(e) => setVaultName(e.target.value)}
                className="w-full bg-[#141416] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                placeholder="e.g. Aetheria Sovereign Intelligence Vault"
                required
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">GOVERNANCE ENGINE TYPE</label>
              <select
                value={governanceType}
                onChange={(e) => setGovernanceType(e.target.value as any)}
                className="w-full bg-[#141416] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="EMBER_AI_WEIGHTED">EMBER UR AGENT WEIGHTED (Autonomous Decision Tree)</option>
                <option value="ZK_SOLOMONIC_COUNCIL">ZK SOLOMONIC COUNCIL (Zero-Knowledge Multi-Sig)</option>
                <option value="SOVEREIGN_SINGLE_AGENT">SOVEREIGN SINGLE AGENT (Full Autonomous Execution)</option>
              </select>
            </div>

            <div className="space-y-1 bg-[#141416] p-3.5 border border-[#262626] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">INITIAL TREASURY ALLOCATION (IGNIS X)</span>
                <span className="text-amber-300 font-bold">{initialLiquidity.toLocaleString()} IGNIS X</span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="10000"
                value={initialLiquidity}
                onChange={(e) => setInitialLiquidity(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>10,000 IGNIS X</span>
                <span>250,000 IGNIS X</span>
                <span>500,000 IGNIS X Max</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSpawning}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-600 via-indigo-600 to-amber-600 hover:from-cyan-500 hover:to-amber-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSpawning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>GENERATING CIRCOM ZK PROOF & INSTANTIATING VAULT...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>SPAWN INTELLIGENCE VAULT (+1,500 IGNIS X REWARD)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Active Vaults & Decision Executor (5 cols) */}
        <div className="lg:col-span-5 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                  ACTIVE DEPLOYED VAULTS
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">{vaults.length} VAULTS LIVE</span>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto">
              {vaults.map(v => (
                <div
                  key={v.vaultAddress}
                  onClick={() => setSelectedVault(v)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer font-mono text-xs ${
                    selectedVault.vaultAddress === v.vaultAddress
                      ? 'bg-cyan-500/10 border-cyan-500 text-white'
                      : 'bg-[#141416] border-[#222226] text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyan-300 font-bold">{v.vaultAddress}</span>
                    <span className="text-[10px] text-emerald-400 font-bold">OPERATIONAL</span>
                  </div>

                  <div className="font-bold text-sm text-white mb-1.5">{v.vaultName}</div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 bg-[#0A0A0B] p-2 rounded border border-[#1A1A1E]">
                    <span>Treasury: <strong className="text-amber-300">{v.ignisTreasury.toLocaleString()} IGNIS X</strong></span>
                    <span>Executions: <strong className="text-cyan-400">{v.execCount}</strong></span>
                  </div>

                  {selectedVault.vaultAddress === v.vaultAddress && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExecuteDecision(v);
                      }}
                      className="mt-2.5 w-full py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-white" />
                      <span>EXECUTE AUTONOMOUS DECISION (+250 IGNIS X)</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1F1F24]">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">EXECUTION AUDIT LOGS</div>
            <div className="space-y-1 max-h-24 overflow-y-auto font-mono text-[10px] text-neutral-400">
              {execLogs.map((log, i) => (
                <div key={i} className="bg-[#141416] p-1.5 rounded border border-[#222226] truncate">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sovereign Edge Compute Shards Table */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Server className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-mono font-bold text-white uppercase tracking-tight">
                SOVEREIGN EDGE COMPUTE SHARDS (WASM)
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-sans">
              Local sandboxed WebAssembly execution nodes eliminating corporate API bottlenecks.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded font-bold">
            RUST / WASM RUNTIME
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COMPUTE_SHARDS.map(shard => (
            <div key={shard.shardId} className="p-4 bg-[#141416] border border-[#262626] hover:border-indigo-500/40 rounded-xl space-y-3 transition">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-indigo-300 font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                  {shard.shardId}
                </span>
                <span className="text-emerald-400 font-bold">{shard.status}</span>
              </div>

              <div>
                <h4 className="text-sm font-mono font-bold text-white leading-tight">{shard.location}</h4>
                <p className="text-xs font-sans text-neutral-400 pt-0.5">Sandboxed Rust Wasm Micro-Datacenter</p>
              </div>

              <div className="text-xs font-mono space-y-1 bg-[#0A0A0B] p-2.5 rounded-lg border border-[#222226]">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Execution Latency:</span>
                  <span className="text-emerald-400 font-bold">{shard.wasmLatencyMs} ms</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Overhead Reduction:</span>
                  <span className="text-amber-300 font-bold">{shard.overheadSavingsPercent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
