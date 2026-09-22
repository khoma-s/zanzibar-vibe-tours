import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  const { lang, t } = useLang();

  return (
    <div className="pt-24 pb-16 min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🏝️</div>
        <h1 className="font-[Pacifico] text-6xl text-navy mb-4">404</h1>
        <p className="text-xl text-navy/60 mb-8">{t('page_not_found')}</p>
        <Link
          to={lang === 'it' ? '/it/' : '/pl/'}
          className="inline-flex items-center gap-2 bg-teal hover:bg-teal/90 text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105"
        >
          <Home size={18} />
          {t('back_home')}
        </Link>
      </div>
    </div>
  );
}
