import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { BookOpen, X } from 'lucide-react';

interface Post {
  post_id: string;
  title: string;
  text: string;
}

export default function BlogPage() {
  const { lang, t } = useLang();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`/data/${lang}/posts.json`)
      .then(r => r.json())
      .then(setPosts)
      .catch(() => {});
  }, [lang]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-[Pacifico] text-4xl sm:text-5xl text-navy mb-4 flex items-center justify-center gap-3">
            <BookOpen className="text-teal" size={40} />
            {t('blog')}
          </h1>
          <div className="w-24 h-1 bg-orange mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <button
              key={post.post_id}
              onClick={() => setSelectedPost(post)}
              className="w-full text-left bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 border-l-4 border-teal group"
            >
              <h3 className="font-[Inter] font-bold text-lg text-navy group-hover:text-teal transition-colors">
                {post.title}
              </h3>
              <span className="text-teal text-sm font-semibold mt-2 inline-block">
                {t('read_more')} →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setSelectedPost(null)}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-navy/40 hover:text-navy p-1"
              onClick={() => setSelectedPost(null)}
            >
              <X size={24} />
            </button>
            <h2 className="font-[Pacifico] text-2xl sm:text-3xl text-navy mb-6 pr-8">
              {selectedPost.title}
            </h2>
            <p className="text-navy/80 leading-relaxed text-base whitespace-pre-line">
              {selectedPost.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
