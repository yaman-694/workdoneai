const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** Hidden input the Turnstile widget adds to the form. */
export const TURNSTILE_FIELD = 'cf-turnstile-response';

/** Cloudflare rejects longer tokens, so skip the network call for them. */
const MAX_TOKEN_LENGTH = 2048;

const TIMEOUT_MS = 5000;

interface SiteverifyResult {
  success?: boolean;
}

async function siteverify(secret: string, token: string, remoteIp: string): Promise<boolean> {
  const response = await fetch(SITEVERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: remoteIp }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) return false;
  const result = (await response.json()) as SiteverifyResult;
  return result.success === true;
}

/** Checks a Turnstile token with Cloudflare. Tokens are single use and expire after 5 minutes. */
export async function verifyTurnstile(secret: string, token: string, remoteIp: string): Promise<boolean> {
  if (!token || token.length > MAX_TOKEN_LENGTH) return false;
  return siteverify(secret, token, remoteIp).catch(() => false);
}
