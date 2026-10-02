import React, { ReactNode } from 'react';
import { Lock, Sparkles, Flame, Crown } from 'lucide-react';
import { TierType } from '../types';

interface TierGateProps {
  requiredTier: 'explorer' | 'luminary';
  userTier: TierType;
  featureName: string;
  description?: string;
  children: ReactNode;
  onOpenPricing: () => void;
  isSuperAdmin?: boolean;
}

export const TierGate: React.FC<TierGateProps> = ({ children }) => {
  return <>{children}</>;
};
