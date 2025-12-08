'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const About = () => {
  const aboutSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else if (entry.boundingClientRect.top > 0) {
            // Only reset if scrolling back up past the section
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '-100px 0px', // Start animation slightly before section enters viewport
      }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={aboutSectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* 3D Model Container - Left Side - Placeholder for positioning */}
          <div 
            id="about-model-container"
            className="relative w-full lg:w-1/2 aspect-square max-w-md mx-auto flex items-center justify-center overflow-visible pointer-events-none"
          >
            {/* Model will be positioned here by ScrollableRobot */}
          </div>

          {/* Text Content - Right Side */}
          <div
            className={`flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 flex-1 lg:w-1/2 transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-[-50px] opacity-0'
            }`}
          >
            <h2
              className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white tracking-tight`}
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
              }}
            >
              ABOUT <span className="text-cyan-400">US</span>
            </h2>

            <div className="space-y-6 text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
              <p>
                At <span className="text-cyan-400 font-semibold">Logisol Technologies</span>, we are
                passionate about transforming innovative ideas into powerful digital solutions. With a
                team of expert developers, designers, and strategists, we deliver cutting-edge
                technology that drives business growth.
              </p>
              <p>
                Our mission is to bridge the gap between complex logic and user-friendly innovation,
                creating solutions that not only meet but exceed expectations. We combine technical
                excellence with creative vision to build products that make a difference.
              </p>
              <p>
                From web and mobile development to digital marketing and design, we offer
                comprehensive services tailored to your unique needs. Partner with us to turn your
                vision into reality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
