'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
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

export default function AccountPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [authStatus, router]);

  useEffect(() => {
    if (session?.user) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch {
      console.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-bold">
              {session.user.name?.[0] || session.user.email?.[0] || 'U'}
            </div>
          )}
          <div>
            <h1 className="font-display text-2xl font-bold text-white">
              {session.user.name || 'User'}
            </h1>
            <p className="text-sm text-muted">{session.user.email}</p>
          </div>
        </motion.div>

        {/* Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display text-xl font-bold text-white mb-6">
            Order History
          </h2>

          {loading ? (
            <LoadingSpinner className="py-12" />
          ) : orders.length === 0 ? (
            <div className="text-center py-16 bg-surface border border-border rounded-xl">
              <svg
                className="w-12 h-12 mx-auto text-muted mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-muted mb-4">No orders yet</p>
              <Link
                href="/algovault"
                className="inline-block px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm"
              >
                Browse AlgoVault
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="block p-5 bg-surface border border-border rounded-xl hover:border-accent/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white group-hover:text-accent transition-colors">
                      Order #{order.id.slice(0, 8)}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${
                        statusColors[order.status] || statusColors.pending_payment
                      }`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="text-white font-medium">
                      ${order.total_usd.toFixed(2)} USD
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted capitalize">
                    Payment: {order.payment_method.replace('_', ' ')}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
