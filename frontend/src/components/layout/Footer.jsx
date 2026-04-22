import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Top strip with logo & tagline */}
      <div className="border-b border-white/10 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-16 w-16 overflow-hidden flex items-start">
              <img src="/Logo/logo-transparent.png" alt="Diganta Homes Logo" className="h-20 w-auto opacity-70 group-hover:opacity-100 transition-opacity object-cover object-top" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bodoni-moda font-bold text-xl tracking-[0.15em] text-white uppercase whitespace-nowrap">Diganta Homes</span>
              <span className="text-accent text-[10px] font-bold uppercase mt-0.5" style={{ textAlignLast: 'justify' }}>L I M I T E D</span>
            </div>
          </Link>
          <p className="text-white/40 text-sm text-center md:text-right max-w-sm leading-relaxed tracking-wide">
            Building Dreams in Chattogram<br />for Over Two Decades.
          </p>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h5 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6 font-semibold">Navigation</h5>
          <ul className="space-y-3">
            {['/', '/about', '/projects', '/careers', '/news', '/contact'].map((path, i) => (
              <li key={i}>
                <Link to={path} className="text-white/50 hover:text-white text-sm transition-colors">
                  {['Home', 'About', 'Projects', 'Careers', 'News', 'Contact'][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6 font-semibold">Projects</h5>
          <ul className="space-y-3 text-white/50 text-sm">
            <li><Link to="/projects?status=completed" className="hover:text-white transition-colors">Completed</Link></li>
            <li><Link to="/projects?status=ongoing" className="hover:text-white transition-colors">Ongoing</Link></li>
            <li><Link to="/projects?type=mixed" className="hover:text-white transition-colors">Commercial</Link></li>
            <li><Link to="/projects?type=residential" className="hover:text-white transition-colors">Residential</Link></li>
          </ul>
        </div>

        <div className="col-span-2">
          <h5 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6 font-semibold">Contact</h5>
          <ul className="space-y-4 text-sm text-white/50">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
              <span>Near Bhadderhat, C.D.A Avenue<br />Chattogram, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-accent shrink-0" />
              <a href="tel:+8801820183749" className="hover:text-white transition-colors">+880 1820-183749</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-accent shrink-0" />
              <a href="mailto:info@digantahomes.com" className="hover:text-white transition-colors">info@digantahomes.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[11px] tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Diganta Homes Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px] tracking-widest uppercase text-white/30 items-center">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span className="w-px h-3 bg-white/20"></span>
            <span>Developed By <a href="https://rahiq.up.railway.app/" target="_blank" rel="noreferrer" className="text-accent hover:text-white transition-colors font-bold">Rahiq Al Makhtum</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
