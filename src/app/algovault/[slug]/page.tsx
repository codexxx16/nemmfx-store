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
import FAQ from '@/components/FAQ';

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
  const relatedProducts = getRelatedProducts(slug);
  const { addToCart } = useCart();
  const { currency } = useCurrency();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-white">
            Product Not Found
          </h1>
          <p className="text-muted">
            The product you are looking for does not exist.
          </p>
          <Link
            href="/algovault"
            className="inline-block px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm"
          >
            Back to AlgoVault
          </Link>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/algovault"
            className="hover:text-white transition-colors"
          >
            AlgoVault
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      {/* Product Header */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square bg-surface border border-border rounded-2xl overflow-hidden"
            >
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.tag && (
                <span className="absolute top-4 left-4 px-4 py-1.5 bg-accent/20 text-accent text-sm font-bold rounded-full">
                  {product.tag}
                </span>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-surface border border-border rounded-full text-xs font-medium text-muted">
                    {product.version}
                  </span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  {product.name}
                </h1>
              </div>

              <p className="text-muted leading-relaxed">
                {product.detailed_description || product.description}
              </p>

              <div className="space-y-1">
                <p className="font-display text-3xl font-bold text-accent">
                  {formatPrice(product.price_usd, currency)}
                </p>
                <p className="text-xs text-muted">
                  Price excludes VAT. VAT added at checkout.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-3.5 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors text-sm"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 border border-accent text-accent font-bold rounded-lg hover:bg-accent/10 transition-colors text-sm"
                >
                  Buy Now
                </button>
              </div>

              {/* What you'll receive */}
              <div className="p-5 bg-surface border border-border rounded-xl space-y-3">
                <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
                  What You&apos;ll Receive
                </h3>
                <ul className="space-y-2">
                  {[
                    'Licensed .ex5 file bound to your MT5 account number',
                    'Free updates for 3 months',
                    'WhatsApp support from CharlessDev',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <svg className="w-5 h-5 text-success shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      {product.features && (
        <section className="py-16 bg-surface/50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-white mb-8">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-4 bg-surface border border-border rounded-lg"
                >
                  <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-muted">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <FAQ items={productFAQ} />
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-surface/50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-white mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
