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
  const finishedRef = useRef(false);

  // wheel smoothing
  const wheelAccumRef = useRef(0);
  const lastChangeTsRef = useRef(0);

  const paragraphs = [
    {
      heading: 'Creative Design Solutions That Stand Out',
      text: (
        <>
          At <span className="text-cyan-400 font-semibold">Logisol Technologies</span>, we create
          stunning visual designs that capture your brand&apos;s essence. Our talented designers
          combine creativity with strategic thinking to deliver designs that resonate with your audience.
        </>
      ),
    },
    {
      heading: 'Brand Identity That Makes an Impact',
      text: (
        <>
          We specialize in logo design, brand identity, and visual communication. From concept to
          execution, we ensure your brand stands out in the marketplace with memorable and impactful designs.
        </>
      ),
    },
    {
      heading: 'UI/UX Design That Enhances User Experience',
      text: (
        <>
          Our graphics design services include user interface design, user experience optimization,
          and interactive design elements. We create intuitive, beautiful interfaces that users love
          to interact with.
        </>
      ),
    },
    {
      heading: 'Visual Storytelling That Connects',
      text: (
        <>
          Partner with us to bring your brand&apos;s story to life through compelling visuals. Let&apos;s
          create designs that not only look great but also communicate your message effectively.
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

      <div className="flex items-center justify-center h-[30rem]">
        <h1
          className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white w-full`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          GRAPHICS <span className="text-cyan-400">DESIGNING</span> SERVICES
        </h1>
      </div>

      <Slider />

      <section ref={contentRef} className="relative w-full h-screen">
        <div className="absolute inset-0 w-full h-full flex items-center py-16 lg:py-24">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
              <div ref={leftAreaRef} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 flex-1 lg:w-1/2">
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

              <div ref={rightAreaRef} className="relative w-full lg:w-1/2">
                <div
                  id="graphics-designing-model-container"
                  className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center overflow-visible pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pricing defaultTab="Design & Video Editing" hideTabs={true} />

      <section ref={pageRef} className="relative">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
};

export default Page;
