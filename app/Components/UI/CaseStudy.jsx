'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const CaseStudy = () => {
  const caseStudySectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null); // For mobile tap-to-expand
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      id: 'glonect-solutions',
      title: 'Glonect Solutions',
      heading: 'Modern Tech Solutions Company Website',
      description: 'Glonect Solutions needed a sleek, professional website to showcase their vast range of modern tech solutions. The client wanted a dynamic platform with smooth animations, service showcases, and lead generation forms. We delivered a fully responsive website with CMS integration, optimized for conversions and SEO performance.',
      requirements: 'Service showcase, lead generation forms, blog section, team profiles, CMS for easy updates',
      challenge: 'Creating a visually striking design while maintaining fast load times and SEO optimization',
      solution: 'Built with Next.js for optimal performance, implemented lazy loading and image optimization',
      color: 'from-blue-800 to-blue-950',
      image: '/glonect-3.png',
      hoverImage: '/glonect-2.png',
    },
    {
      id: 'hi-tek',
      title: 'Hi-Tek',
      heading: 'Full-Stack E-Commerce for Tech Hardware',
      description: 'Hi-Tek needed a robust e-commerce platform for computers, parts, and laptops with advanced filtering, inventory management, and secure checkout. The main challenge was handling 10,000+ SKUs with real-time stock updates across multiple warehouses. We developed a custom inventory sync system, implemented Elasticsearch for lightning-fast product search, and built an admin CMS that reduced order processing time by 45%.',
      requirements: 'Multi-warehouse inventory, advanced product filtering, secure payments, order tracking, admin CMS',
      challenge: 'Managing 10,000+ products with real-time stock sync across multiple warehouse locations',
      solution: 'Built custom inventory microservice with webhook-based sync and Redis caching for instant stock updates',
      color: 'from-gray-900 to-blue-950',
      image: '/hitek-3.png',
      hoverImage: '/hitek-2.png',
    },
    {
      id: 'habibi-fitness-app',
      title: 'Habibi Fitness App',
      heading: 'Mobile-First Health & Fitness Experience',
      description: 'Following the success of the web platform, the client requested a native mobile app with offline workout tracking, push notifications for meal reminders, and seamless sync with the web dashboard. The challenge was ensuring smooth offline functionality while maintaining data consistency. We implemented a robust offline-first architecture with background sync, reducing data conflicts by 95% and achieving 4.8★ app store rating.',
      requirements: 'Offline workout tracking, push notifications, web sync, in-app purchases, workout video streaming',
      challenge: 'Offline data storage with conflict-free synchronization when back online',
      solution: 'Designed offline-first architecture with conflict resolution algorithms and incremental sync protocol',
      color: 'from-green-800 to-green-400',
      image: '/habibi-1.png',
      hoverImage: '/habibi-2.png',
    },
    {
      id: 'certifurb',
      title: 'Certifurb',
      heading: 'Refurbished Tech E-Commerce',
      description: 'A trusted platform for certified refurbished laptops with quality grading, warranty management, and detailed condition reports. Built a CMS for easy product documentation, increasing conversions by 35%.',
      requirements: 'Quality grading, warranty tracking, product CMS',
      challenge: 'Building customer trust for refurbished products',
      solution: 'Multi-tier grading system with verified photo reports and warranty tracking',
      color: 'from-slate-800 to-green-950',
      image: '/certifurb-1.png',
      hoverImage: '/certifurb-2.png',
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

        {/* Cards Grid - Responsive layout */}
        <div 
          className={`flex flex-col md:flex-row gap-4 lg:gap-6 w-full transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[50px] opacity-0'
          }`}
          style={{
            transitionDelay: '200ms',
          }}
        >
          {caseStudies.map((study) => {
            const isExpanded = isMobile ? expandedCard === study.id : hoveredCard === study.id;
            const hasOtherExpanded = isMobile ? expandedCard && expandedCard !== study.id : hoveredCard && hoveredCard !== study.id;
            
            return (
              <div
                key={study.id}
                onMouseEnter={() => !isMobile && setHoveredCard(study.id)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
                onClick={() => isMobile && setExpandedCard(expandedCard === study.id ? null : study.id)}
                className={`backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden cursor-pointer relative ${
                  isExpanded
                    ? 'md:flex-[2] shadow-2xl border-cyan-400/30'
                    : hasOtherExpanded
                      ? 'md:flex-[0.5]'
                      : 'md:flex-1'
                }`}
                style={{
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformOrigin: 'center',
                  minWidth: isMobile ? 'auto' : isExpanded ? '50%' : hasOtherExpanded ? '10%' : '20%',
                  height: isMobile ? (isExpanded ? 'auto' : '200px') : '400px',
                  minHeight: isMobile && isExpanded ? '450px' : undefined,
                }}
              >
                {isExpanded ? (
                  /* Expanded State - Full case study content */
                  <div 
                    className="h-full flex flex-col md:flex-row"
                    style={{
                      animation: 'slideIn 0.4s ease-out',
                    }}
                  >
                    {/* Left Side - Content */}
                    <div className="flex-[3] flex flex-col min-w-0 overflow-hidden">
                      <div className={`bg-gradient-to-br ${study.color} p-4 lg:p-6 flex-1 flex flex-col justify-start overflow-y-auto`}>
                        {/* Header */}
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="font-bold text-lg lg:text-xl text-white">
                            {study.title}
                          </h3>
                          {isMobile && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); setExpandedCard(null); }}
                              className="text-white/70 hover:text-white p-1"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm lg:text-base mb-3 text-white/90">
                          {study.heading}
                        </h4>
                        
                        {/* Description */}
                        <p className="text-xs leading-relaxed mb-4 text-white/80">
                          {study.description}
                        </p>
                        
                        {/* Requirements, Challenge, Solution */}
                        <div className="space-y-2 mt-auto">
                          <div className="rounded-lg p-2 bg-white/10">
                            <span className="text-xs font-semibold text-white">⚡ Challenge: </span>
                            <span className="text-xs text-white/80">{study.challenge}</span>
                          </div>
                          <div className="rounded-lg p-2 bg-white/10">
                            <span className="text-xs font-semibold text-white">✅ Solution: </span>
                            <span className="text-xs text-white/80">{study.solution}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Right Side - Image Display (Hover Image) */}
                    <div className="hidden md:block flex-1 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 max-w-[180px]">
                      <img 
                        src={study.hoverImage} 
                        alt={`${study.title} hover`}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
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
                    {/* Vertical Title Sidebar - Horizontal on mobile compact */}
                    <div className={`bg-gradient-to-b ${study.color} w-16 md:w-16 lg:w-20 flex items-center justify-center flex-shrink-0`}>
                      <h3 
                        className="font-extrabold text-sm md:text-base lg:text-lg text-white tracking-wide"
                        style={{
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {study.title}
                      </h3>
                    </div>
                    {/* Image Display - Default Image */}
                    <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                      <img 
                        src={study.image} 
                        alt={study.title}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                      {/* Mobile tap hint */}
                      {isMobile && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <span className="text-white/80 text-xs font-medium">Tap to expand</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
