'use client';

import React, { useState, useRef, useEffect } from 'react';
import { headingFont } from '../Font/headingFont';
import Link from 'next/link';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef(null);

  const testimonials = [
    {
      rating: 5,
      headline: 'Logisol brought our app vision to life smooth, polished, and on schedule.',
      body: 'We partnered with Logisol to build a cross-platform mobile app from a rough MVP concept. From wireframes to final deployment, their team (led by Olivia) delivered a sleek, intuitive UI and rock-solid backend. They managed timelines flawlessly, and post-launch metrics showed a 4.8 ★ average rating. Exceptional work all around.',
      author: {
        name: 'Liam Carter',
        title: "Owner, FitWave",
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      rating: 5,
      headline: 'Our website relaunch doubled our traffic and sales followed.',
      body: 'Logisol redesigned our outdated site with a fast, responsive, SEO-Optimized platform that now feels modern and engaging. Under Emma\'s project leadership, load times dropped 60%, bounce rate decreased by 45%, and organic traffic nearly doubled within three months. Best part? Online sales increased by 35% during that time. True professionals—on time, on budget, and beyond expectations.',
      author: {
        name: 'Olivia Ramirez',
        title: 'Owner, PureBliss Skin Care',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
      }
    },
    {
      rating: 5,
      headline: 'Strategic marketing that actually moves the needle.',
      body: 'Logisol crafted a smart, multi-channel campaign including social reels, content strategy, and targeted ad spend. Under Liam\'s coordination, our organic engagement soared 55%, qualified leads rose by 42%, and cost-per-lead dropped 28% in just 90 days. Their transparent reporting and hands-on creativity made them feel like part of our team. Highly recommend!',
      author: {
        name: 'Emma Walker',
        title: 'Director of Growth, UrbanHome Furnishings',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      }
    }
  ];

  const totalCards = testimonials.length;
  const cardsPerView = 3;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalCards - cardsPerView));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalCards - cardsPerView ? prev + 1 : 0));
  };

  // Auto-scroll functionality (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (totalCards > cardsPerView) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section ref={testimonialsRef} className="relative w-full py-16 lg:py-24 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 lg:mb-16">
          {/* Left - Title */}
          <div className="flex-1">
            <p className="text-cyan-400 text-sm md:text-base font-medium mb-2">
              * TESTIMONIALS
            </p>
            <h2
              className={`${headingFont.className} font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-white`}
            >
              What <span className="text-cyan-400">clients</span> are saying
            </h2>
          </div>

          
        </div>

        {/* Testimonials Cards */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 lg:p-8 h-full shadow-2xl hover:bg-white/15 hover:border-cyan-400/50 transition-all duration-300">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Headline */}
                  <h3 className="text-white font-bold text-lg lg:text-xl mb-4 leading-tight">
                    {testimonial.headline}
                  </h3>

                  {/* Body Text */}
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed mb-6">
                    {testimonial.body}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-white/20 mb-6"></div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 overflow-hidden">
                    <img
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author.name)}&background=06b6d4&color=fff&size=100`;
                      }}
                    />
                    <div className="text-white font-bold text-base lg:text-lg leading-tight whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                      <span>{testimonial.author.name}</span>
                      {testimonial.author.title && (
                        <span className="text-white/60 font-normal">, {testimonial.author.title}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {[...Array(Math.max(1, totalCards - cardsPerView + 1))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-cyan-400 w-8'
                  : 'bg-white/20 w-2'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
