'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../Components/UI/Navbar';
import ScrollableRobot from '../Components/UI/ScrollableRobot';
import Slider from '../Components/UI/Slider';
import FAQ from '../Components/UI/FAQ';
import Footer from '../Components/UI/Footer';
import Pricing from '../Components/UI/Pricing';
import Portfolio from '../Components/UI/Portfolio';
import { headingFont } from '../Components/Font/headingFont';
import { useCountry } from '../context/CountryContext';

const Page = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const leftAreaRef = useRef(null);
  const rightAreaRef = useRef(null);
  const footerRef = useRef(null);

  const [activeParagraph, setActiveParagraph] = useState(0);
  const { convertPrice, getCurrency } = useCountry();
  const currency = getCurrency();

  // Format price with currency symbol
  const formatPrice = (usdPrice) => {
    const converted = convertPrice(usdPrice);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  // lock state
  const lockRef = useRef(false);
  const finishedRef = useRef(false);

  // wheel smoothing
  const wheelAccumRef = useRef(0);
  const lastChangeTsRef = useRef(0);

  const paragraphs = [
    {
      heading: 'Social Media Strategies That Engage & Convert',
      text: (
        <>
          At <span className="text-cyan-400 font-semibold">Logisol Technologies</span>, we create
          compelling social media campaigns that build your brand and drive engagement. Our expert
          team manages your presence across all major platforms to maximize your reach.
        </>
      ),
    },
    {
      heading: 'Content Creation & Community Management',
      text: (
        <>
          We develop engaging content calendars, create eye-catching visuals, and manage your social
          media communities. From posts to stories, we ensure consistent brand messaging that
          resonates with your audience.
        </>
      ),
    },
    {
      heading: 'Paid Advertising & Analytics Optimization',
      text: (
        <>
          Our social media marketing services include paid ad campaigns, influencer partnerships,
          and performance analytics. We optimize your campaigns in real-time to maximize ROI and
          achieve your marketing goals.
        </>
      ),
    },
    {
      heading: 'Build Your Brand, Grow Your Following',
      text: (
        <>
          Partner with us to establish a strong social media presence that drives brand awareness
          and customer engagement. Let&apos;s create campaigns that connect with your audience
          and deliver measurable results.
        </>
      ),
    },
  ];

  const lastIndex = paragraphs.length - 1;

  const WHEEL_THRESHOLD = 220;
  const COOLDOWN_MS = 450;

  const shouldLockNow = () => {
    const el = contentRef.current;
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    const topInLockZone = rect.top <= vh * 0.3 && rect.top >= -rect.height * 0.5;
    const sectionFillsScreen = rect.bottom >= vh * 0.7;

    return topInLockZone && sectionFillsScreen;
  };

  useEffect(() => {
    const onScroll = () => {
      if (!shouldLockNow()) {
        finishedRef.current = false;
        wheelAccumRef.current = 0;
        setActiveParagraph(0);
      }
    };

    const onWheel = (e) => {
      const leftEl = leftAreaRef.current;
      const rightEl = rightAreaRef.current;
      const isOnLeft = leftEl && leftEl.contains(e.target);
      const isOnRight = rightEl && rightEl.contains(e.target);

      if (isOnRight) return;

      const inLockZone = shouldLockNow();
      if (!inLockZone) return;
      if (finishedRef.current) return;
      if (!isOnLeft) return;

      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastChangeTsRef.current < COOLDOWN_MS) return;

      wheelAccumRef.current += e.deltaY;
      if (Math.abs(wheelAccumRef.current) < WHEEL_THRESHOLD) return;

      const direction = wheelAccumRef.current > 0 ? 1 : -1;
      wheelAccumRef.current = 0;

      if (direction === 1) {
        if (activeParagraph < lastIndex) {
          setActiveParagraph((p) => Math.min(p + 1, lastIndex));
          lastChangeTsRef.current = now;
          return;
        }
        finishedRef.current = true;
        wheelAccumRef.current = 0;
        return;
      } else {
        if (activeParagraph > 0) {
          setActiveParagraph((p) => Math.max(p - 1, 0));
          lastChangeTsRef.current = now;
          return;
        }
        finishedRef.current = true;
        wheelAccumRef.current = 0;
        return;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel, { capture: true });
    };
  }, [activeParagraph, lastIndex]);

  return (
    <main className="text-white relative">
      <Navbar />

      <ScrollableRobot heroRef={null} aboutRef={contentRef} gapRef={null} servicesRef={null} footerRef={footerRef} />

      <div className="flex flex-col items-center justify-center h-[20rem] sm:h-[25rem] lg:h-[30rem] px-4">
        <h1
          className={`${headingFont.className} font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-5xl text-center text-white w-full px-4 sm:px-6`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          SOCIAL MEDIA <span className="text-cyan-400">MARKETING</span> SERVICES
        </h1>
        
        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 flex-wrap">
          <img 
            src="/clutch.png" 
            alt="Clutch" 
            className="h-8 sm:h-10 lg:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
          <img 
            src="/google_1.png" 
            alt="Google" 
            className="h-8 sm:h-10 lg:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
          <a
            href="https://www.trustpilot.com/review/logisoltech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="trustpilot-widget flex items-center h-8 sm:h-10 lg:h-14 [&>img]:h-full [&>img]:w-auto [&>img]:object-contain [&>img]:opacity-80 hover:[&>img]:opacity-100 [&>img]:transition-opacity"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="6852853d257a8efcadfee24a"
            data-style-height="52px"
            data-style-width="100%"
            data-token="0090270f-1ff8-4940-a765-405330145a39"
          >
            <img src="/trust.png" alt="Trustpilot" className="h-full w-auto object-contain" />
          </a>
        </div>
      </div>

      <Slider />

      <section ref={contentRef} className="relative w-full min-h-screen py-8 lg:py-0 lg:h-screen">
        <div className="absolute inset-0 w-full h-full flex items-center py-8 sm:py-12 lg:py-16 xl:py-24">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
              {/* Text Content - Left Side */}
              <div ref={leftAreaRef} className="flex items-start gap-4 sm:gap-6 lg:gap-8 flex-1 lg:w-1/2 w-full">
                {/* Vertical Scroll Progress Bar */}
                <div className="hidden lg:flex flex-col items-center gap-1 py-2">
                  {/* Progress Track */}
                  <div className="relative w-1 h-48 bg-white/10 rounded-full overflow-hidden">
                    {/* Progress Fill */}
                    <div 
                      className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-cyan-500 rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        height: `${((activeParagraph + 1) / paragraphs.length) * 100}%` 
                      }}
                    />
                    {/* Dot Indicators */}
                    {paragraphs.map((_, index) => (
                      <div
                        key={index}
                        className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                          index <= activeParagraph 
                            ? 'bg-cyan-400 border-cyan-400 scale-100' 
                            : 'bg-transparent border-white/30 scale-75'
                        }`}
                        style={{ 
                          top: `${(index / (paragraphs.length - 1)) * 100}%`,
                          transform: `translate(-50%, -50%)`
                        }}
                      />
                    ))}
                  </div>
                  {/* Current / Total */}
                  <span className="text-cyan-400 font-medium text-sm mt-2">
                    {activeParagraph + 1}/{paragraphs.length}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8 flex-1 w-full">
                  {/* Paragraph Container */}
                  <div className="relative w-full max-w-2xl min-h-[200px] sm:min-h-[240px] lg:min-h-[260px]">
                    {paragraphs.map((para, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          index === activeParagraph
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8 pointer-events-none'
                        }`}
                      >
                        <h2 className={`${headingFont.className} font-bold text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4`}>
                          {para.heading}
                        </h2>
                        <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed">
                          {para.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Progress Dots */}
                  <div className="flex lg:hidden gap-2 mt-8">
                    {paragraphs.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === activeParagraph ? 'bg-cyan-400 w-8' : 'bg-white/20 w-2'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 3D Model Container - Right Side - Desktop Only */}
              <div ref={rightAreaRef} className="hidden lg:block relative w-full lg:w-1/2">
                <div
                  id="social-media-model-container"
                  className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center overflow-visible pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Portfolio defaultTab="Digital Marketing" />

      {/* Social Media Marketing Packages Section */}
      <section className="relative w-full py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Heading */}
          <h2
            className={`${headingFont.className} font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white mb-12 lg:mb-16`}
          >
            Social Media <span className="text-cyan-400">Marketing</span>
          </h2>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Starter Social */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden">
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 text-center">Starter Social</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6 text-center">
                  Consistent, quality content for growing a basic social presence.
                </p>

                {/* Price */}
                <div className="mb-6 text-center">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(399)}</span>
                  <span className="text-white/70 text-sm lg:text-base ml-2">/month</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">2 Platforms (e.g., Facebook + Instagram)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">8 Posts/Month</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Basic Design & Hashtags</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Monthly Reporting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Growth Social (POPULAR) */}
            <div className="backdrop-blur-2xl bg-white/5 border border-cyan-400/50 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400 transition-all duration-500 ease-out relative overflow-hidden">
              {/* POPULAR Tag */}
              <div className="absolute top-4 right-4 bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>

              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-cyan-400 bg-cyan-400/30 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 text-center">Growth Social</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6 text-center">
                  Elevated content, light ads, and strategic engagement.
                </p>

                {/* Price */}
                <div className="mb-6 text-center">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(799)}</span>
                  <span className="text-white/70 text-sm lg:text-base ml-2">/month</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">3 Platforms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">16 Posts + 4 Reels / Month</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Comments & DMs Monitoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Ad Campaign Setup</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Monthly Strategy Call</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Pro Social */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden">
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 text-center">Pro Social</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6 text-center">
                  High-volume, data-driven content management for growing brands.
                </p>

                {/* Price */}
                <div className="mb-6 text-center">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(1499)}</span>
                  <span className="text-white/70 text-sm lg:text-base ml-2">/month</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">All Major Platforms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">30+ Posts / Month + 8 Reels</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Community Management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Paid Campaign Management</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Competitor Research + Reporting Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pricing defaultTab="Social Media Marketing" hideTabs={true} />

      <section ref={pageRef} className="relative">
        <FAQ />
      </section>

      <section ref={footerRef} className="relative">
        <Footer />
      </section>
    </main>
  );
};

export default Page;
