import { OTHER_OPTION } from '../data/contact-form';
import { renderTurnstile, type TurnstileWidget } from './turnstile';

const messages = {
  invalid: 'Please fill in the required fields so we can get back to you.',
  checking: "One moment, we're checking you're not a bot. Please try again in a few seconds.",
  checkUnavailable: "Our spam check couldn't load. Please allow challenges.cloudflare.com (or pause your blocker) and reload.",
  sending: 'Sending...',
  sent: "Thanks. We've got your request and will be in touch shortly.",
  rejected: "We couldn't verify this request. Please reload the page and try again.",
  failed: 'Something went wrong. Please try again in a moment.',
} as const;

type Status = keyof typeof messages;

/** How the /api/contact response codes map to what the visitor sees. */
const statusByResponseCode: Record<number, Status> = {
  200: 'sent',
  400: 'invalid',
  403: 'rejected',
};

function setStatus(form: HTMLFormElement, status: Status): void {
  const output = form.querySelector<HTMLElement>('[data-form-status]');
  if (output) output.textContent = messages[status];
  form.querySelector<HTMLButtonElement>('[data-submit]')!.disabled = status === 'sending';
}

async function submit(form: HTMLFormElement): Promise<Status> {
  const response = await fetch(form.action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), page: window.location.pathname }),
  });
  return statusByResponseCode[response.status] ?? 'failed';
}

/** Resolves to null when the Turnstile script is blocked or fails, so the form can say so. */
async function initTurnstile(form: HTMLFormElement): Promise<TurnstileWidget | null> {
  const container = form.querySelector<HTMLElement>('[data-turnstile]');
  if (!container) return null;
  return renderTurnstile(container).catch(() => null);
}

/** Picks the status to show when the bot check has no token yet. */
function missingTokenStatus(widget: TurnstileWidget | null): Status {
  return widget ? 'checking' : 'checkUnavailable';
}

/** Shows the free-text box tied to a select only while its "Other" option is picked. */
function syncOtherField(form: HTMLFormElement, select: HTMLSelectElement): void {
  const wrapper = form.querySelector<HTMLElement>(`[data-other-field="${select.dataset.otherTarget}"]`);
  const input = wrapper?.querySelector<HTMLInputElement>('input');
  if (!wrapper || !input) return;
  const isOther = select.value === OTHER_OPTION;
  wrapper.hidden = !isOther;
  input.disabled = !isOther;
  input.required = isOther;
}

function initOtherFields(form: HTMLFormElement): () => void {
  const selects = [...form.querySelectorAll<HTMLSelectElement>('select[data-other-target]')];
  const syncAll = () => selects.forEach((select) => syncOtherField(form, select));
  selects.forEach((select) => select.addEventListener('change', () => syncOtherField(form, select)));
  return syncAll;
}

/** Posts the contact form as JSON to the site's /api/contact endpoint, which forwards it to n8n. */
export function initContactForms(): void {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
    const syncOtherFields = initOtherFields(form);
    const turnstile = initTurnstile(form);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const honeypot = form.elements.namedItem('website') as HTMLInputElement | null;
      if (honeypot?.value) return setStatus(form, 'sent');
      if (!form.checkValidity()) {
        form.reportValidity();
        return setStatus(form, 'invalid');
      }
      const widget = await turnstile;
      if (!widget?.token()) return setStatus(form, missingTokenStatus(widget));
      setStatus(form, 'sending');
      const status = await submit(form).catch((): Status => 'failed');
      setStatus(form, status);
      widget.reset();
      if (status !== 'sent') return;
      form.reset();
      syncOtherFields();
    });
  });
}
