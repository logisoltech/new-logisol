'use client';

import React, { useState } from 'react';
import { headingFont } from '../Font/headingFont';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const quickLinks = [
    'Home',
    'About us',
    'Services',
    'Blog',
  ];

  const services = [
    'Website Development',
    'Mobile App Development',
    'Social Media Marketing',
    'Digital Marketing',
    'SEO',
    'Graphic Design',
    'Video Editing',
  ];

  const supportLinks = [
    'Help',
    'Privacy Policy',
    "Term's & Condition",
    'Contact Us',
  ];

  return (
    <footer className="relative w-full backdrop-blur-2xl bg-white/5 border-t border-white/20">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section - Four Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Newsletter */}
          <div className="lg:col-span-1">
            <h3
              className={`${headingFont.className} font-extrabold text-2xl lg:text-3xl text-cyan-400 mb-3`}
            >
              Let's achieve excellence
            </h3>
            <p className="text-white font-semibold text-base lg:text-lg mb-4">
              Subscribe to our newsletter
            </p>
            
            {/* Email Input */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300"
              />
            </form>
          </div>

          {/* Column 2: Quick Link */}
          <div>
            <h4 className="text-cyan-400 font-bold text-lg lg:text-xl mb-4">Quick Link</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-sm lg:text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-cyan-400 font-bold text-lg lg:text-xl mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-sm lg:text-base"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="text-cyan-400 font-bold text-lg lg:text-xl mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-sm lg:text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
