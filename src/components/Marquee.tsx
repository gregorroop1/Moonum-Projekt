import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

const Marquee: React.FC = () => {
  const { t } = useTranslation('services');
  const items = t('marquee', { returnObjects: true }) as string[];

  return (
    <div className="relative w-full bg-black border-t border-white/20 border-b border-white/10 py-6 overflow-hidden z-20 pointer-events-none">
      <div className="flex whitespace-nowrap animate-halide-marquee w-max">
        {/* Render twice for seamless loop */}
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-8 px-4 font-display font-bold text-[0.85rem] tracking-[0.1em] text-white">
                <span>{item}</span>
                <Sparkles size={16} className="text-white opacity-50" />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
