import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useMotionValue, 
  useMotionTemplate,
  useSpring
} from 'motion/react';
import { useTranslation } from 'react-i18next';
import { PROCESS_STEPS } from '../constants/data';

/**
 * Helper component for the SVG grid pattern.
 * Now simplified to be a static pattern used as a background.
 */
const GridPattern = ({ size }: { size: number }) => {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <pattern
          id="grid-pattern-static"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground" 
          />
        </pattern>
      </defs>
    </svg>
  );
};

const InfiniteGridBackground = ({ mouseX, mouseY, isMobile }: { mouseX: any; mouseY: any; isMobile: boolean }) => {
  // Create a dynamic radial mask for the "flashlight" effect
  // We use a spring for smoother tracking without useAnimationFrame
  const maskRadius = isMobile ? '250px' : '350px';
  const maskImage = useMotionTemplate`radial-gradient(${maskRadius} circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" style={{ transform: 'translate3d(0,0,0)' }}>
      <GridPattern size={40} />
      
      {/* Layer 1: Subtle background grid (always visible) */}
      <div 
        className={`absolute inset-0 z-0 will-change-[background-position] opacity-25`}
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M 40 0 L 0 0 0 40\' fill=\'none\' stroke=\'rgba(255,255,255,0.3)\' stroke-width=\'1\'/%3E%3C/svg%3E")',
          animation: 'grid-flow 20s linear infinite'
        }}
      />

      {/* Layer 2: Highlighted grid (revealed by mouse mask) - Desktop only */}
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 z-0 will-change-transform opacity-80"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M 40 0 L 0 0 0 40\' fill=\'none\' stroke=\'rgba(255,255,255,0.5)\' stroke-width=\'1\'/%3E%3C/svg%3E")',
            animation: 'grid-flow 20s linear infinite',
            maskImage, 
            WebkitMaskImage: maskImage 
          }}
        />
      )}

      {/* Decorative Blur Spheres */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        {/* Top Section Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[-10%] w-[50%] h-[40%] rounded-full bg-purple-600/8 blur-[100px] will-change-transform" 
        />
        <motion.div 
          animate={{ 
            x: [0, -20, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-[-5%] top-[5%] w-[30%] h-[30%] rounded-full bg-brand-primary/10 blur-[80px] will-change-transform" 
        />

        {/* Middle Section Blobs */}
        {!isMobile && (
          <>
            <motion.div 
              animate={{ 
                y: [0, 50, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[5%] top-[30%] w-[35%] h-[40%] rounded-full bg-indigo-600/10 blur-[110px] will-change-transform" 
            />
            <motion.div 
              animate={{ 
                x: [0, 40, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute left-[20%] top-[45%] w-[25%] h-[25%] rounded-full bg-purple-500/8 blur-[90px] will-change-transform" 
            />
          </>
        )}

        {/* Bottom Section Blobs */}
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10%] bottom-[-10%] w-[50%] h-[40%] rounded-full bg-purple-900/12 blur-[120px] will-change-transform" 
        />
        <motion.div 
          animate={{ 
            x: [0, 25, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute right-[-5%] bottom-[5%] w-[35%] h-[35%] rounded-full bg-brand-primary/12 blur-[100px] will-change-transform" 
        />
      </div>
    </div>
  );
};

const ProcessSection: React.FC = () => {
  const { t } = useTranslation('data');
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Track mouse position with springs for smoothness without layout thrashing
  const mouseX = useSpring(useMotionValue(0), { damping: 25, stiffness: 150 });
  const mouseY = useSpring(useMotionValue(0), { damping: 25, stiffness: 150 });
  
  // Store viewport-relative coordinates to recalculate during scroll
  const clientX = useRef(0);
  const clientY = useRef(0);
  const sectionTop = useRef(0);

  useEffect(() => {
    const updateSectionPos = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // sectionTop is the absolute position of the section from the top of the document
        sectionTop.current = rect.top + window.scrollY;
      }
    };

    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      updateSectionPos();
    };

    const handleScroll = () => {
      if (isMobile) return;
      // Update mouseY based on viewport mouse Y and current scroll
      // Formula: mouseY_relative = clientY_viewport + scrollY - section_top_absolute
      mouseY.set(clientY.current + window.scrollY - sectionTop.current);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, mouseY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return; 
    if (!sectionRef.current) return;
    
    // Store latest viewport coordinates
    clientX.current = e.clientX;
    clientY.current = e.clientY;
    
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="bg-zinc-950 text-white py-32 px-4 md:px-16 relative overflow-hidden"
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      {/* Infinite Grid Background */}
      <InfiniteGridBackground mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />

      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        {/* Header Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-12 mb-32"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tighter max-w-5xl uppercase">
            {t('process.header')}
          </h2>
          <div className="w-24 h-px bg-purple-500/50"></div>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-zinc-800 hidden lg:block overflow-hidden">
             <motion.div 
               className="w-full bg-purple-500 origin-top will-change-transform"
               style={{ scaleY: scrollYProgress, height: "100%" }}
             />
          </div>

          <div className="space-y-32">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div 
                key={index} 
                initial="inactive"
                whileInView="active"
                viewport={{ margin: "-30% 0px -30% 0px", once: false }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-40 relative items-start"
              >
                
                {/* Left Side: Title */}
                <div className="lg:text-right lg:pr-20">
                  <motion.h3 
                    variants={{
                      inactive: { color: "#3f3f46" },
                      active: { color: "#ffffff" }
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-4xl font-display font-bold leading-[1.1] uppercase"
                  >
                    {t(`process.${step.id}.title`, { ns: 'data' })}
                  </motion.h3>
                </div>

                {/* Timeline Dot (Desktop only) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-4 hidden lg:flex items-center justify-center z-10">
                   <motion.div 
                     variants={{
                       inactive: { backgroundColor: "#27272a", scale: 1, boxShadow: "0 0 0px rgba(168, 85, 247, 0)" },
                       active: { backgroundColor: "#a855f7", scale: 1.5, boxShadow: "0 0 20px rgba(168, 85, 247, 0.8)" }
                     }}
                     transition={{ duration: 0.5 }}
                     className="w-5 h-5 rounded-full border-4 border-zinc-900 will-change-[transform,background-color]"
                   ></motion.div>
                </div>

                {/* Right Side: Description */}
                <div className="lg:pl-20 pt-2">
                   <motion.p 
                     variants={{
                       inactive: { color: "#71717a" },
                       active: { color: "#d4d4d8" }
                     }}
                     transition={{ duration: 0.5 }}
                     className="text-base md:text-xl leading-relaxed max-w-xl"
                   >
                     {t(`process.${step.id}.description`, { ns: 'data' })}
                   </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
