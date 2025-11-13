"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export const Timeline = React.memo(({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 20%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Show title only when in timeline section - more responsive bounds for mobile
    const inTimeline = latest > 0.02 && latest < 0.98;
    setShowTitle(inTimeline);
    
    if (inTimeline) {
      // More aggressive progress calculation for mobile responsiveness
      const progress = Math.max(0, Math.min(1, (latest - 0.02) / 0.96));
      setScrollProgress(progress);
      
      // More responsive section calculation - sections activate earlier on mobile
      const sectionProgress = progress * data.length;
      // Add offset to make sections activate earlier on mobile
      const sectionIndex = Math.floor(sectionProgress + 0.3);
      
      // Ensure we don't exceed array bounds
      const clampedIndex = Math.max(0, Math.min(sectionIndex, data.length - 1));
      
      // Always update to ensure responsiveness
      setActiveIndex(clampedIndex);
    } else {
      setScrollProgress(0);
      // Reset to first section when out of bounds
      if (latest < 0.02) {
        setActiveIndex(0);
      }
    }
  });

  return (
    <div
      className="w-full font-sans px-6 md:px-10 relative z-20"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 z-20">
        {/* Our Solutions Section */}
        <div className="mb-12 md:mb-20 text-center max-w-4xl mx-auto px-4 md:px-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent leading-tight tracking-tight font-heading">
            Our Solutions
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed font-medium tracking-wide">
            Smarter tools that save you time and help you grow faster
          </p>
        </div>

        {/* Fixed title container with integrated progress indicator - DESKTOP ONLY */}
        <div className="hidden md:block fixed top-1/2 left-10 z-50 pointer-events-none" style={{ 
          opacity: showTitle && scrollProgress < 0.85 ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
          transform: 'translateY(-50%)'
        }}>
          <div>
            {/* Product title positioned on left side */}
            <div className="text-lg md:text-3xl font-bold min-h-[4rem] flex items-center">
              {showTitle && scrollProgress < 0.85 && (
                <motion.h3
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="text-white font-bold text-2xl md:text-4xl bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent font-heading tracking-tight"
                >
                  {data[activeIndex]?.title}
                </motion.h3>
              )}
            </div>
          </div>
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className="flex relative pb-12 md:pb-20 last:pb-0"
          >
            <div className="hidden md:block w-20 flex-shrink-0"></div>
            
            {/* Right side content - positioned to the right */}
            <div className="relative pl-4 md:pl-12 pr-4 md:pr-12 max-w-3xl z-30 md:ml-auto w-full md:w-auto" data-section={index}>
              {/* Mobile product title - shows only on mobile */}
              <h3 className="md:hidden block text-2xl sm:text-3xl mb-4 md:mb-6 text-left font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent font-heading">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="md:hidden block text-sm text-cyan-400 font-medium mb-4 tracking-wide">
                  {item.subtitle}
                </p>
              )}
              <motion.div 
                className="timeline-card relative z-30 bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-500/20 hover:border-cyan-400/40 p-6 md:p-12 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 1.0,
                    ease: [0.25, 0.4, 0.25, 1],
                    delay: 0.3
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.4 }
                }}
                onViewportEnter={() => {
                  // Add glow effect when card enters viewport
                  const card = document.querySelector(`[data-section="${index}"] .timeline-card`);
                  if (card) {
                    card.classList.add('in-view-glow');
                  }
                }}
              >
                {/* Enhanced glow effect from below */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-xl opacity-0 transition-opacity duration-500"></div>
                
                {item.content}
              </motion.div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
});