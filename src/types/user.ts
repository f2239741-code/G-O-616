export type UserTier = 'free' | 'explorer' | 'luminary';

export type UserRole = 'seeker' | 'initiator' | 'guardian' | 'super_admin';

export interface UserSession {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  tier: UserTier;
  coherenceScore: number;
  ignisBalance: number;
  stakedIgnis: number;
  walletAddress?: string;
  isWalletConnected: boolean;
  activeChainId?: number;
  lastLoginAt: string;
  createdAt: string;
  preferences: {
    theme: 'dark' | 'lucifera_midnight' | 'amber_sacred';
    audioAutoplay: boolean;
    frequencyDroneEnabled: boolean;
    hapticFeedback: boolean;
    ambientVolume: number;
  };
}

export interface UserTierBenefits {
  tier: UserTier;
  monthlyPriceUSD: number;
  ignisMultiplier: number;
  oracleReadingDailyLimit: number;
  maxCodexLayerAccess: number;
  features: string[];
}
