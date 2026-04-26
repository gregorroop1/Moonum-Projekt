import React, { useEffect, useRef } from 'react';

const MoonumLanding: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      // Rotate the 3D Canvas
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;

      // Apply depth shift to layers
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Entrance Animation
    canvas.style.opacity = '0';
    canvas.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.8)';
    
    const timeout = setTimeout(() => {
      canvas.style.transition = 'all 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      canvas.style.opacity = '1';
      canvas.style.transform = 'rotateX(55deg) rotateZ(-25deg) scale(1)';
    }, 300);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --bg: #0a0a0a;
          --silver: #e0e0e0;
          --accent: #ff3c00;
          --grain-opacity: 0.15;
        }

        .halide-body {
          background-color: var(--bg);
          color: var(--silver);
          font-family: var(--font-sans);
          height: 100vh;
          width: 100%;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .halide-grain {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 100;
          opacity: var(--grain-opacity);
        }

        .viewport {
          perspective: 2000px;
          width: 100vw; height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }

        .canvas-3d {
          position: relative;
          width: 800px; height: 500px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .layer {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(224, 224, 224, 0.1);
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }

        .layer-1 { 
          background-image: url('/llama.png'); 
          background-size: cover; 
          background-position: center; 
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          overflow: hidden;
        }
        .layer-2 { background: transparent; border: none; pointer-events: none; }

        .contours {
          position: absolute;
          width: 200%; height: 200%;
          top: -50%; left: -50%;
          background-image: repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(255,255,255,0.05) 41px, transparent 42px);
          transform: translateZ(-50px);
          pointer-events: none;
        }

        .interface-grid {
          position: absolute;
          inset: 0;
          padding: 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          z-index: 10;
          pointer-events: none;
        }

        .hero-title {
          grid-column: 1 / -1;
          align-self: center;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: clamp(3rem, 10vw, 10rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          mix-blend-mode: difference;
        }

        .cta-button {
          pointer-events: auto;
          background: var(--silver);
          color: var(--bg);
          padding: 1rem 2rem;
          text-decoration: none;
          font-weight: 700;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
          transition: 0.3s;
        }

        .cta-button:hover { background: var(--accent); transform: translateY(-5px); }

        .scroll-hint {
          position: absolute;
          bottom: 2rem; left: 50%;
          width: 1px; height: 60px;
          background: linear-gradient(to bottom, var(--silver), transparent);
          animation: flow 2s infinite ease-in-out;
        }

        @keyframes flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>
      
      <div className="halide-body">
        {/* SVG Filter for Grain */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        <div className="halide-grain" style={{ filter: 'url(#grain)' }}></div>

        <div className="interface-grid">
          <div className="flex flex-col justify-center items-end text-right translate-y-16" style={{ gridRow: 2, gridColumn: 2 }}>
            <h1 className="font-['Michroma'] uppercase" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', lineHeight: '1.2', filter: 'drop-shadow(0px 12px 24px rgba(0,0,0,1)) drop-shadow(0px 0px 12px rgba(0,0,0,0.8)) drop-shadow(0px 0px 4px rgba(0,0,0,1))' }}>
               <div className="flex items-center gap-4 justify-end">
                  <span className="text-white">LUUES</span>
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>DIGITAALSEID</span>
               </div>
               <div className="text-transparent mt-2" style={{ WebkitTextStroke: '1px white' }}>ELAMUSI</div>
            </h1>
          </div>

          <div style={{ gridColumn: '1 / -1', gridRow: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
              <p>[ MOONUM 2025 ]</p>
              <p>KAASAHAARAVATE JA TULEMUSELE ORIENTEERITUD<br />VEEBILEHTEDE TEGEMINE NING TARKVARA ARENDUS EESTIS</p>
            </div>
          </div>
        </div>

        <div className="viewport">
          <div className="canvas-3d" ref={canvasRef}>
            <div className="layer layer-1" ref={(el) => (layersRef.current[0] = el!)} style={{ backgroundImage: `url('/Alpaca_blizidega.jpeg')`, backgroundColor: '#111' }}>
               <div className="absolute inset-0 bg-black/40 rounded-[16px]"></div>
            </div>
            <div className="layer layer-2" ref={(el) => (layersRef.current[1] = el!)}>
               <div className="flex justify-between items-center w-full p-6 text-white">
                  <div className="font-sans font-bold tracking-[0.2em] text-lg flex items-center gap-2">
                     <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                       <div className="w-1 h-1 bg-white rounded-full"></div>
                     </div>
                     MOONUM
                  </div>
                  
                  <div className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold shadow-lg">
                     <span className="cursor-pointer hover:text-white/70 transition-colors">Avaleht</span>
                     <span className="cursor-pointer hover:text-white/70 transition-colors">Teenused</span>
                     <span className="cursor-pointer hover:text-white/70 transition-colors">Hinnakiri</span>
                  </div>

                  <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold">
                     <button className="bg-[#ff3c00] text-white px-6 py-3 rounded-full hover:bg-[#ff3c00]/80 transition-colors shadow-lg shadow-[#ff3c00]/20">
                       Võta ühendust
                     </button>
                  </div>
               </div>
            </div>
            <div className="contours"></div>
          </div>
        </div>

        <div className="scroll-hint"></div>
      </div>
    </>
  );
};

export default MoonumLanding;
