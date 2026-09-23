import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import SchemaMarkup, { organizationSchema } from './SchemaMarkup';

interface SEOProps {
  title?: string;
  description?: string;
}

export default function SEO({ title, description }: SEOProps) {
  const { lang } = useLang();
  const location = useLocation();

  useEffect(() => {
    // Update page title
    if (title) {
      document.title = `${title} — Zanzibar Vibe Tours`;
    } else {
      document.title = lang === 'it' 
        ? 'Zanzibar Vibe Tours — Scopri la magia di Zanzibar'
        : 'Zanzibar Vibe Tours — Odkryj magię Zanzibaru';
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      if (description) {
        metaDesc.setAttribute('content', description);
      } else {
        metaDesc.setAttribute('content', lang === 'it'
          ? 'Tour indimenticabili a Zanzibar. Scopri escursioni, hotel, galleria e blog. Prenota la tua avventura!'
          : 'Niezapomniane wycieczki na Zanzibarze. Odkryj wycieczki, hotele, galerię i blog. Zarezerwuj swoją przygodę!');
      }
    }

    // Update canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const baseUrl = 'https://zanzibarvibetours.com';
      canonical.setAttribute('href', `${baseUrl}${location.pathname}`);
    }

    // Update hreflang
    const hreflangIt = document.querySelector('link[hreflang="it"]');
    const hreflangPl = document.querySelector('link[hreflang="pl"]');
    const hreflangDefault = document.querySelector('link[hreflang="x-default"]');
    
    if (hreflangIt && hreflangPl && hreflangDefault) {
      const baseUrl = 'https://zanzibarvibetours.com';
      const itPath = location.pathname.replace(/^\/pl/, '/it');
      const plPath = location.pathname.replace(/^\/it/, '/pl');
      
      hreflangIt.setAttribute('href', `${baseUrl}${itPath}`);
      hreflangPl.setAttribute('href', `${baseUrl}${plPath}`);
      hreflangDefault.setAttribute('href', `${baseUrl}${itPath}`);
    }

    // Update html lang
    document.documentElement.lang = lang;

    // Update Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    
    if (ogTitle) ogTitle.setAttribute('content', title || 'Zanzibar Vibe Tours');
    if (ogDesc) ogDesc.setAttribute('content', description || (lang === 'it'
      ? 'Tour indimenticabili a Zanzibar.'
      : 'Niezapomniane wycieczki na Zanzibarze.'));
    if (ogLocale) ogLocale.setAttribute('content', lang === 'it' ? 'it_IT' : 'pl_PL');

  }, [lang, location.pathname, title, description]);

  return (
    <>
      {/* Organization schema on all pages */}
      <SchemaMarkup type="Organization" data={organizationSchema} />
    </>
  );
}
