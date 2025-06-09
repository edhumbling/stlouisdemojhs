import React, { Suspense, lazy, ComponentType } from 'react';
import ShimmerLoader from './ShimmerLoader';

interface LazyWrapperProps {
  fallback?: React.ReactNode;
  className?: string;
  height?: string;
}

// Higher-order component for lazy loading
export function withLazyLoading<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallbackComponent?: React.ComponentType
) {
  const LazyComponent = lazy(importFunc);
  
  return (props: T & LazyWrapperProps) => {
    const { fallback, className, height, ...componentProps } = props;
    
    const defaultFallback = fallbackComponent ? (
      React.createElement(fallbackComponent)
    ) : (
      <div className={`w-full ${height || 'h-64'} ${className || ''}`}>
        <ShimmerLoader variant="silver" className="w-full h-full rounded-lg" />
      </div>
    );

    return (
      <Suspense fallback={fallback || defaultFallback}>
        <LazyComponent {...(componentProps as T)} />
      </Suspense>
    );
  };
}

// Lazy loading wrapper component
const LazyWrapper: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  height?: string;
}> = ({ children, fallback, className, height }) => {
  const defaultFallback = (
    <div className={`w-full ${height || 'h-64'} ${className || ''}`}>
      <ShimmerLoader variant="silver" className="w-full h-full rounded-lg" />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;
