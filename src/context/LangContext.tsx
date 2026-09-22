import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'it' | 'pl';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  home: { it: 'Home', pl: 'Strona główna' },
  tours: { it: 'Tour', pl: 'Wycieczka' },
  hotels: { it: 'Hotel', pl: 'Hotel' },
  gallery: { it: 'Galleria', pl: 'Galeria' },
  blog: { it: 'Blog', pl: 'Blog' },
  about: { it: 'Chi siamo', pl: 'O nas' },
  slogan: { it: 'Zanzibar Vibe Tours', pl: 'Zanzibar Vibe Tours' },
  hero_subtitle: { it: 'Scopri la magia di Zanzibar', pl: 'Odkryj magię Zanzibaru' },
  hero_cta: { it: 'Prenota ora', pl: 'Zarezerwuj teraz' },
  tours_preview: { it: 'I nostri tour', pl: 'Nasze wycieczki' },
  gallery_preview: { it: 'Galleria fotografica', pl: 'Galeria zdjęć' },
  blog_preview: { it: 'Dal nostro blog', pl: 'Z naszego bloga' },
  view_all: { it: 'Vedi tutti', pl: 'Zobacz wszystkie' },
  read_more: { it: 'Leggi di più', pl: 'Czytaj więcej' },
  price: { it: 'Prezzo', pl: 'Cena' },
  from: { it: 'da', pl: 'od' },
  contact: { it: 'Contatti', pl: 'Kontakt' },
  all_rights: { it: 'Tutti i diritti riservati', pl: 'Wszelkie prawa zastrzeżone' },
  back_home: { it: 'Torna alla home', pl: 'Wróć do strony głównej' },
  page_not_found: { it: 'Pagina non trovata', pl: 'Strona nie znaleziona' },
  our_history: { it: 'La nostra storia', pl: 'Nasza historia' },
  view_photos: { it: 'Guarda le foto', pl: 'Zobacz zdjęcia' },
  close: { it: 'Chiudi', pl: 'Zamknij' },
  tour_gallery: { it: 'Galleria del tour', pl: 'Galeria wycieczki' },
  hotel_gallery: { it: 'Galleria hotel', pl: 'Galeria hotelu' },
  back: { it: '← Indietro', pl: '← Wróć' },
  footer_desc: { it: 'La tua esperienza indimenticabile a Zanzibar', pl: 'Twoje niezapomniane doświadczenie na Zanzibarze' },
  about_title: { it: 'Chi siamo', pl: 'O nas' },
  about_photos_title: { it: 'I nostri momenti', pl: 'Nasze chwile' },
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('zv_lang');
    if (saved === 'it' || saved === 'pl') return saved;
    const browserLang = (navigator.language || '').toLowerCase();
    return browserLang.startsWith('it') ? 'it' : 'pl';
  });

  useEffect(() => {
    localStorage.setItem('zv_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: Lang) => setLangState(newLang);
  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
