import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import {
  localizedPath,
  normalizedPath,
  routeInfo,
  SITE_ORIGIN,
  staticSeo,
} from '../utils/localizedRoutes';
import SchemaMarkup, { organizationSchema } from './SchemaMarkup';

function meta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function link(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.href = href;
}

export default function SEO() {
  const { lang } = useLang();
  const location = useLocation();

  useEffect(() => {
    const path = normalizedPath(location.pathname);
    const info = routeInfo(path);
    const fallback = staticSeo(info?.tourId ? (lang === 'it' ? '/it/tour' : '/pl/wycieczka') : path);
    const imageFallback = `${SITE_ORIGIN}/images/matemwe_beach_16x9.png`;

    const update = (title: string, description: string, image = imageFallback) => {
      const canonical = `${SITE_ORIGIN}${path}`;
      document.title = title;
      document.documentElement.lang = lang;
      meta('name', 'description', description);
      meta('property', 'og:title', title);
      meta('property', 'og:description', description);
      meta('property', 'og:url', canonical);
      meta('property', 'og:image', image);
      meta('property', 'og:locale', lang === 'it' ? 'it_IT' : 'pl_PL');
      meta('property', 'og:locale:alternate', lang === 'it' ? 'pl_PL' : 'it_IT');
      meta('name', 'twitter:card', 'summary_large_image');
      meta('name', 'twitter:title', title);
      meta('name', 'twitter:description', description);
      meta('name', 'twitter:image', image);
      link('canonical', canonical);
      for (const language of ['it', 'pl', 'x-default'] as const) {
        const target = language === 'x-default' ? 'it' : language;
        const alternate = localizedPath(path, target);
        if (alternate) link('alternate', `${SITE_ORIGIN}${alternate}`, language);
      }
      document.head.querySelector('meta[name="robots"]')?.remove();
    };

    if (!info) {
      document.title = lang === 'it' ? 'Pagina non trovata | Zanzibar Vibe Tours' : 'Nie znaleziono strony | Zanzibar Vibe Tours';
      meta('name', 'robots', 'noindex,follow');
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
      return;
    }

    if (fallback) update(fallback.title, fallback.description);
    if (!info.tourId) return;

    let active = true;
    fetch(`/data/${lang}/tours.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`Tours HTTP ${response.status}`);
        return response.json();
      })
      .then((tours: Array<{ tour_id: string; title: string; info: string; img_title: string }>) => {
        if (!active) return;
        const tour = tours.find((item) => item.tour_id === info.tourId);
        if (!tour) {
          meta('name', 'robots', 'noindex,follow');
          return;
        }
        const excerpt = tour.info.slice(0, 155);
        const description = tour.info.length > 155
          ? `${excerpt.slice(0, excerpt.lastIndexOf(' ')).trimEnd()}…`
          : excerpt;
        update(`${tour.title} | Zanzibar Vibe Tours`, description, `${SITE_ORIGIN}${tour.img_title}`);
      })
      .catch(() => {
        if (active) meta('name', 'robots', 'noindex,follow');
      });
    return () => { active = false; };
  }, [lang, location.pathname]);

  return <SchemaMarkup type="Organization" data={organizationSchema} />;
}
