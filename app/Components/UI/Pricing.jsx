'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const Pricing = () => {
  const pricingSectionRef = useRef(null);
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
  const pricingPlans = [
    {
      id: 'starter-site',
      title: 'Starter Site',
      description: 'Perfect for small businesses looking to establish an online presence.',
      price: '$499',
      buttonText: 'Get Started',
      buttonStyle: 'bg-gray-700 hover:bg-gray-600',
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
      id: 'starter-app',
      title: 'Starter App',
      description: 'Single platform app for small businesses or MVPs.',
      price: '$2,499',
      buttonText: 'Get Started',
      buttonStyle: 'bg-cyan-500 hover:bg-cyan-400',
      features: [
        'Up to 5 Screens',
        'Android or IOS',
        'Simple UI/UX',
        'Contact Form & Push Notifications',
        'Delivery: 3-4 Weeks',
      ],
    },
  ];

  return (
    <div 
      ref={pricingSectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32"
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Section Header */}
          <div 
            className={`w-full lg:w-1/3 lg:flex-shrink-0 transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-[-50px] opacity-0'
            }`}
          >
            {/* Star Heading */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-cyan-400 text-xl">★</span>
              <span className="text-cyan-400 text-sm lg:text-base font-semibold uppercase tracking-wider">
                PRICING PLAN
              </span>
            </div>
            
            {/* Main Heading */}
            <h2
              className={`${headingFont.className} font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight text-white tracking-tight`}
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
              }}
            >
              Affordable <span className="text-cyan-400">plans</span> for every business
            </h2>
          </div>

          {/* Pricing Cards */}
          <div 
            className={`w-full lg:w-2/3 flex flex-col md:flex-row gap-6 lg:gap-8 transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-[50px] opacity-0'
            }`}
            style={{
              transitionDelay: '200ms',
            }}
          >
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className="flex-1 backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden"
            >
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10">

                {/* Title */}
                <h3 className="text-white font-bold text-2xl lg:text-3xl mb-2">
                  {plan.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-white font-bold text-4xl lg:text-5xl">
                    {plan.price}
                  </span>
                </div>

                {/* Get Started Button */}
                <button
                  className={`w-full ${plan.buttonStyle} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 mb-8`}
                >
                  {plan.buttonText}
                </button>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-cyan-400 text-lg flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-white/90 text-sm lg:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
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
