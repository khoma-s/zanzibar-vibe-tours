import { useEffect } from 'react';
import { SITE_ORIGIN } from '../utils/localizedRoutes';

interface SchemaProps {
  type: 'Organization' | 'TouristTrip' | 'Hotel' | 'Article' | 'LocalBusiness';
  data: Record<string, unknown>;
}

export default function SchemaMarkup({ type, data }: SchemaProps) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };

    // Remove existing schema script
    const existingScript = document.getElementById('schema-markup');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema script
    const script = document.createElement('script');
    script.id = 'schema-markup';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const script = document.getElementById('schema-markup');
      if (script) {
        script.remove();
      }
    };
  }, [type, data]);

  return null;
}

// Predefined schemas for common use cases
export const organizationSchema = {
  '@id': `${SITE_ORIGIN}/#organization`,
  name: 'Zanzibar Vibe Tours',
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/images/logo.png`,
  description: 'Tour operator specializzato in viaggi a Zanzibar per clienti italiani e polacchi.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'TZ',
    addressLocality: 'Zanzibar',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+39 347 584 9637',
    contactType: 'customer service',
    email: 'kuzdra.violetta@gmail.com',
    availableLanguage: ['Italian', 'Polish'],
  },
  sameAs: [
    'https://www.facebook.com/1172238702643016',
    'https://www.instagram.com/kuzdravioletta',
    'https://www.tiktok.com/@violetta.kuzdra',
  ],
};

export const touristTripSchema = (tour: {
  name: string;
  description: string;
  price: number;
  currency: string;
}) => ({
  name: tour.name,
  description: tour.description,
  tourType: 'Sightseeing',
  offers: {
    '@type': 'Offer',
    price: tour.price,
    priceCurrency: tour.currency,
    availability: 'https://schema.org/InStock',
  },
  provider: {
    '@type': 'Organization',
    name: 'Zanzibar Vibe Tours',
    url: SITE_ORIGIN,
  },
});

export const hotelSchema = (hotel: {
  name: string;
  description: string;
  address: string;
}) => ({
  name: hotel.name,
  description: hotel.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: hotel.address,
    addressLocality: 'Zanzibar',
    addressCountry: 'TZ',
  },
});

export const articleSchema = (article: {
  headline: string;
  description: string;
  datePublished: string;
  author: string;
}) => ({
  headline: article.headline,
  description: article.description,
  datePublished: article.datePublished,
  dateModified: article.datePublished,
  author: {
    '@type': 'Organization',
    name: article.author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Zanzibar Vibe Tours',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/images/logo.png`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_ORIGIN}/it/blog`,
  },
});
