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
  our_values: { it: 'I nostri valori', pl: 'Nasze wartości' },
  our_journey: { it: 'Il nostro percorso', pl: 'Nasza droga' },
  follow_us: { it: 'Seguici', pl: 'Obserwuj nas' },
  explore: { it: 'Oppure esplora:', pl: 'Lub odkryj:' },
  lost_message: { it: 'Sembra che ti sia perso tra le onde dell\'Oceano Indiano...', pl: 'Wygląda na to, że zgubiłeś się wśród fal Oceanu Indyjskiego...' },
  not_found_desc: { it: 'La pagina che stai cercando potrebbe essere stata spostata o non esiste più.', pl: 'Strona, której szukasz, mogła zostać przeniesiona lub już nie istnieje.' },
  filter_all: { it: 'Tutti', pl: 'Wszystkie' },
  filter_photos: { it: 'Foto', pl: 'Zdjęcia' },
  filter_videos: { it: 'Video', pl: 'Wideo' },
  search_articles: { it: 'Cerca articoli...', pl: 'Szukaj artykułów...' },
  no_results: { it: 'Nessun articolo trovato', pl: 'Nie znaleziono artykułów' },
  results_for: { it: 'risultati per', pl: 'wyników dla' },
  min_read: { it: 'min di lettura', pl: 'min czytania' },
  share: { it: 'Condividi:', pl: 'Udostępnij:' },
  category: { it: 'Categoria:', pl: 'Kategoria:' },
  view: { it: 'Visualizza', pl: 'Zobacz' },
  no_content: { it: 'Nessun contenuto disponibile', pl: 'Brak dostępnej zawartości' },
  sort_by: { it: 'Ordina per:', pl: 'Sortuj według:' },
  default_sort: { it: 'Predefinito', pl: 'Domyślne' },
  price_asc: { it: 'Prezzo: basso-alto', pl: 'Cena: rosnąco' },
  price_desc: { it: 'Prezzo: alto-basso', pl: 'Cena: malejąco' },
  details: { it: 'Dettagli', pl: 'Szczegóły' },
  tour_description: { it: 'Descrizione del tour', pl: 'Opis wycieczki' },
  highlights: { it: 'Punti salienti', pl: 'Najważniejsze punkty' },
  information: { it: 'Informazioni', pl: 'Informacje' },
  duration: { it: 'Durata', pl: 'Czas trwania' },
  group: { it: 'Gruppo', pl: 'Grupa' },
  location: { it: 'Località', pl: 'Lokalizacja' },
  book_now: { it: 'Prenota ora', pl: 'Zarezerwuj teraz' },
  request_info: { it: 'Richiedi informazioni', pl: 'Zapytaj o szczegóły' },
  photos: { it: 'foto', pl: 'zdjęć' },
  videos_count: { it: 'video', pl: 'filmów' },
  ready_for_adventure: { it: 'Pronto per l\'avventura?', pl: 'Gotowy na przygodę?' },
  contact_cta: { it: 'Contattaci per pianificare il tuo viaggio da sogno a Zanzibar.', pl: 'Skontaktuj się z nami, aby zaplanować wymarzoną podróż na Zanzibar.' },
  write_us: { it: 'Scrivici', pl: 'Napisz do nas' },
  newsletter_desc: { it: 'Iscriviti per ricevere offerte esclusive e novità su Zanzibar.', pl: 'Zapisz się, aby otrzymywać ekskluzywne oferty i nowości o Zanzibarze.' },
  your_email: { it: 'La tua email', pl: 'Twój email' },
  navigation: { it: 'Navigazione', pl: 'Nawigacja' },
  privacy: { it: 'Privacy Policy', pl: 'Polityka prywatności' },
  tours_subtitle: { it: 'Le migliori esperienze sull\'isola', pl: 'Najlepsze doświadczenia na wyspie' },
  hotels_subtitle: { it: 'Hotel selezionati per garantirti un soggiorno indimenticabile a Zanzibar.', pl: 'Wybrane hotele, aby zapewnić Ci niezapomniany pobyt na Zanzibarze.' },
  gallery_subtitle: { it: 'Momenti indimenticabili catturati a Zanzibar. Esplora le nostre foto e video.', pl: 'Niezapomniane chwile uchwycone na Zanzibarze. Odkryj nasze zdjęcia i filmy.' },
  blog_subtitle: { it: 'Storie, consigli e ispirazioni per il tuo viaggio a Zanzibar.', pl: 'Historie, porady i inspiracje dla Twojej podróży na Zanzibar.' },
  about_subtitle: { it: 'La vostra porta d\'ingresso per scoprire la magia di Zanzibar', pl: 'Wasza brama do odkrycia magii Zanzibaru' },
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
