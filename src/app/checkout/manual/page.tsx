'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatLocalPrice } from '@/lib/currency';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { 
  ChevronLeft, 
  Copy, 
  Eye, 
  Upload, 
  CheckCircle2,
  Building2,
  Smartphone,
  MessageSquare,
  FileText
} from 'lucide-react';
import { WhatsappIcon } from 'hugeicons-react';

function ManualPaymentContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get('method') || 'eft';
  const { items, total, subtotal, vat, clearCart } = useCart();
  const { currency } = useCurrency();
  const [ecoCashRevealed, setEcoCashRevealed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const orderId = `NFX-${Date.now().toString(36).toUpperCase()}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File too large. Maximum 5MB allowed.');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Only JPG, PNG, and PDF are accepted.');
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);

    try {
      const methodLabels: Record<string, string> = {
        eft: 'EFT (Access Bank)',
        mukuru: 'Mukuru',
        ecocash: 'EcoCash',
        mobile_money: 'Zimbabwe Mobile Money',
      };

      const itemsList = items.map(i => `- ${i.product.name} (x${i.quantity})`).join('\n');
      const whatsappText = `*New Order: ${orderId}*\n\n` +
        `*Items:*\n${itemsList}\n\n` +
        `*Payment Method:* ${methodLabels[method] || method}\n` +
        `*Amount Paid:* $${total.toFixed(2)} USD\n` +
        `*Local Currency:* ${formatLocalPrice(total, currency)}\n\n` +
        `*Note:* I have attached my Proof of Payment (${selectedFile.name}) to this message. Please verify and send my .ex5 files.`;

      const whatsappUrl = `https://wa.me/263787399652?text=${encodeURIComponent(whatsappText)}`;

      // Save to local storage for status tracking
      const localOrders = JSON.parse(localStorage.getItem('nemmfx_local_orders') || '[]');
      localOrders.push({
        id: orderId,
        status: 'order_submitted',
        total_usd: total,
        subtotal_usd: subtotal,
        vat_usd: vat,
        payment_method: methodLabels[method] || method,
        created_at: Date.now(),
        items: items.map(i => ({
          product_id: i.product.id,
          product_name: i.product.name,
          quantity: i.quantity,
          unit_price: i.product.price_usd
        }))
      });
      localStorage.setItem('nemmfx_local_orders', JSON.stringify(localOrders));

      setTimeout(() => {
        setUploaded(true);
        clearCart();
        toast.success('Proof of payment submitted! Redirecting to WhatsApp...');
        window.open(whatsappUrl, '_blank');
      }, 1500);

    } catch {
      toast.error('Upload failed. Please try again or contact support.');
    } finally {
      setUploading(false);
    }
  };

  if (items.length === 0 && !uploaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-white uppercase tracking-widest">No Items to Pay For</h1>
          <Link href="/algovault" className="inline-block px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm uppercase tracking-widest">
            Browse AlgoVault
          </Link>
        </div>
      </div>
    );
  }

  if (uploaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center space-y-6 p-8 bg-surface border border-border rounded-2xl shadow-xl">
          <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white uppercase tracking-widest">Payment Submitted!</h1>
          <p className="text-muted text-sm leading-relaxed">
            We&apos;ll verify your payment and send your .ex5 file to your WhatsApp within 2 hours.
          </p>
          <p className="text-xs text-accent font-bold uppercase tracking-widest animate-pulse">
            Don't forget to attach your file in WhatsApp!
          </p>
          <div className="p-3 bg-background border border-border rounded-xl text-xs text-muted uppercase tracking-widest font-medium">
            Order ID: {orderId}
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/account" className="px-6 py-3 bg-accent text-background rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent/90 transition-all">
              View My Orders
            </Link>
            <a href="https://wa.me/263787399652" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-success text-success rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-success/10 transition-all flex items-center justify-center gap-2">
              <WhatsappIcon className="w-4 h-4" />
              Contact on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  const methodLabels: Record<string, string> = {
    eft: 'EFT (Access Bank)',
    mukuru: 'Mukuru',
    ecocash: 'EcoCash',
    mobile_money: 'Zimbabwe Mobile Money',
  };

  const methodIcons: Record<string, any> = {
    eft: Building2,
    mukuru: Smartphone,
    ecocash: Smartphone,
    mobile_money: Smartphone,
  };

  const MethodIcon = methodIcons[method] || Building2;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/checkout" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to payment methods
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 flex items-center justify-center bg-surface border border-border rounded-xl text-accent">
              <MethodIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-white uppercase tracking-tight">
                {methodLabels[method] || 'Manual Payment'}
              </h1>
              <p className="text-xs text-muted uppercase tracking-widest font-medium">
                Follow instructions below
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-8">
            {/* Order Summary */}
            <div className="p-6 bg-surface border border-border rounded-2xl space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-xs text-muted uppercase tracking-widest font-medium">Total to Pay</p>
                  <p className="font-display text-3xl font-bold text-accent">${total.toFixed(2)} USD</p>
                </div>
                {currency.code !== 'USD' && (
                  <p className="text-sm text-muted font-medium mb-1">~{formatLocalPrice(total, currency)}</p>
                )}
              </div>
              <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted uppercase tracking-widest font-medium">
                <span>Reference ID</span>
                <button onClick={() => copyToClipboard(`NemmFX-${orderId}`)} className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
                  NemmFX-{orderId}
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Payment Details */}
            <div className="p-6 bg-surface border border-border rounded-2xl space-y-6">
              <div className="flex items-center gap-2 text-white">
                <FileText className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Payment Instructions</h3>
              </div>

              {method === 'eft' && (
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted">Bank</span>
                    <span className="text-white font-medium">Access Bank</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted">Account Number</span>
                    <button onClick={() => copyToClipboard('51643775328')} className="text-white font-medium hover:text-accent transition-colors flex items-center gap-2">
                      51643775328
                      <Copy className="w-3 h-3 text-muted" />
                    </button>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted">Branch Code</span>
                    <span className="text-white font-medium">410506</span>
                  </div>
                </div>
              )}

              {method === 'ecocash' && (
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted">Name</span>
                    <span className="text-white font-medium">Farai Mlauzi</span>
                  </div>
                  <div className="flex justify-between py-2 items-center">
                    <span className="text-muted">Number</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-white font-medium ${!ecoCashRevealed ? 'blur-sm' : ''}`}>
                        0779570306
                      </span>
                      {!ecoCashRevealed ? (
                        <button
                          onClick={() => setEcoCashRevealed(true)}
                          className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-accent/20 transition-colors flex items-center gap-2"
                        >
                          <Eye className="w-3 h-3" />
                          Reveal
                        </button>
                      ) : (
                        <button onClick={() => copyToClipboard('0779570306')} className="text-accent hover:text-accent/80 transition-colors">
                          <Copy className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {(method === 'mukuru' || method === 'mobile_money') && (
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted">Recipient Name</span>
                    <span className="text-white font-medium">Charless Netumbare</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted">WhatsApp Number</span>
                    <button onClick={() => copyToClipboard('+27 74 769 4008')} className="text-white font-medium hover:text-accent transition-colors flex items-center gap-2">
                      +27 74 769 4008
                      <Copy className="w-3 h-3 text-muted" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Upload POP */}
            <div className="p-6 bg-surface border border-border rounded-2xl space-y-6">
              <div className="flex items-center gap-2 text-white">
                <Upload className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Upload Proof of Payment</h3>
              </div>

              <div className="relative group">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept="image/*,.pdf"
                />
                <div className={`p-10 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 transition-all ${
                  selectedFile ? 'border-success/50 bg-success/5' : 'border-border group-hover:border-accent/30 bg-background/30'
                }`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    selectedFile ? 'bg-success/10 text-success' : 'bg-surface text-muted'
                  }`}>
                    {selectedFile ? <CheckCircle2 className="w-7 h-7" /> : <Upload className="w-7 h-7" />}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white uppercase tracking-widest">
                      {selectedFile ? selectedFile.name : 'Click to Upload POP'}
                    </p>
                    <p className="text-[10px] text-muted mt-2 uppercase tracking-tighter">
                      JPG, PNG or PDF (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={uploading || !selectedFile}
                className="w-full py-4 bg-accent text-background rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {uploading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Submit & Open WhatsApp
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ManualPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    }>
      <ManualPaymentContent />
    </Suspense>
  );
}
