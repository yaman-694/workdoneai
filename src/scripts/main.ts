import { initCarousels } from './carousel';
import { initContactForms } from './contact-form';
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
initAnchorLinks();

if (motionAllowed()) {
  initSmoothScroll();
  initReveals();
}
initShowcases();

document.documentElement.classList.add('motion-ready');
