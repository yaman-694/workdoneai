import { gsap, motionAllowed } from './motion';

const VISIBLE_RATIO = 0.4;
const PHONE_QUERY = '(max-width: 639px)';

interface Player {
  root: HTMLElement;
  frame: HTMLElement;
  video: HTMLVideoElement;
  playButton: HTMLButtonElement;
  soundCta: HTMLButtonElement;
  muteButton: HTMLButtonElement;
  live: HTMLElement | null;
  chapters: HTMLButtonElement[];
}

function find(root: HTMLElement): Player | null {
  const pick = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector);
  const frame = pick<HTMLElement>('[data-demo-frame]');
  const video = pick<HTMLVideoElement>('video');
  const playButton = pick<HTMLButtonElement>('[data-demo-play]');
  const soundCta = pick<HTMLButtonElement>('[data-sound-cta]');
  const muteButton = pick<HTMLButtonElement>('[data-sound-mute]');
  if (!frame || !video || !playButton || !soundCta || !muteButton) return null;
  const chapters = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-chapter]'));
  return { root, frame, video, playButton, soundCta, muteButton, live: pick('[data-demo-live]'), chapters };
}

function play(video: HTMLVideoElement): void {
  // Browsers may refuse playback (data saver, power mode); the poster then stays up.
  video.play().catch(() => undefined);
}

/** Phones get the vertical cut, where the chat stays readable at 390px wide. */
function useVerticalCutOnPhones(video: HTMLVideoElement): void {
  if (!window.matchMedia(PHONE_QUERY).matches) return;
  const sources = video.dataset.mobileSources?.split(',') ?? [];
  video.querySelectorAll('source').forEach((source, i) => {
    if (sources[i]) source.src = sources[i];
  });
  if (video.dataset.mobilePoster) video.poster = video.dataset.mobilePoster;
  video.load();
}

/** The video grows into place as it scrolls in, which pulls the eye before it starts playing. */
function scrollEntrance(frame: HTMLElement): void {
  gsap.fromTo(
    frame,
    { scale: 0.86, borderRadius: 28 },
    { scale: 1, borderRadius: 4, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'top 35%', scrub: 0.6 } },
  );
}

/** Muted autoplay while the video is on screen, paused once it scrolls away. */
function autoplayInView(video: HTMLVideoElement, onFirstView: () => void): void {
  let seen = false;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio < VISIBLE_RATIO) return video.pause();
      play(video);
      if (!seen) onFirstView();
      seen = true;
    },
    { threshold: [0, VISIBLE_RATIO] },
  );
  observer.observe(video);
}

/** Reduced motion: nothing moves until the visitor presses play. */
function playOnRequest(player: Player): void {
  player.playButton.classList.replace('hidden', 'grid');
  player.playButton.addEventListener('click', () => {
    player.playButton.classList.replace('grid', 'hidden');
    play(player.video);
  });
}

/** Two rings keep rippling out of the sound button until the visitor turns sound on. */
function buildRipple(cta: HTMLElement): gsap.core.Timeline {
  const rings = cta.querySelectorAll('[data-sound-ripple]');
  return gsap
    .timeline({ repeat: -1, repeatDelay: 0.6, paused: true })
    .fromTo(rings, { scale: 1, autoAlpha: 0.7 }, { scale: 1.5, autoAlpha: 0, duration: 1.4, ease: 'power2.out', stagger: 0.35 });
}

/** Equalizer bars bounce while sound is on, so it is obvious something is playing. */
function buildEqualizer(button: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });
  button.querySelectorAll('[data-eq]').forEach((bar, i) => {
    tl.fromTo(bar, { scaleY: 0.25 }, { scaleY: 1, duration: 0.32 + i * 0.07, ease: 'sine.inOut', repeat: -1, yoyo: true }, i * 0.08);
  });
  return tl;
}

function popIn(el: HTMLElement): void {
  gsap.fromTo(el, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'back.out(2)' });
}

