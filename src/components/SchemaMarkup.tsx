import { useEffect } from 'react';

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
  name: 'Zanzibar Vibe Tours',
  url: 'https://zanzibarvibetours.com',
  logo: 'https://zanzibarvibetours.com/images/logo.png',
  description: 'Tour operator specializzato in viaggi a Zanzibar per clienti italiani e polacchi.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'TZ',
    addressLocality: 'Zanzibar',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+255-777-123-456',
    contactType: 'customer service',
    email: 'info@zanzibarvibetours.com',
    availableLanguage: ['Italian', 'Polish', 'English'],
  },
  sameAs: [
    'https://www.facebook.com/zanzibarvibetours',
    'https://www.instagram.com/zanzibarvibetours',
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
  itinerary: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Pickup from hotel',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tour activity',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Return to hotel',
      },
    ],
  },
  offers: {
    '@type': 'Offer',
    price: tour.price,
    priceCurrency: tour.currency,
    availability: 'https://schema.org/InStock',
  },
  provider: {
    '@type': 'Organization',
    name: 'Zanzibar Vibe Tours',
    url: 'https://zanzibarvibetours.com',
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
  starRating: {
    '@type': 'Rating',
    ratingValue: '4',
  },
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Free WiFi',
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Swimming Pool',
    },
  ],
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
      url: 'https://zanzibarvibetours.com/images/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://zanzibarvibetours.com/blog',
  },
});
