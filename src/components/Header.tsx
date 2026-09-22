import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { Menu, X } from 'lucide-react';

const navItems = [
  { key: 'home', pathIt: '/it/', pathPl: '/pl/' },
  { key: 'tours', pathIt: '/it/tour', pathPl: '/pl/wycieczka' },
  { key: 'hotels', pathIt: '/it/hotel', pathPl: '/pl/hotel' },
  { key: 'gallery', pathIt: '/it/galleria', pathPl: '/pl/galeria' },
  { key: 'blog', pathIt: '/it/blog', pathPl: '/pl/blog' },
  { key: 'about', pathIt: '/it/chi-siamo', pathPl: '/pl/o-nas' },
];

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy/95 shadow-lg backdrop-blur-sm' : 'bg-navy'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to={lang === 'it' ? '/it/' : '/pl/'} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal flex items-center justify-center">
              <span className="text-white text-2xl">🌴</span>
            </div>
            <span className="font-[Pacifico] text-xl sm:text-2xl text-teal hidden sm:block">
              {t('slogan')}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.key}
                to={lang === 'it' ? item.pathIt : item.pathPl}
                className={`text-white/80 hover:text-orange font-semibold text-sm uppercase tracking-wide transition-colors relative group ${
                  location.pathname === (lang === 'it' ? item.pathIt : item.pathPl) ? 'text-orange' : ''
                }`}
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange transition-all group-hover:w-full" />
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/20">
              <button
                onClick={() => setLang('it')}
                className={`px-2 py-1 rounded text-sm font-bold transition-all ${
                  lang === 'it' ? 'bg-orange/20 text-white border border-orange' : 'text-white/50 hover:text-white'
                }`}
              >
                IT
              </button>
              <span className="text-white/30">|</span>
              <button
                onClick={() => setLang('pl')}
                className={`px-2 py-1 rounded text-sm font-bold transition-all ${
                  lang === 'pl' ? 'bg-orange/20 text-white border border-orange' : 'text-white/50 hover:text-white'
                }`}
              >
                PL
              </button>
            </div>
          </nav>

          {/* Mobile burger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10 animate-fadeIn">
          <nav className="flex flex-col items-center py-6 gap-5">
            {navItems.map(item => (
              <Link
                key={item.key}
                to={lang === 'it' ? item.pathIt : item.pathPl}
                className="text-white/80 hover:text-orange font-semibold text-lg uppercase tracking-wide"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setLang('it')}
                className={`px-3 py-1.5 rounded font-bold transition-all ${
                  lang === 'it' ? 'bg-orange/20 text-white border border-orange' : 'text-white/50'
                }`}
              >
                IT
              </button>
              <button
                onClick={() => setLang('pl')}
                className={`px-3 py-1.5 rounded font-bold transition-all ${
                  lang === 'pl' ? 'bg-orange/20 text-white border border-orange' : 'text-white/50'
                }`}
              >
                PL
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
