import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

/** Shared motion language: one ease and duration set across the site. */
gsap.defaults({ ease: 'power3.out', duration: 0.9 });

export const motionAllowed = (): boolean => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const finePointer = (): boolean => window.matchMedia('(pointer: fine)').matches;

export { gsap, ScrollSmoother, ScrollTrigger, SplitText };
