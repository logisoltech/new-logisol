'use client';

import React from 'react';
import Navbar from '../Components/UI/Navbar';
import { headingFont } from '../Components/Font/headingFont';

const page = () => {
  return (
    <main className="text-white relative min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-20 lg:pt-24">
        <h1
          className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          ABOUT <span className='text-cyan-400'>US</span>
        </h1>
      </div>
    </main>
  );
};

export default page;