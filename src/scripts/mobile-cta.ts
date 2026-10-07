/** Shows the phone CTA after the hero and hides it while the contact form or footer is on screen. */
export function initMobileCta(): void {
  const bar = document.querySelector<HTMLElement>('[data-mobile-cta]');
  const hero = document.getElementById('top');
  if (!bar || !hero) return;

  const blockers = new Set<Element>();
  let pastHero = false;

  const render = () => bar.toggleAttribute('data-visible', pastHero && blockers.size === 0);

  new IntersectionObserver(([entry]) => {
    pastHero = !entry.isIntersecting;
    render();
  }).observe(hero);

  const blockerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => (entry.isIntersecting ? blockers.add(entry.target) : blockers.delete(entry.target)));
    render();
  });
  document.querySelectorAll('#contact, footer').forEach((el) => blockerObserver.observe(el));
}
