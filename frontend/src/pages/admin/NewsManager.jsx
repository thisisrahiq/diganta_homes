import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, X, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';

const NewsManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const emptyPost = {
    title: '',
    slug: '',
    content: ''
  };

  const [formData, setFormData] = useState(emptyPost);
  const [image, setImage] = useState(null);

  const fetchPosts = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    try {
      const res = await fetch(`${API_URL}/api/news/`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'title' && !editingPost) {
        setFormData(prev => ({
            ...prev,
            title: value,
            slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        }));
    }
  };

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    const method = editingPost ? 'PATCH' : 'POST';
    const url = editingPost 
      ? `${API_URL}/api/news/${editingPost.slug}/` 
      : `${API_URL}/api/news/`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Token ${token}` },
        body: data
      });

      if (res.ok) {
        fetchPosts();
        setIsFormOpen(false);
        setEditingPost(null);
        setFormData(emptyPost);
        setImage(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this news?')) return;
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_URL}/api/news/${slug}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      setPosts(posts.filter(p => p.slug !== slug));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-20 text-accent font-bold uppercase tracking-[0.3em] text-xs">Accessing Press Releases...</div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">News</h1>
          <p className="text-white/40 text-sm tracking-widest uppercase">Manage press releases and updates</p>
        </div>
        <button 
          onClick={() => {
            setIsFormOpen(true);
            setEditingPost(null);
            setFormData(emptyPost);
          }}
          className="bg-accent text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3"
        >
          <Plus size={16} /> Create News Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#111111] border border-white/5 flex gap-6 p-6 group">
            <div className="w-32 h-32 bg-white/5 overflow-hidden shrink-0 border border-white/10">
              <img src={getImageUrl(post.image)} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-heading font-bold text-white mb-2 line-clamp-1">{post.title}</h3>
                    <div className="flex gap-2">
                        <button onClick={() => { setEditingPost(post); setFormData(post); setIsFormOpen(true); }} className="text-white/40 hover:text-white transition-colors"><Edit3 size={14} /></button>
                        <button onClick={() => deletePost(post.slug)} className="text-red-500/40 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                </div>
                <p className="text-white/30 text-[11px] line-clamp-2 leading-relaxed">{post.content}</p>
              </div>
              <div className="text-[9px] text-accent font-bold uppercase tracking-widest">
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/10 w-full max-w-4xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="p-8 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#111111] z-10">
              <h2 className="text-2xl font-heading font-bold text-white uppercase tracking-widest">
                {editingPost ? 'Update News' : 'Draft News'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="text-white/40 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Headline</label>
                            <input name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all" required />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">URL Slug</label>
                            <input name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Cover Image</label>
                        <div className="relative h-40 bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center group overflow-hidden">
                            {image || editingPost?.image ? (
                                <img src={image ? URL.createObjectURL(image) : getImageUrl(editingPost.image)} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
                            ) : (
                                <ImageIcon size={24} className="text-white/10 mb-2" />
                            )}
                            <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                            <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">Click to Upload</span>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Content</label>
                    <textarea name="content" value={formData.content} onChange={handleInputChange} rows={10} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all resize-none" required></textarea>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-all">Cancel</button>
                    <button type="submit" className="bg-accent text-white px-10 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500">
                        {editingPost ? 'Update' : 'Post Update'}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManager;
