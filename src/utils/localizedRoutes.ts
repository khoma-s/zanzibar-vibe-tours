export type SupportedLang = 'it' | 'pl';

const localizedPaths = [
  { it: '/it/', pl: '/pl/' },
  { it: '/it/tour', pl: '/pl/wycieczka' },
  { it: '/it/hotel', pl: '/pl/hotel' },
  { it: '/it/galleria', pl: '/pl/galeria' },
  { it: '/it/blog', pl: '/pl/blog' },
  { it: '/it/chi-siamo', pl: '/pl/o-nas' },
  { it: '/it/404', pl: '/pl/404' },
] as const;

export function getLangFromPath(pathname: string): SupportedLang | null {
  const match = pathname.match(/^\/(it|pl)(?:\/|$)/);
  return match ? match[1] as SupportedLang : null;
}

export function getLocalizedPath(pathname: string, targetLang: SupportedLang): string {
  const detailMatch = pathname.match(/^\/(?:it\/tour|pl\/wycieczka)\/([^/]+)\/?$/);
  if (detailMatch) {
    const detailBase = targetLang === 'it' ? '/it/tour' : '/pl/wycieczka';
    return `${detailBase}/${detailMatch[1]}`;
  }

  const route = localizedPaths.find(({ it, pl }) => pathname === it || pathname === pl);
  if (route) return route[targetLang];

  if (getLangFromPath(pathname)) {
    return pathname.replace(/^\/(it|pl)(?=\/|$)/, `/${targetLang}`);
  }

  return `/${targetLang}/`;
}
