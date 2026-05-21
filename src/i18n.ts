import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enLanding from './locales/en/landing.json';
import enServices from './locales/en/services.json';
import enContact from './locales/en/contact.json';
import enData from './locales/en/data.json';

import etCommon from './locales/et/common.json';
import etLanding from './locales/et/landing.json';
import etServices from './locales/et/services.json';
import etContact from './locales/et/contact.json';
import etData from './locales/et/data.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: enCommon,
    landing: enLanding,
    services: enServices,
    contact: enContact,
    data: enData,
  },
  et: {
    common: etCommon,
    landing: etLanding,
    services: etServices,
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
