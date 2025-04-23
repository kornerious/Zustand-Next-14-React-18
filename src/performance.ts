/**
 * Performance monitoring utilities
 * 
 * This file provides utilities for monitoring and optimizing application performance
 */

/**
 * Measures component render time
 * @param componentName - The name of the component to measure
 * @param callback - Function to execute and measure
 * @returns The result of the callback function
 */
export function measureRenderTime<T>(componentName: string, callback: () => T): T {
  if (process.env.NODE_ENV !== 'production') {
    const startTime = performance.now();
    const result = callback();
    const endTime = performance.now();
    console.log(`[Performance] ${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`);
    return result;
  }
  return callback();
}

/**
 * Tracks and reports Web Vitals metrics
 * @param metric - The metric object containing performance data
 */
export function reportWebVitals(metric: any) {
  // In production, you might send this to your analytics
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value}`);
  }
}

/**
 * Creates a performance monitor for React components
 * @param Component - The component to monitor
 * @returns A wrapped component with performance monitoring
 */
/*
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
): React.FC<P> {
  const name = componentName || Component.displayName || Component.name;
  
  const WrappedComponent: React.FC<P> = (props) => {
    return measureRenderTime(name, () => <Component {...props} />);
  };
  
  WrappedComponent.displayName = `PerformanceMonitor(${name})`;
  return WrappedComponent;
}
*/

/**
 * Lazy loads an image and reports performance metrics
 * @param src - The image source URL
 * @returns A promise that resolves when the image is loaded
 */
export function lazyLoadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const img = new Image();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[Image Performance] Loaded ${src} in ${loadTime.toFixed(2)}ms`);
      }
      resolve(img);
    };
    
    img.onerror = (e) => {
      reject(e);
    };
    
    img.src = src;
  });
}

/**
 * Creates a debounced function for performance-sensitive operations
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced function
 */
export function performanceDebounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
