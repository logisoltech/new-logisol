'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../Components/UI/Navbar';
import ScrollableRobot from '../Components/UI/ScrollableRobot';
import Slider from '../Components/UI/Slider';
import { headingFont } from '../Components/Font/headingFont';
import Footer from '../Components/UI/Footer';
import FAQ from '../Components/UI/FAQ';
import { useCountry } from '../context/CountryContext';

const Page = () => {
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const { getContactInfo } = useCountry();
  const contact = getContactInfo();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    message: '',
    notRobot: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          contact: formData.mobile,
          budget: '',
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        message: '',
        notRobot: false
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <main className="text-white relative">
      <Navbar />

      <ScrollableRobot heroRef={null} aboutRef={null} gapRef={null} servicesRef={null} />

      {/* Heading Section */}
      <div className="flex flex-col items-center justify-center h-[30rem]">
        <h1
          className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white w-full`}
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
          }}
        >
          CONTACT <span className="text-cyan-400">US</span>
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

      {/* Ultra Glass Contact Bar */}
      <section className="relative w-full py-8 lg:py-12">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
          <div className="w-full rounded-2xl lg:rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-sky-900/20 backdrop-blur-2xl border border-white/10 shadow-2xl py-4 lg:py-4 px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-around gap-4 lg:gap-8">
              {/* Email Contact */}
              <div className="flex flex-row items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-cyan-400/30 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href={`mailto:${contact.email}`} className="text-white text-sm lg:text-base underline hover:text-cyan-400 transition-colors">
                  {contact.email}
                </a>
              </div>

              {/* Phone Contact */}
              <div className="flex flex-row items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-cyan-400/30 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href={contact.phoneLink} className="text-white text-sm lg:text-base underline hover:text-cyan-400 transition-colors">
                  {contact.phone}
                </a>
              </div>

              {/* Address Contact */}
              <div className="flex flex-row items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-cyan-400/30 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <a href={contact.addressLink} target="_blank" rel="noopener noreferrer" className="text-white text-sm lg:text-base underline hover:text-cyan-400 transition-colors text-center md:text-left">
                  {contact.address}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative w-full py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          {/* Heading and Description */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mb-12">
            {/* Left - Heading */}
            <div className="flex-1">
              <p className="text-cyan-400 text-sm md:text-base font-medium mb-2">
                * CONTACT US
              </p>
              <h2
                className={`${headingFont.className} font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-white`}
              >
                Get in <span className="text-cyan-400">touch</span> with us
              </h2>
            </div>

            {/* Right - Description */}
            <div className="flex-1 lg:max-w-md">
              <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                Connect with our team for tailored solutions that elevate your business, engage your audience, and drive results.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl rounded-2xl p-6 lg:p-8">
              {/* First Row - First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full h-12 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full h-12 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Second Row - Mobile and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile no."
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full h-12 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your e-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-12 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Third Row - Message Textarea */}
              <div className="mb-4">
                <textarea
                  name="message"
                  placeholder="Write message..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all resize-none"
                  required
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="checkbox"
                  name="notRobot"
                  id="notRobot"
                  checked={formData.notRobot}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-white/20 bg-white/10 backdrop-blur-sm text-cyan-400 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 cursor-pointer"
                  required
                />
                <label htmlFor="notRobot" className="text-white/90 text-sm lg:text-base cursor-pointer">
                  I&apos;m not a robot
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-lg flex items-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-sky-500 to-sky-900 hover:from-blue-700 hover:to-blue-800'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Submit Message'
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400">
                  ✕ Failed to send message. Please try again or contact us directly.
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
      <FAQ/>
      <Footer/>
    </main>
  );
};

export default Page;
