'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const AboutUsContent = () => {
  const [activeParagraph, setActiveParagraph] = useState(0);

  const sectionRef = useRef(null);

  // lock state
  const lockRef = useRef(false);

  // wheel smoothing
  const wheelAccumRef = useRef(0);
  const lastChangeTsRef = useRef(0);

  const paragraphs = [
    {
      text: (
        <>
          At <span className="text-cyan-400 font-semibold">Logisol Technologies</span>, we are
          passionate about transforming innovative ideas into powerful digital solutions. With a
          team of expert developers, designers, and strategists, we deliver cutting-edge
          technology that drives business growth.
        </>
      ),
    },
    {
      text: (
        <>
          Our commitment to excellence and innovation sets us apart in the digital landscape.
          We combine technical expertise with creative vision to build solutions that not only
          meet but exceed our clients&apos; expectations.
        </>
      ),
    },
    {
      text: (
        <>
          With years of experience in web and mobile app development, we&apos;ve helped countless
          businesses achieve their digital transformation goals. Our agile methodology ensures
          timely delivery while maintaining the highest quality standards.
        </>
      ),
    },
    {
      text: (
        <>
          Partner with us to unlock your business potential. Let&apos;s build something extraordinary
          together and take your digital presence to the next level.
        </>
      ),
    },
  ];

  const lastIndex = paragraphs.length - 1;

  // ✅ Tune these to your liking
  const WHEEL_THRESHOLD = 220; // bigger = harder to change (less sensitive)
  const COOLDOWN_MS = 450;     // time between paragraph changes

  const shouldLockNow = () => {
    const el = sectionRef.current;
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // Lock only when section is basically at top AND still largely visible
    const topIsAtOrPastTop = rect.top <= 0;
    const bottomStillVisible = rect.bottom >= vh * 0.8;

    return topIsAtOrPastTop && bottomStillVisible;
  };

  useEffect(() => {
    const onScroll = () => {
      // Start locking only when user naturally scrolls to the section top
      lockRef.current = shouldLockNow();

      // Reset wheel accum when lock turns off (important for normal feel)
      if (!lockRef.current) {
        wheelAccumRef.current = 0;
      }
    };

    const onWheel = (e) => {
      if (!lockRef.current) return;

      // While locked, prevent page scroll
      e.preventDefault();

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

        // ✅ At last paragraph: unlock and let normal scrolling happen next wheel
        lockRef.current = false;
        wheelAccumRef.current = 0;
        return;
      } else {
        // scroll up
        if (activeParagraph > 0) {
          setActiveParagraph((p) => Math.max(p - 1, 0));
          lastChangeTsRef.current = now;
          return;
        }

        // ✅ At first paragraph: unlock and let normal scrolling happen next wheel
        lockRef.current = false;
        wheelAccumRef.current = 0;
        return;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });

    // initial
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
    };
  }, [activeParagraph, lastIndex]);

  return (
    <div ref={sectionRef} className="relative w-full h-screen">
      <div className="absolute inset-0 w-full h-full flex items-center py-16 lg:py-24">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            {/* 3D Model Container - Left Side */}
            <div
              id="about-model-container"
              className="relative w-full lg:w-1/2 aspect-square max-w-md mx-auto flex items-center justify-center overflow-visible pointer-events-none"
            >
              {/* Model will be positioned here by ScrollableRobot */}
            </div>

            {/* Text Content - Right Side */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 flex-1 lg:w-1/2">
              <h2
                className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white tracking-tight`}
                style={{
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
                }}
              >
                ABOUT <span className="text-cyan-400">US</span>
              </h2>

              {/* Paragraph Container */}
              <div className="relative w-full max-w-2xl min-h-[220px]">
                {paragraphs.map((para, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeParagraph
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8 pointer-events-none'
                    }`}
                  >
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed">{para.text}</p>
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
                Scroll (smooth) to change paragraphs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContent;
