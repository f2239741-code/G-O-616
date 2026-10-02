import React from 'react';
import { Flame, TrendingUp, Sparkles } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { formatTokenAmount } from '../../lib/utils';
import { IGNIS_CONTRACT_METADATA } from '../../lib/web3/polygonConfig';

export const IgnisTokenBalance: React.FC<{ className?: string; showUSD?: boolean }> = ({
  className = '',
  showUSD = true
}) => {
  const { session } = useUserStore();
  const estimatedUsd = (session.ignisBalance * IGNIS_CONTRACT_METADATA.currentIgnisPriceUsd).toFixed(2);

  return (
    <div className={`flex items-center gap-2 bg-[#121218] border border-amber-500/30 rounded-xl px-3 py-1.5 font-mono shadow-md ${className}`}>
      <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
        <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      </div>

      <div>
        <div className="flex items-center gap-1 text-xs font-bold text-amber-300">
          <span>{formatTokenAmount(session.ignisBalance)}</span>
          <span className="text-[10px] text-amber-500">IGNIS</span>
        </div>
        {showUSD && (
          <div className="text-[9px] text-neutral-400">
            ≈ ${estimatedUsd} USD
          </div>
        )}
      </div>
    </div>
  );
};
