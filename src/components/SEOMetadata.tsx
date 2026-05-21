import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SITE_INFO } from '../constants/data';

interface SEOMetadataProps {
  // Optional overrides
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOMetadata: React.FC<SEOMetadataProps> = ({
  title,
  description,
  keywords,
  image = '/Alpaca_blizidega.webp', // Default hero image
  url = SITE_INFO.url, // Centralized domain
}) => {
  const { t } = useTranslation('landing');

  const seoTitle = title || t('seo.title');
  const seoDescription = description || t('seo.description');
  const seoKeywords = keywords || t('seo.keywords');

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={url} />

      {/* Language Alternates (Hreflang) */}
      <link rel="alternate" href={`${url}/et`} hrefLang="et" />
      <link rel="alternate" href={`${url}/en`} hrefLang="en" />
      <link rel="alternate" href={url} hrefLang="x-default" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOMetadata;
