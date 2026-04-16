'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Account-Locked EAs',
      description: 'Each EA compiled to your MT5 account number only',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Lifetime Updates',
      description: 'All future versions included in your purchase',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Multi-Pair Trading',
      description: 'One EA trades 10+ pairs simultaneously',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: '3-Tier Exit System',
      description: 'Closes at 1R, 2R, and 3R automatically',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Smart Money Concepts',
      description: 'Built-in ICT/SMC: Order Blocks, FVG, BOS/CHoCH',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Adaptive Risk Engine',
      description: 'Lot size scales automatically with your balance',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4v2m0 4v2M6.343 3.665c.886-.887 2.318-.887 3.203 0l.707.707a1.129 1.129 0 001.602-1.602L9.172 1.06a2.129 2.129 0 00-3.015 3.015l.707.707zm9.314 9.314c.886.887.886 2.318 0 3.203l-.707.707a1.129 1.129 0 101.602 1.602l.707-.707a2.129 2.129 0 003.015-3.015l-.707-.707c.887-.886.887-2.318 0-3.203" />
        </svg>
      ),
      title: 'Equity Protection',
      description: 'Daily loss circuit breaker stops trading at 2% loss',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m7.268-4.933a9.965 9.965 0 010 14.866m2.737-2.737a9.965 9.965 0 010-14.866M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Broker-Aware Spreads',
      description: 'Pre-configured for JustMarkets, Exness, IC Markets, XM & more',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1m-1.636-6.364l-.707-.707M12 21v-1m-6.364-1.636l.707-.707M3 12h1m1.636 6.364l.707.707M7.05 6.586a1 1 0 10-1.414 1.414l1.414-1.414zm9.9 9.9a1 1 0 10-1.414 1.414l1.414-1.414z" />
        </svg>
      ),
      title: 'Session Intelligence',
      description: 'Only trades during high-probability market sessions',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: 'Push Notifications',
      description: 'Real-time MT5 mobile alerts for every signal',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Live Dashboard',
      description: 'On-chart panel shows positions, winrate, uptime live',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24/7 Synthetic Indices',
      description: 'Cheat Code EA trades Deriv & Weltrade synthetics around the clock',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4.458 4.458l.707.707M4.458 19.542l.707-.707M21 20h-1m-1.636-1.636l-.707.707M12 21v-1m-6.364-1.636l.707-.707" />
        </svg>
      ),
      title: 'No VPS Required',
      description: 'Runs on your PC or any Windows VPS',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'WhatsApp Support',
      description: 'Direct developer access via WhatsApp',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">
              About <span className="text-accent">NemmFX</span>
            </h1>
            <p className="text-muted max-w-xl mx-auto">
              The story behind professional forex trading tools built by traders, for traders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About NemmFX */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-3xl font-bold text-white">
                Our Mission
              </h2>
              <p className="text-muted leading-relaxed">
                NemmFX is the official store for trading tools developed by CharlessDev —
                Charless Netumbare, a full-stack developer and algorithmic trading specialist
                based in Masvingo, Zimbabwe.
              </p>
              <p className="text-muted leading-relaxed">
                Our mission is to make professional-grade algorithmic trading accessible to
                every trader. Whether you are just starting out or have years of experience,
                our Expert Advisors are designed to automate your strategies with precision,
                consistency, and real market intelligence built in.
              </p>
              <p className="text-muted leading-relaxed">
                Every product we build is tested with real market data, optimized for
                performance, and designed with risk management as a core principle. We believe
                that technology should empower traders, not complicate their lives.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-surface border border-border rounded-2xl overflow-hidden flex items-center justify-center glow-accent">
                <Image
                  src="/products/paid-bot-premium.jpg"
                  alt="NemmFX Bot"
                  width={400}
                  height={400}
                  className="object-cover animate-float"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the Developer */}
      <section className="py-16 bg-surface/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="font-display text-3xl font-bold text-white">
              The Developer
            </h2>
            <p className="text-muted leading-relaxed">
              Charless Netumbare (CharlessDev) is a full-stack developer with deep
              expertise in web technologies, algorithmic trading systems, and MQL5
              programming. Based in the Chivi District of Masvingo, Zimbabwe, Charless
              combines technical excellence with a genuine understanding of what traders
              need from their automated systems.
            </p>
            <p className="text-muted leading-relaxed">
              With experience building everything from web applications to complex trading
              algorithms, Charless brings a unique perspective to the development of Expert
              Advisors — understanding both the technical implementation and the real-world
              trading requirements that make or break an automated strategy.
            </p>
            <a
              href="https://charless-dev.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors text-sm"
            >
              Visit Developer Portfolio
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* The nemm ecosystem */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="font-display text-3xl font-bold text-white">
              The <span className="text-accent">nemm</span> Ecosystem
            </h2>
            <p className="text-muted leading-relaxed">
              NemmFX is part of the broader nemm ecosystem — a collection of products and
              services designed to empower individuals through technology. From trading tools
              to web development, the nemm brand represents quality, innovation, and a
              commitment to building solutions that make a real difference.
            </p>
            <a
              href="https://nemm-co.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium text-sm transition-colors"
            >
              Explore nemm
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2026 Store Features */}
      <section className="py-16 bg-surface/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-white text-center mb-12"
          >
            2026 Store Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 glass-card text-center space-y-3"
              >
                <div className="w-12 h-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  {feature.icon}
                </div>
                <h3 className="font-display text-sm font-bold text-white">{feature.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl font-bold text-white text-center mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Security First',
                description:
                  'All payments are server-side verified. Your license is securely bound to your account. We never compromise on security.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Performance',
                description:
                  'Our EAs are optimized for low latency execution and efficient resource usage. Built for real trading conditions.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: 'Support',
                description:
                  'Direct WhatsApp access to the developer. Get help setting up, configuring, and optimizing your trading system.',
              },
            ].map((value) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 glass-card text-center space-y-4"
              >
                <div className="w-14 h-14 mx-auto bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  {value.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-white">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="text-muted">
            Explore our collection of Expert Advisors and start automating your trading today.
          </p>
          <Link
            href="/algovault"
            className="inline-block px-8 py-3.5 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors text-sm"
          >
            Browse AlgoVault
          </Link>
        </div>
      </section>
    </div>
  );
}
