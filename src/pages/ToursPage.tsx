import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import Lightbox, { useLightbox } from '../components/Lightbox';
import Loading from '../components/Loading';
import { ArrowLeft, MapPin, Clock, Users, Star, Filter } from 'lucide-react';

// Import all tour images at build time
const tourImageModules = import.meta.glob('/public/images/tours/*/*.{jpg,jpeg,png,webp}', { eager: true });

interface Tour {
  tour_id: string;
  img_title: string;
  imgs: string;
  info: string;
  price: number;
  currency: string;
  title: string;
  short_desc: string;
  key_points: string;
  duration: string;
  group: string;
  location: string;
}

// Tours List Page
export function ToursListPage() {
  const { lang, t } = useLang();
  const [tours, setTours] = useState<Tour[]>([]);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  useEffect(() => {
    fetch(`/data/${lang}/tours.json`)
      .then(r => r.json())
      .then(setTours)
      .catch(() => {});
  }, [lang]);

  const currencySymbol = lang === 'it' ? '€' : 'zł';

  const sortedTours = [...tours].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-[Pacifico] text-4xl sm:text-5xl text-navy mb-4">{t('tours')}</h1>
          <div className="w-24 h-1 bg-teal mx-auto rounded-full mb-4" />
          <p className="text-navy/60 max-w-2xl mx-auto">
            {lang === 'it' 
              ? 'Scopri le nostre escursioni esclusive e vivi Zanzibar come non l\'hai mai vista.'
              : 'Odkryj nasze ekskluzywne wycieczki i przeżyj Zanzibar jak nigdy wcześniej.'}
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-navy/60 text-sm">
            <Filter size={16} />
            <span>{lang === 'it' ? 'Ordina per:' : 'Sortuj według:'}</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-cream/50 border border-navy/10 rounded-lg px-3 py-1.5 text-sm font-medium text-navy focus:outline-none focus:border-teal"
          >
            <option value="default">{lang === 'it' ? 'Predefinito' : 'Domyślne'}</option>
            <option value="price-asc">{lang === 'it' ? 'Prezzo: basso-alto' : 'Cena: rosnąco'}</option>
            <option value="price-desc">{lang === 'it' ? 'Prezzo: alto-basso' : 'Cena: malejąco'}</option>
          </select>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedTours.map((tour) => (
            <Link
              key={tour.tour_id}
              to={lang === 'it' ? `/it/tour/${tour.tour_id}` : `/pl/wycieczka/${tour.tour_id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src={tour.img_title}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/600/400?random=${tour.tour_id}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                
                {/* Price badge */}
                <div className="absolute top-4 right-4 bg-orange text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {tour.price.toLocaleString()} {currencySymbol}
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-[Pacifico] text-2xl text-white mb-1 drop-shadow-lg">{tour.title}</h3>
                  <p className="text-cream/90 text-sm drop-shadow-md">{tour.short_desc}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-navy/60 text-sm mb-4 line-clamp-2">{tour.info}</p>
                
                {/* Features */}
                <div className="flex items-center gap-4 text-xs text-navy/50 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-teal" />
                    <span>{lang === 'it' ? '1-3 giorni' : '1-3 dni'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-teal" />
                    <span>{lang === 'it' ? '2-10 persone' : '2-10 osób'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-orange fill-orange" />
                    <span>5.0</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-navy/5">
                  <div className="flex items-center gap-2 text-teal font-semibold">
                    <MapPin size={16} />
                    <span>{t('from')} {tour.price.toLocaleString()} {currencySymbol}</span>
                  </div>
                  <span className="text-orange text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    {lang === 'it' ? 'Dettagli' : 'Szczegóły'} <ArrowLeft size={14} className="rotate-180" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tour Detail Page
export function TourDetailPage() {
  const { lang, t } = useLang();
  const { tour_id } = useParams();
  const [tour, setTour] = useState<Tour | null>(null);
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [tourImages, setTourImages] = useState<string[]>([]);
  const lightbox = useLightbox(tourImages);

  // Get images from tour folder
  const getTourImages = (folderPath: string): string[] => {
    return Object.keys(tourImageModules)
      .map(path => path.replace('/public', ''))
      .filter(path => path.startsWith(folderPath) && !path.includes('title.jpg'))
      .sort();
  };

  useEffect(() => {
    fetch(`/data/${lang}/tours.json`)
      .then(r => r.json())
      .then((data: Tour[]) => {
        const found = data.find(t => t.tour_id === tour_id);
        if (found) {
          setTour(found);
          setTourImages(getTourImages(found.imgs));
        }
      })
      .catch(() => {});
    
    fetch('/data/kontakts.json')
      .then(r => r.json())
      .then(data => setWhatsapp(data.whatsapp))
      .catch(() => {});
  }, [lang, tour_id]);

  if (!tour) {
    return <Loading />;
  }

  const currencySymbol = lang === 'it' ? '€' : 'zł';

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          to={lang === 'it' ? '/it/tour' : '/pl/wycieczka'}
          className="inline-flex items-center gap-2 text-teal hover:text-orange font-semibold mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          {t('back')}
        </Link>

        {/* Title & Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-[Pacifico] text-3xl sm:text-4xl text-navy mb-2">{tour.title}</h1>
            <p className="text-navy/60">{tour.short_desc}</p>
          </div>
          <div className="bg-orange/10 border-2 border-orange rounded-2xl px-6 py-4 text-center">
            <div className="text-xs text-orange/70 uppercase tracking-wider font-semibold mb-1">
              {t('price')}
            </div>
            <div className="text-3xl font-bold text-orange">
              {tour.price.toLocaleString()} {currencySymbol}
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={tour.img_title}
            alt={tour.title}
            className="w-full h-64 sm:h-96 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/1200/600?random=${tour.tour_id}`;
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="font-[Inter] font-normal text-2xl text-navy mb-4">
                {lang === 'it' ? 'Descrizione del tour' : 'Opis wycieczki'}
              </h2>
              <p className="text-navy/70 leading-relaxed whitespace-pre-line">{tour.info}</p>

              {/* Highlights */}
              <div className="mt-8 pt-6 border-t border-navy/10">
                <h3 className="font-[Inter] font-normal text-xl text-navy mb-4">
                  {lang === 'it' ? 'Punti salienti' : 'Najważniejsze punkty'}
                </h3>
                <ul className="space-y-2">
                  {tour.key_points.split(',').map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-navy/70">
                      <span className="w-2 h-2 rounded-full bg-teal flex-shrink-0" />
                      {item.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="font-[Inter] font-normal text-xl text-navy mb-4">
                {lang === 'it' ? 'Informazioni' : 'Informacje'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={18} className="text-teal" />
                  <div>
                    <div className="text-navy/50 text-xs">{lang === 'it' ? 'Durata' : 'Czas trwania'}</div>
                    <div className="font-semibold text-navy">{tour.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users size={18} className="text-teal" />
                  <div>
                    <div className="text-navy/50 text-xs">{lang === 'it' ? 'Gruppo' : 'Grupa'}</div>
                    <div className="font-semibold text-navy">{tour.group}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={18} className="text-teal" />
                  <div>
                    <div className="text-navy/50 text-xs">{lang === 'it' ? 'Località' : 'Lokalizacja'}</div>
                    <div className="font-semibold text-navy">{tour.location}</div>
                  </div>
                </div>
              </div>

              <a
                href={whatsapp ? `https://wa.me/${whatsapp}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full bg-teal hover:bg-teal/90 text-white font-bold py-3 rounded-xl transition-all hover:scale-105 text-center block"
              >
                {lang === 'it' ? 'Prenota ora' : 'Zarezerwuj teraz'}
              </a>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-12">
          <h2 className="font-[Inter] font-normal text-2xl text-navy mb-6">{t('tour_gallery')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tourImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => lightbox.open(idx)}
                className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-teal/10 to-navy/5 hover:shadow-lg transition-all group cursor-pointer relative"
              >
                <img
                  src={img}
                  alt={`${tour.title} ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-navy px-3 py-1.5 rounded-full text-xs font-semibold">
                    🔍 {t('view_photos')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightbox.isOpen && (
        <Lightbox
          images={tourImages}
          currentIndex={lightbox.currentIndex}
          onClose={lightbox.close}
          onNext={lightbox.next}
          onPrev={lightbox.prev}
        />
      )}
    </div>
  );
}
