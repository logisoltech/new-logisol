'use client';

import React, { useRef } from 'react';
import Hero from "./Components/UI/Hero";
import Navbar from "./Components/UI/Navbar";
import About from "./Components/UI/About";
import ScrollableRobot from "./Components/UI/ScrollableRobot";

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  return (
    <main className="text-white relative">
      <Navbar />
      <ScrollableRobot heroRef={heroRef} aboutRef={aboutRef} />
      <section ref={heroRef} className="relative min-h-screen z-50">
        <Hero />
      </section>
      <section ref={aboutRef} className="relative min-h-screen">
        <About />
      </section>
    </main>
  );
}
