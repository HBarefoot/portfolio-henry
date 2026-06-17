import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Per-IP rate limiter for the contact form, backed by Upstash Redis.
 *
 * Degrades gracefully: if the Upstash env vars are absent (local dev, preview
 * deploys without secrets) the limiter is a no-op that allows every request, so
 * the form still works — it just isn't rate limited in those environments.
 */

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

// Build the limiter once per server instance. `Redis.fromEnv()` reads
// UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.
const limiter = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "ratelimit:lead",
      analytics: false,
    })
  : null;

/**
 * Returns `{ success }`. When Upstash is not configured, always allows.
 */
export async function checkRateLimit(identifier: string): Promise<{ success: boolean }> {
  if (!limiter) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[ratelimit] Upstash env not set — contact form rate limiting is disabled."
      );
    }
    return { success: true };
  }

  try {
    const { success } = await limiter.limit(identifier);
    return { success };
  } catch (err) {
    // Never block a real submission because the limiter backend hiccuped.
    console.error("[ratelimit] Upstash error — allowing request:", err);
    return { success: true };
  }
}
