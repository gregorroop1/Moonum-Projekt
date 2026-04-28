/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import MoonumLanding from './components/MoonumLanding';
import Marquee from './components/Marquee';
import Navbar from './components/Navbar';

const ServicesSection = lazy(() => import('./components/ServicesSection'));
const PricingSection = lazy(() => import('./components/PricingSection'));
const ProcessSection = lazy(() => import('./components/ProcessSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
import FooterSection from './components/FooterSection';

function DeferredSection({
  children,
  fallback,
  rootMargin = '500px 0px',
}: {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
}) {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = anchorRef.current;
    if (!target || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, rootMargin]);

  return (
    <div ref={anchorRef}>
      {isVisible ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}

function SectionFallback({ minHeight }: { minHeight: string }) {
  return <div aria-hidden="true" className={`w-full ${minHeight}`} />;
}

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = i18n.language === 'et' ? 'Moonum - Digitaalsed Elamused' : 'Moonum - Digital Experiences';
  }, [i18n.language]);

  return (
    <main className="relative bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <MoonumLanding />
      <div className="relative z-20">
        <Marquee />
        <DeferredSection fallback={<SectionFallback minHeight="min-h-[60vh]" />}>
          <ServicesSection />
        </DeferredSection>
        <DeferredSection fallback={<SectionFallback minHeight="min-h-[65vh]" />}>
          <PricingSection />
        </DeferredSection>
        <DeferredSection fallback={<SectionFallback minHeight="min-h-[70vh]" />}>
          <ProcessSection />
        </DeferredSection>
        <DeferredSection fallback={<SectionFallback minHeight="min-h-[55vh]" />}>
          <ContactSection />
        </DeferredSection>
      </div>
      <FooterSection />
    </main>
  );
}
