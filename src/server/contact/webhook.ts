import type { ContactSubmission } from './submission';

/** n8n's Header Auth credential on the webhook must use this header name. */
const SECRET_HEADER = 'X-Webhook-Secret';

const TIMEOUT_MS = 10_000;

interface WebhookTarget {
  url: string;
  secret: string;
}

async function post(submission: ContactSubmission, target: WebhookTarget): Promise<boolean> {
  const response = await fetch(target.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', [SECRET_HEADER]: target.secret },
    body: JSON.stringify({ ...submission, submittedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return response.ok;
}

/** Sends a checked submission to the n8n workflow that stores it and emails the team. */
export async function forwardToWebhook(submission: ContactSubmission, target: WebhookTarget): Promise<boolean> {
  return post(submission, target).catch(() => false);
}
