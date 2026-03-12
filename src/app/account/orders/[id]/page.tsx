'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Order } from '@/lib/types';
import LoadingSpinner from '@/components/LoadingSpinner';

const statusColors: Record<string, string> = {
  pending_payment: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  pending_verification: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  fulfilled: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-danger/10 text-danger border-danger/20',
  refunded: 'bg-muted/10 text-muted border-muted/20',
};

const statusLabels: Record<string, string> = {
  pending_payment: 'Pending Payment',
  pending_verification: 'Pending Verification',
  fulfilled: 'Fulfilled',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [authStatus, router]);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders?id=${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order || null);
      }
    } catch {
      console.error('Failed to fetch order');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (session?.user && orderId) {
      fetchOrder();
    }
  }, [session, orderId, fetchOrder]);

  if (authStatus === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-white">Order Not Found</h1>
          <Link href="/account" className="inline-block px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm">
            Back to Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/account" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Account
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-2xl font-bold text-white">
              Order #{order.id.slice(0, 8)}
            </h1>
            <span className={`px-4 py-1.5 text-xs font-medium rounded-full border ${statusColors[order.status] || statusColors.pending_payment}`}>
              {statusLabels[order.status] || order.status}
            </span>
          </div>

          {/* Order Info */}
          <div className="p-5 bg-surface border border-border rounded-xl mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted">Date</p>
                <p className="text-white font-medium">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted">Payment Method</p>
                <p className="text-white font-medium capitalize">
                  {order.payment_method.replace('_', ' ')}
                </p>
              </div>
              {order.payment_ref && (
                <div>
                  <p className="text-muted">Payment Reference</p>
                  <p className="text-white font-medium">{order.payment_ref}</p>
                </div>
              )}
              {order.fulfilled_at && (
                <div>
                  <p className="text-muted">Fulfilled</p>
                  <p className="text-white font-medium">
                    {new Date(order.fulfilled_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          {order.items && order.items.length > 0 && (
            <div className="p-5 bg-surface border border-border rounded-xl mb-6">
              <h2 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Items
              </h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm text-white">{item.product?.name || `Product ${item.product_id}`}</p>
                      <p className="text-xs text-muted">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-white">
                      ${(item.unit_price_usd * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totals */}
          <div className="p-5 bg-surface border border-border rounded-xl space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-white">${order.subtotal_usd.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">VAT (15%)</span>
              <span className="text-white">${order.vat_usd.toFixed(2)} USD</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-display font-bold text-white">Total</span>
              <span className="font-display text-xl font-bold text-accent">
                ${order.total_usd.toFixed(2)} USD
              </span>
            </div>
          </div>

          {order.notes && (
            <div className="mt-6 p-4 bg-surface border border-border rounded-xl">
              <p className="text-sm text-muted">{order.notes}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
