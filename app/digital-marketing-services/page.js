'use client';

import React, { useRef, useEffect, useState } from 'react';
import Navbar from '../Components/UI/Navbar';
import ScrollableRobot from '../Components/UI/ScrollableRobot';
import Slider from '../Components/UI/Slider';
import FAQ from '../Components/UI/FAQ';
import Footer from '../Components/UI/Footer';
import Pricing from '../Components/UI/Pricing';
import CaseStudy from '../Components/UI/CaseStudy';
import Portfolio from '../Components/UI/Portfolio';
import { headingFont } from '../Components/Font/headingFont';

const Page = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const leftAreaRef = useRef(null);
  const rightAreaRef = useRef(null);

  const [activeParagraph, setActiveParagraph] = useState(0);

  // lock state
  const lockRef = useRef(false);
  const finishedRef = useRef(false);

  // wheel smoothing
  const wheelAccumRef = useRef(0);
  const lastChangeTsRef = useRef(0);

  const paragraphs = [
    {
      heading: 'Strategic Digital Marketing That Drives Results',
      text: (
        <>
          At <span className="text-cyan-400 font-semibold">Logisol Technologies</span>, we craft
          data-driven digital marketing strategies that amplify your brand&apos;s online presence.
          Our expert team combines creativity with analytics to deliver campaigns that convert.
        </>
      ),
    },
    {
      heading: 'Multi-Channel Campaigns, Unified Results',
      text: (
        <>
          We leverage SEO, social media, content marketing, and paid advertising to create
          comprehensive campaigns. From strategy to execution, we ensure consistent messaging
          across all digital touchpoints.
        </>
      ),
    },
    {
      heading: 'Measurable Growth, Transparent Reporting',
      text: (
        <>
          Our digital marketing services include performance tracking, analytics, and detailed
          reporting. We provide real-time insights and optimize campaigns continuously to maximize
          your ROI and drive sustainable growth.
        </>
      ),
    },
    {
      heading: 'Scale Your Reach, Amplify Your Impact',
      text: (
        <>
          Partner with us to expand your digital footprint and reach your target audience effectively.
          Let&apos;s build a marketing strategy that propels your business to new heights.
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

      <ScrollableRobot heroRef={null} aboutRef={contentRef} gapRef={null} servicesRef={null} />

      <div className="flex flex-col items-center justify-center h-[20rem] sm:h-[25rem] lg:h-[30rem] px-4">
        <h1
          className={`${headingFont.className} font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white w-full`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          DIGITAL <span className="text-cyan-400">MARKETING</span> SERVICES
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
          <img 
            src="/trust.png" 
            alt="Trust" 
            className="h-8 sm:h-10 lg:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
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
                  id="digital-marketing-model-container"
                  className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center overflow-visible pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Portfolio defaultTab="Digital Marketing" />
      <CaseStudy />
      <Pricing defaultTab="SEO" hideTabs={true} />

      <section ref={pageRef} className="relative">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
};

export default Page;
