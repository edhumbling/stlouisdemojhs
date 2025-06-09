// Performance optimization utilities

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// Throttle function for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy loading intersection observer
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Image preloader with priority queue
export class ImagePreloader {
  private queue: Array<{ src: string; priority: number; callback?: () => void }> = [];
  private loading = new Set<string>();
  private loaded = new Set<string>();
  private maxConcurrent = 3;
  private currentLoading = 0;

  preload(src: string, priority: number = 0, callback?: () => void): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.loaded.has(src)) {
        callback?.();
        resolve();
        return;
      }

      if (this.loading.has(src)) {
        return;
      }

      this.queue.push({ 
        src, 
        priority, 
        callback: () => {
          callback?.();
          resolve();
        }
      });

      this.queue.sort((a, b) => b.priority - a.priority);
      this.processQueue();
    });
  }

  private processQueue(): void {
    if (this.currentLoading >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    const item = this.queue.shift();
    if (!item) return;

    this.loading.add(item.src);
    this.currentLoading++;

    const img = new Image();
    
    img.onload = () => {
      this.loaded.add(item.src);
      this.loading.delete(item.src);
      this.currentLoading--;
      item.callback?.();
      this.processQueue();
    };

    img.onerror = () => {
      this.loading.delete(item.src);
      this.currentLoading--;
      this.processQueue();
    };

    img.src = item.src;
  }

  isLoaded(src: string): boolean {
    return this.loaded.has(src);
  }

  isLoading(src: string): boolean {
    return this.loading.has(src);
  }
}

// Create global image preloader instance
export const imagePreloader = new ImagePreloader();

// Performance measurement utilities
export function measurePerformance<T>(
  name: string,
  fn: () => T
): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`Performance: ${name} took ${(end - start).toFixed(2)}ms`);
  return result;
}

export async function measureAsyncPerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  
  console.log(`Performance: ${name} took ${(end - start).toFixed(2)}ms`);
  return result;
}

// Memory usage monitoring
export function getMemoryUsage(): {
  used: number;
  total: number;
  limit: number;
} | null {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
    };
  }
  return null;
}

// Bundle size analyzer
export function analyzeBundleSize(): {
  scripts: number;
  styles: number;
  totalSize: number;
} {
  const scripts = document.querySelectorAll('script[src]').length;
  const styles = document.querySelectorAll('link[rel="stylesheet"]').length;
  
  // Estimate total size (this is approximate)
  const totalSize = scripts * 50 + styles * 20; // Rough estimate in KB
  
  return {
    scripts,
    styles,
    totalSize
  };
}

// Critical resource hints
export function addResourceHints(resources: Array<{
  href: string;
  as: string;
  type?: string;
  crossorigin?: boolean;
}>): void {
  const head = document.head;
  
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.type) {
      link.type = resource.type;
    }
    
    if (resource.crossorigin) {
      link.crossOrigin = 'anonymous';
    }
    
    head.appendChild(link);
  });
}

// Optimize animations for 60fps
export function optimizeAnimation(element: HTMLElement): void {
  element.style.willChange = 'transform';
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
}

// Clean up animation optimizations
export function cleanupAnimation(element: HTMLElement): void {
  element.style.willChange = 'auto';
  element.style.transform = '';
  element.style.backfaceVisibility = '';
}

// Viewport utilities
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Device capabilities detection
export function getDeviceCapabilities(): {
  isMobile: boolean;
  isLowEnd: boolean;
  supportsWebP: boolean;
  supportsAVIF: boolean;
  connectionSpeed: string;
} {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Rough low-end device detection
  const isLowEnd = navigator.hardwareConcurrency <= 2 || 
                   (navigator as any).deviceMemory <= 2;
  
  // Feature detection
  const canvas = document.createElement('canvas');
  const supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  const supportsAVIF = canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  
  // Connection speed estimation
  const connection = (navigator as any).connection;
  const connectionSpeed = connection ? connection.effectiveType || 'unknown' : 'unknown';
  
  return {
    isMobile,
    isLowEnd,
    supportsWebP,
    supportsAVIF,
    connectionSpeed
  };
}

// Preload critical resources based on device capabilities
export function preloadCriticalResources(): void {
  const capabilities = getDeviceCapabilities();
  
  const criticalResources = [
    {
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
      as: 'style',
      type: 'text/css'
    }
  ];
  
  // Add more resources for high-end devices
  if (!capabilities.isLowEnd) {
    criticalResources.push({
      href: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png',
      as: 'image',
      type: 'image/png'
    });
  }
  
  addResourceHints(criticalResources);
}
