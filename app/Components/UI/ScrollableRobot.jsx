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

const ScrollableRobot = ({ heroRef, aboutRef, gapRef, servicesRef, footerRef }) => {
  const containerRef = useRef(null);
  const lastAboutPositionRef = useRef(null); // store last stable about position
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Check if mobile
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // If no aboutRef but we have footerRef, just handle footer
      if (!aboutRef?.current && footerRef?.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const footerContainer = document.getElementById('footer-model-container');
        
        // Check if footer is in view
        if (footerRect.top < windowHeight && footerRect.bottom > 0) {
          let footerX, footerY;
          
          if (footerContainer) {
            const footerContainerRect = footerContainer.getBoundingClientRect();
            footerX = footerContainerRect.left + footerContainerRect.width / 2;
            footerY = footerContainerRect.top + footerContainerRect.height / 2;
          } else {
            footerX = windowWidth * 0.85;
            footerY = footerRect.top + footerRect.height / 3;
          }
          
          const footerVisibility = Math.min(1, (windowHeight - footerRect.top) / (windowHeight * 0.3));
          const footerOpacity = clamp(footerVisibility, 0, 1);
          
          setScrollProgress(0.5);
          setIsVisible(true);
          setPosition({
            x: footerX,
            y: footerY,
            opacity: footerOpacity,
          });
          return;
        } else {
          setIsVisible(false);
          return;
        }
      }

      // Handle case where only aboutRef is available (e.g., about-us page)
      if (!aboutRef?.current) return;
      
      // If heroRef or gapRef are null, handle about-only scenario (sub-service pages)
      if (!heroRef?.current || !gapRef?.current) {
        const aboutRect = aboutRef.current.getBoundingClientRect();
        const aboutContainer = aboutRef.current.querySelector('#about-model-container') || 
                               aboutRef.current.querySelector('#custom-web-model-container') ||
                               aboutRef.current.querySelector('#digital-marketing-model-container') ||
                               aboutRef.current.querySelector('#graphics-designing-model-container') ||
                               aboutRef.current.querySelector('#mobile-app-model-container') ||
                               aboutRef.current.querySelector('#video-editing-model-container') ||
                               aboutRef.current.querySelector('#seo-services-model-container') ||
                               aboutRef.current.querySelector('#social-media-model-container');
        
        // Check if it's a sub-service page (not the main about page)
        const isSubServicePage = aboutContainer && !aboutRef.current.querySelector('#about-model-container');

        // Check if footer is in view - prioritize footer over about section
        if (footerRef?.current) {
          const footerRect = footerRef.current.getBoundingClientRect();
          const footerContainer = document.getElementById('footer-model-container');
          
          // If footer top is in view, show robot in footer
          if (footerRect.top < windowHeight * 0.7) {
            let footerX, footerY;
            
            if (footerContainer) {
              const footerContainerRect = footerContainer.getBoundingClientRect();
              footerX = footerContainerRect.left + footerContainerRect.width / 2;
              footerY = footerContainerRect.top + footerContainerRect.height / 2;
            } else {
              footerX = windowWidth * 0.85;
              footerY = footerRect.top + footerRect.height / 3;
            }
            
            const footerVisibility = Math.min(1, (windowHeight * 0.7 - footerRect.top) / (windowHeight * 0.3));
            const footerOpacity = clamp(footerVisibility, 0, 1);
            
            setScrollProgress(0); // Looking left in footer
            setIsVisible(true);
            setPosition({
              x: footerX,
              y: footerY,
              opacity: footerOpacity,
            });
            return;
          }
        }

        // About section is in view - show robot there
        let aboutX, aboutY;
        if (aboutContainer) {
          const aboutContainerRect = aboutContainer.getBoundingClientRect();
          aboutX = aboutContainerRect.left + aboutContainerRect.width / 2;
          // Push model upwards on sub-service pages
          aboutY = isSubServicePage 
            ? aboutContainerRect.top + aboutContainerRect.height / 2 - 60
            : aboutContainerRect.top + aboutContainerRect.height / 2;
        } else {
          aboutX = windowWidth > 1024
            ? aboutRect.left + aboutRect.width * 0.25
            : aboutRect.left + aboutRect.width * 0.5;
          aboutY = aboutRect.top + aboutRect.height / 2;
        }
        
        // For sub-service pages: look left (0), for about page: look right (0.5)
        setScrollProgress(isSubServicePage ? 0 : 0.5);
        setIsVisible(true);
        setPosition({
          x: aboutX,
          y: aboutY,
          opacity: 1,
        });
        return;
      }

      const heroRect = heroRef.current.getBoundingClientRect();
      const aboutRect = aboutRef.current.getBoundingClientRect();
      const gapRect = gapRef.current.getBoundingClientRect();

      const scrollY = window.scrollY || window.pageYOffset;
      const heroPageTop = heroRef.current.offsetTop;
      const aboutPageTop = aboutRef.current.offsetTop;
      const gapPageTop = gapRef.current.offsetTop;
      const servicesPageTop = servicesRef?.current?.offsetTop || Infinity;

      // Try to get dedicated model containers in each section
      const heroContainer = heroRef.current.querySelector('#hero-model-container');
      const aboutContainer = aboutRef.current.querySelector('#about-model-container') || 
                               aboutRef.current.querySelector('#custom-web-model-container') ||
                               aboutRef.current.querySelector('#digital-marketing-model-container') ||
                               aboutRef.current.querySelector('#graphics-designing-model-container') ||
                               aboutRef.current.querySelector('#mobile-app-model-container') ||
                               aboutRef.current.querySelector('#video-editing-model-container') ||
                               aboutRef.current.querySelector('#seo-services-model-container') ||
                               aboutRef.current.querySelector('#social-media-model-container');

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

      // Y position for hero - on mobile push model down with offset
      const heroY = windowWidth < 1024 
        ? heroRect.top + heroRect.height * 0.38  // Push down on mobile (38% from top)
        : heroRect.top + heroRect.height * 0.3;  // Original desktop position (30% from top)

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

      // ---------- GAP SECTION: SIMPLE CURVED PATH (LEFT EXIT) ----------
      if (isInGapSection) {
        const rawGapStart = gapPageTop - windowHeight;
        const gapStart = Math.max(rawGapStart, 0);

        // 0 → 1 based on scroll
        let flyOutProgress = (scrollY - gapStart) / flyOutDistance;
        flyOutProgress = clamp(flyOutProgress, 0, 1);

        // Smooth easing for beautiful curve
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

        // ---------- SIMPLE CURVED PATH: Down and Left ----------
        // Target: Left side se exit (negative X)
        const targetX = -800; // Left side se bahar
        const newX = startX + (targetX - startX) * t;

        // Beautiful curved path: Down with smooth curve
        // Simple quadratic curve: starts going down, smooth arc
        const verticalDistance = 200; // Kitna neeche jana hai
        const curveIntensity = 80;    // Curve ki intensity
        
        // Smooth curved down movement
        // t=0: no movement, t=0.5: max curve, t=1: final position
        const curveFactor = 4 * t * (1 - t); // Smooth curve (0 to 1 and back to 0)
        const verticalOffset = verticalDistance * t + curveFactor * curveIntensity;
        
        const newY = startY + verticalOffset;

        // Rotation: Continuous rotation with scroll
        // About section: 0.5 (right side), Hero section: 0.0 (left side)
        // Gap section mein quickly left side dekhne lage, phir continuous rotate
        const fastRotationT = Math.pow(flyOutProgress, 0.6); // Fast start, quick transition
        const baseRotation = 0.5 - (fastRotationT * 0.5); // 0.5 → 0.0 (fast transition to left)
        
        // Continuous rotation: scroll ke saath saath aur zyada rotate
        // flyOutProgress increase hote hi rotation bhi increase hota rahe
        const continuousRotation = flyOutProgress * 1.5; // Additional continuous rotation
        const rotationProgress = baseRotation - continuousRotation; // Continuous rotation with scroll
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

      // ---------- FOOTER SECTION: Robot reappears ----------
      if (footerRef?.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const footerContainer = document.getElementById('footer-model-container');
        
        // Check if footer is in view (top of footer is visible)
        if (footerRect.top < windowHeight && footerRect.bottom > 0) {
          let footerX, footerY;
          
          if (footerContainer) {
            const footerContainerRect = footerContainer.getBoundingClientRect();
            footerX = footerContainerRect.left + footerContainerRect.width / 2;
            footerY = footerContainerRect.top + footerContainerRect.height / 2;
          } else {
            // Fallback: position on the right side of footer
            footerX = windowWidth * 0.85;
            footerY = footerRect.top + footerRect.height / 3;
          }
          
          // Calculate fade-in based on how much footer is in view
          const footerVisibility = Math.min(1, (windowHeight - footerRect.top) / (windowHeight * 0.3));
          const footerOpacity = clamp(footerVisibility, 0, 1);
          
          setScrollProgress(0); // Looking left in footer
          setIsVisible(true);
          setPosition({
            x: footerX,
            y: footerY,
            opacity: footerOpacity,
          });
          return;
        }
      }

      // ---------- AFTER FLYOUT / BEFORE FOOTER ----------
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
  }, [heroRef, aboutRef, gapRef, servicesRef, footerRef]);

  const modelSize = isMobile ? '280px' : '500px';

  // Hide model on mobile only if NOT on landing page (landing page has heroRef)
  // Landing page = show model on mobile, Other pages = hide model on mobile
  // On sub-services pages, heroRef is passed as null
  const isLandingPage = heroRef !== null;
  if (isMounted && isMobile && !isLandingPage) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-none z-[60] will-change-transform robot-model-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? position.opacity : 0,
        pointerEvents: 'none',
        width: modelSize,
        height: modelSize,
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
