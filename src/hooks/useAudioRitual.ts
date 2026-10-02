import { useEffect, useState, useCallback } from 'react';
import { sanctumAudio } from '../lib/audioEngine';
import { useOracleStore } from '../store/useOracleStore';

/**
 * Custom hook for managing Web Audio acoustic drone frequencies,
 * ritual hum synthesis, and harmonic phase locks.
 */
export function useAudioRitual() {
  const { ritual, setRitualFrequency, setAmbientHumVolume } = useOracleStore();
  const [isPlaying, setIsPlaying] = useState<boolean>(sanctumAudio.getStatus());
  const [currentFreq, setCurrentFreq] = useState<number>(sanctumAudio.getCurrentFrequency());
  const [volume, setVolume] = useState<number>(Math.round(sanctumAudio.getDroneVolumeNormalized() * 100));

  useEffect(() => {
    setIsPlaying(sanctumAudio.getStatus());
    setCurrentFreq(sanctumAudio.getCurrentFrequency());
  }, [ritual.currentFrequency, ritual.isActive]);

  const toggleDrone = useCallback((freq?: number) => {
    const target = freq || currentFreq || 108;
    sanctumAudio.playClick();
    sanctumAudio.toggleAmbient(target);
    setIsPlaying(sanctumAudio.getStatus());
    setCurrentFreq(sanctumAudio.getCurrentFrequency());
    setRitualFrequency(target);
  }, [currentFreq, setRitualFrequency]);

  const changeFrequency = useCallback((freq: number) => {
    sanctumAudio.playClick();
    sanctumAudio.setFrequency(freq);
    setCurrentFreq(freq);
    setRitualFrequency(freq);
    if (!sanctumAudio.getStatus()) {
      sanctumAudio.toggleAmbient(freq);
      setIsPlaying(true);
    }
  }, [setRitualFrequency]);

  const changeVolume = useCallback((val: number) => {
    const norm = Math.max(0, Math.min(100, val)) / 100;
    sanctumAudio.setDroneVolume(norm);
    setVolume(val);
    setAmbientHumVolume(norm);
  }, [setAmbientHumVolume]);

  const triggerHapticChime = useCallback(() => {
    sanctumAudio.playClick();
  }, []);

  return {
    isPlaying,
    currentFreq,
    volume,
    toggleDrone,
    changeFrequency,
    changeVolume,
    triggerHapticChime
  };
}
