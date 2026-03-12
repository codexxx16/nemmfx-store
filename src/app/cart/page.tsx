'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatLocalPrice } from '@/lib/currency';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, vat, total } =
    useCart();
  const { currency } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 mx-auto bg-surface border border-border rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            Your Cart is Empty
          </h1>
          <p className="text-muted">
            Browse our collection of professional trading tools.
          </p>
          <Link
            href="/algovault"
            className="inline-block px-8 py-3 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors text-sm"
          >
            Browse AlgoVault
          </Link>
        </motion.div>
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
          Shopping Cart
        </motion.h1>

        <div className="space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl"
            >
              {/* Image */}
              <div className="relative w-20 h-20 bg-background rounded-lg overflow-hidden shrink-0">
                <Image
                  src={item.product.image_url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-semibold text-white truncate">
                  {item.product.name}
                </h3>
                <p className="text-xs text-muted mt-1">
                  {item.product.version}
                </p>
                <p className="text-sm font-medium text-accent mt-1">
                  ${item.product.price_usd.toFixed(2)} USD
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center bg-background border border-border rounded-lg text-muted hover:text-white hover:border-accent/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-medium text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="w-8 h-8 flex items-center justify-center bg-background border border-border rounded-lg text-muted hover:text-white hover:border-accent/50 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-white">
                  ${(item.product.price_usd * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 text-muted hover:text-danger transition-colors shrink-0"
                aria-label="Remove item"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-6 bg-surface border border-border rounded-xl space-y-4"
        >
          <div className="flex justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="text-white">${subtotal.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">VAT (15%)</span>
            <span className="text-white">${vat.toFixed(2)} USD</span>
          </div>
          <div className="border-t border-border pt-4 flex justify-between">
            <span className="font-display font-bold text-white">
              Grand Total
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
          <Link
            href="/checkout"
            className="block w-full py-3.5 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors text-sm text-center mt-4"
          >
            Proceed to Checkout
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
