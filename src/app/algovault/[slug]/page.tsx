'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatPrice } from '@/lib/currency';
import ProductCard from '@/components/ProductCard';
import ProductSchema from '@/components/ProductSchema';
import FAQ from '@/components/FAQ';
import { ShoppingCart, Download, CheckCircle2 } from 'lucide-react';

const productFAQ = [
  {
    question: 'How do I receive my Expert Advisor after purchase?',
    answer:
      'After your payment is confirmed, our team will contact you on WhatsApp within 1-2 hours with your licensed .ex5 file. You will need to provide your MT5 account number for license binding.',
  },
  {
    question: 'Can I use the EA on multiple accounts?',
    answer:
      'Each license is bound to a single MT5 account number. If you need to use the EA on multiple accounts, you will need to purchase additional licenses. Contact us for multi-account discounts.',
  },
  {
    question: 'What pairs and timeframes does the EA support?',
    answer:
      'The Money Maker EA supports all major forex pairs, gold (XAUUSD), and major indices. It works best on H1 and H4 timeframes but can be configured for other timeframes as well.',
  },
  {
    question: 'Do I get free updates?',
    answer:
      'Yes! All purchases include free updates for 3 months from the date of purchase. After that, you can renew your update subscription or continue using your current version.',
  },
  {
    question: 'What if the EA is not profitable for me?',
    answer:
      'Trading involves risk and past performance does not guarantee future results. We recommend testing on a demo account first. Our team provides WhatsApp support to help you optimize settings for your trading style and account size.',
  },
  {
    question: 'What is the minimum account balance required?',
    answer:
      'The EA works with accounts as small as $100 USD. However, we recommend a minimum of $500 for optimal performance with proper risk management. The dynamic lot sizing feature automatically adjusts to your account balance.',
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-white">Product Not Found</h1>
          <Link href="/algovault" className="inline-block px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm">
            Back to AlgoVault
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(slug);
  const { addToCart } = useCart();
  const { currency } = useCurrency();

  const handleBuyNow = () => {
    addToCart(product);
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen">
      <ProductSchema product={product} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/algovault" className="hover:text-white transition-colors">
            AlgoVault
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      {/* Product Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square bg-surface border border-border rounded-2xl overflow-hidden"
          >
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest mb-4">
                {product.tag}
              </div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <p className="text-muted text-sm">{product.version}</p>
            </div>

            <p className="text-white text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="p-6 bg-surface border border-border rounded-xl space-y-4">
              <div className="flex items-end gap-2">
                <span className="font-display text-4xl font-bold text-accent">
                  ${product.price_usd.toFixed(2)}
                </span>
                <span className="text-muted text-sm uppercase tracking-widest font-bold">USD</span>
              </div>
              <p className="text-xs text-muted uppercase tracking-widest font-bold">
                ✓ Lifetime license • ✓ Free updates (3 months) • ✓ Account-locked security
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-accent text-background font-bold rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-widest"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <a
                href="https://wa.me/263787399652?text=Hi%2C%20I%27m%20interested%20in%20the%20Money%20Maker%20EA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 border border-accent text-accent rounded-xl hover:bg-accent/10 transition-all flex items-center justify-center gap-2 font-bold uppercase text-sm tracking-widest"
              >
                <Download className="w-5 h-5" />
                Ask Questions on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <h2 className="font-display text-3xl font-bold text-white mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-4 bg-surface border border-border rounded-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span className="text-white text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
        <h2 className="font-display text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
        <FAQ items={productFAQ} />
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <h2 className="font-display text-3xl font-bold text-white mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
