import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { 
  Mail, 
  MoveRight, 
  ArrowDown, 
  PenTool, 
  Monitor, 
  Target,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

import { SITE_INFO } from '../constants/data';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../../components/ui/button';
import { scrollToSection } from '@/lib/smoothScroll';

interface ServiceCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  isDark?: boolean;
  readMoreText: string;
  isFlipped: boolean;
  onToggle: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  id, 
  icon, 
  title, 
  isDark, 
  readMoreText,
  isFlipped,
  onToggle
}) => {
  const { t } = useTranslation('services');
  
  // Safely handle the features array from translations
  const features = t(`cards.info.${id}.features`, { returnObjects: true });
  const featureList = Array.isArray(features) ? features : [];

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "perspective-1000 relative cursor-pointer group transition-all duration-500 w-full",
        "aspect-4/5 md:aspect-square",
        isFlipped ? "md:flex-[1.5] z-50" : "md:flex-1 z-0"
      )}
      onClick={onToggle}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Front Side */}
        <div className={`absolute inset-0 backface-hidden p-8 flex flex-col justify-between shadow-2xl transition-all duration-500 ${
          isDark 
            ? 'bg-zinc-900 text-white' 
            : 'bg-white border border-zinc-100 text-black group-hover:border-zinc-300'
        } ${isFlipped ? 'pointer-events-none' : ''}`}>
          <div className={`${isDark ? 'text-zinc-400' : 'text-zinc-600'} group-hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>
            {React.cloneElement(icon as React.ReactElement<any>, { size: 40, strokeWidth: 1 })}
          </div>
          <div className="space-y-4 text-left">
            <h3 className="text-xl font-display font-bold uppercase tracking-tight leading-tight">
              {title}
            </h3>
            <div className="inline-flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold group-hover:gap-6 transition-all">
              {readMoreText} <MoveRight size={12} />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className={`absolute inset-0 backface-hidden rotate-y-180 p-8 flex flex-col justify-between shadow-2xl ${
            isDark 
              ? 'bg-zinc-800 text-white border border-zinc-700' 
              : 'bg-zinc-50 text-black border border-zinc-200'
          } ${!isFlipped ? 'pointer-events-none' : ''}`}
        >
          <div className="flex flex-col h-full text-left">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                {title}
              </h4>
              <RotateCcw size={16} className="text-zinc-400" />
            </div>
            
            <div className="overflow-y-auto grow pr-2 custom-scrollbar">
              <p className="text-[11px] md:text-xs leading-relaxed text-zinc-400 mb-6">
                {t(`cards.info.${id}.description`)}
              </p>

              <div className="space-y-2 pb-4">
                {featureList.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={12} className={isDark ? "text-white" : "text-black"} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-200/10 flex justify-between items-center shrink-0">
              <a 
                href="#pricing" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  scrollToSection(e, '#pricing');
                  window.dispatchEvent(new CustomEvent('select-category', { detail: id }));
                }}
                className={cn(
                  buttonVariants({ variant: isDark ? "polygon" : "polygon2" }), 
                  "text-[9px] px-6 py-3"
                )}
              >
                {t('cards.viewPlans')}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const { t } = useTranslation('services');

  const services = [
    { id: 'software', icon: <PenTool />, isDark: true },
    { id: 'websites', icon: <Monitor />, isDark: false },
    { id: 'marketing', icon: <Target />, isDark: false }
  ];

  const [flippedId, setFlippedId] = React.useState<string | null>(null);

  const handleToggle = (id: string) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <section className="bg-white text-black min-h-screen lg:min-h-0 relative pt-12 px-8 md:px-24 lg:px-32 xl:px-40">
      {/* Top Meta Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-zinc-100 pb-6">
        <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
          {SITE_INFO.social.slice(0, 3).map((social) => (
            <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
              <social.icon size={14} /> {social.name}
            </a>
          ))}
        </div>
        
        <div className="grow mx-8 hidden md:block">
          <div className="h-px bg-zinc-200 w-full"></div>
        </div>

        <a href={`mailto:${SITE_INFO.email}`} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-50 transition-opacity">
          <Mail size={14} /> {SITE_INFO.email}
        </a>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start"
        >
           <div className="flex items-center gap-4 mb-2">
             <div className="w-8 h-[2px] bg-black"></div>
             <span className="text-[10px] uppercase tracking-[0.2em] font-black">{t('header.tag')}</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tighter uppercase">
             <Trans i18nKey="header.title" ns="services" components={{ br: <br /> }} />
           </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-sm lg:pt-8"
        >
          <p className="text-zinc-500 text-sm leading-relaxed text-left lg:text-left">
            {t('header.description')}
          </p>
        </motion.div>
      </div>

      {/* Services Grid/Flex */}
      <div className="relative flex flex-col md:flex-row gap-6 mt-8 pl-0 lg:pl-16 items-stretch md:items-start md:min-h-[430px]">
        
        {/* Scroll Bar Sidebar (Left) */}
        <div className="absolute -left-12 top-0 hidden xl:flex flex-col items-center gap-6">
            <span className="-rotate-90 whitespace-nowrap text-[8px] uppercase tracking-[0.3em] font-bold text-zinc-400 origin-center translate-y-6">
              {t('sidebar')}
            </span>
            <div className="w-px h-24 bg-zinc-200"></div>
            <a href="#pricing" onClick={(e) => scrollToSection(e, '#pricing')} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center bg-black text-white cursor-pointer hover:bg-zinc-800 transition-colors shadow-xl">
              <ArrowDown size={18} />
            </a>
        </div>

        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            id={service.id}
            icon={service.icon}
            title={t(`cards.${service.id}`)}
            isDark={service.isDark}
            readMoreText={t('cards.readMore')}
            isFlipped={flippedId === service.id}
            onToggle={() => handleToggle(service.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
