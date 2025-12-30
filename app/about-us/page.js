'use client';

import React, { useRef } from 'react';
import Navbar from '../Components/UI/Navbar';
import ScrollableRobot from '../Components/UI/ScrollableRobot';
import CaseStudy from '../Components/UI/CaseStudy';
import Slider from '../Components/UI/Slider';
import { headingFont } from '../Components/Font/headingFont';
import FAQ from '../Components/UI/FAQ';
import Footer from '../Components/UI/Footer';

const Page = () => {
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
          ABOUT <span className="text-cyan-400">US</span>
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

      {/* About Content Section */}
      <section className="relative">
        {/* <AboutUsContent /> */}
        
        {/* Static About Section */}
        <div className="relative w-full min-h-screen py-16 lg:py-24">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left Column - Image */}
              <div className="w-full lg:w-1/2">
                <img
                  src="/man-working-night.jpg"
                  alt="Team working together"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              {/* Right Column - Text Content */}
              <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                {/* Sub-heading */}
                <p className="text-cyan-400 text-sm md:text-base font-medium">
                  * ABOUT US
                </p>

                {/* Main Heading */}
                <h2
                  className={`${headingFont.className} font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-white`}
                >
                  Empowering Business{' '}
                  <span className="text-cyan-400">
                    Through Code, Creativity & Strategy.
                  </span>
                </h2>

                {/* Description Paragraph Box */}
                <div className="bg-cyan-400/20 backdrop-blur-sm rounded-2xl p-5 lg:p-6 border border-cyan-400/30">
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    At Logisol Tech, we don&apos;t just build websites or write code, we build scalable digital solutions that help businesses compete, grow, and lead in the modern world. We are a results-driven software house offering a wide range of services that include Web Development, App Development, SEO, Social Media Marketing, Graphic Design, and Video Editing, each tailored to suit your industry and business goals.
                  </p>
                </div>

                {/* Call-to-Action Buttons */}
                <div className="flex gap-4 mt-2">
                  <button className="bg-gradient-to-r from-sky-500 to-sky-900 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg">
                    Contact Us
                  </button>
                  <button className="bg-gradient-to-r from-sky-500 to-sky-900 hover:from-blue-700 hover:to-blue-800 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg">
                    <span className="text-xl -mt-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="relative py-16 lg:py-24">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Left Column - Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-6">
              {/* Small Heading */}
              <p className="text-sm md:text-base font-bold">
                <span className="text-cyan-400">*</span>{' '}
                <span className="text-white">OUR APPROACH</span>
              </p>

              {/* Main Heading */}
              <h2
                className={`${headingFont.className} font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-white`}
              >
                Strategic <span className="text-cyan-400">approach</span> to innovative solutions
              </h2>

              {/* Description Paragraph */}
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                Founded by a team of tech-savvy innovators and digital strategists, Logisol Tech was born out of a simple idea: to bridge the gap between business vision and technology. With our roots in innovation and a stronghold in execution, we deliver real-world solutions powered by strategy, design, and code.
              </p>
            </div>

            {/* Right Column - Image Gallery */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              {/* Top Row - Two Images */}
              <div className="flex gap-4">
                <img
                  src="/pic1.jpg"
                  alt="Team collaboration"
                  className="w-1/2 h-auto rounded-xl shadow-lg object-cover"
                />
                <img
                  src="/pic2.jpg"
                  alt="Team member with diagram"
                  className="w-1/2 h-auto rounded-xl shadow-lg object-cover"
                />
              </div>

              {/* Bottom Row - Single Image */}
              <img
                src="/pic3.jpg"
                alt="Team working together"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <CaseStudy/>
      <FAQ/>
      <section ref={footerRef} className="relative">
        <Footer />
      </section>
    </main>
  );
};

export default Page;
