'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatPrice } from '@/lib/currency';
import DownloadOverlay from './DownloadOverlay';
import { 
  Download, 
  ShoppingCart,
  Zap,
  ShieldCheck,
  Star,
  Sparkles
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { currency } = useCurrency();
  const [showDownloadOverlay, setShowDownloadOverlay] = useState(false);

  const handleFreeClick = () => {
    if (product.mediafireUrl) {
      setShowDownloadOverlay(true);
    } else {
      window.open(
        'https://wa.me/263787399652?text=Hi%20NemmFX%2C%20I%27m%20interested%20in%20the%20free%20bot',
        '_blank'
      );
    }
  };

  const isPremium = product.tag === 'Premium' || product.tag === 'Pro';
  const neonBorder = isPremium ? 'border-accent/50 shadow-lg shadow-accent/20' : 'border-border';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`group glass-card overflow-hidden max-w-xs flex flex-col h-full border ${neonBorder} transition-all duration-300`}
      >
        {/* Full-Bleed Hero Image */}
        <Link href={product.is_free ? '#' : `/algovault/${product.slug}`}>
          <div className="relative w-full aspect-video bg-background overflow-hidden">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Tag Badge */}
            {product.tag && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/10 text-white">
                {product.tag === 'Free' ? (
                  <Download className="w-3 h-3 text-success" />
                ) : product.tag === 'Premium' || product.tag === 'Pro' ? (
                  <Star className="w-3 h-3 text-accent fill-accent" />
                ) : (
                  <Zap className="w-3 h-3 text-accent" />
                )}
                {product.tag}
              </div>
            )}
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <Link href={product.is_free ? '#' : `/algovault/${product.slug}`}>
            <h3 className="font-display text-sm font-semibold text-white group-hover:text-accent transition-colors line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-xs text-muted line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Price & Version */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            {product.is_free ? (
              <span className="font-display text-sm font-bold text-success uppercase tracking-wider">
                Free
              </span>
            ) : (
              <span className="text-base font-medium text-white">
                {formatPrice(product.price_usd, currency)}
              </span>
            )}
            <div className="flex items-center gap-1 text-[10px] text-muted uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" />
              {product.version}
            </div>
          </div>

          {/* Action Button */}
          {product.is_free ? (
            <button
              onClick={handleFreeClick}
              className="w-full py-2.5 bg-success/10 text-success border border-success/30 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-success/20 transition-all flex items-center justify-center gap-2 group mt-auto"
            >
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              Download Free
            </button>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="w-full py-2.5 bg-accent text-background rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group mt-auto"
            >
              <ShoppingCart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Add to Cart
            </button>
          )}
        </div>
      </motion.div>

      {/* Download Overlay */}
      {showDownloadOverlay && product.mediafireUrl && (
        <DownloadOverlay
          mediafireUrl={product.mediafireUrl}
          fileName={product.name}
          onClose={() => setShowDownloadOverlay(false)}
        />
      )}
    </>
  );
}
