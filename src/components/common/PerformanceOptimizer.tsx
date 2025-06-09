import React, { useEffect, useRef } from 'react';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';
import { preloadCriticalResources, getDeviceCapabilities } from '../../utils/performance';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  enableMonitoring?: boolean;
  preloadResources?: boolean;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
  enableMonitoring = true,
  preloadResources = true
}) => {
  const hasInitialized = useRef(false);
  
  // Initialize performance monitoring
  const { getMetrics, getMemoryUsage } = usePerformanceMonitor({
    enableLogging: enableMonitoring && process.env.NODE_ENV === 'development'
  });

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Get device capabilities for optimization decisions
    const capabilities = getDeviceCapabilities();
    
    if (enableMonitoring && process.env.NODE_ENV === 'development') {
      console.log('🚀 Performance Optimizer initialized');
      console.log('📱 Device capabilities:', capabilities);
      
      // Log memory usage periodically
      const memoryInterval = setInterval(() => {
        const memory = getMemoryUsage();
        if (memory) {
          console.log(`💾 Memory: ${memory.used}MB / ${memory.total}MB (${memory.limit}MB limit)`);
        }
      }, 30000); // Every 30 seconds

      return () => clearInterval(memoryInterval);
    }

    // Preload critical resources based on device capabilities
    if (preloadResources) {
      preloadCriticalResources();
    }

    // Optimize for low-end devices
    if (capabilities.isLowEnd) {
      // Reduce animation complexity
      document.documentElement.style.setProperty('--animation-duration', '0.2s');
      document.documentElement.style.setProperty('--transition-duration', '0.15s');
      
      // Disable some visual effects
      document.documentElement.classList.add('low-end-device');
    }

    // Optimize for mobile devices
    if (capabilities.isMobile) {
      // Enable touch optimizations
      document.documentElement.classList.add('mobile-device');
      
      // Optimize scroll performance
      document.documentElement.style.setProperty('scroll-behavior', 'auto');
    }

    // Connection-based optimizations
    if (capabilities.connectionSpeed === 'slow-2g' || capabilities.connectionSpeed === '2g') {
      // Disable autoplay and reduce image quality
      document.documentElement.classList.add('slow-connection');
    }

  }, [enableMonitoring, preloadResources]);

  // Performance monitoring for React components
  useEffect(() => {
    if (!enableMonitoring) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure' && entry.name.includes('React')) {
          console.log(`⚛️ React performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
        }
      }
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, [enableMonitoring]);

  return <>{children}</>;
};

export default PerformanceOptimizer;
