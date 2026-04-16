'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  User, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { 
  GoogleIcon,
  AppleIcon,
  MicrosoftIcon
} from 'hugeicons-react';

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    setLoading(provider);
    await signIn(provider === 'guest' ? 'guest' : provider, { callbackUrl: '/' });
    setLoading(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -z-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 relative z-10"
      >
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-white">
            Welcome to <span className="text-accent">NemmFX</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Sign in to track your orders and purchases
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-xl space-y-6">
          <div className="space-y-3">
            {/* Guest — always available */}
            <button
              onClick={() => handleSignIn('guest')}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-bold text-sm bg-accent text-background hover:bg-accent/90 transition-all disabled:opacity-50"
            >
              <User className="w-4 h-4" />
              {loading === 'guest' ? 'Loading...' : 'Continue as Guest'}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-surface text-muted uppercase tracking-widest">or sign in with</span>
              </div>
            </div>

            {/* Google */}
            <button
              onClick={() => handleSignIn('google')}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-semibold text-sm bg-surface border border-border text-white hover:border-accent/50 transition-all disabled:opacity-50 group"
            >
              <GoogleIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {loading === 'google' ? 'Loading...' : 'Sign in with Google'}
            </button>

            {/* Microsoft */}
            <button
              onClick={() => handleSignIn('microsoft')}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-semibold text-sm bg-surface border border-border text-white hover:border-accent/50 transition-all disabled:opacity-50 group"
            >
              <MicrosoftIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {loading === 'microsoft' ? 'Loading...' : 'Sign in with Microsoft'}
            </button>

            {/* Apple */}
            <button
              onClick={() => handleSignIn('apple')}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-semibold text-sm bg-surface border border-border text-white hover:border-accent/50 transition-all disabled:opacity-50 group"
            >
              <AppleIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {loading === 'apple' ? 'Loading...' : 'Sign in with Apple'}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-muted uppercase tracking-widest pt-2">
            <ShieldCheck className="w-3 h-3" />
            Secure Authentication
          </div>
        </div>

        <div className="space-y-4 text-center">
          <button onClick={() => router.back()} className="text-xs text-muted hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Go back
          </button>
          <p className="text-[10px] text-muted tracking-widest">
            NemmFX — From{' '}
            <a href="https://nemm-co.vercel.app" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              nemm
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