function swap(hide: HTMLElement, show: HTMLElement, animate: boolean): void {
  hide.hidden = true;
  show.hidden = false;
  if (animate) popIn(show);
}

/** Turning sound on restarts the video so the voiceover is heard from the top. */
function bindSound(player: Player, animate: boolean): { nudge: () => void } {
  const { video, soundCta, muteButton, playButton } = player;
  const ripple = buildRipple(soundCta);
  const equalizer = buildEqualizer(muteButton);
  const syncEqualizer = () => (!video.muted && !video.paused ? equalizer.play() : equalizer.pause());

  soundCta.addEventListener('click', () => {
    video.muted = false;
    video.currentTime = 0;
    playButton.classList.replace('grid', 'hidden');
    play(video);
    ripple.pause();
    swap(soundCta, muteButton, animate);
    syncEqualizer();
  });
  muteButton.addEventListener('click', () => {
    video.muted = true;
    swap(muteButton, soundCta, animate);
    if (animate) ripple.restart();
    syncEqualizer();
  });
  video.addEventListener('play', syncEqualizer);
  video.addEventListener('pause', syncEqualizer);

  return {
    nudge: () => {
      if (!animate || !video.muted) return;
      popIn(soundCta);
      ripple.restart(true);
    },
  };
}

/** "Now playing" badge with a breathing dot, shown only while the video runs. */
function bindLiveBadge(video: HTMLVideoElement, live: HTMLElement | null, animate: boolean): void {
  if (!live) return;
  const pulse = live.querySelector('[data-live-pulse]');
  const breathe = animate && pulse ? gsap.to(pulse, { scale: 2.6, autoAlpha: 0, duration: 1.2, repeat: -1, ease: 'power1.out', paused: true }) : null;
  video.addEventListener('play', () => {
    gsap.to(live, { autoAlpha: 1, duration: 0.3 });
    breathe?.play();
  });
  video.addEventListener('pause', () => {
    gsap.to(live, { autoAlpha: 0, duration: 0.3 });
    breathe?.pause();
  });
}

function chapterStart(button: HTMLButtonElement): number {
  return Number(button.dataset.start ?? 0);
}

/** Fills each chapter bar in step with the video and lets visitors jump between chapters. */
function bindChapters(video: HTMLVideoElement, chapters: HTMLButtonElement[]): void {
  if (chapters.length === 0) return;
  const fills = chapters.map((button) => button.querySelector<HTMLElement>('[data-chapter-fill]'));
  const ends = chapters.map((_, i) => (i + 1 < chapters.length ? chapterStart(chapters[i + 1]) : null));

  const paint = () => {
    const now = video.currentTime;
    const end = video.duration || now;
    chapters.forEach((button, i) => {
      const start = chapterStart(button);
      const stop = ends[i] ?? end;
      const share = Math.min(Math.max((now - start) / (stop - start), 0), 1);
      fills[i]?.style.setProperty('transform', `scaleX(${share})`);
      button.toggleAttribute('data-active', now >= start && now < stop);
    });
  };

  gsap.ticker.add(() => {
    if (!video.paused) paint();
  });
  video.addEventListener('seeked', paint);
  chapters.forEach((button) =>
    button.addEventListener('click', () => {
      video.currentTime = chapterStart(button);
      play(video);
    }),
  );
}

function initDemoVideo(root: HTMLElement): void {
  const player = find(root);
  if (!player) return;
  const animate = motionAllowed();

  useVerticalCutOnPhones(player.video);
  const sound = bindSound(player, animate);
  bindLiveBadge(player.video, player.live, animate);
  bindChapters(player.video, player.chapters);

  if (!animate) {
    playOnRequest(player);
    return;
  }
  scrollEntrance(player.frame);
  autoplayInView(player.video, sound.nudge);
}

export function initDemoVideos(): void {
  document.querySelectorAll<HTMLElement>('[data-demo-video]').forEach(initDemoVideo);
}
