import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { MapPin, Camera, BookOpen, ArrowRight } from 'lucide-react';

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
}

export default function HomePage() {
  const { lang, t } = useLang();
  const [tours, setTours] = useState<Tour[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`/data/${lang}/tours.json`)
      .then(r => r.json())
      .then(data => setTours(data.slice(0, 3)))
      .catch(() => {});
    fetch(`/data/${lang}/posts.json`)
      .then(r => r.json())
      .then(data => setPosts(data.slice(0, 3)))
      .catch(() => {});
  }, [lang]);

  const currencySymbol = lang === 'it' ? '€' : 'zł';

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-teal/80" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-teal/20 border-2 border-teal/40 mb-6">
              <span className="text-5xl">🌴</span>
            </div>
          </div>
          <h1 className="font-[Pacifico] text-5xl sm:text-7xl text-white mb-4 leading-tight">
            Zanzibar Vibe Tours
          </h1>
          <p className="text-xl sm:text-2xl text-teal/90 mb-8 font-light">
            {t('hero_subtitle')}
          </p>
          <Link
            to={lang === 'it' ? '/it/tour' : '/pl/wycieczka'}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg shadow-orange/30"
          >
            {t('hero_cta')}
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="#FBF3D5" />
          </svg>
        </div>
      </section>

      {/* Tours Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-[Pacifico] text-3xl sm:text-4xl text-navy flex items-center gap-3">
              <MapPin className="text-teal" size={32} />
              {t('tours_preview')}
            </h2>
            <Link
              to={lang === 'it' ? '/it/tour' : '/pl/wycieczka'}
              className="hidden sm:flex items-center gap-1 text-teal hover:text-orange font-semibold transition-colors"
            >
              {t('view_all')} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <Link
                key={tour.tour_id}
                to={lang === 'it' ? `/it/tour/${tour.tour_id}` : `/pl/wycieczka/${tour.tour_id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-br from-teal/20 to-navy/10 flex items-center justify-center overflow-hidden">
                  <img
                    src={tour.img_title}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span className="absolute text-4xl opacity-30 group-hover:opacity-0 transition-opacity">🏝️</span>
                </div>
                <div className="p-5">
                  <h3 className="font-[Pacifico] text-lg text-navy mb-2">{tour.title}</h3>
                  <p className="text-navy/60 text-sm mb-3 line-clamp-2">{tour.short_desc}</p>
                  <p className="text-teal font-bold text-lg">
                    {t('from')} {tour.price.toLocaleString()} {currencySymbol}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 px-4 bg-navy/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-[Pacifico] text-3xl sm:text-4xl text-navy flex items-center gap-3">
              <Camera className="text-orange" size={32} />
              {t('gallery_preview')}
            </h2>
            <Link
              to={lang === 'it' ? '/it/galleria' : '/pl/galeria'}
              className="hidden sm:flex items-center gap-1 text-teal hover:text-orange font-semibold transition-colors"
            >
              {t('view_all')} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-teal/10 to-orange/10 hover:shadow-lg transition-all group cursor-pointer">
                <img
                  src={`/images/gallery/photo${i}.jpg`}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/400/400?random=${i + 10}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-[Pacifico] text-3xl sm:text-4xl text-navy flex items-center gap-3">
              <BookOpen className="text-teal" size={32} />
              {t('blog_preview')}
            </h2>
            <Link
              to={lang === 'it' ? '/it/blog' : '/pl/blog'}
              className="hidden sm:flex items-center gap-1 text-teal hover:text-orange font-semibold transition-colors"
            >
              {t('view_all')} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.post_id}
                to={lang === 'it' ? `/it/blog/${post.post_id}` : `/pl/blog/${post.post_id}`}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border-l-4 border-teal"
              >
                <h3 className="font-[Inter] font-bold text-navy mb-2">{post.title}</h3>
                <span className="text-teal text-sm font-semibold flex items-center gap-1">
                  {t('read_more')} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
