import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/host/dashboard/',
        '/profile/',
        '/bookings/',
        '/favorites/',
        '/signin/',
        '/signup/',
      ],
    },
    sitemap: 'https://stayvillow.com/sitemap.xml',
  };
} 