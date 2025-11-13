import { lazy, Suspense, ComponentType } from 'react';

const Timeline = lazy(() => import('./ui/timeline').then(module => ({ default: module.Timeline })));
const SecuritySection = lazy(() => import('./ui/security-section').then(module => ({ default: module.SecuritySection })));
const TestimonialCarousel = lazy(() => import('./ui/testimonial-carousel').then(module => ({ default: module.TestimonialCarousel })));
const AnimatedQuote = lazy(() => import('./ui/animated-quote').then(module => ({ default: module.AnimatedQuote })));

const LoadingFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
  </div>
);

interface LazyTimelineProps {
  data: any[];
}

export function LazyTimeline({ data }: LazyTimelineProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Timeline data={data} />
    </Suspense>
  );
}

export function LazySecuritySection() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SecuritySection />
    </Suspense>
  );
}

export function LazyTestimonialCarousel() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TestimonialCarousel />
    </Suspense>
  );
}

interface LazyAnimatedQuoteProps {
  text: string;
  className?: string;
  variant?: 'typewriter' | 'neon' | 'glow';
  typeSpeed?: number;
}

export function LazyAnimatedQuote(props: LazyAnimatedQuoteProps) {
  return (
    <Suspense fallback={<div className={props.className} style={{ minHeight: '100px' }} />}>
      <AnimatedQuote {...props} />
    </Suspense>
  );
}
