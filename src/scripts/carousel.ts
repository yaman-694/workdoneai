const pad = (n: number) => String(n).padStart(2, '0');

interface Parts {
  track: HTMLElement;
  slides: HTMLElement[];
  prev: HTMLButtonElement | null;
  next: HTMLButtonElement | null;
  count: HTMLElement | null;
  progress: HTMLElement | null;
}

function getParts(root: HTMLElement): Parts | null {
  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  if (!track) return null;
  return {
    track,
    slides: Array.from(track.querySelectorAll<HTMLElement>('[data-slide]')),
    prev: root.querySelector('[data-carousel-prev]'),
    next: root.querySelector('[data-carousel-next]'),
    count: root.querySelector('[data-carousel-count]'),
    progress: root.querySelector('[data-carousel-progress]'),
  };
}

const maxScroll = (track: HTMLElement) => track.scrollWidth - track.clientWidth;
const atEnd = (track: HTMLElement) => track.scrollLeft >= maxScroll(track) - 2;

/** Index of the slide nearest the track's start edge. */
function currentIndex({ track, slides }: Parts): number {
  if (atEnd(track)) return slides.length - 1;
  const start = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).scrollPaddingLeft || '0');
  let best = 0;
  slides.forEach((slide, i) => {
    const distance = Math.abs(slide.getBoundingClientRect().left - start);
    const bestDistance = Math.abs(slides[best].getBoundingClientRect().left - start);
    if (distance < bestDistance) best = i;
  });
  return best;
}

function render(parts: Parts): void {
  const index = currentIndex(parts);
  const total = parts.slides.length;
  if (parts.count) parts.count.textContent = `${pad(index + 1)} / ${pad(total)}`;
  if (parts.progress) parts.progress.style.width = `${((index + 1) / total) * 100}%`;
  if (parts.prev) parts.prev.disabled = parts.track.scrollLeft <= 2;
  if (parts.next) parts.next.disabled = atEnd(parts.track);
}

function goTo(parts: Parts, index: number): void {
  const slide = parts.slides[Math.max(0, Math.min(index, parts.slides.length - 1))];
  const padding = parseFloat(getComputedStyle(parts.track).scrollPaddingLeft || '0');
  const offset = slide.getBoundingClientRect().left - parts.track.getBoundingClientRect().left;
  const left = parts.track.scrollLeft + offset - padding;
  parts.track.scrollTo({ left, behavior: 'smooth' });
}

/** Lets mouse users drag the track like a touch swipe; snapping resumes on release. */
function enableMouseDrag(track: HTMLElement): void {
  let startX = 0;
  let startLeft = 0;
  let dragging = false;

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    dragging = true;
    startX = event.clientX;
    startLeft = track.scrollLeft;
    track.style.scrollSnapType = 'none';
    track.style.cursor = 'grabbing';
  });
  window.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    track.scrollLeft = startLeft - (event.clientX - startX);
  });
  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    track.style.cursor = '';
    track.style.scrollSnapType = '';
  });
  track.addEventListener('dragstart', (event) => event.preventDefault());
}

function initCarousel(root: HTMLElement): void {
  const parts = getParts(root);
  if (!parts || parts.slides.length === 0) return;

  parts.prev?.addEventListener('click', () => goTo(parts, currentIndex(parts) - 1));
  parts.next?.addEventListener('click', () => goTo(parts, currentIndex(parts) + 1));

  let queued = false;
  parts.track.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        render(parts);
      });
    },
    { passive: true },
  );
  window.addEventListener('resize', () => render(parts));
  enableMouseDrag(parts.track);
  render(parts);
}

/** Native scroll-snap carousels: swipe on touch, drag or arrows on desktop. */
export function initCarousels(): void {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(initCarousel);
}
