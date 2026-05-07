'use client';

import React, { useRef } from 'react';
import Hero from "./Components/UI/Hero";
import Navbar from "./Components/UI/Navbar";
import Aurora from "./Components/UI/Aurora";
import About from "./Components/UI/About";
import Services from "./Components/UI/Services";
import ScrollableRobot from "./Components/UI/ScrollableRobot";
import CMSVideo from './Components/UI/CMSVideo';
import Portfolio from './Components/UI/Portfolio';
import CaseStudy from './Components/UI/CaseStudy';
import Pricing from './Components/UI/Pricing';
import FAQ from './Components/UI/FAQ';
import Footer from './Components/UI/Footer';
import Testimonials from './Components/UI/Testimonials';
import Blogs from './Components/UI/Blogs';

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const gapRef = useRef(null);
  const servicesRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <main className="text-white relative">
      <div className="relative isolate">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 bottom-0 -top-2 z-0 bg-black [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
        >
          <Aurora
            colorStops={["#3B82F6", "#37006a", "#0025fa"]}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
        </div>
        <Navbar />
        <ScrollableRobot heroRef={heroRef} aboutRef={aboutRef} gapRef={gapRef} servicesRef={servicesRef} footerRef={footerRef} />
        <section ref={heroRef} className="relative z-50">
          <Hero />
        </section>
      </div>
      <section ref={aboutRef} className="relative min-h-screen">
        <About />
      </section>
      <section ref={gapRef} className="relative min-h-[10rem]">
        {/* Gap section for robot fly-out animation */}
      </section>
      <section ref={servicesRef} className="relative min-h-screen">
        <Services />
      </section>
      <section className="relative">
        <CMSVideo />
      </section>
      <section className="relative">
        <Portfolio />
      </section>
      <section className="relative">
        <CaseStudy />
      </section>
      <section className="relative">
        <Pricing />
      </section>
      <section className="relative">
        <Testimonials />
      </section>
        <section className="relative">
          <Blogs />
        </section>
        <section className="relative">
          <FAQ />
        </section>
      <section ref={footerRef} className="relative">
        <Footer />
      </section>
    </main>
  );
}
