// Structured data utilities for rich search results

// Organization schema for Stayvillow
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stayvillow',
    url: 'https://stayvillow.com',
    logo: 'https://stayvillow.com/images/logo.png',
    sameAs: [
      'https://www.facebook.com/stayvillow',
      'https://www.instagram.com/stayvillow',
      'https://twitter.com/stayvillow',
      'https://www.linkedin.com/company/stayvillow',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-123-456-7890',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  };
};

// Website schema for Stayvillow
export const getWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Stayvillow',
    url: 'https://stayvillow.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://stayvillow.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
};

// Breadcrumb schema for navigation
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

// Vacation Rental schema for property listings
export const getVacationRentalSchema = (property: any) => {
  if (!property) return null;

  const amenityFeatures = property.amenities?.map((amenity: string) => ({
    '@type': 'LocationFeatureSpecification',
    name: amenity,
  })) || [];

  // Calculate aggregate rating
  const rating = property.metrics?.avgRating || 0;
  const reviewCount = property.reviews?.length || 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.title,
    description: property.description,
    url: `https://stayvillow.com/property/${property.id}`,
    image: property.images?.[0]?.url || '',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: property.location.split(',')[1]?.trim() || '',
      addressLocality: property.location.split(',')[0]?.trim() || '',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.location.coordinates?.[1] || '',
      longitude: property.location.coordinates?.[0] || '',
    },
    priceRange: `₹${property.pricing?.basePrice} per night`,
    amenityFeature: amenityFeatures,
    numberOfRooms: property.details?.bedrooms || 0,
    petsAllowed: property.rules?.allowPets || false,
    checkInTime: property.rules?.checkInTime || '',
    checkOutTime: property.rules?.checkOutTime || '',
    telephone: '+91-123-456-7890',
    maximumAttendeeCapacity: property.details?.maxGuests || 0,
    ...(rating > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.toFixed(1),
        reviewCount: reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
    }),
  };
};

// Review schema for property reviews
export const getReviewSchema = (review: any, property: any) => {
  if (!review || !property) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LodgingBusiness',
      name: property.title,
      url: `https://stayvillow.com/property/${property.id}`,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: review.reviewer?.name || 'Guest',
    },
    datePublished: review.createdAt,
    reviewBody: review.comment,
  };
};

// Location schema for explore pages
export const getLocationSchema = (location: any) => {
  if (!location) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${location.name}, ${location.state}`,
    description: location.description,
    url: `https://stayvillow.com/explore/${location.name.toLowerCase().replace(/\s+/g, '-')}`,
    image: location.images?.[0] || '',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates?.coordinates[1] || '',
      longitude: location.coordinates?.coordinates[0] || '',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: location.state,
      addressLocality: location.name,
    },
  };
};

// FAQPage schema for FAQ sections
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}; 