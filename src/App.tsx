import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LazySpline } from './components/LazySpline';
import { supabase, type FormSubmission } from './lib/supabase';
import { LazyTimeline, LazySecuritySection, LazyTestimonialCarousel, LazyAnimatedQuote } from './components/LazyComponents';
import { 
  Bot, 
  BarChart3, 
  Globe,
  ArrowRight, 
  CheckCircle, 
  Zap,
  TrendingUp,
  Users,
  Star,
  Play,
  Terminal,
  Cpu,
  Shield,
  Lock,
  Award
} from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [challenge, setChallenge] = useState('');
  const [problems, setProblems] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [typewriterText, setTypewriterText] = useState('');
  const [heroHeading, setHeroHeading] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [headingComplete, setHeadingComplete] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSpline, setShowSpline] = useState(false);
  
  // Memoized constants to prevent recreation
  const fullText = useMemo(() => 'LUMORA.AI', []);
  const heroHeadingText = useMemo(() => 'GROW YOUR BUSINESS', []);
  const heroDescriptionText = useMemo(() => 'AI-powered websites, assistants, and dashboards that capture leads, book demos, and automate follow-ups', []);
  
  // Scroll to form function
  const scrollToForm = useCallback(() => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Navigation scroll functions
  const scrollToHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToProducts = useCallback(() => {
    const productsSection = document.querySelector('.timeline-item, [data-section="0"]');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const scrollToWhyChooseUs = useCallback(() => {
    const whyChooseSection = document.getElementById('risk-reversal');
    if (whyChooseSection) {
      whyChooseSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Memoized timeline data to prevent recreation on every render
  const timelineData = useMemo(() => [
    {
      title: "AI-Powered Websites",
      subtitle: "Custom-built, conversion-optimized business websites",
      content: (
        <div className="max-w-2xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6 md:mb-8 tracking-tight leading-tight font-heading">
            Websites that actually convert visitors into customers
          </h3>
          <p className="text-sm md:text-base text-cyan-400 font-medium mb-4 md:mb-6 tracking-wide">
            Custom-built, conversion-optimized business websites created using the latest AI design tools, tailored to your brand and market.
          </p>
          <p className="text-lg sm:text-xl text-gray-300 font-medium leading-relaxed mb-8 md:mb-12 tracking-wide">
            Stop losing money to websites that don't sell. Get a conversion-optimized website with built-in AI that captures leads, books demos, and closes deals 24/7.
          </p>
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-base md:text-lg font-medium text-gray-200 tracking-wide">Rank #1 on Google in your market</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-base md:text-lg font-medium text-gray-200 tracking-wide">Convert 3x more visitors into paying customers</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-base md:text-lg font-medium text-gray-200 tracking-wide">Built with enterprise-grade security</span>
            </div>
          </div>
          <button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 hover:from-blue-500 hover:via-cyan-400 hover:to-blue-300 text-white font-bold text-base md:text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] px-8 md:px-12 py-3 md:py-4 transition-all duration-300 rounded-xl"
          >
            Get Your High-Converting Website →
          </button>
        </div>
      ),
    },
    {
      title: "AI Assistants",
      subtitle: "24/7 automated lead qualification and booking",
      content: (
        <div className="max-w-2xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6 md:mb-8 tracking-tight leading-tight font-heading">
            AI assistant that books demos and closes deals while you sleep
          </h3>
          <p className="text-sm md:text-base text-cyan-400 font-medium mb-4 md:mb-6 tracking-wide">
            Seamlessly integrating with your current tech stack, our AI captures all leads and enquiries into a custom-built CRM, streamlining the full process of converting prospects into paying clients.
          </p>
          <p className="text-lg sm:text-xl text-gray-300 font-medium leading-relaxed mb-8 md:mb-12 tracking-wide">
            Turn visitors into qualified leads with 24/7 AI-driven engagement.
          </p>
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-base md:text-lg font-medium text-gray-200 tracking-wide">Never miss a lead; automatically qualify and score prospects</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-base md:text-lg font-medium text-gray-200 tracking-wide">All interactions are tracked within our powerful CRM for efficient sales follow-up</span>
            </div>
          </div>
          <button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 hover:from-blue-500 hover:via-cyan-400 hover:to-blue-300 text-white font-bold text-base md:text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] px-8 md:px-12 py-3 md:py-4 transition-all duration-300 rounded-xl"
          >
            Get Your AI Sales Assistant →
          </button>
        </div>
      ),
    },
    {
      title: "Dashboards & Reports",
      subtitle: "Real-time insights with professional monitoring",
      content: (
        <div className="max-w-2xl">
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-8 tracking-tight leading-tight font-heading">
            Real-time insights that drive million-dollar decisions
          </h3>
          <p className="text-sm md:text-base text-cyan-400 font-medium mb-6 md:mb-8 tracking-wide">
            Real-time insights with professional monitoring
          </p>
          <p className="text-xl text-gray-300 font-medium leading-relaxed mb-12 tracking-wide">
            Stop flying blind. Get real-time dashboards and automated reports that show exactly what's driving growth and where to invest next.
          </p>
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-lg font-medium text-gray-200 tracking-wide">Spot profitable trends before competitors</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-lg font-medium text-gray-200 tracking-wide">Get alerts when opportunities arise</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-lg font-medium text-gray-200 tracking-wide">Automated reports delivered to your inbox</span>
            </div>
          </div>
          <button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 hover:from-blue-500 hover:via-cyan-400 hover:to-blue-300 text-white font-bold text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] px-12 py-4 transition-all duration-300 rounded-xl"
          >
            Get Your Business Intelligence →
          </button>
        </div>
      ),
    },
    {
      title: "Custom Automations",
      subtitle: "AI-powered workflow automation solutions",
      content: (
        <div className="max-w-2xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6 md:mb-8 tracking-tight leading-tight font-heading">
            Automation that saves 20+ hours per week
          </h3>
          <p className="text-sm md:text-base text-cyan-400 font-medium mb-6 md:mb-8 tracking-wide">
            Custom automation solutions built with top-tier AI tools that streamline workflows, save time, and boost revenue generation.
          </p>
          <p className="text-lg sm:text-xl text-gray-300 font-medium leading-relaxed mb-8 md:mb-12 tracking-wide">
            Stop doing work that should run automatically. Our custom automations handle repetitive tasks, sync your tools, and follow up with leads so you can focus on growth.
          </p>
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-base md:text-lg font-medium text-gray-200 tracking-wide">Automatic lead follow-up sequences</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-base md:text-lg font-medium text-gray-200 tracking-wide">All your tools sync seamlessly</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 shadow-lg shadow-cyan-400/50"></div>
              <span className="text-base md:text-lg font-medium text-gray-200 tracking-wide">Critical tasks run on autopilot</span>
            </div>
          </div>
          <button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 hover:from-blue-500 hover:via-cyan-400 hover:to-blue-300 text-white font-bold text-base md:text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] px-8 md:px-12 py-3 md:py-4 transition-all duration-300 rounded-xl"
          >
            Automate Your Business →
          </button>
        </div>
      ),
    },
  ], [scrollToForm]);

  // Load Spline after initial render to improve initial load
  useEffect(() => {
    const timer = setTimeout(() => setShowSpline(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Optimized typewriter effect with requestAnimationFrame
  useEffect(() => {
    let i = 0;
    let animationId: number;
    let lastTime = 0;
    const typeSpeed = 200;
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= typeSpeed) {
        if (i < fullText.length) {
          setTypewriterText(fullText.slice(0, i + 1));
          i++;
          lastTime = currentTime;
        } else {
          return;
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [fullText]);

  // Optimized hero heading animation
  useEffect(() => {
    let i = 0;
    const typeSpeed = 50; // Reduced speed to match animated quote
    
    const headingInterval = setInterval(() => {
      if (i < heroHeadingText.length) {
        setHeroHeading(heroHeadingText.slice(0, i + 1));
        i++;
      } else {
        setHeadingComplete(true);
        clearInterval(headingInterval);
      }
    }, typeSpeed);
    
    return () => clearInterval(headingInterval);
  }, [heroHeadingText]);

  // Optimized hero description animation
  useEffect(() => {
    let i = 0;
    const typeSpeed = 15; // Reduced speed to match animated quote
    const delay = heroHeadingText.length * 50 + 200; // Adjusted delay for new speed
    
    const timer = setTimeout(() => {
      const descriptionInterval = setInterval(() => {
        if (i < heroDescriptionText.length) {
          setHeroDescription(heroDescriptionText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(descriptionInterval);
        }
      }, typeSpeed);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [heroHeadingText, heroDescriptionText]);
  
  // Header scroll effect - optimized with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const heroHeight = window.innerHeight * 0.8;
          setIsScrolled(scrollPosition > heroHeight);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized form submission handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const formData: FormSubmission = {
        name,
        email,
        company,
        challenge,
        problems
      };
      
      const { error } = await supabase
        .from('form_submissions')
        .insert([formData]);
      
      if (error) {
        throw error;
      }
      
      // Success - show confirmation and reset form
      setSubmitted(true);
      setName('');
      setEmail('');
      setCompany('');
      setChallenge('');
      setProblems('');
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 8000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, company, challenge, problems]);

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden">
      {/* Global Spline Background - Fixed throughout entire site */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ minHeight: '100vh' }}>
        <div className="absolute inset-0 opacity-30">
          {showSpline ? (
            <LazySpline
              scene="https://prod.spline.design/FlDdsJ8TfqzlzJju/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/60 backdrop-blur-md border-b border-cyan-500/30' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 md:py-6 gap-4 lg:gap-0">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 md:w-12 md:h-12 border border-cyan-500/30 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center rounded-xl shadow-lg">
                <Cpu className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <span className="text-xl md:text-3xl font-bold tracking-wide text-white font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                LUMORA.AI
              </span>
            </div>
            
            {/* Navigation Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 lg:gap-8">
              <button 
                onClick={scrollToHome}
                className="text-white hover:text-cyan-400 font-medium tracking-wide transition-colors duration-300 text-xs lg:text-base px-1 lg:px-2 py-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                Home Page
              </button>
              <button 
                onClick={scrollToProducts}
                className="text-white hover:text-cyan-400 font-medium tracking-wide transition-colors duration-300 text-xs lg:text-base px-1 lg:px-2 py-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                Products
              </button>
              <button 
                onClick={scrollToWhyChooseUs}
                className="text-white hover:text-cyan-400 font-medium tracking-wide transition-colors duration-300 text-xs lg:text-base px-1 lg:px-2 py-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                Why Choose Us
              </button>
              <button 
                onClick={scrollToForm}
                className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 hover:from-blue-500 hover:via-cyan-400 hover:to-blue-300 text-white font-bold hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] px-4 lg:px-6 py-2 lg:py-3 transition-all duration-300 rounded-lg text-xs lg:text-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 pt-32" id="hero-section">
        {/* Additional Hero Effects */}
        <div className="absolute inset-0 z-10">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          ></div>

          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gray-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-16 tracking-tight bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent font-heading" style={{ minHeight: '120px' }}>
            {heroHeading}<span className={headingComplete ? 'hidden' : 'animate-pulse'}>_</span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-20">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium tracking-wide" style={{ minHeight: '80px' }}>
              {heroDescription}<span className={heroDescription.length === heroDescriptionText.length ? 'hidden' : 'animate-pulse'}>_</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 justify-center items-center mb-24">
            <button 
              onClick={scrollToForm}
              className="group bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 hover:from-blue-500 hover:via-cyan-400 hover:to-blue-300 text-white font-bold text-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] px-16 py-5 transition-all duration-300 rounded-xl"
            >
              Book Your Free Strategy Call
              <ArrowRight className="inline-block ml-4 w-6 h-6 transition-transform group-hover:translate-x-2" />
            </button>
          </div>

        </div>
      </section>

      {/* First Animated Quote */}
      <LazyAnimatedQuote
        text="Transform possibility into performance. Let your business redefine what's possible."
        className="py-16 md:py-24"
        variant="typewriter"
        typeSpeed={30}
      />

      {/* Products Timeline Section */}
      <section id="our-solutions">
      <LazyTimeline data={timelineData} />
      </section>

      {/* Second Animated Quote */}
      <LazyAnimatedQuote
        text="Solutions that scale your business. Results that speak."
        className="py-16 md:py-24"
        variant="neon"
      />

      {/* Risk Reversal Section */}
      <section id="risk-reversal" className="py-16 md:py-32 relative">

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 text-center">
          {/* Sleek headline with subtle animation */}
          <div className="mb-12 md:mb-20">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 md:mb-16 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight tracking-tight font-heading">
              <span className="inline-block hover:scale-105 transition-transform duration-500">Try it free.</span>
              <br />
              <span className="inline-block hover:scale-105 transition-transform duration-500 delay-100 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Pay only if it works.</span>
            </h3>
            
            {/* Subtle divider line */}
            <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8 md:mb-16 shadow-lg shadow-cyan-400/50"></div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-medium max-w-4xl mx-auto mb-12 md:mb-20 tracking-wide">
              Risk-free trial backed by our ROI-first promise. Kick off with a free trial project and see the results for yourself. From there, every solution we deliver is backed by our ROI-first promise, if it doesn't deliver measurable growth, you don't pay.
            </p>
          </div>
          
          {/* Additional benefit */}
          {/* Sleek CTA with minimal design */}
          <div className="group">
            <button 
              onClick={scrollToForm}
              className="animated-cta bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 hover:from-blue-500 hover:via-cyan-400 hover:to-blue-300 text-white font-bold text-lg md:text-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] px-12 md:px-20 py-4 md:py-6 transition-all duration-500 rounded-xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Start Your Free Trial
                <ArrowRight className="ml-3 md:ml-5 w-5 h-5 md:w-7 md:h-7 transition-transform group-hover:translate-x-3 duration-300" />
              </span>
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>

          {/* Minimal trust indicators */}
          <div className="mt-12 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 text-sm md:text-base font-medium">
            <div className="flex items-center">
              <span className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 md:mr-4 shadow-lg shadow-cyan-400/50"></span>
              <span className="text-gray-300 tracking-wide">No upfront costs</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 md:mr-4 shadow-lg shadow-cyan-400/50"></span>
              <span className="text-gray-300 tracking-wide">ROI-first guarantee</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 md:mr-4 shadow-lg shadow-cyan-400/50"></span>
              <span className="text-gray-300 tracking-wide">Results you can measure</span>
            </div>
          </div>
        </div>
      </section>

      {/* Third Animated Quote */}
      <LazyAnimatedQuote
        text="Where smart systems give your business the competitive edge."
        className="py-16 md:py-24"
        variant="glow"
      />

      {/* Why Small Businesses Choose Lumora.ai Section */}
      <section id="why-choose-ai" className="py-16 md:py-24 relative">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent font-heading tracking-tight">
              Why Small Businesses Choose AI Automation
            </h2>
            <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8 shadow-lg shadow-cyan-400/50"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
              Transform your business operations with intelligent automation solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
            <div className="group bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-10 hover:border-cyan-400/50 hover:bg-slate-800/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 mt-2 shadow-lg shadow-cyan-400/50 group-hover:scale-125 transition-transform duration-300"></div>
                <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">Streamline repetitive tasks with personalized AI automations</p>
              </div>
            </div>

            <div className="group bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-10 hover:border-cyan-400/50 hover:bg-slate-800/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 mt-2 shadow-lg shadow-cyan-400/50 group-hover:scale-125 transition-transform duration-300"></div>
                <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">Capture, qualify, and nurture leads automatically using AI assistants</p>
              </div>
            </div>

            <div className="group bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-10 hover:border-cyan-400/50 hover:bg-slate-800/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 mt-2 shadow-lg shadow-cyan-400/50 group-hover:scale-125 transition-transform duration-300"></div>
                <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">Expertly crafted, SEO-optimized websites built with advanced AI design tools</p>
              </div>
            </div>

            <div className="group bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-10 hover:border-cyan-400/50 hover:bg-slate-800/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 mt-2 shadow-lg shadow-cyan-400/50 group-hover:scale-125 transition-transform duration-300"></div>
                <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">Easy integration with Supabase, Calendly, Airtable, and other systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}

      {/* Security Section */}
      <LazySecuritySection />

      {/* Testimonial Section */}
      <LazyTestimonialCarousel />

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 relative">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent font-heading tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8 shadow-lg shadow-cyan-400/50"></div>
            <p className="text-xl text-gray-300 font-medium">
              Everything you need to know about our AI automation solutions
            </p>
          </div>

          <div className="space-y-8 md:space-y-10">
            <div className="group bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-10 hover:border-cyan-400/50 hover:bg-slate-800/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 mt-3 shadow-lg shadow-cyan-400/50 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 group-hover:text-cyan-100 transition-colors duration-300">What is business automation software?</h3>
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">Custom solutions leveraging AI tools to automate workflows, sync applications, and reduce manual effort, tailored to your business needs.</p>
                </div>
              </div>
            </div>

            <div className="group bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-10 hover:border-cyan-400/50 hover:bg-slate-800/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 mt-3 shadow-lg shadow-cyan-400/50 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 group-hover:text-cyan-100 transition-colors duration-300">How does AI lead generation work?</h3>
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">Our AI assistant captures inquiry data, qualifies leads in real time, schedules demos, and enables personalized follow-up automatically.</p>
                </div>
              </div>
            </div>

            <div className="group bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-10 hover:border-cyan-400/50 hover:bg-slate-800/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 mt-3 shadow-lg shadow-cyan-400/50 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 group-hover:text-cyan-100 transition-colors duration-300">Can AI build a professional website?</h3>
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">We build bespoke, SEO-optimized websites using AI-assisted design platforms combined with expert customization to achieve premium quality.</p>
                </div>
              </div>
            </div>

            <div className="group bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-10 hover:border-cyan-400/50 hover:bg-slate-800/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex-shrink-0 mt-3 shadow-lg shadow-cyan-400/50 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 group-hover:text-cyan-100 transition-colors duration-300">What is automated customer support?</h3>
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">AI chatbots and workflow automations that handle common inquiries 24/7, escalate complex issues, and log every interaction in your CRM.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact-form" className="py-32 relative overflow-hidden">

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-white leading-tight tracking-wide">
            Ready to scale smarter?
          </h2>
          <p className="text-xl text-gray-300 mb-12 md:mb-20 leading-relaxed font-light tracking-wide">
            Book a free strategy call and discover how we can streamline your operations
          </p>
          
          <div className="border border-gray-700 bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 p-6 md:p-16 max-w-3xl mx-auto rounded-lg transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-12 text-white tracking-wide">Tell us about your business</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
              <div className="grid md:grid-cols-2 gap-4 md:gap-12">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="floating-input w-full px-4 md:px-8 py-3 md:py-5 bg-slate-800/60 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 placeholder-gray-400 text-base md:text-lg rounded-xl font-medium"
                    placeholder="YOUR NAME"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="floating-input w-full px-4 md:px-8 py-3 md:py-5 bg-slate-800/60 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 placeholder-gray-400 text-base md:text-lg rounded-xl font-medium"
                    placeholder="BUSINESS EMAIL"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="floating-input w-full px-4 md:px-8 py-3 md:py-5 bg-slate-800/60 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 placeholder-gray-400 text-base md:text-lg rounded-xl font-medium"
                  placeholder="COMPANY NAME"
                />
              </div>

              <div>
                <select
                  required
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="floating-input dropdown-custom w-full px-4 md:px-8 py-3 md:py-5 pr-12 md:pr-16 bg-slate-800/60 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 text-base md:text-lg rounded-xl appearance-none font-medium"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2322d3ee' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 1rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  <option value="">SELECT PRIMARY CHALLENGE</option>
                  <option value="website">Need a professional website</option>
                  <option value="engagement">Want to improve customer engagement</option>
                  <option value="efficiency">Too many manual processes</option>
                  <option value="data">Need better business insights</option>
                  <option value="automation">Want to automate workflows</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div>
                <textarea
                  required
                  value={problems}
                  onChange={(e) => setProblems(e.target.value)}
                  rows={4}
                  className="floating-input w-full px-4 md:px-8 py-3 md:py-5 bg-slate-800/60 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 placeholder-gray-400 text-base md:text-lg rounded-xl resize-vertical font-medium"
                  placeholder="Please describe your current challenges and outcomes"
                />
              </div>

              {submitError && (
                <div className="text-red-300 text-sm md:text-base text-center p-3 md:p-4 bg-red-900/30 backdrop-blur-md border border-red-500/30 rounded-xl">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="animated-cta w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 hover:from-blue-500 hover:via-cyan-400 hover:to-blue-300 text-white font-bold text-lg md:text-xl hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] px-8 md:px-12 py-4 md:py-6 transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-cyan-500/25"
                style={{ display: submitted ? 'none' : 'block' }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 md:w-7 md:h-7 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3 md:mr-5"></div>
                    PROCESSING...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Book My Free Strategy Call
                    <ArrowRight className="ml-3 md:ml-5 w-5 h-5 md:w-7 md:h-7" />
                  </span>
                )}
              </button>

              {/* Thank You Message */}
              {submitted && (
                <div className="w-full bg-gradient-to-r from-green-600/20 to-cyan-600/20 border border-green-500/30 text-white font-medium text-base md:text-lg px-6 md:px-12 py-4 md:py-6 rounded-xl text-center backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 md:mb-4 text-green-400" />
                  <p className="text-lg md:text-xl font-semibold mb-2">Thank you for reaching out!</p>
                  <p className="text-gray-200">Our team will contact you soon to help grow your business.</p>
                </div>
              )}
            </form>

            <p className="text-gray-300 text-sm md:text-base mt-6 md:mt-12 tracking-wide font-medium">
              No spam. No pressure. Just a real conversation about growing your business.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 md:py-20">

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Footer Navigation - Centered */}
          <div className="flex flex-col items-center space-y-8">
            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <button 
                onClick={scrollToHome}
                className="text-white hover:text-cyan-400 font-medium tracking-wide transition-colors duration-300 text-base md:text-lg"
              >
                Home Page
              </button>
              <button 
                onClick={scrollToProducts}
                className="text-white hover:text-cyan-400 font-medium tracking-wide transition-colors duration-300 text-base md:text-lg"
              >
                <a href="#our-solutions" className="text-white hover:text-cyan-400 font-medium tracking-wide transition-colors duration-300 text-base md:text-lg">
                  Products
                </a>
              </button>
              <button 
                onClick={scrollToWhyChooseUs}
                className="text-white hover:text-cyan-400 font-medium tracking-wide transition-colors duration-300 text-base md:text-lg"
              >
                <a href="#why-choose-ai" className="text-white hover:text-cyan-400 font-medium tracking-wide transition-colors duration-300 text-base md:text-lg">
                  Why Choose Us
                </a>
              </button>
              <button 
                onClick={scrollToForm}
                className="text-white hover:text-cyan-400 font-medium tracking-wide transition-colors duration-300 text-base md:text-lg"
              >
                <a href="#contact-form" className="text-white hover:text-cyan-400 font-medium tracking-wide transition-colors duration-300 text-base md:text-lg">
                  Contact Us
                </a>
              </button>
            </div>
            
            {/* Copyright and Contact */}
            <div className="text-gray-300 text-center">
              <p className="text-sm md:text-base tracking-wide font-medium">© 2025 LUMORA.AI - HELPING BUSINESSES GROW WITH MODERN TECH</p>
            </div>
            
            {/* SEO Keywords Footer */}
            <div className="text-gray-400 text-center text-xs md:text-sm">
              <p>Lumora.ai | business automation software | AI website design | lead generation automation | AI sales assistant</p>
            </div>
            
            <div className="text-gray-200 text-center">
              <p className="font-bold text-base md:text-lg">CONTACT: san@workflowsystems.net</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;