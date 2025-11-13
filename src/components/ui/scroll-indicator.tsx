"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator: React.FC = () => {
  const scrollToProducts = () => {
    const productsSection = document.querySelector('.timeline-item, [data-section="0"]');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div 
      className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 1 }}
      onClick={scrollToProducts}
    >
      <div className="flex flex-col items-center space-y-2">
        <motion.p 
          className="text-gray-300 text-sm md:text-base font-medium tracking-wide"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-2 rounded-full border border-cyan-500/30 bg-slate-900/20 backdrop-blur-sm hover:border-cyan-400/50 hover:bg-slate-800/30 transition-all duration-300"
        >
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
        </motion.div>
      </div>
    </motion.div>
  );
};