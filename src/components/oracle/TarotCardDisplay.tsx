import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, Radio, RotateCcw, Flame } from 'lucide-react';
import { TarotCard } from '../../types/oracle';
import { sanctumAudio } from '../../lib/audioEngine';

interface TarotCardDisplayProps {
  card: TarotCard;
  isReversed?: boolean;
  positionLabel?: string;
  onSelect?: (card: TarotCard) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({
  card,
  isReversed = false,
  positionLabel,
  onSelect,
  className = '',
  size = 'md'
}) => {
  const [isFlipped, setIsFlipped] = useState(true);

  const handleCardClick = () => {
    sanctumAudio.playClick();
    if (onSelect) onSelect(card);
  };

  const sizeClasses = {
    sm: 'w-36 h-56 p-3 text-xs',
    md: 'w-48 h-72 p-4 text-xs',
    lg: 'w-64 h-96 p-5 text-sm'
  };

  return (
    <div className={`flex flex-col items-center gap-2 select-none ${className}`}>
      {positionLabel && (
        <span className="text-[10px] font-mono text-amber-400/90 font-bold uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          {positionLabel}
        </span>
      )}

      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCardClick}
        className={`relative ${sizeClasses[size]} rounded-2xl bg-gradient-to-b from-[#171722] via-[#0e0e15] to-[#07070b] border-2 border-amber-500/40 hover:border-amber-400 shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/20 cursor-pointer transition-all flex flex-col justify-between overflow-hidden group ${
          isReversed ? 'rotate-180' : ''
        }`}
      >
        {/* Ambient Top Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Card Header: Number & Element */}
        <div className="flex items-center justify-between z-10">
          <span className="font-mono text-amber-300 font-bold text-xs">
            {card.number === 0 ? '0' : `ARC ${card.number}`}
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-neutral-900/80 border border-neutral-700 text-neutral-300 font-mono">
            {card.element.toUpperCase()}
          </span>
        </div>

        {/* Central Sigil / Icon Artwork Sphere */}
        <div className="my-auto flex flex-col items-center justify-center text-center z-10 py-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:scale-110 transition-transform duration-300 mb-2 relative">
            <span className="text-3xl sm:text-4xl">{card.sigil}</span>
            <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-ping" />
          </div>

          <h4 className="font-serif font-bold text-white text-xs sm:text-sm tracking-wide leading-tight px-1 mt-1">
            {card.name.split('•')[1] || card.name}
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-1 mt-2 max-w-[90%]">
            {card.keywords.slice(0, 2).map((kw, i) => (
              <span
                key={i}
                className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900/90 text-amber-200/90 rounded border border-[#2d2d38]"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Frequency Alignment */}
        <div className="pt-2 border-t border-[#232330] flex items-center justify-between text-[9px] font-mono text-neutral-400 z-10">
          <span className="flex items-center gap-1 text-cyan-400 font-bold">
            <Radio className="w-2.5 h-2.5" />
            {card.harmonicFrequency} Hz
          </span>
          <span className="text-amber-400 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            {isReversed ? 'REVERSED' : 'UPRIGHT'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
