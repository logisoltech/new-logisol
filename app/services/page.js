'use client';

import React, { useRef } from 'react';
import Navbar from '../Components/UI/Navbar';
import ScrollableRobot from '../Components/UI/ScrollableRobot';
import Slider from '../Components/UI/Slider';
import Services from '../Components/UI/Services';
import { headingFont } from '../Components/Font/headingFont';
import FAQ from '../Components/UI/FAQ';
import Footer from '../Components/UI/Footer';

const Page = () => {
  const servicesRef = useRef(null);

  return (
    <main className="text-white relative">
      <Navbar />

      <ScrollableRobot heroRef={null} aboutRef={null} gapRef={null} servicesRef={servicesRef} />

      {/* Heading Section */}
      <div className="flex items-center justify-center h-[30rem]">
        <h1
          className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white w-full`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          OUR <span className="text-cyan-400">SERVICES</span>
        </h1>
      </div>

      {/* Slider Section */}
      <Slider />

      {/* Services Component */}
      <section ref={servicesRef} className="relative">
        <Services />
      </section>
      <FAQ/>
      <Footer/>
    </main>
  );
};

export default Page;
