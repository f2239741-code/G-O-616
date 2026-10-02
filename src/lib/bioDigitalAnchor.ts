/**
 * Bio-Digital Anchor Engine & Bioregional Sanctuary System
 * 
 * 1. Energy-Compute Symbiosis (The Power Node) - Micro-hydro, Solar, Thermal Micro-grids driving Edge Compute
 * 2. Open-Source Telemetry (The Planetary Nervous System) - LoRa soil & environmental sensors under ZK protection
 * 3. Sovereign Yield & Land Sanctuaries (The Living Economy) - Seed banks, food forests, land trusts, smart contracts
 */

export interface MicroGridEnergyNode {
  id: string;
  sourceType: 'Micro-Hydro Turbine' | 'Solar Array' | 'Geothermal Thermal Loop' | 'Kinetic Storage Flywheel';
  currentOutputKw: number;
  maxCapacityKw: number;
  kineticFlowRateLps?: number; // Liters per sec for hydro
  solarIrradianceWm2?: number; // Solar
  thermalGradientC?: number; // Geothermal
  tiedEdgeComputeFlops: string; // e.g., '142 TFLOPs'
  efficiencyPercent: number;
  status: 'OPTIMAL_KINETIC' | 'SCALING_WITH_FLOW' | 'BATTERY_BUFFERING';
}

export interface TelemetrySensorNode {
  id: string;
  sensorType: 'Soil Moisture & pH' | 'LoRa Mesh Relay' | 'Water Table Depth' | 'Microclimate Atmos' | 'Spore & Mycelium Network';
  location: string;
  readingValue: string;
  optimalRange: string;
  zkProtected: boolean;
  corporateExtractionBlocked: boolean;
  lastPingTime: string;
  status: 'HEALTHY' | 'IRRIGATION_TRIGGERED' | 'OPTIMIZING';
}

export interface SeedBankVariety {
  id: string;
  cropName: string;
  varietyType: 'Heirloom Ancient Grain' | 'Perennial Medicinal' | 'Nitrogen Fixer' | 'Drought Native Fruit';
  seedQuantityGrams: number;
  germinationRatePercent: number;
  sanctuaryLocation: string;
  ledgerTxHash: string;
}

export interface LandTrustSanctuary {
  id: string;
  name: string;
  location: string;
  acreage: number;
  foodForestSpeciesCount: number;
  automatedIrrigationActive: boolean;
  governanceTrusteesCount: number;
  bioregionalYieldMonthlyKg: number;
}

export const INITIAL_POWER_NODES: MicroGridEnergyNode[] = [
  {
    id: 'pnode-hydro-01',
    sourceType: 'Micro-Hydro Turbine',
    currentOutputKw: 48.5,
    maxCapacityKw: 60.0,
    kineticFlowRateLps: 185,
    tiedEdgeComputeFlops: '240 TFLOPs Edge AI',
    efficiencyPercent: 94.2,
    status: 'SCALING_WITH_FLOW'
  },
  {
    id: 'pnode-[#0A]solar-02',
    sourceType: 'Solar Array',
    currentOutputKw: 32.1,
    maxCapacityKw: 45.0,
    solarIrradianceWm2: 890,
    tiedEdgeComputeFlops: '180 TFLOPs Quantum Simulation',
    efficiencyPercent: 91.8,
    status: 'OPTIMAL_KINETIC'
  },
  {
    id: 'pnode-thermal-03',
    sourceType: 'Geothermal Thermal Loop',
    currentOutputKw: 22.0,
    maxCapacityKw: 25.0,
    thermalGradientC: 68.4,
    tiedEdgeComputeFlops: '110 TFLOPs Cryptographic Mesh',
    efficiencyPercent: 96.5,
    status: 'BATTERY_BUFFERING'
  }
];

export const INITIAL_TELEMETRY_SENSORS: TelemetrySensorNode[] = [
  {
    id: 'sensor-soil-shasta-01',
    sensorType: 'Soil Moisture & pH',
    location: 'Mount Shasta Food Forest Bed Alpha',
    readingValue: '48% VWC | 6.8 pH | High Mycelial Network',
    optimalRange: '45-55% VWC',
    zkProtected: true,
    corporateExtractionBlocked: true,
    lastPingTime: '12 seconds ago',
    status: 'HEALTHY'
  },
  {
    id: 'sensor-water-02',
    sensorType: 'Water Table Depth',
    location: 'Alpine Stream Sanctuary Intake',
    readingValue: '2.4m Depth | 8.2°C Clean Aquifer',
    optimalRange: '2.0-3.0m',
    zkProtected: true,
    corporateExtractionBlocked: true,
    lastPingTime: '4 seconds ago',
    status: 'HEALTHY'
  },
  {
    id: 'sensor-lora-relay-03',
    sensorType: 'LoRa Mesh Relay',
    location: 'Ridge Peak Telemetry Station',
    readingValue: 'Sub-GHz Mesh Bridged | 28 Nodes Active',
    optimalRange: '-75 dBm to -90 dBm',
    zkProtected: true,
    corporateExtractionBlocked: true,
    lastPingTime: '1 second ago',
    status: 'OPTIMIZING'
  }
];

export const INITIAL_SEED_BANK: SeedBankVariety[] = [
  {
    id: 'seed-01',
    cropName: 'Ancient Cherokee Purple Tomato & Black Emmer Wheat',
    varietyType: 'Heirloom Ancient Grain',
    seedQuantityGrams: 4500,
    germinationRatePercent: 98.4,
    sanctuaryLocation: 'Shasta Seed Vault Vault-A',
    ledgerTxHash: '0x_SEED_LEDGER_991823A4'
  },
  {
    id: 'seed-02',
    cropName: 'Echinacea Angustifolia & Reishi Spore Culture',
    varietyType: 'Perennial Medicinal',
    seedQuantityGrams: 1200,
    germinationRatePercent: 96.1,
    sanctuaryLocation: 'Alpine Fungal Nursery',
    ledgerTxHash: '0x_SEED_LEDGER_771239B2'
  }
];

export const INITIAL_LAND_SANCTUARIES: LandTrustSanctuary[] = [
  {
    id: 'sanctuary-shasta',
    name: 'Mount Shasta Sovereign Land Trust',
    location: 'Siskiyou Bioregion',
    acreage: 480,
    foodForestSpeciesCount: 142,
    automatedIrrigationActive: true,
    governanceTrusteesCount: 77,
    bioregionalYieldMonthlyKg: 3850
  },
  {
    id: 'sanctuary-cascade',
    name: 'Cascade Headwaters Eco-Sanctuary',
    location: 'Pacific Northwest Watershed',
    acreage: 320,
    foodForestSpeciesCount: 98,
    automatedIrrigationActive: true,
    governanceTrusteesCount: 42,
    bioregionalYieldMonthlyKg: 2400
  }
];
