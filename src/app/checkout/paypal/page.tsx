'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatLocalPrice } from '@/lib/currency';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';

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
            <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
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
                <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg text-sm text-danger">
                  {errorMessage}
                </div>
              )}

              <button
                onClick={handlePayPalPayment}
                disabled={status === 'processing'}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {status === 'processing' ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788l.038-.2.73-4.627.047-.256a.96.96 0 0 1 .946-.806h.596c3.86 0 6.881-1.567 7.764-6.101.37-1.905.18-3.497-.769-4.613a3.834 3.834 0 0 0-.245-.233z"/>
                    </svg>
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
