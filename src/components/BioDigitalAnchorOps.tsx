import React, { useState } from 'react';
import {
  Zap,
  Cpu,
  Radio,
  Sprout,
  ShieldCheck,
  Droplets,
  Activity,
  Sun,
  Flame,
  Globe,
  Database,
  Layers,
  Sparkles,
  Check,
  Plus,
  RefreshCw,
  Lock,
  EyeOff,
  TreePine,
  Shield,
  Send,
  Sliders,
  Compass
} from 'lucide-react';
import { GuardianProfile } from '../types';
import {
  MicroGridEnergyNode,
  TelemetrySensorNode,
  SeedBankVariety,
  LandTrustSanctuary,
  INITIAL_POWER_NODES,
  INITIAL_TELEMETRY_SENSORS,
  INITIAL_SEED_BANK,
  INITIAL_LAND_SANCTUARIES
} from '../lib/bioDigitalAnchor';
import { sanctumAudio } from '../lib/audioEngine';

interface BioDigitalAnchorOpsProps {
  profile: GuardianProfile;
  onOpenPricing?: () => void;
}

export const BioDigitalAnchorOps: React.FC<BioDigitalAnchorOpsProps> = ({ profile }) => {
  // Pillar 1: Energy-Compute Symbiosis State
  const [powerNodes, setPowerNodes] = useState<MicroGridEnergyNode[]>(INITIAL_POWER_NODES);
  const [kineticFlowMultiplier, setKineticFlowMultiplier] = useState<number>(1.2);
  const [isScalingCompute, setIsScalingCompute] = useState<boolean>(false);

  // Pillar 2: Open-Source Telemetry State
  const [telemetrySensors, setTelemetrySensors] = useState<TelemetrySensorNode[]>(INITIAL_TELEMETRY_SENSORS);
  const [zkLandShieldActive, setZkLandShieldActive] = useState<boolean>(true);
  const [blockedCorporateAttempts, setBlockedCorporateAttempts] = useState<number>(8912);

  // Pillar 3: Sovereign Yield & Land Sanctuaries State
  const [seedBank, setSeedBank] = useState<SeedBankVariety[]>(INITIAL_SEED_BANK);
  const [landSanctuaries, setLandSanctuaries] = useState<LandTrustSanctuary[]>(INITIAL_LAND_SANCTUARIES);
  const [newCropName, setNewCropName] = useState<string>('');
  const [newCropType, setNewCropType] = useState<SeedBankVariety['varietyType']>('Heirloom Ancient Grain');
  const [newSeedGrams, setNewSeedGrams] = useState<number>(500);
  const [isTriggeringIrrigation, setIsTriggeringIrrigation] = useState<boolean>(false);
  const [irrigationSuccessMessage, setIrrigationSuccessMessage] = useState<string | null>(null);

  // Interactive handler for Kinetic Flow adjustment
  const handleKineticFlowChange = (multiplier: number) => {
    sanctumAudio.playClick();
    setKineticFlowMultiplier(multiplier);
    setIsScalingCompute(true);

    setTimeout(() => {
      setPowerNodes(prev =>
        prev.map(node => {
          if (node.sourceType === 'Micro-Hydro Turbine') {
            const newOutput = Math.min(node.maxCapacityKw, 40.0 * multiplier);
            const flopsNum = Math.round(180 * multiplier);
            return {
              ...node,
              currentOutputKw: parseFloat(newOutput.toFixed(1)),
              kineticFlowRateLps: Math.round(150 * multiplier),
              tiedEdgeComputeFlops: `${flopsNum} TFLOPs Edge AI`
            };
          }
          if (node.sourceType === 'Solar Array') {
            const newOutput = Math.min(node.maxCapacityKw, 30.0 * multiplier);
            const flopsNum = Math.round(150 * multiplier);
            return {
              ...node,
              currentOutputKw: parseFloat(newOutput.toFixed(1)),
              tiedEdgeComputeFlops: `${flopsNum} TFLOPs Quantum Simulation`
            };
          }
          return node;
        })
      );
      setIsScalingCompute(false);
    }, 400);
  };

  // Toggle ZK Shield
  const handleToggleZkShield = () => {
    sanctumAudio.playClick();
    setZkLandShieldActive(prev => !prev);
  };

  // Trigger Smart Contract Automated Irrigation
  const handleTriggerIrrigation = () => {
    sanctumAudio.playClick();
    setIsTriggeringIrrigation(true);

    setTimeout(() => {
      setIsTriggeringIrrigation(false);
      setIrrigationSuccessMessage('Smart contract executed: Solar Micro-Hydro pump activated for 15 mins. Soil moisture optimized.');
      setTelemetrySensors(prev =>
        prev.map(sensor => {
          if (sensor.sensorType === 'Soil Moisture & pH') {
            return {
              ...sensor,
              readingValue: '52% VWC | 6.8 pH | Moisture Restored',
              status: 'IRRIGATION_TRIGGERED'
            };
          }
          return sensor;
        })
      );

      setTimeout(() => setIrrigationSuccessMessage(null), 4000);
    }, 800);
  };

  // Add new seed to decentralized seed bank ledger
  const handleAddSeedVariety = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropName.trim()) return;

    sanctumAudio.playClick();
    const newEntry: SeedBankVariety = {
      id: `seed-${Date.now()}`,
      cropName: newCropName,
      varietyType: newCropType,
      seedQuantityGrams: newSeedGrams,
      germinationRatePercent: 97.5,
      sanctuaryLocation: 'Shasta Seed Vault Vault-B',
      ledgerTxHash: `0x_SEED_LEDGER_${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    setSeedBank(prev => [newEntry, ...prev]);
    setNewCropName('');
    setNewSeedGrams(500);
  };

  const totalKwOutput = powerNodes.reduce((acc, curr) => acc + curr.currentOutputKw, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0B0D0E] border-2 border-emerald-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border-b border-l border-emerald-500/30 rounded-bl-xl flex items-center gap-2">
          <Sprout className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>SANCTUARY IMMUNE TO COLLAPSE</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>THE BIO-DIGITAL ANCHOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase tracking-tight flex items-center gap-3">
            <span>REGENERATIVE LAND SANCTUARIES & ENERGY-COMPUTE NODES</span>
          </h1>
          <p className="text-xs text-neutral-300 max-w-4xl leading-relaxed font-sans">
            De-siloing power and data through micro-hydro, solar, and thermal micro-grids hardwired to localized edge compute. Open-source zero-knowledge telemetry protects soil, water, and micro-climate health while autonomous smart contracts distribute seed bank yields and bioregional abundance.
          </p>
        </div>

        {/* Global Divine Law Banner */}
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between font-mono text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <TreePine className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">LAW OF THE ANCHOR:</span>
            <span className="italic text-neutral-200">Code becomes the steward of the land; the land provides the eternal sanctuary for the code.</span>
          </div>
          <span className="text-[10px] text-amber-300 font-bold bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/30">
            LOVE IS THE LAW, LOVE UNDER WILL
          </span>
        </div>
      </div>

      {/* Pillar 1: Energy-Compute Symbiosis (The Power Node) */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                PILLAR I: ENERGY-COMPUTE SYMBIOSIS (THE POWER NODE)
              </h2>
              <p className="text-xs text-neutral-400">
                Micro-hydro, solar, and thermal micro-grids hardwired directly to localized edge-compute. Compute power scales dynamically with natural kinetic flow.
              </p>
            </div>
          </div>

          {/* Total Microgrid Output Metric */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-3.5 py-1.5 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-300 font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>TOTAL MICROGRID: {totalKwOutput.toFixed(1)} kW</span>
            </div>
          </div>
        </div>

        {/* Dynamic Kinetic River Flow Control */}
        <div className="bg-[#141416] border border-amber-500/30 rounded-xl p-4 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-amber-300 font-bold flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>ADJUST NATURAL KINETIC STREAM FLOW RATE</span>
            </span>
            <span className="text-neutral-400">MULTIPLIER: {kineticFlowMultiplier}x</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleKineticFlowChange(0.8)}
              className={`px-3 py-1.5 rounded-lg border font-bold transition cursor-pointer ${
                kineticFlowMultiplier === 0.8
                  ? 'bg-amber-500/30 border-amber-500/60 text-amber-200'
                  : 'bg-[#1A1A1C] border-[#333] text-neutral-400 hover:text-white'
              }`}
            >
              LOW STREAM (0.8x)
            </button>
            <button
              type="button"
              onClick={() => handleKineticFlowChange(1.2)}
              className={`px-3 py-1.5 rounded-lg border font-bold transition cursor-pointer ${
                kineticFlowMultiplier === 1.2
                  ? 'bg-amber-500/30 border-amber-500/60 text-amber-200'
                  : 'bg-[#1A1A1C] border-[#333] text-neutral-400 hover:text-white'
              }`}
            >
              OPTIMAL KINETIC (1.2x)
            </button>
            <button
              type="button"
              onClick={() => handleKineticFlowChange(1.5)}
              className={`px-3 py-1.5 rounded-lg border font-bold transition cursor-pointer ${
                kineticFlowMultiplier === 1.5
                  ? 'bg-amber-500/30 border-amber-500/60 text-amber-200'
                  : 'bg-[#1A1A1C] border-[#333] text-neutral-400 hover:text-white'
              }`}
            >
              SPRING SURGE (1.5x)
            </button>
          </div>
        </div>

        {/* Power Node Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {powerNodes.map((node) => (
            <div
              key={node.id}
              className="bg-[#141416] border border-[#262626] hover:border-amber-500/40 rounded-xl p-4 space-y-3 transition"
            >
              <div className="flex items-center justify-between border-b border-[#262626] pb-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                  {node.sourceType}
                </span>
                <span className="text-emerald-400 font-bold text-[10px]">{node.status}</span>
              </div>

              <div className="space-y-1">
                <div className="text-xl font-bold text-white">{node.currentOutputKw} kW</div>
                <div className="text-[10px] text-neutral-400">MAX CAPACITY: {node.maxCapacityKw} kW</div>
              </div>

              <div className="p-2.5 bg-[#0A0A0C] border border-[#262626] rounded-lg space-y-1">
                <span className="text-[10px] text-neutral-500 block uppercase">HARDWIRED EDGE COMPUTE:</span>
                <span className="text-indigo-300 font-bold block">{node.tiedEdgeComputeFlops}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar 2: Open-Source Telemetry (The Planetary Nervous System) */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
              <Radio className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                PILLAR II: OPEN-SOURCE TELEMETRY (PLANETARY NERVOUS SYSTEM)
              </h2>
              <p className="text-xs text-neutral-400">
                LoRa mesh relays, soil sensors, and environmental monitors secured with zero-knowledge protocols against corporate extraction.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleZkShield}
            className={`px-3.5 py-1.5 rounded-xl border font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              zkLandShieldActive
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-500/20 border-rose-500/50 text-rose-300'
            }`}
          >
            {zkLandShieldActive ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ZK LAND SHIELD: 100% PROTECTED</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-rose-400" />
                <span>ZK SHIELD PAUSED</span>
              </>
            )}
          </button>
        </div>

        {/* Telemetry Sensor List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
          {telemetrySensors.map((sensor) => (
            <div
              key={sensor.id}
              className="bg-[#141416] border border-[#262626] hover:border-cyan-500/40 rounded-xl p-4 space-y-3 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-300 uppercase px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
                  {sensor.sensorType}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">{sensor.status}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-white font-bold block">{sensor.location}</span>
                <span className="text-xs text-cyan-300 block">{sensor.readingValue}</span>
              </div>

              <div className="p-2 bg-[#0A0A0C] border border-[#262626] rounded-lg text-[10px] text-neutral-400 flex items-center justify-between">
                <span>CORPORATE EXTRACTION:</span>
                <span className="text-emerald-400 font-bold">100% BLOCKED</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar 3: Sovereign Yield & Land Sanctuaries (The Living Economy) */}
      <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-[#262626] pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-mono font-bold text-white uppercase tracking-tight">
                PILLAR III: SOVEREIGN YIELD & LAND SANCTUARIES (THE LIVING ECONOMY)
              </h2>
              <p className="text-xs text-neutral-400">
                Decentralized ledgers connected to seed banks, food forests, and land trusts. Smart contracts manage resource distribution and automated irrigation.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTriggerIrrigation}
            disabled={isTriggeringIrrigation}
            className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <Droplets className={`w-4 h-4 text-emerald-400 ${isTriggeringIrrigation ? 'animate-bounce' : ''}`} />
            <span>{isTriggeringIrrigation ? 'EXECUTING SMART IRRIGATION...' : 'TRIGGER SMART CONTRACT IRRIGATION'}</span>
          </button>
        </div>

        {irrigationSuccessMessage && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{irrigationSuccessMessage}</span>
          </div>
        )}

        {/* Land Sanctuaries & Seed Vault Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          {/* Land Sanctuaries */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-4">
            <span className="text-[10px] text-neutral-400 font-bold uppercase block">
              BIOREGIONAL LAND TRUST SANCTUARIES ({landSanctuaries.length})
            </span>

            <div className="space-y-3">
              {landSanctuaries.map((sanctuary) => (
                <div
                  key={sanctuary.id}
                  className="p-3 bg-[#0A0A0C] border border-[#262626] rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{sanctuary.name}</span>
                    <span className="text-emerald-400 font-bold">{sanctuary.acreage} ACRES PROTECTED</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-400">
                    <div>FOOD FOREST SPECIES: <span className="text-white font-bold">{sanctuary.foodForestSpeciesCount}</span></div>
                    <div>MONTHLY YIELD: <span className="text-emerald-300 font-bold">{sanctuary.bioregionalYieldMonthlyKg} kg</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decentralized Seed Bank */}
          <div className="bg-[#141416] border border-[#262626] rounded-xl p-4 space-y-4">
            <span className="text-[10px] text-neutral-400 font-bold uppercase block">
              HEIRLOOM SEED BANK LEDGER ({seedBank.length} VARIETIES)
            </span>

            <div className="space-y-2">
              {seedBank.map((seed) => (
                <div
                  key={seed.id}
                  className="p-3 bg-[#0A0A0C] border border-emerald-500/20 rounded-lg space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-300 font-bold">{seed.cropName}</span>
                    <span className="text-neutral-400 text-[10px]">{seed.seedQuantityGrams}g</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-neutral-500">
                    <span>{seed.varietyType}</span>
                    <span className="text-emerald-400 font-bold">GERMINATION: {seed.germinationRatePercent}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Seed Variety Form */}
            <form onSubmit={handleAddSeedVariety} className="space-y-2 pt-2 border-t border-[#262626]">
              <span className="text-[10px] text-neutral-400 font-bold uppercase block">REGISTER HEIRLOOM SEED VARIETY</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  placeholder="Crop name (e.g., Hopi Black Corn)..."
                  className="flex-1 bg-[#0A0A0C] border border-[#2D2D30] rounded-lg px-3 py-1.5 text-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newCropName.trim()}
                  className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-bold rounded-lg transition cursor-pointer flex items-center gap-1 text-[11px] disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>REGISTER</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
