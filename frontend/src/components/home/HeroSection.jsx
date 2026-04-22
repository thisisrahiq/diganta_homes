import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUrl';

// Hero slides with the exact 3 projects requested
const HERO_SLIDES = [
  {
    image: '/media/projects/covers/001_yx59dmW.png',
    slug: 'diganta-khaja-tower',
    name: 'Diganta Khaja Tower',
    subtitle: 'Mixed-Use | 13 Floors | Bhadderhat, Chattogram',
  },
  {
    image: '/media/projects/covers/001_F2Fo5rx.png',
    slug: 'diganta-khulshi-tower',
    name: 'Diganta Khulshi Tower',
    subtitle: 'Residential | West Khulshi, Chattogram',
  },
  {
    image: '/media/projects/covers/001_2QXIycb.png',
    slug: 'diganta-alive-tower',
    name: 'Diganta Alive Tower',
    subtitle: 'Residential | Chattogram',
  },
  {
    image: '/media/projects/covers/001_UgJF4lj.png',
    slug: 'diganta-shobhan-regency',
    name: 'Diganta Shobhan Regency',
    subtitle: 'Residential | Ongoing | Chattogram',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const headingRef = useRef(null);
  const subRef = useRef(null);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setCurrent(prev => (prev + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  // GSAP text reveal on slide change
  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo(subRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
    );
    setLoaded(true);
  }, [current]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#111111]">
      {/* Background Images */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDuration: '1500ms' }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${getImageUrl(s.image)})`,
              transform: i === current ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 8s ease-out',
            }}
          />
          {/* Gradient overlay — Rancon style: heavy at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 px-8 md:px-20 z-10">
        {/* Project Label (like Rancon's status badge) */}
        <div className="mb-4">
          <span className="inline-block border border-accent/60 text-accent text-xs tracking-[0.3em] uppercase px-4 py-1.5">
            {slide.subtitle}
          </span>
        </div>

        {/* Project Name */}
        <h1 ref={headingRef} className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-4 leading-[1.05] max-w-4xl">
          {slide.name}
        </h1>

        {/* Explore Link */}
        <div ref={subRef} className="flex items-center gap-8 mt-2">
          <Link
            to={`/projects/${slide.slug}`}
            className="group flex items-center gap-3 text-white/70 hover:text-white text-xs tracking-[0.3em] uppercase transition-colors"
          >
            <span className="w-8 h-px bg-white/40 group-hover:w-14 group-hover:bg-accent transition-all duration-500"></span>
            Explore Project
          </Link>
          <Link to="/projects" className="text-white/40 hover:text-accent text-xs tracking-[0.3em] uppercase transition-colors">
            All Projects
          </Link>
        </div>
      </div>

      {/* Slide indicators — vertical right side like Rancon */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${i === current ? 'h-8 w-1 bg-accent' : 'h-3 w-1 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 w-full bg-accent animate-bounce" style={{ height: '40%' }}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
