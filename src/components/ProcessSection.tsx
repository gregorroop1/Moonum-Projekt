import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'motion/react';

function WarpBackground() {
  const [Warp, setWarp] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    let isMounted = true;

    import('@paper-design/shaders-react').then((module) => {
      if (isMounted) {
        setWarp(() => module.Warp);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!Warp) {
    return null;
  }

  return (
    <Warp
      style={{ height: '100%', width: '100%' }}
      proportion={0.45}
      softness={1}
      distortion={0.25}
      swirl={0.8}
      swirlIterations={10}
      shape="checks"
      shapeScale={0.1}
      scale={1}
      rotation={0}
      speed={1}
      colors={['hsl(280, 90%, 15%)', 'hsl(300, 100%, 35%)', 'hsl(260, 80%, 25%)', 'hsl(320, 100%, 45%)']}
    />
  );
}

const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
    {
      title: "01. Esmane kontakt",
      description: "Võtke meiega julgelt ühendust ja räägime sinu ideest täpsemalt, ära karda meile läbirääkimistel EI öelda sest, meie jaoks on oluline, et leiaksite endale tegija kes vastaks täpselt teie vajadustele. Kaardistame sinu eesmärgid, sihtgrupi ja ootused. See on kõige olulisem samm, sest hästi toimiv veebileht algab selgest visioonist. Meie eesmärk on mõista, mida sa tegelikult vajad — mitte lihtsalt mida sa arvad, et vajad.",
      isActive: true
    },
    {
      title: "02. Analüüs ja strateegia",
      description: "Sukeldume sinu projekti süvitsi. Analüüsime sinu ettevõtet, konkurente ja turgu. Loome selge strateegia, kuidas sinu veebileht saaks eristuda ja tuua reaalseid tulemusi. See sisaldab ka struktuuri, kasutajakogemuse (UX) ja positsioneerimise läbimõtlemist.",
      isActive: false
    },
    {
      title: "03. Disain ja veebiarendus",
      description: "Disainime modernse ja visuaalselt eristuva veebilehe ning arendame selle tehniliselt kiireks, turvaliseks ja SEO-sõbralikuks. Iga detail on läbimõeldud — alates kasutajakogemusest kuni laadimiskiiruseni.",
      isActive: false
    },
    {
      title: "04. Koos ülevaatus",
      description: "Vaatame koos tulemuse üle ja vajadusel teeme viimase lihvi. Esitleme sulle valminud lahendust ning kogume tagasisidet. Vajadusel teeme muudatused, et lõpptulemus vastaks täielikult sinu ootustele.",
      isActive: false
    },
    {
      title: "05. Avaldamine",
      description: "Toome sinu idee ellu. Seadistame kõik vajaliku — domeen, hosting, tehnilised detailid ja põhjalik testimine. Tagame, et veebileht töötab laitmatult kõigis seadmetes ja on valmis külastajaid vastu võtma.",
      isActive: false
    },
    {
      title: "06. Tugi ja järelhooldus",
      description: "Me ei kao pärast projekti lõppu. Pakume pidevat tuge, hooldust ja vajadusel edasiarendust. Sinu veebileht peab ajas arenema ja meie aitame sul sellel teekonnal kaasas olla.",
      isActive: false
    }
  ];

  return (
    <section className="bg-zinc-800 text-white py-32 px-4 md:px-16 relative overflow-hidden" id="process">
      {/* Warp Shader Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <WarpBackground />
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        {/* Header Row */}
        <div className="flex flex-col items-center text-center gap-12 mb-32">
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tighter max-w-5xl uppercase">
            Meie protsess
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
            {steps.map((step, index) => (
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
                    {step.title}
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
                     {step.description}
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
