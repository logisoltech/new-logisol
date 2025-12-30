'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Navbar from '../Components/UI/Navbar';
import ScrollableRobot from '../Components/UI/ScrollableRobot';
import Slider from '../Components/UI/Slider';
import FAQ from '../Components/UI/FAQ';
import Footer from '../Components/UI/Footer';
import { headingFont } from '../Components/Font/headingFont';

const Page = () => {
  const pageRef = useRef(null);

  const blogPosts = [
    {
      id: 1,
      title: 'App Icon Design Best Practices',
      image: '/app-icon-design.png',
      slug: '/app-icon-design-blog',
    },
    {
      id: 2,
      title: 'How to Publish an App on Play Store',
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&h=600&fit=crop',
      slug: '/publish-app-on-play-store',
    },
    {
      id: 3,
      title: 'Best Instagram Management Tools',
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop',
      slug: '/best-instagram-management-tools',
    },
  ];

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
          OUR <span className="text-cyan-400">BLOGS</span>
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

      {/* Blog Cards Section */}
      <section ref={pageRef} className="relative w-full py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((blog) => (
              <Link
                key={blog.id}
                href={blog.slug || '#'}
                className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out cursor-pointer group relative"
              >
                {/* Image */}
                <div className="w-full h-48 lg:h-56 overflow-hidden bg-gradient-to-br from-cyan-400/20 to-purple-500/20">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="text-white font-bold text-xl lg:text-2xl mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {blog.title}
                  </h3>
                </div>

                {/* Hover Effect Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/10 group-hover:to-cyan-400/5 transition-all duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
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
