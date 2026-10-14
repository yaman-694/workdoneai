import { gsap, ScrollTrigger, SplitText } from './motion';

const ENTER = 'top 88%';

const all = <T extends Element = HTMLElement>(selector: string) => gsap.utils.toArray<T>(selector);

/**
 * The hero is the first screen, so its content plays on load; on short screens its lower edge
 * sits below the ENTER line and would otherwise stay hidden until the visitor scrolls.
 */
const onEnter = (el: Element) => (el.closest('#top') ? {} : { scrollTrigger: { trigger: el, start: ENTER, once: true } });

/** Blocks and grouped children fade up as they enter. */
function revealBlocks(): void {
  all('[data-reveal]').forEach((el) => {
    gsap.fromTo(el, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, ...onEnter(el) });
  });
  all('[data-reveal-stagger]').forEach((group) => {
    gsap.fromTo(group.children, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, stagger: 0.08, ...onEnter(group) });
  });
}

/** Large headings rise in line by line from behind a mask. */
function splitHeadings(): void {
  all('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(split) {
        gsap.set(el, { visibility: 'visible' });
        return gsap.from(split.lines, {
          yPercent: 105,
          stagger: 0.09,
          duration: 1.1,
          ease: 'power4.out',
          ...onEnter(el),
        });
      },
    });
  });
}

function formatCount(el: HTMLElement, value: number): string {
  return `${el.dataset.prefix ?? ''}${Math.round(value)}${el.dataset.suffix ?? ''}`;
}

/** Numbers count up from zero the first time they are seen. */
function counters(): void {
  all('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const state = { value: 0 };
    gsap.to(state, {
      value: target,
      duration: 1.8,
      ease: 'power2.out',
      onStart: () => (el.textContent = formatCount(el, 0)),
      onUpdate: () => (el.textContent = formatCount(el, state.value)),
      ...onEnter(el),
    });
  });
}

/** Bars, strike-throughs and connector lines draw themselves. */
function drawLines(): void {
  all('[data-bar]').forEach((bar) => {
    gsap.from(bar, { scaleX: 0, duration: 1.6, ease: 'power3.inOut', scrollTrigger: { trigger: bar, start: ENTER, once: true } });
  });
  all('[data-strike-list]').forEach((list) => {
    gsap.from(list.querySelectorAll('[data-strike]'), {
      scaleX: 0,
      stagger: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: list, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
    });
  });
  all('[data-line]').forEach((line) => {
    gsap.from(line, { scaleY: 0, duration: 0.8, scrollTrigger: { trigger: line, start: ENTER, once: true } });
  });
}

/** The hero photo settles in with a slow zoom. */
function heroMedia(): void {
  const media = document.querySelector('[data-hero-media]');
  if (media) gsap.fromTo(media, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'power2.out' });
}

export function initReveals(): void {
  heroMedia();
  splitHeadings();
  revealBlocks();
  counters();
  drawLines();
  // Fonts and images can shift layout after load; keep trigger positions accurate.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
