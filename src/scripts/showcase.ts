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

const MORPH_SECONDS = 0.55;

/** Glides the shared highlight onto the selected tab, so the selection morphs instead of snapping. */
function moveIndicator(indicator: HTMLElement, tab: HTMLElement, animate: boolean): void {
  const box = { x: tab.offsetLeft, y: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight, autoAlpha: 1 };
  if (!animate) {
    gsap.killTweensOf(indicator);
    gsap.set(indicator, box);
    return;
  }
  gsap.to(indicator, { ...box, duration: MORPH_SECONDS, ease: 'power3.inOut', overwrite: true });
}

/**
 * The card stays put and eases to the new height while the old content fades up and away
 * and the new content rises in, so switching workflows reads as one continuous morph.
 */
function morphPanels(stage: HTMLElement, from: HTMLElement, to: HTMLElement, onDone: () => void): gsap.core.Timeline {
  gsap.set(stage, { height: stage.offsetHeight });
  gsap.set(from, { position: 'absolute', top: 0, left: 0, right: 0 });
  to.hidden = false;
  return gsap
    .timeline({ onComplete: onDone })
    .to(from, { autoAlpha: 0, y: -10, duration: 0.2, ease: 'power2.in' }, 0)
    .to(stage, { height: to.offsetHeight, duration: MORPH_SECONDS, ease: 'power3.inOut' }, 0)
    .fromTo(to.children, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 }, 0.15)
    .fromTo(to.querySelectorAll('li'), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.04 }, 0.2);
}

function initShowcase(root: HTMLElement): void {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
  const stage = root.querySelector<HTMLElement>('[data-stage]');
  const indicator = root.querySelector<HTMLElement>('[data-indicator]');
  if (!stage || !indicator) return;
  const animate = motionAllowed();
  let timeline: gsap.core.Timeline | null = null;
  let morph: gsap.core.Timeline | null = null;
  let inView = false;
  let active = 0;

  const play = () => {
    timeline?.kill();
    timeline = animate ? buildFlow(panels[active]) : null;
    if (timeline && inView) timeline.play();
  };

  /** Ends any running morph and leaves only the active panel showing, with no leftover inline styles. */
  const settle = () => {
    morph?.kill();
    morph = null;
    const animated = [stage, ...panels, ...panels.flatMap((panel) => [...panel.children, ...panel.querySelectorAll('li')])];
    gsap.set(animated, { clearProps: 'all' });
    panels.forEach((panel, i) => (panel.hidden = i !== active));
    play();
  };

  const showPanel = (from: number) => {
    timeline?.kill();
    if (!animate) {
      settle();
      return;
    }
    morph = morphPanels(stage, panels[from], panels[active], settle);
  };

  const select = (index: number, focus = false) => {
    if (focus) tabs[index].focus();
    if (index === active) return;
    if (morph) settle();
    const from = active;
    active = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    moveIndicator(indicator, tabs[index], animate);
    showPanel(from);
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
  // Tab sizes shift as web fonts load and the layout reflows, so keep the highlight glued to the active tab.
  new ResizeObserver(() => moveIndicator(indicator, tabs[active], false)).observe(tabs[active].parentElement ?? root);
  play();
}

/** "See automation in action": accessible tabs that run each business's workflow. */
export function initShowcases(): void {
  document.querySelectorAll<HTMLElement>('[data-showcase]').forEach(initShowcase);
}
