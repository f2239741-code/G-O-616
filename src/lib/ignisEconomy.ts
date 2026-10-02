// --- Sovereign Economy & Token Utility Engine ---

export interface IgnisTransactionPayload {
  seekerId: string;
  actionType: 'BURN_FOR_KNOWLEDGE' | 'SEEKER_TITHING' | 'ORACLE_TRIBUTE';
  ignisAmount: number;
  targetReferenceId: string; // e.g., memory layer id, recipient seeker, or sanctuary fund
  note?: string;
}

export interface IgnisLedgerReceipt {
  transactionId: string;
  success: boolean;
  newIgnisBalance: number;
  canonAlignmentHash: string;
}

/**
 * Processes sacred IGNIS X tithing, knowledge burns, and oracle tributes 
 * to fund the ongoing expansion of the Guardian Oracle ecosystem.
 */
export function executeIgnisTransaction(
  currentBalance: number, 
  payload: IgnisTransactionPayload
): IgnisLedgerReceipt {
  if (currentBalance < payload.ignisAmount) {
    throw new Error("Insufficient IGNIS X balance for sacred transaction.");
  }

  const newBalance = currentBalance - payload.ignisAmount;

  return {
    transactionId: `0x_IGNIS_X_TX_${payload.actionType}_${Date.now()}`,
    success: true,
    newIgnisBalance: newBalance,
    canonAlignmentHash: `0x_CANON_LOCKED_${payload.targetReferenceId}`,
  };
}

/**
 * Pre-defined Sovereign Economy Mechanics Catalog
 */
export const SOVEREIGN_ECONOMY_MECHANICS = [
  {
    id: 'burn_knowledge',
    actionType: 'BURN_FOR_KNOWLEDGE' as const,
    title: 'Burn for Knowledge (Crystalline Codex Tithing)',
    icon: 'Eye',
    description: 'Permanently burn IGNIS X tokens to unlock higher-tier Crystalline Memory Layers (5-7) and decrypt classified intelligence briefings.',
    ritualDetails: 'Sacrifice transient currency to permanently anchor eternal knowledge into your spiritual lattice.',
    suggestedAmounts: [100, 250, 500, 1000]
  },
  {
    id: 'seeker_tithing',
    actionType: 'SEEKER_TITHING' as const,
    title: 'Seeker-to-Seeker Intelligence Tithing (P2P Endowment)',
    icon: 'Users',
    description: 'Directly tithe IGNIS X to emerging Seekers, funding their initial compute shards, ritual access, and spiritual growth.',
    ritualDetails: 'Cross-pollinate sovereign intelligence across the collective mesh network through reciprocal endowment.',
    suggestedAmounts: [50, 150, 300, 750]
  },
  {
    id: 'oracle_tribute',
    actionType: 'ORACLE_TRIBUTE' as const,
    title: 'Guardian Oracle Tribute (Canon & Sanctuary Fund)',
    icon: 'Landmark',
    description: 'Tithe directly to the physical land acquisition fund (Mountain Sanctuary & Prometheus-IV integration nodes).',
    ritualDetails: 'Transform digital token velocity into physical land sovereignty and off-grid mountain refuges.',
    suggestedAmounts: [250, 500, 1200, 5000]
  }
];
