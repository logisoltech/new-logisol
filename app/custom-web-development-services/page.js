'use client';

import React, { useRef, useEffect, useState } from 'react';
import Navbar from '../Components/UI/Navbar';
import ScrollableRobot from '../Components/UI/ScrollableRobot';
import Slider from '../Components/UI/Slider';
import FAQ from '../Components/UI/FAQ';
import Footer from '../Components/UI/Footer';
import Pricing from '../Components/UI/Pricing';
import { headingFont } from '../Components/Font/headingFont';

const Page = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const leftAreaRef = useRef(null);
  const rightAreaRef = useRef(null);

  const [activeParagraph, setActiveParagraph] = useState(0);

  // lock state
  const lockRef = useRef(false);
  const finishedRef = useRef(false); // true when user has gone through all paragraphs

  // wheel smoothing
  const wheelAccumRef = useRef(0);
  const lastChangeTsRef = useRef(0);

  const paragraphs = [
    {
      heading: 'Custom Web Solutions That Fit Your Business',
      text: (
        <>
          At <span className="text-cyan-400 font-semibold">Logisol Technologies</span>, we specialize in
          creating custom web development solutions tailored to your unique business needs. Our expert
          team builds scalable, high-performance websites and web applications that drive growth.
        </>
      ),
    },
    {
      heading: 'Modern Tech Stack, Clean Performance',
      text: (
        <>
          We leverage cutting-edge technologies and modern frameworks to deliver robust web solutions.
          From responsive design to complex backend systems, we ensure your web presence stands out
          in the digital landscape.
        </>
      ),
    },
    {
      heading: 'Full Stack Delivery From Start To Launch',
      text: (
        <>
          Our custom web development services include full-stack development, API integration,
          database design, and cloud deployment. We work closely with you to understand your goals
          and deliver solutions that exceed expectations.
        </>
      ),
    },
    {
      heading: 'Build With Confidence, Scale With Ease',
      text: (
        <>
          Partner with us to transform your vision into a powerful web presence. Let&apos;s build
          something extraordinary that drives your business forward.
        </>
      ),
    },
  ];

  const lastIndex = paragraphs.length - 1;

  // ✅ Tune these to your liking
  const WHEEL_THRESHOLD = 220; // bigger = harder to change (less sensitive)
  const COOLDOWN_MS = 450;     // time between paragraph changes

  const shouldLockNow = () => {
    const el = contentRef.current;
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // Lock when section top is in upper 30% of viewport AND section fills most of screen
    const topInLockZone = rect.top <= vh * 0.3 && rect.top >= -rect.height * 0.5;
    const sectionFillsScreen = rect.bottom >= vh * 0.7;

    return topInLockZone && sectionFillsScreen;
  };

  useEffect(() => {
    const onScroll = () => {
      // Reset finished flag when section is out of lock zone
      if (!shouldLockNow()) {
        finishedRef.current = false;
        wheelAccumRef.current = 0;
        setActiveParagraph(0); // Reset to first paragraph for next visit
      }
    };

    const onWheel = (e) => {
      // Check if cursor is on left area (paragraphs)
      const leftEl = leftAreaRef.current;
      const rightEl = rightAreaRef.current;
      const isOnLeft = leftEl && leftEl.contains(e.target);
      const isOnRight = rightEl && rightEl.contains(e.target);

      // If cursor is on right side (model), always allow normal scrolling
      if (isOnRight) {
        return;
      }

      // Check if section is in lock zone
      const inLockZone = shouldLockNow();

      // If not in lock zone, allow normal scrolling
      if (!inLockZone) {
        return;
      }

      // If user has finished paragraphs, allow normal scrolling
      if (finishedRef.current) {
        return;
      }

      // Only lock if cursor is on left side
      if (!isOnLeft) {
        return;
      }

      // We're in lock zone and cursor is on left - lock and prevent scroll
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();

      // Cooldown prevents rapid-fire changes
      if (now - lastChangeTsRef.current < COOLDOWN_MS) return;

      // Accumulate wheel delta (trackpad + mouse both)
      wheelAccumRef.current += e.deltaY;

      // Not enough scroll yet? do nothing.
      if (Math.abs(wheelAccumRef.current) < WHEEL_THRESHOLD) return;

      const direction = wheelAccumRef.current > 0 ? 1 : -1;

      // Consume the threshold (keeps it stable)
      wheelAccumRef.current = 0;

      // Move paragraph
      if (direction === 1) {
        // scroll down
        if (activeParagraph < lastIndex) {
          setActiveParagraph((p) => Math.min(p + 1, lastIndex));
          lastChangeTsRef.current = now;
          return;
        }

        // ✅ At last paragraph: mark as finished so scrolling continues
        finishedRef.current = true;
        wheelAccumRef.current = 0;
        return;
      } else {
        // scroll up
        if (activeParagraph > 0) {
          setActiveParagraph((p) => Math.max(p - 1, 0));
          lastChangeTsRef.current = now;
          return;
        }

        // ✅ At first paragraph: mark as finished so scrolling continues
        finishedRef.current = true;
        wheelAccumRef.current = 0;
        return;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false, capture: true });

    // initial
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

      <div className="flex items-center justify-center h-[30rem]">
        <h1
          className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white w-full`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          CUSTOM WEB <span className="text-cyan-400">DEVELOPMENT</span> SERVICES
        </h1>
      </div>

      <Slider />

      <section ref={contentRef} className="relative w-full h-screen">
        <div className="absolute inset-0 w-full h-full flex items-center py-16 lg:py-24">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
              {/* Text Content - Left Side */}
              <div ref={leftAreaRef} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 flex-1 lg:w-1/2">
                {/* Paragraph Container */}
                <div className="relative w-full max-w-2xl min-h-[260px]">
                  {paragraphs.map((para, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === activeParagraph
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8 pointer-events-none'
                      }`}
                    >
                      <h2 className={`${headingFont.className} font-bold text-2xl md:text-3xl text-white mb-4`}>
                        {para.heading}
                      </h2>
                      <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                        {para.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="flex gap-2 mt-8">
                  {paragraphs.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeParagraph ? 'bg-cyan-400 w-8' : 'bg-white/20 w-2'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-white/40 text-sm">
                  
                </p>
              </div>

              {/* 3D Model Container - Right Side */}
              <div ref={rightAreaRef} className="relative w-full lg:w-1/2">
                <div
                  id="custom-web-model-container"
                  className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center overflow-visible pointer-events-none"
                >
                  {/* Model will be positioned here by ScrollableRobot */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pricing defaultTab="Web Development" hideTabs={true} />

      <section ref={pageRef} className="relative">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
};

export default Page;
