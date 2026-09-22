import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import Lightbox, { useLightbox } from '../components/Lightbox';
import { Hotel } from 'lucide-react';

interface HotelData {
  hotel_id: string;
  name: string;
  imgs: string[];
  odescription: string;
}

export default function HotelsPage() {
  const { lang, t } = useLang();
  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<HotelData | null>(null);
  const lightbox = useLightbox(selectedHotel?.imgs || []);

  useEffect(() => {
    fetch(`/data/${lang}/hotels.json`)
      .then(r => r.json())
      .then(setHotels)
      .catch(() => {});
  }, [lang]);

  const openGallery = (hotel: HotelData) => {
    setSelectedHotel(hotel);
    lightbox.open(0);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-[Pacifico] text-4xl sm:text-5xl text-navy mb-4">{t('hotels')}</h1>
          <div className="w-24 h-1 bg-orange mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel.hotel_id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
              <button
                onClick={() => openGallery(hotel)}
                className="w-full h-56 relative overflow-hidden cursor-pointer"
              >
                <img
                  src={hotel.imgs[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/600/400?random=${hotel.hotel_id}`;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-navy px-4 py-2 rounded-full font-semibold text-sm">
                    📷 {t('view_photos')}
                  </span>
                </div>
              </button>
              <div className="p-6">
                <h3 className="font-[Pacifico] text-xl text-navy mb-3 flex items-center gap-2">
                  <Hotel size={20} className="text-teal" />
                  {hotel.name}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed">{hotel.odescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox.isOpen && selectedHotel && (
        <Lightbox
          images={selectedHotel.imgs}
          currentIndex={lightbox.currentIndex}
          onClose={lightbox.close}
          onNext={lightbox.next}
          onPrev={lightbox.prev}
        />
      )}
    </div>
  );
}
