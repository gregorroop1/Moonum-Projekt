import React from 'react';
import { 
  Share2, 
  Music, 
  Camera, 
  Mail, 
  MoveRight, 
  ArrowDown, 
  PenTool, 
  Monitor, 
  Target 
} from 'lucide-react';

const ServicesSection: React.FC = () => {
  return (
    <section className="bg-white text-black min-h-screen lg:min-h-0 relative py-12 px-8 md:px-24 lg:px-32 xl:px-40 overflow-hidden">
      {/* Top Meta Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-zinc-100 pb-6">
        <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
          <a href="#" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
            <Share2 size={14} /> FACEBOOK
          </a>
          <a href="#" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
            <Music size={14} /> TIKTOK
          </a>
          <a href="#" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
            <Camera size={14} /> INSTAGRAM
          </a>
        </div>
        
        <div className="flex-grow mx-8 hidden md:block">
          <div className="h-[1px] bg-zinc-200 w-full"></div>
        </div>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold">
          <Mail size={14} /> Info@moonum.ee
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-5">
           <div className="flex items-center gap-4 mb-2" id="services">
             <div className="w-8 h-[2px] bg-black"></div>
             <span className="text-[10px] uppercase tracking-[0.2em] font-black">teenused</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tighter uppercase font-sans">
             Mida me<br />Pakume
           </h2>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-end pb-1">
          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
            Loome visuaalselt silmapaistvaid ja loogilise ülesehitusega veebilahendusi, mis räägivad teie brändi unikaalset lugu. Meie veebiarendus põhineb sügaval arusaamal UI/UX disainist ja kasutajakogemusest.
          </p>
        </div>

        <div className="lg:col-span-3 flex items-end justify-start lg:justify-end pb-1">
          <button className="bg-black text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
            vaata kõiki teenuseid
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pl-0 lg:pl-16">
        
        {/* Scroll Bar Sidebar (Left) */}
        <div className="absolute left-[-3rem] top-0 hidden xl:flex flex-col items-center gap-6">
            <span className="rotate-270 whitespace-nowrap text-[8px] uppercase tracking-[0.3em] font-bold text-zinc-400 origin-center translate-y-6">
              KERI ALLA
            </span>
            <div className="w-[1px] h-24 bg-zinc-200"></div>
            <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center bg-black text-white cursor-pointer hover:bg-zinc-800 transition-colors shadow-xl">
              <ArrowDown size={18} />
            </div>
        </div>

        {/* Card 1 */}
        <div className="bg-zinc-900 text-white aspect-[4/5] md:aspect-square p-8 flex flex-col justify-between group cursor-pointer hover:translate-y-[-8px] transition-transform duration-500 shadow-2xl">
          <PenTool size={40} strokeWidth={1} className="text-zinc-400 group-hover:text-white transition-colors" />
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold uppercase tracking-tight leading-tight">
              UI-UX<br />LOOV<br />DISAIN
            </h3>
            <a href="#" className="inline-flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold group-hover:gap-6 transition-all">
              LOE EDASI <MoveRight size={12} />
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-zinc-100 aspect-[4/5] md:aspect-square p-8 flex flex-col justify-between group cursor-pointer hover:translate-y-[-8px] transition-transform duration-500">
          <Monitor size={40} strokeWidth={1} className="text-zinc-600 group-hover:text-black transition-colors" />
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold uppercase tracking-tight leading-tight">
              VISUAALNE<br />GRAAFILINE DISAIN
            </h3>
            <a href="#" className="inline-flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold group-hover:gap-6 transition-all">
              LOE EDASI <MoveRight size={12} />
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-zinc-100 aspect-[4/5] md:aspect-square p-8 flex flex-col justify-between group cursor-pointer hover:translate-y-[-8px] transition-transform duration-500">
          <Target size={40} strokeWidth={1} className="text-zinc-600 group-hover:text-black transition-colors" />
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold uppercase tracking-tight leading-tight text-zinc-900">
              STRATEEGIA JA<br />DIGITURUNDUS
            </h3>
            <a href="#" className="inline-flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold group-hover:gap-6 transition-all text-zinc-900">
              LOE EDASI <MoveRight size={12} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .rotate-270 {
          transform: rotate(-90deg);
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
