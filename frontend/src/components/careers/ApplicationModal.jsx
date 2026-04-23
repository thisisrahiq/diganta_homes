import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const ApplicationModal = ({ opening, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('opening', opening.id);
    if (cvFile) {
        data.append('cv_file', cvFile);
    }

    try {
      const response = await fetch(`${API_URL}/api/applications/`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        onSuccess();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="bg-[#111111] p-8 flex justify-between items-center">
            <div>
                <p className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Applying for</p>
                <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider">{opening.title}</h3>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                <X size={24} />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <div className="p-4 bg-red-50 text-red-500 text-xs font-bold uppercase tracking-widest border-l-2 border-red-500">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
              <input 
                name="name" 
                required 
                value={formData.name} 
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-2 text-sm focus:border-accent outline-none transition-colors" 
                placeholder="Mohammed Ali"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
              <input 
                name="phone" 
                required 
                value={formData.phone} 
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-2 text-sm focus:border-accent outline-none transition-colors" 
                placeholder="+880 1..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleChange}
              className="w-full border-b border-gray-200 py-2 text-sm focus:border-accent outline-none transition-colors" 
              placeholder="ali@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Upload CV (PDF/DOC)</label>
            <input 
              type="file" 
              onChange={(e) => setCvFile(e.target.files[0])}
              className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-accent/10 file:text-accent hover:file:bg-accent hover:file:text-white transition-all cursor-pointer" 
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Short Introduction / Message</label>
            <textarea 
              name="message" 
              rows={4} 
              value={formData.message} 
              onChange={handleChange}
              className="w-full border border-gray-100 p-4 text-sm focus:border-accent outline-none transition-colors resize-none" 
              placeholder="Tell us why you are a good fit..."
            ></textarea>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#111111] text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : (
                <>
                  Submit Application <Send size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
