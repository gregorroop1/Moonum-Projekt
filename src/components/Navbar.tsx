import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Tag, Grid, Mail } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Kui kerime alla rohkem kui 100px, näitame küljemenüüd
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Avaleht', href: '#', icon: <Home size={20} strokeWidth={1.5} /> },
    { name: 'Teenused', href: '#services', icon: <Briefcase size={20} strokeWidth={1.5} /> },
    { name: 'Hinnakiri', href: '#pricing', icon: <Tag size={20} strokeWidth={1.5} /> },
    { name: 'Tehtud tööd', href: '#works', icon: <Grid size={20} strokeWidth={1.5} /> },
    { name: 'Kontakt', href: '#contact', icon: <Mail size={20} strokeWidth={1.5} /> },
  ];

  return (
    <>
      {/* Tume overlay taust, mis ilmub küljemenüü hoverdamisel */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-500 pointer-events-none ${
          isScrolled && isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Ülemine Navbar (Nähtav ainult lehe alguses) */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-transform duration-700 ease-in-out ${
          isScrolled ? '-translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
             <span className="text-xl font-bold tracking-[0.2em] text-white font-sans">MOONUM</span>
             <div className="w-1.5 h-1.5 bg-[#ff3c00] rounded-full mb-1 shadow-[0_0_10px_#ff3c00]"></div>
          </div>
          
          {/* Menüü lingid (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href}
                className="text-zinc-400 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Nupp */}
        <div className="hidden md:block">
           <a 
             href="#" 
             className="bg-zinc-200 text-black px-8 py-3.5 font-bold text-[10px] tracking-widest uppercase transition-all hover:-translate-y-1 hover:bg-[#ff3c00] hover:text-white inline-block"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)' }}
           >
             Uuri sügavust
           </a>
        </div>
      </nav>

      {/* Küljemenüü (Nähtav ainult allapoole kerides) */}
      <nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-1/2 -translate-y-1/2 left-6 z-50 transition-all duration-700 ease-in-out ${
          isScrolled ? 'translate-x-0 opacity-100' : '-translate-x-[150%] opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className={`bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/50 rounded-[2rem] p-3 flex flex-col gap-2 transition-all duration-500 ease-out shadow-2xl overflow-hidden ${
            isHovered ? 'w-48' : 'w-[60px]'
          }`}
        >
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-4 text-zinc-400 hover:text-white hover:bg-zinc-800/50 p-2.5 rounded-2xl transition-all duration-300 relative group overflow-hidden"
              title={!isHovered ? item.name : undefined}
            >
              <div className="shrink-0 relative z-10">{item.icon}</div>
              
              <span 
                className={`text-sm font-medium whitespace-nowrap relative z-10 transition-opacity duration-300 ${
                  isHovered ? 'opacity-100 delay-100' : 'opacity-0 absolute'
                }`}
              >
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
