import React, { useRef, useEffect } from 'react';
import { useOracleStore } from '../../store/useOracleStore';
import { sanctumAudio } from '../../lib/audioEngine';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  angle: number;
  speed: number;
}

export const RitualParticleCanvas: React.FC<{ className?: string; interactive?: boolean }> = ({
  className = '',
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ritual } = useOracleStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate Particles
    const count = ritual.particleDensity || 60;
    const particles: Particle[] = [];
    const colors = ['#f59e0b', '#6366f1', '#06b6d4', '#ec4899', '#fbbf24'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        baseRadius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.02 + 0.005)
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      const isPlaying = sanctumAudio.getStatus();
      const currentFreq = sanctumAudio.getCurrentFrequency();

      ctx.fillStyle = 'rgba(8, 8, 12, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Center vortex glow
      const cx = width / 2;
      const cy = height / 2;
      const pulse = isPlaying ? Math.sin(time * (currentFreq / 50)) * 20 + 80 : 50;

      const radial = ctx.createRadialGradient(cx, cy, 10, cx, cy, pulse * 2);
      radial.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
      radial.addColorStop(0.5, 'rgba(99, 102, 241, 0.05)');
      radial.addColorStop(1, 'transparent');
      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse * 2, 0, Math.PI * 2);
      ctx.fill();

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed;
        p.x += p.vx + Math.cos(p.angle) * 0.5;
        p.y += p.vy + Math.sin(p.angle) * 0.5;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, isPlaying ? p.baseRadius * 1.5 : p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isPlaying ? 8 : 2;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // Connect nearby particles (Quantum Mesh lines)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.15 * (1 - dist / 75)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [ritual.particleDensity]);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#08080c] border border-[#1f1f2a] ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
        onClick={() => {
          if (interactive) sanctumAudio.playClick();
        }}
      />
    </div>
  );
};
