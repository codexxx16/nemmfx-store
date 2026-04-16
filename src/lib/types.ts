export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_usd: number;
  image_url: string;
  version: string;
  tag: string;
  is_active: boolean;
  is_free: boolean;
  created_at: string;
  features?: string[];
  detailed_description?: string;
  mediafireUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_ref: string | null;
  paypal_transaction_id: string | null;
  subtotal_usd: number;
  vat_usd: number;
  total_usd: number;
  pop_file_url: string | null;
  notes: string | null;
  created_at: string;
  fulfilled_at: string | null;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price_usd: number;
  product?: Product;
}

export type OrderStatus =
  | 'pending_payment'
  | 'pending_verification'
  | 'fulfilled'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod =
  | 'paypal'
  | 'eft'
  | 'mukuru'
  | 'ecocash'
  | 'mobile_money'
  | 'whatsapp';

export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

export interface GeoLocation {
  country: string;
  country_code: string;
  currency: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  image: string | null;
  created_at: string;
}
