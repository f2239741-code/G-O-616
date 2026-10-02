import React, { useState } from 'react';
import { Shield, Terminal, Key, Database, RefreshCw, Radio, Flame, CheckCircle, AlertTriangle, Play, Cpu, Sparkles } from 'lucide-react';
import { useTerminalStore } from '../store/useTerminalStore';
import { useUserStore } from '../store/useUserStore';
import { Button } from './ui/button';
import { showToast } from './ui/toast';
import { sanctumAudio } from '../lib/audioEngine';

export const AdminConsoleView: React.FC = () => {
  const { logs, clearLogs, addLog, systemLoadPercent, quantumMeshLatencyMs } = useTerminalStore();
  const { session, setCoherenceScore, rewardIgnis } = useUserStore();
  const [customLogText, setCustomLogText] = useState('');

  const handleBroadcastSigil = () => {
    sanctumAudio.playClick();
    addLog('sigil', 'Zero-Knowledge Sovereign Seal broadcast across all 7 layers.', 'ADMIN_SIGIL');
    showToast('Sigil Broadcast Complete', 'All nodes synchronized to uncorrupted state', 'sigil');
  };

  const handleResetCoherence = () => {
    sanctumAudio.playClick();
    setCoherenceScore(99.4);
    addLog('quantum', 'Guardian coherence calibrated to optimal 99.4%.', 'BIO_RESONANCE');
    showToast('Coherence Calibrated', 'Heart-mind coherence locked at 99.4%', 'success');
  };

  const handleMintDevIgnis = () => {
    sanctumAudio.playClick();
    rewardIgnis(500, 'Admin Dev Minting');
    addLog('info', 'Minted 500 testnet IGNIS tokens to connected sovereign vault.', 'POLYGON_ENGINE');
    showToast('500 IGNIS Minted', 'Added to liquid wallet balance', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#0f0f16] border border-[#272738] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl font-bold font-mono text-white">LUCIFERA_OS ROOT ADMIN CONSOLE</h2>
            <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded">
              SUPER ADMIN LEVEL 7
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-sans">
            Direct cryptographic control plane for ZK-Mesh relays, Polygon smart contracts, and bio-digital calibration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="danger" size="sm" onClick={handleBroadcastSigil}>
            <Key className="w-3.5 h-3.5" />
            <span>Broadcast ZK-Sigil</span>
          </Button>
          <Button variant="amber" size="sm" onClick={handleMintDevIgnis}>
            <Flame className="w-3.5 h-3.5" />
            <span>Mint 500 IGNIS</span>
          </Button>
        </div>
      </div>

      {/* Admin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Real-time Terminal Log Viewer (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0b0b10] border border-[#20202e] rounded-2xl p-4 flex flex-col h-[480px] shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f1f2d] text-xs font-mono">
            <span className="text-neutral-300 flex items-center gap-2 font-bold">
              <Terminal className="w-4 h-4 text-cyan-400" />
              SOVEREIGN SYSTEM TELEMETRY STREAM
            </span>
            <button
              onClick={() => {
                sanctumAudio.playClick();
                clearLogs();
              }}
              className="text-[10px] text-neutral-500 hover:text-white transition"
            >
              Clear Logs
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 font-mono text-xs text-neutral-300">
            {logs.map((log) => (
              <div key={log.id} className="p-2 rounded bg-[#111118] border border-[#1d1d28] space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-neutral-500">
                  <span className="text-neutral-400">[{log.timestamp}] {log.source}</span>
                  <span className={`px-1.5 py-0.2 rounded uppercase font-bold text-[9px] ${
                    log.level === 'sigil' ? 'text-amber-400 bg-amber-500/10' :
                    log.level === 'quantum' ? 'text-cyan-400 bg-cyan-500/10' :
                    log.level === 'error' ? 'text-rose-400 bg-rose-500/10' : 'text-neutral-300'
                  }`}>
                    {log.level}
                  </span>
                </div>
                <div className="text-neutral-200">{log.message}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#1f1f2d] flex items-center gap-2">
            <input
              type="text"
              placeholder="Inscribe custom telemetry event..."
              value={customLogText}
              onChange={(e) => setCustomLogText(e.target.value)}
              className="flex-1 bg-[#14141d] border border-[#272738] rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (!customLogText.trim()) return;
                addLog('info', customLogText, 'OPERATOR');
                setCustomLogText('');
              }}
            >
              Log
            </Button>
          </div>
        </div>

        {/* Right: Quick Operational Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0e0e14] border border-[#222232] rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold text-amber-400 flex items-center gap-2 uppercase">
              <Cpu className="w-4 h-4" />
              SYSTEM DIAGNOSTICS & STATUS
            </h3>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-neutral-400 p-2 rounded bg-[#13131c]">
                <span>KERNEL LOAD</span>
                <span className="text-emerald-400 font-bold">{systemLoadPercent}%</span>
              </div>
              <div className="flex justify-between text-neutral-400 p-2 rounded bg-[#13131c]">
                <span>Q-MESH LATENCY</span>
                <span className="text-cyan-400 font-bold">{quantumMeshLatencyMs} ms</span>
              </div>
              <div className="flex justify-between text-neutral-400 p-2 rounded bg-[#13131c]">
                <span>CURRENT USER TIER</span>
                <span className="text-amber-300 font-bold">{session.tier.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-neutral-400 p-2 rounded bg-[#13131c]">
                <span>COHERENCE SCORE</span>
                <span className="text-indigo-300 font-bold">{session.coherenceScore}%</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                variant="amber"
                size="md"
                className="w-full justify-between"
                onClick={handleResetCoherence}
              >
                <span>Calibrate Bio-Resonance (99.4%)</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
