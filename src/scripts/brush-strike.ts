// "Stop doing work your system can do": each chore is crossed out with a real marker stroke.
// p5.brush paints every stroke once into a shared offscreen WebGL canvas; each row then copies its
// stroke and reveals it left to right in time with a pen-on-paper sound.
import { gsap, motionAllowed, ScrollTrigger } from './motion';
import { playStrokeSound, unlockOnGesture } from './paper-sound';

import type { Point } from 'p5.brush/standalone';

type Brush = typeof import('p5.brush/standalone');

const STROKE_SECONDS = 0.55;
const INK = '#7a4f4f';
const PAPER = '#ffffff';
const DONE_TEXT = '#8a8699';

interface Row {
  text: HTMLElement;
  canvas: HTMLCanvasElement;
  bar: HTMLElement | null;
  mark: HTMLElement | null;
}

function rowsOf(list: HTMLElement): Row[] {
  return Array.from(list.querySelectorAll<HTMLElement>('[data-strike-text]')).flatMap((text) => {
    const canvas = text.querySelector<HTMLCanvasElement>('[data-strike-brush]');
    if (!canvas) return [];
    return [{ text, canvas, bar: text.querySelector('[data-strike]'), mark: text.closest('li')?.querySelector('[data-strike-mark]') ?? null }];
  });
}

function supportsWebGL2(): boolean {
  return Boolean(document.createElement('canvas').getContext('webgl2'));
}

/** A hand-drawn line: starts a touch low, wanders, and finishes slightly high, like a quick cross-out. */
const PRESSURE = [0.9, 1.1, 1, 0.85];
/** Dry charcoal reads as a quick brush cross-out; tuned visually against the built-in brushes. */
const BRUSH = 'charcoal';
const BRUSH_SCALE = 3;

interface Line {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** The text's line boxes relative to the canvas, so a wrapped chore gets one stroke per line. */
function linesOf(row: Row, ratio: number): Line[] {
  const label = Array.from(row.text.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
  if (!label) return [];
  const range = document.createRange();
  range.selectNodeContents(label);
  const origin = row.canvas.getBoundingClientRect();
  return Array.from(range.getClientRects())
    .filter((rect) => rect.width > 1)
    .map((rect) => ({
      x: (rect.left - origin.left) * ratio,
      y: (rect.top - origin.top) * ratio,
      width: rect.width * ratio,
      height: rect.height * ratio,
    }));
}

function strokePoints(line: Line, seed: number): Point[] {
  const band = line.height * 0.7;
  const wobble = band * 0.08;
  const rise = band * (0.08 + (seed % 3) * 0.03);
  const mid = line.y + line.height * 0.55;
  const pad = Math.min(line.width * 0.012, line.height * 0.2);
  return [0, 0.3, 0.62, 1].map((t, i) => [
    line.x - pad + (line.width + pad * 2) * t,
    mid + rise * (0.5 - t) + Math.sin(seed * 7.1 + i * 2.3) * wobble,
    PRESSURE[i],
  ]);
}

/** Paints a row's strokes into the shared WebGL canvas and copies them into the row's own 2D canvas. */
function paint(brush: Brush, source: HTMLCanvasElement, row: Row, seed: number): void {
  const ratio = window.devicePixelRatio || 1;
  const width = Math.round(row.canvas.clientWidth * ratio);
  const height = Math.round(row.canvas.clientHeight * ratio);
  if (width === 0 || height === 0) return;

  // p5.brush mixes pigment against the paper, so paint on white; the canvas multiplies onto the page.
  brush.clear(PAPER);
  brush.push();
  brush.translate(-source.width / 2, -source.height / 2);
  brush.seed(seed);
  brush.noiseSeed(seed);
  linesOf(row, ratio).forEach((line, i) => {
    brush.set(BRUSH, INK, (line.height * 0.7) / 23);
    brush.spline(strokePoints(line, seed + i), 0.6);
  });
  brush.pop();
  brush.render();

  row.canvas.width = width;
  row.canvas.height = height;
  row.canvas.getContext('2d')?.drawImage(source, 0, 0, width, height, 0, 0, width, height);
}

function paintAll(brush: Brush, source: HTMLCanvasElement, rows: Row[]): void {
  const ratio = window.devicePixelRatio || 1;
  source.width = Math.ceil(Math.max(...rows.map((r) => r.canvas.clientWidth)) * ratio);
  source.height = Math.ceil(Math.max(...rows.map((r) => r.canvas.clientHeight)) * ratio);
  brush.load(source);
  rows.forEach((row, i) => paint(brush, source, row, i + 1));
}

function showStruck(row: Row): void {
  gsap.set(row.canvas, { clipPath: 'inset(0 0% 0 0)' });
  gsap.set(row.text, { color: DONE_TEXT });
}

/** Marker sweeps across, the chore greys out and its cross pops in. */
function strike(row: Row): void {
  playStrokeSound(STROKE_SECONDS);
  gsap
    .timeline()
    .fromTo(row.canvas, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: STROKE_SECONDS, ease: 'power1.inOut' })
    .to(row.text, { color: DONE_TEXT, duration: 0.4 }, '-=0.2')
    .fromTo(row.mark, { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2.2)' }, '<');
}

function armRow(row: Row, animate: boolean): void {
  if (!animate) return showStruck(row);
  gsap.set(row.canvas, { clipPath: 'inset(0 100% 0 0)' });
  if (row.mark) gsap.set(row.mark, { scale: 0 });
  ScrollTrigger.create({ trigger: row.text, start: 'top 72%', once: true, onEnter: () => strike(row) });
}

function useBrushCanvases(rows: Row[]): void {
  rows.forEach((row) => {
    row.bar?.classList.add('hidden');
    row.canvas.classList.remove('hidden');
  });
}

async function initList(list: HTMLElement): Promise<void> {
  const rows = rowsOf(list);
  if (rows.length === 0 || !supportsWebGL2()) return;
  const brush: Brush = await import('p5.brush/standalone');
  const source = document.createElement('canvas');

  useBrushCanvases(rows);
  brush.scaleBrushes(BRUSH_SCALE);
  paintAll(brush, source, rows);
  rows.forEach((row) => armRow(row, motionAllowed()));

  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    paintAll(brush, source, rows);
  });
}

/** Loads the brush library only when the list is about to scroll into view. */
export function initBrushStrikes(): void {
  const lists = document.querySelectorAll<HTMLElement>('[data-strike-list]');
  if (lists.length === 0) return;
  unlockOnGesture();
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        void initList(entry.target as HTMLElement);
      }),
    { rootMargin: '600px 0px' },
  );
  lists.forEach((list) => observer.observe(list));
}
