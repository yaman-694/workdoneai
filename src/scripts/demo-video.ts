import { motionAllowed } from './motion';

const VISIBLE_RATIO = 0.4;

function play(video: HTMLVideoElement): void {
  // Browsers may refuse playback (data saver, power mode); the poster then stays up.
  video.play().catch(() => undefined);
}

/** Muted autoplay while the video is on screen, paused once it scrolls away. */
function autoplayInView(video: HTMLVideoElement): void {
  const observer = new IntersectionObserver(
    ([entry]) => (entry.intersectionRatio >= VISIBLE_RATIO ? play(video) : video.pause()),
    { threshold: [0, VISIBLE_RATIO] },
  );
  observer.observe(video);
}

/** Reduced motion: nothing moves until the visitor presses play. */
function playOnRequest(video: HTMLVideoElement, button: HTMLButtonElement): void {
  button.classList.replace('hidden', 'grid');
  button.addEventListener('click', () => {
    button.classList.replace('grid', 'hidden');
    play(video);
  });
}

function showSoundState(button: HTMLButtonElement, soundOn: boolean): void {
  button.setAttribute('aria-pressed', String(soundOn));
  button.querySelector('[data-sound-off]')?.classList.toggle('hidden', soundOn);
  button.querySelector('[data-sound-off]')?.classList.toggle('flex', !soundOn);
  button.querySelector('[data-sound-on]')?.classList.toggle('hidden', !soundOn);
  button.querySelector('[data-sound-on]')?.classList.toggle('flex', soundOn);
}

/** Turning sound on restarts the video so the voiceover is heard from the top. */
function bindSound(video: HTMLVideoElement, button: HTMLButtonElement, playButton: HTMLButtonElement | null): void {
  button.addEventListener('click', () => {
    const soundOn = video.muted;
    video.muted = !soundOn;
    if (soundOn) {
      video.currentTime = 0;
      playButton?.classList.replace('grid', 'hidden');
      play(video);
    }
    showSoundState(button, soundOn);
  });
}

function initDemoVideo(figure: HTMLElement): void {
  const video = figure.querySelector('video');
  const playButton = figure.querySelector<HTMLButtonElement>('[data-demo-play]');
  const soundButton = figure.querySelector<HTMLButtonElement>('[data-demo-sound]');
  if (!video || !playButton || !soundButton) return;

  bindSound(video, soundButton, playButton);
  if (motionAllowed()) {
    autoplayInView(video);
    return;
  }
  playOnRequest(video, playButton);
}

export function initDemoVideos(): void {
  document.querySelectorAll<HTMLElement>('[data-demo-video]').forEach(initDemoVideo);
}
