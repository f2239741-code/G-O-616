/**
 * Sanctum Web Audio Resonance Engine
 * Pure zero-dependency Web Audio API manager for spatial ambient drones and micro-interaction sounds.
 */

class SanctumAudioEngine {
  private ctx: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private masterGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private currentFrequency: number = 108;
  private droneVolume: number = 0.08; // 0.0 to 0.25 max
  private sfxVolume: number = 0.05;   // 0.0 to 0.20 max

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(1.0, this.ctx.currentTime);

      this.sfxGainNode = this.ctx.createGain();
      this.sfxGainNode.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGainNode.connect(this.masterGainNode);

      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 128;
      this.analyserNode.smoothingTimeConstant = 0.8;

      this.masterGainNode.connect(this.analyserNode);
      this.analyserNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Set ambient drone volume independently (0.0 to 1.0 scale)
   */
  public setDroneVolume(volume: number) {
    // Map 0..1 to 0..0.25 target gain
    this.droneVolume = Math.max(0, Math.min(1, volume)) * 0.25;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.linearRampToValueAtTime(this.droneVolume, this.ctx.currentTime + 0.1);
    }
  }

  public getDroneVolumeNormalized(): number {
    return Math.min(1, this.droneVolume / 0.25);
  }

  /**
   * Set main application UI sound / SFX volume independently (0.0 to 1.0 scale)
   */
  public setSfxVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume)) * 0.20;
    if (this.sfxGainNode && this.ctx) {
      this.sfxGainNode.gain.linearRampToValueAtTime(this.sfxVolume, this.ctx.currentTime + 0.1);
    }
  }

  public getSfxVolumeNormalized(): number {
    return Math.min(1, this.sfxVolume / 0.20);
  }

  /**
   * Toggle deep ritual ambient hum (Default: 108Hz root resonance / 432Hz harmonic)
   */
  public toggleAmbient(frequency: number = 108) {
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    if (this.isPlaying) {
      if (this.currentFrequency !== frequency) {
        // Change frequency smoothly
        this.currentFrequency = frequency;
        if (this.oscillator) {
          this.oscillator.frequency.linearRampToValueAtTime(frequency, this.ctx.currentTime + 1);
        }
      } else {
        this.stopAmbient();
      }
    } else {
      this.currentFrequency = frequency;
      this.oscillator = this.ctx.createOscillator();
      this.gainNode = this.ctx.createGain();

      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      // Smooth fade in to configured drone volume
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(this.droneVolume, this.ctx.currentTime + 1.5);

      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.masterGainNode);

      this.oscillator.start();
      this.isPlaying = true;
    }
  }

  public setFrequency(frequency: number) {
    this.currentFrequency = frequency;
    if (this.oscillator && this.ctx) {
      this.oscillator.frequency.linearRampToValueAtTime(frequency, this.ctx.currentTime + 0.5);
    }
  }

  public stopAmbient() {
    if (this.oscillator && this.gainNode && this.ctx) {
      this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          this.oscillator?.stop();
          this.oscillator?.disconnect();
        } catch {}
        this.isPlaying = false;
      }, 800);
    }
  }

  /**
   * UI Micro-Interaction Click Sound
   */
  public playClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGainNode) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  public getStatus() {
    return this.isPlaying;
  }

  public getCurrentFrequency() {
    return this.currentFrequency;
  }

  public getAnalyserNode(): AnalyserNode | null {
    return this.analyserNode;
  }

  public getFrequencyData(array: Uint8Array): void {
    if (this.analyserNode) {
      this.analyserNode.getByteFrequencyData(array);
    }
  }

  public getTimeDomainData(array: Uint8Array): void {
    if (this.analyserNode) {
      this.analyserNode.getByteTimeDomainData(array);
    }
  }
}

export const sanctumAudio = new SanctumAudioEngine();
