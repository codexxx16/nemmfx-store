'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Order } from '@/lib/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { 
  FileText, 
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  History,
  CheckCircle2,
  Clock
} from 'lucide-react';

const statusColors: Record<string, string> = {
  pending_payment: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  order_submitted: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  order_completed: 'bg-success/10 text-success border-success/20',
  fulfilled: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-danger/10 text-danger border-danger/20',
  refunded: 'bg-muted/10 text-muted border-muted/20',
};

const statusLabels: Record<string, string> = {
  pending_payment: 'Pending Payment',
  order_submitted: 'Order Submitted',
  order_completed: 'Order Completed',
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
      router.push('/auth/signin');
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
      let fetchedOrders: Order[] = [];
      if (res.ok) {
        const data = await res.json();
        fetchedOrders = data.orders || [];
      }

      // Sync with local storage for manual orders
      const localOrdersStr = localStorage.getItem('nemmfx_local_orders');
      if (localOrdersStr) {
        const localOrders = JSON.parse(localOrdersStr);
        const twoHours = 2 * 60 * 60 * 1000;
        const now = Date.now();

        const updatedLocalOrders = localOrders.map((order: any) => {
          if (order.status === 'order_submitted' && now - order.created_at > twoHours) {
            return { ...order, status: 'order_completed' };
          }
          return order;
        });

        // Update local storage if status changed
        if (JSON.stringify(updatedLocalOrders) !== localOrdersStr) {
          localStorage.setItem('nemmfx_local_orders', JSON.stringify(updatedLocalOrders));
        }

        // Merge with fetched orders, avoiding duplicates
        const combinedOrders = [...fetchedOrders];
        updatedLocalOrders.forEach((localOrder: any) => {
          if (!combinedOrders.find(o => o.id === localOrder.id)) {
            combinedOrders.push({
              id: localOrder.id,
              user_id: session?.user?.email || 'local',
              status: localOrder.status,
              total_usd: localOrder.total_usd,
              subtotal_usd: localOrder.subtotal_usd,
              vat_usd: localOrder.vat_usd,
              payment_method: localOrder.payment_method,
              created_at: new Date(localOrder.created_at).toISOString(),
              updated_at: new Date(localOrder.created_at).toISOString(),
              items: localOrder.items
            } as any);
          }
        });

        // Sort by date descending
        combinedOrders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setOrders(combinedOrders);
      } else {
        setOrders(fetchedOrders);
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
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-surface border border-border p-8 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-6">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={80}
                height={80}
                className="rounded-2xl border-2 border-border"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-accent/20 border-2 border-accent/20 flex items-center justify-center text-accent text-3xl font-bold">
                {session.user.name?.[0] || session.user.email?.[0] || 'U'}
              </div>
            )}
            <div>
              <h1 className="font-display text-3xl font-bold text-white tracking-tight">
                {session.user.name || 'User'}
              </h1>
              <p className="text-sm text-muted uppercase tracking-widest font-medium mt-1">{session.user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-xl text-[10px] text-muted uppercase tracking-widest font-bold">
            <ShieldCheck className="w-4 h-4 text-accent" />
            Verified Account
          </div>
        </motion.div>

        {/* Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <History className="w-6 h-6 text-accent" />
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-widest">
              Order History
            </h2>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-surface border border-border rounded-2xl border-dashed">
              <ShoppingBag className="w-12 h-12 mx-auto text-muted mb-4 opacity-20" />
              <p className="text-muted text-sm uppercase tracking-widest font-medium mb-6">No orders found yet</p>
              <Link
                href="/algovault"
                className="inline-block px-8 py-3 bg-accent text-background rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent/90 transition-all"
              >
                Browse AlgoVault
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="block p-6 bg-surface border border-border rounded-2xl hover:border-accent/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center text-muted group-hover:text-accent transition-colors border border-border">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-0.5">Order Reference</p>
                        <p className="text-sm font-bold text-white group-hover:text-accent transition-colors">
                          #{order.id.slice(0, 12).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-[10px] font-bold rounded-full border uppercase tracking-widest flex items-center gap-1.5 ${
                          statusColors[order.status] || statusColors.pending_payment
                        }`}
                      >
                        {order.status === 'order_submitted' && <Clock className="w-3 h-3" />}
                        {order.status === 'order_completed' && <CheckCircle2 className="w-3 h-3" />}
                        {statusLabels[order.status] || order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-widest border-t border-border/50 pt-4">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-muted">Date</span>
                        <span className="text-white">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-muted">Amount</span>
                        <span className="text-accent font-bold">
                          ${order.total_usd.toFixed(2)} USD
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Method</span>
                      <span className="text-white text-[10px] uppercase font-bold">{order.payment_method}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
