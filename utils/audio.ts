// Utility to create beep sounds using Web Audio API
export class AudioManager {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Short beep for minute intervals (EMOM)
  playIntervalBeep() {
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }

  // Loud completion sound for EMOM finish
  playEMOMCompleteSound() {
    const ctx = this.getContext();
    
    // Two loud ascending beeps
    [0, 0.25].forEach((delay, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 700 + (index * 300);
      oscillator.type = 'square';

      const startTime = ctx.currentTime + delay;
      gainNode.gain.setValueAtTime(0.4, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  }

  // Timer ended sound (2 second siren-like alarm)
  playRoutineCompleteSound() {
    const ctx = this.getContext();
    
    // Create a 2-second alternating siren sound
    const duration = 2.0;
    const oscillations = 8; // Number of up-down cycles
    
    for (let i = 0; i < oscillations; i++) {
      // High tone
      const highOsc = ctx.createOscillator();
      const highGain = ctx.createGain();
      
      highOsc.connect(highGain);
      highGain.connect(ctx.destination);
      
      highOsc.frequency.value = 880; // High A
      highOsc.type = 'square';
      
      const highStart = ctx.currentTime + (i * duration / oscillations);
      const highDuration = duration / (oscillations * 2);
      
      highGain.gain.setValueAtTime(0.35, highStart);
      highGain.gain.setValueAtTime(0.35, highStart + highDuration * 0.8);
      highGain.gain.exponentialRampToValueAtTime(0.01, highStart + highDuration);
      
      highOsc.start(highStart);
      highOsc.stop(highStart + highDuration);
      
      // Low tone
      const lowOsc = ctx.createOscillator();
      const lowGain = ctx.createGain();
      
      lowOsc.connect(lowGain);
      lowGain.connect(ctx.destination);
      
      lowOsc.frequency.value = 440; // Low A
      lowOsc.type = 'square';
      
      const lowStart = highStart + highDuration;
      
      lowGain.gain.setValueAtTime(0.35, lowStart);
      lowGain.gain.setValueAtTime(0.35, lowStart + highDuration * 0.8);
      lowGain.gain.exponentialRampToValueAtTime(0.01, lowStart + highDuration);
      
      lowOsc.start(lowStart);
      lowOsc.stop(lowStart + highDuration);
    }
  }

  // Workout complete sound
  playWorkoutCompleteSound() {
    const ctx = this.getContext();
    
    // Victory fanfare
    const notes = [523, 659, 784, 1047]; // C, E, G, High C
    notes.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + (index * 0.2);
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  }
}

export const audioManager = new AudioManager();
