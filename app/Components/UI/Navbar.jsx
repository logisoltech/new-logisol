"use client";
import React, { useState, useRef } from "react";
import { font } from "../Font/font";
import navLinks from "../Data/navLinks.json";
import CountrySelector from "./CountrySelector";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const closeTimeoutRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav
      className={`${font.className} p-6 sticky top-0 z-50 bg-[#0f0f0f] text-white shadow-sm`}
    >
      <div className="w-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="https://logisol.tech" className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Logisol Logo"
            className="w-auto h-12"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              {link.dropdown ? (
                <div className="relative">
                  <button
                    className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors duration-200 py-2"
                    onMouseEnter={() => toggleDropdown(index)}
                  >
                    <a href={link.href}>{link.label}</a>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {activeDropdown === index && (
                    <div 
                      className="relative dropdown-wrapper"
                      onMouseEnter={() => {
                        // Clear any pending close
                        if (closeTimeoutRef.current) {
                          clearTimeout(closeTimeoutRef.current);
                          closeTimeoutRef.current = null;
                        }
                      }}
                      onMouseLeave={(e) => {
                        // Close if not moving to sub-dropdown, main dropdown, or bridge
                        const relatedTarget = e.relatedTarget;
                        if (!relatedTarget) {
                          setActiveDropdown(null);
                          setActiveSubDropdown(null);
                          return;
                        }
                        
                        const isMovingToSubDropdown = relatedTarget.closest('.sub-dropdown-container');
                        const isMovingToMainDropdown = relatedTarget.closest('.main-dropdown-container');
                        const isMovingToBridge = relatedTarget.closest('.dropdown-bridge');
                        const isMovingToWrapper = relatedTarget.closest('.dropdown-wrapper');
                        
                        // Only keep open if moving within the dropdown system
                        if (!isMovingToSubDropdown && !isMovingToMainDropdown && !isMovingToBridge && !isMovingToWrapper) {
                          // Use a small delay to allow movement between dropdowns
                          closeTimeoutRef.current = setTimeout(() => {
                            setActiveDropdown(null);
                            setActiveSubDropdown(null);
                          }, 100);
                        }
                      }}
                    >
                      <div
                        className={`main-dropdown-container absolute top-full mt-3 ${
                          link.label === "Services" 
                            ? "left-1/2 -translate-x-1/2 w-[600px] bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-6 px-6" 
                            : "left-0 w-56 bg-[#0f0f0f] rounded-lg shadow-lg border border-black py-2"
                        } z-10 transition-all duration-300`}
                        onMouseEnter={() => {
                          setActiveDropdown(index);
                        }}
                      >
                        {link.label === "Services" ? (
                          <div className="grid grid-cols-2 gap-4">
                            {link.dropdown.map((subLink, subIndex) => (
                              <div key={subIndex} className="relative group">
                                {subLink.dropdown ? (
                                  <button
                                    className={`w-full flex flex-col items-start p-4 rounded-xl text-white hover:bg-white/5 transition-all duration-300 border ${
                                      activeSubDropdown === subIndex
                                        ? "bg-white/5 border-white/10"
                                        : "border-transparent hover:border-white/10"
                                    }`}
                                    onMouseEnter={() =>
                                      setActiveSubDropdown(subIndex)
                                    }
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <a 
                                        href={subLink.href}
                                        className="font-semibold text-base hover:text-gray-200 transition-colors"
                                      >
                                        {subLink.label}
                                      </a>
                                      <svg
                                        className={`w-4 h-4 ml-2 text-gray-400 transition-transform duration-200 ${
                                          activeSubDropdown === subIndex ? "rotate-90" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                ) : (
                                  <a
                                    href={subLink.href}
                                    className="block p-4 rounded-xl text-white hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
                                  >
                                    <span className="font-semibold text-base hover:text-gray-200 transition-colors">
                                      {subLink.label}
                                    </span>
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            {link.dropdown.map((subLink, subIndex) => (
                              <div key={subIndex} className="relative group">
                                {subLink.dropdown ? (
                                  <>
                                    <button
                                      className={`flex items-center justify-between w-full px-4 py-2 text-white hover:bg-gray-900 hover:text-gray-200 mt-12 transition-colors duration-200 ${
                                        activeSubDropdown === subIndex
                                          ? "font-bold bg-gray-900"
                                          : ""
                                      }`}
                                      onMouseEnter={() =>
                                        setActiveSubDropdown(subIndex)
                                      }
                                      onMouseLeave={() => setActiveSubDropdown(null)}
                                    >
                                      <a href={subLink.href}>{subLink.label}</a>
                                      <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </button>
                                    {activeSubDropdown === subIndex && (
                                      <div
                                        onMouseEnter={() =>
                                          setActiveSubDropdown(subIndex)
                                        }
                                        onMouseLeave={() => setActiveSubDropdown(null)}
                                        className="absolute left-full top-0 ml-1 w-56 bg-[#0f0f0f] rounded-lg shadow-lg border border-black py-2"
                                      >
                                        {subLink.dropdown.map(
                                          (subSubLink, subSubIndex) => (
                                            <a
                                              key={subSubIndex}
                                              href={subSubLink.href}
                                              className="block px-4 py-2 text-white hover:bg-gray-900 hover:text-gray-200 transition-colors duration-200"
                                            >
                                              {subSubLink.label}
                                            </a>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </> 
                                ) : (
                                  <a
                                    href={subLink.href}
                                    className="block px-4 py-2 text-white hover:bg-gray-900 hover:text-gray-200 transition-colors duration-200"
                                  >
                                    {subLink.label}
                                  </a>
                                )}
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                      {/* Sub-dropdown for Services - appears below main dropdown */}
                      {link.label === "Services" && activeSubDropdown !== null && link.dropdown[activeSubDropdown]?.dropdown && (
                        <>
                          {/* Invisible bridge to maintain hover connection */}
                          <div 
                            className="dropdown-bridge absolute left-1/2 -translate-x-1/2 w-[600px]"
                            style={{ top: 'calc(100% + 0.75rem + 180px + 4rem)', height: '5rem', zIndex: 15 }}
                            onMouseEnter={() => {
                              setActiveSubDropdown(activeSubDropdown);
                              setActiveDropdown(index);
                            }}
                          />
                          <div
                            className="sub-dropdown-container absolute left-1/2 -translate-x-1/2 w-[600px] bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-6 px-6 z-20 transition-all duration-300"
                            style={{ top: 'calc(100% + 0.75rem + 180px + 5rem)' }}
                            onMouseEnter={() => {
                              // Clear any pending close
                              if (closeTimeoutRef.current) {
                                clearTimeout(closeTimeoutRef.current);
                                closeTimeoutRef.current = null;
                              }
                              setActiveSubDropdown(activeSubDropdown);
                              setActiveDropdown(index);
                            }}
                            onMouseLeave={(e) => {
                              // Close sub-dropdown if not moving back to main dropdown or bridge
                              const relatedTarget = e.relatedTarget;
                              if (!relatedTarget) {
                                setActiveSubDropdown(null);
                                setActiveDropdown(null);
                                return;
                              }
                              
                              const isMovingToMain = relatedTarget.closest('.main-dropdown-container');
                              const isMovingToBridge = relatedTarget.closest('.dropdown-bridge');
                              const isMovingToWrapper = relatedTarget.closest('.dropdown-wrapper');
                              
                              // Close if leaving the dropdown system entirely
                              if (!isMovingToMain && !isMovingToBridge && !isMovingToWrapper) {
                                closeTimeoutRef.current = setTimeout(() => {
                                  setActiveSubDropdown(null);
                                  setActiveDropdown(null);
                                }, 100);
                              }
                            }}
                          >
                          <div className="grid grid-cols-2 gap-4">
                            {link.dropdown[activeSubDropdown].dropdown.map(
                              (subSubLink, subSubIndex) => (
                                <a
                                  key={subSubIndex}
                                  href={subSubLink.href}
                                  className="block p-4 rounded-xl text-white hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
                                >
                                  <span className="font-semibold text-base hover:text-gray-200 transition-colors">
                                    {subSubLink.label}
                                  </span>
                                </a>
                              )
                            )}
                          </div>
                        </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors duration-200 py-2"
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
          
          {/* Country Selector */}
          
          {/* Contact Button */}
          {/* <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium">
            <a href="/contact-us">Get a Quote</a>
            </button> */}
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <input type="text" placeholder="Search" className="w-full h-10 rounded-full border border-gray-300 px-4 py-2" />
          </div>
            <CountrySelector />
        </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          {/* Country Selector for Mobile */}
          <CountrySelector />
          
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 border-t border-gray-800 pt-4">
          <div className="space-y-2">
            {navLinks.map((link, index) => (
              <div key={index}>
                {link.dropdown ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full text-left text-white hover:text-gray-300 transition-colors duration-200 py-2"
                      onClick={() => toggleDropdown(index)}
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeDropdown === index && (
                      <div className="ml-4 space-y-2 mt-2">
                        {link.dropdown.map((subLink, subIndex) => (
                          <a
                            key={subIndex}
                            href={subLink.href}
                            className="block text-gray-300 hover:text-white transition-colors duration-200 py-1"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            {subLink.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className="block text-white hover:text-gray-300 transition-colors duration-200 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-800 mt-4">
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium">
                <a href="/contact-us">Get a Quote</a>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
