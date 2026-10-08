import seoConfig from '../../seo.config.json';

export type SiteLang = 'it' | 'pl';
export const SITE_ORIGIN = seoConfig.origin;

export function languageFromPath(pathname: string): SiteLang | null {
  if (/^\/it(?:\/|$)/.test(pathname)) return 'it';
  if (/^\/pl(?:\/|$)/.test(pathname)) return 'pl';
  return null;
}

export function normalizedPath(pathname: string): string {
  if (pathname === '/it' || pathname === '/it/') return '/it/';
  if (pathname === '/pl' || pathname === '/pl/') return '/pl/';
  return pathname.replace(/\/+$/, '') || '/';
}

export function routeInfo(pathname: string): { key: string; tourId?: string } | null {
  const normalized = normalizedPath(pathname);
  for (const [key, translation] of Object.entries(seoConfig.pages)) {
    if (Object.values(translation).some((page) => normalizedPath(page.path) === normalized)) {
      return { key };
    }
  }
  const match = /^\/(?:it\/tour|pl\/wycieczka)\/([0-9]{3})$/.exec(normalized);
  return match ? { key: 'tour-detail', tourId: match[1] } : null;
}

export function localizedPath(pathname: string, target: SiteLang): string | null {
  const info = routeInfo(pathname);
  if (!info) return null;
  if (info.tourId) {
    return `${target === 'it' ? '/it/tour' : '/pl/wycieczka'}/${info.tourId}`;
  }
  const page = seoConfig.pages[info.key as keyof typeof seoConfig.pages];
  return page[target].path;
}

export function staticSeo(pathname: string): { title: string; description: string } | null {
  const info = routeInfo(pathname);
  const lang = languageFromPath(pathname);
  if (!info || !lang || info.tourId) return null;
  const page = seoConfig.pages[info.key as keyof typeof seoConfig.pages];
  return page[lang];
}
