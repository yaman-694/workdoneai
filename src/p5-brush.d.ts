// p5.brush ships no type definitions; this covers the standalone API the site uses.
// Reference: https://github.com/acamposuribe/p5.brush/blob/main/docs/standalone.md
declare module 'p5.brush/standalone' {
  /** `[x, y]` or `[x, y, pressure]`; pressure shapes the stroke width along the curve. */
  export type Point = [number, number] | [number, number, number];
  export function load(canvas: HTMLCanvasElement | OffscreenCanvas): void;
  export function scaleBrushes(scale: number): void;
  export function seed(n: number): void;
  export function noiseSeed(n: number): void;
  export function clear(color?: string): void;
  export function push(): void;
  export function pop(): void;
  export function translate(x: number, y: number): void;
  export function set(brushName: string, color: string, weight: number): void;
  export function spline(points: Point[], curvature?: number): void;
  export function render(): void;
}
