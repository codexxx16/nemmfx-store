'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    setLoading(provider);
    await signIn(provider === 'guest' ? 'guest' : provider, { callbackUrl: '/' });
    setLoading(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-white">
            Welcome to <span className="text-accent">NemmFX</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Sign in to track your orders and purchases
          </p>
        </div>

        <div className="space-y-3">
          {/* Guest — always available */}
          <button
            onClick={() => handleSignIn('guest')}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-semibold text-sm bg-accent text-background hover:bg-accent/90 transition-all disabled:opacity-50"
          >
            👤 {loading === 'guest' ? 'Loading...' : 'Continue as Guest'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-background text-muted">or sign in with</span>
            </div>
          </div>

          {/* Google */}
          <button
            onClick={() => handleSignIn('google')}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-semibold text-sm bg-surface border border-border text-white hover:border-accent/50 transition-all disabled:opacity-50"
          >
            🔵 {loading === 'google' ? 'Loading...' : 'Sign in with Google'}
          </button>

          {/* Microsoft */}
          <button
            onClick={() => handleSignIn('microsoft')}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-semibold text-sm bg-surface border border-border text-white hover:border-accent/50 transition-all disabled:opacity-50"
          >
            🪟 {loading === 'microsoft' ? 'Loading...' : 'Sign in with Microsoft'}
          </button>

          {/* Apple */}
          <button
            onClick={() => handleSignIn('apple')}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-semibold text-sm bg-surface border border-border text-white hover:border-accent/50 transition-all disabled:opacity-50"
          >
            🍎 {loading === 'apple' ? 'Loading...' : 'Sign in with Apple'}
          </button>
        </div>

        <p className="text-center text-xs text-muted">
          <button onClick={() => router.back()} className="hover:text-white transition-colors">
            ← Go back
          </button>
        </p>
        <p className="text-center text-xs text-muted">
          NemmFX — From{' '}
          <a href="https://nemm-co.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            nemm
          </a>
        </p>
      </motion.div>
    </div>
  );
}
