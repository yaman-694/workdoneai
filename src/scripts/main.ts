import { initBrushStrikes } from './brush-strike';
import { initCarousels } from './carousel';
import { initContactForms } from './contact-form';
import { initDemoVideos } from './demo-video';
import { initHeader } from './header';
import { initMobileCta } from './mobile-cta';
import { initMobileMenu } from './mobile-menu';
import { motionAllowed } from './motion';
import { initReveals } from './reveal';
import { initShowcases } from './showcase';
import { initAnchorLinks, initSmoothScroll } from './smooth-scroll';

initHeader();
initMobileMenu();
initMobileCta();
initCarousels();
initContactForms();
initDemoVideos();
initAnchorLinks();

if (motionAllowed()) {
  initSmoothScroll();
  initReveals();
}
initShowcases();
initBrushStrikes();

document.documentElement.classList.add('motion-ready');
