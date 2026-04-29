import React, { useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame 
} from 'motion/react';
import { useTranslation } from 'react-i18next';
import { PROCESS_STEPS } from '../constants/data';

/**
 * Helper component for the SVG grid pattern.
 */
const GridPattern = ({ offsetX, offsetY, size }: { offsetX: any; offsetY: any; size: number }) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground" 
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};

const InfiniteGridBackground = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const gridSize = 40;
  
  // Grid offsets for infinite scroll animation
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.5; 
  const speedY = 0.5;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    // Reset offset at pattern width to simulate infinity
    gridOffsetX.set((currentX + speedX) % gridSize);
    gridOffsetY.set((currentY + speedY) % gridSize);
  });

  // Create a dynamic radial mask for the "flashlight" effect
  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Layer 1: Subtle background grid (always visible) */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} size={gridSize} />
      </div>

      {/* Layer 2: Highlighted grid (revealed by mouse mask) */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-80"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} size={gridSize} />
      </motion.div>

      {/* Decorative Blur Spheres */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Section Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[-10%] w-[50%] h-[40%] rounded-full bg-purple-600/8 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -20, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-[-5%] top-[5%] w-[30%] h-[30%] rounded-full bg-brand-primary/03 blur-[100px]" 
        />

        {/* Middle Section Blobs */}
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[5%] top-[30%] w-[35%] h-[40%] rounded-full bg-indigo-600/10 blur-[130px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute left-[20%] top-[45%] w-[25%] h-[25%] rounded-full bg-purple-500/8 blur-[110px]" 
        />

        {/* Bottom Section Blobs */}
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10%] bottom-[-10%] w-[50%] h-[40%] rounded-full bg-purple-900/12 blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 25, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute right-[-5%] bottom-[5%] w-[35%] h-[35%] rounded-full bg-brand-primary/12 blur-[120px]" 
        />
      </div>
    </div>
  );
};

const ProcessSection: React.FC = () => {
  const { t } = useTranslation(['process', 'data']);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Track mouse position for the flashlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const clientX = useRef(0);
  const clientY = useRef(0);

  const updateMousePosition = () => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(clientX.current - left);
    mouseY.set(clientY.current - top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    clientX.current = e.clientX;
    clientY.current = e.clientY;
    updateMousePosition();
  };

  useAnimationFrame(() => {
    updateMousePosition();
  });

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="bg-zinc-950 text-white py-32 px-4 md:px-16 relative overflow-hidden"
    >
      {/* Infinite Grid Background */}
      <InfiniteGridBackground mouseX={mouseX} mouseY={mouseY} />

      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        {/* Header Row */}
        <div className="flex flex-col items-center text-center gap-12 mb-32">
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tighter max-w-5xl uppercase">
            {t('header', { ns: 'process' })}
          </h2>
          <div className="w-24 h-[1px] bg-purple-500/50"></div>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-zinc-800 hidden lg:block overflow-hidden">
             <motion.div 
               className="w-full bg-purple-500 origin-top"
               style={{ scaleY: scrollYProgress, height: "100%" }}
             />
          </div>

          <div className="space-y-32">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div 
                key={index} 
                initial="inactive"
                whileInView="active"
                viewport={{ margin: "-30% 0px -30% 0px" }}
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
                     className="w-5 h-5 rounded-full border-4 border-zinc-900"
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
