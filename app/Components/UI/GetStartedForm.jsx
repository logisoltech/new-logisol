'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Calendar from './Calendar';

const GetStartedForm = ({ onClose, buttonRef }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scheduleDate: null
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
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

  // Close form when clicking outside (but not when clicking the button)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking the button (button handles its own toggle)
      if (buttonRef?.current && buttonRef.current.contains(event.target)) {
        return;
      }
      
      // Don't close if clicking inside the calendar
      if (calendarContainerRef.current && calendarContainerRef.current.contains(event.target)) {
        return;
      }
      
      // Close if clicking outside both the form and the button
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, buttonRef]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
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
    <div
      ref={formRef}
      className="w-full max-w-7xl mx-auto"
      style={{ pointerEvents: 'auto', overflow: 'visible' }}
    >
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl rounded-full px-6 py-4 flex items-center gap-4 w-full relative"
        style={{ overflow: 'visible' }}
      >
        {/* Name Field */}
        <div className="flex-1">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
            required
          />
        </div>

        {/* Email Field */}
        <div className="flex-1">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
            required
          />
        </div>

        {/* Schedule A Call - Calendar Field */}
        <div className="flex-1 relative" style={{ zIndex: 1000 }}>
          <input
            ref={calendarInputRef}
            type="text"
            placeholder="Schedule A Call"
            value={formData.scheduleDate ? formatDate(formData.scheduleDate) : ''}
            readOnly
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all cursor-pointer"
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
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-full transition-all whitespace-nowrap"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GetStartedForm;

