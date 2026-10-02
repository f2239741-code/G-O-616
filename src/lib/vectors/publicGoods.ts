/**
 * Zero-Cost Public Goods Vector (25% Weight)
 * Subsidizes open-source cryptographic tooling, sacred lore preservation, and public educational infrastructure.
 * Automatically mints and distributes verified public goods access tokens funded through IGNIS X token burn cycles,
 * ensuring foundational tools remain un-enslaved by subscription monopolies.
 */

export interface PublicGoodVaultItem {
  id: string;
  title: string;
  category: string;
  ignisSubsidizedAmount: number;
  grantStatus: 'minted' | 'distributing' | 'claimed';
}

export const ZERO_COST_PUBLIC_GOODS_VECTOR = {
  id: 'PUBLIC_GOODS',
  name: 'Zero-Cost Public Goods Vector',
  weight: 0.25,
  targetChannel: 'SOVEREIGN_PUBLIC_GOODS_VAULT',
  description: 'Subsidizes open-source cryptographic tooling, sacred lore preservation, and public educational infrastructure through IGNIS X token burn cycles.',
  subsidizedProtocols: [
    'Circom ZK-SNARK Open Witness Prover Tooling',
    'Seventh Sigil Sacred Lore Immutable Archive',
    'Open-Source Hardware Solar Node Schematics'
  ],
  sampleVaultItems: [
    {
      id: 'pg-001',
      title: 'Groth16 SnarkJS Sovereign Client Library',
      category: 'Cryptographic Tooling',
      ignisSubsidizedAmount: 5000,
      grantStatus: 'distributing'
    },
    {
      id: 'pg-002',
      title: 'Ember UR Offline Core Model Quantization',
      category: 'Open AI Models',
      ignisSubsidizedAmount: 12000,
      grantStatus: 'minted'
    }
  ] as PublicGoodVaultItem[]
};
