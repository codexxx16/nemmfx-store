'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatLocalPrice } from '@/lib/currency';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCreditCard, 
  faBuildingColumns, 
  faMobileScreenButton, 
  faMobileButton,
  faCommentDots,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { faPaypal, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const paymentMethods = [
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <FontAwesomeIcon icon={faPaypal} className="text-[#003087]" />,
    description: 'Instant, automated delivery',
    href: '/checkout/paypal',
  },
  {
    id: 'eft',
    name: 'EFT (Access Bank)',
    icon: <FontAwesomeIcon icon={faBuildingColumns} className="text-accent" />,
    description: 'Manual verification',
    href: '/checkout/manual?method=eft',
  },
  {
    id: 'mukuru',
    name: 'Mukuru',
    icon: <FontAwesomeIcon icon={faMobileScreenButton} className="text-orange-500" />,
    description: 'Manual verification',
    href: '/checkout/manual?method=mukuru',
  },
  {
    id: 'ecocash',
    name: 'EcoCash',
    icon: <FontAwesomeIcon icon={faMobileButton} className="text-blue-500" />,
    description: 'Manual verification',
    href: '/checkout/manual?method=ecocash',
  },
  {
    id: 'mobile_money',
    name: 'Zimbabwe Mobile Money',
    icon: <FontAwesomeIcon icon={faMobileScreenButton} className="text-accent" />,
    description: 'All networks supported',
    href: '/checkout/manual?method=mobile_money',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Payment',
    icon: <FontAwesomeIcon icon={faWhatsapp} className="text-[#25D366]" />,
    description: 'Contact support',
    href: 'https://wa.me/27747694008',
    external: true,
  },
];

export default function CheckoutPage() {
  const { items, subtotal, vat, total } = useCart();
  const { currency } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-white">
            No Items to Checkout
          </h1>
          <p className="text-muted">Add some products to your cart first.</p>
          <Link
            href="/algovault"
            className="inline-block px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm"
          >
            Browse AlgoVault
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-white mb-8"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-3 space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-surface border border-border rounded-xl"
            >
              <h2 className="font-display text-lg font-bold text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3"
                  >
                    <div className="relative w-12 h-12 bg-background rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-white">
                      ${(item.product.price_usd * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Payment Selection */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display text-lg font-bold text-white mb-4">
                Select Payment Method
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Component = method.external ? 'a' : Link;
                  const extraProps = method.external
                    ? {
                        target: '_blank' as const,
                        rel: 'noopener noreferrer',
                      }
                    : {};
                  return (
                    <Component
                      key={method.id}
                      href={method.href}
                      {...extraProps}
                      className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-accent/30 transition-all group"
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-background rounded-lg text-xl">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white group-hover:text-accent transition-colors">
                          {method.name}
                        </p>
                        <p className="text-xs text-muted">
                          {method.description}
                        </p>
                      </div>
                      <FontAwesomeIcon 
                        icon={faChevronRight} 
                        className="w-4 h-4 text-muted group-hover:text-accent transition-colors" 
                      />
                    </Component>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-muted text-center">
                For other local payment methods, contact our{' '}
                <Link href="/support" className="text-accent hover:underline">
                  support team
                </Link>{' '}
                for details.
              </p>
            </motion.div>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 p-5 bg-surface border border-border rounded-xl space-y-4"
            >
              <h2 className="font-display text-lg font-bold text-white">
                Price Breakdown
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-white">
                    ${subtotal.toFixed(2)} USD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">VAT (15%)</span>
                  <span className="text-white">${vat.toFixed(2)} USD</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-display font-bold text-white">
                    Total
                  </span>
                  <div className="text-right">
                    <p className="font-display text-xl font-bold text-accent">
                      ${total.toFixed(2)} USD
                    </p>
                    {currency.code !== 'USD' && (
                      <p className="text-xs text-muted mt-1">
                        ~{formatLocalPrice(total, currency)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
