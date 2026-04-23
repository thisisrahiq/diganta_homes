import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import ApplicationModal from '../components/careers/ApplicationModal';

const Careers = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpening, setSelectedOpening] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchOpenings = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      try {
        const res = await fetch(`${API_URL}/api/careers/`);
        const data = await res.json();
        setOpenings(data.filter(o => o.is_active));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOpenings();
  }, []);

  const handleApplySuccess = () => {
    setSelectedOpening(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-24 text-accent animate-pulse font-heading text-xl uppercase tracking-widest">Scanning Opportunities...</div>;

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-28 right-10 z-[110] bg-[#111111] border-l-4 border-accent p-6 shadow-2xl animate-slide-in">
            <div className="flex items-center gap-4">
                <CheckCircle className="text-accent" />
                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-[10px]">Application Received</h4>
                    <p className="text-white/40 text-[9px] uppercase tracking-widest mt-1">We will review your profile shortly.</p>
                </div>
            </div>
        </div>
      )}

      {/* Modal */}
      {selectedOpening && (
        <ApplicationModal 
            opening={selectedOpening} 
            onClose={() => setSelectedOpening(null)} 
            onSuccess={handleApplySuccess}
        />
      )}

      {/* Hero */}
      <div className="bg-[#111111] py-28 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-6 italic">Join The Legacy</p>
            <h1 className="text-4xl md:text-7xl font-heading font-bold text-white leading-tight max-w-3xl mb-8">Build The Future of Chattogram With Us</h1>
            <p className="text-white/40 text-lg max-w-xl leading-relaxed font-light tracking-wide">
                We are always looking for visionary architects, dedicated engineers, and passionate professionals to join our growing family.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-28">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
            <div>
                <h2 className="text-3xl font-heading font-bold text-[#111111] mb-2 uppercase tracking-tight">Open Positions</h2>
                <div className="w-12 h-1 bg-accent"></div>
            </div>
            <p className="text-gray-400 text-xs tracking-widest uppercase font-bold">{openings.length} Positions Available</p>
        </div>

        {openings.length === 0 ? (
            <div className="bg-[#f8f7f4] p-20 text-center border border-gray-100">
                <Briefcase size={40} className="mx-auto text-gray-200 mb-6" />
                <h3 className="text-xl font-heading font-bold text-[#111111] mb-2">No Active Openings</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                    While we don't have any specific roles open right now, we're always happy to hear from talented individuals. 
                    Send your CV to <span className="text-accent font-bold">careers@digantahomes.com</span>
                </p>
            </div>
        ) : (
            <div className="space-y-4">
                {openings.map((opening) => (
                    <div key={opening.id} className="group bg-[#f8f7f4] hover:bg-[#111111] p-8 md:p-12 transition-all duration-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-transparent hover:border-accent/20">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <MapPin size={12} />
                                    <span>{opening.location}</span>
                                </div>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Full Time</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#111111] group-hover:text-white transition-colors mb-4">{opening.title}</h3>
                            <p className="text-gray-500 group-hover:text-white/40 transition-colors text-sm leading-relaxed line-clamp-2">
                                {opening.description}
                            </p>
                        </div>
                        <button 
                            onClick={() => setSelectedOpening(opening)}
                            className="flex items-center gap-4 bg-[#111111] group-hover:bg-accent text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 whitespace-nowrap"
                        >
                            Apply Now
                            <ArrowRight size={14} />
                        </button>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* Culture Section */}
      <div className="bg-[#f8f7f4] py-28 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative h-[600px] overflow-hidden group">
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                    alt="Our Office Culture" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                />
                <div className="absolute inset-0 border-[20px] border-white/10 m-6"></div>
            </div>
            <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-6">Our Culture</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111111] mb-8 leading-tight">Work Environment That Inspires Excellence</h2>
                <div className="space-y-8 text-gray-500 leading-relaxed">
                    <p>At Diganta Homes Limited, we foster a culture of collaboration, innovation, and mutual respect. Our team is our greatest asset, and we invest heavily in professional growth and well-being.</p>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-bold text-[#111111] mb-2 uppercase tracking-widest text-xs">Innovation</h4>
                            <p className="text-xs">Always pushing the boundaries of architectural design.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-[#111111] mb-2 uppercase tracking-widest text-xs">Integrity</h4>
                            <p className="text-xs">Building trust through transparency and honesty.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
