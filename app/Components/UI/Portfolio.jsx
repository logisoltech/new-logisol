'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { headingFont } from '../Font/headingFont';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = ({ defaultTab = 'Web Development' }) => {
  const portfolioSectionRef = useRef(null);
  const scrollContainerRef = useRef(null); // viewport
  const trackRef = useRef(null); // the flex row that moves
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

    if (portfolioSectionRef.current) {
      observer.observe(portfolioSectionRef.current);
    }

    return () => {
      if (portfolioSectionRef.current) {
        observer.unobserve(portfolioSectionRef.current);
      }
    };
  }, []);

  // Check scroll position to enable/disable buttons (for ScrollTrigger)
  const checkScrollPosition = () => {
    const trigger = ScrollTrigger.getById('portfolioHorizontal');
    if (trigger && trackRef.current && scrollContainerRef.current) {
      const track = trackRef.current;
      const viewport = scrollContainerRef.current;
      const scrollDistance = track.scrollWidth - viewport.clientWidth;
      const progress = trigger.progress;
      
      setCanScrollLeft(progress > 0.01);
      setCanScrollRight(progress < 0.99);
    } else if (trackRef.current && scrollContainerRef.current) {
      // Fallback when ScrollTrigger not active
      const track = trackRef.current;
      const viewport = scrollContainerRef.current;
      const currentX = gsap.getProperty(track, 'x') || 0;
      const scrollDistance = track.scrollWidth - viewport.clientWidth;
      
      setCanScrollLeft(currentX < 0);
      setCanScrollRight(Math.abs(currentX) < scrollDistance - 10);
    }
  };

  // Scroll handlers - scroll page to move track with ScrollTrigger
  const handleScrollLeft = () => {
    const trigger = ScrollTrigger.getById('portfolioHorizontal');
    if (trigger) {
      const currentProgress = trigger.progress;
      const cards = trackRef.current?.querySelectorAll('.portfolio-card');
      const cardWidth = cards?.[0]?.offsetWidth || 400;
      const gap = 32;
      const scrollAmount = cardWidth + gap;
      const viewport = scrollContainerRef.current;
      const scrollDistance = trackRef.current ? trackRef.current.scrollWidth - viewport.clientWidth : 0;
      
      if (scrollDistance > 0) {
        const progressChange = scrollAmount / scrollDistance;
        const newProgress = Math.max(0, currentProgress - progressChange);
        const start = trigger.start;
        const end = trigger.end;
        const targetScroll = start + (end - start) * newProgress;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const handleScrollRight = () => {
    const trigger = ScrollTrigger.getById('portfolioHorizontal');
    if (trigger) {
      const currentProgress = trigger.progress;
      const cards = trackRef.current?.querySelectorAll('.portfolio-card');
      const cardWidth = cards?.[0]?.offsetWidth || 400;
      const gap = 32;
      const scrollAmount = cardWidth + gap;
      const viewport = scrollContainerRef.current;
      const scrollDistance = trackRef.current ? trackRef.current.scrollWidth - viewport.clientWidth : 0;
      
      if (scrollDistance > 0) {
        const progressChange = scrollAmount / scrollDistance;
        const newProgress = Math.min(1, currentProgress + progressChange);
        const start = trigger.start;
        const end = trigger.end;
        const targetScroll = start + (end - start) * newProgress;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // Reset scroll position when tab changes
  useEffect(() => {
    if (trackRef.current && portfolioSectionRef.current) {
      // Store exact scroll position and section's current position
      const scrollY = window.scrollY || window.pageYOffset;
      const sectionRect = portfolioSectionRef.current.getBoundingClientRect();
      const sectionTopRelative = sectionRect.top; // Position relative to viewport
      
      // Kill existing trigger
      const existingTrigger = ScrollTrigger.getById('portfolioHorizontal');
      if (existingTrigger) {
        existingTrigger.kill(true);
      }
      
      // Reset horizontal position
      gsap.set(trackRef.current, { x: 0 });
      
      // After DOM updates, check if section moved and compensate
      requestAnimationFrame(() => {
        const newSectionRect = portfolioSectionRef.current.getBoundingClientRect();
        const sectionMovement = newSectionRect.top - sectionTopRelative;
        
        // Adjust scroll to keep section in same visual position
        const adjustedScroll = scrollY - sectionMovement;
        window.scrollTo({ top: adjustedScroll, behavior: 'auto' });
        
        // Refresh ScrollTrigger after position is adjusted
        setTimeout(() => {
          ScrollTrigger.refresh();
          // Final position check after refresh
          requestAnimationFrame(() => {
            const finalScroll = scrollY - sectionMovement;
            window.scrollTo({ top: finalScroll, behavior: 'auto' });
            checkScrollPosition();
          });
        }, 50);
      });
    }
  }, [activeTab]);

  // GSAP ScrollTrigger pin + scrub for horizontal scroll
  useEffect(() => {
    const section = portfolioSectionRef.current;
    const viewport = scrollContainerRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    const create = () => {
      // distance we need to move horizontally
      const scrollDistance = track.scrollWidth - viewport.clientWidth;

      // nothing to animate if it fits
      if (scrollDistance <= 0) return;

      // kill previous triggers on refresh/tab change
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars?.id === 'portfolioHorizontal') t.kill();
      });

      gsap.set(track, { x: 0, willChange: 'transform' });

      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          id: 'portfolioHorizontal',
          trigger: track,  // Trigger on the track (cards row) itself
          start: 'top 40%',  // Start when track top reaches 40% down viewport
          end: `+=${scrollDistance}`,   // scroll length matches horizontal distance
          pin: section,  // Pin the entire section
          scrub: 1,                    // "glide" but tied to scroll, no runaway inertia
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            checkScrollPosition();
          },
        },
      });
    };

    create();
    ScrollTrigger.addEventListener('refreshInit', create);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', create);
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars?.id === 'portfolioHorizontal') t.kill();
      });
    };
  }, [activeTab]);

  const tabs = [
    'Web Development',
    'Mobile Development',
    'Digital Marketing',
    'Graphic Design',
    'Video Editing',
  ];

  const portfolioContent = {
    'Web Development': [
      {
        title: 'Fashion Hub',
        image: '/fashion-hub.png',
        isImage: true,
      },
      {
        title: 'Medicare Plus',
        image: '/medicare-plus.png',
        isImage: true,
      },
      {
        title: 'Home Hero',
        image: '/home-hero.png',
        isImage: true,
      },
      {
        title: 'Spa Care',
        image: '/spa-care.jpg',
        isImage: true,
      },
      {
        title: 'DriveEasy Rentals',
        image: '/driveeasy-rentals.jpg',
        isImage: true,
      },
      {
        title: 'Car Detailing Website',
        image: '/cardetailing-website.jpg',
        isImage: true,
      },
      {
        title: 'BeautyGlow Cosmetics',
        image: '/beautyglow-cosmetics.png',
        isImage: true,
      },
      {
        title: 'SPYRO Gym',
        image: '/SPYRO-gym.png',
        isImage: true,
      },
      {
        title: 'SmileCare Dental',
        image: '/smilecare-dental.png',
        isImage: true,
      },
      {
        title: 'Habibi Fitness',
        image: '/habibi-project.png',
        isImage: true,
      },
    ],
    'Mobile Development': [
      {
        title: 'Certifurb Mobile App',
        image: '/certifurb-mobile-app.png',
        isImage: true,
      },
      {
        title: 'Habibi Fitness App',
        image: '/habibi-fitness-app.png',
        isImage: true,
      },
      {
        title: 'The Market App',
        image: '/themarket-app.png',
        isImage: true,
      },
      {
        title: 'SaferKid App',
        image: '/saferkid-app.png',
        isImage: true,
      },
      {
        title: 'CrossFit Mobile App',
        image: '/crossfit-mobile-app.png',
        isImage: true,
      },
    ],
    'Digital Marketing': [
      {
        title: 'Certifurb SMM',
        image: '/certifurb-smm.png',
        isImage: true,
      },
      {
        title: 'Axcel Dental SMM',
        image: '/axcel-dental-smm.png',
        isImage: true,
      },
      {
        title: 'Airport Shuttle SMM',
        image: '/airport-shuttle-smm.png',
        isImage: true,
      },
      {
        title: 'Meta DM',
        image: '/meta-dm.png',
        isImage: true,
      },
      {
        title: 'Google Ads DM',
        image: '/google-ads-dm.png',
        isImage: true,
      },
    ],
    'Graphic Design': [
      {
        title: 'Habibi Merch',
        image: '/habibi-merch.png',
        isImage: true,
      },
      {
        title: 'Certifurb Merch',
        image: '/certifurb-merch.png',
        isImage: true,
      },
      {
        title: 'Eight Sol',
        image: '/eight-sol.png',
        isImage: true,
      },
      {
        title: 'Smile Design',
        image: '/smile.png',
        isImage: true,
      },
      {
        title: 'Garde',
        image: '/garde.png',
        isImage: true,
      },
      {
        title: 'Antares',
        image: '/antares.png',
        isImage: true,
      },
      {
        title: 'Alpine',
        image: '/alpine.png',
        isImage: true,
      },
    ],
    'Video Editing': [
      {
        title: 'Video Reel 1',
        videoId: 'MNVqDmYdAWs',
        isVideo: true,
      },
      {
        title: 'Video Reel 2',
        videoId: 'FqvEyWxB9YQ',
        isVideo: true,
      },
      {
        title: 'Video Reel 3',
        videoId: 'AAioyIZc2nM',
        isVideo: true,
      },
      {
        title: 'Video Reel 4',
        videoId: 't6tNT0n_mn8',
        isVideo: true,
      },
      {
        title: 'Video Reel 5',
        videoId: 'qrh_1rF1YZs',
        isVideo: true,
      },
    ],
  };

  const currentContent = portfolioContent[activeTab] || [];

  return (
    <div
      ref={portfolioSectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32"
    >
      {/* CSS for ScrollTrigger */}
      <style jsx>{`
        .portfolio-scroll-container {
          overscroll-behavior: contain;
        }
      `}</style>

      {/* Content Container */}
      <div className="relative z-10 w-full mx-auto pl-12 lg:pl-16 pr-6 lg:pr-8">
        {/* Section Title */}
        <div
          className={`text-left mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[-50px] opacity-0'
          }`}
        >
          <h2
            className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white tracking-tight mb-8`}
            style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
            }}
          >
            All in a single <span className="text-cyan-400">creative suite</span>
          </h2>

          {/* Tab Navigation with Nav Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3 lg:gap-4 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 lg:px-6 lg:py-3 rounded-full text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-white/10 text-white backdrop-blur-sm border border-white/20 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleScrollLeft}
                disabled={!canScrollLeft}
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-cyan-400/50'
                    : 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleScrollRight}
                disabled={!canScrollRight}
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-cyan-400/50'
                    : 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid - Horizontal Scrollable Carousel */}
        <div
          ref={scrollContainerRef}
          className={`portfolio-scroll-container overflow-hidden pb-4 transition-all duration-500 ease-out -mx-6 lg:-mx-8 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[50px] opacity-0'
          }`}
        >
          <div ref={trackRef} className="flex gap-6 lg:gap-8 pl-6 lg:pl-12 pr-6 lg:pr-8">
          {currentContent.map((item, index) => (
            <div
              key={index}
              className="portfolio-card relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 cursor-pointer group flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[calc(33.333vw-1.5rem)] xl:w-[calc(30vw-1.5rem)] h-72 lg:h-96 transition-colors duration-300"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Content - Image, Video, or Emoji */}
              <div className="absolute inset-0 overflow-hidden">
                {item.isImage ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : item.isVideo ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.videoId}?loop=1&playlist=${item.videoId}`}
                    title={item.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-cyan-400/20 flex items-center justify-center">
                    <div className="text-7xl lg:text-8xl group-hover:scale-110 transition-transform duration-300">
                      {item.image}
                    </div>
                  </div>
                )}
              </div>

              {/* Hover Effect Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/10 group-hover:to-cyan-400/5 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
