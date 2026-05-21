/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  useEffect,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import MoonumLanding from './components/MoonumLanding';
import Marquee from './components/Marquee';
import Navbar from './components/Navbar';
import { HelmetProvider } from 'react-helmet-async';
import SEOMetadata from './components/SEOMetadata';
import StructuredData from './components/StructuredData';
import CookieConsent from './components/CookieConsent';

import ServicesSection from './components/ServicesSection';
import PricingSection from './components/PricingSection';
import ProcessSection from './components/ProcessSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <HelmetProvider>
      <SEOMetadata />
      <StructuredData />
      <main className="relative bg-brand-dark min-h-screen">
        <Navbar />
        <MoonumLanding />
        <div className="relative z-20">
          <Marquee />
          <div id="services">
            <ServicesSection />
          </div>
          <div id="pricing">
            <PricingSection />
          </div>
          <div id="process">
            <ProcessSection />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
        </div>
        <FooterSection />
        <CookieConsent />
      </main>
    </HelmetProvider>
  );
}
