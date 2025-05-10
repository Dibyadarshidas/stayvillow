import { Metadata } from 'next';

type GenerateMetadataParams = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: object;
};

/**
 * Generate metadata for Next.js App Router pages
 * Use this in server components with the generateMetadata export
 */
export function generateMetadata({
  title = 'Premium Vacation Rentals in India',
  description = 'Discover luxury villas, unique stays, and authentic experiences across India. Find your perfect getaway with Stayvillow.',
  keywords = ['vacation rentals', 'luxury villas', 'India travel', 'holiday homes', 'premium stays'],
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
  structuredData,
}: GenerateMetadataParams): Metadata {
  const siteTitle = title ? `${title} | Stayvillow` : 'Stayvillow | Premium Vacation Rentals in India';
  const siteUrl = 'https://stayvillow.com';
  
  const metadata: Metadata = {
    title: siteTitle,
    description: description,
    keywords: keywords,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: title,
      description: description,
      type: ogType,
      url: canonicalUrl || siteUrl,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: 'Stayvillow',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: structuredData ? {
      'script:type:application/ld+json': JSON.stringify(structuredData),
    } : {},
  };

  return metadata;
}

/**
 * For use in server components
 * 
 * Example usage:
 * 
 * export async function generateMetadata({ params }: { params: { id: string }}): Promise<Metadata> {
 *   const property = await getProperty(params.id);
 *   return generateMetadata({
 *     title: property.title,
 *     description: property.description,
 *     // ...other properties
 *   });
 * }
 */ 