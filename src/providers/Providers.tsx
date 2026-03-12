'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/contexts/CartContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CurrencyProvider>
        <CartProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0a0a12',
                color: '#FFFFFF',
                border: '1px solid #1a1a2e',
              },
              success: {
                iconTheme: {
                  primary: '#FFD700',
                  secondary: '#0a0a12',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#0a0a12',
                },
              },
            }}
          />
          {children}
        </CartProvider>
      </CurrencyProvider>
    </SessionProvider>
  );
}
