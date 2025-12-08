'use client';

import React, { useRef } from 'react';
import { headingFont } from '../Font/headingFont';
import { useState } from 'react';
import GetStartedForm from './GetStartedForm';

const Hero = () => {

  const [showForm, setShowForm] = useState(false);
  const buttonRef = useRef(null);

  const handleGetStarted = (e) => {
    e.stopPropagation();
    setShowForm(!showForm);
  }

  const handleCloseForm = () => {
    setShowForm(false);
  }

  return (
    <div className="relative min-h-screen flex items-start justify-center overflow-hidden pt-20 lg:pt-24" style={{ isolation: 'isolate' }}>
      {/* Content Container */}
      <div className="relative z-50 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-4" style={{ isolation: 'isolate' }}>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 relative z-50">
          {/* Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 flex-1 lg:w-1/2 relative z-50" style={{ isolation: 'isolate' }}>
            <h1
              className={`${headingFont.className} font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight text-white tracking-tight select-text`}
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
              }}
            >
              TURNING <span className='text-cyan-400'>LOGIC</span> INTO <span className='text-cyan-400'>INNOVATIVE</span> SOLUTIONS
            </h1>
            <p className='text-white text-xl select-text'>Expert Services and Solutions for
            Web & Mobile App Development</p>
            <div className="relative w-full" style={{ overflow: 'visible' }}>
              <button 
                ref={buttonRef}
                onClick={handleGetStarted} 
                className='bg-cyan-400 mt-2 hover:bg-cyan-800 hover:text-white cursor-pointer relative z-[60] text-black px-4 py-2 rounded-full pointer-events-auto'
              >
                Get Started
              </button>
              {showForm && (
                <div className="absolute top-full left-0 w-full mt-4 z-[100]" style={{ overflow: 'visible' }}>
                  <GetStartedForm onClose={handleCloseForm} buttonRef={buttonRef} />
                </div>
              )}
            </div>
          </div>

          {/* 3D Model Container - Placeholder for positioning */}
          <div 
            id="hero-model-container"
            className="relative w-full lg:w-1/2 aspect-square max-w-md mx-auto flex items-center justify-center overflow-visible pointer-events-none"
          >
            {/* Model will be positioned here by ScrollableRobot */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;