import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { end: 20, suffix: '+', label: 'Years of Excellence' },
  { end: 7, suffix: '', label: 'Completed Projects' },
  { end: 1, suffix: '', label: 'Ongoing Project' },
  { end: 1, suffix: '', label: 'Commercial Tower' },
];

const StatsBar = () => {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line reveal animation
      gsap.from('.stats-line', {
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      // Count up each number
      stats.forEach((stat, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.end,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          onUpdate: () => {
            setCounts(prev => {
              const next = [...prev];
              next[i] = Math.round(obj.val);
              return next;
            });
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#111111] border-t border-white/5 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-16 px-6 md:px-10 text-center">
              <span className="text-6xl md:text-7xl font-heading font-bold text-white leading-none mb-0">
                {counts[i]}{stat.suffix}
              </span>
              <div className="stats-line w-8 h-px bg-accent my-4 origin-left"></div>
              <span className="text-[11px] tracking-[0.25em] text-white/50 uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
