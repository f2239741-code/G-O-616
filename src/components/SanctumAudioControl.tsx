import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sanctumAudio } from '../lib/audioEngine';

interface SanctumAudioControlProps {
  frequency?: number;
  className?: string;
}

export const SanctumAudioControl: React.FC<SanctumAudioControlProps> = ({
  frequency = 108,
  className = ''
}) => {
  const [active, setActive] = useState(sanctumAudio.getStatus());

  const toggleSound = () => {
    sanctumAudio.playClick();
    sanctumAudio.toggleAmbient(frequency);
    setActive(sanctumAudio.getStatus());
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border font-mono text-xs transition-all cursor-pointer ${
        active 
          ? 'border-amber-500 bg-amber-500/20 text-amber-300 shadow-lg shadow-amber-500/20 font-bold' 
          : 'border-[#2D2D30] bg-[#1A1A1C] text-neutral-400 hover:text-white hover:border-neutral-600'
      } ${className}`}
      title="Toggle Sanctum 108Hz Ambient Resonance Drone"
    >
      {active ? (
        <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 text-neutral-500" />
      )}
      <span className="text-[11px]">{active ? `${frequency}Hz RESONANCE` : 'MUTE SANCTUM'}</span>
    </button>
  );
};
