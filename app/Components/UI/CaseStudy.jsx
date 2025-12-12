'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const CaseStudy = () => {
  const caseStudySectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else if (entry.boundingClientRect.top > 0) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-100px 0px',
      }
    );

    if (caseStudySectionRef.current) {
      observer.observe(caseStudySectionRef.current);
    }

    return () => {
      if (caseStudySectionRef.current) {
        observer.unobserve(caseStudySectionRef.current);
      }
    };
  }, []);

  const caseStudies = [
    {
      id: 'designers',
      title: 'Designers',
      heading: 'Create faster, explore new possibilities',
      description: 'Produce high-quality visuals in seconds with AI tools that open up new creative directions. Adapt assets for every channel, automate repetitive tasks, and scale campaigns—while keeping every piece consistent and on-brand.',
      color: 'from-blue-600 to-blue-800',
    },
    {
      id: 'marketers',
      title: 'Marketers',
      heading: 'Create faster, explore new possibilities',
      description: 'Produce high-quality visuals in seconds with AI tools that open up new creative directions. Adapt assets for every channel, automate repetitive tasks, and scale campaigns—while keeping every piece consistent and on-brand.',
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 'filmmakers',
      title: 'Filmmakers',
      heading: 'From concept to cut, faster.',
      description: 'Upscale footage in a click for streaming, presentations, or final delivery. Instantly generate voiceovers to test edits or polish trailers—no studio required. Create storyboards, shot ideas, or concept art to support your workflow and speed up planning.',
      color: 'from-cyan-500 to-teal-600',
    },
    {
      id: 'content-creators',
      title: 'Content creators',
      heading: 'Create faster, explore new possibilities',
      description: 'Produce high-quality visuals in seconds with AI tools that open up new creative directions. Adapt assets for every channel, automate repetitive tasks, and scale campaigns—while keeping every piece consistent and on-brand.',
      color: 'from-pink-600 to-cyan-500',
    },
  ];

  return (
    <div 
      ref={caseStudySectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32"
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div 
          className={`mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[-50px] opacity-0'
          }`}
        >
          <h2
            className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white tracking-tight`}
            style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
            }}
          >
            Project Case Studies
          </h2>
        </div>

        {/* Cards Grid - Flex layout so cards shrink instead of wrapping */}
        <div 
          className={`flex gap-4 lg:gap-6 w-full transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[50px] opacity-0'
          }`}
          style={{
            transitionDelay: '200ms',
          }}
        >
          {caseStudies.map((study) => (
            <div
              key={study.id}
              onMouseEnter={() => setHoveredCard(study.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden cursor-pointer relative h-[400px] ${
                hoveredCard === study.id
                  ? 'flex-[2] shadow-2xl border-cyan-400/30'
                  : hoveredCard
                    ? 'flex-[0.5]'
                    : 'flex-1'
              }`}
              style={{
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center',
                minWidth: hoveredCard === study.id ? '50%' : hoveredCard ? '10%' : '20%',
              }}
            >
              {hoveredCard === study.id ? (
                /* Expanded State - Image beside content */
                <div 
                  className="h-full flex"
                  style={{
                    animation: 'slideIn 0.4s ease-out',
                  }}
                >
                  {/* Left Side - Content */}
                  <div className="flex-[2] flex flex-col min-w-0">
                    <div className={`bg-gradient-to-r ${study.color} p-4 lg:p-5 flex-1 flex flex-col justify-center`}>
                      <h3 className="text-white font-bold text-base lg:text-lg mb-2">
                        {study.title}
                      </h3>
                      <p className="text-white/90 text-xs leading-relaxed">
                        {study.description}
                      </p>
                    </div>
                    
                  </div>
                  {/* Right Side - Image Placeholder (Smaller) */}
                  <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 max-w-[200px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl">🖼️</div>
                    </div>
                    {/* Image editing UI overlay */}
                    
                  </div>
                </div>
              ) : (
                /* Compact State - Vertical text on left, image on right */
                <div 
                  className="h-full flex"
                  style={{
                    animation: 'slideOut 0.3s ease-out',
                  }}
                >
                  {/* Vertical Title Sidebar */}
                  <div className={`bg-gradient-to-b ${study.color} w-14 lg:w-16 flex items-center justify-center flex-shrink-0`}>
                    <h3 
                      className="text-white font-bold text-sm lg:text-base"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'upright',
                      }}
                    >
                      {study.title}
                    </h3>
                  </div>
                  {/* Image Placeholder - Right beside the content */}
                  <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-3xl lg:text-4xl">🖼️</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideOut {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CaseStudy;
