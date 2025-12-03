'use client';

import React from 'react';
import { headingFont } from '../Font/headingFont';
import RobotModel from './RobotModel';
import dynamic from 'next/dynamic';

// Dynamically import RobotModel to avoid SSR issues with Three.js
const DynamicRobotModel = dynamic(() => import('./RobotModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="animate-pulse text-white/50">Loading 3D Model...</div>
    </div>
  ),
});

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#0f0f0f] flex items-center justify-center overflow-hidden">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] opacity-50"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center space-y-8">
            <h1
              className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white tracking-tight`}
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
              }}
            >
              TURNING <span className='text-cyan-400'>LOGIC</span> INTO <span className='text-cyan-400'>INNOVATIVE</span> SOLUTIONS
            </h1>
          </div>

          {/* 3D Model Container */}
          <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full blur-3xl"></div>
            <DynamicRobotModel />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>
    </section>
  );
};

export default Hero;