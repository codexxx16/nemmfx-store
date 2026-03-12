'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatPrice } from '@/lib/currency';
import { 
  Download, 
  ShoppingCart,
  Zap,
  ShieldCheck,
  Star
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { currency } = useCurrency();

  const handleFreeClick = () => {
    window.open(
      'https://wa.me/27747694008?text=Hi%20CharlessDev%2C%20I%27m%20interested%20in%20the%20free%20bot',
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300"
    >
      {/* Image */}
      <Link href={product.is_free ? '#' : `/algovault/${product.slug}`}>
        <div className="relative aspect-[4/3] bg-background overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.tag && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest bg-black/50 backdrop-blur-md border border-white/10 text-white">
              {product.tag === 'Free' ? (
                <Download className="w-3 h-3 text-success" />
              ) : product.tag === 'Premium' ? (
                <Star className="w-3 h-3 text-accent fill-accent" />
              ) : (
                <Zap className="w-3 h-3 text-accent" />
              )}
              {product.tag}
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3">
        <Link href={product.is_free ? '#' : `/algovault/${product.slug}`}>
          <h3 className="font-display text-base font-semibold text-white group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted line-clamp-1">{product.description}</p>

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          {product.is_free ? (
            <span className="font-display text-lg font-bold text-success uppercase tracking-wider">
              Free
            </span>
          ) : (
            <span className="text-sm font-medium text-white">
              {formatPrice(product.price_usd, currency)}
            </span>
          )}
          <div className="flex items-center gap-1 text-[10px] text-muted uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            {product.version}
          </div>
        </div>

        {/* Action */}
        {product.is_free ? (
          <div>
            <button
              onClick={handleFreeClick}
              className="w-full py-2.5 bg-success/10 text-success border border-success/20 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-success/20 transition-all flex items-center justify-center gap-2 group"
            >
              <Download className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
              Get Free Bot
            </button>
            <p className="text-[10px] text-muted text-center mt-2 uppercase tracking-tighter">
              Limited features • Contact support
            </p>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 bg-accent text-background rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group"
          >
            <ShoppingCart className="w-3 h-3 group-hover:scale-110 transition-transform" />
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  );
}
