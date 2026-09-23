import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import Lightbox, { useLightbox } from '../components/Lightbox';
import Loading from '../components/Loading';
import { Camera, MapPin, Heart, Award, Users, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

interface AboutData {
  history: string;
  email: string;
  phone: string;
  moments_photos_path: string;
  moments_photos: string[];
}

export default function AboutPage() {
  const { lang, t } = useLang();
  const [data, setData] = useState<AboutData | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const lightbox = useLightbox(data?.moments_photos || []);

  useEffect(() => {
    fetch(`/data/${lang}/about.json`)
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, [lang]);

  useEffect(() => {
    // Auto-slide
    if (!data) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % data.moments_photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  const photos = data.moments_photos;

  const nextSlide = () => setActiveSlide(prev => (prev + 1) % photos.length);
  const prevSlide = () => setActiveSlide(prev => (prev - 1 + photos.length) % photos.length);

  const values = lang === 'it' ? [
    { icon: Heart, title: 'Passione', desc: 'Amiamo Zanzibar e vogliamo trasmettervi questa passione' },
    { icon: Award, title: 'Qualità', desc: 'Selezioniamo solo le migliori esperienze e strutture' },
    { icon: Users, title: 'Personalizzazione', desc: 'Ogni viaggio è unico, creato su misura per voi' },
    { icon: Globe, title: 'Sostenibilità', desc: 'Rispettiamo l\'ambiente e supportiamo le comunità locali' },
  ] : [
    { icon: Heart, title: 'Pasja', desc: 'Kochamy Zanzibar i chcemy przekazać Wam tę pasję' },
    { icon: Award, title: 'Jakość', desc: 'Wybieramy tylko najlepsze doświadczenia i obiekty' },
    { icon: Users, title: 'Personalizacja', desc: 'Każda podróż jest unikalna, tworzona na miarę' },
    { icon: Globe, title: 'Zrównoważenie', desc: 'Szanujemy środowisko i wspieramy lokalne społeczności' },
  ];



  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <MapPin size={14} />
            Zanzibar, Tanzania
          </div>
          <h1 className="font-[Pacifico] text-4xl sm:text-6xl text-navy mb-4">{t('about_title')}</h1>
          <div className="w-24 h-1 bg-teal mx-auto rounded-full mb-6" />
          <p className="text-navy/60 max-w-2xl mx-auto text-lg">
            {lang === 'it'
              ? 'La vostra porta d\'ingresso per scoprire la magia di Zanzibar'
              : 'Wasza brama do odkrycia magii Zanzibaru'}
          </p>
        </div>

        {/* History & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <h2 className="font-[Pacifico] text-2xl sm:text-3xl text-navy mb-6">{t('our_history')}</h2>
            <p className="text-navy/70 leading-relaxed text-base sm:text-lg">{data.history}</p>
          </div>

          <div className="bg-gradient-to-br from-navy to-teal/80 rounded-2xl shadow-lg p-8 text-white flex items-center justify-center">
            <img 
              src="/images/about/me.jpg" 
              alt="Founder" 
              className="w-full h-full object-cover rounded-xl"
              style={{ maxHeight: '400px' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/400/400?random=founder';
              }}
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-[Pacifico] text-3xl text-navy text-center mb-10">
            {lang === 'it' ? 'I nostri valori' : 'Nasze wartości'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal/20 to-orange/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon size={24} className="text-teal" />
                </div>
                <h3 className="font-[Inter] font-bold text-navy mb-2">{value.title}</h3>
                <p className="text-navy/50 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>



        {/* Photo Slider Section */}
        <div className="mb-8">
          <h2 className="font-[Pacifico] text-3xl text-navy mb-8 flex items-center gap-3">
            <Camera className="text-orange" size={28} />
            {t('about_photos_title')}
          </h2>

          {/* Main display with slider */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 relative">
            <div
              className="aspect-video bg-gradient-to-br from-navy/5 to-teal/5 flex items-center justify-center cursor-pointer group relative overflow-hidden"
              onClick={() => lightbox.open(activeSlide)}
            >
              <img
                src={photos[activeSlide]}
                alt={`About photo ${activeSlide + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/1200/675?random=${activeSlide + 20}`;
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-navy px-4 py-2 rounded-full font-semibold text-sm">
                  🔍 {t('view_photos')}
                </span>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={20} />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {activeSlide + 1} / {photos.length}
              </div>
            </div>
          </div>

          {/* Thumbnail Slider */}
          <div className="thumbnail-slider flex gap-3 overflow-x-auto pb-3 px-1">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden transition-all duration-300 ${
                  activeSlide === index
                    ? 'ring-3 ring-teal scale-105 shadow-lg'
                    : 'ring-1 ring-navy/10 opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/200/200?random=${index + 30}`;
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <Lightbox
          images={photos}
          currentIndex={lightbox.currentIndex}
          onClose={lightbox.close}
          onNext={lightbox.next}
          onPrev={lightbox.prev}
        />
      )}
    </div>
  );
}
