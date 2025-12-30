'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Navbar from '../Components/UI/Navbar';
import ScrollableRobot from '../Components/UI/ScrollableRobot';
import Slider from '../Components/UI/Slider';
import { headingFont } from '../Components/Font/headingFont';
import FAQ from '../Components/UI/FAQ';
import Footer from '../Components/UI/Footer';
import { useCountry } from '../context/CountryContext';

const Page = () => {
  const pricingRef = useRef(null);
  const footerRef = useRef(null);
  const { convertPrice, getCurrency } = useCountry();
  const currency = getCurrency();

  // Format price with currency symbol
  const formatPrice = (usdPrice) => {
    const converted = convertPrice(usdPrice);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <main className="text-white relative">
      <Navbar />

      <ScrollableRobot heroRef={null} aboutRef={null} gapRef={null} servicesRef={null} footerRef={footerRef} />

      {/* Heading Section */}
      <div className="flex flex-col items-center justify-center h-[30rem]">
        <h1
          className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white w-full`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          OUR <span className="text-cyan-400">PRICING</span>
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

      {/* Slider Section */}
      <Slider />

      {/* Website Development Pricing Section */}
      <section className="relative w-full py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Heading */}
          <h2
            className={`${headingFont.className} font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white mb-12 lg:mb-16`}
          >
            Website Development <span className="text-cyan-400">Pricing</span>
          </h2>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Starter Site */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden">
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg border-2 border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-cyan-400 rounded"></div>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">Starter Site</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6">
                  Perfect for small businesses looking to establish an online presence.
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(499)}</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Up to 5 Informational Pages</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Mobile Responsive Design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Contact Form & Google Map</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Basic SEO Optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">1 Revision Round</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Delivery: 1-2 Weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Business Pro (POPULAR) */}
            <div className="backdrop-blur-2xl bg-white/5 border border-cyan-400/50 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400 transition-all duration-500 ease-out relative overflow-hidden">
              {/* POPULAR Tag */}
              <div className="absolute top-4 right-4 bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>

              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg border-2 border-cyan-400 bg-cyan-400/30 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-cyan-400 rounded"></div>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">Business Pro</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6">
                  Ideal for small to mid-sized e-commerce businesses.
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(999)}</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Up to 12 Pages + Product Catalog</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Shopping Cart & Payment Integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Mobile Optimization</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Newsletter Signup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Basic Inventory Integration</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Delivery: 3-4 Weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Custom Development */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden">
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg border-2 border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-cyan-400 rounded"></div>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">Custom Development</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6">
                  For mid-to-large businesses needing fully customized web apps.
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(1999)}</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Custom CMS / Admin Panel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">React / Node.js Tech Stack</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Advanced Features & APIs</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">SEO, Analytics, Security Layers</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Delivery: 4-6 Weeks (Based on Scope)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Development Pricing Section */}
      <section className="relative w-full py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Heading */}
          <h2
            className={`${headingFont.className} font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white mb-12 lg:mb-16`}
          >
            App Development <span className="text-cyan-400">Pricing</span>
          </h2>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: MVP Package */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden">
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg border-2 border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">MVP Package</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6">
                  Single platform app for small businesses or MVPs.
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(2499)}</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Up to 5 Screens</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Android or iOS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Simple UI/UX</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Contact Form & Push Notifications</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Delivery: 3-4 Weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Cross-Platform App (POPULAR) */}
            <div className="backdrop-blur-2xl bg-white/5 border border-cyan-400/50 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400 transition-all duration-500 ease-out relative overflow-hidden">
              {/* POPULAR Tag */}
              <div className="absolute top-4 right-4 bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>

              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg border-2 border-cyan-400 bg-cyan-400/30 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">Cross-Platform App</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6">
                  Cross-platform mobile solution for growing brands.
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(5999)}</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Up to 15 Screens</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">React Native or Flutter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">User Authentication + Admin Panel</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">API Integrations</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Delivery: 5-7 Weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Enterprise App */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden">
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg border-2 border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">Enterprise App</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6">
                  Fully scalable app tailored to your business logic.
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(12000)}</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Unlimited Screens (Per Scope)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Native or Cross-Platform</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Custom Backend (Node.js, Firebase, etc.)</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Real-Time Features, Admin Roles, Payment Systems</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Delivery: Based on Requirements</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Packages Section */}
      <section className="relative w-full py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Heading */}
          <h2
            className={`${headingFont.className} font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white mb-12 lg:mb-16`}
          >
            SEO <span className="text-cyan-400">Packages</span>
          </h2>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Starter SEO */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden">
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 text-center">Starter SEO</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6 text-center">
                  For businesses starting with local or basic organic visibility.
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
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">5 Keywords</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">On-Page Optimization</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">1 Blog Post / Month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Basic Link Building</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Monthly Reports</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Basic Growth SEO (POPULAR) */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 text-center">Basic Growth SEO</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6 text-center">
                  More keywords, better content, deeper analysis.
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
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">15 Keywords</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Competitor Research</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Technical SEO Fixes</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">2 Blogs / Month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Schema Markup + Monthly Strategy Call</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Enterprise SEO */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden">
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 text-center">Enterprise SEO</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6 text-center">
                  Advanced SEO strategy for national reach & long-term growth.
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
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">30+ Keywords</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">High Authority Backlinks</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">4 SEO Blogs / Month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Conversion Optimization</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Dedicated SEO Manager + Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design & Video Editing Section */}
      <section className="relative w-full py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Heading */}
          <h2
            className={`${headingFont.className} font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white mb-12 lg:mb-16`}
          >
            Design & Video <span className="text-cyan-400">Editing</span>
          </h2>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Creative Starter */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden">
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 text-center">Creative Starter</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6 text-center">
                  Simple, clean designs and videos for startups.
                </p>

                {/* Price */}
                <div className="mb-6 text-center">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(299)}</span>
                  <span className="text-white/70 text-sm lg:text-base ml-2">/month</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">10 Graphic Posts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">2 Reels or Short Videos (30s)</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">2 Revisions Each</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Turnaround: 3-5 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Growth Creative (POPULAR) */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 text-center">Growth Creative</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6 text-center">
                  A full content design service for active social or digital campaigns.
                </p>

                {/* Price */}
                <div className="mb-6 text-center">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(599)}</span>
                  <span className="text-white/70 text-sm lg:text-base ml-2">/month</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">20 Graphics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">4 Edited Videos (up to 60s)</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Motion Graphics + Brand Templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Strategy Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Pro Visual Suite */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out relative overflow-hidden">
              {/* Glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-2 text-center">Pro Visual Suite</h3>

                {/* Description */}
                <p className="text-white/70 text-sm lg:text-base mb-6 text-center">
                  A full design & video editing partner for content-heavy operations.
                </p>

                {/* Price */}
                <div className="mb-6 text-center">
                  <span className="text-cyan-400 font-extrabold text-3xl lg:text-4xl">{formatPrice(1299)}</span>
                  <span className="text-white/70 text-sm lg:text-base ml-2">/month</span>
                </div>

                {/* Button */}
                <Link href="/contact-us" className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-all mb-6 block text-center">
                  Get Started
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Unlimited* Graphic Requests (Fair Use)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">8+ Edited Videos / Month</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Product Videos, Animations, Promo Visuals</span>
                  </div>
                  <div className="border-t border-white/10 my-3"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                    <span className="text-white/90 text-sm lg:text-base">Dedicated Manager + Weekly Delivery Cycle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQ/>
      <section ref={footerRef} className="relative">
        <Footer />
      </section>
    </main>
  );
};

export default Page;
