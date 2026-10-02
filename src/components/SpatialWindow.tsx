import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { GripHorizontal, X, Minus, Activity, Radio, Volume2, VolumeX, Sparkles, Sliders, Play, Square, Compass } from 'lucide-react';
import { sanctumAudio } from '../lib/audioEngine';

interface SpatialWindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  onClose?: () => void;
  className?: string;
  showVisualizer?: boolean;
}

type GeometryMode = 'spectrum' | 'sacred_geometry' | 'lissajous';

export const FrequencyVisualizer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentFreq, setCurrentFreq] = useState<number>(108);
  const [droneVol, setDroneVol] = useState<number>(32); // 0 to 100
  const [sfxVol, setSfxVol] = useState<number>(25);     // 0 to 100
  const [geometryMode, setGeometryMode] = useState<GeometryMode>('sacred_geometry');
  const [geoComplexity, setGeoComplexity] = useState<number>(6); // 6-fold, 8-fold, 12-fold symmetry

  // Sync state on load
  useEffect(() => {
    setIsPlaying(sanctumAudio.getStatus());
    setCurrentFreq(sanctumAudio.getCurrentFrequency());
    setDroneVol(Math.round(sanctumAudio.getDroneVolumeNormalized() * 100));
    setSfxVol(Math.round(sanctumAudio.getSfxVolumeNormalized() * 100));
  }, []);

  const handleToggleDrone = (freq?: number) => {
    const targetFreq = freq || currentFreq;
    sanctumAudio.toggleAmbient(targetFreq);
    setIsPlaying(sanctumAudio.getStatus());
    setCurrentFreq(sanctumAudio.getCurrentFrequency());
  };

  const handleDroneVolChange = (val: number) => {
    setDroneVol(val);
    sanctumAudio.setDroneVolume(val / 100);
  };

  const handleSfxVolChange = (val: number) => {
    setSfxVol(val);
    sanctumAudio.setSfxVolume(val / 100);
  };

  const handleFreqChange = (freq: number) => {
    setCurrentFreq(freq);
    if (sanctumAudio.getStatus()) {
      sanctumAudio.setFrequency(freq);
    } else {
      sanctumAudio.toggleAmbient(freq);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const fftSize = 64;
    const freqData = new Uint8Array(fftSize);
    const timeData = new Uint8Array(fftSize);

    const render = () => {
      const active = sanctumAudio.getStatus();
      const freq = sanctumAudio.getCurrentFrequency();

      sanctumAudio.getFrequencyData(freqData);
      sanctumAudio.getTimeDomainData(timeData);

      // Average amplitude for geometry scaling
      let avgAmp = 0;
      for (let i = 0; i < freqData.length; i++) {
        avgAmp += freqData[i];
      }
      avgAmp = freqData.length > 0 ? avgAmp / (freqData.length * 255) : 0;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 340;
      const height = rect.height || 140;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Background
      ctx.fillStyle = '#060608';
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Grid
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.05)';
      ctx.lineWidth = 1;
      const gridSpacing = 20;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const waveSpeed = freq / 1000;
      phase += active ? waveSpeed * 0.05 : 0.01;

      // Render based on selected geometry mode
      if (geometryMode === 'sacred_geometry') {
        const cx = width / 2;
        const cy = height / 2;
        const baseRadius = Math.min(width, height) * 0.32;
        const pulse = active ? (0.8 + avgAmp * 0.6 + Math.sin(phase * 2) * 0.1) : 0.6;
        const r = baseRadius * pulse;

        // Outer Sacred Ring
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = active ? '#f59e0b' : '#3f3f46';
        ctx.lineWidth = 1.5;
        if (active) {
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 10;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Concentric Inner Resonance Ring
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = active ? 'rgba(6, 182, 212, 0.6)' : 'rgba(82, 82, 91, 0.3)';
        ctx.stroke();

        // N-fold Star/Flower Geometry
        const n = geoComplexity;
        const points: { x: number; y: number }[] = [];

        for (let i = 0; i < n; i++) {
          const angle = (i * 2 * Math.PI) / n + phase;
          const px = cx + Math.cos(angle) * r;
          const py = cy + Math.sin(angle) * r;
          points.push({ x: px, y: py });

          // Draw satellite circles (Flower of Life effect)
          ctx.beginPath();
          ctx.arc(px, py, r * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = active ? 'rgba(245, 158, 11, 0.25)' : 'rgba(63, 63, 70, 0.2)';
          ctx.stroke();
        }

        // Connect Star Lines
        ctx.beginPath();
        ctx.strokeStyle = active ? '#06b6d4' : '#27272a';
        ctx.lineWidth = 1;
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
          }
        }
        ctx.stroke();

        // Central Core Node
        ctx.beginPath();
        ctx.arc(cx, cy, active ? 5 + avgAmp * 8 : 3, 0, Math.PI * 2);
        ctx.fillStyle = active ? '#fef08a' : '#71717a';
        ctx.fill();

      } else if (geometryMode === 'lissajous') {
        const cx = width / 2;
        const cy = height / 2;
        const scaleX = width * 0.38;
        const scaleY = height * 0.38;

        // Modulation ratios from current frequency
        const freqRatioA = Math.max(1, Math.round(freq / 100));
        const freqRatioB = freqRatioA + 1;

        ctx.beginPath();
        ctx.lineWidth = active ? 2 : 1;
        ctx.strokeStyle = active ? '#06b6d4' : '#52525b';
        if (active) {
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 8;
        }

        const steps = 300;
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * Math.PI * 2;
          const rawAmp = active ? (timeData[i % timeData.length] - 128) / 128 : 0;
          const x = cx + Math.sin(freqRatioA * t + phase) * (scaleX + rawAmp * 15);
          const y = cy + Math.cos(freqRatioB * t) * (scaleY + rawAmp * 15);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

      } else {
        // Spectrum Bars Mode
        const barCount = 32;
        const barWidth = (width / barCount) - 2;

        for (let i = 0; i < barCount; i++) {
          let barHeight = 4;
          if (active) {
            const val = freqData[i % freqData.length] || 0;
            const factor = (val / 255);
            const baseWave = Math.sin((i / barCount) * Math.PI + phase * 2) * 0.2 + 0.8;
            barHeight = Math.max(4, (factor * 0.7 + baseWave * 0.3) * (height * 0.7));
          } else {
            const idleWave = Math.sin((i / barCount) * Math.PI * 2 + phase) * 0.5 + 0.5;
            barHeight = Math.max(3, idleWave * 8);
          }

          const x = i * (barWidth + 2) + 1;
          const y = height - barHeight - 12;

          const barGradient = ctx.createLinearGradient(0, height, 0, y);
          if (active) {
            barGradient.addColorStop(0, '#312e81');
            barGradient.addColorStop(0.5, '#06b6d4');
            barGradient.addColorStop(1, '#f59e0b');
          } else {
            barGradient.addColorStop(0, '#1f1f23');
            barGradient.addColorStop(1, '#3f3f46');
          }

          ctx.fillStyle = barGradient;
          ctx.fillRect(x, y, barWidth, barHeight);

          if (active && barHeight > 10) {
            ctx.fillStyle = '#fbbf24';
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 6;
            ctx.fillRect(x, y - 2, barWidth, 2);
            ctx.shadowBlur = 0;
          }
        }

        // Oscillating Wave Overlay
        ctx.beginPath();
        ctx.lineWidth = active ? 2 : 1;
        ctx.strokeStyle = active ? '#f59e0b' : 'rgba(161, 161, 170, 0.4)';
        const midY = height / 2;
        for (let x = 0; x <= width; x += 2) {
          let y = midY;
          if (active) {
            const sampleIndex = Math.floor((x / width) * timeData.length);
            const rawSample = (timeData[sampleIndex] - 128) / 128;
            const freqHarmonic = Math.sin((x / width) * (freq / 20) + phase * 4);
            y += (rawSample * 18) + (freqHarmonic * 10);
          } else {
            y += Math.sin((x / width) * Math.PI * 4 + phase) * 3;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // HUD Text
      ctx.font = '9px monospace';
      ctx.fillStyle = active ? '#fef08a' : '#71717a';
      ctx.fillText(`HARMONIC FREQUENCY: ${freq} HZ`, 8, 14);

      ctx.fillStyle = active ? '#34d399' : '#52525b';
      const statusText = active ? '● RESONATING' : '○ STANDBY';
      const statusWidth = ctx.measureText(statusText).width;
      ctx.fillText(statusText, width - statusWidth - 8, 14);

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [geometryMode, geoComplexity]);

  return (
    <div className={`relative bg-[#08080a] border border-amber-500/30 rounded-xl p-3 overflow-hidden shadow-2xl space-y-3 ${className}`}>
      {/* Header Bar */}
      <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 px-0.5">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          Acoustic Resonance Engine
        </span>
        <span className="text-neutral-400 text-[9px] flex items-center gap-1 font-mono">
          <Radio className="w-3 h-3 text-cyan-400" />
          {isPlaying ? 'AUDIO ACTIVE' : 'MUTED'}
        </span>
      </div>

      {/* Geometry Mode Selectors */}
      <div className="flex items-center justify-between bg-[#121216] p-1 rounded-lg border border-[#22222a] text-[10px] font-mono">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => {
              sanctumAudio.playClick();
              setGeometryMode('sacred_geometry');
            }}
            className={`px-2 py-1 rounded transition cursor-pointer flex items-center gap-1 ${
              geometryMode === 'sacred_geometry'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Compass className="w-3 h-3 text-amber-400" />
            Geometry
          </button>
          <button
            type="button"
            onClick={() => {
              sanctumAudio.playClick();
              setGeometryMode('lissajous');
            }}
            className={`px-2 py-1 rounded transition cursor-pointer flex items-center gap-1 ${
              geometryMode === 'lissajous'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Lissajous
          </button>
          <button
            type="button"
            onClick={() => {
              sanctumAudio.playClick();
              setGeometryMode('spectrum');
            }}
            className={`px-2 py-1 rounded transition cursor-pointer flex items-center gap-1 ${
              geometryMode === 'spectrum'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3 h-3 text-indigo-400" />
            Spectrum
          </button>
        </div>

        {geometryMode === 'sacred_geometry' && (
          <button
            type="button"
            onClick={() => {
              sanctumAudio.playClick();
              setGeoComplexity(prev => (prev === 6 ? 8 : prev === 8 ? 12 : 6));
            }}
            className="px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded border border-neutral-700 hover:border-amber-400 cursor-pointer text-[9px]"
            title="Cycle Symmetry Fold"
          >
            {geoComplexity}-Fold
          </button>
        )}
      </div>

      {/* Canvas Viewport */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-32 rounded-lg bg-[#040406] border border-[#1f1f26] block cursor-pointer"
        onClick={() => {
          handleToggleDrone();
          sanctumAudio.playClick();
        }}
        title="Click to toggle drone resonance"
      />

      {/* Frequency Presets & Power Button */}
      <div className="flex items-center justify-between gap-1.5 pt-0.5">
        <button
          type="button"
          onClick={() => handleToggleDrone()}
          className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            isPlaying
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20'
              : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white'
          }`}
        >
          {isPlaying ? <Square className="w-3 h-3 fill-amber-400" /> : <Play className="w-3 h-3 fill-neutral-400" />}
          <span>{isPlaying ? 'PAUSE DRONE' : 'START DRONE'}</span>
        </button>

        <div className="flex items-center space-x-1 font-mono text-[10px]">
          {[108, 432, 528, 963].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => handleFreqChange(f)}
              className={`px-2 py-1 rounded border transition cursor-pointer ${
                currentFreq === f && isPlaying
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                  : 'bg-[#121216] border-[#26262a] text-neutral-400 hover:text-white'
              }`}
            >
              {f}Hz
            </button>
          ))}
        </div>
      </div>

      {/* Independent Volume Controls Sliders */}
      <div className="space-y-2 bg-[#0d0d12] p-2.5 rounded-xl border border-[#1d1d26]">
        <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center justify-between">
          <span>INDEPENDENT AUDIO MIXER</span>
          <span className="text-neutral-500 text-[9px]">REAL-TIME GAIN</span>
        </div>

        {/* Ambient Drone Volume Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-300">
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              {droneVol > 0 ? <Volume2 className="w-3 h-3 text-amber-400" /> : <VolumeX className="w-3 h-3 text-neutral-500" />}
              Ambient Drone Volume
            </span>
            <span className="text-amber-400 font-bold">{droneVol}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={droneVol}
            onChange={(e) => handleDroneVolChange(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-[#1f1f28] rounded-lg"
          />
        </div>

        {/* Main Application Sound (SFX) Volume Slider */}
        <div className="space-y-1 pt-1 border-t border-[#1a1a22]">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-300">
            <span className="flex items-center gap-1 text-cyan-300 font-medium">
              {sfxVol > 0 ? <Volume2 className="w-3 h-3 text-cyan-400" /> : <VolumeX className="w-3 h-3 text-neutral-500" />}
              Main App Sound (SFX) Volume
            </span>
            <span className="text-cyan-400 font-bold">{sfxVol}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sfxVol}
            onChange={(e) => handleSfxVolChange(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-[#1f1f28] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export const SpatialWindow: React.FC<SpatialWindowProps> = ({
  title,
  children,
  initialPosition = { x: 20, y: 20 },
  onClose,
  className = '',
  showVisualizer = true
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 800, top: -100, bottom: 600 }}
      initial={initialPosition}
      whileDrag={{ scale: 1.02, zIndex: 50 }}
      className={`absolute w-96 bg-neutral-950/90 border border-amber-500/40 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden z-40 ${className}`}
    >
      {/* Draggable Header */}
      <div 
        onMouseDown={() => sanctumAudio.playClick()}
        className="flex items-center justify-between px-4 py-3 bg-neutral-900/80 border-b border-amber-500/20 cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs tracking-widest">
          <GripHorizontal className="w-4 h-4 text-neutral-500" />
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            type="button"
            onClick={() => {
              sanctumAudio.playClick();
              setIsMinimized(!isMinimized);
            }}
            className="text-neutral-400 hover:text-amber-300 transition-colors p-1 rounded hover:bg-white/5 cursor-pointer"
            title={isMinimized ? "Expand" : "Minimize"}
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button 
              type="button"
              onClick={() => {
                sanctumAudio.playClick();
                onClose();
              }}
              className="text-neutral-400 hover:text-rose-400 transition-colors p-1 rounded hover:bg-white/5 cursor-pointer"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Window Body */}
      {!isMinimized && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 text-neutral-200 max-h-[520px] overflow-y-auto font-sans space-y-4"
        >
          {showVisualizer && <FrequencyVisualizer />}
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

