import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SITE_INFO } from '../constants/data';

const StructuredData: React.FC = () => {
  const { t } = useTranslation('landing');

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Moonum",
    "image": `${SITE_INFO.url}/Alpaca_blizidega.webp`,
    "description": t('seo.description'),
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EE"
    },
    "url": SITE_INFO.url,
    "email": SITE_INFO.email
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
