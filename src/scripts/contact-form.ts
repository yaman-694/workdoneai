const messages = {
  invalid: 'Please fill in every field so we can get back to you.',
  sending: 'Sending...',
  sent: "Thanks. We've got your request and will be in touch shortly.",
  failed: 'Something went wrong. Please try again in a moment.',
  notConfigured: 'The form is not connected yet. Set PUBLIC_CONTACT_WEBHOOK_URL to receive submissions.',
} as const;

type Status = keyof typeof messages;

function setStatus(form: HTMLFormElement, status: Status): void {
  const output = form.querySelector<HTMLElement>('[data-form-status]');
  if (output) output.textContent = messages[status];
  form.querySelector<HTMLButtonElement>('[data-submit]')!.disabled = status === 'sending';
}

function payload(form: HTMLFormElement): Record<string, string> {
  const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
  delete data.website;
  return { ...data, page: window.location.pathname, submittedAt: new Date().toISOString() };
}

async function submit(form: HTMLFormElement): Promise<Status> {
  const endpoint = form.dataset.endpoint;
  if (!endpoint) return 'notConfigured';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload(form)),
  });
  return response.ok ? 'sent' : 'failed';
}

/** Posts the contact form as JSON to the configured webhook (n8n). */
export function initContactForms(): void {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const honeypot = form.elements.namedItem('website') as HTMLInputElement | null;
      if (honeypot?.value) return setStatus(form, 'sent');
      if (!form.checkValidity()) {
        form.reportValidity();
        return setStatus(form, 'invalid');
      }
      setStatus(form, 'sending');
      const status = await submit(form).catch((): Status => 'failed');
      setStatus(form, status);
      if (status === 'sent') form.reset();
    });
  });
}
