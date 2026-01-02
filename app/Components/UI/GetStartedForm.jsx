'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';
import Calendar from './Calendar';

const GetStartedForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    scheduleDate: null
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const calendarInputRef = useRef(null);
  const calendarContainerRef = useRef(null);

  // Ensure client-side rendering for portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate and update calendar position
  useEffect(() => {
    if (!showCalendar || !calendarInputRef.current || !calendarContainerRef.current) return;

    const updatePosition = () => {
      if (calendarInputRef.current && calendarContainerRef.current) {
        const inputRect = calendarInputRef.current.getBoundingClientRect();
        const calendar = calendarContainerRef.current;
        calendar.style.position = 'fixed';
        calendar.style.top = `${inputRect.bottom + 8}px`;
        calendar.style.left = `${inputRect.left}px`;
      }
    };

    // Initial position
    updatePosition();

    // Update on scroll and resize
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [showCalendar]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        scheduleDate: date
      }));
      setShowCalendar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS configuration missing:', {
          serviceId: !!serviceId,
          templateId: !!templateId,
          publicKey: !!publicKey
        });
        throw new Error('EmailJS configuration is incomplete. Please check your environment variables.');
      }

      const templateParams = {
        name: formData.name.trim(),
        phone: formData.phone,
        date: formData.scheduleDate ? formatDate(formData.scheduleDate) : 'Not specified',
        email: formData.email,
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('EmailJS Success:', response);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        scheduleDate: null
      });
    } catch (error) {
      console.error('EmailJS Error Details:', {
        error,
        message: error?.message || 'Unknown error',
        text: error?.text || 'No error text',
        status: error?.status || 'No status',
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing'
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="w-full px-4 md:px-0" style={{ pointerEvents: 'auto' }}>
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl rounded-2xl md:rounded-full px-4 md:px-6 py-6 md:py-4 flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full"
      >
        {/* Name Field */}
        <div className="flex-1 w-full md:w-auto">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full h-12 rounded-lg md:rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
            required
          />
        </div>

        {/* Email Field */}
        <div className="flex-1 w-full md:w-auto">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-12 rounded-lg md:rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
            required
          />
        </div>

        {/* Phone Field */}
        <div className="flex-1 w-full md:w-auto">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full h-12 rounded-lg md:rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
            required
          />
        </div>

        {/* Schedule A Call - Calendar Field */}
        <div className="flex-1 w-full md:w-auto relative" style={{ zIndex: 1000 }}>
          <input
            ref={calendarInputRef}
            type="text"
            placeholder="Schedule A Call"
            value={formData.scheduleDate ? formatDate(formData.scheduleDate) : ''}
            readOnly
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full h-12 rounded-lg md:rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all cursor-pointer"
          />
          {showCalendar && isMounted && createPortal(
            <div ref={calendarContainerRef} style={{ zIndex: 10002, pointerEvents: 'auto' }}>
              <Calendar
                onClose={() => setShowCalendar(false)}
                onDateSelect={handleDateSelect}
                buttonRef={calendarInputRef}
              />
            </div>,
            document.body
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`font-semibold px-8 py-3 rounded-lg md:rounded-full transition-all whitespace-nowrap w-full md:w-auto flex items-center justify-center gap-2 ${
            isSubmitting
              ? 'bg-gray-500 cursor-not-allowed text-white'
              : submitStatus === 'success'
              ? 'bg-green-500 text-white'
              : submitStatus === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-cyan-400 hover:bg-cyan-500 text-black'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : submitStatus === 'success' ? (
            '✓ Sent!'
          ) : submitStatus === 'error' ? (
            '✕ Failed'
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export default GetStartedForm;

