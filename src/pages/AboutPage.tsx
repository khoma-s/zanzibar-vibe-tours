import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import Lightbox, { useLightbox } from '../components/Lightbox';
import { Mail, Phone, Camera } from 'lucide-react';

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

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-navy/50 text-lg">Loading...</div>
      </div>
    );
  }

  const photos = data.about_photos;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="font-[Pacifico] text-4xl sm:text-5xl text-navy mb-4">{t('about_title')}</h1>
          <div className="w-24 h-1 bg-teal mx-auto rounded-full" />
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 mb-12">
          <h2 className="font-[Pacifico] text-2xl text-navy mb-6">{t('our_history')}</h2>
          <p className="text-navy/80 leading-relaxed text-lg">{data.history}</p>
          
          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-navy/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.email && (
              <a href={`mailto:${data.email}`} className="flex items-center gap-3 text-teal hover:text-orange transition-colors">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <Mail size={18} className="text-teal" />
                </div>
                <span>{data.email}</span>
              </a>
            )}
            {data.phone && (
              <a href={`tel:${data.phone}`} className="flex items-center gap-3 text-teal hover:text-orange transition-colors">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <Phone size={18} className="text-teal" />
                </div>
                <span>{data.phone}</span>
              </a>
            )}
          </div>
        </div>

        {/* Photo Slider Section */}
        <div className="mb-8">
          <h2 className="font-[Pacifico] text-2xl text-navy mb-6 flex items-center gap-3">
            <Camera className="text-orange" size={28} />
            {t('about_photos_title')}
          </h2>

          {/* Main display */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div
              className="aspect-video bg-gradient-to-br from-navy/5 to-teal/5 flex items-center justify-center cursor-pointer group relative overflow-hidden"
              onClick={() => lightbox.open(activeSlide)}
            >
              <img
                src={photos[activeSlide]}
                alt={`About photo ${activeSlide + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/800/450?random=${activeSlide + 20}`;
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-navy px-4 py-2 rounded-full font-semibold text-sm">
                  🔍 {t('view_photos')}
                </span>
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
