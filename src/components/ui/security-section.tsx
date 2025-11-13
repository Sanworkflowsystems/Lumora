"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Lock, Award, CheckCircle } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <section className="py-16 md:py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Main heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-heading"
          >
            Built with industry-leading platforms for security and reliability.
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-300 mb-12 md:mb-16 max-w-2xl mx-auto"
          >
            Powered by top-tier SaaS solutions for robust data protection
          </motion.p>

          {/* Security features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Security Feature 1 */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center space-y-4"
            >
              <motion.div
                variants={iconVariants}
                className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-cyan-500/30 backdrop-blur-sm"
              >
                <Shield className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white">Enterprise Security</h3>
              <p className="text-gray-300 text-center">Built with industry-leading platforms and security protocols</p>
            </motion.div>

            {/* Security Feature 2 */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center space-y-4"
            >
              <motion.div
                variants={iconVariants}
                className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-cyan-500/30 backdrop-blur-sm"
              >
                <Lock className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white">Data Privacy</h3>
              <p className="text-gray-300 text-center">Data privacy powered by top-tier SaaS solutions</p>
            </motion.div>

            {/* Security Feature 3 */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center space-y-4"
            >
              <motion.div
                variants={iconVariants}
                className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-cyan-500/30 backdrop-blur-sm"
              >
                <Award className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white">Certified Reliable</h3>
              <p className="text-gray-300 text-center">Built on reliable platforms with professional monitoring</p>
            </motion.div>
          </div>

          {/* Trust indicators */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-8"
          >
            <div className="flex items-center space-x-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm md:text-base">Professional Grade</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm md:text-base">Secure by Design</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm md:text-base">Privacy Focused</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};