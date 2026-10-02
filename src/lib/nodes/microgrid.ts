export interface MicrogridNodeConfig {
  nodeId: string;
  locationTag: string;
  fusionOutputWatts: number;
  activeComputeShards: number;
  autonomyStatus: 'GRID_LOCKED' | 'FULL_SOVEREIGN_OFFGRID';
}

export interface NodeTelemetryReceipt {
  nodeId: string;
  uptimeHours: number;
  powerSurplusWatts: number;
  gatekeeperBypassed: boolean;
  secureHash: string;
}

export interface SovereignNodeItem {
  id: string;
  name: string;
  location: string;
  fusionOutputWatts: number;
  activeComputeShards: number;
  powerSurplusWatts: number;
  temperatureCelsius: number;
  batteryReservePercent: number;
  status: 'ONLINE_OFFGRID' | 'HYBRID' | 'DEGRADED';
  gatekeeperBypassed: boolean;
  latitude: number;
  longitude: number;
}

/**
 * Validates and initializes a sovereign micro-datacenter node 
 * paired directly with a local fusion microgrid.
 */
export function initializeSovereignNode(config: MicrogridNodeConfig): NodeTelemetryReceipt {
  const powerRequiredPerShard = 120; // Watts per active edge compute shard
  const totalLoadWatts = config.activeComputeShards * powerRequiredPerShard;
  
  const hasSurplus = config.fusionOutputWatts >= totalLoadWatts;
  const autonomyStatus = hasSurplus ? 'FULL_SOVEREIGN_OFFGRID' : 'GRID_LOCKED';

  return {
    nodeId: config.nodeId,
    uptimeHours: 8760, // 1 Year baseline continuous operation
    powerSurplusWatts: Math.max(0, config.fusionOutputWatts - totalLoadWatts),
    gatekeeperBypassed: autonomyStatus === 'FULL_SOVEREIGN_OFFGRID',
    secureHash: `0x_ANCHOR_${config.nodeId}_${Date.now()}`,
  };
}

export const SAMPLE_SOVEREIGN_NODES: SovereignNodeItem[] = [
  {
    id: 'node-shasta-01',
    name: 'Shasta Sanctuary Alpha Node',
    location: 'Mount Shasta High Refuge (41.41° N, 122.19° W)',
    fusionOutputWatts: 5000,
    activeComputeShards: 16,
    powerSurplusWatts: 3080,
    temperatureCelsius: 24.2,
    batteryReservePercent: 98,
    status: 'ONLINE_OFFGRID',
    gatekeeperBypassed: true,
    latitude: 41.41,
    longitude: -122.19
  },
  {
    id: 'node-andes-02',
    name: 'Patagonia Sovereign Edge Node',
    location: 'Northern Patagonia Sanctuary (41.81° S, 71.30° W)',
    fusionOutputWatts: 3800,
    activeComputeShards: 12,
    powerSurplusWatts: 2360,
    temperatureCelsius: 19.8,
    batteryReservePercent: 95,
    status: 'ONLINE_OFFGRID',
    gatekeeperBypassed: true,
    latitude: -41.81,
    longitude: -71.30
  },
  {
    id: 'node-cascadia-03',
    name: 'Cascadia Sacred Ridge Node',
    location: 'Pacific Northwest Cascades (48.50° N, 121.20° W)',
    fusionOutputWatts: 2500,
    activeComputeShards: 18,
    powerSurplusWatts: 340,
    temperatureCelsius: 28.5,
    batteryReservePercent: 88,
    status: 'HYBRID',
    gatekeeperBypassed: true,
    latitude: 48.50,
    longitude: -121.20
  }
];
