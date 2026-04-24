import React from 'react';
import { Sparkles } from 'lucide-react';

const Marquee: React.FC = () => {
  const items = [
    "VEEBIDISAIN",
    "ÄPI DISAIN",
    "ARENDUS",
    "WEB FLOW",
    "BRÄNDING"
  ];

  return (
    <div className="halide-marquee-container">
      <style>{`
        .halide-marquee-container {
          position: relative;
          width: 100%;
          background: #000;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 0;
          overflow: hidden;
          z-index: 20;
          pointer-events: none;
        }

        .marquee-content {
          display: flex;
          white-space: nowrap;
          animation: halide-marquee 30s linear infinite;
          width: max-content;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 0 1rem;
          font-family: 'Syncopate', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: #fff;
        }

        .marquee-icon {
          color: #fff;
          opacity: 0.5;
        }

        @keyframes halide-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      
      <div className="marquee-content">
        {/* Render twice for seamless loop */}
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((item, index) => (
              <div key={index} className="marquee-item">
                <span>{item}</span>
                <Sparkles size={16} className="marquee-icon" />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
