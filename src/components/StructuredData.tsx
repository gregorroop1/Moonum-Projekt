import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const StructuredData: React.FC = () => {
  const { t } = useTranslation('landing');

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Moonum",
    "image": "https://moonum.ee/Alpaca_blizidega.webp",
    "description": t('seo.description'),
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EE"
    },
    "url": "https://moonum.ee",
    "email": "hello@moonum.com",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
