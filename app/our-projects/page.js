'use client';

import React, { useRef } from 'react';
import Navbar from '../Components/UI/Navbar';
import ScrollableRobot from '../Components/UI/ScrollableRobot';
import Slider from '../Components/UI/Slider';
import Portfolio from '../Components/UI/Portfolio';
import Pricing from '../Components/UI/Pricing';
import FAQ from '../Components/UI/FAQ';
import Footer from '../Components/UI/Footer';
import { headingFont } from '../Components/Font/headingFont';

const Page = () => {
  const projectsRef = useRef(null);
  const footerRef = useRef(null);

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
          OUR <span className="text-cyan-400">PROJECTS</span>
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
          <a
            href="https://www.trustpilot.com/review/logisoltech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="trustpilot-widget flex items-center h-8 sm:h-10 lg:h-14 [&>img]:h-full [&>img]:w-auto [&>img]:object-contain [&>img]:opacity-80 hover:[&>img]:opacity-100 [&>img]:transition-opacity"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="6852853d257a8efcadfee24a"
            data-style-height="52px"
            data-style-width="100%"
            data-token="0090270f-1ff8-4940-a765-405330145a39"
          >
            <img src="/trust.png" alt="Trustpilot" className="h-full w-auto object-contain" />
          </a>
        </div>
      </div>

      {/* Slider Section */}
      <Slider />

      {/* Portfolio Component */}
      <section ref={projectsRef} className="relative">
        <Portfolio />
      </section>

      {/* Pricing Component */}
      <section className="relative">
        <Pricing />
      </section>

      {/* FAQ Component */}
      <section className="relative">
        <FAQ />
      </section>

      {/* Footer Component */}
      <section ref={footerRef} className="relative">
        <Footer />
      </section>
    </main>
  );
};

export default Page;
