# NemmFX — Professional Forex Trading Tools Store

NemmFX is a full-stack e-commerce web store for selling forex trading tools, Expert Advisors (EAs), and algorithmic trading products. Built with Next.js 14, TypeScript, and Tailwind CSS.

**Live:** [nemmfx.vercel.app](https://nemmfx.vercel.app)
**Developer:** [CharlessDev](https://charless-dev.vercel.app) | Charless Netumbare

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + custom CSS variables
- **Animations:** Framer Motion
- **Auth:** NextAuth.js (Google, Microsoft, Apple, Email magic link)
- **Database:** Supabase (PostgreSQL)
- **File Storage:** Supabase Storage (proof of payment uploads)
- **Payments:** PayPal (server-side verified) + manual methods (EFT, EcoCash, Mukuru, Mobile Money)
- **Deployment:** Vercel

## Features

- Multi-page e-commerce store with full routing
- Dark, premium finance-themed design (Orbitron + Space Grotesk fonts)
- Product catalog (AlgoVault) with paid and free trading tools
- Shopping cart with VAT calculation (15% Zimbabwe rate)
- Currency auto-detection via IP geolocation (USD, ZAR, ZWL, GBP, EUR)
- PayPal integration with server-side payment verification
- Manual payment methods with proof of payment upload
- EcoCash details masked/blurred by default for privacy
- User accounts with order history
- Contact form and WhatsApp support integration
- Fully responsive (mobile-first design)
- SEO optimized with sitemap and meta tags
- Error boundaries on payment flows
- Toast notifications for all user actions

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, featured products, about teaser |
| `/algovault` | All bots/EAs for sale + free tools section |
| `/algovault/[slug]` | Individual product detail with features & FAQ |
| `/cart` | Cart with quantity controls, VAT breakdown |
| `/checkout` | Payment method selection + order summary |
| `/checkout/paypal` | PayPal payment flow |
| `/checkout/manual` | Manual payment (EFT, EcoCash, Mukuru, Mobile Money) |
| `/account` | User dashboard with order history |
| `/account/orders/[id]` | Individual order detail |
| `/support` | WhatsApp, email, contact form, FAQ |
| `/about` | About NemmFX, developer, nemm ecosystem |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/codexxx16/NemmFX.git
cd NemmFX
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

```
NEXTAUTH_SECRET=            # Random secret for NextAuth JWT
NEXTAUTH_URL=               # Your app URL (http://localhost:3000 for dev)
GOOGLE_CLIENT_ID=           # Google OAuth client ID
GOOGLE_CLIENT_SECRET=       # Google OAuth client secret
MICROSOFT_CLIENT_ID=        # Microsoft OAuth client ID
MICROSOFT_CLIENT_SECRET=    # Microsoft OAuth client secret
APPLE_CLIENT_ID=            # Apple Sign In client ID
APPLE_CLIENT_SECRET=        # Apple Sign In client secret
NEXT_PUBLIC_SUPABASE_URL=   # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase anon key
SUPABASE_SERVICE_ROLE_KEY=  # Supabase service role key
PAYPAL_CLIENT_ID=           # PayPal API client ID
PAYPAL_CLIENT_SECRET=       # PayPal API client secret
PAYPAL_WEBHOOK_ID=          # PayPal webhook ID
NEXT_PUBLIC_PAYPAL_CLIENT_ID= # PayPal client ID (public)
TWILIO_ACCOUNT_SID=         # Twilio account SID
TWILIO_AUTH_TOKEN=          # Twilio auth token
TWILIO_WHATSAPP_FROM=       # Twilio WhatsApp sender number
DEVELOPER_WHATSAPP=         # Developer WhatsApp number
RESEND_API_KEY=             # Resend API key for email
NEXT_PUBLIC_APP_URL=        # Public app URL
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

## Database Schema (Supabase)

```sql
-- Users (synced by NextAuth on sign in)
users: id, email, name, image, created_at

-- Products
products: id, slug, name, description, price_usd, image_url, version, tag, is_active, is_free, created_at

-- Orders
orders: id, user_id, status, payment_method, payment_ref, paypal_transaction_id,
        subtotal_usd, vat_usd, total_usd, pop_file_url, notes, created_at, fulfilled_at

-- Order Items
order_items: id, order_id, product_id, quantity, unit_price_usd

-- Status values: pending_payment | pending_verification | fulfilled | cancelled | refunded
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy — Vercel auto-detects Next.js and builds

---

From [nemm](https://nemm-co.vercel.app)
