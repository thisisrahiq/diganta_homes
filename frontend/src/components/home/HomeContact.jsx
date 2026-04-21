import React, { useState } from 'react';

const InputField = ({ label, type = 'text', placeholder, required = true }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] tracking-[0.2em] uppercase text-white/50 font-semibold">{label}</label>
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      className="bg-transparent border-b border-white/20 focus:border-accent py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-300"
    />
  </div>
);

const HomeContact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-[#111111] py-28 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Side */}
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-[1.1] mb-6">
            Let's Build Your Dream Together
          </h2>
          <div className="w-12 h-px bg-accent mb-8"></div>
          <p className="text-white/50 leading-relaxed mb-10 max-w-md">
            Whether you are looking for your perfect home or have a property to develop, our team of experts is ready to guide you.
          </p>
          
          <div className="flex items-center gap-8">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-2 font-semibold">Call Us</p>
              <a href="tel:+8801820183749" className="text-white hover:text-accent font-semibold transition-colors">+880 1820-183749</a>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-2 font-semibold">Email Us</p>
              <a href="mailto:info@digantahomes.com" className="text-white hover:text-accent font-semibold transition-colors">info@digantahomes.com</a>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-[#1a1a1a] p-10 lg:p-12 border border-white/5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 border-2 border-accent flex items-center justify-center mb-6">
                <span className="text-accent text-xl">✓</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">Message Sent</h3>
              <p className="text-sm text-white/40">Thank you. Our team will respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField label="Full Name" placeholder="John Doe" />
                <InputField label="Phone Number" type="tel" placeholder="+880 1..." />
              </div>
              <InputField label="Email Address" type="email" placeholder="you@example.com" />
              
              <div className="flex flex-col gap-2">
                <label className="text-[11px] tracking-[0.2em] uppercase text-white/50 font-semibold">Your Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How can we help you?"
                  className="bg-transparent border-b border-white/20 focus:border-accent py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="self-start flex items-center gap-4 bg-white text-[#111111] px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-bold hover:bg-accent hover:text-white transition-all duration-300 mt-4"
              >
                Send Inquiry
                <span className="text-lg leading-none">→</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default HomeContact;
