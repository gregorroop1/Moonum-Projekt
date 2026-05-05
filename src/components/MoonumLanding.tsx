import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { Button } from '../../components/ui/button';

const MoonumLanding: React.FC = () => {
  const { t } = useTranslation('landing');
  const { wrapperRef, layerRefs } = useMouseParallax({
    sensitivity: 25,
    baseRotateX: 55,
    baseRotateZ: -25
  });

  return (
    <>
      <div className="bg-brand-dark text-zinc-200 font-sans h-screen w-full m-0 flex items-center justify-center relative">
        {/* SVG Filter for Grain */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        <div className="fixed inset-0 w-full h-full pointer-events-none z-100 opacity-15" style={{ filter: 'url(#grain)' }}></div>

        <div className="absolute inset-0 p-8 md:p-16 grid grid-cols-2 grid-rows-[auto_1fr_auto] z-10 pointer-events-none">
          <div className="flex flex-col justify-center items-end text-right translate-y-16 col-start-2 row-start-2">
            <h1 className="font-['Michroma'] uppercase drop-shadow-[0px_12px_24px_rgba(0,0,0,1)]" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', lineHeight: '1.2' }}>
               <div className="flex items-center gap-4 justify-end">
                  <span className="text-white">{t('hero.title1')}</span>
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>{t('hero.title2')}</span>
               </div>
               <div className="text-transparent mt-2" style={{ WebkitTextStroke: '1px white' }}>{t('hero.title3')}</div>
            </h1>
          </div>

          <div className="col-span-2 row-start-3 flex justify-between items-end font-mono text-xs pb-22 md:pb-0">
            <div>
              <p>{t('hero.tag', { year: new Date().getFullYear() })}</p>
              <p><Trans i18nKey="hero.description" ns="landing" components={{ br: <br /> }} /></p>
            </div>
          </div>
        </div>

        <div className="w-screen h-screen flex items-center justify-center overflow-hidden perspective-[2000px]">
          <div className="flex items-center justify-center w-[800px] h-[500px] transform-3d max-lg:scale-[0.85] max-md:scale-[0.6] max-[500px]:scale-50 max-[380px]:scale-[0.42]">
            <div className="relative w-[800px] h-[500px] transform-3d transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform" ref={wrapperRef}>
              
              <div className="absolute inset-0 border border-white/10 bg-cover bg-center transition-transform duration-500 will-change-transform rounded-2xl overflow-hidden bg-[#111]" ref={(el) => { if (el) layerRefs.current[0] = el; }}>
                <picture className="absolute inset-0 block h-full w-full">
                  <source srcSet="Alpaca_blizidega.webp" type="image/webp" />
                  <img src="Alpaca_blizidega.jpeg" alt={t('hero.imageAlt')} className="h-full w-full rounded-[16px] object-cover" loading="eager" decoding="async" fetchPriority="high" sizes="(max-width: 768px) 100vw, 800px" width={800} height={500} />
                </picture>
                <div className="absolute inset-0 bg-black/40 rounded-[16px]"></div>
              </div>

              <div className="absolute inset-0 bg-transparent border-none pointer-events-none transition-transform duration-500 will-change-transform" ref={(el) => { if (el) layerRefs.current[1] = el; }}>
                 <div className="flex justify-between items-center w-full p-6 text-white pointer-events-auto">
                    <div className="font-sans font-bold tracking-[0.2em] text-lg flex items-center gap-2">
                       <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                         <div className="w-1 h-1 bg-white rounded-full"></div>
                       </div>
                       {t('hero.logo')}
                    </div>
                    
                    <div className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold shadow-lg">
                       <span className="cursor-pointer hover:text-white/70 transition-colors">{t('hero.nav.home')}</span>
                       <span className="cursor-pointer hover:text-white/70 transition-colors">{t('hero.nav.services')}</span>
                       <span className="cursor-pointer hover:text-white/70 transition-colors">{t('hero.nav.pricing')}</span>
                    </div>

                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold">
                       <Button variant="polygon" className="px-6 py-6 text-[10px] shadow-lg shadow-brand-primary/20 pointer-events-auto bg-brand-primary! text-white! hover:bg-brand-primary/80!">
                         {t('hero.cta')}
                       </Button>
                    </div>
                 </div>
              </div>
              
              <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 -translate-z-[50px] pointer-events-none bg-[repeating-radial-gradient(circle_at_50%_50%,transparent_0,transparent_40px,rgba(255,255,255,0.05)_41px,transparent_42px)]"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 w-px h-[60px] bg-linear-to-b from-zinc-200 to-transparent animate-flow"></div>
      </div>
    </>
  );
};

export default MoonumLanding;
