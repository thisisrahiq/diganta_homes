import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">

      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 bg-[#111111] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-12 w-full">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-3">Since 2000+</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white">About Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        {/* Chairman Speech Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="relative">
            <img
              src="/Members/Chairman & Founder.jpg"
              alt="Mohammed Shafique – Chairman & Founder"
              className="w-full h-[560px] object-cover object-top shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[#111111] p-6">
              <p className="text-white font-heading font-bold text-xl">Mohammed Shafique</p>
              <p className="text-accent text-xs tracking-[0.25em] uppercase mt-1">Chairman &amp; Founder</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-2">
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold">Message from the Chairman</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#111111] leading-snug">
              "Building with Integrity,<br />Delivering with Pride."
            </h2>
            <div className="w-12 h-px bg-accent"></div>

            <div className="space-y-5 text-gray-500 leading-relaxed">
              <p>
                Welcome to Diganta Homes Limited. For over twenty years, we have been building not just structures, but vibrant communities and luxurious spaces that reflect the dreams of our valued clients here in Chattogram.
              </p>
              <p>
                We firmly believe that a home is more than an address — it is a legacy passed down through generations. Our commercial towers are designed to empower businesses, while our residential spaces provide a sanctuary of peace in this beautiful, growing city.
              </p>
              <p>
                Our success lies in the unconditional trust of our landowners, buyers, and community partners. I promise to continue setting new benchmarks in the industry, pushing the boundaries of innovation and sustainability while maintaining our core values of transparency, quality, and on-time delivery.
              </p>
            </div>

            {/* Contact info panel */}
            <div className="mt-4 border border-gray-200 p-6 bg-[#f8f7f4]">
              <p className="text-[11px] tracking-[0.25em] uppercase text-gray-400 mb-4 font-semibold">Direct Contact</p>
              <div className="flex flex-col gap-3">
                <a href="tel:+8801820183749" className="flex items-center gap-3 text-sm text-[#111111] hover:text-accent transition-colors">
                  <Phone size={15} className="text-accent" />
                  +880 1820-183749
                </a>
                <a href="mailto:info@digantahomes.com" className="flex items-center gap-3 text-sm text-[#111111] hover:text-accent transition-colors">
                  <Mail size={15} className="text-accent" />
                  info@digantahomes.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-200 mb-24">
          {[
            { title: 'Mission', text: 'To develop premium real estate in Chattogram that elevates the standard of living and brings prosperity to landowners and residents alike.' },
            { title: 'Vision', text: "To be recognized as Chattogram's most trusted and innovative real estate developer by 2030." },
            { title: 'Values', text: 'Integrity, quality, transparency, and community — the four pillars guiding every decision we make.' },
          ].map((item, i) => (
            <div key={i} className="border-b border-r border-gray-200 p-10">
              <div className="w-8 h-px bg-accent mb-6"></div>
              <h3 className="text-xl font-heading font-bold text-[#111111] mb-4">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#111111]">
            What Sets Us Apart
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: '20+', label: 'Years Experience' },
            { stat: '8', label: 'Projects Delivered' },
            { stat: '500+', label: 'Happy Families' },
            { stat: '100%', label: 'On-Time Delivery' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-5xl font-heading font-bold text-[#111111] mb-2">{item.stat}</span>
              <div className="w-6 h-px bg-accent my-3"></div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
