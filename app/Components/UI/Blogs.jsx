'use client';

import React from 'react';
import { headingFont } from '../Font/headingFont';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      title: 'Mobile App Development: Best Practices for Success',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      title: 'SEO Strategies That Drive Real Business Growth',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
  ];

  return (
    <section className="relative w-full py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading Section - Top Left */}
        <div className="mb-12 lg:mb-16">
          <p className="text-cyan-400 text-sm md:text-base font-medium mb-2">
            * BLOGS
          </p>
          <h2
            className={`${headingFont.className} font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-white`}
          >
            Insights From Our <span className="text-cyan-400">Experts</span>
          </h2>
        </div>

        {/* Blog Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((blog) => (
            <div
              key={blog.id}
              className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 ease-out cursor-pointer group relative flex flex-col"
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
              <div className="p-6 lg:p-8 flex flex-col flex-1">
                <h3 className="text-white font-bold text-xl lg:text-2xl mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all duration-300 mt-auto">
                  <span className="font-semibold text-sm lg:text-base">Read more</span>
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Hover Effect Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/10 group-hover:to-cyan-400/5 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
