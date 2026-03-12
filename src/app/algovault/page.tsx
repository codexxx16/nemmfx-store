'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products, freeProducts } from '@/lib/products';

export default function AlgoVaultPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Algo<span className="text-accent">Vault</span>
            </h1>
            <p className="text-muted max-w-xl mx-auto">
              Professional Expert Advisors and trading tools designed for
              consistent, automated trading on MetaTrader 5.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Paid Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl font-bold text-white">
              Expert Advisors
            </h2>
            <p className="mt-2 text-sm text-muted">
              Professional-grade automated trading systems
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Free Bots Section */}
      <section className="py-16 bg-surface/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full mb-4">
              <span className="text-xs font-bold text-success uppercase tracking-wider">
                Free Tools — Limited Edition
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              Free Trading Tools
            </h2>
            <p className="mt-2 text-sm text-muted">
              Download free bots with basic features. Upgrade anytime.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {freeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
