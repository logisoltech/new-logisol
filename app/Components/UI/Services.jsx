'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const Services = () => {
  const servicesSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Web Development');

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

    if (servicesSectionRef.current) {
      observer.observe(servicesSectionRef.current);
    }

    return () => {
      if (servicesSectionRef.current) {
        observer.unobserve(servicesSectionRef.current);
      }
    };
  }, []);

  const categories = [
    'Web Development',
    'Mobile Development',
    'Digital Marketing',
    'Graphic Design',
    'Video Editing',
    'All Services',
  ];

  const servicesByCategory = {
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
    ],
    'All Services': [
      {
        title: 'Web Development',
        description: 'Custom web applications built with modern technologies.',
        image: '🌐',
      },
      {
        title: 'Mobile Development',
        description: 'Native and cross-platform mobile applications.',
        image: '📱',
      },
      {
        title: 'Digital Marketing',
        description: 'Strategic marketing solutions to grow your online presence.',
        image: '📈',
      },
      {
        title: 'Graphic Design',
        description: 'Beautiful, intuitive designs that enhance user experience.',
        image: '🎨',
      },
      {
        title: 'Video Editing',
        description: 'Professional video editing and production services.',
        image: '🎬',
      },
      {
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and deployment solutions.',
        image: '☁️',
      },
    ],
  };

  const currentServices = servicesByCategory[activeCategory] || [];

  return (
    <div
      ref={servicesSectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div
          className={`text-left mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[-50px] opacity-0'
          }`}
        >
          <h2
            className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white tracking-tight mb-4`}
            style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
            }}
          >
            OUR <span className="text-cyan-400">SERVICES</span>
          </h2>
        </div>

        {/* Main Content: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Sidebar - Categories */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-3 rounded-full text-left whitespace-nowrap transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-white/10 text-white font-semibold backdrop-blur-sm border border-white/20'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Services Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {currentServices.map((service, index) => (
                <div
                  key={index}
                  className={`relative backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out cursor-pointer group h-72 lg:h-96 ${
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-[50px] opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Image/Icon - Full Cover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-7xl lg:text-8xl group-hover:scale-110 transition-transform duration-300">
                      {service.image}
                    </div>
                  </div>

                  {/* Label - Top Left */}
                  <div className="absolute top-4 left-4 z-10">
                    <h3 className="text-white font-bold text-base lg:text-lg group-hover:text-cyan-400 transition-all duration-300">
                      {service.title}
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
    </div>
  );
};

export default Services;
