import { useLang } from '../context/LangContext';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, ArrowRight } from 'lucide-react';
import Logo from './Logo';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo size={40} variant="light" />
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

          {/* Navigation */}
          <div>
            <h4 className="text-orange font-bold uppercase text-xs tracking-wider mb-5 font-[Inter]">
              {lang === 'it' ? 'Navigazione' : 'Nawigacja'}
            </h4>
            <ul className="space-y-2.5">
              <li><Link to={lang === 'it' ? '/it/tour' : '/pl/wycieczka'} className="text-cream/60 hover:text-teal text-sm transition-colors flex items-center gap-1.5 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />{t('tours')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/hotel' : '/pl/hotel'} className="text-cream/60 hover:text-teal text-sm transition-colors flex items-center gap-1.5 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />{t('hotels')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/galleria' : '/pl/galeria'} className="text-cream/60 hover:text-teal text-sm transition-colors flex items-center gap-1.5 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />{t('gallery')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/blog' : '/pl/blog'} className="text-cream/60 hover:text-teal text-sm transition-colors flex items-center gap-1.5 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />{t('blog')}</Link></li>
              <li><Link to={lang === 'it' ? '/it/chi-siamo' : '/pl/o-nas'} className="text-cream/60 hover:text-teal text-sm transition-colors flex items-center gap-1.5 group"><ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />{t('about')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-orange font-bold uppercase text-xs tracking-wider mb-5 font-[Inter]">{t('contact')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@zanzibarvibetours.com" className="flex items-center gap-3 text-cream/60 hover:text-teal text-sm transition-colors">
                  <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={14} className="text-teal" />
                  </div>
                  info@zanzibarvibetours.com
                </a>
              </li>
              <li>
                <a href="tel:+255777123456" className="flex items-center gap-3 text-cream/60 hover:text-teal text-sm transition-colors">
                  <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-teal" />
                  </div>
                  +255 777 123 456
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-cream/60 text-sm">
                  <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-teal" />
                  </div>
                  Zanzibar, Tanzania
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-orange font-bold uppercase text-xs tracking-wider mb-5 font-[Inter]">
              {lang === 'it' ? 'Newsletter' : 'Newsletter'}
            </h4>
            <p className="text-cream/60 text-sm mb-4">
              {lang === 'it' 
                ? 'Iscriviti per ricevere offerte esclusive e novità su Zanzibar.'
                : 'Zapisz się, aby otrzymywać ekskluzywne oferty i nowości o Zanzibarze.'}
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder={lang === 'it' ? 'La tua email' : 'Twój email'}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-teal/50 transition-colors"
              />
              <button className="bg-teal hover:bg-teal/80 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-xs">
            © 2026 Zanzibar Vibe Tours. {t('all_rights')}.
          </p>
          <div className="flex items-center gap-4 text-cream/30 text-xs">
            <a href="#" className="hover:text-teal transition-colors">
              {lang === 'it' ? 'Privacy Policy' : 'Polityka prywatności'}
            </a>
            <span>|</span>
            <a href="#" className="hover:text-teal transition-colors">
              Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
