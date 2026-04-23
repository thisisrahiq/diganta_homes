import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../utils/imageUrl';
import { Calendar, ArrowRight } from 'lucide-react';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      try {
        const res = await fetch(`${API_URL}/api/news/`);
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-24 text-accent animate-pulse font-heading text-xl">Loading Updates...</div>;

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#111111] py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-4">Press & Updates</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight max-w-2xl">Latest News & Insights From Diganta</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        {news.length === 0 ? (
            <div className="text-center py-20">
                <p className="text-gray-400 italic">No news updates at the moment.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {news.map((post) => (
                    <article key={post.id} className="group flex flex-col h-full">
                        <div className="relative h-64 overflow-hidden mb-6">
                            <img 
                                src={getImageUrl(post.image)} 
                                alt={post.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
                                Update
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-4">
                            <Calendar size={12} className="text-accent" />
                            <span>{new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-[#111111] mb-4 line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                            {post.content}
                        </p>
                        <button className="mt-auto flex items-center gap-4 text-[10px] font-bold tracking-[0.25em] uppercase text-[#111111] group-hover:text-accent transition-colors">
                            Read Full Story
                            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </article>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default News;
