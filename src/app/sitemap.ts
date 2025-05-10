import { MetadataRoute } from 'next';

// In a real application, you would fetch this data from your API
const properties = [
  { id: 1, title: 'Luxury Beach Villa', updatedAt: new Date() },
  { id: 2, title: 'Mountain View Cabin', updatedAt: new Date() },
  { id: 3, title: 'Lakeside Retreat', updatedAt: new Date() },
];

const locations = [
  { name: 'goa', state: 'Goa', updatedAt: new Date() },
  { name: 'manali', state: 'Himachal Pradesh', updatedAt: new Date() },
  { name: 'udaipur', state: 'Rajasthan', updatedAt: new Date() },
  { name: 'kerala', state: 'Kerala', updatedAt: new Date() },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stayvillow.com';
  const lastModified = new Date();

  // Core pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/signin`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/list`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Property pages
  const propertyPages = properties.map((property) => ({
    url: `${baseUrl}/property/${property.id}`,
    lastModified: property.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Location pages
  const locationPages = locations.map((location) => ({
    url: `${baseUrl}/explore/${location.name}`,
    lastModified: location.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...propertyPages, ...locationPages];
} 