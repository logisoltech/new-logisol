"use client";

import React from "react";
import {
  FaReact,
  FaInstagram,
  FaFacebook,
  FaBootstrap,
  FaFigma,
  FaWordpress,
  FaTiktok,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiShopify, SiFlutter } from "react-icons/si";
import { font } from "../Font/font";

const Slider = () => {
  const technologies = [
    { name: "React", icon: FaReact },
    { name: "Next.js", icon: RiNextjsFill },
    { name: "TikTok", icon: FaTiktok },
    { name: "Shopify", icon: SiShopify },
    { name: "WordPress", icon: FaWordpress },
    { name: "Instagram", icon: FaInstagram },
    { name: "Facebook", icon: FaFacebook },
    { name: "Bootstrap", icon: FaBootstrap },
    { name: "Figma", icon: FaFigma },
    { name: "Flutter", icon: SiFlutter },
  ];

  return (
    <div
      className={`backdrop-blur-2xl bg-white/5 border-y border-white/20 md:py-3 overflow-hidden relative z-20 ${font.className}`}
    >
      {/* Glass gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />
      <div className="slider-container relative z-10">
        <div className="slider-track">
          {/* First set of icons */}
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={`first-${index}`}
                className="flex items-center gap-1 md:gap-3 px-2 py-3 md:py-1 mx-2 md:mx-4 whitespace-nowrap"
              >
                <IconComponent className="md:text-5xl text-3xl text-white" />
                <span className="text-white font-medium text-md md:text-xl">
                  {tech.name}
                </span>
              </div>
            );
          })}

          {/* Duplicate set for continuous loop */}
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={`second-${index}`}
                className="flex items-center gap-3 px-6 py-3 md:py-1 mx-4 whitespace-nowrap"
              >
                <IconComponent className="md:text-5xl text-3xl text-white" />
                <span className="text-white font-medium text-md md:text-xl">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .slider-container {
          width: 100%;
          overflow: hidden;
        }

        .slider-track {
          display: flex;
          animation: slide 30s linear infinite;
          width: fit-content;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .slider-track:hover {
          animation-play-state: running;
        }
      `}</style>
    </div>
  );
};

export default Slider;