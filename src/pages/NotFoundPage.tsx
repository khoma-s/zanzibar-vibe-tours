import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { Home, MapPin, Compass } from 'lucide-react';

export default function NotFoundPage() {
  const { lang, t } = useLang();

  const content = lang === 'it' ? {
    title: 'Pagina non trovata',
    subtitle: 'Sembra che ti sia perso tra le onde dell\'Oceano Indiano...',
    desc: 'La pagina che stai cercando potrebbe essere stata spostata o non esiste più. Torniamo alla rotta!',
    button: 'Torna alla home',
    links: [
      { label: 'Tour', path: '/it/tour' },
      { label: 'Hotel', path: '/it/hotel' },
      { label: 'Galleria', path: '/it/galleria' },
      { label: 'Chi siamo', path: '/it/chi-siamo' },
    ],
  } : {
    title: 'Strona nie znaleziona',
    subtitle: 'Wygląda na to, że zgubiłeś się wśród fal Oceanu Indyjskiego...',
    desc: 'Strona, której szukasz, mogła zostać przeniesiona lub już nie istnieje. Wróćmy na właściwy kurs!',
    button: 'Wróć do strony głównej',
    links: [
      { label: 'Wycieczki', path: '/pl/wycieczka' },
      { label: 'Hotel', path: '/pl/hotel' },
      { label: 'Galeria', path: '/pl/galeria' },
      { label: 'O nas', path: '/pl/o-nas' },
    ],
  };

  return (
    <div className="pt-24 pb-16 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Animated illustration */}
        <div className="mb-8 relative">
          <div className="text-9xl animate-float">🏝️</div>
          <div className="absolute -top-4 -right-4 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌊</div>
          <div className="absolute -bottom-2 -left-4 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🐚</div>
        </div>

        {/* Error code */}
        <div className="relative mb-6">
          <h1 className="font-[Pacifico] text-8xl sm:text-9xl text-navy/10 absolute inset-0 flex items-center justify-center select-none">
            404
          </h1>
          <h1 className="font-[Pacifico] text-7xl sm:text-8xl text-navy relative">
            404
          </h1>
        </div>

        <h2 className="font-[Inter] font-bold text-2xl sm:text-3xl text-navy mb-3">
          {content.title}
        </h2>
        <p className="text-navy/60 text-lg mb-2 italic">
          {content.subtitle}
        </p>
        <p className="text-navy/50 mb-8 max-w-md mx-auto">
          {content.desc}
        </p>

        {/* Main CTA */}
        <Link
          to={lang === 'it' ? '/it/' : '/pl/'}
          className="inline-flex items-center gap-2 bg-teal hover:bg-teal/90 text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg shadow-teal/30 mb-8"
        >
          <Home size={20} />
          {content.button}
        </Link>

        {/* Quick links */}
        <div className="mt-8">
          <p className="text-navy/40 text-sm mb-4 uppercase tracking-wider">
            {lang === 'it' ? 'Oppure esplora:' : 'Lub odkryj:'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {content.links.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-cream px-4 py-2 rounded-full text-sm font-semibold text-navy/70 hover:text-teal transition-all shadow-sm hover:shadow-md"
              >
                {idx === 0 && <Compass size={14} className="text-teal" />}
                {idx === 1 && <MapPin size={14} className="text-orange" />}
                {idx > 1 && <span className="text-teal">→</span>}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
