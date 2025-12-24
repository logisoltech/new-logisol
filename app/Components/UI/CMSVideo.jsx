'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const CMSVideo = () => {
  const videoSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
        threshold: 0.3,
        rootMargin: '-100px 0px',
      }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => {
      if (videoSectionRef.current) {
        observer.unobserve(videoSectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={videoSectionRef}
      className="relative flex items-center justify-center overflow-hidden py-8"
    >
      {/* Animated Container - Whole section pops up */}
      <div className={`relative w-[80%] transition-all duration-700 ease-out ${
        isVisible
          ? 'scale-100 opacity-100'
          : 'scale-75 opacity-0'
      }`}>
      {/* Beautiful Dark Themed Background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Glowing Lines Effect */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent" />
        
        {/* Radial Gradient Overlays */}
        <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 via-transparent to-transparent" style={{ backgroundPosition: '100% 100%' }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Text Content - Left Side - 30% width */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 w-full lg:w-[35%]">
            <h2
              className={`${headingFont.className} font-extrabold text-4xl md:text-2xl lg:text-2xl xl:text-5xl leading-tight text-white tracking-tight`}
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
              }}
            >
              CMS <span className="text-cyan-400">VIDEO</span>
            </h2>

            <div className="space-y-6 text-white/90 text-lg md:text-md leading-relaxed max-w-2xl">
              <p>
                Experience our powerful content management system in action. Watch how we transform
                your ideas into stunning digital experiences with cutting-edge technology and
                innovative solutions.
              </p>
              
            </div>
          </div>

          {/* Video Container - Right Side - Larger */}
          <div className="relative w-full lg:w-[70%] mx-auto">
            <div className="relative w-full rounded-2xl overflow-hidden bg-black/20">
              {/* Video Element */}
              <video
                className="w-full h-auto object-contain"
                muted
                loop
                playsInline
                autoPlay
              >
                <source src="/cms-vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CMSVideo;
