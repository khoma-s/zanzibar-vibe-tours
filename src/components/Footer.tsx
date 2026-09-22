import { useLang } from '../context/LangContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { lang, t } = useLang();

  return (
    <footer className="bg-navy text-cream pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                <span className="text-white text-xl">🌴</span>
              </div>
              <span className="font-[Pacifico] text-xl text-teal">Zanzibar Vibe Tours</span>
            </div>
            <p className="text-cream/70 text-sm">{t('footer_desc')}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-orange font-bold uppercase text-sm mb-4 font-[Inter]">
              {lang === 'it' ? 'Navigazione' : 'Nawigacja'}
            </h4>
            <ul className="space-y-2">
              <li><Link to={lang === 'it' ? '/it/tour' : '/pl/wycieczka'} className="text-cream/70 hover:text-orange text-sm transition-colors">{t('tours')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/hotel' : '/pl/hotel'} className="text-cream/70 hover:text-orange text-sm transition-colors">{t('hotels')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/galleria' : '/pl/galeria'} className="text-cream/70 hover:text-orange text-sm transition-colors">{t('gallery')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/blog' : '/pl/blog'} className="text-cream/70 hover:text-orange text-sm transition-colors">{t('blog')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/chi-siamo' : '/pl/o-nas'} className="text-cream/70 hover:text-orange text-sm transition-colors">{t('about')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-orange font-bold uppercase text-sm mb-4 font-[Inter]">{t('contact')}</h4>
            <p className="text-cream/70 text-sm mb-2">📧 info@zanzibarvibetours.com</p>
            <p className="text-cream/70 text-sm mb-2">📞 +255 777 123 456</p>
            <p className="text-cream/70 text-sm">📍 Zanzibar, Tanzania</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-cream/50 text-sm">
            © 2026 Zanzibar Vibe Tours. {t('all_rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
