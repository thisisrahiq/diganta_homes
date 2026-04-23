import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, X, Save, Mail, User, Phone, Calendar, FileText } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';

const CareerManager = () => {
  const [activeTab, setActiveTab] = useState('postings');
  const [openings, setOpenings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOpening, setEditingOpening] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const emptyOpening = {
    title: '',
    description: '',
    requirements: '',
    location: 'Chattogram',
    is_active: true
  };

  const [formData, setFormData] = useState(emptyOpening);

  const fetchOpenings = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    try {
      const [postRes, appRes] = await Promise.all([
        fetch(`${API_URL}/api/careers/`),
        fetch(`${API_URL}/api/applications/`, { headers: { 'Authorization': `Token ${token}` } })
      ]);
      const postData = await postRes.json();
      const appData = await appRes.json();
      setOpenings(postData);
      setApplications(appData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    const method = editingOpening ? 'PATCH' : 'POST';
    const url = editingOpening 
      ? `${API_URL}/api/careers/${editingOpening.id}/` 
      : `${API_URL}/api/careers/`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Token ${token}` },
        body: data
      });

      if (res.ok) {
        fetchOpenings();
        setIsFormOpen(false);
        setEditingOpening(null);
        setFormData(emptyOpening);
        setImage(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOpening = async (id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_URL}/api/careers/${id}//`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      fetchOpenings();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_URL}/api/applications/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      fetchOpenings();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-20 text-accent font-bold uppercase tracking-[0.3em] text-xs">Accessing Career Portal...</div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-heading font-bold text-white mb-6 uppercase tracking-tight">Career Hub</h1>
          <div className="flex gap-8 border-b border-white/5">
            <button 
              onClick={() => setActiveTab('postings')} 
              className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all border-b-2 ${activeTab === 'postings' ? 'text-accent border-accent' : 'text-white/30 border-transparent hover:text-white'}`}
            >
              Job Postings ({openings.length})
            </button>
            <button 
              onClick={() => setActiveTab('applications')} 
              className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all border-b-2 ${activeTab === 'applications' ? 'text-accent border-accent' : 'text-white/30 border-transparent hover:text-white'}`}
            >
              Applications ({applications.length})
            </button>
          </div>
        </div>
        
        {activeTab === 'postings' && (
          <button 
            onClick={() => {
              setIsFormOpen(true);
              setEditingOpening(null);
              setFormData(emptyOpening);
            }}
            className="bg-accent text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3"
          >
            <Plus size={16} /> Post New Position
          </button>
        )}
      </div>

      {activeTab === 'postings' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openings.map((opening) => (
            <div key={opening.id} className="bg-[#111111] border border-white/5 p-8 group">
              <div className="flex justify-between items-start mb-6">
                <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${opening.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {opening.is_active ? 'Active' : 'Hidden'}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setEditingOpening(opening);
                      setFormData(opening);
                      setIsFormOpen(true);
                    }}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => deleteOpening(opening.id)} className="text-red-500/40 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">{opening.title}</h3>
              <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-4">{opening.location}</p>
              <p className="text-white/40 text-xs line-clamp-3 mb-6 leading-relaxed">{opening.description}</p>
              <div className="text-[9px] text-white/20 uppercase tracking-widest">Posted on {new Date(opening.created_at).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-20 text-white/20 text-xs uppercase tracking-widest italic font-bold">No applications received yet</div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-[#111111] border border-white/5 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-accent/30 transition-all">
                <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-[9px] font-bold bg-accent/10 text-accent px-3 py-1 rounded-full uppercase tracking-widest">{app.opening_title}</span>
                        <span className="text-white/20 text-[10px]">{new Date(app.created_at).toLocaleString()}</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-widest">{app.name}</h3>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2 text-white/40 text-xs">
                            <Mail size={12} className="text-accent" />
                            <span>{app.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40 text-xs">
                            <Phone size={12} className="text-accent" />
                            <span>{app.phone}</span>
                        </div>
                    </div>
                    {app.message && (
                        <div className="mt-6 p-4 bg-white/2 border border-white/5 text-white/60 text-xs leading-relaxed italic">
                            "{app.message}"
                        </div>
                    )}
                </div>
                <div className="flex gap-4">
                    {app.cv_file && (
                        <a 
                            href={getImageUrl(app.cv_file)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-accent text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 hover:bg-white hover:text-black"
                        >
                            <FileText size={14} /> Download CV
                        </a>
                    )}
                    <button onClick={() => deleteApplication(app.id)} className="text-red-500/40 hover:text-red-500 transition-colors p-3"><Trash2 size={16} /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/10 w-full max-w-2xl shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-heading font-bold text-white uppercase tracking-widest">
                {editingOpening ? 'Edit Position' : 'Post Position'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="text-white/40 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Job Title</label>
                <input name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all" required />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Location</label>
                  <input name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Image</label>
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white/40 focus:border-accent outline-none transition-all" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                  <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="w-4 h-4 bg-white/5 border-white/10 text-accent focus:ring-accent" />
                  <label htmlFor="is_active" className="text-[10px] font-bold uppercase tracking-widest text-white/60">Visible to Public</label>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all resize-none" required></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Requirements</label>
                <textarea name="requirements" value={formData.requirements} onChange={handleInputChange} rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all resize-none"></textarea>
              </div>
              <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-all">Cancel</button>
                <button type="submit" className="bg-accent text-white px-10 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500">
                    {editingOpening ? 'Update' : 'Post Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerManager;
