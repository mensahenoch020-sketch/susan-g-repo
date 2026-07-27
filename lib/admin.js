/**
 * ADMIN ACCESS
 * ------------------------------------------------------------------
 * Admin access is controlled by an environment variable, not by any
 * in-app toggle a user could reach — this keeps it safe from being
 * granted accidentally or by a bug.
 *
 * Set ADMIN_EMAILS in Railway to a comma-separated list of the email
 * addresses that should have admin access, e.g.:
 *   ADMIN_EMAILS=susangoudeseune5@gmail.com
 *
 * Whenever a matching user logs in, their `isAdmin` flag in the
 * database is synced to match — so removing an email from this list
 * and having that person log out/in again revokes access too.
 * ------------------------------------------------------------------
 */
export function isAdminEmail(email) {
  const list = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes((email || "").toLowerCase());
}
