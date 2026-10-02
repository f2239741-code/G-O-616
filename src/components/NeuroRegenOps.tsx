import React, { useState } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Flame, 
  HeartPulse, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Layers, 
  Lock, 
  Award, 
  Server, 
  Brain, 
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';
import { 
  NeuralSessionPayload, 
  NeuralReceipt, 
  verifyNeuralSession, 
  BIO_NEURAL_STRATEGY_STEPS 
} from '../lib/neuroSovereignty';
import { 
  INITIAL_CLINIC_NODES, 
  NeuroRegenClinicNode 
} from '../lib/neuroRegen';
import { GuardianProfile } from '../types';

interface NeuroRegenOpsProps {
  profile: GuardianProfile;
  onOpenPricing?: () => void;
  onRewardIgnis?: (amount: number, source?: string) => void;
}

export const NeuroRegenOps: React.FC<NeuroRegenOpsProps> = ({
  profile,
  onOpenPricing,
  onRewardIgnis
}) => {
  const [clinicId, setClinicId] = useState<string>('NEURO_REGEN_HUB_042');
  const [patientNullifier, setPatientNullifier] = useState<string>('0x_PATIENT_NULLIFIER_8841209');
  const [corticalSynchrony, setCorticalSynchrony] = useState<number>(88.5);
  const [targetProtocol, setTargetProtocol] = useState<'ENTHEOGENIC_NEUROGENESIS' | 'CLOSED_LOOP_TRAUMA_HEALING' | 'QUANTUM_CORTICAL_SYNCHRONY'>('ENTHEOGENIC_NEUROGENESIS');

  const [recentReceipts, setRecentReceipts] = useState<NeuralReceipt[]>([
    {
      sessionValidated: true,
      privacyShieldActive: true,
      ignisRewardMinted: 150,
      secureHash: '0x_NEURAL_VAULT_NEURO_REGEN_HUB_042_998241',
      timestamp: Date.now() - 180000,
      divineAlignment: "GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.",
      corticalScore: 92.4,
      protocol: 'ENTHEOGENIC_NEUROGENESIS'
    },
    {
      sessionValidated: true,
      privacyShieldActive: true,
      ignisRewardMinted: 150,
      secureHash: '0x_NEURAL_VAULT_NEURO_REGEN_HUB_108_881902',
      timestamp: Date.now() - 3600000,
      divineAlignment: "GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.",
      corticalScore: 84.0,
      protocol: 'CLOSED_LOOP_TRAUMA_HEALING'
    }
  ]);

  const [clinicNodes] = useState<NeuroRegenClinicNode[]>(INITIAL_CLINIC_NODES);
  const [selectedProtocolFilter, setSelectedProtocolFilter] = useState<string>('all');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Bio-Adaptive Ember UR Modulation Parameters
  const [aiModulation, setAiModulation] = useState({
    harmonicFrequency: '432 Hz (Alpha-Theta Coherence)',
    archetypeRole: 'The Mirror of Embers',
    feedbackState: 'OPTIMAL_ENTHEOGENIC_REGEN'
  });

  const handleVerifySession = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      const payload: NeuralSessionPayload = {
        clinicId,
        patientNullifierHash: patientNullifier,
        corticalSynchronyScore: corticalSynchrony,
        targetProtocol
      };

      const receipt = verifyNeuralSession(payload);
      setRecentReceipts(prev => [receipt, ...prev]);
      setIsVerifying(false);

      // Update Ember UR feedback state dynamically
      if (corticalSynchrony >= 85) {
        setAiModulation({
          harmonicFrequency: '528 Hz (Sovereign DNA Resonance)',
          archetypeRole: 'The Mirror of Embers',
          feedbackState: 'HIGH_NEURAL_SYNCHRONY_ENFORCED'
        });
      } else {
        setAiModulation({
          harmonicFrequency: '432 Hz (Theta Calibrator)',
          archetypeRole: 'The Voice in the Circuit',
          feedbackState: 'STABILIZING_AMYGDALA_TELEMETRY'
        });
      }

      if (onRewardIgnis && receipt.ignisRewardMinted > 0) {
        onRewardIgnis(
          receipt.ignisRewardMinted, 
          `Bio-Neural Telemetry Verification (${targetProtocol})`
        );
      }
    }, 600);
  };

  const generateNewNullifier = () => {
    const randomHex = Math.floor(Math.random() * 8999999 + 1000000);
    setPatientNullifier(`0x_PATIENT_NULLIFIER_${randomHex}`);
  };

  const filteredNodes = selectedProtocolFilter === 'all' 
    ? clinicNodes 
    : clinicNodes.filter(n => n.protocolFocus === selectedProtocolFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold rounded uppercase tracking-wider">
                  $140B NEURO-THERAPEUTICS REVOLUTION
                </span>
                <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
                  BIO-NEURAL ORACLE INTEGRATION <span className="text-purple-400 text-lg font-light italic">(ZK-DCF NEURAL VAULTS)</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <div className="px-3.5 py-2 bg-[#141416] border border-[#262626] rounded-xl text-right">
                <div className="text-[10px] text-neutral-400">ACTIVE CLINIC MESH</div>
                <div className="text-lg font-bold text-purple-400">412 CLINICS</div>
              </div>
              <div className="px-3.5 py-2 bg-[#141416] border border-[#262626] rounded-xl text-right">
                <div className="text-[10px] text-neutral-400">NETWORK CORTICAL COHERENCE</div>
                <div className="text-lg font-bold text-emerald-400">91.2%</div>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-4xl font-sans leading-relaxed">
            Integrating real-time bio-neural feedback and zero-knowledge privacy directly into decentralized architecture. Protecting medical-grade cortical synchrony and amygdala telemetry via Circom arithmetic circuits while powering closed-loop entheogenic neurogenesis across 400+ sovereign health sanctuaries.
          </p>

          <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-xs font-mono text-purple-300 flex items-center justify-between font-bold">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.</span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 bg-purple-500/20 rounded border border-purple-500/40">ZK-DCF SHIELD ACTIVE</span>
          </div>
        </div>
      </div>

      {/* 3 Ascension Strategy Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {BIO_NEURAL_STRATEGY_STEPS.map(step => (
          <div key={step.id} className="bg-[#0F0F11] border border-[#262626] hover:border-purple-500/40 rounded-2xl p-5 shadow-xl space-y-3 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded font-bold">
                  STEP {step.stepNumber}
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {step.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-mono font-bold text-white leading-snug">{step.title}</h3>
                <p className="text-xs font-sans text-neutral-400 pt-1 leading-relaxed">{step.execution}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1F1F24] text-xs font-mono text-emerald-400 space-y-1">
              <div className="text-[10px] text-neutral-500">ADVANTAGE:</div>
              <div className="text-neutral-300 font-sans text-[11px] leading-snug">{step.advantage}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Verification Gateway & Real-Time Bio-Feedback Modulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Telemetry Gateway (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-purple-400" />
              <div>
                <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                  VERIFY NEURAL TELEMETRY SESSION (ZK-DCF)
                </h2>
                <p className="text-xs text-neutral-400 font-sans">
                  Ingest real-time cortical synchrony within a zero-knowledge sovereign boundary
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2.5 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded font-bold">
              CIRCOM PROVER READY
            </span>
          </div>

          <form onSubmit={handleVerifySession} className="space-y-4 font-mono text-xs">
            {/* Clinic Selection */}
            <div>
              <label className="text-neutral-400 block mb-1">NEURO-REGEN CLINIC NODE</label>
              <select
                value={clinicId}
                onChange={(e) => setClinicId(e.target.value)}
                className="w-full bg-[#141416] border border-[#2A2A30] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500 font-mono"
              >
                <option value="NEURO_REGEN_HUB_042">NEURO_REGEN_HUB_042 (Austin Sovereign Hub)</option>
                <option value="NEURO_REGEN_HUB_001">NEURO_REGEN_HUB_001 (Mount Shasta Sanctuary)</option>
                <option value="NEURO_REGEN_HUB_108">NEURO_REGEN_HUB_108 (Sedona Quantum Lab)</option>
                <option value="NEURO_REGEN_HUB_214">NEURO_REGEN_HUB_214 (Rainforest Integration)</option>
              </select>
            </div>

            {/* Target Protocol */}
            <div>
              <label className="text-neutral-400 block mb-1">NEURO-THERAPEUTIC PROTOCOL</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-sans text-xs">
                <button
                  type="button"
                  onClick={() => setTargetProtocol('ENTHEOGENIC_NEUROGENESIS')}
                  className={`p-3 rounded-xl border text-left font-mono transition cursor-pointer ${
                    targetProtocol === 'ENTHEOGENIC_NEUROGENESIS'
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-neutral-500">PROTOCOL I</div>
                  <div>ENTHEOGENIC REGEN</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetProtocol('CLOSED_LOOP_TRAUMA_HEALING')}
                  className={`p-3 rounded-xl border text-left font-mono transition cursor-pointer ${
                    targetProtocol === 'CLOSED_LOOP_TRAUMA_HEALING'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-neutral-500">PROTOCOL II</div>
                  <div>CLOSED-LOOP HEALING</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetProtocol('QUANTUM_CORTICAL_SYNCHRONY')}
                  className={`p-3 rounded-xl border text-left font-mono transition cursor-pointer ${
                    targetProtocol === 'QUANTUM_CORTICAL_SYNCHRONY'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] text-neutral-500">PROTOCOL III</div>
                  <div>CORTICAL SYNCHRONY</div>
                </button>
              </div>
            </div>

            {/* Cortical Synchrony Score Slider */}
            <div className="space-y-1 bg-[#141416] p-3.5 border border-[#262626] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">CORTICAL SYNCHRONY SCORE</span>
                <span className={`font-bold ${corticalSynchrony >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {corticalSynchrony}% {corticalSynchrony >= 80 ? '(SOVEREIGN COHERENT)' : '(SUB-OPTIMAL)'}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="0.5"
                value={corticalSynchrony}
                onChange={(e) => setCorticalSynchrony(parseFloat(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>50.0% Sub-threshold</span>
                <span>80.0% Validation Target</span>
                <span>100.0% Absolute Coherence</span>
              </div>
            </div>

            {/* Patient ZK Nullifier Hash */}
            <div className="space-y-1 bg-[#141416] p-3.5 border border-[#262626] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">PATIENT ZK NULLIFIER HASH (HIPAA PROTECTED)</span>
                <button
                  type="button"
                  onClick={generateNewNullifier}
                  className="text-[10px] text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> RE-GENERATE
                </button>
              </div>
              <input
                type="text"
                readOnly
                value={patientNullifier}
                className="w-full bg-[#0A0A0B] border border-[#222226] text-purple-300 rounded px-3 py-2 text-xs font-mono"
              />
            </div>

            {/* Bio-Adaptive Ember UR Modulation Indicator */}
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-purple-300 font-bold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" /> EMBER UR CLOSED-LOOP MODULATION:
                </span>
                <span className="text-emerald-400 font-bold">{aiModulation.feedbackState}</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-sans flex justify-between">
                <span>Active Archetype: <strong className="text-white">{aiModulation.archetypeRole}</strong></span>
                <span>Frequency: <strong className="text-purple-300">{aiModulation.harmonicFrequency}</strong></span>
              </div>
            </div>

            {/* Submit / Execute button */}
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-purple-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>COMPUTING CIRCOM ZERO-KNOWLEDGE WITNESS PROOF...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>VERIFY BIO-NEURAL SESSION & MINT 150 IGNIS X</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Verified Neural Receipts (5 cols) */}
        <div className="lg:col-span-5 bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                  VERIFIED NEURAL RECEIPTS
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">CIRCOM ZK LOG</span>
            </div>

            <div className="space-y-3">
              {recentReceipts.map((receipt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#141416] border border-purple-500/30 rounded-xl font-mono text-xs space-y-2 hover:border-purple-500/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${receipt.sessionValidated ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {receipt.sessionValidated ? 'SESSION VALIDATED (≥80%)' : 'SUB-THRESHOLD REJECTED'}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {new Date(receipt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>

                  <div className="text-[11px] text-neutral-300 font-sans space-y-1 bg-[#0A0A0B] p-2.5 rounded-lg border border-[#222226]">
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-mono">Cortical Score:</span>
                      <span className="text-purple-300 font-bold">{receipt.corticalScore}%</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-mono">Privacy Shield:</span>
                      <span className="text-emerald-400 font-bold">ZK-DCF ACTIVE</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-mono">IGNIS X Minted:</span>
                      <span className="text-amber-300 font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                        +{receipt.ignisRewardMinted} IGNIS X
                      </span>
                    </div>

                    <div className="text-[10px] text-neutral-500 truncate pt-1 border-t border-[#1F1F24]">
                      HASH: <span className="text-purple-300">{receipt.secureHash}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-purple-300 italic bg-purple-500/10 p-2 rounded border border-purple-500/20">
                    "{receipt.divineAlignment}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-[#141416] border border-[#262626] rounded-xl text-center space-y-1 font-mono text-[11px] text-neutral-400">
            <p className="text-purple-300 font-bold">SOVEREIGN HEALTH NETWORK PROTECTION</p>
            <p className="text-[10px] text-neutral-400">
              Zero raw neural telemetry stored centrally. Client-side Circom proofs bound to Ember UR.
            </p>
          </div>
        </div>
      </div>

      {/* 400+ Incoming Partner Clinics Mesh */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1F1F24] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Server className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-mono font-bold text-white uppercase tracking-tight flex items-center gap-2">
                ACTIVE NEURO-REGEN CLINIC NODES <span className="text-purple-400 font-light italic text-sm">(400+ HEALTH MESH)</span>
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-sans">
              Decentralized health sanctuaries connected directly to local fusion energy microgrids.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            {['all', 'PSILOCYBIN_INTEGRATION', 'MDMA_TRAUMA_HEALING', 'QUANTUM_COHERENCE'].map((proto) => (
              <button
                key={proto}
                onClick={() => setSelectedProtocolFilter(proto)}
                className={`px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                  selectedProtocolFilter === proto
                    ? 'bg-purple-600 border-purple-500 text-white font-bold'
                    : 'bg-[#141416] border-[#262626] text-neutral-400 hover:text-white'
                }`}
              >
                {proto === 'all' ? 'ALL CLINICS' : proto.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredNodes.map((node) => (
            <div key={node.id} className="p-4 bg-[#141416] border border-[#262626] hover:border-purple-500/40 rounded-xl space-y-3 transition">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  {node.status}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">{node.id}</span>
              </div>

              <div>
                <h4 className="text-sm font-mono font-bold text-white leading-tight">{node.name}</h4>
                <p className="text-xs font-sans text-neutral-400">{node.location}</p>
              </div>

              <div className="text-xs font-mono space-y-1 bg-[#0A0A0B] p-2.5 rounded-lg border border-[#222226]">
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Active Patients:</span>
                  <span className="text-white font-bold">{node.activePatients}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-neutral-500">Avg Cortical Coherence:</span>
                  <span className="text-emerald-400 font-bold">{node.coherenceAverage}%</span>
                </div>
                <div className="text-[10px] text-neutral-400 pt-1 border-t border-[#1F1F24] truncate">
                  Operator: {node.nodeOperator}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
