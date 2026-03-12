'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products, freeProducts } from '@/lib/products';
import { 
  Zap, 
  ShieldCheck, 
  Sparkles,
  LayoutGrid
} from 'lucide-react';

export default function AlgoVaultPage() {
  return (
    <div className="min-h-screen py-16">
      {/* Header */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest mx-auto">
              <Sparkles className="w-3 h-3" />
              The Algorithm Vault
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Algo<span className="text-accent">Vault</span>
            </h1>
            <p className="text-muted max-w-xl mx-auto text-sm uppercase tracking-widest font-medium">
              Professional Expert Advisors and trading tools designed for
              consistent, automated trading on MetaTrader 5.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Paid Products */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10 border-l-4 border-accent pl-6"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white uppercase tracking-widest">
                Expert Advisors
              </h2>
              <p className="text-[10px] text-muted uppercase tracking-widest font-bold">
                Professional-grade automated trading systems
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Free Bots Section */}
      <section className="py-20 bg-surface/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full mb-4">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span className="text-xs font-bold text-success uppercase tracking-widest">
                Free Tools — Limited Edition
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white uppercase tracking-widest">
              Free Trading Tools
            </h2>
            <p className="mt-2 text-sm text-muted uppercase tracking-widest font-medium">
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
