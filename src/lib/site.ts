/**
 * The public address the site is served from. Set NEXT_PUBLIC_SITE_URL in
 * production; on Vercel the deployment URL is used as a fallback.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:9002")
).replace(/\/$/, "");
