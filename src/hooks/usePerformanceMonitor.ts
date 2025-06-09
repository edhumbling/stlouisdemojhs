import { useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

interface UsePerformanceMonitorOptions {
  enableLogging?: boolean;
  enableReporting?: boolean;
  reportingEndpoint?: string;
}

export const usePerformanceMonitor = (options: UsePerformanceMonitorOptions = {}) => {
  const { enableLogging = false, enableReporting = false, reportingEndpoint } = options;
  const metricsRef = useRef<PerformanceMetrics>({});

  const logMetric = useCallback((name: string, value: number) => {
    if (enableLogging) {
      console.log(`Performance Metric - ${name}: ${value.toFixed(2)}ms`);
    }
  }, [enableLogging]);

  const reportMetrics = useCallback(async (metrics: PerformanceMetrics) => {
    if (enableReporting && reportingEndpoint) {
      try {
        await fetch(reportingEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
            metrics
          })
        });
      } catch (error) {
        console.warn('Failed to report performance metrics:', error);
      }
    }
  }, [enableReporting, reportingEndpoint]);

  // Measure Web Vitals
  useEffect(() => {
    // First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          const fcp = entry.startTime;
          metricsRef.current.fcp = fcp;
          logMetric('First Contentful Paint', fcp);
        }
      }
    });

    observer.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      const lcp = lastEntry.startTime;
      metricsRef.current.lcp = lcp;
      logMetric('Largest Contentful Paint', lcp);
    });

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = (entry as any).processingStart - entry.startTime;
        metricsRef.current.fid = fid;
        logMetric('First Input Delay', fid);
      }
    });

    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      metricsRef.current.cls = clsValue;
      logMetric('Cumulative Layout Shift', clsValue);
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Time to First Byte
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
      const ttfb = navEntry.responseStart - navEntry.requestStart;
      metricsRef.current.ttfb = ttfb;
      logMetric('Time to First Byte', ttfb);
    }

    // Report metrics after page load
    const reportTimeout = setTimeout(() => {
      reportMetrics(metricsRef.current);
    }, 5000);

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      clearTimeout(reportTimeout);
    };
  }, [logMetric, reportMetrics]);

  // Memory usage monitoring
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
    return null;
  }, []);

  // Frame rate monitoring
  const measureFrameRate = useCallback(() => {
    let frames = 0;
    let startTime = performance.now();

    const countFrames = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime - startTime >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - startTime));
        if (enableLogging) {
          console.log(`Frame Rate: ${fps} FPS`);
        }
        frames = 0;
        startTime = currentTime;
      }
      
      requestAnimationFrame(countFrames);
    };

    requestAnimationFrame(countFrames);
  }, [enableLogging]);

  // Bundle size analysis
  const analyzeBundleSize = useCallback(() => {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    const analysis = {
      scriptCount: scripts.length,
      styleCount: styles.length,
      scripts: scripts.map(script => ({
        src: (script as HTMLScriptElement).src,
        async: (script as HTMLScriptElement).async,
        defer: (script as HTMLScriptElement).defer
      })),
      styles: styles.map(style => ({
        href: (style as HTMLLinkElement).href
      }))
    };

    if (enableLogging) {
      console.log('Bundle Analysis:', analysis);
    }

    return analysis;
  }, [enableLogging]);

  return {
    getMetrics: () => metricsRef.current,
    getMemoryUsage,
    measureFrameRate,
    analyzeBundleSize
  };
};
