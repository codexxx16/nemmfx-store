'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatLocalPrice } from '@/lib/currency';
import LoadingSpinner from '@/components/LoadingSpinner';
import { 
  ChevronLeft, 
  CheckCircle2, 
  AlertTriangle,
  CreditCard,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { WhatsappIcon } from 'hugeicons-react';

function PayPalCheckoutContent() {
  const { items, subtotal, vat, total } = useCart();
  const { currency } = useCurrency();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (items.length === 0 && status !== 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-white uppercase tracking-widest">No Items to Pay For</h1>
          <Link href="/algovault" className="inline-block px-8 py-3 bg-accent text-background rounded-xl font-bold text-xs uppercase tracking-widest">
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
          className="max-w-md mx-auto text-center space-y-6 p-8 bg-surface border border-border rounded-2xl shadow-xl"
        >
          <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white uppercase tracking-widest">Payment Confirmed!</h1>
          <p className="text-muted text-sm leading-relaxed">
            Our team will contact you within 1 hour on WhatsApp with your licensed .ex5 file.
            Please have your MT5 account number ready.
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/account" className="px-6 py-3 bg-accent text-background rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent/90 transition-all">
              View My Orders
            </Link>
            <a
              href="https://wa.me/27747694008"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-success text-success rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-success/10 transition-all flex items-center justify-center gap-2"
            >
              <WhatsappIcon className="w-4 h-4" />
              Contact on WhatsApp
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
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/checkout" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to payment methods
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface border border-border rounded-2xl p-8 shadow-xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-[#0070ba]/10 rounded-xl border border-[#0070ba]/20">
              <CreditCard className="w-6 h-6 text-[#0070ba]" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-white uppercase tracking-tight">PayPal Checkout</h1>
              <p className="text-[10px] text-muted uppercase tracking-widest font-bold">Secure Payment Portal</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 bg-background/50 border border-border rounded-2xl space-y-4">
            <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
              <span className="text-muted">Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
              <span className="text-muted">VAT (15%)</span>
              <span className="text-white">${vat.toFixed(2)} USD</span>
            </div>
            <div className="border-t border-border/50 pt-4 flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Total Amount</span>
                <p className="font-display text-3xl font-bold text-accent">${total.toFixed(2)} USD</p>
              </div>
              {currency.code !== 'USD' && (
                <p className="text-xs text-muted font-bold mb-1">~{formatLocalPrice(total, currency)}</p>
              )}
            </div>
          </div>

          {/* PayPal Button */}
          <div className="space-y-6">
            {status === 'error' && (
              <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl text-xs text-danger flex items-center gap-3 font-bold uppercase tracking-widest">
                <AlertTriangle className="w-4 h-4" />
                {errorMessage}
              </div>
            )}

            <button
              onClick={handlePayPalPayment}
              disabled={status === 'processing'}
              className="w-full py-4 bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-[#0070ba]/20 uppercase text-xs tracking-widest"
            >
              {status === 'processing' ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay with PayPal — ${total.toFixed(2)} USD
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-muted uppercase tracking-widest font-bold">
              <ShieldCheck className="w-3 h-3 text-success" />
              Secure encrypted transaction
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PayPalCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <PayPalCheckoutContent />
    </Suspense>
  );
}
