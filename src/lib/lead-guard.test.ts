import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  classifyEmailDomain,
  emailDomain,
  spamContentReason,
  verifyTurnstile,
  guardLead,
  WORK_EMAIL_MESSAGE,
} from "./lead-guard";

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("emailDomain", () => {
  it("extracts and lowercases the domain", () => {
    expect(emailDomain("User@GMAIL.COM")).toBe("gmail.com");
    expect(emailDomain("a@b@corp.co")).toBe("corp.co"); // last @ wins
    expect(emailDomain("trailing@dot.com.")).toBe("dot.com");
    expect(emailDomain("not-an-email")).toBe("");
  });
});

describe("classifyEmailDomain — free providers", () => {
  it("blocks exact free domains, case-insensitively", () => {
    expect(classifyEmailDomain("foo@gmail.com")).toBe("free");
    expect(classifyEmailDomain("foo@GMAIL.COM")).toBe("free");
    expect(classifyEmailDomain("foo@googlemail.com")).toBe("free");
    expect(classifyEmailDomain("foo@icloud.com")).toBe("free");
    expect(classifyEmailDomain("foo@proton.me")).toBe("free");
    expect(classifyEmailDomain("foo@sbcglobal.net")).toBe("free");
  });

  it("blocks provider families via the .* wildcard (incl. multi-part TLDs)", () => {
    expect(classifyEmailDomain("foo@yahoo.com")).toBe("free");
    expect(classifyEmailDomain("foo@yahoo.co.uk")).toBe("free");
    expect(classifyEmailDomain("foo@outlook.fr")).toBe("free");
    expect(classifyEmailDomain("foo@hotmail.com")).toBe("free");
    expect(classifyEmailDomain("foo@gmx.de")).toBe("free");
    expect(classifyEmailDomain("foo@yandex.ru")).toBe("free");
  });

  it("does NOT block look-alike / subdomain-trickery domains", () => {
    // Exact-entry trickery: gmail.com is exact, so a deeper domain must pass.
    expect(classifyEmailDomain("foo@gmail.com.evil.co")).toBeNull();
    // Wildcard-family trickery: yahoo.* must not match a 4-label look-alike.
    expect(classifyEmailDomain("foo@yahoo.com.evil.co")).toBeNull();
    expect(classifyEmailDomain("foo@my-yahoo.com")).toBeNull();
    expect(classifyEmailDomain("foo@notgmail.com")).toBeNull();
  });
});

describe("classifyEmailDomain — disposable + business", () => {
  it("blocks disposable providers (exact + wildcard)", () => {
    expect(classifyEmailDomain("foo@mailinator.com")).toBe("disposable");
    expect(classifyEmailDomain("foo@guerrillamail.com")).toBe("disposable");
    expect(classifyEmailDomain("foo@maildrop.cc")).toBe("disposable");
    expect(classifyEmailDomain("foo@tempmail.xyz")).toBe("disposable"); // tempmail.* wildcard
  });

  it("allows genuine business domains", () => {
    expect(classifyEmailDomain("jane@acme.com")).toBeNull();
    expect(classifyEmailDomain("jane@barefootdigital.dev")).toBeNull();
    expect(classifyEmailDomain("jane@some-company.io")).toBeNull();
  });
});

describe("spamContentReason", () => {
  it("flags link stuffing (>=3 urls)", () => {
    expect(spamContentReason("http://a.com http://b.com https://c.com")).toBe("link-stuffing");
    expect(spamContentReason("one link http://a.com here")).toBeNull();
  });
  it("flags BBCode link tags", () => {
    expect(spamContentReason("check [url=http://x]this[/url]")).toBe("bbcode-links");
    expect(spamContentReason("press [link]here[/link]")).toBe("bbcode-links");
  });
  it("flags an entirely non-Latin body", () => {
    expect(spamContentReason("Купить дешёвые товары сейчас")).toBe("non-latin-script");
    expect(spamContentReason("Hello, please quote us")).toBeNull();
  });
});

