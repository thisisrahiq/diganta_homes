import React from 'react';

// Amenity icon using SVG logos instead of numbers
const amenities = [
  {
    title: 'Security',
    desc: '24/7 CCTV surveillance and professional guards.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-accent">
        <path d="M24 4L6 12v14c0 9.5 7.7 18.4 18 21 10.3-2.6 18-11.5 18-21V12L24 4z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 24l5 5 9-9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Generator',
    desc: 'Standby generators for uninterrupted power.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-accent">
        <polygon points="24,4 10,28 24,24 24,44 38,20 24,24" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Parking',
    desc: 'Secure multi-level basement car parking.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-accent">
        <rect x="6" y="14" width="36" height="24" rx="4" strokeLinecap="round"/>
        <path d="M14 38V42M34 38V42" strokeLinecap="round"/>
        <path d="M6 26h36" strokeLinecap="round"/>
        <circle cx="15" cy="32" r="2" fill="currentColor"/>
        <circle cx="33" cy="32" r="2" fill="currentColor"/>
      </svg>
    )
  },
  {
    title: 'Elevator',
    desc: 'Premium high-speed lifts with safety backup.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-accent">
        <rect x="10" y="4" width="28" height="40" rx="2" strokeLinecap="round"/>
        <path d="M10 20h28M24 28v8M20 32l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Rooftop',
    desc: 'Dedicated rooftop recreational spaces.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-accent">
        <path d="M4 28l20-20 20 20" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="16" y="28" width="16" height="16" strokeLinecap="round"/>
        <path d="M20 28v16M28 28v16" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: 'Water Supply',
    desc: 'Continuous supply with overhead & underground tanks.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-accent">
        <path d="M24 6C24 6 10 20 10 30a14 14 0 0028 0C38 20 24 6 24 6z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 32a9 9 0 008 6" strokeLinecap="round"/>
      </svg>
    )
  },
];

const AmenitiesSection = () => {
  return (
    <section className="py-28 bg-[#f8f7f4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-4">Why Live Here</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111111] leading-[1.1]">Amenities</h2>
          </div>
          <div className="w-24 h-px bg-accent hidden md:block mb-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-200">
          {amenities.map((item, i) => (
            <div
              key={i}
              className="group border-b border-r border-gray-200 p-10 transition-colors duration-300 hover:bg-[#111111] flex flex-col gap-5"
            >
              <div className="group-hover:[&_svg]:text-accent transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-heading font-bold text-[#111111] group-hover:text-white tracking-wider transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-white/60 leading-relaxed transition-colors duration-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
