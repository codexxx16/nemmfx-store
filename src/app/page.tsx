'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBolt, 
  faArrowRight, 
  faExternalLinkAlt,
  faChartLine,
  faShieldHalved,
  faClock,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <FontAwesomeIcon icon={faBolt} className="text-accent text-xs animate-pulse" />
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                Professional Trading Tools
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              Trade Smarter with{' '}
              <span className="text-accent">NemmFX</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted leading-relaxed">
              Professional forex trading tools, Expert Advisors, and algorithmic
              trading products built for serious traders. Automate your strategy
              with precision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/algovault"
                className="px-8 py-3.5 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors text-sm flex items-center gap-2"
              >
                Explore AlgoVault
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 border border-border text-white font-medium rounded-lg hover:border-accent/50 hover:text-accent transition-colors text-sm"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {[
              { value: '14+', label: 'Pattern Recognition', icon: faChartLine },
              { value: 'v1.2', label: 'Latest Version', icon: faShieldHalved },
              { value: 'MT5', label: 'Platform Support', icon: faCheckCircle },
              { value: '24/7', label: 'Automated Trading', icon: faClock },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <FontAwesomeIcon icon={stat.icon} className="text-accent/30 group-hover:text-accent transition-colors mb-2" />
                <p className="font-display text-2xl sm:text-3xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Featured Products
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              Professional-grade Expert Advisors designed to automate your
              trading with precision and consistency.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/algovault"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium text-sm transition-colors"
            >
              View all products in AlgoVault
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-20 bg-surface/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Built by a Trader,{' '}
                <span className="text-accent">For Traders</span>
              </h2>
              <p className="text-muted leading-relaxed">
                NemmFX is the official store for trading tools developed by
                CharlessDev — Charless Netumbare, a full-stack developer and
                algorithmic trading specialist based in Masvingo, Zimbabwe.
              </p>
              <p className="text-muted leading-relaxed">
                Every Expert Advisor is built with real market experience,
                tested extensively, and designed to help traders automate their
                strategies with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium text-sm transition-colors"
                >
                  Read our story
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                <a
                  href="https://charless-dev.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted hover:text-white font-medium text-sm transition-colors"
                >
                  Visit developer site
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
                </a>
              </div>
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
                  width={200}
                  height={200}
                  className="object-contain animate-float"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Ready to Automate Your Trading?
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Join traders who trust NemmFX Expert Advisors to execute
              consistent, emotion-free trades around the clock.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/algovault"
                className="px-8 py-3.5 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors text-sm flex items-center gap-2"
              >
                Browse AlgoVault
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <a
                href="https://wa.me/27747694008"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-border text-white font-medium rounded-lg hover:border-success/50 hover:text-success transition-colors text-sm flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
