'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products, freeProducts } from '@/lib/products';
import { 
  Zap, 
  ShieldCheck, 
  Sparkles,
  LayoutGrid,
  Search
} from 'lucide-react';

type Category = 'all' | 'advisors' | 'indicators' | 'tools';

export default function AlgoVaultPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Products', icon: LayoutGrid },
    { id: 'advisors', label: 'Expert Advisors', icon: Zap },
    { id: 'indicators', label: 'Indicators', icon: ShieldCheck },
    { id: 'tools', label: 'Utility Tools', icon: Sparkles },
  ];

  // Categorize products
  const categorizedProducts = {
    advisors: products,
    indicators: [],
    tools: freeProducts,
  };

  const getFilteredProducts = () => {
    let filtered = [];
    if (activeCategory === 'all') {
      filtered = [...products, ...freeProducts];
    } else if (activeCategory === 'advisors') {
      filtered = products;
    } else if (activeCategory === 'indicators') {
      filtered = categorizedProducts.indicators;
    } else if (activeCategory === 'tools') {
      filtered = freeProducts;
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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

      {/* Search & Filter Section */}
      <section className="mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id as Category)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${
                      activeCategory === category.id
                        ? 'bg-accent text-background'
                        : 'bg-surface border border-border text-muted hover:border-accent/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid - Bento Layout */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted text-sm uppercase tracking-widest font-bold">
                No products found matching your criteria.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className={`${
                    index === 0 ? 'sm:col-span-1 lg:col-span-1 lg:row-span-1' : ''
                  }`}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section - Bento Tile */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { label: 'Expert Advisors', value: products.length, icon: Zap },
              { label: 'Free Tools', value: freeProducts.length, icon: ShieldCheck },
              { label: 'Traders Worldwide', value: '1000+', icon: Sparkles },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ translateY: -4 }}
                  className="p-6 glass-card text-center space-y-3 rounded-2xl"
                >
                  <div className="w-12 h-12 mx-auto bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="font-display text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted uppercase tracking-widest font-bold">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
