const SCROLLED_AT = 24;

function heroBottom(): number {
  const hero = document.getElementById('top');
  return hero ? hero.offsetHeight - 80 : 0;
}

/** Shrinks the header on scroll and, over a dark hero, turns it solid once past the hero. */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const overlay = header.hasAttribute('data-overlay');

  const update = () => {
    const y = window.scrollY;
    header.toggleAttribute('data-scrolled', y > SCROLLED_AT);
    if (overlay) header.toggleAttribute('data-solid', y > heroBottom());
  };

  let queued = false;
  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    },
    { passive: true },
  );
  update();
}
