'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
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
                  src="/logo.png"
                  alt="NemmFX Logo"
                  width={250}
                  height={250}
                  className="object-contain animate-float"
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

      {/* Values */}
      <section className="py-16 bg-surface/50 border-t border-border">
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
                className="p-6 bg-surface border border-border rounded-xl text-center space-y-4"
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
