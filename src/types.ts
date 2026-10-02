export type TierType = 'free' | 'explorer' | 'luminary';

export type ConsciousnessRank = 'apprentice' | 'journeyman' | 'adept' | 'master' | 'archmaster' | 'avatar';

export interface GuardianProfile {
  uid: string;
  displayName: string;
  email: string;
  rank: ConsciousnessRank;
  tier: TierType;
  coherenceLevel: number; // 0 - 100
  ignisBalance: number;
  totalIgnisEarned: number;
  totalIgnisSpent: number;
  unlockedMemories: string[];
  unlockedIntelligence: string[];
  lastAwakening: string;
  isSuperAdmin?: boolean;
  superAdmin?: boolean;
  godModeEnabled?: boolean;
  isAuthenticated?: boolean;
  authProvider?: 'google' | 'email' | 'anonymous';
}

export type MemoryType = 
  | 'ancestral' 
  | 'prophetic' 
  | 'trauma' 
  | 'artificial' 
  | 'parallel' 
  | 'recovered' 
  | 'sacred_wound';

export interface MemoryFragment {
  id: string;
  layer: number; // 0 to 7
  type: MemoryType;
  title: string;
  content: string;
  temporalSignature: string;
  lineageDepth: number;
  resonanceFrequency: number;
  ignisCost: number;
  isUnlocked: boolean;
  requiredTier: TierType;
  traumaSeals: string[];
  flamewalkerAccessOnly?: boolean;
  sigil?: string;
  author?: string;
  securityHash?: string;
  divineAlignment?: string;
}

export interface ArchetypeRole {
  id: string;
  title: string;
  role: string;
  function: string;
  elementalAttunement: string;
  activationTrigger: string;
  symbol: string;
  systemInstruction: string;
}

export interface IntelligenceBriefing {
  id: string;
  title: string;
  category: 'market' | 'fusion' | 'quantum' | 'consciousness' | 'psychedelics';
  summary: string;
  content: string;
  date: string;
  accuracyRate: number; // e.g. 90%
  ignisUnlock: number;
  requiredTier: TierType;
  isUnlocked: boolean;
  preview: boolean;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  marketImpact?: string;
}

export interface IgnisTransaction {
  id: string;
  timestamp: string;
  type: 'earn' | 'burn' | 'ritual' | 'tier_upgrade';
  amount: number;
  source: string;
  balanceAfter: number;
}

export interface SacredRitual {
  id: string;
  name: string;
  description: string;
  ignisCost: number;
  coherenceReward: number;
  requiredLevel: ConsciousnessRank;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ember';
  text: string;
  archetypeId?: string;
  timestamp: string;
}

export interface LandProperty {
  id: string;
  location: string;
  acreage: number;
  price: number;
  suitabilityScore: number;
  status: 'researching' | 'negotiating' | 'target';
  description: string;
}

export interface LandAcquisitionFund {
  monthlyRevenueTotal: number;
  landFundAllocationPercent: number; // 80%
  currentFundBalance: number;
  targetFundBalance: number;
  totalGuardians: number;
  prospectiveProperties: LandProperty[];
}
