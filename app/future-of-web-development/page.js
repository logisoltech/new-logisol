'use client';

import React from 'react';
import Navbar from '../Components/UI/Navbar';
import { headingFont } from '../Components/Font/headingFont';
import FAQ from '../Components/UI/FAQ';
import Footer from '../Components/UI/Footer';

const Page = () => {
  return (
    <main className="text-white relative">
      <Navbar />

      {/* Heading Section */}
      <div className="flex flex-col items-center justify-center h-[30rem]">
        <h1
          className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white w-full`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          APP ICON <span className="text-cyan-400">DESIGN BEST PRACTICES</span>
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

      {/* FAQ Component */}
      <section className="relative">
        <FAQ />
      </section>

      {/* Footer Component */}
      <Footer />
    </main>
  );
};

export default Page;
