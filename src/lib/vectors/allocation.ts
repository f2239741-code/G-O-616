import { PLANETARY_REGENERATION_VECTOR } from './regeneration';
import { LOCALIZED_INTELLIGENCE_VECTOR } from './synthesis';
import { ZERO_COST_PUBLIC_GOODS_VECTOR } from './publicGoods';

export interface ComputeVectorPacket {
  taskId: string;
  payloadHash: string;
  intentVector: 'REGENERATION' | 'SYNTHESIS' | 'PUBLIC_GOODS' | 'SPECULATION';
  computeUnits: number;
}

export interface VectorAllocationResult {
  accepted: boolean;
  assignedTier: string;
  ignisReward: number;
  routedChannel: string;
  nullifiedReason?: string;
  timestamp: string;
}

/**
 * Intercepts incoming compute and filters out speculative extraction 
 * in favor of conscious, regenerative vector allocation.
 */
export function allocateConsciousVector(packet: ComputeVectorPacket): VectorAllocationResult {
  const timestamp = new Date().toISOString();

  // 1. Reject and neutralize speculative extraction vectors
  if (packet.intentVector === 'SPECULATION') {
    return {
      accepted: false,
      assignedTier: 'NULLIFIED',
      ignisReward: 0,
      routedChannel: 'BURN_LEDGER_VOID',
      nullifiedReason: 'Speculative extraction vector rejected. Compute burned to IGNIS X ledger void.',
      timestamp
    };
  }

  // 2. Route valid conscious vectors to sovereign allocations
  const channelMap = {
    REGENERATION: PLANETARY_REGENERATION_VECTOR.targetChannel,
    SYNTHESIS: LOCALIZED_INTELLIGENCE_VECTOR.targetChannel,
    PUBLIC_GOODS: ZERO_COST_PUBLIC_GOODS_VECTOR.targetChannel,
  };

  const multiplier = packet.intentVector === 'REGENERATION' ? 1.5 : 1.2;
  const ignisReward = Math.floor(packet.computeUnits * multiplier);

  return {
    accepted: true,
    assignedTier: 'LUMINARY_GUARDIAN',
    ignisReward,
    routedChannel: channelMap[packet.intentVector],
    timestamp
  };
}

export const VECTOR_WEIGHT_DISTRIBUTION = [
  { vector: PLANETARY_REGENERATION_VECTOR, percentage: 40, color: 'emerald' },
  { vector: LOCALIZED_INTELLIGENCE_VECTOR, percentage: 35, color: 'indigo' },
  { vector: ZERO_COST_PUBLIC_GOODS_VECTOR, percentage: 25, color: 'cyan' },
];
