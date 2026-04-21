import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/projects/')
      .then(res => res.json())
      .then(data => setProjects(data.slice(0, 6)))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  useEffect(() => {
    if (!projects.length) return;
    const ctx = gsap.context(() => {
      gsap.from('.fp-card', {
        y: 80, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [projects]);

  // Rancon-style: first card spans 2 rows
  return (
    <section ref={sectionRef} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-4">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111111] leading-[1.1]">
              Our Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="group flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase font-semibold text-[#111111] hover:text-accent transition-colors self-end mb-1"
          >
            <span>View All</span>
            <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-500"></span>
          </Link>
        </div>

        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large featured first card */}
            <Link
              to={`/projects/${projects[0].slug}`}
              className="fp-card group relative overflow-hidden bg-gray-100 row-span-2 col-span-1 lg:col-span-1 h-[520px] md:h-[680px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out group-hover:scale-105"
                style={{ backgroundImage: `url(${projects[0].cover_image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="text-[10px] tracking-[0.3em] uppercase text-accent border border-accent/50 px-3 py-1 inline-block mb-4">
                  {projects[0].status}
                </span>
                <h3 className="text-2xl font-heading font-bold text-white mb-1">{projects[0].name}</h3>
                <p className="text-white/50 text-xs tracking-widest uppercase">{projects[0].type}</p>
              </div>
            </Link>

            {/* Remaining cards */}
            {projects.slice(1).map((proj) => (
              <Link
                key={proj.id}
                to={`/projects/${proj.slug}`}
                className="fp-card group relative overflow-hidden bg-gray-100 h-[320px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${proj.cover_image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-accent border border-accent/50 px-3 py-1 inline-block mb-3">
                    {proj.status}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-white mb-1">{proj.name}</h3>
                  <p className="text-white/50 text-xs tracking-widest uppercase">{proj.type}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
