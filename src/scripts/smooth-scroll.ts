import { finePointer, gsap, motionAllowed, ScrollSmoother } from './motion';

const HEADER_OFFSET = 72;

let smoother: ScrollSmoother | null = null;

/** Inertia scrolling on desktop pointers; touch devices keep native scrolling. */
export function initSmoothScroll(): void {
  if (!motionAllowed() || !finePointer()) return;
  smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.1,
    effects: false,
  });
}

function samePageHash(link: HTMLAnchorElement): string | null {
  const url = new URL(link.href, window.location.href);
  const samePage = url.pathname === window.location.pathname && url.hash.length > 1;
  return samePage ? url.hash : null;
}

function scrollToTarget(target: Element): void {
  if (smoother) {
    smoother.scrollTo(target, true, `top ${HEADER_OFFSET}px`);
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  if (motionAllowed()) {
    gsap.to(window, { scrollTo: top, duration: 1, ease: 'power3.inOut' });
  } else {
    window.scrollTo(0, top);
  }
}

/** Anchor links glide to their section instead of jumping. */
export function initAnchorLinks(): void {
  document.addEventListener('click', (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link) return;
    const hash = samePageHash(link);
    const target = hash ? document.querySelector(hash) : null;
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target);
    history.replaceState(null, '', hash);
  });
}
