import crypto from "crypto";

/**
 * AUTH UTILITIES
 * ------------------------------------------------------------------
 * Lightweight, dependency-free auth built on Node's built-in `crypto`
 * module — appropriate for a small business site with a modest number
 * of accounts. Passwords are hashed with scrypt (a slow, memory-hard
 * hash designed to resist brute-force attacks) and never stored or
 * logged in plain text.
 *
 * Sessions are a signed token (userId + expiry + HMAC signature)
 * stored in an HttpOnly cookie — the signature means the token can't
 * be forged or tampered with without knowing SESSION_SECRET.
 * ------------------------------------------------------------------
 */

const SESSION_COOKIE_NAME = "sge_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET environment variable is not set. Accounts cannot work without it — see README.md."
    );
  }
  return secret;
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export function verifyPassword(password, storedHash) {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  const derivedKey = crypto.scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  if (derivedKey.length !== keyBuffer.length) return false;
  return crypto.timingSafeEqual(derivedKey, keyBuffer);
}

export function createSessionToken(userId) {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = `${userId}.${expiresAt}`;
  const signature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, expiresAtStr, signature] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);
  if (!userId || !expiresAt || !signature) return null;
  if (Date.now() > expiresAt) return null;

  const expectedSignature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(`${userId}.${expiresAtStr}`)
    .digest("hex");

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null;

  return userId;
}

export { SESSION_COOKIE_NAME, SESSION_DURATION_MS };
