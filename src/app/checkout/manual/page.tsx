'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatLocalPrice } from '@/lib/currency';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faCopy, 
  faEye, 
  faUpload, 
  faCheckCircle,
  faBuildingColumns,
  faMobileScreenButton,
  faMobileButton
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function ManualPaymentContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get('method') || 'eft';
  const { items, total, clearCart } = useCart();
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
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('orderId', orderId);
      formData.append('method', method);
      formData.append(
        'items',
        JSON.stringify(
          items.map((i) => ({
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.price_usd,
          }))
        )
      );
      formData.append('total', total.toString());

      const res = await fetch('/api/orders', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      // Prepare WhatsApp Message
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
        `I have uploaded my proof of payment. Please verify and send my .ex5 files.`;

      const whatsappUrl = `https://wa.me/27747694008?text=${encodeURIComponent(whatsappText)}`;

      setUploaded(true);
      clearCart();
      toast.success('Proof of payment submitted! Redirecting to WhatsApp...');
      
      // Small delay before redirect
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 2000);

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
          <h1 className="font-display text-2xl font-bold text-white">No Items to Pay For</h1>
          <Link href="/algovault" className="inline-block px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm">
            Browse AlgoVault
          </Link>
        </div>
      </div>
    );
  }

  if (uploaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center space-y-6 p-8">
          <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-success" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Proof of Payment Submitted!</h1>
          <p className="text-muted leading-relaxed">
            We&apos;ll verify your payment and send your .ex5 file to your WhatsApp within 2 hours.
          </p>
          <p className="text-xs text-muted">Order ID: {orderId}</p>
          <div className="flex flex-col gap-3">
            <Link href="/account" className="px-6 py-2 bg-accent text-background rounded-lg font-bold text-sm">
              View My Orders
            </Link>
            <a href="https://wa.me/27747694008" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-success text-success rounded-lg font-medium text-sm hover:bg-success/10 transition-colors">
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
              Contact Us on WhatsApp
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
    eft: faBuildingColumns,
    mukuru: faMobileScreenButton,
    ecocash: faMobileButton,
    mobile_money: faMobileScreenButton,
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/checkout" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8">
          <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
          Back to payment methods
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 flex items-center justify-center bg-surface border border-border rounded-lg text-accent">
              <FontAwesomeIcon icon={methodIcons[method] || faBuildingColumns} />
            </div>
            <h1 className="font-display text-3xl font-bold text-white">
              {methodLabels[method] || 'Manual Payment'}
            </h1>
          </div>
          <p className="text-muted mb-8">
            Follow the instructions below to complete your payment.
          </p>

          {/* Order Summary */}
          <div className="p-5 bg-surface border border-border rounded-xl mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Total to Pay</span>
              <div className="text-right">
                <span className="font-display text-xl font-bold text-accent">${total.toFixed(2)} USD</span>
                {currency.code !== 'USD' && (
                  <p className="text-xs text-muted mt-1">~{formatLocalPrice(total, currency)}</p>
                )}
              </div>
            </div>
            <p className="text-xs text-muted">Reference: NemmFX-{orderId}</p>
          </div>

          {/* Payment Details by Method */}
          <div className="p-5 bg-surface border border-border rounded-xl mb-6">
            {method === 'eft' && (
              <div className="space-y-4">
                <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
                  Bank Transfer Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted">Bank</span>
                    <span className="text-white font-medium">Access Bank</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted">Account Number</span>
                    <button onClick={() => copyToClipboard('51643775328')} className="text-white font-medium hover:text-accent transition-colors flex items-center gap-2">
                      51643775328
                      <FontAwesomeIcon icon={faCopy} className="w-3 h-3 text-muted" />
                    </button>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted">Branch Code</span>
                    <span className="text-white font-medium">410506</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted">Reference</span>
                    <button onClick={() => copyToClipboard(`NemmFX-${orderId}`)} className="text-accent font-medium hover:text-accent/80 transition-colors flex items-center gap-2">
                      NemmFX-{orderId}
                      <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {method === 'ecocash' && (
              <div className="space-y-4">
                <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
                  EcoCash Payment
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted">Name</span>
                    <span className="text-white font-medium">Farai Mlauzi</span>
                  </div>
                  <div className="flex justify-between py-2 items-center">
                    <span className="text-muted">Number</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-white font-medium transition-all ${!ecoCashRevealed ? 'blur-mask' : ''}`}>
                        0779570306
                      </span>
                      {!ecoCashRevealed ? (
                        <button
                          onClick={() => setEcoCashRevealed(true)}
                          className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded text-xs font-medium hover:bg-accent/20 transition-colors flex items-center gap-2"
                        >
                          <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                          Reveal Details
                        </button>
                      ) : (
                        <button
                          onClick={() => copyToClipboard('0779570306')}
                          className="p-1 text-muted hover:text-accent transition-colors"
                        >
                          <FontAwesomeIcon icon={faCopy} className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {method === 'mukuru' && (
              <div className="space-y-4">
                <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
                  Mukuru Payment
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Send payment via Mukuru to the details provided on WhatsApp.
                  Contact support first to get Mukuru recipient details.
                </p>
                <a
                  href="https://wa.me/27747694008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success border border-success/20 rounded-lg text-sm font-medium hover:bg-success/20 transition-colors"
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                  WhatsApp: +27 74 769 4008
                </a>
              </div>
            )}

            {method === 'mobile_money' && (
              <div className="space-y-4">
                <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
                  Zimbabwe Mobile Money
                </h3>
                <div className="flex flex-wrap gap-3 py-2">
                  {['EcoCash', 'OneMoney', 'Telecash', 'InnBucks'].map((network) => (
                    <span key={network} className="px-3 py-1.5 bg-background border border-border rounded-full text-xs font-medium text-muted">
                      {network}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Send to the number provided on WhatsApp. Contact support for payment details.
                </p>
                <a
                  href="https://wa.me/27747694008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success border border-success/20 rounded-lg text-sm font-medium hover:bg-success/20 transition-colors"
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                  Contact Support
                </a>
              </div>
            )}
          </div>

          {/* POP Upload */}
          <div className="p-5 bg-surface border border-border rounded-xl space-y-4">
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider">
              Upload Proof of Payment
            </h3>
            <p className="text-xs text-muted">
              Upload a screenshot or PDF of your payment confirmation. Accepted formats: JPG, PNG, PDF (max 5MB).
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent/30 transition-colors">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="pop-upload"
              />
              <label htmlFor="pop-upload" className="cursor-pointer space-y-2">
                <FontAwesomeIcon icon={faUpload} className="w-10 h-10 mx-auto text-muted" />
                <p className="text-sm text-muted">
                  {selectedFile ? (
                    <span className="text-accent">{selectedFile.name}</span>
                  ) : (
                    <>Click to upload or drag and drop</>
                  )}
                </p>
              </label>
            </div>

            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="w-full py-3 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Submit Proof of Payment'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ManualPaymentPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
        <ManualPaymentContent />
      </Suspense>
    </ErrorBoundary>
  );
}
