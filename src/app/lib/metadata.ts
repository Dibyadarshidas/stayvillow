import { Metadata } from 'next';

// Base metadata that applies to all pages
export const baseMetadata: Metadata = {
  metadataBase: new URL('https://stayvillow.com'),
  title: {
    template: '%s | Stayvillow',
    default: 'Stayvillow | Premium Vacation Rentals in India',
  },
  description: 'Discover luxury villas, unique stays, and authentic experiences across India. Find your perfect getaway with Stayvillow.',
  keywords: ['vacation rentals', 'luxury villas', 'India travel', 'holiday homes', 'premium stays'],
  creator: 'Stayvillow Team',
  publisher: 'Stayvillow',
  authors: [{ name: 'Stayvillow Team' }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Stayvillow',
    locale: 'en_IN',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Stayvillow - Premium Vacation Rentals in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@stayvillow',
    site: '@stayvillow',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/icons/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/icons/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/icons/apple-touch-icon-precomposed.png',
      },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: 'https://stayvillow.com',
    languages: {
      'en-US': 'https://stayvillow.com/en-US',
      'hi-IN': 'https://stayvillow.com/hi-IN',
    },
  },
};

// Generate dynamic metadata for property pages
export function generatePropertyMetadata(property: any): Metadata {
  if (!property) return {};
  
  const title = `${property.title} in ${property.location}`;
  const description = property.description?.substring(0, 160) || 
    `Book this beautiful ${property.propertyType} in ${property.location}. Features ${property.details.bedrooms} bedrooms, ${property.details.bathrooms} bathrooms. Perfect for ${property.details.maxGuests} guests.`;
  
  const amenitiesKeywords = property.amenities?.join(', ') || '';
  const locationKeywords = `${property.location.split(',')[0]} vacation rental, ${property.location} accommodation`;
  
  return {
    title: title,
    description: description,
    keywords: [
      property.propertyType, 
      locationKeywords, 
      amenitiesKeywords,
      'vacation rental',
      'holiday home',
    ].filter(Boolean),
    openGraph: {
      title: title,
      description: description,
      url: `https://stayvillow.com/property/${property.id}`,
      type: 'website',
      images: property.images?.map((image: any) => ({
        url: image.url,
        width: 1200,
        height: 800,
        alt: `${property.title} - ${image.caption || ''}`.trim(),
      })) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: property.images?.[0]?.url ? [property.images[0].url] : [],
    },
  };
}

// Generate dynamic metadata for location pages
export function generateLocationMetadata(location: any): Metadata {
  if (!location) return {};
  
  const title = `Vacation Rentals in ${location.name}, ${location.state}`;
  const description = `Discover the best vacation rentals in ${location.name}, ${location.state}. Book from ${location.propertyCount} luxury villas, homestays, and unique accommodations for your perfect getaway.`;
  
  return {
    title: title,
    description: description,
    keywords: [
      `${location.name} vacation rentals`,
      `${location.name} accommodation`,
      `${location.name} holiday homes`,
      `${location.state} tourism`,
      `places to stay in ${location.name}`,
      'luxury stays',
      'unique accommodations',
    ],
    openGraph: {
      title: title,
      description: description,
      url: `https://stayvillow.com/explore/${location.name.toLowerCase().replace(/\s+/g, '-')}`,
      images: location.images?.map((image: string) => ({
        url: image,
        width: 1200,
        height: 800,
        alt: `Vacation rentals in ${location.name}, ${location.state}`,
      })) || [],
    },
  };
}

// Generate dynamic metadata for blog posts or articles
export function generateArticleMetadata(article: any): Metadata {
  if (!article) return {};
  
  return {
    title: article.title,
    description: article.summary || article.content.substring(0, 160),
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.summary || article.content.substring(0, 160),
      url: `https://stayvillow.com/blog/${article.slug}`,
      images: article.featuredImage ? [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : [],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author?.name || 'Stayvillow Team'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary || article.content.substring(0, 160),
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  };
} 