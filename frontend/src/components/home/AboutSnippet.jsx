import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSnippet = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-img', {
        x: -60, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      });
      gsap.from('.about-text > *', {
        y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Image column */}
        <div className="about-img relative h-[580px] flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900"
            alt="Diganta Homes project"
            className="w-full h-full object-cover shadow-2xl"
          />
          {/* Floating stat card — Rancon style */}
          <div className="absolute -right-6 bottom-12 bg-[#111111] px-8 py-6 shadow-2xl hidden md:block">
            <p className="text-5xl font-heading font-bold text-white">20<span className="text-accent">+</span></p>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/50 mt-1">Years of Trust</p>
          </div>
        </div>

        {/* Text column */}
        <div className="about-text flex flex-col gap-6">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold">Our Legacy</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111111] leading-[1.1]">
            Defining the Skyline<br />of Chattogram
          </h2>
          <div className="w-12 h-px bg-accent"></div>
          <p className="text-gray-500 leading-relaxed">
            Founded over two decades ago, Diganta Homes Limited has grown to become a cornerstone of Chattogram's real estate development. We believe in creating spaces that not only provide shelter, but elevate the standard of living.
          </p>
          <p className="text-gray-500 leading-relaxed">
            With a commitment to uncompromising quality, modern architecture, and timely delivery, our diverse portfolio of residential and commercial properties stands as a testament to our deep dedication to excellence.
          </p>

          <Link
            to="/about"
            className="mt-4 self-start flex items-center gap-4 group text-[11px] tracking-[0.3em] uppercase font-semibold text-[#111111] hover:text-accent transition-colors"
          >
            <span>Discover Our Story</span>
            <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-500"></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
