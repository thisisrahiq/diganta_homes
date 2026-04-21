import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedHeading = ({ text, className, as: Component = 'h1', triggerOnce = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = containerRef.current.querySelectorAll('.char');
    
    const anim = gsap.fromTo(
      chars,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: triggerOnce ? 'play none none none' : 'play none none reverse',
        },
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [text, triggerOnce]);

  // Simple custom split text logic for React
  const renderChars = (word, wordIdx) => {
    return Array.from(word).map((char, charIdx) => (
      <span key={`${wordIdx}-${charIdx}`} className="char inline-block translate-y-full opacity-0">
        {char}
      </span>
    ));
  };

  const words = text.split(' ');

  return (
    <Component ref={containerRef} className={`${className} overflow-hidden flex flex-wrap`}>
      {words.map((word, idx) => (
        <span key={idx} className="mr-2 md:mr-3 lg:mr-4 flex overflow-hidden pb-2" style={{ lineHeight: '1.2' }}>
          {renderChars(word, idx)}
        </span>
      ))}
    </Component>
  );
};

export default AnimatedHeading;
