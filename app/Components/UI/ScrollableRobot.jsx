'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { getLenis } from './SmoothScroll';

// Dynamically import RobotModel to avoid SSR issues with Three.js / WebGL
const DynamicRobotModel = dynamic(() => import('./RobotModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-white/50">Loading 3D Model...</div>
    </div>
  ),
});

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// simple easing for smoother scroll-based animation
const easeInOutQuad = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const ScrollableRobot = ({ heroRef, aboutRef, gapRef, servicesRef }) => {
  const containerRef = useRef(null);
  const lastAboutPositionRef = useRef(null); // store last stable about position
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updatePosition = () => {
      if (!heroRef?.current || !aboutRef?.current || !gapRef?.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const aboutRect = aboutRef.current.getBoundingClientRect();
      const gapRect = gapRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const scrollY = window.scrollY || window.pageYOffset;
      const heroPageTop = heroRef.current.offsetTop;
      const aboutPageTop = aboutRef.current.offsetTop;
      const gapPageTop = gapRef.current.offsetTop;
      const servicesPageTop = servicesRef?.current?.offsetTop || Infinity;

      // Try to get dedicated model containers in each section
      const heroContainer = heroRef.current.querySelector('#hero-model-container');
      const aboutContainer = aboutRef.current.querySelector('#about-model-container');

      let heroContainerX, aboutContainerX;

      // X position for hero side (viewport-relative, since we use position: fixed)
      if (heroContainer) {
        const heroContainerRect = heroContainer.getBoundingClientRect();
        heroContainerX = heroContainerRect.left + heroContainerRect.width / 2;
      } else {
        // Fallback: assume model is on the right side of Hero on desktop,
        // centered on mobile.
        heroContainerX =
          windowWidth > 1024
            ? heroRect.left + heroRect.width * 0.75
            : heroRect.left + heroRect.width * 0.5;
      }

      // X and Y positions for about side (viewport-relative, since we use position: fixed)
      let aboutY;
      if (aboutContainer) {
        const aboutContainerRect = aboutContainer.getBoundingClientRect();
        aboutContainerX = aboutContainerRect.left + aboutContainerRect.width / 2;
        aboutY = aboutContainerRect.top + aboutContainerRect.height / 2;
      } else {
        // Fallback: assume model is on left side of About on desktop,
        // centered on mobile.
        aboutContainerX =
          windowWidth > 1024
            ? aboutRect.left + aboutRect.width * 0.25
            : aboutRect.left + aboutRect.width * 0.5;
        aboutY = aboutRect.top + aboutRect.height / 2;
      }

      // Y position for hero (viewport-relative)
      const heroY = heroRect.top + heroRect.height * 0.3;

      // Section boundaries
      const aboutSectionHeight = aboutRef.current.offsetHeight;
      const aboutSectionBottom = aboutPageTop + aboutSectionHeight;
      const gapSectionHeight = gapRef.current.offsetHeight;

      // Slow & smooth fly-out distance (scroll distance)
      const flyOutDistance = Math.max(
        gapSectionHeight * 5,
        windowHeight * 2,
        1400
      );

      // Fly-out end
      const flyOutEnd = (gapPageTop - windowHeight) + flyOutDistance;

      // Gap section detection
      const isInGapSection =
        gapRect.top <= windowHeight &&
        gapRect.bottom >= 0 &&
        scrollY < flyOutEnd;

      let currentX, currentY;

      // ---------- HERO → ABOUT TRANSITION ----------
      if (scrollY < aboutPageTop) {
        const heroToAboutDistance = aboutPageTop - heroPageTop;
        let progress = 0;

        if (heroToAboutDistance > 0) {
          progress = (scrollY - heroPageTop) / heroToAboutDistance;
          progress = clamp(progress, 0, 1);
        }

        currentX = heroContainerX + (aboutContainerX - heroContainerX) * progress;
        currentY = heroY + (aboutY - heroY) * progress;

        setScrollProgress(progress * 0.5); // 0 → 0.5
        setIsVisible(true);
        setPosition({
          x: currentX,
          y: currentY,
          opacity: 1,
        });
        return;
      }

      // ---------- ABOUT STICKY POSITION ----------
      if (scrollY >= aboutPageTop && scrollY < aboutSectionBottom && !isInGapSection) {
        const currentAboutRect = aboutRef.current.getBoundingClientRect();
        let currentAboutX, currentAboutY;

        if (aboutContainer) {
          const aboutContainerRect = aboutContainer.getBoundingClientRect();
          currentAboutX = aboutContainerRect.left + aboutContainerRect.width / 2;
          currentAboutY = aboutContainerRect.top + aboutContainerRect.height / 2;
        } else {
          currentAboutX =
            windowWidth > 1024
              ? currentAboutRect.left + currentAboutRect.width * 0.25
              : currentAboutRect.left + currentAboutRect.width * 0.5;
          currentAboutY = currentAboutRect.top + currentAboutRect.height / 2;
        }

        lastAboutPositionRef.current = {
          x: currentAboutX,
          y: currentAboutY,
        };

        currentX = currentAboutX;
        currentY = currentAboutY;
        setScrollProgress(0.5);
        setIsVisible(true);
        setPosition({
          x: currentX,
          y: currentY,
          opacity: 1,
        });
        return;
      }

      // ---------- GAP SECTION: 3-PHASE CUSTOM PATH ----------
      if (isInGapSection) {
        const rawGapStart = gapPageTop - windowHeight;
        const gapStart = Math.max(rawGapStart, 0); // safety

        // 0 → 1 based on scroll
        let flyOutProgress = (scrollY - gapStart) / flyOutDistance;
        flyOutProgress = clamp(flyOutProgress, 0, 1);

        // thoda smooth speed
        const t = easeInOutQuad(flyOutProgress);

        // START POSITION (from About)
        const currentAboutRect = aboutRef.current.getBoundingClientRect();
        let calculatedAboutX, calculatedAboutY;

        if (aboutContainer) {
          const aboutContainerRect = aboutContainer.getBoundingClientRect();
          calculatedAboutX = aboutContainerRect.left + aboutContainerRect.width / 2;
          calculatedAboutY = aboutContainerRect.top + aboutContainerRect.height / 2;
        } else {
          calculatedAboutX =
            windowWidth > 1024
              ? currentAboutRect.left + currentAboutRect.width * 0.25
              : currentAboutRect.left + currentAboutRect.width * 0.5;
          calculatedAboutY = currentAboutRect.top + currentAboutRect.height / 2;
        }

        if (currentAboutRect.bottom < 0 || calculatedAboutX <= 0) {
          if (lastAboutPositionRef.current && lastAboutPositionRef.current.x > 0) {
            calculatedAboutX = lastAboutPositionRef.current.x;
            calculatedAboutY = lastAboutPositionRef.current.y;
          } else {
            calculatedAboutX = windowWidth > 1024 ? windowWidth * 0.25 : windowWidth * 0.5;
            calculatedAboutY = windowHeight / 2;
          }
        }

        let startX, startY;
        if (
          lastAboutPositionRef.current &&
          lastAboutPositionRef.current.x !== undefined &&
          lastAboutPositionRef.current.x > 0
        ) {
          startX = lastAboutPositionRef.current.x;
          startY = lastAboutPositionRef.current.y;
        } else {
          startX = calculatedAboutX;
          startY = calculatedAboutY;
          lastAboutPositionRef.current = { x: startX, y: startY };
        }

        // ---------- HORIZONTAL (X) – always right side ko jaa raha hai ----------
        const targetX = startX + windowWidth * 1.4; // kitna right jaana hai
        const easedX = t;
        const newX = startX + (targetX - startX) * easedX;

        // ---------- VERTICAL (Y) – 3 phase path (dip → up loop → glide down) ----------
        const dipDown = 300;    // phase 1: neeche kitna
        const loopUp = -300;    // phase 2: upar kitna
        const finalDown = 260;  // phase 3: end pe kitna neeche

        let yOffset;

        if (t <= 0.3) {
          // Phase 1 → start se halka sa neeche
          const local = t / 0.3;          // 0 → 1
          yOffset = dipDown * local;      // 0 → +dipDown
        } else if (t <= 0.6) {
          // Phase 2 → neeche se upar wali loop
          const local = (t - 0.3) / 0.3;  // 0 → 1
          const from = dipDown;
          const to = loopUp;              // negative = upar
          yOffset = from + (to - from) * local;
        } else {
          // Phase 3 → upar se neeche long glide
          const local = (t - 0.6) / 0.4;  // 0 → 1
          const from = loopUp;
          const to = finalDown;
          yOffset = from + (to - from) * local;
        }

        const newY = startY + yOffset;

        // Rotation & opacity
        const rotationProgress = 0.5 + flyOutProgress * 2.2;
        setScrollProgress(rotationProgress);

        let opacity;
        if (flyOutProgress < 0.75) {
          opacity = 1;
        } else {
          const local = (flyOutProgress - 0.75) / 0.25;
          opacity = 1 - clamp(local, 0, 1);
        }

        setIsVisible(true);
        setPosition({
          x: newX,
          y: newY,
          opacity,
        });

        return;
      }

      // ---------- AFTER FLYOUT / SERVICES ----------
      setIsVisible(false);
      setPosition({
        x: windowWidth + 800,
        y: windowHeight / 2,
        opacity: 0,
      });
      return;
    };

    // Run once on mount
    const timeoutId = setTimeout(updatePosition, 100);

    // Use requestAnimationFrame for smooth updates
    let rafId;
    const raf = () => {
      updatePosition();
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Also update on resize
    window.addEventListener('resize', updatePosition);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePosition);
    };
  }, [heroRef, aboutRef, gapRef, servicesRef]);

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-none z-0 will-change-transform robot-model-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? position.opacity : 0,
        pointerEvents: 'none',
        width: '600px',
        height: '600px',
        maxWidth: '100vw',
        maxHeight: '100vh',
        touchAction: 'none',
        backgroundColor: 'transparent',
        background: 'transparent',
        willChange: 'transform, opacity',
      }}
    >
      <div className="relative w-full h-full pointer-events-none" style={{ backgroundColor: 'transparent' }}>
        {/* Soft glow behind model */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full blur-3xl pointer-events-none" />
        {/* 3D model - always render to prevent reloading */}
        <div className="relative w-full h-full bg-transparent pointer-events-none" style={{ backgroundColor: 'transparent' }}>
          <DynamicRobotModel scrollProgress={scrollProgress} />
        </div>
      </div>
    </div>
  );
};

export default ScrollableRobot;
