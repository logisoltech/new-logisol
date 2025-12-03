"use client";

import { useState, useRef, useEffect } from 'react';
import { useCountry } from '@/app/context/CountryContext';

export default function CountrySelector() {
  const { country, changeCountry, currencies, isLoading } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (countryCode) => {
    changeCountry(countryCode);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="relative">
        <button className="flex items-center space-x-2 px-3 py-2 text-white hover:text-gray-300 transition-colors">
          <span className="text-lg">🌍</span>
        </button>
      </div>
    );
  }

  const currentCurrency = currencies[country];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-white hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-900"
        aria-label="Select country"
      >
        <img src={currentCurrency.flag} alt={currentCurrency.name} className="w-6 h-6" />
        <span className="hidden sm:inline text-sm font-medium">
          {currentCurrency.code}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#0f0f0f] rounded-lg shadow-lg border border-gray-800 z-50">
          <div className="py-1">
            {Object.entries(currencies).map(([countryCode, currency]) => (
              <button
                key={countryCode}
                onClick={() => handleCountrySelect(countryCode)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-900 transition-colors ${
                  country === countryCode ? 'bg-gray-900 text-gray-200' : 'text-white'
                }`}
              >
                <img src={currency.flag} alt={currency.name} className="w-6 h-6" />
                <div className="flex flex-col">
                  <span className="font-medium">{currency.name}</span>
                  <span className="text-sm text-gray-400">{currency.code}</span>
                </div>
                {country === countryCode && (
                  <svg
                    className="w-4 h-4 ml-auto text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 