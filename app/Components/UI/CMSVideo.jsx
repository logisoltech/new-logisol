'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const CMSVideo = () => {
  const videoSectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

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

          {/* Video Container - Right Side - 70% width */}
          <div className="relative w-full lg:w-[65%] aspect-video mx-auto">
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-2xl bg-black/40 border"
              style={{
                borderImage: 'linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(168, 85, 247, 0.5)) 1',
                borderWidth: '2px',
                boxShadow: `
                  0 0 20px rgba(6, 182, 212, 0.3),
                  0 0 40px rgba(168, 85, 247, 0.2),
                  inset 0 0 20px rgba(6, 182, 212, 0.1)
                `,
              }}
            >
              {/* Video Placeholder */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Placeholder Video Background - Dark Theme */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto border-4 border-cyan-400/50 rounded-full flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-white/70 text-sm">Video Placeholder</p>
                    </div>
                  </div>
                </div>

                {/* Video Element (Placeholder) */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted={isMuted}
                  loop
                  playsInline
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%231a1a2e' width='1920' height='1080'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='%2360a5fa'%3EVideo Placeholder%3C/text%3E%3C/svg%3E"
                >
                  {/* Placeholder video source - add actual video URL when available */}
                  {/* <source src="your-video-url.mp4" type="video/mp4" /> */}
                  Your browser does not support the video tag.
                </video>

                {/* Unmute Button Overlay */}
                {isMuted && (
                  <button
                    onClick={handleUnmute}
                    className="absolute top-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl z-10"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                    Unmute
                  </button>
                )}

                {/* Play/Pause Button (when unmuted) */}
                {!isMuted && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300 z-10 group"
                  >
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      {isPlaying ? (
                        <svg
                          className="w-10 h-10 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-10 h-10 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                  </button>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CMSVideo;
