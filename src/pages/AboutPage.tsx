import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import Lightbox, { useLightbox } from '../components/Lightbox';
import Loading from '../components/Loading';
import { Mail, Phone, Camera, MapPin, Heart, Award, Users, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

interface AboutData {
  history: string;
  email: string;
  phone: string;
  about_photos_path: string;
  about_photos: string[];
}

export default function AboutPage() {
  const { lang, t } = useLang();
  const [data, setData] = useState<AboutData | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const lightbox = useLightbox(data?.about_photos || []);

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
      setActiveSlide(prev => (prev + 1) % data.about_photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  const photos = data.about_photos;

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

  const timeline = lang === 'it' ? [
    { year: '2020', title: 'Fondazione', desc: 'Nasce Zanzibar Vibe Tours con l\'obiettivo di offrire esperienze autentiche' },
    { year: '2021', title: 'Primi tour', desc: 'Organizziamo i primi tour per viaggiatori italiani e polacchi' },
    { year: '2022', title: 'Crescita', desc: 'Ampliamo la nostra offerta con hotel selezionati e tour personalizzati' },
    { year: '2023', title: '1000 clienti', desc: 'Raggiungiamo il traguardo di 1000 clienti soddisfatti' },
    { year: '2024', title: 'Premium', desc: 'Lanciamo la linea premium con esperienze esclusive e resort di lusso' },
    { year: '2026', title: 'Oggi', desc: 'Continuiamo a crescere, sempre con la stessa passione per Zanzibar' },
  ] : [
    { year: '2020', title: 'Założenie', desc: 'Powstaje Zanzibar Vibe Tours z celem oferowania autentycznych doświadczeń' },
    { year: '2021', title: 'Pierwsze wycieczki', desc: 'Organizujemy pierwsze wycieczki dla włoskich i polskich podróżników' },
    { year: '2022', title: 'Wzrost', desc: 'Rozszerzamy ofertę o wybrane hotele i spersonalizowane wycieczki' },
    { year: '2023', title: '1000 klientów', desc: 'Osiągamy kamień milowy 1000 zadowolonych klientów' },
    { year: '2024', title: 'Premium', desc: 'Wprowadzamy linię premium z ekskluzywnymi doświadczeniami i luksusowymi resortami' },
    { year: '2026', title: 'Dziś', desc: 'Continuiamo a crescere, sempre con la stessa passione per Zanzibar' },
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

          <div className="bg-gradient-to-br from-navy to-teal/80 rounded-2xl shadow-lg p-8 text-white">
            <h3 className="font-[Inter] font-bold text-lg mb-6 text-cream">{t('contact')}</h3>
            <div className="space-y-4">
              {data.email && (
                <a href={`mailto:${data.email}`} className="flex items-center gap-3 text-cream/80 hover:text-orange transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                    <Mail size={18} className="text-teal" />
                  </div>
                  <span className="text-sm">{data.email}</span>
                </a>
              )}
              {data.phone && (
                <a href={`tel:${data.phone}`} className="flex items-center gap-3 text-cream/80 hover:text-orange transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                    <Phone size={18} className="text-teal" />
                  </div>
                  <span className="text-sm">{data.phone}</span>
                </a>
              )}
              <div className="flex items-center gap-3 text-cream/80">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin size={18} className="text-teal" />
                </div>
                <span className="text-sm">Zanzibar, Tanzania</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-cream/50 text-xs uppercase tracking-wider mb-3">
                {lang === 'it' ? 'Seguici' : 'Obserwuj nas'}
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange/20 flex items-center justify-center text-cream/60 hover:text-orange transition-all">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange/20 flex items-center justify-center text-cream/60 hover:text-orange transition-all">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange/20 flex items-center justify-center text-cream/60 hover:text-orange transition-all">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.958.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
              </div>
            </div>
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

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="font-[Pacifico] text-3xl text-navy text-center mb-10">
            {lang === 'it' ? 'Il nostro percorso' : 'Nasza droga'}
          </h2>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-teal/20 sm:-translate-x-1/2" />
            
            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <div key={idx} className={`relative flex items-center gap-6 ${idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-teal rounded-full border-4 border-cream sm:-translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`flex-1 ml-12 sm:ml-0 ${idx % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
                      <span className="inline-block bg-orange/10 text-orange px-3 py-1 rounded-full text-xs font-bold mb-2">
                        {item.year}
                      </span>
                      <h3 className="font-[Inter] font-bold text-navy mb-1">{item.title}</h3>
                      <p className="text-navy/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  
                  {/* Spacer for other side */}
                  <div className="hidden sm:block flex-1" />
                </div>
              ))}
            </div>
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
