'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { WhatsappIcon } from 'hugeicons-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
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
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Professional Trading Tools
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase">
              Trade Smarter with{' '}
              <span className="text-accent">NemmFX</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted uppercase tracking-widest font-medium leading-relaxed">
              Professional forex trading tools, Expert Advisors, and algorithmic
              trading products built for serious traders. Automate your strategy
              with precision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/algovault"
                className="w-full sm:w-auto px-8 py-4 bg-accent text-background font-bold rounded-xl hover:bg-accent/90 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-accent/20"
              >
                Explore AlgoVault
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-4 border border-border text-white font-bold rounded-xl hover:border-accent/50 hover:text-accent transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
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
            className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {[
              { value: '14+', label: 'Patterns', icon: TrendingUp },
              { value: 'v1.2', label: 'Latest', icon: ShieldCheck },
              { value: 'MT5', label: 'Platform', icon: CheckCircle2 },
              { value: '24/7', label: 'Automated', icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="text-center group p-4 bg-surface/30 border border-border/50 rounded-2xl hover:border-accent/30 transition-all">
                <stat.icon className="w-5 h-5 mx-auto text-accent/50 group-hover:text-accent transition-colors mb-3" />
                <p className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] text-muted uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-surface/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-widest">
                Featured <span className="text-accent">Algorithms</span>
              </h2>
              <p className="text-muted text-sm uppercase tracking-widest font-medium">
                Professional-grade Expert Advisors designed for consistency.
              </p>
            </div>
            <Link
              href="/algovault"
              className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest hover:underline group"
            >
              View All Tools
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest">
                <Zap className="w-3 h-3" />
                The Developer
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight leading-tight">
                Built by a Trader,{' '}
                <span className="text-accent">For Traders</span>
              </h2>
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-muted uppercase tracking-widest font-medium leading-relaxed">
                  NemmFX is the official store for trading tools developed by
                  CharlessDev — Charless Netumbare, a full-stack developer and
                  algorithmic trading specialist based in Masvingo, Zimbabwe.
                </p>
                <p className="text-sm sm:text-base text-muted uppercase tracking-widest font-medium leading-relaxed">
                  Every Expert Advisor is built with real market experience,
                  tested extensively, and designed to help traders automate their
                  strategies with confidence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Read our story
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://charless-dev.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted hover:text-white font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Visit developer site
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-surface border border-border rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl shadow-accent/10">
                <Image
                  src="/products/paid-bot-premium.jpg"
                  alt="NemmFX Bot"
                  width={400}
                  height={400}
                  className="object-cover animate-float"
                />
              </div>
              {/* Abstract decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 blur-[80px] rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border bg-surface/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase tracking-widest">
              Ready to Automate?
            </h2>
            <p className="text-sm sm:text-base text-muted max-w-xl mx-auto uppercase tracking-widest font-medium leading-relaxed">
              Join traders who trust NemmFX Expert Advisors to execute
              consistent, emotion-free trades around the clock.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/algovault"
                className="w-full sm:w-auto px-10 py-4 bg-accent text-background font-bold rounded-xl hover:bg-accent/90 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-accent/20"
              >
                Browse AlgoVault
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/27747694008"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 border border-border text-white font-bold rounded-xl hover:border-success/50 hover:text-success transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <WhatsappIcon className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
