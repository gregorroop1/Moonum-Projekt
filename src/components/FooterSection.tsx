import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MENU_ITEMS, SITE_INFO } from '../constants/data';
import { ArrowUpRight } from 'lucide-react';


import PrivacyPolicyModal from './PrivacyPolicyModal';
import { scrollToSection } from '@/lib/smoothScroll';

const FooterSection: React.FC = () => {
  const { t } = useTranslation(['common', 'data']);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-24 pb-8 px-4 md:px-16 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
          <div>
            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none mb-4">
              {t('logo', { ns: 'common' })}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-sm">
              {t('footer.description', { ns: 'common' })}
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-6">
            <a 
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-flex items-center gap-2 text-xl md:text-3xl font-display font-bold uppercase tracking-widest hover:text-zinc-300 transition-colors group"
            >
              {t('footer.cta', { ns: 'common' })}
              <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Middle Section: Links & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-800 py-12 px-6">
          {/* Navigation */}
          <div className="space-y-6 text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t('footer.navigation', { ns: 'common' })}</h3>
            <ul className="space-y-4">
              {MENU_ITEMS.map((item) => (
                <li key={item.translationKey}>
                  <a 
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="text-sm md:text-base font-medium uppercase tracking-widest hover:text-zinc-400 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="text-zinc-600">{item.icon}</span>
                    {t(item.translationKey.replace('data:', ''), { ns: 'data' })}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-6 text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t('footer.socials', { ns: 'common' })}</h3>
            <ul className="space-y-4">
              {SITE_INFO.social.map((social) => (
                <li key={social.id}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-medium uppercase tracking-widest hover:text-zinc-400 transition-colors inline-flex items-center gap-2">
                    <social.icon size={20} className="text-zinc-600" />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t('footer.contact', { ns: 'common' })}</h3>
            <ul className="space-y-4">
              <li className="text-sm md:text-base font-medium tracking-widest text-zinc-300">
                <a href={`mailto:${SITE_INFO.email}`} className="hover:text-white transition-colors">{SITE_INFO.email}</a>
              </li>
              <li className="text-sm md:text-base font-medium tracking-widest text-zinc-300">
                <a href={`tel:${SITE_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{SITE_INFO.phone}</a>
              </li>
              <li className="text-sm md:text-base font-medium tracking-widest text-zinc-300 uppercase">
                {t('footer.location', { ns: 'common' })}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-800 text-zinc-500 text-xs font-bold uppercase tracking-widest">
          <p>© {currentYear} {t('logo', { ns: 'common' })}. {t('footer.rights', { ns: 'common' })}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-zinc-300 transition-colors uppercase font-bold tracking-widest">{t('footer.privacy', { ns: 'common' })}</button>
          </div>
        </div>
      </div>
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  );
};

export default FooterSection;
