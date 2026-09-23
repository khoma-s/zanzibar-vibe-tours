import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { Menu, X, Globe } from 'lucide-react';

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
  const [langDropdown, setLangDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangDropdown(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = () => setLangDropdown(false);
    if (langDropdown) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [langDropdown]);

  const isActive = (item: typeof navItems[0]) => {
    const currentPath = lang === 'it' ? item.pathIt : item.pathPl;
    if (currentPath === '/it/' || currentPath === '/pl/') {
      return location.pathname === currentPath;
    }
    return location.pathname.startsWith(currentPath);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-navy/97 shadow-xl shadow-navy/20 backdrop-blur-md py-0' 
        : 'bg-navy py-1'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 sm:h-20">
          
          {/* Logo */}
          <Link to={lang === 'it' ? '/it/' : '/pl/'} className="flex items-center group">
            <img 
              src="/images/logo_in_line.png" 
              alt="Zanzibar Vibe Tours" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.key}
                to={lang === 'it' ? item.pathIt : item.pathPl}
                className={`px-3 py-2 rounded-lg font-semibold text-[13px] uppercase tracking-wide transition-all relative ${
                  isActive(item)
                    ? 'text-orange bg-orange/10'
                    : 'text-white/75 hover:text-white hover:bg-white/5'
                }`}
              >
                {t(item.key)}
                {isActive(item) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange rounded-full" />
                )}
              </Link>
            ))}
            
            {/* Language Switcher - Desktop */}
            <div className="relative ml-3 pl-3 border-l border-white/15">
              <button
                onClick={(e) => { e.stopPropagation(); setLangDropdown(!langDropdown); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
              >
                <Globe size={15} />
                <span className="uppercase font-bold">{lang}</span>
              </button>
              
              {langDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-navy/10 overflow-hidden min-w-[120px] animate-fadeIn">
                  <button
                    onClick={() => setLang('it')}
                    className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors flex items-center gap-2 ${
                      lang === 'it' ? 'bg-teal/10 text-teal' : 'text-navy/70 hover:bg-navy/5'
                    }`}
                  >
                    <span>🇮🇹</span> Italiano
                  </button>
                  <button
                    onClick={() => setLang('pl')}
                    className={`w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors flex items-center gap-2 ${
                      lang === 'pl' ? 'bg-teal/10 text-teal' : 'text-navy/70 hover:bg-navy/5'
                    }`}
                  >
                    <span>🇵🇱</span> Polski
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile burger */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-navy border-t border-white/10">
          <nav className="flex flex-col py-4 px-4 gap-1">
            {navItems.map(item => (
              <Link
                key={item.key}
                to={lang === 'it' ? item.pathIt : item.pathPl}
                className={`px-4 py-3 rounded-lg font-semibold text-base transition-all ${
                  isActive(item)
                    ? 'text-orange bg-orange/10'
                    : 'text-white/75 hover:text-white hover:bg-white/5'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10 px-4">
              <Globe size={16} className="text-white/50" />
              <span className="text-white/50 text-sm mr-2">
                {lang === 'it' ? 'Lingua:' : 'Język:'}
              </span>
              <button
                onClick={() => setLang('it')}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  lang === 'it' ? 'bg-orange text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                🇮🇹 IT
              </button>
              <button
                onClick={() => setLang('pl')}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  lang === 'pl' ? 'bg-orange text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                🇵🇱 PL
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
