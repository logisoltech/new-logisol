'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const Portfolio = ({ defaultTab = 'Web Development' }) => {
  const portfolioSectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
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

  // Check scroll position to enable/disable buttons
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll handlers
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      // Get the first card element and its width
      const cards = scrollContainerRef.current.querySelectorAll('.portfolio-card');
      const cardWidth = cards[0]?.offsetWidth || 400;
      const gap = 32; // gap-8 = 32px
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      // Get the first card element and its width
      const cards = scrollContainerRef.current.querySelectorAll('.portfolio-card');
      const cardWidth = cards[0]?.offsetWidth || 400;
      const gap = 32; // gap-8 = 32px
      scrollContainerRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  };

  // Reset scroll position when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      setTimeout(checkScrollPosition, 100);
    }
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
        title: 'iOS App Development',
        description: 'Native iOS applications built with Swift and modern iOS frameworks.',
        image: '📱',
      },
      {
        title: 'Android App Development',
        description: 'Robust Android applications using Kotlin and Jetpack Compose.',
        image: '🤖',
      },
      {
        title: 'Cross-Platform Apps',
        description: 'React Native and Flutter apps for maximum reach and efficiency.',
        image: '⚛️',
      },
      {
        title: 'App Maintenance',
        description: 'Ongoing support and updates to keep your apps running smoothly.',
        image: '🔧',
      },
    ],
    'Digital Marketing': [
      {
        title: 'SEO Services',
        description: 'Improve your search engine rankings and drive organic traffic.',
        image: '🔍',
      },
      {
        title: 'Social Media Marketing',
        description: 'Engage your audience and grow your brand presence on social platforms.',
        image: '📱',
      },
      {
        title: 'Content Marketing',
        description: 'Strategic content creation to attract and convert your target audience.',
        image: '✍️',
      },
      {
        title: 'PPC Advertising',
        description: 'Maximize ROI with targeted pay-per-click advertising campaigns.',
        image: '📈',
      },
    ],
    'Graphic Design': [
      {
        title: 'Brand Identity Design',
        description: 'Create a memorable brand identity that resonates with your audience.',
        image: '🎨',
      },
      {
        title: 'UI/UX Design',
        description: 'User-centered designs that enhance user experience and engagement.',
        image: '💻',
      },
      {
        title: 'Print Design',
        description: 'Professional print materials including brochures, flyers, and business cards.',
        image: '📄',
      },
      {
        title: 'Logo Design',
        description: 'Unique and impactful logos that represent your brand perfectly.',
        image: '🖋️',
      },
    ],
    'Video Editing': [
      {
        title: 'Video Production',
        description: 'Professional video production for marketing, training, and entertainment.',
        image: '🎬',
      },
      {
        title: 'Video Editing',
        description: 'Expert video editing services to bring your vision to life.',
        image: '✂️',
      },
      {
        title: 'Motion Graphics',
        description: 'Dynamic motion graphics and animations for engaging visual content.',
        image: '🎞️',
      },
      {
        title: 'Video Optimization',
        description: 'Optimize videos for web, social media, and various platforms.',
        image: '📹',
      },
    ],
  };

  const currentContent = portfolioContent[activeTab] || [];

  return (
    <div
      ref={portfolioSectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32"
    >
      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
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
          onScroll={checkScrollPosition}
          className={`overflow-x-auto overflow-y-visible pb-4 transition-all duration-500 ease-out -mx-6 lg:-mx-8 scrollbar-hide ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[50px] opacity-0'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-6 lg:gap-8 pl-6 lg:pl-12 pr-6 lg:pr-8">
          {currentContent.map((item, index) => (
            <div
              key={index}
              className="portfolio-card relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 cursor-pointer group flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[calc(33.333vw-1.5rem)] xl:w-[calc(30vw-1.5rem)] h-72 lg:h-96 transition-colors duration-300"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Image - Full Cover with Slide Down Effect on Hover */}
              <div className="absolute inset-0 overflow-hidden">
                {item.isImage ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-[200%] object-cover object-top transition-transform duration-700 ease-out group-hover:translate-y-[-50%]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-cyan-400/20 flex items-center justify-center">
                    <div className="text-7xl lg:text-8xl group-hover:scale-110 transition-transform duration-300">
                      {item.image}
                    </div>
                  </div>
                )}
              </div>

              {/* Dark Overlay for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />

              {/* Label - Top Left */}
              <div className="absolute top-4 left-4 z-10">
                <h3 className="text-white font-bold text-base lg:text-lg group-hover:text-cyan-400 transition-all duration-300">
                  {item.title}
                </h3>
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
