/** The subset of Cloudflare's Turnstile browser API this site uses. */
interface TurnstileApi {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  reset(widgetId: string): void;
  getResponse(widgetId: string): string | undefined;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/** Must be loaded from this exact URL; Cloudflare does not support proxying or caching it. */
const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let loading: Promise<TurnstileApi> | undefined;

function injectScript(): Promise<TurnstileApi> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.addEventListener('load', () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile missing'))));
    script.addEventListener('error', () => reject(new Error('Turnstile failed to load')));
    document.head.append(script);
  });
}

function loadTurnstile(): Promise<TurnstileApi> {
  loading ??= injectScript();
  return loading;
}

export interface TurnstileWidget {
  /** The current token, or an empty string while the check has not passed yet. */
  token(): string;
  /** Tokens are single use, so reset after every submit. */
  reset(): void;
}

/**
 * Renders an invisible-unless-needed Turnstile check into the container, flagging it
 * with `data-interactive` while Cloudflare asks the visitor to click.
 * The widget adds a hidden `cf-turnstile-response` input, so the token travels with the form data.
 */
export async function renderTurnstile(container: HTMLElement): Promise<TurnstileWidget> {
  const turnstile = await loadTurnstile();
  const widgetId = turnstile.render(container, {
    sitekey: container.dataset.sitekey,
    appearance: 'interaction-only',
    size: 'flexible',
    // Lets CSS give the widget room only while the visitor has to interact with it.
    'before-interactive-callback': () => (container.dataset.interactive = ''),
    'after-interactive-callback': () => delete container.dataset.interactive,
  });
  return {
    token: () => turnstile.getResponse(widgetId) ?? '',
    reset: () => turnstile.reset(widgetId),
  };
}
