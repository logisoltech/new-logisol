"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CountryContext = createContext();

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState('US');
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState({
    US: 1,      // Base currency (USD)
    CA: 1.37,   // Fallback rate: 1 USD = 1.37 CAD
  });

  const currencies = {
    US: {
      code: 'USD',
      symbol: '$',
      name: 'USA',
      flag: '/usa-20.png'
    },
    CA: {
      code: 'CAD',
      symbol: '$',
      name: 'Canada',
      flag: '/canada-20.png'
    }
  };

  // Contact information per country
  const contactInfo = {
    US: {
      phone: '(415) 969-4133',
      phoneLink: 'tel:+14159694133',
      address: '1001 S Main St Kalispell, Montana, USA',
      addressLink: 'https://maps.google.com/?q=1001+S+Main+St+Kalispell+Montana+USA',
      email: 'info@logisol.tech',
    },
    CA: {
      phone: '(587) 324-7424',
      phoneLink: 'tel:+15873247424',
      address: 'Evanston, Calgary, Alberta, Canada',
      addressLink: 'https://maps.google.com/?q=100+King+Street+West+Toronto+Ontario+Canada',
      email: 'info@logisol.tech',
    }
  };

  // Get current contact info based on country
  const getContactInfo = () => contactInfo[country] || contactInfo.US;

  const fetchExchangeRates = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE;
      if (!apiKey) {
        console.warn('Exchange rate API key not found, using fallback rates');
        return;
      }

      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
      const data = await response.json();
      
      if (data.conversion_rates) {
        setExchangeRates({
          US: 1,
          CA: data.conversion_rates.CAD || 1.37, // Fallback if CAD not available
        });
        console.log('Exchange rates updated:', data.conversion_rates);
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // Keep fallback rates if API fails
    }
  };

  // Convert price from USD to selected currency and round to nearest integer
  const convertPrice = (usdPrice) => {
    if (country === 'US') return Math.round(usdPrice);
    const convertedPrice = usdPrice * exchangeRates[country];
    return Math.round(convertedPrice);
  };

  // Get current currency info
  const getCurrency = () => currencies[country];

  // Change country
  const changeCountry = (newCountry) => {
    setCountry(newCountry);
    localStorage.setItem('selectedCountry', newCountry);
  };

  // Detect user's country on first visit
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Check if user has already selected a country
        const savedCountry = localStorage.getItem('selectedCountry');
        if (savedCountry && currencies[savedCountry]) {
          setCountry(savedCountry);
          setIsLoading(false);
          return;
        }

        // Try to detect country from IP
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code && currencies[data.country_code]) {
          setCountry(data.country_code);
          localStorage.setItem('selectedCountry', data.country_code);
        } else {
          // Fallback to US
          setCountry('US');
          localStorage.setItem('selectedCountry', 'US');
        }
      } catch (error) {
        console.log('Country detection failed, defaulting to US:', error);
        setCountry('US');
        localStorage.setItem('selectedCountry', 'US');
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, []);

  // Fetch exchange rates on component mount
  useEffect(() => {
    fetchExchangeRates();
    
    // Refresh exchange rates every 24 hours
    const interval = setInterval(fetchExchangeRates, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const value = {
    country,
    changeCountry,
    convertPrice,
    getCurrency,
    getContactInfo,
    currencies,
    contactInfo,
    exchangeRates,
    isLoading
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
}; 