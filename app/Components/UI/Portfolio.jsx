'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const Portfolio = () => {
  const portfolioSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Web Development');

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
        title: 'Custom Web Applications',
        description: 'Build powerful, scalable web applications tailored to your business needs.',
        image: '🌐',
      },
      {
        title: 'E-Commerce Solutions',
        description: 'Complete online store solutions with payment integration and inventory management.',
        image: '🛒',
      },
      {
        title: 'Progressive Web Apps',
        description: 'Modern PWAs that work seamlessly across all devices and platforms.',
        image: '📱',
      },
      {
        title: 'Full-Stack Development',
        description: 'End-to-end web solutions from frontend to backend infrastructure.',
        image: '⚡',
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

          {/* Tab Navigation */}
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
        </div>

        {/* Content Grid - Horizontal Scrollable Carousel */}
        <div
          className={`overflow-x-auto overflow-y-visible pb-4 transition-all duration-500 ease-out -mx-6 lg:-mx-8 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[50px] opacity-0'
          }`}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(6, 182, 212, 0.3) transparent',
          }}
        >
          <div className="flex gap-6 lg:gap-8 pl-6 lg:pl-12 pr-6 lg:pr-8">
          {currentContent.map((item, index) => (
            <div
              key={index}
              className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out cursor-pointer group flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[calc(33.333vw-1.5rem)] xl:w-[calc(30vw-1.5rem)]"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Image Placeholder */}
              <div className="w-full h-72 lg:h-80 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-cyan-400/20 flex items-center justify-center relative overflow-hidden">
                <div className="text-7xl lg:text-8xl group-hover:scale-110 transition-transform duration-300">
                  {item.image}
                </div>
                {/* Placeholder pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)
                      `,
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 lg:p-5">
                <h3 className="text-white font-bold text-lg lg:text-xl mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/70 text-xs lg:text-sm leading-relaxed">
                  {item.description}
                </p>
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
