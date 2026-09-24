import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { MapPin, Camera, BookOpen, ArrowRight, Compass, Shield, Heart, Star, X } from 'lucide-react';
import Lightbox, { useLightbox } from '../components/Lightbox';

// Import all images from gallery folder at build time
const galleryImageModules = import.meta.glob('/public/images/gallery/*.{jpg,jpeg,png,webp}', { eager: true });

interface Tour {
  tour_id: string;
  img_title: string;
  title: string;
  short_desc: string;
  price: number;
  currency: string;
}

interface Post {
  post_id: string;
  title: string;
  text: string;
}

export default function HomePage() {
  const { lang, t } = useLang();
  const [tours, setTours] = useState<Tour[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const lightbox = useLightbox(galleryImages);

  useEffect(() => {
    fetch(`/data/${lang}/tours.json`)
      .then(r => r.json())
      .then(data => setTours(data.slice(0, 4)))
      .catch(() => {});
    fetch(`/data/${lang}/posts.json`)
      .then(r => r.json())
      .then((data: Post[]) => {
        // Перемешиваем массив и берём первые 3
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setPosts(shuffled.slice(0, 3));
      })
      .catch(() => {});
    // Загружаем 5 случайных изображений из галереи
    const loadGalleryImages = () => {
      const allImages = Object.keys(galleryImageModules)
        .map(path => path.replace('/public', ''));
      
      // Перемешиваем массив и берём первые 5
      const shuffled = [...allImages].sort(() => Math.random() - 0.5);
      setGalleryImages(shuffled.slice(0, 5));
    };
    loadGalleryImages();
  }, [lang]);

  const currencySymbol = lang === 'it' ? '€' : 'zł';

  const features = lang === 'it' ? [
    { icon: Compass, title: 'Tour autentiche', desc: 'Esperienze genuine lontano dalle masse turistiche' },
    { icon: Shield, title: 'Assistenza 24/7', desc: 'Supporto continuo durante tutto il soggiorno' },
    { icon: Heart, title: 'Passione locale', desc: 'Guide locali che conoscono ogni angolo dell\'isola' },
    { icon: Star, title: 'L\'arte del viaggio personale', desc: 'Creati su misura in ogni dettaglio, perfettamente adattati al tuo ritmo e stile.' },
  ] : [
    { icon: Compass, title: 'Autentyczne wycieczki', desc: 'Prawdziwe doświadczenia z dala od mas turystycznych' },
    { icon: Shield, title: 'Wsparcie 24/7', desc: 'Ciągła pomoc podczas całego pobytu' },
    { icon: Heart, title: 'Lokalna pasja', desc: 'Lokalni przewodnicy znający każdy zakątek wyspy' },
    { icon: Star, title: 'Osobisty wymiar podróży', desc: 'Skomponowane z dbałością o każdy detal, dopasowane do Twojego tempa i stylu.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src="/images/matemwe_beach_16x9.png" 
            alt="Matemwe Beach" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-navy/80 to-teal/60" />
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          {/* Logo */}
          <div className="mb-8 animate-float">
            <div className="inline-block">
              <img 
                src="/images/logo.png" 
                alt="Zanzibar Vibe Tours" 
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
              />
            </div>
          </div>

          <h1 className="font-[Pacifico] text-5xl sm:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            Zanzibar
            <span className="block text-teal text-3xl sm:text-4xl lg:text-5xl mt-2">Vibe Tours</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-cream/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {t('hero_subtitle')}
          </p>

          <div className="flex items-center justify-center">
            <Link
              to={lang === 'it' ? '/it/tour' : '/pl/wycieczka'}
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg shadow-orange/30"
            >
              {t('hero_cta')}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="#FBF3D5" />
          </svg>
        </div>
      </section>

      {/* Tours Preview */}
      <section className="py-16 px-4 bg-navy/3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-[Pacifico] text-3xl sm:text-4xl text-navy flex items-center gap-3">
                <MapPin className="text-teal" size={32} />
                {t('tours_preview')}
              </h2>
              <p className="text-navy/50 mt-2 text-sm">
                {lang === 'it' ? 'Le migliori esperienze sull\'isola' : 'Najlepsze doświadczenia na wyspie'}
              </p>
            </div>
            <Link
              to={lang === 'it' ? '/it/tour' : '/pl/wycieczka'}
              className="hidden sm:flex items-center gap-1 text-teal hover:text-orange font-semibold transition-colors text-sm"
            >
              {t('view_all')} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <Link
                key={tour.tour_id}
                to={lang === 'it' ? `/it/tour/${tour.tour_id}` : `/pl/wycieczka/${tour.tour_id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-br from-teal/20 to-navy/10 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={tour.img_title}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/600/400?random=${tour.tour_id}`;
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-orange text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {tour.price.toLocaleString()} {currencySymbol}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-[Pacifico] text-base text-navy mb-1.5 line-clamp-2">{tour.title}</h3>
                  <p className="text-navy/50 text-xs mb-3 line-clamp-2">{tour.short_desc}</p>
                  <div className="flex items-center gap-1 text-teal text-xs font-semibold">
                    <span>{t('from')} {tour.price.toLocaleString()} {currencySymbol}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link
              to={lang === 'it' ? '/it/tour' : '/pl/wycieczka'}
              className="inline-flex items-center gap-1 text-teal hover:text-orange font-semibold transition-colors"
            >
              {t('view_all')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-navy/3">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-[Pacifico] text-3xl sm:text-4xl text-navy mb-10 flex items-center gap-3">
            <svg className="text-orange" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {lang === 'it' ? 'La Passione dei Nostri Viaggi' : 'Pasja Naszych Podróży'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-center group">
                <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-teal/20 transition-colors">
                  <feature.icon size={24} className="text-teal" />
                </div>
                <h3 className="font-[Inter] font-normal text-navy text-base mb-2">{feature.title}</h3>
                <p className="text-navy/50 text-xs leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-[Pacifico] text-3xl sm:text-4xl text-navy flex items-center gap-3">
                <Camera className="text-orange" size={32} />
                {t('gallery_preview')}
              </h2>
              <p className="text-navy/50 mt-2 text-sm">
                {lang === 'it' ? 'Immagini indimenticabili' : 'Niezapomniane zdjęcia'}
              </p>
            </div>
            <Link
              to={lang === 'it' ? '/it/galleria' : '/pl/galeria'}
              className="hidden sm:flex items-center gap-1 text-teal hover:text-orange font-semibold transition-colors text-sm"
            >
              {t('view_all')} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.slice(0, 5).map((img, i) => (
              <button
                key={i}
                onClick={() => lightbox.open(i)}
                className={`${i === 0 ? 'col-span-2 row-span-2' : ''} aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-teal/10 to-orange/5 hover:shadow-lg transition-all group cursor-pointer relative`}
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 px-4 bg-navy/3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-[Pacifico] text-3xl sm:text-4xl text-navy flex items-center gap-3">
                <BookOpen className="text-teal" size={32} />
                {t('blog_preview')}
              </h2>
              <p className="text-navy/50 mt-2 text-sm">
                {lang === 'it' ? 'Storie e consigli di viaggio' : 'Historie i porady podróżnicze'}
              </p>
            </div>
            <Link
              to={lang === 'it' ? '/it/blog' : '/pl/blog'}
              className="hidden sm:flex items-center gap-1 text-teal hover:text-orange font-semibold transition-colors text-sm"
            >
              {t('view_all')} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <button
                key={post.post_id}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border-l-4 border-teal group text-left w-full"
              >
                <h3 className="font-[Inter] font-normal text-navy text-lg mb-3 group-hover:text-teal transition-colors">
                  {post.title}
                </h3>
                <span className="text-teal text-sm font-semibold flex items-center gap-1">
                  {t('read_more')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy to-teal/80" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-[Pacifico] text-3xl sm:text-4xl text-white mb-4">
            {lang === 'it' ? 'Pronto per l\'avventura?' : 'Gotowy na przygodę?'}
          </h2>
          <p className="text-cream/70 text-lg mb-8">
            {lang === 'it' 
              ? 'Contattaci per pianificare il tuo viaggio da sogno a Zanzibar.'
              : 'Skontaktuj się z nami, aby zaplanować wymarzoną podróż na Zanzibar.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:info@zanzibarvibetours.com"
              className="inline-flex items-center gap-3 border-2 border-white/30 hover:border-orange text-white hover:text-orange font-semibold px-8 py-4 rounded-full text-lg transition-all whitespace-nowrap"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>info@zanzibarvibetours.com</span>
            </a>
            <a
              href="https://wa.me/255777123456"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-white/30 hover:border-green-500 text-white hover:text-green-400 font-semibold px-8 py-4 rounded-full text-lg transition-all whitespace-nowrap"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>+255 777 123 456</span>
            </a>
          </div>
        </div>
      </section>

      {/* Post Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-slideIn shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-navy to-teal/80 p-6 relative flex-shrink-0">
              <button
                className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all"
                onClick={() => setSelectedPost(null)}
                aria-label={t('close')}
              >
                <X size={24} />
              </button>
              <h2 className="font-[Pacifico] text-2xl sm:text-3xl text-white pr-8">
                {selectedPost.title}
              </h2>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8">
              <p className="text-navy/80 leading-relaxed text-base whitespace-pre-line">
                {selectedPost.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Lightbox */}
      {lightbox.isOpen && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightbox.currentIndex}
          onClose={lightbox.close}
          onNext={lightbox.next}
          onPrev={lightbox.prev}
        />
      )}
    </div>
  );
}
