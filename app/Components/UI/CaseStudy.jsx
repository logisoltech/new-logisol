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
      id: 'habibi-fitness',
      title: 'Habibi Fitness',
      heading: 'Complete Diet & Health Management Platform',
      description: 'Client required a comprehensive health and diet management website with personalized meal plans, calorie tracking, and progress monitoring. The challenge was integrating real-time nutritional data APIs while maintaining fast load times. We built a custom CMS allowing easy content updates, implemented lazy loading for media-heavy pages, and created an intuitive dashboard that reduced user drop-off by 60%.',
      requirements: 'Personalized diet plans, calorie tracker, progress charts, trainer dashboard, CMS for content management',
      challenge: 'Complex nutritional calculations with real-time API integration causing slow performance',
      solution: 'Implemented server-side caching, optimized database queries, and built a custom lightweight calculation engine',
      color: 'from-green-800 to-emerald-950',
      icon: '🥗',
    },
    {
      id: 'hi-tek',
      title: 'Hi-Tek',
      heading: 'Full-Stack E-Commerce for Tech Hardware',
      description: 'Hi-Tek needed a robust e-commerce platform for computers, parts, and laptops with advanced filtering, inventory management, and secure checkout. The main challenge was handling 10,000+ SKUs with real-time stock updates across multiple warehouses. We developed a custom inventory sync system, implemented Elasticsearch for lightning-fast product search, and built an admin CMS that reduced order processing time by 45%.',
      requirements: 'Multi-warehouse inventory, advanced product filtering, secure payments, order tracking, admin CMS',
      challenge: 'Managing 10,000+ products with real-time stock sync across multiple warehouse locations',
      solution: 'Built custom inventory microservice with webhook-based sync and Redis caching for instant stock updates',
      color: 'from-blue-800 to-blue-950',
      icon: '💻',
    },
    {
      id: 'habibi-fitness-app',
      title: 'Habibi Fitness App',
      heading: 'Mobile-First Health & Fitness Experience',
      description: 'Following the success of the web platform, the client requested a native mobile app with offline workout tracking, push notifications for meal reminders, and seamless sync with the web dashboard. The challenge was ensuring smooth offline functionality while maintaining data consistency. We implemented a robust offline-first architecture with background sync, reducing data conflicts by 95% and achieving 4.8★ app store rating.',
      requirements: 'Offline workout tracking, push notifications, web sync, in-app purchases, workout video streaming',
      challenge: 'Offline data storage with conflict-free synchronization when back online',
      solution: 'Designed offline-first architecture with conflict resolution algorithms and incremental sync protocol',
      color: 'from-teal-800 to-cyan-950',
      icon: '📱',
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
      icon: '♻️',
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
                /* Expanded State - Full case study content */
                <div 
                  className="h-full flex"
                  style={{
                    animation: 'slideIn 0.4s ease-out',
                  }}
                >
                  {/* Left Side - Content */}
                  <div className="flex-[3] flex flex-col min-w-0 overflow-hidden">
                    <div className={`bg-gradient-to-br ${study.color} p-4 lg:p-6 flex-1 flex flex-col justify-start overflow-y-auto`}>
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{study.icon}</span>
                        <h3 className="font-bold text-lg lg:text-xl text-white">
                          {study.title}
                        </h3>
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
                  {/* Right Side - Icon Display */}
                  <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 max-w-[180px] flex items-center justify-center">
                    <div className="text-6xl lg:text-7xl opacity-80">{study.icon}</div>
                  </div>
                </div>
              ) : (
                /* Compact State - Vertical text on left, icon on right */
                <div 
                  className="h-full flex"
                  style={{
                    animation: 'slideOut 0.3s ease-out',
                  }}
                >
                  {/* Vertical Title Sidebar */}
                  <div className={`bg-gradient-to-b ${study.color} w-14 lg:w-16 flex items-center justify-center flex-shrink-0`}>
                    <h3 
                      className="font-bold text-xs lg:text-sm text-white"
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
                  {/* Icon Display - Right beside the content */}
                  <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-4xl lg:text-5xl opacity-60">{study.icon}</div>
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
