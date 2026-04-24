/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MoonumLanding from './components/MoonumLanding';
import Marquee from './components/Marquee';
import ServicesSection from './components/ServicesSection';
import PricingSection from './components/PricingSection';
import ProcessSection from './components/ProcessSection';
import ContactSection from './components/ContactSection';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <main className="relative bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <MoonumLanding />
      <div className="relative z-20">
        <Marquee />
        <ServicesSection />
        <PricingSection />
        <ProcessSection />
        <ContactSection />
      </div>
    </main>
  );
}
