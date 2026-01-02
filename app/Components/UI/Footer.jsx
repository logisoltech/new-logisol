'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { headingFont } from '../Font/headingFont';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          first_name: 'Newsletter',
          last_name: 'Subscriber',
          email: email,
          contact: 'N/A',
          budget: '',
          message: `New newsletter subscription request from: ${email}`,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
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
        {/* Top Section - Newsletter + Links + Robot */}
        <div className="relative flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          {/* Robot Model Container - robot is rendered by ScrollableRobot */}
          <div 
            id="footer-model-container"
            className="hidden lg:block absolute right-0 xl:-right-8 top-1/3 -translate-y-1/2 w-64 h-80 xl:w-80 xl:h-96 pointer-events-none z-20"
          >
            {/* Robot rendered by ScrollableRobot when footer is in view */}
          </div>

          {/* Column 1: Newsletter */}
          <div className="lg:w-[280px] xl:w-[320px] flex-shrink-0">
            <h3
              className={`${headingFont.className} font-extrabold text-2xl lg:text-3xl text-cyan-400 mb-3`}
            >
              Let's achieve excellence
            </h3>
            <p className="text-white font-semibold text-base lg:text-lg mb-4">
              Subscribe to our newsletter
            </p>
            
            {/* Email Input */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 pr-14 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300 disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md font-semibold transition-all flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : submitStatus === 'success'
                      ? 'bg-green-500'
                      : submitStatus === 'error'
                      ? 'bg-red-500'
                      : 'bg-cyan-400 hover:bg-cyan-500'
                  } text-black`}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : submitStatus === 'success' ? (
                    <span className="text-white">✓</span>
                  ) : submitStatus === 'error' ? (
                    <span className="text-white">✕</span>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </div>
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm mt-2">✓ Subscribed successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm mt-2">✕ Failed. Please try again.</p>
              )}
            </form>
          </div>

          {/* Links Container - 3 columns closer together */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 lg:mr-48 xl:mr-56">
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
                {supportLinks.map((service, index) => (
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
                {services.map((link, index) => (
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

        {/* Trust Badges Section */}
        <div className="mt-8 lg:mt-12 pt-8 lg:pt-12 border-t border-white/20">
          <div className="flex items-center justify-center gap-6 lg:gap-8 flex-wrap">
            <img 
              src="/clutch.png" 
              alt="Clutch" 
              className="h-10 sm:h-12 lg:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
            <img 
              src="/google_1.png" 
              alt="Google" 
              className="h-10 sm:h-12 lg:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
            <img 
              src="/trust.png" 
              alt="Trust" 
              className="h-10 sm:h-12 lg:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
