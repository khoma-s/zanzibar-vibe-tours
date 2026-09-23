import { useLang } from '../context/LangContext';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { lang, t } = useLang();

  return (
    <footer className="bg-navy text-cream relative overflow-hidden">
      {/* Decorative wave top */}
      <div className="absolute top-0 left-0 right-0 opacity-5">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path d="M0,30 Q360,60 720,30 T1440,30 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img 
                src="/images/logo.png" 
                alt="Zanzibar Vibe Tours" 
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <p className="text-cream/60 text-sm leading-relaxed mb-5">
              {t('footer_desc')}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal/20 flex items-center justify-center text-cream/50 hover:text-teal transition-all" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal/20 flex items-center justify-center text-cream/50 hover:text-teal transition-all" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal/20 flex items-center justify-center text-cream/50 hover:text-teal transition-all" aria-label="TikTok">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="text-orange font-bold uppercase text-xs tracking-wider mb-5 font-[Inter]">{t('contact')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@zanzibarvibetours.com" className="flex items-center gap-3 text-cream/60 hover:text-teal text-sm transition-colors justify-center">
                  <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={14} className="text-teal" />
                  </div>
                  info@zanzibarvibetours.com
                </a>
              </li>
              <li>
                <a href="tel:+255777123456" className="flex items-center gap-3 text-cream/60 hover:text-teal text-sm transition-colors justify-center">
                  <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-teal" />
                  </div>
                  +255 777 123 456
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-cream/60 text-sm justify-center">
                  <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-teal" />
                  </div>
                  Zanzibar, Tanzania
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="text-right">
            <h4 className="text-orange font-bold uppercase text-xs tracking-wider mb-5 font-[Inter]">
              {lang === 'it' ? 'Navigazione' : 'Nawigacja'}
            </h4>
            <ul className="space-y-2.5">
              <li><Link to={lang === 'it' ? '/it/tour' : '/pl/wycieczka'} className="text-cream/60 hover:text-teal text-sm transition-colors flex items-center gap-1.5 group justify-end"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />{t('tours')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/hotel' : '/pl/hotel'} className="text-cream/60 hover:text-teal text-sm transition-colors flex items-center gap-1.5 group justify-end"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />{t('hotels')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/galleria' : '/pl/galeria'} className="text-cream/60 hover:text-teal text-sm transition-colors flex items-center gap-1.5 group justify-end"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />{t('gallery')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/blog' : '/pl/blog'} className="text-cream/60 hover:text-teal text-sm transition-colors flex items-center gap-1.5 group justify-end"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />{t('blog')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/chi-siamo' : '/pl/o-nas'} className="text-cream/60 hover:text-teal text-sm transition-colors flex items-center gap-1.5 group justify-end"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />{t('about')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-6 text-center">
          <p className="text-cream/40 text-xs">
            © 2026 Zanzibar Vibe Tours. {t('all_rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
