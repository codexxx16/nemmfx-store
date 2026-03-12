'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FAQ from '@/components/FAQ';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';

const supportFAQ = [
  {
    question: 'How long does delivery take after payment?',
    answer:
      'For PayPal payments, our team will contact you within 1 hour on WhatsApp with your licensed .ex5 file. For manual payment methods, delivery takes up to 2 hours after proof of payment verification.',
  },
  {
    question: 'What MT5 account number do I need?',
    answer:
      'You need the account number from your MetaTrader 5 trading account. This is the number shown in the Navigator panel of MT5 under your broker. The EA license will be bound to this specific account.',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'Since our products are digital licenses that cannot be returned, we generally do not offer refunds. However, if you experience technical issues, contact us on WhatsApp and we will work with you to resolve any problems.',
  },
  {
    question: 'Do you offer multi-account discounts?',
    answer:
      'Yes! Contact us on WhatsApp for custom pricing on multiple licenses. We offer discounts for 3+ licenses purchased together.',
  },
  {
    question: 'Is the EA compatible with all brokers?',
    answer:
      'The Money Maker EA works with any broker that supports MetaTrader 5. It has been tested with major brokers including IC Markets, Exness, XM, and others.',
  },
  {
    question: 'How do I install the EA on MT5?',
    answer:
      'After receiving your .ex5 file, copy it to the Experts folder in your MT5 data directory (File > Open Data Folder > MQL5 > Experts). Restart MT5, then drag the EA onto your desired chart. Detailed setup instructions will be provided with your purchase.',
  },
];

export default function SupportPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Message sent! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try WhatsApp instead.');
      }
    } catch {
      toast.error('Failed to send message. Please try WhatsApp instead.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Support
            </h1>
            <p className="text-muted max-w-xl mx-auto">
              Need help? We are here to assist you with any questions about our
              trading tools and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.a
              href="https://wa.me/27747694008"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-surface border border-border rounded-xl hover:border-success/30 transition-all text-center group"
            >
              <div className="w-14 h-14 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-success" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-white group-hover:text-success transition-colors mb-2">
                Chat on WhatsApp
              </h3>
              <p className="text-sm text-muted">
                Get instant support from our team
              </p>
            </motion.a>

            <motion.a
              href="https://chat.whatsapp.com/EoCJzxKYeQ7BQenB8cxEvH"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-surface border border-border rounded-xl hover:border-accent/30 transition-all text-center group"
            >
              <div className="w-14 h-14 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-white group-hover:text-accent transition-colors mb-2">
                Join Our Community
              </h3>
              <p className="text-sm text-muted">
                Connect with other traders in our group
              </p>
            </motion.a>

            <motion.a
              href="mailto:codexxxnull@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-surface border border-border rounded-xl hover:border-blue-500/30 transition-all text-center group"
            >
              <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-white group-hover:text-blue-500 transition-colors mb-2">
                Email Us
              </h3>
              <p className="text-sm text-muted">codexxxnull@gmail.com</p>
            </motion.a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-white mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white placeholder-muted/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white placeholder-muted/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-white placeholder-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending ? <LoadingSpinner size="sm" /> : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
              <FAQ items={supportFAQ} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
