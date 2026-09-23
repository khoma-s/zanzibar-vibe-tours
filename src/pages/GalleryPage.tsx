import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import Lightbox, { useLightbox } from '../components/Lightbox';
import Loading from '../components/Loading';
import { Camera, Play } from 'lucide-react';

interface GalleryData {
  albumsEnabled: boolean;
  photos: string[];
  videos: string[];
  albums: unknown[];
}

export default function GalleryPage() {
  const { lang, t } = useLang();
  const [data, setData] = useState<GalleryData | null>(null);
  const lightbox = useLightbox(data?.photos || []);

  useEffect(() => {
    fetch(`/data/${lang}/gallery.json`)
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, [lang]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-[Pacifico] text-4xl sm:text-5xl text-navy mb-4 flex items-center justify-center gap-3">
            <Camera className="text-teal" size={40} />
            {t('gallery')}
          </h1>
          <div className="w-24 h-1 bg-teal mx-auto rounded-full" />
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {data.photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => lightbox.open(idx)}
              className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-teal/10 to-orange/5 hover:shadow-lg transition-all group cursor-pointer relative"
            >
              <img
                src={photo}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/400/400?random=${idx + 50}`;
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
            </button>
          ))}
        </div>

        {/* Videos */}
        {data.videos.length > 0 && (
          <div>
            <h2 className="font-[Inter] font-bold text-xl text-navy mb-6 flex items-center gap-2">
              <Play className="text-orange" size={24} />
              {lang === 'it' ? 'Video' : 'Wideo'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.videos.map((video, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden bg-navy/5 shadow-md">
                  <video
                    controls
                    className="w-full aspect-video"
                    preload="metadata"
                  >
                    <source src={video} type="video/mp4" />
                    {lang === 'it' ? 'Il tuo browser non supporta il video.' : 'Twoja przeglądarka nie obsługuje wideo.'}
                  </video>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TODO: Albums section - currently disabled */}
        {/* 
          albumsEnabled: false
          TODO: Implement album functionality when ready
          {data.albumsEnabled && data.albums.map(album => (...))}
        */}
      </div>

      {lightbox.isOpen && (
        <Lightbox
          images={data.photos}
          currentIndex={lightbox.currentIndex}
          onClose={lightbox.close}
          onNext={lightbox.next}
          onPrev={lightbox.prev}
        />
      )}
    </div>
  );
}
