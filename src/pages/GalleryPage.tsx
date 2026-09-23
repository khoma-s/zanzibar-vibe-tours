import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import Lightbox, { useLightbox } from '../components/Lightbox';
import Loading from '../components/Loading';
import { Camera, Play, Image, Film, LayoutGrid, Maximize2, Eye } from 'lucide-react';

interface GalleryData {
  albumsEnabled: boolean;
  photos: string[];
  videos: string[];
  albums: unknown[];
}

type FilterType = 'all' | 'photos' | 'videos';

export default function GalleryPage() {
  const { lang, t } = useLang();
  const [data, setData] = useState<GalleryData | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
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

  const totalPhotos = data.photos.length;
  const totalVideos = data.videos.length;

  const filters: { key: FilterType; label: string; icon: typeof Image; count: number }[] = [
    { key: 'all', label: lang === 'it' ? 'Tutti' : 'Wszystkie', icon: LayoutGrid, count: totalPhotos + totalVideos },
    { key: 'photos', label: lang === 'it' ? 'Foto' : 'Zdjęcia', icon: Image, count: totalPhotos },
    { key: 'videos', label: lang === 'it' ? 'Video' : 'Wideo', icon: Film, count: totalVideos },
  ];

  // Masonry layout: alternate between tall and wide
  const getMasonryClass = (idx: number) => {
    const patterns = [
      'row-span-2', // tall
      '', // normal
      '', // normal
      'col-span-2', // wide
      '', // normal
      'row-span-2', // tall
    ];
    return patterns[idx % patterns.length];
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-[Pacifico] text-4xl sm:text-5xl text-navy mb-4 flex items-center justify-center gap-3">
            <Camera className="text-teal" size={40} />
            {t('gallery')}
          </h1>
          <div className="w-24 h-1 bg-teal mx-auto rounded-full mb-4" />
          <p className="text-navy/60 max-w-2xl mx-auto">
            {lang === 'it'
              ? 'Momenti indimenticabili catturati a Zanzibar. Esplora le nostre foto e video.'
              : 'Niezapomniane chwile uchwycone na Zanzibarze. Odkryj nasze zdjęcia i filmy.'}
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm text-navy/60">
            <Image size={16} className="text-teal" />
            <span className="font-semibold text-navy">{totalPhotos}</span>
            <span>{lang === 'it' ? 'foto' : 'zdjęć'}</span>
          </div>
          <div className="w-px h-4 bg-navy/10" />
          <div className="flex items-center gap-2 text-sm text-navy/60">
            <Film size={16} className="text-orange" />
            <span className="font-semibold text-navy">{totalVideos}</span>
            <span>{lang === 'it' ? 'video' : 'filmów'}</span>
          </div>
        </div>

        {/* Filters & View Mode */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white rounded-xl p-4 shadow-sm">
          {/* Filters */}
          <div className="flex items-center gap-2">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filter === f.key
                    ? 'bg-teal text-white shadow-md'
                    : 'bg-cream/50 text-navy/60 hover:bg-cream hover:text-navy'
                }`}
              >
                <f.icon size={14} />
                <span>{f.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  filter === f.key ? 'bg-white/20' : 'bg-navy/5'
                }`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-cream/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-teal' : 'text-navy/40 hover:text-navy/60'
              }`}
              title={lang === 'it' ? 'Griglia' : 'Siatka'}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'masonry' ? 'bg-white shadow-sm text-teal' : 'text-navy/40 hover:text-navy/60'
              }`}
              title={lang === 'it' ? 'Mosaico' : 'Mozaika'}
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Photos Section */}
        {(filter === 'all' || filter === 'photos') && totalPhotos > 0 && (
          <div className="mb-12">
            {filter === 'all' && (
              <h2 className="font-[Inter] font-bold text-xl text-navy mb-6 flex items-center gap-2">
                <Image className="text-teal" size={22} />
                {lang === 'it' ? 'Foto' : 'Zdjęcia'}
                <span className="text-sm font-normal text-navy/40">({totalPhotos})</span>
              </h2>
            )}

            {viewMode === 'masonry' ? (
              /* Masonry Grid */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
                {data.photos.map((photo, idx) => (
                  <button
                    key={`photo-${idx}`}
                    onClick={() => lightbox.open(idx)}
                    className={`${getMasonryClass(idx)} rounded-xl overflow-hidden bg-gradient-to-br from-teal/10 to-orange/5 hover:shadow-xl transition-all group cursor-pointer relative`}
                  >
                    <img
                      src={photo}
                      alt={`${lang === 'it' ? 'Foto' : 'Zdjęcie'} ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="flex items-center gap-2 text-white">
                        <Eye size={16} />
                        <span className="text-sm font-semibold">
                          {lang === 'it' ? 'Visualizza' : 'Zobacz'}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* Regular Grid */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.photos.map((photo, idx) => (
                  <button
                    key={`photo-grid-${idx}`}
                    onClick={() => lightbox.open(idx)}
                    className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-teal/10 to-orange/5 hover:shadow-xl transition-all group cursor-pointer relative"
                  >
                    <img
                      src={photo}
                      alt={`${lang === 'it' ? 'Foto' : 'Zdjęcie'} ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="flex items-center gap-2 text-white">
                        <Eye size={16} />
                        <span className="text-sm font-semibold">
                          {lang === 'it' ? 'Visualizza' : 'Zobacz'}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Videos Section */}
        {(filter === 'all' || filter === 'videos') && totalVideos > 0 && (
          <div className="mb-12">
            {filter === 'all' && (
              <h2 className="font-[Inter] font-bold text-xl text-navy mb-6 flex items-center gap-2">
                <Play className="text-orange" size={22} />
                {lang === 'it' ? 'Video' : 'Wideo'}
                <span className="text-sm font-normal text-navy/40">({totalVideos})</span>
              </h2>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.videos.map((video, idx) => (
                <div key={`video-${idx}`} className="rounded-2xl overflow-hidden bg-navy/5 shadow-lg group">
                  <div className="relative">
                    <video
                      controls
                      className="w-full aspect-video bg-black"
                      preload="metadata"
                    >
                      <source src={video} type="video/mp4" />
                      {lang === 'it' ? 'Il tuo browser non supporta il video.' : 'Twoja przeglądarka nie obsługuje wideo.'}
                    </video>
                    <div className="absolute top-3 left-3 bg-orange/90 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Play size={10} fill="white" />
                      VIDEO
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-navy text-sm">
                      {lang === 'it' ? `Video ${idx + 1}` : `Wideo ${idx + 1}`}
                    </h3>
                    <p className="text-navy/50 text-xs mt-1">
                      {lang === 'it' ? 'Esperienza Zanzibar in movimento' : 'Doświadczenie Zanzibaru w ruchu'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {((filter === 'photos' && totalPhotos === 0) || (filter === 'videos' && totalVideos === 0)) && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📷</div>
            <p className="text-navy/50">
              {lang === 'it' ? 'Nessun contenuto disponibile' : 'Brak dostępnej zawartości'}
            </p>
          </div>
        )}

        {/* TODO: Albums section - currently disabled */}
        {/* 
          albumsEnabled: false
          TODO: Implement album functionality when ready
          Structure planned:
          {
            "albums": [
              {
                "album_id": "alb_01",
                "title": { "it": "Spiagge", "pl": "Plaże" },
                "cover": "/images/albums/alb_01/cover.jpg",
                "photos": ["/images/albums/alb_01/1.jpg", ...]
              }
            ]
          }
          When albumsEnabled becomes true, render album cards with cover images
          that open a filtered lightbox showing only that album's photos.
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
