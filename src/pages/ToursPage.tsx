import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import Lightbox, { useLightbox } from '../components/Lightbox';
import Loading from '../components/Loading';
import { ArrowLeft, MapPin } from 'lucide-react';

interface Tour {
  tour_id: string;
  img_title: string;
  imgs: string[];
  info: string;
  price: number;
  currency: string;
  title: string;
  short_desc: string;
}

// Tours List Page
export function ToursListPage() {
  const { lang, t } = useLang();
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    fetch(`/data/${lang}/tours.json`)
      .then(r => r.json())
      .then(setTours)
      .catch(() => {});
  }, [lang]);

  const currencySymbol = lang === 'it' ? '€' : 'zł';

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-[Pacifico] text-4xl sm:text-5xl text-navy mb-4">{t('tours')}</h1>
          <div className="w-24 h-1 bg-teal mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tours.map((tour) => (
            <Link
              key={tour.tour_id}
              to={lang === 'it' ? `/it/tour/${tour.tour_id}` : `/pl/wycieczka/${tour.tour_id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="h-56 bg-gradient-to-br from-teal/10 to-navy/5 relative overflow-hidden">
                <img
                  src={tour.img_title}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/600/400?random=${tour.tour_id}`;
                  }}
                />
                <div className="absolute top-4 right-4 bg-orange text-white px-3 py-1 rounded-full font-bold text-sm shadow-md">
                  {tour.price.toLocaleString()} {currencySymbol}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-[Pacifico] text-xl text-navy mb-2">{tour.title}</h3>
                <p className="text-navy/60 text-sm mb-4 line-clamp-2">{tour.short_desc}</p>
                <div className="flex items-center gap-2 text-teal font-semibold">
                  <MapPin size={16} />
                  <span>{t('from')} {tour.price.toLocaleString()} {currencySymbol}</span>
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
  const lightbox = useLightbox(tour?.imgs || []);

  useEffect(() => {
    fetch(`/data/${lang}/tours.json`)
      .then(r => r.json())
      .then((data: Tour[]) => {
        const found = data.find(t => t.tour_id === tour_id);
        if (found) setTour(found);
      })
      .catch(() => {});
  }, [lang, tour_id]);

  if (!tour) {
    return <Loading />;
  }

  const currencySymbol = lang === 'it' ? '€' : 'zł';

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={lang === 'it' ? '/it/tour' : '/pl/wycieczka'}
          className="inline-flex items-center gap-2 text-teal hover:text-orange font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> {t('back')}
        </Link>

        <h1 className="font-[Pacifico] text-3xl sm:text-4xl text-navy mb-6">{tour.title}</h1>

        {/* Tour Gallery */}
        <div className="mb-8">
          <h2 className="font-[Inter] font-bold text-navy text-lg mb-4">{t('tour_gallery')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tour.imgs.map((img, idx) => (
              <button
                key={idx}
                onClick={() => lightbox.open(idx)}
                className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-teal/10 to-navy/5 hover:shadow-lg transition-all group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`${tour.title} ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/400/300?random=${tour.tour_id}${idx}`;
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-navy/80 leading-relaxed text-lg mb-6">{tour.info}</p>
          <div className="flex items-center justify-between pt-4 border-t border-navy/10">
            <span className="text-navy/60">{t('price')}:</span>
            <span className="text-2xl font-bold text-teal">{tour.price.toLocaleString()} {currencySymbol}</span>
          </div>
        </div>
      </div>

      {lightbox.isOpen && (
        <Lightbox
          images={tour.imgs}
          currentIndex={lightbox.currentIndex}
          onClose={lightbox.close}
          onNext={lightbox.next}
          onPrev={lightbox.prev}
        />
      )}
    </div>
  );
}
