'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: object;
  children?: React.ReactNode;
};

/**
 * SEO component for client components
 * For server components, use the metadata API directly
 */
const SEO: React.FC<SEOProps> = ({
  title = 'Premium Vacation Rentals in India',
  description = 'Discover luxury villas, unique stays, and authentic experiences across India. Find your perfect getaway with Stayvillow.',
  keywords = ['vacation rentals', 'luxury villas', 'India travel', 'holiday homes', 'premium stays'],
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noIndex = false,
  structuredData,
  children,
}) => {
  const pathname = usePathname();
  const siteTitle = title ? `${title} | Stayvillow` : 'Stayvillow | Premium Vacation Rentals in India';
  const siteUrl = 'https://stayvillow.com';
  const canonical = canonicalUrl || `${siteUrl}${pathname}`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Robots meta */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Stayvillow" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@stayvillow" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {children}
    </Head>
  );
};

export default SEO; 