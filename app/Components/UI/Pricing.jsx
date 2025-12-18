'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { headingFont } from '../Font/headingFont';

const Pricing = () => {
  const pricingSectionRef = useRef(null);
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

    if (pricingSectionRef.current) {
      observer.observe(pricingSectionRef.current);
    }

    return () => {
      if (pricingSectionRef.current) {
        observer.unobserve(pricingSectionRef.current);
      }
    };
  }, []);

  const tabs = [
    'Web Development',
    'App Development',
    'SEO',
    'Design & Video Editing',
  ];

  const pricingPlans = {
    'Web Development': [
      {
        id: 'starter-site',
        title: 'Starter Site',
        description: 'Perfect for small businesses looking to establish an online presence.',
        price: '$499',
        isPopular: false,
        features: [
          'Up to 5 Informational Pages',
          'Mobile Responsive Design',
          'Contact Form & Google Map',
          'Basic SEO Optimization',
          '1 Revision Round',
          'Delivery: 1-2 Weeks',
        ],
      },
      {
        id: 'business-pro',
        title: 'Business Pro',
        description: 'Ideal for small to mid-sized e-commerce businesses.',
        price: '$999',
        isPopular: true,
        features: [
          'Up to 12 Pages + Product Catalog',
          'Shopping Cart & Payment Integration',
          'Mobile Optimization',
          'Newsletter Signup',
          'Basic Inventory Integration',
          'Delivery: 3-4 Weeks',
        ],
      },
      {
        id: 'custom-development',
        title: 'Custom Development',
        description: 'For mid-to-large businesses needing fully customized web apps.',
        price: '$1,999',
        isPopular: false,
        features: [
          'Custom CMS / Admin Panel',
          'React / Node.js Tech Stack',
          'Advanced Features & APIs',
          'SEO, Analytics, Security Layers',
          'Delivery: 4-6 Weeks (Based on Scope)',
        ],
      },
    ],
    'App Development': [
      {
        id: 'mvp-package',
        title: 'MVP Package',
        description: 'Single platform app for small businesses or MVPs.',
        price: '$2,499',
        isPopular: false,
        features: [
          'Up to 5 Screens',
          'Android or iOS',
          'Simple UI/UX',
          'Contact Form & Push Notifications',
          'Delivery: 3-4 Weeks',
        ],
      },
      {
        id: 'cross-platform',
        title: 'Cross-Platform App',
        description: 'Cross-platform mobile solution for growing brands.',
        price: '$5,999',
        isPopular: true,
        features: [
          'Up to 15 Screens',
          'React Native or Flutter',
          'User Authentication + Admin Panel',
          'API Integrations',
          'Delivery: 5-7 Weeks',
        ],
      },
      {
        id: 'enterprise-app',
        title: 'Enterprise App',
        description: 'Fully scalable app tailored to your business logic.',
        price: '$12,000',
        isPopular: false,
        features: [
          'Unlimited Screens (Per Scope)',
          'Native or Cross-Platform',
          'Custom Backend (Node.js, Firebase, etc.)',
          'Real-Time Features, Admin Roles, Payment Systems',
          'Delivery: Based on Requirements',
        ],
      },
    ],
    'SEO': [
      {
        id: 'starter-seo',
        title: 'Starter SEO',
        description: 'For businesses starting with local or basic organic visibility.',
        price: '$399',
        priceUnit: '/month',
        isPopular: false,
        features: [
          '5 Keywords',
          'On-Page Optimization',
          '1 Blog Post / Month',
          'Basic Link Building',
          'Monthly Reports',
        ],
      },
      {
        id: 'basic-growth-seo',
        title: 'Basic Growth SEO',
        description: 'More keywords, better content, deeper analysis.',
        price: '$799',
        priceUnit: '/month',
        isPopular: true,
        features: [
          '15 Keywords',
          'Competitor Research',
          'Technical SEO Fixes',
          '2 Blogs / Month',
          'Schema Markup + Monthly Strategy Call',
        ],
      },
      {
        id: 'enterprise-seo',
        title: 'Enterprise SEO',
        description: 'Advanced SEO strategy for national reach & long-term growth.',
        price: '$1,499',
        priceUnit: '/month',
        isPopular: false,
        features: [
          '30+ Keywords',
          'High Authority Backlinks',
          '4 SEO Blogs / Month',
          'Conversion Optimization',
          'Dedicated SEO Manager + Dashboard',
        ],
      },
    ],
    'Design & Video Editing': [
      {
        id: 'creative-starter',
        title: 'Creative Starter',
        description: 'Simple, clean designs and videos for startups.',
        price: '$299',
        priceUnit: '/month',
        isPopular: false,
        features: [
          '10 Graphic Posts',
          '2 Reels or Short Videos (30s)',
          '2 Revisions Each',
          'Turnaround: 3-5 Days',
        ],
      },
      {
        id: 'growth-creative',
        title: 'Growth Creative',
        description: 'A full content design service for active social or digital campaigns.',
        price: '$599',
        priceUnit: '/month',
        isPopular: true,
        features: [
          '20 Graphics',
          '4 Edited Videos (up to 60s)',
          'Motion Graphics + Brand Templates',
          'Strategy Support',
        ],
      },
      {
        id: 'pro-visual-suite',
        title: 'Pro Visual Suite',
        description: 'A full design & video editing partner for content-heavy operations.',
        price: '$1,299',
        priceUnit: '/month',
        isPopular: false,
        features: [
          'Unlimited* Graphic Requests (Fair Use)',
          '8+ Edited Videos / Month',
          'Product Videos, Animations, Promo Visuals',
          'Dedicated Manager + Weekly Delivery Cycle',
        ],
      },
    ],
  };

  const currentPlans = pricingPlans[activeTab] || [];

  return (
    <div 
      ref={pricingSectionRef}
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
            Affordable <span className="text-cyan-400">plans</span> for every business
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
          {currentPlans.map((plan, index) => (
            <div
              key={plan.id}
              className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out cursor-pointer group flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[calc(33.333vw-1.5rem)] xl:w-[calc(30vw-1.5rem)] min-h-[500px] lg:min-h-[550px]"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Glass gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none ${plan.isPopular ? 'from-cyan-500/20 via-blue-500/10 to-purple-500/10' : ''}`} />
              
              {/* POPULAR Tag */}
              {plan.isPopular && (
                <div className="absolute top-4 right-4 bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  POPULAR
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 p-6 lg:p-8">
                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {plan.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-4">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">
                    {plan.price}
                  </span>
                  {plan.priceUnit && (
                    <span className="text-white/70 text-sm lg:text-base ml-2">
                      {plan.priceUnit}
                    </span>
                  )}
                </div>

                {/* Get Started Button */}
                <Link
                  href="/contact-us"
                  className={`w-full block text-center py-3 rounded-lg font-semibold transition-all mb-6 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  Get Started
                </Link>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => {
                    // Add separator after specific features based on plan type
                    const shouldAddSeparator = 
                      (activeTab === 'Web Development' && (featureIndex === 2 || featureIndex === 4)) ||
                      (activeTab === 'App Development' && (featureIndex === 2 || featureIndex === 3)) ||
                      (activeTab === 'SEO' && (featureIndex === 2 || featureIndex === 3)) ||
                      (activeTab === 'Design & Video Editing' && (featureIndex === 1 || featureIndex === 2));
                    
                    return (
                      <div key={featureIndex}>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                          <span className="text-white/90 text-sm lg:text-base">
                            {feature}
                          </span>
                        </div>
                        {shouldAddSeparator && featureIndex < plan.features.length - 1 && (
                          <div className="border-t border-white/10 my-3"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
