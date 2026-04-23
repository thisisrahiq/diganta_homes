import React, { useState } from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';

const InputField = ({ label, name, type = 'text', placeholder, required = true, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] tracking-[0.2em] uppercase text-gray-500 font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent border-b border-gray-300 focus:border-[#111111] py-3 text-sm text-[#111111] placeholder-gray-300 outline-none transition-colors duration-300"
    />
  </div>
);

const TextareaField = ({ label, name, placeholder, rows = 4, required = true, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] tracking-[0.2em] uppercase text-gray-500 font-semibold">{label}</label>
    <textarea
      name={name}
      required={required}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent border-b border-gray-300 focus:border-[#111111] py-3 text-sm text-[#111111] placeholder-gray-300 outline-none transition-colors duration-300 resize-none"
    />
  </div>
);

const SelectField = ({ label, name, options, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] tracking-[0.2em] uppercase text-gray-500 font-semibold">{label}</label>
    <select 
      name={name}
      value={value}
      onChange={onChange}
      className="bg-transparent border-b border-gray-300 focus:border-[#111111] py-3 text-sm text-[#111111] outline-none transition-colors duration-300 appearance-none cursor-pointer"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const Contact = () => {
  const [activeTab, setActiveTab] = useState('clients');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    // Construct subject if it's a landowner form
    const submissionData = { ...formData };
    if (activeTab === 'landowners') {
        submissionData.subject = 'Landowner Inquiry';
    }

    try {
      const response = await fetch(`${API_URL}/api/messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-[#111111] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-12 w-full">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-3">Reach Out</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Sidebar content remains same */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-6">Our Office</p>
              <div className="space-y-6 text-sm text-gray-500">
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                  <p>Near Bhadderhat, C.D.A Avenue<br />Chattogram, Bangladesh</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-accent shrink-0" />
                  <a href="tel:+8801820183749" className="hover:text-[#111111] transition-colors">+880 1820-183749</a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={16} className="text-accent shrink-0" />
                  <a href="mailto:info@digantahomes.com" className="hover:text-[#111111] transition-colors">info@digantahomes.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-[#f8f7f4] p-8 md:p-12">
            <div className="flex gap-0 mb-10 border-b border-gray-200">
              {['clients', 'landowners'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 pr-8 text-[11px] tracking-[0.25em] uppercase font-semibold transition-colors border-b-2 ${activeTab === tab ? 'text-[#111111] border-accent' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                >
                  {tab === 'clients' ? 'For Buyers / Clients' : 'For Landowners'}
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                <div className="w-12 h-12 border-2 border-accent flex items-center justify-center mb-6">
                  <span className="text-accent text-xl">✓</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-[#111111] mb-2">Message Sent</h3>
                <p className="text-sm text-gray-400">Thank you. Our team will respond within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-[#111111] transition-colors">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Full Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Mohammed Ali" />
                  <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+880 1..." />
                </div>

                <InputField label="Email Address" name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="you@example.com" />

                {activeTab === 'clients' ? (
                  <>
                    <SelectField
                      label="I'm Interested In"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      options={['General Inquiry', 'Residential Apartment', 'Commercial Space']}
                    />
                    <TextareaField label="Your Message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your requirements..." />
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputField label="Location of Land" name="location" value={formData.location || ''} onChange={handleInputChange} placeholder="e.g. Khulshi, Chattogram" />
                      <InputField label="Land Size (Katha)" name="plot_size_katha" value={formData.plot_size_katha || ''} onChange={handleInputChange} placeholder="e.g. 5 Katha" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputField label="Plot Size (sqft)" name="plot_size_sqft" value={formData.plot_size_sqft || ''} onChange={handleInputChange} placeholder="e.g. 3600 sqft" />
                      <SelectField
                        label="Road Width"
                        name="road_width"
                        value={formData.road_width || ''}
                        onChange={handleInputChange}
                        options={['Under 12 ft', '12–20 ft', '20–40 ft', '40 ft and above']}
                      />
                    </div>
                    <TextareaField label="Additional Details" name="message" value={formData.message} onChange={handleInputChange} placeholder="Facing direction, utilities, any relevant info..." />
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="self-start flex items-center gap-4 bg-[#111111] text-white px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-accent transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                  <span className="text-lg leading-none">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
