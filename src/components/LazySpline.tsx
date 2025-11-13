import { lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface LazySplineProps {
  scene: string;
  style?: React.CSSProperties;
}

export function LazySpline({ scene, style }: LazySplineProps) {
  return (
    <Suspense fallback={
      <div
        className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black"
        style={style}
      />
    }>
      <Spline scene={scene} style={style} />
    </Suspense>
  );
}
