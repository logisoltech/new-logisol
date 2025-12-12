'use client';

import React, { useEffect, useRef, useState } from 'react';
import { headingFont } from '../Font/headingFont';

const FAQ = () => {
  const faqSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else if (entry.boundingClientRect.top > 0) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-100px 0px',
      }
    );

    if (faqSectionRef.current) {
      observer.observe(faqSectionRef.current);
    }

    return () => {
      if (faqSectionRef.current) {
        observer.unobserve(faqSectionRef.current);
      }
    };
  }, []);

  const faqs = [
    {
      id: 1,
      question: 'What services does your agency offer?',
      answer: 'We offer a comprehensive range of digital services including web development, mobile app development, digital marketing, graphic design, and video editing. Our team specializes in creating custom solutions tailored to your business needs, from responsive websites to cross-platform mobile applications and strategic marketing campaigns.',
    },
    {
      id: 2,
      question: 'How long does it take to complete a project?',
      answer: 'Project timelines vary depending on the scope and complexity. A simple website typically takes 1-2 weeks, while a custom web application or mobile app can take 3-6 weeks or more. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.',
    },
    {
      id: 3,
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer ongoing support and maintenance packages to ensure your digital assets continue to perform optimally. Our support services include regular updates, security patches, performance monitoring, and technical assistance. We can customize a maintenance plan that fits your needs and budget.',
    },
    {
      id: 4,
      question: 'Can you work with our existing design or brand guidelines?',
      answer: 'Absolutely! We can work with your existing brand guidelines, design systems, and style guides to ensure consistency across all digital touchpoints. Our team is experienced in adapting to established brand identities while bringing fresh perspectives and modern design practices to your projects.',
    },
    {
      id: 5,
      question: 'What is your pricing structure?',
      answer: 'Our pricing is project-based and tailored to your specific requirements. We offer transparent pricing with detailed proposals that break down costs for each phase of development. For smaller projects, we have starter packages available. Contact us for a free consultation and custom quote based on your needs.',
    },
    {
      id: 6,
      question: 'Do you handle hosting and domain setup?',
      answer: 'Yes, we can assist with hosting setup, domain registration, and server configuration. We work with reliable hosting providers and can recommend the best solution based on your project requirements. We also offer managed hosting services where we handle all technical aspects for you.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div 
      ref={faqSectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-32"
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div 
          className={`mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[-50px] opacity-0'
          }`}
        >
          <h2
            className={`${headingFont.className} font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white tracking-tight`}
            style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)',
            }}
          >
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div 
          className={`space-y-0 transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[50px] opacity-0'
          }`}
          style={{
            transitionDelay: '200ms',
          }}
        >
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="backdrop-blur-2xl bg-white/5 border-b border-white/20 last:border-b-0"
            >
              {/* Question Row */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 px-4 lg:px-6 text-left hover:bg-white/5 transition-all duration-300 group"
              >
                <span className="text-white font-semibold text-base lg:text-lg pr-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {faq.question}
                </span>
                <span
                  className={`text-white text-2xl font-light flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : 'rotate-0'
                  }`}
                >
                  +
                </span>
              </button>

              {/* Answer (Expandable) */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 lg:px-6 pb-6 pt-6">
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
