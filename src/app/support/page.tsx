'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FAQ from '@/components/FAQ';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { 
  Mail, 
  Users, 
  Send,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { WhatsappIcon } from 'hugeicons-react';

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
              Support <span className="text-accent">Center</span>
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
              <div className="w-14 h-14 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <WhatsappIcon className="w-7 h-7 text-success" />
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
              <div className="w-14 h-14 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-accent" />
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
              <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-blue-500" />
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
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-accent" />
                <h2 className="font-display text-2xl font-bold text-white">
                  Send us a Message
                </h2>
              </div>
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
                  className="w-full py-3 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {sending ? <LoadingSpinner size="sm" /> : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-accent" />
                <h2 className="font-display text-2xl font-bold text-white">
                  Frequently Asked Questions
                </h2>
              </div>
              <FAQ items={supportFAQ} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
