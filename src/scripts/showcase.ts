import { gsap, motionAllowed, ScrollTrigger } from './motion';

const STEP_SECONDS = 0.55;
const HOLD_SECONDS = 0.35;

interface Point {
  x: number;
  y: number;
}

/** Centre of a node relative to its flow list, offset so the dot sits on it. */
function centreOf(node: HTMLElement, flow: HTMLElement, dot: HTMLElement): Point {
  const n = node.getBoundingClientRect();
  const f = flow.getBoundingClientRect();
  return {
    x: n.left - f.left + n.width / 2 - dot.offsetWidth / 2,
    y: n.top - f.top + n.height / 2 - dot.offsetHeight / 2,
  };
}

/** The dot travels node to node, lighting each one, then loops. */
function buildFlow(panel: HTMLElement): gsap.core.Timeline | null {
  const flow = panel.querySelector<HTMLElement>('[data-flow]');
  const dot = panel.querySelector<HTMLElement>('[data-dot]');
  const nodes = Array.from(panel.querySelectorAll<HTMLElement>('[data-node]'));
  if (!flow || !dot || nodes.length === 0) return null;

  nodes.forEach((node) => node.removeAttribute('data-active'));
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
  tl.set(dot, { ...centreOf(nodes[0], flow, dot), autoAlpha: 1 });
  nodes.forEach((node, i) => {
    if (i > 0) tl.to(dot, { ...centreOf(node, flow, dot), duration: STEP_SECONDS, ease: 'power2.inOut' });
    tl.call(() => node.setAttribute('data-active', ''));
    tl.to({}, { duration: HOLD_SECONDS });
  });
  tl.to(dot, { autoAlpha: 0, duration: 0.3 });
  tl.call(() => nodes.forEach((node) => node.removeAttribute('data-active')));
  return tl;
}

function initShowcase(root: HTMLElement): void {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
  const animate = motionAllowed();
  let timeline: gsap.core.Timeline | null = null;
  let inView = false;
  let active = 0;

  const play = () => {
    timeline?.kill();
    timeline = animate ? buildFlow(panels[active]) : null;
    if (timeline && inView) timeline.play();
  };

  const select = (index: number, focus = false) => {
    active = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panels.forEach((panel, i) => (panel.hidden = i !== index));
    if (focus) tabs[index].focus();
    tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    if (animate) gsap.fromTo(panels[index], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5 });
    play();
  };

  const keys: Record<string, (i: number) => number> = {
    ArrowRight: (i) => (i + 1) % tabs.length,
    ArrowDown: (i) => (i + 1) % tabs.length,
    ArrowLeft: (i) => (i - 1 + tabs.length) % tabs.length,
    ArrowUp: (i) => (i - 1 + tabs.length) % tabs.length,
    Home: () => 0,
    End: () => tabs.length - 1,
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (event) => {
      const next = keys[event.key];
      if (!next) return;
      event.preventDefault();
      select(next(i), true);
    });
  });

  ScrollTrigger.create({
    trigger: root,
    start: 'top 80%',
    end: 'bottom 20%',
    onToggle: (self) => {
      inView = self.isActive;
      if (inView) timeline?.play();
      else timeline?.pause();
    },
  });

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(play, 200);
  });
  play();
}

/** "See automation in action": accessible tabs that run each business's workflow. */
export function initShowcases(): void {
  document.querySelectorAll<HTMLElement>('[data-showcase]').forEach(initShowcase);
}
