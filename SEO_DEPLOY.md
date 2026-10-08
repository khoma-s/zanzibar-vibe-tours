# SEO deployment checklist

The production artifact is the **contents of `dist/`**, including hidden `dist/.htaccess` and `dist/_pages/`. Run `npm ci`, then `npm run build`. The build regenerates the sitemap and Apache route rules from `seo.config.json` and the Italian/Polish tour JSON files. New tour IDs must exist in both languages.

## Hosting

1. In the hosting/Nodea security panel, disable the public verification challenge for this site, or configure it to let ordinary visitors and crawlers reach the site and `/sitemap.xml` without a challenge. Do not add a crawler-only exception that serves different content to bots.
2. Upload all contents of `dist/` to the public document root. Confirm that the server uses Apache with `mod_rewrite` and honors `.htaccess`. If it does not, translate the exact-route/404 rules in `dist/.htaccess` to the actual web server configuration.
3. The `zanzibar-vibetours.eu` virtual host must serve the new files; old cached challenge/SPA responses should be purged. If the `.com` domain is owned, configure a permanent 301 redirect to matching `.eu` URLs at the domain/web-server level.

## Verify before search-engine submission

Check both a regular browser user-agent and Googlebot/Bingbot. Expected results:

| URL | Expected HTTP status and content |
| --- | --- |
| `/it/`, `/pl/`, valid tour/detail URLs | `200`, site HTML with the matching language/title/canonical/hreflang |
| `/sitemap.xml` | `200`, `application/xml` or `text/xml`, XML starting with `<?xml` |
| `/robots.txt` | `200`, text with the `.eu` sitemap URL |
| `/does-not-exist-seo-check` | `404`, custom 404 page with `noindex` |
| `/it` and `/pl` | `301` to trailing-slash home URL |

No public URL should serve a Nodea verification page with `noindex,nofollow`. Check any `X-Robots-Tag` response header as well.

Example: `curl -L -i -A Googlebot https://zanzibar-vibetours.eu/sitemap.xml` and `curl -L -i https://zanzibar-vibetours.eu/does-not-exist-seo-check`.

## Search engines

Only after the live sitemap passes the checks above, use the verified `zanzibar-vibetours.eu` property in Google Search Console's **Sitemaps** report to submit `https://zanzibar-vibetours.eu/sitemap.xml`. Submit the same URL in Bing Webmaster Tools under **Sitemaps**. Confirm processing/accepted status in both accounts; submission alone does not mean indexing.

Official guidance: [Google Search Console Sitemaps report](https://support.google.com/webmasters/answer/7451001), [Bing Webmaster Tools Sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed).
