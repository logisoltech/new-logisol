"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
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

// Searchable items data
const searchableItems = [
  // Services
  { title: 'Custom Web Development Services', keywords: ['web', 'website', 'custom', 'development', 'web development', 'webapp'], link: '/custom-web-development-services', category: 'Services' },
  { title: 'Mobile Application Development', keywords: ['mobile', 'app', 'application', 'ios', 'android', 'mobile app'], link: '/mobile-application-development-services', category: 'Services' },
  { title: 'Digital Marketing Services', keywords: ['digital', 'marketing', 'online marketing', 'digital marketing'], link: '/digital-marketing-services', category: 'Services' },
  { title: 'SEO Services & Strategy', keywords: ['seo', 'search engine', 'optimization', 'ranking', 'google'], link: '/seo-services-and-strategy', category: 'Services' },
  { title: 'Social Media Marketing', keywords: ['social', 'media', 'smm', 'facebook', 'instagram', 'social media'], link: '/social-media-marketing-services', category: 'Services' },
  { title: 'Graphics Designing Services', keywords: ['graphic', 'design', 'graphics', 'logo', 'branding', 'ui', 'ux'], link: '/graphics-designing-services', category: 'Services' },
  { title: 'Professional Video Editing', keywords: ['video', 'editing', 'production', 'motion', 'animation'], link: '/professional-video-editing-services', category: 'Services' },
  // Pages
  { title: 'About Us', keywords: ['about', 'company', 'team', 'who we are'], link: '/about-us', category: 'Pages' },
  { title: 'Contact Us', keywords: ['contact', 'reach', 'get in touch', 'email', 'phone'], link: '/contact-us', category: 'Pages' },
  { title: 'Our Services', keywords: ['services', 'all services', 'what we do'], link: '/services', category: 'Pages' },
  { title: 'Our Projects', keywords: ['projects', 'portfolio', 'work', 'case studies'], link: '/our-projects', category: 'Pages' },
  { title: 'Our Pricing', keywords: ['pricing', 'plans', 'cost', 'packages', 'rates'], link: '/our-pricing', category: 'Pages' },
  { title: 'Blogs', keywords: ['blog', 'articles', 'news', 'insights'], link: '/blogs', category: 'Pages' },
];

const Navbar = () => {
  const menuItems = useMemo(() => createMenuItems(navLinks), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchableItems.filter(item => {
      // Check title
      if (item.title.toLowerCase().includes(lowerQuery)) return true;
      // Check keywords
      if (item.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))) return true;
      return false;
    });

    setSearchResults(results);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear search on navigation
  const handleResultClick = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  return (
    <nav
      className={`${font.className} sticky top-0 z-[9999]`}
    >
      {/* Glassy Material Navbar Container */}
      <div className="w-[95%] lg:w-[80%] mx-auto mt-4 lg:mt-6 backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl rounded-full relative z-[99999]">
        <div className="w-full mx-auto px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between relative">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 z-50 relative">
            <img
              src="/logo.png"
              alt="Logisol Logo"
              className="w-auto h-8 lg:h-10"
            />
          </a>

          {/* Right side - Search, Country Selector and Menu */}
          <div className="flex items-center gap-2 lg:gap-4 ml-auto">
            {/* Search Bar - Desktop Only */}
            <div className="hidden lg:block relative z-[99999]" ref={searchRef}>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-48 xl:w-64 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm pl-10 pr-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                />
              </div>

              {/* Search Results Dropdown - Desktop */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-80 max-h-96 overflow-y-auto backdrop-blur-2xl bg-black/80 border border-white/20 rounded-2xl shadow-2xl z-[99999]">
                  {/* Group by category */}
                  {['Services', 'Pages'].map(category => {
                    const categoryResults = searchResults.filter(r => r.category === category);
                    if (categoryResults.length === 0) return null;
                    return (
                      <div key={category}>
                        <div className="px-4 py-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider border-b border-white/10">
                          {category}
                        </div>
                        {categoryResults.map((result, index) => (
                          <Link
                            key={index}
                            href={result.link}
                            onClick={handleResultClick}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                              {category === 'Services' ? (
                                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">{result.title}</div>
                              <div className="text-white/50 text-xs">{result.link}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* No results message */}
              {isSearchFocused && searchQuery.trim() !== '' && searchResults.length === 0 && (
                <div className="absolute top-full mt-2 w-80 backdrop-blur-2xl bg-black/80 border border-white/20 rounded-2xl shadow-2xl z-[99999] p-4">
                  <div className="text-white/50 text-sm text-center">No results found for "{searchQuery}"</div>
                </div>
              )}
            </div>

            {/* Country Selector - Desktop Only */}
            <div className="hidden lg:block">
              <CountrySelector />
            </div>

            {/* StaggeredMenu */}
            <div className="relative z-50">
              <StaggeredMenu 
                items={menuItems} 
                position="right"
                searchQuery={searchQuery}
                onSearchChange={handleSearch}
                searchResults={searchResults}
                onResultClick={handleResultClick}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
