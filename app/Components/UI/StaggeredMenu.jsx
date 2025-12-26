'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { gsap } from 'gsap';
import { getLenis } from './SmoothScroll';
import CountrySelector from './CountrySelector';

export const StaggeredMenu = ({
  items = [],
  position = 'right',
  searchQuery = '',
  onSearchChange = () => {},
  searchResults = [],
  onResultClick = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const menuRef = useRef(null);
  const backdropRef = useRef(null);
  const hamburgerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const isAnimatingRef = useRef(false);

  // Ensure client-side rendering for portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize menu position (off-screen)
  useEffect(() => {
    if (!menuRef.current) return;
    
    const offset = position === 'right' ? 100 : -100;
    gsap.set(menuRef.current, {
      xPercent: offset,
      visibility: 'hidden',
      display: 'none',
    });
  }, [position]);

  // Animate hamburger to X
  const animateHamburger = useCallback((open) => {
    if (!line1Ref.current || !line2Ref.current || !line3Ref.current) return;

    if (open) {
      gsap.to(line1Ref.current, { y: 0, rotate: 45, duration: 0.3, ease: 'power2.out' });
      gsap.to(line2Ref.current, { opacity: 0, duration: 0.2 });
      gsap.to(line3Ref.current, { y: 0, rotate: -45, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(line1Ref.current, { y: -6, rotate: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(line2Ref.current, { opacity: 1, duration: 0.2 });
      gsap.to(line3Ref.current, { y: 6, rotate: 0, duration: 0.3, ease: 'power2.out' });
    }
  }, []);

  // Open menu
  const openMenu = useCallback(() => {
    if (isAnimatingRef.current || !menuRef.current || !backdropRef.current) return;
    
    isAnimatingRef.current = true;
    setIsOpen(true);

    // Show menu and backdrop
    gsap.set(menuRef.current, { visibility: 'visible', display: 'flex' });
    gsap.set(backdropRef.current, { display: 'block' });

    // Animate menu in
    const offset = position === 'right' ? 100 : -100;
    gsap.to(menuRef.current, {
      xPercent: 0,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    // Fade in backdrop
    gsap.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    // Lock scroll
    const lenis = getLenis();
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';
    
    // Hide model
    document.body.classList.add('menu-open');
  }, [position]);

  // Close menu
  const closeMenu = useCallback(() => {
    if (isAnimatingRef.current || !menuRef.current || !backdropRef.current) return;
    
    isAnimatingRef.current = true;

    const offset = position === 'right' ? 100 : -100;
    
    // Animate menu out
    gsap.to(menuRef.current, {
      xPercent: offset,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        gsap.set(menuRef.current, { visibility: 'hidden', display: 'none' });
        isAnimatingRef.current = false;
      }
    });

    // Fade out backdrop
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.set(backdropRef.current, { display: 'none' });
      }
    });

    // Unlock scroll
    const lenis = getLenis();
    if (lenis) lenis.start();
    document.body.style.overflow = '';
    
    // Show model
    document.body.classList.remove('menu-open');
    
    setIsOpen(false);
  }, [position]);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    if (isAnimatingRef.current) return;
    
    if (isOpen) {
      closeMenu();
      animateHamburger(false);
    } else {
      openMenu();
      animateHamburger(true);
    }
  }, [isOpen, openMenu, closeMenu, animateHamburger]);

  // Close on backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (e.target === backdropRef.current) {
      closeMenu();
      animateHamburger(false);
    }
  }, [closeMenu, animateHamburger]);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        animateHamburger(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeMenu, animateHamburger]);

  if (!isMounted) return null;

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={hamburgerRef}
        onClick={toggleMenu}
        className="relative w-6 h-6 flex flex-col justify-center items-center bg-transparent border-0 cursor-pointer p-0 z-50"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        type="button"
      >
        <span
          ref={line1Ref}
          className="absolute w-full h-[2px] bg-white rounded-[2px]"
          style={{ transform: 'translateY(-6px)' }}
        />
        <span
          ref={line2Ref}
          className="absolute w-full h-[2px] bg-white rounded-[2px]"
        />
        <span
          ref={line3Ref}
          className="absolute w-full h-[2px] bg-white rounded-[2px]"
          style={{ transform: 'translateY(6px)' }}
        />
      </button>

      {/* Backdrop */}
      {createPortal(
        <div
          ref={backdropRef}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999]"
          onClick={handleBackdropClick}
          style={{ display: 'none', pointerEvents: 'auto' }}
        />,
        document.body
      )}

      {/* Menu Panel */}
      {createPortal(
        <aside
          ref={menuRef}
          className="fixed top-0 h-screen w-[clamp(280px,40vw,450px)] bg-[#0f0f0f]/20 backdrop-blur-3xl border-l border-white/50 rounded-tl-2xl rounded-bl-2xl flex flex-col z-[10000]"
          style={{
            [position === 'right' ? 'right' : 'left']: 0,
            visibility: 'hidden',
            display: 'none',
            pointerEvents: 'auto',
          }}
          aria-hidden={!isOpen}
        >
          {/* Close Button */}
          <button
            onClick={() => {
              closeMenu();
              animateHamburger(false);
            }}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-transparent border-0 cursor-pointer p-0 z-50 text-white hover:text-cyan-400 transition-colors"
            aria-label="Close menu"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Search Bar - Mobile */}
          <div className="p-6 pb-0">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm pl-10 pr-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
              />
            </div>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-2 max-h-48 overflow-y-auto rounded-xl bg-black/40 border border-white/10">
                {searchResults.map((result, index) => (
                  <Link
                    key={index}
                    href={result.link}
                    onClick={() => {
                      onResultClick();
                      closeMenu();
                      animateHamburger(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
                  >
                    <div className="text-white text-sm">{result.title}</div>
                  </Link>
                ))}
              </div>
            )}

            {/* Country Selector - Mobile */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-white/50 text-sm">Region:</span>
              <CountrySelector />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
            <ul className="list-none m-0 p-0 flex flex-col gap-3 w-full">
              {items && items.length > 0 ? (
                items.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.link || item.href}
                      className="text-white font-semibold text-2xl uppercase no-underline block hover:text-cyan-400 transition-colors"
                      onClick={() => {
                        closeMenu();
                        animateHamburger(false);
                      }}
                    >
                      {item.label}
                    </a>
                    {/* Services sub-items */}
                    {item.isServices && item.services && (
                      <ul className="mt-2 ml-4 space-y-2 border-l-4 border-cyan-400 pl-3">
                        {item.services.map((service, sIdx) => (
                          <li key={sIdx}>
                            <a
                              href={service.link || service.href}
                              className="text-md font-bold text-white hover:text-cyan-400 transition-colors block"
                              onClick={() => {
                                closeMenu();
                                animateHamburger(false);
                              }}
                            >
                              {service.label}
                            </a>
                            {/* Sub-sub-items */}
                            {service.subItems && service.subItems.length > 0 && (
                              <ul className="mt-1 ml-4 space-y-0.5">
                                {service.subItems.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <a
                                      href={subItem.href}
                                      className="text-sm text-white/80 hover:text-cyan-400 transition-colors block"
                                      onClick={() => {
                                        closeMenu();
                                        animateHamburger(false);
                                      }}
                                    >
                                      • {subItem.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <li>
                  <span className="text-white text-lg">No items</span>
                </li>
              )}
            </ul>
          </div>
        </aside>,
        document.body
      )}
    </>
  );
};

export default StaggeredMenu;

