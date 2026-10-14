// A marker scratching across paper, synthesized with Web Audio so there is no file to download.
// Browsers only allow sound after the visitor has interacted with the page (a click, tap or key press),
// so strokes stay silent until then.

const VOLUME = 0.22;
const GRAIN_HZ = 34;

let context: AudioContext | null = null;
let noise: AudioBuffer | null = null;

function hasInteracted(): boolean {
  return navigator.userActivation?.hasBeenActive ?? false;
}

function ensureContext(): AudioContext | null {
  if (!context && hasInteracted()) context = new AudioContext();
  if (context?.state === 'suspended') void context.resume();
  return context;
}

function noiseBuffer(ctx: AudioContext): AudioBuffer {
  if (noise) return noise;
  noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return noise;
}

/** Fibre texture: the nib catches the paper grain many times a second, never evenly. */
function scheduleGrain(gain: GainNode, start: number, seconds: number): void {
  const steps = Math.ceil(seconds * GRAIN_HZ);
  for (let i = 0; i <= steps; i++) {
    const level = VOLUME * (0.45 + Math.random() * 0.55);
    gain.gain.linearRampToValueAtTime(level, start + (i / steps) * seconds);
  }
}

function envelope(ctx: AudioContext, start: number, seconds: number): GainNode {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(VOLUME, start + 0.025);
  scheduleGrain(gain, start + 0.025, Math.max(seconds - 0.1, 0.05));
  gain.gain.linearRampToValueAtTime(0, start + seconds);
  return gain;
}

/** Plays one stroke of the given length. Silent when audio is not allowed yet. */
export function playStrokeSound(seconds: number): void {
  const ctx = ensureContext();
  if (!ctx || ctx.state !== 'running') return;

  const start = ctx.currentTime;
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer(ctx);
  source.playbackRate.value = 0.9 + Math.random() * 0.2;

  const body = ctx.createBiquadFilter();
  body.type = 'bandpass';
  body.frequency.setValueAtTime(2600, start);
  body.frequency.linearRampToValueAtTime(3400, start + seconds);
  body.Q.value = 0.9;

  const air = ctx.createBiquadFilter();
  air.type = 'highshelf';
  air.frequency.value = 6000;
  air.gain.value = -8;

  source.connect(body).connect(air).connect(envelope(ctx, start, seconds)).connect(ctx.destination);
  source.start(start, Math.random() * 0.5);
  source.stop(start + seconds + 0.05);
}

/** Safari keeps a context suspended until a gesture, so resume it on the first one. */
export function unlockOnGesture(): void {
  const unlock = () => ensureContext();
  ['pointerdown', 'keydown', 'touchend'].forEach((type) => window.addEventListener(type, unlock, { passive: true }));
}
