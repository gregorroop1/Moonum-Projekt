import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enLanding from './locales/en/landing.json';
import enServices from './locales/en/services.json';
import enPricing from './locales/en/pricing.json';
import enProcess from './locales/en/process.json';
import enContact from './locales/en/contact.json';
import enData from './locales/en/data.json';

import etCommon from './locales/et/common.json';
import etLanding from './locales/et/landing.json';
import etServices from './locales/et/services.json';
import etPricing from './locales/et/pricing.json';
import etProcess from './locales/et/process.json';
import etContact from './locales/et/contact.json';
import etData from './locales/et/data.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: enCommon,
    landing: enLanding,
    services: enServices,
    pricing: enPricing,
    process: enProcess,
    contact: enContact,
    data: enData,
  },
  et: {
    common: etCommon,
    landing: etLanding,
    services: etServices,
    pricing: etPricing,
    process: etProcess,
    contact: etContact,
    data: etData,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'et', // Original language of the app
    defaultNS,
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