describe("verifyTurnstile", () => {
  it("skips (passes) when the secret is unset", async () => {
    // no TURNSTILE_SECRET_KEY stubbed
    const r = await verifyTurnstile("tok", "1.2.3.4");
    expect(r).toEqual({ ok: true, skipped: true });
  });

  it("fails when the secret is set but the token is missing", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "sekret");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await verifyTurnstile(undefined, "1.2.3.4")).toEqual({ ok: false, skipped: false });
    expect(await verifyTurnstile("", "1.2.3.4")).toEqual({ ok: false, skipped: false });
    expect(fetchMock).not.toHaveBeenCalled(); // no network call without a token
  });

  it("verifies against siteverify when secret + token are present", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "sekret");
    vi.stubGlobal("fetch", vi.fn(async () => ({ json: async () => ({ success: true }) })));
    expect(await verifyTurnstile("good-token", "1.2.3.4")).toEqual({ ok: true, skipped: false });

    vi.stubGlobal("fetch", vi.fn(async () => ({ json: async () => ({ success: false }) })));
    expect(await verifyTurnstile("bad-token", "1.2.3.4")).toEqual({ ok: false, skipped: false });
  });
});

describe("guardLead", () => {
  const ip = "9.9.9.9";

  it("drops on honeypot fill", async () => {
    const r = await guardLead({ website: "http://spam", email: "jane@acme.com" }, { route: "t", ip });
    expect(r).toEqual({ ok: false, kind: "drop", reason: "honeypot" });
  });

  it("rejects free-mail with the work-email message (a real error, not a drop)", async () => {
    const r = await guardLead({ email: "someone@gmail.com" }, { route: "t", ip });
    expect(r).toEqual({ ok: false, kind: "reject", error: WORK_EMAIL_MESSAGE });
  });

  it("passes a valid business submission", async () => {
    const r = await guardLead(
      { email: "jane@acme.com", message: "Hi, we need a quote." },
      { route: "t", ip }
    );
    expect(r).toEqual({ ok: true });
  });

  it("drops when the injected rate limiter says the window is full", async () => {
    const calls: string[] = [];
    let allowed = 3;
    const rateLimit = async (key: string) => {
      calls.push(key);
      return allowed-- > 0;
    };
    const body = { email: "jane@acme.com" };
    const opts = { route: "rl", ip, rateLimit };
    expect((await guardLead(body, opts)).ok).toBe(true);
    expect((await guardLead(body, opts)).ok).toBe(true);
    expect((await guardLead(body, opts)).ok).toBe(true);
    expect(await guardLead(body, opts)).toEqual({ ok: false, kind: "drop", reason: "rate-limit" });
    expect(calls).toEqual(["rl:9.9.9.9", "rl:9.9.9.9", "rl:9.9.9.9", "rl:9.9.9.9"]);
  });

  it("requireTurnstile: drops when secret set and token missing", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "sekret");
    const r = await guardLead({ email: "jane@acme.com" }, { route: "t", ip, requireTurnstile: true });
    expect(r).toEqual({ ok: false, kind: "drop", reason: "turnstile" });
  });

  it("requireTurnstile: passes valid token (siteverify mocked ok)", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "sekret");
    vi.stubGlobal("fetch", vi.fn(async () => ({ json: async () => ({ success: true }) })));
    const r = await guardLead(
      { email: "jane@acme.com", turnstileToken: "good" },
      { route: "t", ip, requireTurnstile: true }
    );
    expect(r).toEqual({ ok: true });
  });

  it("requireTurnstile: passes in dev when secret is unset (skip)", async () => {
    const r = await guardLead({ email: "jane@acme.com" }, { route: "t", ip, requireTurnstile: true });
    expect(r).toEqual({ ok: true });
  });

  it("time-trap: drops sub-human fill times and stale forms, skips when unstamped", async () => {
    const base = { email: "jane@acme.com" };
    const fast = await guardLead({ ...base, startedAt: Date.now() - 500 }, { route: "t", ip });
    expect(fast).toEqual({ ok: false, kind: "drop", reason: "time-trap" });

    const stale = await guardLead(
      { ...base, startedAt: Date.now() - 2 * 60 * 60 * 1000 },
      { route: "t", ip }
    );
    expect(stale).toEqual({ ok: false, kind: "drop", reason: "time-trap" });

    const human = await guardLead({ ...base, startedAt: Date.now() - 30_000 }, { route: "t", ip });
    expect(human).toEqual({ ok: true });

    // "0" = JS off → no timing data → check skipped (matches the form's default).
    const jsOff = await guardLead({ ...base, startedAt: "0" }, { route: "t", ip });
    expect(jsOff).toEqual({ ok: true });
  });
});
