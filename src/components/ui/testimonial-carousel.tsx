"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  text: string;
  image: string;
  logo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sukrit",
    title: "CEO",
    company: "Apti Consultancy",
    text: "Working with Lumora has been great for Apti. Their team built a stylish, user-friendly website that matches our brand perfectly. With Lumora, we're also adding an AI assistant and CRM to our site, the AI will help us capture leads and support tickets, while the CRM will streamline how we manage prospects and tickets. This powerful combination will help us respond faster, convert more leads, and ensure every enquiry gets resolved. Lumora's professionalism and creativity made the whole process smooth. We strongly recommend them for web design and smart business solutions with artificial intelligence.",
    image: "/WhatsApp Image 2025-09-13 at 23.53.44.jpeg",
    logo: "/WhatsApp_Image_2025-09-07_at_19.21.32-removebg-preview.png"
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-heading">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Trusted by businesses worldwide to deliver exceptional results
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-12"
              >
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                  {/* Quote Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                      <Quote className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6 md:mb-8 font-medium">
                      "{testimonials[currentIndex].text}"
                    </blockquote>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
                      {/* Client Photo */}
                      <div className="flex-shrink-0">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-cyan-500/30"
                        />
                      </div>
                      
                      {/* Client Info */}
                      <div className="text-center sm:text-left">
                        <h4 className="text-white font-semibold text-lg md:text-xl">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-cyan-400 font-medium">
                          {testimonials[currentIndex].title}
                        </p>
                        <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                          <p className="text-gray-300">
                            {testimonials[currentIndex].company}
                          </p>
                          {testimonials[currentIndex].logo && (
                            <img
                              src={testimonials[currentIndex].logo}
                              alt={`${testimonials[currentIndex].company} logo`}
                              className="h-6 md:h-8 w-auto opacity-80"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center mt-8 md:mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};