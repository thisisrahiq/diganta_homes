import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Careers', path: '/careers' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHome = location.pathname === '/';
  const headerBg = isScrolled || !isHome ? 'bg-[#111111] shadow-2xl' : 'bg-transparent';

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-500 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-24">

            {/* Logo + Brand Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/Logo/logo-transparent.png" alt="Diganta Homes Logo" className="h-24 w-auto " />
              <div className="flex flex-col leading-none w-full">
                <span className="font-heading font-bold text-xl tracking-[0.15em] text-white uppercase whitespace-nowrap">Diganta Homes</span>
                <span className="text-accent text-[10px] font-bold uppercase mt-0.5" style={{ textAlignLast: 'justify' }}>L i m i t e d</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 group ${
                    location.pathname === link.path ? 'text-accent' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
              <a
                href="https://wa.me/8801820183749"
                target="_blank" rel="noreferrer"
                className="ml-4 px-5 py-2.5 border border-accent text-accent text-xs tracking-[0.2em] uppercase font-semibold hover:bg-accent hover:text-white transition-all duration-300"
              >
                Inquire Now
              </a>
            </nav>

            {/* Mobile menu button — 3 dots style like Rancon */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white flex flex-col gap-1.5 p-2">
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-[#111111] flex flex-col items-center justify-center transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-3xl font-heading font-bold text-white hover:text-accent transition-colors duration-300"
              style={{ transitionDelay: menuOpen ? `${idx * 60}ms` : '0ms' }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="mt-10 text-white/40 text-xs tracking-widest">+880 1820-183749</div>
      </div>
    </>
  );
};

export default Navbar;
