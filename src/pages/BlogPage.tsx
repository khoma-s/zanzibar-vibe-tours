import { useState, useEffect, useMemo } from 'react';
import { useLang } from '../context/LangContext';
import Loading from '../components/Loading';
import { BookOpen, X, Search, Tag, ChevronRight } from 'lucide-react';

interface Post {
  post_id: string;
  title: string;
  text: string;
  category?: string;
}

export default function BlogPage() {
  const { lang, t } = useLang();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetch(`/data/${lang}/posts.json`)
      .then(r => r.json())
      .then((data: Post[]) => {
        // Add default categories if missing
        const enriched = data.map((post) => ({
          ...post,
          category: post.category || (lang === 'it' ? 'Consigli' : 'Porady'),
        }));
        setPosts(enriched);
      })
      .catch(() => {});
  }, [lang]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(posts.map(p => p.category).filter((c): c is string => Boolean(c)));
    return ['all', ...Array.from(cats)];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  // Category colors
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Consigli': 'bg-teal/10 text-teal',
      'Porady': 'bg-teal/10 text-teal',
      'Cultura': 'bg-orange/10 text-orange',
      'Kultura': 'bg-orange/10 text-orange',
      'Natura': 'bg-green-100 text-green-700',
      'Aventures': 'bg-purple-100 text-purple-700',
      'Przygody': 'bg-purple-100 text-purple-700',
    };
    return colors[category] || 'bg-navy/10 text-navy/70';
  };

  if (posts.length === 0) {
    return <Loading />;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-[Pacifico] text-4xl sm:text-5xl text-navy mb-4 flex items-center justify-center gap-3">
            <BookOpen className="text-teal" size={40} />
            {t('blog')}
          </h1>
          <div className="w-24 h-1 bg-orange mx-auto rounded-full mb-4" />
          <p className="text-navy/60 max-w-2xl mx-auto">
            {lang === 'it'
              ? 'Storie, consigli e ispirazioni per il tuo viaggio a Zanzibar.'
              : 'Historie, porady i inspiracje dla Twojej podróży na Zanzibar.'}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'it' ? 'Cerca articoli...' : 'Szukaj artykułów...'}
              className="w-full pl-10 pr-4 py-2.5 bg-cream/50 border border-navy/10 rounded-lg text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-teal transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal text-white shadow-sm'
                    : 'bg-cream/50 text-navy/60 hover:bg-cream hover:text-navy'
                }`}
              >
                {cat === 'all' ? (lang === 'it' ? 'Tutti' : 'Wszystkie') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-4">
            {filteredPosts.map((post, idx) => (
              <button
                key={post.post_id}
                onClick={() => setSelectedPost(post)}
                className="w-full text-left bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Decorative side */}
                  <div className="sm:w-2 w-full h-1 sm:h-auto bg-gradient-to-b from-teal to-orange flex-shrink-0" />
                  
                  <div className="flex-1 p-6">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {post.category && (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                          <Tag size={10} />
                          {post.category}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-[Inter] font-normal text-xl text-navy mb-2 group-hover:text-teal transition-colors">
                      {post.title}
                    </h3>

                    {/* Preview */}
                    <p className="text-navy/50 text-sm line-clamp-2 mb-3">
                      {post.text.substring(0, 150)}...
                    </p>

                    {/* Read more */}
                    <span className="inline-flex items-center gap-1 text-teal text-sm font-semibold group-hover:gap-2 transition-all">
                      {t('read_more')}
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-navy/50">
              {lang === 'it' ? 'Nessun articolo trovato' : 'Nie znaleziono artykułów'}
            </p>
          </div>
        )}

        {/* Results count */}
        {searchQuery && (
          <div className="text-center mt-6 text-sm text-navy/40">
            {filteredPosts.length} {lang === 'it' ? 'risultati per' : 'wyników dla'} "{searchQuery}"
          </div>
        )}
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-slideIn shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-navy to-teal/80 p-6 relative flex-shrink-0">
              <button
                className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all"
                onClick={() => setSelectedPost(null)}
                aria-label={t('close')}
              >
                <X size={24} />
              </button>
              
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {selectedPost.category && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 text-white">
                    <Tag size={10} />
                    {selectedPost.category}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-[Pacifico] text-2xl sm:text-3xl text-white pr-8">
                {selectedPost.title}
              </h2>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8">
              <div className="prose prose-sm max-w-none">
                <p className="text-navy/80 leading-relaxed text-base whitespace-pre-line">
                  {selectedPost.text}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-navy/10 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-navy/40 uppercase tracking-wider font-semibold">
                    {lang === 'it' ? 'Categoria:' : 'Kategoria:'}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(selectedPost.category || '')}`}>
                    {selectedPost.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
