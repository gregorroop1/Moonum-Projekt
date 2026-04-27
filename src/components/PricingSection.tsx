import React from 'react';

const CATEGORIES = ['VEEBILEHED', 'TARKVARA', 'TURUNDUS'] as const;

const PRICING_PLANS = [
  {
    id: "01",
    title: "Lihtne veebileht",
    subtitle: "VEEBILEHED",
    meta: "KÜSI HINDA",
    isDark: true,
    price: ""
  },
  {
    id: "02",
    title: "Keerulisem Veebileht",
    subtitle: "VEEBILEHED",
    meta: "KÜSI HINDA",
    isDark: false,
    price: ""
  },
  {
    id: "03",
    title: "Väljakutse",
    subtitle: "VEEBILEHED",
    meta: "KÜSI HINDA",
    isDark: false,
    price: ""
  },
  {
    id: "04",
    title: "E-pood",
    subtitle: "VEEBILEHED",
    meta: "KÜSI HINDA",
    isDark: false,
    price: ""
  },
  {
    id: "04-1",
    title: "SEO",
    subtitle: "VEEBILEHED",
    meta: "KÜSI HINDA",
    isDark: false,
    price: ""
  },
  {
    id: "04-2",
    title: "Hooldused",
    subtitle: "VEEBILEHED",
    meta: "KÜSI HINDA",
    isDark: false,
    price: ""
  },
  {
    id: "05",
    title: "Klientide haldamise tarkvara",
    subtitle: "TARKVARA",
    meta: "KÜSI HINDA",
    isDark: true,
    price: ""
  },
  {
    id: "05-1",
    title: "Protsesside automatiseerimine",
    subtitle: "TARKVARA",
    meta: "KÜSI HINDA",
    isDark: false,
    price: ""
  },
  {
    id: "05-2",
    title: "Integratsioonid",
    subtitle: "TARKVARA",
    meta: "KÜSI HINDA",
    isDark: false,
    price: ""
  },
  {
    id: "06",
    title: "Reklaamid",
    subtitle: "TURUNDUS",
    meta: "KÜSI HINDA",
    isDark: false,
    price: ""
  },
  {
    id: "07",
    title: "Sotsiaalmeedia haldamine",
    subtitle: "TURUNDUS",
    meta: "KÜSI HINDA",
    isDark: false,
    price: ""
  }
] as const;

type Category = (typeof CATEGORIES)[number];
type PricingPlan = (typeof PRICING_PLANS)[number];

const PLANS_BY_CATEGORY = CATEGORIES.reduce((acc, category) => {
  acc[category] = PRICING_PLANS.filter((plan) => plan.subtitle === category);
  return acc;
}, {} as Record<Category, PricingPlan[]>);

const PricingSection: React.FC = () => {
  return (
    <section className="bg-white text-black py-32 px-4 md:px-16 relative overflow-hidden" id="pricing">
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
      <div className="text-center max-w-2xl mx-auto mb-20 relative">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-6 relative z-10">
          HINNAKIRI
        </h2>
        <p className="text-zinc-500 text-sm leading-relaxed relative z-10 px-8">
          Siin on saadaval mitmeid lahendusi, mis on kohandatud vastavalt teie vajadustele ja ootustele.
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

      {/* Pricing List */}
      <div className="max-w-6xl mx-auto space-y-16">
        {CATEGORIES.map((category) => (
          <div key={category}>
            <div className="flex items-center gap-4 mb-6 px-2 md:px-0">
              <div className="w-12 h-[2px] bg-black"></div>
              <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-widest">{category}</h3>
            </div>
            <div className="space-y-4">
              {PLANS_BY_CATEGORY[category].map((plan, index) => (
                <div 
                  key={plan.id}
                  className={`flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6 transition-all duration-300 group ${
                    plan.isDark 
                    ? 'bg-zinc-900 text-white shadow-2xl' 
                    : 'bg-white border border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    {/* Number Box */}
                    <div className={`w-12 h-12 flex items-center justify-center font-black text-lg ${
                      plan.isDark ? 'bg-zinc-800' : 'bg-black text-white'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                        {plan.title} <span className="text-zinc-500 ml-2">{plan.price}</span>
                      </h3>
                      <p className={`text-xs uppercase tracking-widest mt-1 ${plan.isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Duration Meta */}
                  <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                    <div className={`h-8 w-[1px] hidden md:block ${plan.isDark ? 'bg-zinc-700' : 'bg-zinc-200'}`}></div>
                    <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap`}>
                      {plan.meta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
