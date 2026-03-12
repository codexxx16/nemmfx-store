import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    slug: 'money-maker-standard',
    name: 'Money Maker v1.2 — Standard Edition',
    description:
      'A professional MT5 Expert Advisor with multi-asset price action trading, 14+ candlestick patterns, HTF trend filter, session-aware execution, dynamic lot sizing, and trailing stop. Account-locked per license.',
    price_usd: 21.0,
    image_url: '/products/paid-bot.jpg',
    version: 'v1.2',
    tag: 'Best Seller',
    is_active: true,
    is_free: false,
    created_at: '2026-01-01T00:00:00Z',
    features: [
      '14+ candlestick pattern recognition',
      'Higher timeframe trend filter',
      'Session-aware trade execution',
      'Dynamic lot sizing based on account balance',
      'Trailing stop loss system',
      'Multi-asset support (Forex, Gold, Indices)',
      'Risk management with configurable stop loss and take profit',
      'Account-locked licensing for security',
      'Optimized for MT5 platform',
      'Low latency trade execution',
    ],
    detailed_description:
      'Money Maker v1.2 Standard Edition is a fully automated Expert Advisor built for the MetaTrader 5 platform. It uses advanced price action analysis with over 14 candlestick pattern recognitions to identify high-probability trade setups. The EA incorporates a higher timeframe trend filter to ensure trades align with the dominant market direction, and session-aware execution to avoid low-liquidity periods. With dynamic lot sizing, the EA automatically adjusts position sizes based on your account balance and risk tolerance. The built-in trailing stop system locks in profits as trades move in your favor.',
  },
  {
    id: '2',
    slug: 'money-maker-indicator',
    name: 'Money Maker v1.2 — Indicator Edition (Premium)',
    description:
      'Everything in Standard + full visual indicator system: EMA ribbons, S/R zones drawn on chart, entry/SL/TP boxes, pattern labels, trend direction labels, trailing stop line, and RR ratio — all drawn live like a real trader. Customisable colors. Account-locked per license.',
    price_usd: 25.0,
    image_url: '/products/paid-bot-premium.jpg',
    version: 'v1.2',
    tag: 'Premium',
    is_active: true,
    is_free: false,
    created_at: '2026-01-01T00:00:00Z',
    features: [
      'All Standard Edition features included',
      'EMA ribbon visualization on chart',
      'Support & Resistance zones auto-drawn',
      'Entry, Stop Loss, and Take Profit visual boxes',
      'Candlestick pattern labels on chart',
      'Trend direction labels and arrows',
      'Trailing stop line visualization',
      'Risk-to-Reward ratio display',
      'Fully customizable colors and styles',
      'Real-time visual updates as market moves',
      'Professional chart markup like manual traders',
      'Account-locked licensing for security',
    ],
    detailed_description:
      'Money Maker v1.2 Indicator Edition is the premium version that includes everything in the Standard Edition plus a comprehensive visual indicator system. Watch the EA trade like a professional human trader with EMA ribbons showing trend direction, automatically drawn Support and Resistance zones, visual entry/SL/TP boxes for every trade, pattern labels identifying exactly which candlestick pattern triggered the trade, and a trailing stop line that moves in real-time. Every visual element is fully customizable with your preferred colors and styles. This edition is perfect for traders who want to learn from the EA while it trades.',
  },
];

export const freeProducts: Product[] = [
  {
    id: 'free-1',
    slug: 'money-maker-lite',
    name: 'Money Maker Lite — Basic Signal Bot (Free)',
    description:
      'A lightweight signal bot with basic trend detection and entry alerts. Perfect for beginners exploring algorithmic trading.',
    price_usd: 0,
    image_url: '/products/paid-bot.jpg',
    version: 'v1.0',
    tag: 'Free',
    is_active: true,
    is_free: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'free-2',
    slug: 'nemmfx-trend-scanner',
    name: 'NemmFX Trend Scanner — Free Edition',
    description:
      'Scans multiple pairs for trending conditions using moving average crossovers. Basic alerts and dashboard view included.',
    price_usd: 0,
    image_url: '/products/paid-bot-premium.jpg',
    version: 'v1.0',
    tag: 'Free',
    is_active: true,
    is_free: true,
    created_at: '2026-01-01T00:00:00Z',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string): Product[] {
  return products.filter((p) => p.slug !== currentSlug && !p.is_free);
}
