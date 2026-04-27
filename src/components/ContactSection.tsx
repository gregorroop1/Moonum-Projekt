import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Zap } from 'lucide-react';
import { SERVICES_LIST } from '../constants/data';

const ContactSection: React.FC = () => {
  const { t } = useTranslation(['contact', 'data']);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <section className="bg-white text-black pt-20 pb-16 px-4 md:px-16" id="contact">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="mb-10 relative text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter leading-[1.1] uppercase">
            <span className="text-zinc-300">{t('header.title1', { ns: 'contact' })}</span> <Trans i18nKey="header.title2" ns="contact" components={{ br: <br /> }} />
            <div className="inline-block md:block lg:inline-block ml-0 md:ml-4 mt-4 md:mt-0 align-middle">
               <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 md:w-32 h-auto mx-auto transform -rotate-6 md:rotate-0">
                 <path d="M2 20H118M118 20L100 8M118 20L100 32" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>
          </h2>
          <p className="mt-6 text-zinc-500 text-base md:text-lg font-medium tracking-tight">
            {t('header.description', { ns: 'contact' })}
          </p>
          
          {/* Dot Grid Decoration - Adjusted for center */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:grid grid-cols-5 gap-2 opacity-10">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-black rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="space-y-8 w-full max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-widest">{t('form.name.label', { ns: 'contact' })}</label>
              <input 
                type="text" 
                placeholder={t('form.name.placeholder', { ns: 'contact' })}
                className="w-full border-b border-zinc-200 py-3 focus:border-black outline-none transition-colors placeholder:text-zinc-300 text-base"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-widest">{t('form.email.label', { ns: 'contact' })}</label>
              <input 
                type="email" 
                placeholder={t('form.email.placeholder', { ns: 'contact' })}
                className="w-full border-b border-zinc-200 py-3 focus:border-black outline-none transition-colors placeholder:text-zinc-300 text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-3 text-left">
            <label className="block text-xs font-bold uppercase tracking-widest">{t('form.company.label', { ns: 'contact' })}</label>
            <input 
              type="text" 
              placeholder={t('form.company.placeholder', { ns: 'contact' })}
              className="w-full border-b border-zinc-200 py-3 focus:border-black outline-none transition-colors placeholder:text-zinc-300 text-base"
            />
          </div>

          <div className="space-y-3 text-left">
            <label className="block text-xs font-bold uppercase tracking-widest">{t('form.message.label', { ns: 'contact' })}</label>
            <textarea 
              rows={4}
              placeholder={t('form.message.placeholder', { ns: 'contact' })}
              className="w-full border-b border-zinc-200 py-3 focus:border-black outline-none transition-colors placeholder:text-zinc-300 text-base resize-none"
              required
            ></textarea>
          </div>

          <div className="space-y-5 text-left">
            <label className="block text-xs font-bold uppercase tracking-widest text-center md:text-left">{t('form.services.label', { ns: 'contact' })}</label>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {SERVICES_LIST.map(service => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                    selectedServices.includes(service)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  {t(`servicesList.${service}`, { ns: 'data' })}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center md:items-end pt-4">
            <div className="relative">
              <button 
                type="submit"
                className="bg-black text-white px-8 py-3.5 rounded-full text-base font-bold flex items-center gap-3 hover:scale-105 transition-transform group"
              >
                {t('form.submit', { ns: 'contact' })}
                <Zap className="fill-current group-hover:animate-pulse" size={18} />
              </button>
              
              {/* Lightning Bolt Sketch (SVG) */}
              <div className="absolute -top-12 -right-8 pointer-events-none hidden md:block">
                 <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M10 30L30 5M30 5L20 25M20 25L50 55M50 55L40 35" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
              </div>
            </div>
            <p className="mt-6 text-zinc-400 text-sm italic font-medium">
              {t('form.footer', { ns: 'contact' })}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
