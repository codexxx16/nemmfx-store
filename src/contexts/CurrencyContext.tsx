'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CurrencyInfo, GeoLocation } from '@/lib/types';
import { detectUserLocation, getCurrencyForCountry } from '@/lib/currency';

interface CurrencyContextType {
  currency: CurrencyInfo;
  location: GeoLocation | null;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyInfo>({
    code: 'USD',
    symbol: '$',
    rate: 1,
  });
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectUserLocation().then((loc) => {
      setLocation(loc);
      setCurrency(getCurrencyForCountry(loc.country_code));
      setIsLoading(false);
    });
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, location, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
