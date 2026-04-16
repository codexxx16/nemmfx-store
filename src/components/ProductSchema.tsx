import { Product } from '@/lib/types';

interface ProductSchemaProps {
  product: Product;
  baseUrl?: string;
}

export default function ProductSchema({ product, baseUrl = 'https://nemmfx-store.vercel.app' }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${baseUrl}${product.image_url}`,
    brand: {
      '@type': 'Brand',
      name: 'NemmFX',
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/algovault/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price_usd.toString(),
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
