import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CATEGORIES, PLANS_BY_CATEGORY, Category } from '../constants/data';
import { scrollToSection } from '@/lib/smoothScroll';
import { motion } from 'framer-motion';

const PricingSection: React.FC = () => {
  const { t } = useTranslation(['pricing', 'data']);
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);

  return (
    <section className="bg-white text-black py-18 px-4 md:px-16 relative overflow-hidden">
      {/* Decorative center icon */}
      <div className="flex justify-center mb-6">
        <div className="relative w-12 h-12">
          {[...Array(24)].map((_, i) => (
            <div 
              key={i} 
              className="absolute top-1/2 left-1/2 w-[1px] h-6 bg-zinc-300 origin-bottom"
              style={{ transform: `translate(-50%, -100%) rotate(${i * 15}deg)` }}
            ></div>
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-6 relative z-10">
          {t('header.title', { ns: 'pricing' })}
        </h2>
        <p className="text-zinc-500 text-sm leading-relaxed relative z-10 px-8">
          {t('header.description', { ns: 'pricing' })}
        </p>

        {/* Slanted lines decorative circle (Floating Right) */}
        <div className="absolute right-[-20%] top-0 hidden xl:flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-24 h-24 rounded-full border border-black relative overflow-hidden flex items-center justify-center p-2">
            <div className="w-full h-full space-y-1 flex flex-col justify-center">
               {[...Array(10)].map((_, i) => (
                 <div key={i} className="w-[150%] h-[1px] bg-black -rotate-45 -translate-x-4"></div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto mb-24 px-4 overflow-hidden">
        <div className="flex flex-nowrap justify-center items-center">
          {/* Static Rail Segment */}
          <div className="w-6 md:w-12 lg:w-24 h-[1px] bg-zinc-200" />

          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <React.Fragment key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className="px-6 md:px-10 py-6 cursor-pointer outline-none group relative flex items-center justify-center"
                >
                  <span className={`text-base md:text-xl font-black uppercase tracking-tight transition-all duration-300 whitespace-nowrap ${
                    isActive ? 'text-black' : 'text-zinc-400 hover:text-zinc-600'
                  }`}>
                    {t(`categories.${category}`, { ns: 'data' })}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-4 left-6 right-6 h-[2px] bg-black"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </button>
                
                {/* Static Rail Segment */}
                <div className="w-6 md:w-12 lg:w-24 h-[1px] bg-zinc-300" />
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      {/* Pricing Rows */}
      <div className="max-w-6xl mx-auto">
        <div
          key={activeCategory}
          className="space-y-4 animate-[fadeInUp_0.35s_ease-out]"
        >
          {PLANS_BY_CATEGORY[activeCategory].map((plan, index) => (
            <a 
              href="#contact"
              onClick={(e) => {
                scrollToSection(e, '#contact');
                (window as any).__lastSelectedPlan = plan.id;
                window.dispatchEvent(new CustomEvent('select-plan', { detail: plan.id }));
              }}
              key={plan.id}
              className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 gap-4 md:gap-8 transition-all duration-300 group no-underline ${
                plan.isDark 
                ? 'bg-zinc-900 text-white shadow-2xl' 
                : 'bg-white border border-zinc-200 hover:border-zinc-400'
              }`}
            >
              {/* Left: Number + Content */}
              <div className="flex items-start gap-6 md:gap-8 w-full md:w-auto md:flex-1">
                {/* Number Box */}
                <div className={`w-11 h-11 flex-shrink-0 flex items-center justify-center font-black text-sm ${
                  plan.isDark ? 'bg-zinc-800' : 'bg-black text-white'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Title + Description + Features */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-tight leading-tight">
                    {t(`pricing.plans.${plan.id}`, { ns: 'data' })}
                  </h3>
                  <p className={`text-xs leading-relaxed mt-1.5 max-w-lg ${
                    plan.isDark ? 'text-zinc-400' : 'text-zinc-500'
                  }`}>
                    {t(`pricing.descriptions.${plan.id}`, { ns: 'data' })}
                  </p>
                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(t(`pricing.features.${plan.id}`, { ns: 'data', returnObjects: true }) as string[]).map((feature: string, i: number) => (
                      <span
                        key={i}
                        className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${
                          plan.isDark
                            ? 'bg-zinc-800 text-zinc-400'
                            : 'bg-zinc-100 text-zinc-500'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: CTA */}
              <div className="flex items-center gap-6 w-full md:w-auto justify-end flex-shrink-0">
                <div className={`h-8 w-[1px] hidden md:block ${plan.isDark ? 'bg-zinc-700' : 'bg-zinc-200'}`}></div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-2">
                  {t('pricing.meta', { ns: 'data' })}
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
