import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { Mail, MapPin, Facebook, Instagram } from 'lucide-react';

interface ContactInfo {
  tel: string;
  email: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  tiktok: string;
}

export default function Footer() {
  const { lang, t } = useLang();
  const [contacts, setContacts] = useState<ContactInfo | null>(null);

  useEffect(() => {
    fetch('/data/kontakts.json')
      .then(r => r.json())
      .then(setContacts)
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-navy text-cream relative overflow-hidden">
      {/* Decorative wave top */}
      <div className="absolute top-0 left-0 right-0 opacity-5">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path d="M0,30 Q360,60 720,30 T1440,30 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img 
                src="/images/logo_in_line.png" 
                alt="Zanzibar Vibe Tours" 
                className="w-50 h-20 rounded-md object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <p className="text-cream/60 text-sm leading-relaxed mb-5">
              {t('footer_desc')}<br /><br />{t('follow_us')}
            </p>
            {/* Social */}
            {contacts && (
              <div className="flex items-center gap-3">
                <a href={contacts.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal/20 flex items-center justify-center text-cream/50 hover:text-teal transition-all" aria-label="Facebook">
                  <Facebook size={16} />
                </a>
                <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal/20 flex items-center justify-center text-cream/50 hover:text-teal transition-all" aria-label="Instagram">
                  <Instagram size={16} />
                </a>
                <a href={contacts.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-teal/20 flex items-center justify-center text-cream/50 hover:text-teal transition-all" aria-label="TikTok">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="text-right">
            <h4 className="text-orange font-semibold text-[13px] uppercase tracking-wide mb-5 font-[Inter]">{t('contact')}</h4>
            {contacts && (
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:${contacts.email}`} className="flex items-center gap-3 text-cream/60 hover:text-teal text-sm transition-colors justify-end">
                    <span>{contacts.email}</span>
                    <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={14} className="text-teal" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${contacts.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream/60 hover:text-teal text-sm transition-colors justify-end">
                    <span>{contacts.tel}</span>
                    <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="text-teal">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-cream/60 text-sm justify-end">
                    <span>{contacts.address}</span>
                    <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-teal" />
                    </div>
                  </div>
                </li>
              </ul>
            )}
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
