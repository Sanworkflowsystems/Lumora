"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedQuoteProps {
  text: string;
  className?: string;
  variant?: 'typewriter' | 'neon' | 'glow';
  typeSpeed?: number;
}

export const AnimatedQuote: React.FC<AnimatedQuoteProps> = React.memo(({
  text,
  className = '',
  variant = 'typewriter',
  typeSpeed = 50
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    if (variant === 'typewriter') {
      let i = 0;

      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          setIsComplete(true);
          clearInterval(typeInterval);
        }
      }, typeSpeed);

      return () => clearInterval(typeInterval);
    } else {
      // For non-typewriter variants, show text immediately when in view
      setDisplayText(text);
      setIsComplete(true);
    }
  }, [isInView, text, variant, typeSpeed]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'neon':
        return 'text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse-slow';
      case 'glow':
        return 'bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]';
      default:
        return 'text-white';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  return (
    <section className={`relative z-20 ${className}`} ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Background glow effect */}
          {variant === 'glow' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-3xl rounded-full"></div>
          )}
          
          <blockquote className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight font-heading relative z-10 ${getVariantClasses()}`}>
            "{displayText}"
            {variant === 'typewriter' && !isComplete && (
              <span className="animate-pulse text-cyan-400">|</span>
            )}
          </blockquote>
          
          {/* Decorative elements */}
          <div className="flex justify-center mt-8 md:mt-12">
            <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/50"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});