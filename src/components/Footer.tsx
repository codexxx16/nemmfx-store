'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="/logo.png"
                  alt="NemmFX Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-display text-xl font-bold text-white">
                NemmFX
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Your trusted source for professional forex trading tools.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/algovault"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                AlgoVault
              </Link>
              <Link
                href="/support"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Support
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                About
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-muted">
              <p className="flex items-start gap-2">
                <span className="shrink-0">📍</span>
                <span>Masvingo, Chivi District, Ngundu, Zimbabwe</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="shrink-0">📧</span>
                <a
                  href="mailto:codexxxnull@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  codexxxnull@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="shrink-0">🌐</span>
                <a
                  href="https://charless-dev.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  charless-dev.vercel.app
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="shrink-0">💬</span>
                <a
                  href="https://wa.me/27747694008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  WhatsApp: +27 74 769 4008
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted">
            &copy; 2026 NemmFX. All rights reserved.
          </p>
          <a
            href="https://nemm-co.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-xs text-muted/50 hover:text-muted transition-colors"
          >
            From nemm
          </a>
        </div>
      </div>
    </footer>
  );
}
