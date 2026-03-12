'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const params = useSearchParams();
  const error = params.get('error');
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-white">Sign In Error</h1>
        <p className="text-muted text-sm">{error || 'Something went wrong.'}</p>
        <Link href="/auth/signin" className="inline-block px-6 py-2.5 bg-accent text-background font-bold rounded-lg text-sm">
          Try Again
        </Link>
      </div>
    </div>
  );
}
