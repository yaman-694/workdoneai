import type { APIRoute } from 'astro';
import { CONTACT_WEBHOOK_SECRET, CONTACT_WEBHOOK_URL, TURNSTILE_SECRET_KEY } from 'astro:env/server';
import { isSpamTrapFilled, parseSubmission, readString, type RequestBody } from '../../server/contact/submission';
import { TURNSTILE_FIELD, verifyTurnstile } from '../../server/contact/turnstile';
import { forwardToWebhook } from '../../server/contact/webhook';

export const prerender = false;

/** The form sends a few kilobytes at most; anything far bigger is not a real submission. */
const MAX_BODY_LENGTH = 16_000;

function reply(status: number): Response {
  return new Response(JSON.stringify({ ok: status === 200 }), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

function isPlainObject(value: unknown): value is RequestBody {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function readBody(request: Request): Promise<RequestBody | null> {
  const raw = await request.text();
  if (raw.length > MAX_BODY_LENGTH) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isPlainObject(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Receives the contact form, so the n8n webhook URL and its secret never reach the browser.
 * Order matters: cheap checks first, then Turnstile, then the forward to n8n.
 */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  const body = await readBody(request);
  if (!body) return reply(400);
  // Pretend success so bots that fill the trap learn nothing.
  if (isSpamTrapFilled(body)) return reply(200);

  const submission = parseSubmission(body);
  if (!submission) return reply(400);

  const isHuman = await verifyTurnstile(TURNSTILE_SECRET_KEY, readString(body, TURNSTILE_FIELD), clientAddress);
  if (!isHuman) return reply(403);

  const delivered = await forwardToWebhook(submission, { url: CONTACT_WEBHOOK_URL, secret: CONTACT_WEBHOOK_SECRET });
  return reply(delivered ? 200 : 502);
};
