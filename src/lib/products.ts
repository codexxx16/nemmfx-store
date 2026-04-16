import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    slug: 'money-maker-standard',
    name: 'Money Maker v1.2 — Standard Edition',
    description:
      'A high-precision algorithmic execution engine optimized for volatile market conditions. Multi-asset price action analysis with 14+ candlestick pattern recognition, higher timeframe trend filtering, and session-aware execution logic.',
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
      'Premium visual analytics platform with real-time chart markup: EMA ribbon analysis, auto-drawn support/resistance zones, entry/SL/TP visualization, and risk-to-reward metrics. Professional-grade visual feedback for strategy optimization.',
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
  {
    id: '3',
    slug: 'xauusd-scalper-pro',
    name: 'XAUUSD Scalper v1.0 — Pro Edition',
    description:
      'High-frequency gold scalping engine engineered for 24/7 market participation. Implements a "Quick In, Grab Profits, Quick Out" strategy with sub-millisecond execution logic and adaptive volatility filters.',
    price_usd: 29.0,
    image_url: '/products/paid-bot.jpg',
    version: 'v1.0',
    tag: 'Pro',
    is_active: true,
    is_free: false,
    created_at: '2026-04-17T00:00:00Z',
    features: [
      '24/7 automated gold scalping',
      'High-frequency execution logic',
      'Adaptive volatility filters',
      'Dynamic profit-taking algorithms',
      'Advanced risk management',
      'Optimized for XAUUSD liquidity',
    ],
    detailed_description:
      'The XAUUSD Scalper Pro Edition is a specialized algorithmic engine designed exclusively for the gold market. Unlike the free version, the Pro Edition operates 24/7 without trade limitations, utilizing a sophisticated scalping strategy that capitalizes on minor price fluctuations. It features advanced slippage protection and real-time spread monitoring to ensure optimal entry and exit points in the highly volatile gold environment.',
  },
];

export const freeProducts: Product[] = [
  {
    id: 'free-1',
    slug: 'xauusd-scalper-lite',
    name: 'XAUUSD Scalper v1.0 — Lite Edition (Free)',
    description:
      'Entry-level gold scalping bot with limited daily execution. Features a high-precision entry algorithm that resets at midnight. Ideal for evaluating the XAUUSD scalping strategy.',
    price_usd: 0,
    image_url: '/products/paid-bot.jpg',
    version: 'v1.0',
    tag: 'Free',
    is_active: true,
    is_free: true,
    created_at: '2026-04-17T00:00:00Z',
    mediafireUrl: 'https://www.mediafire.com/file/jlfvongecmbxe6l/charless_xauusd_scalper_v1-1.ex5/file',
  },
  {
    id: 'free-2',
    slug: 'algolite-indicator',
    name: 'AlgoLite v1.0 — EURUSD Indicator (Free)',
    description:
      'Specialized technical analysis indicator optimized exclusively for the EURUSD pair. Provides high-authority market structure insights and trend-exhaustion signals for manual strategy enhancement.',
    price_usd: 0,
    image_url: '/products/paid-bot-premium.jpg',
    version: 'v1.0',
    tag: 'Free',
    is_active: true,
    is_free: true,
    created_at: '2026-04-17T00:00:00Z',
    mediafireUrl: 'https://www.mediafire.com/file/ssxhfdfttkkh892/algolite_v1.ex5/file',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return [...products, ...freeProducts].find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string): Product[] {
  return products.filter((p) => p.slug !== currentSlug && !p.is_free);
}
