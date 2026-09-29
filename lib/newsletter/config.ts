/**
 * Newsletter configuration.
 *
 * Emails reference logos, icons and local photos by absolute URL, so they
 * need the public address of the live website. Set NEXT_PUBLIC_NEWSLETTER_ASSET_BASE
 * (or NEXT_PUBLIC_SITE_URL) to e.g. https://www.studio-portmix.ch before
 * exporting newsletters for real recipients.
 */
export const newsletterAssetBase =
  process.env.NEXT_PUBLIC_NEWSLETTER_ASSET_BASE ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function isLocalAssetBase(base: string) {
  return /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(base);
}
