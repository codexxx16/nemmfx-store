'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatLocalPrice } from '@/lib/currency';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faPaypal, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function PayPalCheckoutPage() {
  const { items, subtotal, vat, total } = useCart();
  const { currency } = useCurrency();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (items.length === 0 && status !== 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-white">No Items to Pay For</h1>
          <Link href="/algovault" className="inline-block px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm">
            Browse AlgoVault
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center space-y-6 p-8"
        >
          <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-success" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Payment Confirmed!</h1>
          <p className="text-muted leading-relaxed">
            Our team will contact you within 1 hour on WhatsApp with your licensed .ex5 file.
            Please have your MT5 account number ready.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/account" className="px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm">
              View My Orders
            </Link>
            <a
              href="https://wa.me/27747694008"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-success text-success rounded-lg font-medium text-sm hover:bg-success/10 transition-colors"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
              Contact Us on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  const handlePayPalPayment = async () => {
    setStatus('processing');
    setErrorMessage('');

    try {
      const orderRes = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.product.price_usd,
          })),
          total_usd: total,
          subtotal_usd: subtotal,
          vat_usd: vat,
        }),
      });

      if (!orderRes.ok) {
        throw new Error('Failed to create PayPal order');
      }

      const orderData = await orderRes.json();

      if (orderData.approvalUrl) {
        window.location.href = orderData.approvalUrl;
      } else {
        throw new Error('No approval URL returned');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/checkout" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8">
            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
            Back to payment methods
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl font-bold text-white mb-8">PayPal Payment</h1>

            {/* Order Summary */}
            <div className="p-5 bg-surface border border-border rounded-xl mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">VAT (15%)</span>
                <span className="text-white">${vat.toFixed(2)} USD</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-display font-bold text-white">Total</span>
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-accent">${total.toFixed(2)} USD</p>
                  {currency.code !== 'USD' && (
                    <p className="text-xs text-muted mt-1">~{formatLocalPrice(total, currency)}</p>
                  )}
                </div>
              </div>
            </div>

            {/* PayPal Button */}
            <div className="space-y-4">
              {status === 'error' && (
                <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg text-sm text-danger flex items-center gap-3">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errorMessage}
                </div>
              )}

              <button
                onClick={handlePayPalPayment}
                disabled={status === 'processing'}
                className="w-full py-4 bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {status === 'processing' ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaypal} className="text-xl" />
                    Pay with PayPal — ${total.toFixed(2)} USD
                  </>
                )}
              </button>

              <p className="text-xs text-muted text-center">
                Your payment will be securely processed and verified server-side before order confirmation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
