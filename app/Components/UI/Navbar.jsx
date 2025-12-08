"use client";
import React, { useMemo } from "react";
import { font } from "../Font/font";
import navLinks from "../Data/navLinks.json";
import CountrySelector from "./CountrySelector";
import StaggeredMenu from "./StaggeredMenu";

// Helper function to transform navLinks into menu items format
const createMenuItems = (links) => {
  const items = [];
  
  links.forEach((link) => {
    if (link.label === "Services" && link.dropdown) {
      // Add Services as main item with nested services
      items.push({
        label: link.label,
        link: link.href,
        isServices: true,
        services: link.dropdown.map((subLink) => ({
          label: subLink.label,
          link: subLink.href,
          subItems: subLink.dropdown || []
        }))
      });
    } else {
      // Add regular link
      items.push({
        label: link.label,
        link: link.href,
      });
    }
  });
  
  return items;
};

const Navbar = () => {
  const menuItems = useMemo(() => createMenuItems(navLinks), []);

  return (
    <nav
      className={`${font.className} sticky top-0 z-50`}
    >
      {/* Glassy Material Navbar Container */}
      <div className="w-[80%] mx-auto mt-6 backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl rounded-full">
        <div className="w-full mx-auto px-6 py-4 flex items-center justify-between relative">
          {/* Logo */}
          <a href="https://logisol.tech" className="flex-shrink-0 z-50 relative">
            <img
              src="/logo.png"
              alt="Logisol Logo"
              className="w-auto h-10"
            />
          </a>

          {/* Search Bar - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
            <div className="max-w-md w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
              />
            </div>
          </div>

          {/* Right side - Country Selector and Menu */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Country Selector */}
            <div className="hidden lg:block">
              <CountrySelector />
            </div>

            {/* StaggeredMenu */}
            <div className="relative z-50">
              <StaggeredMenu items={menuItems} position="right" />
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden flex-1 max-w-xs mx-8 mr-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
