import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { MENU_ITEMS } from '../constants/data';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../../components/ui/button';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileSideExpanded, setIsMobileSideExpanded] = useState(false);

  const isSideExpanded = isMobileSideExpanded || (isHovered && window.innerWidth >= 768);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shared CSS classes
  const glassPanelClasses = "bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/50 shadow-2xl";
  const iconButtonClasses = "flex items-center justify-center text-zinc-200 hover:text-white p-3 rounded-2xl transition-all duration-300";

  return (
    <>
      {/* Tume overlay taust, mis ilmub küljemenüü hoverdamisel (Desktop) */}
      <div 
        className={`hidden md:block fixed inset-0 bg-black/60 z-40 transition-opacity duration-500 pointer-events-none ${
          isScrolled && isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Mobile küljemenüü taust */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isMobileSideExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileSideExpanded(false)}
      />

      {/* Ülemine Navbar (Nähtav ainult lehe alguses) */}
      <nav 
        className={cn(
          "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-transform duration-700 ease-in-out translate-y-0 opacity-100 max-md:bg-zinc-900/60 max-md:backdrop-blur-xl max-md:border max-md:border-zinc-700/50 max-md:shadow-2xl",
          isScrolled && "md:-translate-y-[150%] md:opacity-0"
        )}
      >
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
             <span className="text-xl font-bold tracking-[0.2em] text-white font-sans">{t('logo')}</span>
             <div className="w-1.5 h-1.5 bg-[#ff3c00] rounded-full mb-1 shadow-[0_0_10px_#ff3c00]"></div>
          </div>
          
          {/* Menüü lingid (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {MENU_ITEMS.map((item, index) => (
              <a 
                key={index} 
                href={item.href}
                className="text-zinc-400 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors"
              >
                {t(item.translationKey)}
              </a>
            ))}
            <button 
              onClick={() => i18n.changeLanguage(i18n.language === 'et' ? 'en' : 'et')}
              className="text-zinc-400 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors flex items-center gap-1"
            >
              <Globe size={12} /> {i18n.language === 'et' ? 'EN' : 'ET'}
            </button>
          </div>
        </div>

        {/* CTA Nupp */}
        <div className="hidden md:block">
           <a 
             href="#"
             className={cn(buttonVariants({ variant: "polygon" }), "px-8 py-5 text-[10px]")}
           >
             {t('nav.cta')}
           </a>
        </div>
      </nav>

      {/* Mobile hamburger menu (alati nähtav üleval paremal, v.a. kui menüü on avatud) */}
      <button
        type="button"
        className={cn(
          "md:hidden fixed right-3 top-4 z-50",
          iconButtonClasses,
          glassPanelClasses,
          isMobileSideExpanded ? "opacity-0 pointer-events-none translate-x-4" : "opacity-100 pointer-events-auto translate-x-0"
        )}
        aria-label={t('nav.openMenu')}
        aria-expanded={isMobileSideExpanded}
        onClick={() => setIsMobileSideExpanded(true)}
      >
        <Menu size={20} strokeWidth={1.8} />
      </button>

      {/* Küljemenüü (Nähtav ainult allapoole kerides desktopis, või kui mobiilis avatud) */}
      <nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed top-4 md:top-1/2 md:-translate-y-1/2 right-3 md:right-6 z-50 transition-all duration-700 ease-in-out",
          isMobileSideExpanded ? "translate-x-0 opacity-100" : "translate-x-[150%] opacity-0 pointer-events-none",
          (isScrolled && !isMobileSideExpanded) && "md:translate-x-0 md:opacity-100 md:pointer-events-auto",
          (!isScrolled && !isMobileSideExpanded) && "md:translate-x-[150%] md:opacity-0 md:pointer-events-none"
        )}
      >
        <div 
          className={cn(
            glassPanelClasses,
            "rounded-[2rem] p-3 flex flex-col gap-2 transition-all duration-500 ease-out overflow-hidden",
            isSideExpanded ? "w-40" : "w-14"
          )}
        >
          <div className="flex items-center justify-between md:justify-end mb-2">
            <button
              type="button"
              className="md:hidden text-zinc-400 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors flex items-center gap-1 p-2"
              onClick={() => i18n.changeLanguage(i18n.language === 'et' ? 'en' : 'et')}
            >
              <Globe size={12} /> {i18n.language === 'et' ? 'EN' : 'ET'}
            </button>
            <button
              type="button"
              className="md:hidden flex items-center justify-end text-zinc-200 hover:text-white hover:bg-zinc-800/50 p-2 rounded-2xl transition-colors"
              aria-label={isMobileSideExpanded ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isMobileSideExpanded}
              onClick={() => setIsMobileSideExpanded(prev => !prev)}
            >
              {isMobileSideExpanded ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
            </button>
          </div>

          {MENU_ITEMS.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex justify-end items-center gap-4 text-zinc-400 hover:text-white hover:bg-zinc-800/50 p-1.5 rounded-2xl transition-all duration-300 relative group overflow-hidden"
              title={!isHovered && !isMobileSideExpanded ? t(item.translationKey) : undefined}
              onClick={() => setIsMobileSideExpanded(false)}
            >              
              <span 
                className={cn(
                  "text-sm font-medium whitespace-nowrap z-10 transition-all duration-300",
                  isSideExpanded ? "opacity-100 delay-100 relative" : "opacity-0 absolute right-10"
                )}
              >
                {t(item.translationKey)}
              </span>
              <div className="shrink-0 relative z-10">{item.icon}</div>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
