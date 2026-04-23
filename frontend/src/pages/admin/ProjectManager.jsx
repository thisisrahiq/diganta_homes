import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, X, Save, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const emptyProject = {
    name: '',
    slug: '',
    type: 'residential',
    status: 'ongoing',
    description: '',
    floors: '',
    is_featured: false,
    order: 0
  };

  const [formData, setFormData] = useState(emptyProject);
  const [coverImage, setCoverImage] = useState(null);

  const fetchProjects = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    try {
      const res = await fetch(`${API_URL}/api/projects/`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Auto-slugify name
    if (name === 'name' && !editingProject) {
        setFormData(prev => ({
            ...prev,
            name: value,
            slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        }));
    }
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    if (coverImage) {
      data.append('cover_image', coverImage);
    }

    const method = editingProject ? 'PATCH' : 'POST';
    const url = editingProject 
      ? `${API_URL}/api/projects/${editingProject.slug}/` 
      : `${API_URL}/api/projects/`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Token ${token}` },
        body: data
      });

      if (res.ok) {
        fetchProjects();
        setIsFormOpen(false);
        setEditingProject(null);
        setFormData(emptyProject);
        setCoverImage(null);
      } else {
        const errData = await res.json();
        alert('Error: ' + JSON.stringify(errData));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this masterpiece?')) return;
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_URL}/api/projects/${slug}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      setProjects(projects.filter(p => p.slug !== slug));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (proj) => {
    setEditingProject(proj);
    setFormData({
      name: proj.name,
      slug: proj.slug,
      type: proj.type,
      status: proj.status,
      description: proj.description,
      floors: proj.floors || '',
      is_featured: proj.is_featured,
      order: proj.order
    });
    setIsFormOpen(true);
  };

  if (loading) return <div className="text-center py-20 text-accent font-bold uppercase tracking-[0.3em] text-xs animate-pulse">Accessing Portfolios...</div>;

  return (
    <div className="relative">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Projects</h1>
          <p className="text-white/40 text-sm tracking-widest uppercase">Manage your property portfolio</p>
        </div>
        <button 
          onClick={() => {
            setIsFormOpen(true);
            setEditingProject(null);
            setFormData(emptyProject);
          }}
          className="bg-accent text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3"
        >
          <Plus size={16} /> Add New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-[#111111] border border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="p-6 text-[10px] font-bold tracking-widest uppercase text-white/40">Project</th>
              <th className="p-6 text-[10px] font-bold tracking-widest uppercase text-white/40">Type</th>
              <th className="p-6 text-[10px] font-bold tracking-widest uppercase text-white/40">Status</th>
              <th className="p-6 text-[10px] font-bold tracking-widest uppercase text-white/40">Featured</th>
              <th className="p-6 text-[10px] font-bold tracking-widest uppercase text-white/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 overflow-hidden border border-white/10 shrink-0">
                      <img src={getImageUrl(proj.cover_image)} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">{proj.name}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-widest">slug: {proj.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-[10px] font-bold text-white/50 uppercase tracking-widest">{proj.type}</td>
                <td className="p-6">
                    <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${proj.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-accent/10 text-accent'}`}>
                        {proj.status}
                    </span>
                </td>
                <td className="p-6">
                    <div className={`w-2 h-2 rounded-full ${proj.is_featured ? 'bg-accent' : 'bg-white/10'}`}></div>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(proj)} className="p-2 text-white/40 hover:text-white transition-colors"><Edit3 size={16} /></button>
                    <button onClick={() => deleteProject(proj.slug)} className="p-2 text-red-500/40 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#111111] z-10">
              <h2 className="text-2xl font-heading font-bold text-white uppercase tracking-widest">
                {editingProject ? 'Edit Masterpiece' : 'Draft New Project'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="text-white/40 hover:text-white transition-colors"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Project Name</label>
                    <input name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">URL Slug</label>
                    <input name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Type</label>
                      <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all">
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="mixed">Mixed-use</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Status</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all">
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-8 pt-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleInputChange} className="hidden" />
                        <div className={`w-5 h-5 border border-white/20 flex items-center justify-center transition-all ${formData.is_featured ? 'bg-accent border-accent' : ''}`}>
                            {formData.is_featured && <Save size={12} className="text-white" />}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Feature on Home</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Cover Image</label>
                    <div className="relative h-48 bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center group overflow-hidden">
                        {coverImage || editingProject?.cover_image ? (
                             <img 
                                src={coverImage ? URL.createObjectURL(coverImage) : getImageUrl(editingProject.cover_image)} 
                                className="absolute inset-0 w-full h-full object-cover opacity-50" 
                                alt=""
                             />
                        ) : (
                            <ImageIcon size={32} className="text-white/10 mb-2" />
                        )}
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 bg-black/60 px-4 py-2">Click to Upload</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Floors</label>
                    <input type="number" name="floors" value={formData.floors} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Sort Order</label>
                    <input type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Description</label>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows={6} 
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-all resize-none" 
                    required
                ></textarea>
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                <button 
                    type="button" 
                    onClick={() => setIsFormOpen(false)} 
                    className="px-10 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-all"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="bg-accent text-white px-12 py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 shadow-xl"
                >
                    {editingProject ? 'Update Masterpiece' : 'Commit Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
