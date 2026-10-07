/** Full-screen phone menu: opens from the header button, closes on link tap, Escape or the close button. */
export function initMobileMenu(): void {
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  if (!menu || !toggle) return;

  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector<HTMLElement>('[data-menu-close]')?.focus();
    else toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => setOpen(true));
  menu.querySelector('[data-menu-close]')?.addEventListener('click', () => setOpen(false));
  menu.querySelectorAll('[data-menu-link]').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) setOpen(false);
  });
}
