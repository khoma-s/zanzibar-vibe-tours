import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import Lightbox, { useLightbox } from '../components/Lightbox';
import Loading from '../components/Loading';
import { Hotel, Star } from 'lucide-react';

// Import all hotel images at build time
const hotelImageModules = import.meta.glob('/public/images/hotels/*/*.{jpg,jpeg,png,webp}', { eager: true });

interface HotelData {
  hotel_id: string;
  name: string;
  imgs: string;
  odescription: string;
  key_points: string;
}

export default function HotelsPage() {
  const { lang, t } = useLang();
  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<HotelData | null>(null);
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [hotelImages, setHotelImages] = useState<string[]>([]);
  const lightbox = useLightbox(hotelImages);

  // Get images from hotel folder
  const getHotelImages = (folderPath: string): string[] => {
    return Object.keys(hotelImageModules)
      .map(path => path.replace('/public', ''))
      .filter(path => path.startsWith(folderPath))
      .sort();
  };

  useEffect(() => {
    fetch(`/data/${lang}/hotels.json`)
      .then(r => r.json())
      .then(setHotels)
      .catch(() => {});
    
    fetch('/data/kontakts.json')
      .then(r => r.json())
      .then(data => setWhatsapp(data.whatsapp))
      .catch(() => {});
  }, [lang]);

  const openGallery = (hotel: HotelData) => {
    setSelectedHotel(hotel);
    setHotelImages(getHotelImages(hotel.imgs));
    lightbox.open(0);
  };

  const getStars = (hotelId: string) => {
    const starsMap: Record<string, number> = {
      'hotel_01': 5,
      'hotel_02': 4,
      'hotel_03': 4,
    };
    return starsMap[hotelId] || 4;
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-[Pacifico] text-4xl sm:text-5xl text-navy mb-4">{t('hotels')}</h1>
          <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-4" />
          <p className="text-navy/60 max-w-2xl mx-auto">
            {lang === 'it'
              ? 'Hotel selezionati per garantirti un soggiorno indimenticabile a Zanzibar.'
              : 'Wybrane hotele, aby zapewnić Ci niezapomniany pobyt na Zanzibarze.'}
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => {
            const stars = getStars(hotel.hotel_id);

            return (
              <div key={hotel.hotel_id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                {/* Image */}
                <button
                  onClick={() => openGallery(hotel)}
                  className="w-full h-56 relative overflow-hidden cursor-pointer"
                >
                  <img
                    src={`${hotel.imgs}1.jpg`}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  
                  {/* Stars */}
                  <div className="absolute top-4 left-4 flex gap-0.5">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} size={14} className="text-orange fill-orange" />
                    ))}
                  </div>

                  {/* Gallery overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-navy px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                      📷 {lang === 'it' ? 'Guarda le foto' : 'Zobacz zdjęcia'}
                    </span>
                  </div>
                </button>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-[Pacifico] text-xl text-navy mb-3 flex items-center gap-2">
                    <Hotel size={18} className="text-teal" />
                    {hotel.name}
                  </h3>
                  
                  <p className="text-navy/60 text-sm leading-relaxed mb-4 line-clamp-3">{hotel.odescription}</p>

                  {/* Key Points */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.key_points.split(',').map((point, idx) => (
                      <div key={idx} className="flex items-center gap-1 bg-cream/50 rounded-full px-2.5 py-1 text-xs text-navy/60">
                        <Star size={12} className="text-teal" />
                        <span>{point.trim()}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-navy/5">
                    <a
                      href={whatsapp ? `https://wa.me/${whatsapp}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-teal/10 hover:bg-teal text-teal hover:text-white font-semibold py-2.5 rounded-xl transition-all text-center block text-sm"
                    >
                      {lang === 'it' ? 'Richiedi informazioni' : 'Zapytaj o szczegóły'}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {lightbox.isOpen && selectedHotel && (
        <Lightbox
          images={hotelImages}
          currentIndex={lightbox.currentIndex}
          onClose={lightbox.close}
          onNext={lightbox.next}
          onPrev={lightbox.prev}
        />
      )}
    </div>
  );
}
