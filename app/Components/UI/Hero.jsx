'use client';

import React, { useRef } from 'react';
import { headingFont } from '../Font/headingFont';
import GetStartedForm from './GetStartedForm';

const Hero = () => {
  const formRef = useRef(null);

  return (
    <section
      className="relative min-h-screen lg:h-[calc(100vh-96px)] overflow-hidden pb-8 lg:pb-0"
      style={{ isolation: 'isolate' }}
    >
      {/* Main content */}
      <div className="relative z-50 w-full max-w-7xl mx-auto px-4 lg:px-8 h-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 lg:gap-10 pt-4 lg:pt-28">
          {/* LEFT - Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 flex-1 lg:w-1/2 z-[60]">
            <h1
              className={`${headingFont.className} font-extrabold text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl leading-tight text-white tracking-tight select-text`}
              style={{
                textShadow:
                  '0 0 40px rgba(255,255,255,.3), 0 0 80px rgba(255,255,255,.2)',
              }}
            >
              TURNING <span className="text-cyan-400">LOGIC</span> INTO{' '}
              <span className="text-cyan-400">INNOVATIVE</span> SOLUTIONS
            </h1>

            <p className="text-white text-base sm:text-lg md:text-xl select-text">
              Expert Services and Solutions for Web & Mobile App Development
            </p>

            <button
              onClick={() =>
                formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
              className="bg-cyan-400 mt-3 hover:bg-cyan-500 hover:text-white cursor-pointer text-black px-6 py-3 rounded-full transition-all"
            >
              Get Started
            </button>
          </div>

          {/* RIGHT MODEL - Visible on all screens */}
          <div
            id="hero-model-container"
            className="relative w-full lg:w-1/2 max-w-md mx-auto flex items-center justify-center pointer-events-none h-[280px] sm:h-[320px] lg:h-[340px]"
          >
            {/* 3D model */}
          </div>
        </div>

        {/* FORM - Part of flow on mobile, absolute on desktop */}
        <div
          ref={formRef}
          className="relative lg:absolute lg:bottom-12 lg:left-1/2 lg:-translate-x-1/2 z-[70] pointer-events-auto w-full lg:w-[80%] mt-4 lg:mt-0"
        >
          <GetStartedForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
