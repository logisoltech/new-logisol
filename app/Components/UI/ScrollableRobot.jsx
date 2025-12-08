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

const ScrollableRobot = ({ heroRef, aboutRef }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updatePosition = () => {
      if (!heroRef?.current || !aboutRef?.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const aboutRect = aboutRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      // Try to get dedicated model containers in each section (if you added them)
      const heroContainer = heroRef.current.querySelector('#hero-model-container');
      const aboutContainer = aboutRef.current.querySelector('#about-model-container');

      let heroContainerX;
      let aboutContainerX;

      // X position for hero side
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

      // X position for about side
      if (aboutContainer) {
        const aboutContainerRect = aboutContainer.getBoundingClientRect();
        aboutContainerX = aboutContainerRect.left + aboutContainerRect.width / 2;
      } else {
        // Fallback: assume model is on left side of About on desktop,
        // centered on mobile.
        aboutContainerX =
          windowWidth > 1024
            ? aboutRect.left + aboutRect.width * 0.25
            : aboutRect.left + aboutRect.width * 0.5;
      }

      // Y positions: adjust to align with text content (near navbar in Hero section)
      // For Hero: position near top (around 20% from top to align with text near navbar)
      // For About: keep centered
      const heroY = heroRect.top + heroRect.height * 0.3;
      const aboutY = aboutRect.top + aboutRect.height / 2;

      // --- KEY PART: smooth scroll-based progress ---

      // Get scroll position - use window.scrollY (Lenis updates this)
      const scrollY = window.scrollY;

      // Absolute positions on the page
      const heroPageTop = heroRef.current.offsetTop;
      const aboutPageTop = aboutRef.current.offsetTop;

      // progress = 0 at Hero, 1 at About (clamped)
      let progress =
        (scrollY - heroPageTop) / (aboutPageTop - heroPageTop || 1); // avoid divide-by-zero
      progress = clamp(progress, 0, 1);

      setIsVisible(true);
      setScrollProgress(progress);

      // Interpolate between hero & about positions
      const currentX = heroContainerX + (aboutContainerX - heroContainerX) * progress;
      const currentY = heroY + (aboutY - heroY) * progress;

      setPosition({
        x: currentX,
        y: currentY,
        opacity: 1,
      });
    };

    // Run once on mount (small delay so layout is ready)
    const timeoutId = setTimeout(updatePosition, 100);

    // Use requestAnimationFrame for smooth updates with Lenis
    // This ensures updates happen in sync with Lenis's smooth scrolling
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
  }, [heroRef, aboutRef]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-none z-0 will-change-transform robot-model-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: position.opacity,
        width: '600px',
        height: '600px',
        maxWidth: '100vw',
        maxHeight: '100vh',
        touchAction: 'none',
      }}
    >
      <div className="relative w-full h-full pointer-events-none">
        {/* Soft glow behind model */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full blur-3xl pointer-events-none" />
        {/* 3D model */}
        <div className="relative w-full h-full bg-transparent pointer-events-none">
          <DynamicRobotModel scrollProgress={scrollProgress} />
        </div>
      </div>
    </div>
  );
};

export default ScrollableRobot;
