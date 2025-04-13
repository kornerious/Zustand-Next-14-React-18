/**
 * Performance and utility functions
 */

/**
 * Creates a throttled function that only invokes func at most once per every limit milliseconds
 * Includes trailing edge calls and allows for cancellation
 * 
 * @param func - The function to throttle
 * @param limit - The number of milliseconds to throttle invocations to
 * @returns A throttled function with a cancel method
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): { (...args: Parameters<T>): void; cancel(): void } {
    let inThrottle: boolean = false;
    let timeoutId: NodeJS.Timeout | null = null;
    let trailingCallArgs: Parameters<T> | null = null;
    let lastContext: any = null;

    const throttled = function(this: any, ...args: Parameters<T>) {
        lastContext = this;
        trailingCallArgs = args;

        if (!inThrottle) {
            inThrottle = true;

            func.apply(lastContext, trailingCallArgs);

            timeoutId = setTimeout(() => {
                timeoutId = null;
                inThrottle = false;
                if (trailingCallArgs) {
                    throttled.apply(lastContext, trailingCallArgs);
                    trailingCallArgs = null;
                    lastContext = null;
                }
            }, limit);
        }
    };

    throttled.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        inThrottle = false;
        timeoutId = null;
        trailingCallArgs = null;
        lastContext = null;
    };

    return throttled;
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked
 * 
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param immediate - Whether to invoke the function on the leading edge instead of trailing
 * @returns A debounced function with a cancel method
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate = false
): { (...args: Parameters<T>): void; cancel(): void } {
    let timeout: NodeJS.Timeout | null = null;
    let lastArgs: Parameters<T> | null = null;
    let lastContext: any = null;
    let result: ReturnType<T>;

    const debounced = function(this: any, ...args: Parameters<T>) {
        lastContext = this;
        lastArgs = args;

        const later = () => {
            timeout = null;
            if (!immediate) {
                result = func.apply(lastContext, lastArgs!);
                lastContext = null;
                lastArgs = null;
            }
        };

        const callNow = immediate && !timeout;

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);

        if (callNow) {
            result = func.apply(lastContext, args);
            lastContext = null;
            lastArgs = null;
        }

        return result;
    };

    debounced.cancel = () => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        lastArgs = null;
        lastContext = null;
    };

    return debounced;
}

/**
 * Creates a memoized function that caches the result of func for the given args
 * 
 * @param func - The function to memoize
 * @returns A memoized function with a clear method to clear the cache
 */
export function memoize<T extends (...args: any[]) => any>(
    func: T
): { (...args: Parameters<T>): ReturnType<T>; clear(): void } {
    const cache = new Map<string, ReturnType<T>>();

    const memoized = function(...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key) as ReturnType<T>;
        }
        
        const result = func(...args);
        cache.set(key, result);
        return result;
    };

    memoized.clear = () => {
        cache.clear();
    };

    return memoized;
}

/**
 * Formats a price with the given currency
 * 
 * @param price - The price to format
 * @param currency - The currency code
 * @returns A formatted price string
 */
export function formatPrice(price: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

/**
 * Deep clones an object
 * 
 * @param obj - The object to clone
 * @returns A deep clone of the object
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Image optimization utilities
 */

/**
 * Preloads an image and returns a promise that resolves when the image is loaded
 * 
 * @param src - The image source URL
 * @returns A promise that resolves when the image is loaded
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
    });
}

/**
 * Preloads multiple images and returns a promise that resolves when all images are loaded
 * 
 * @param srcs - The image source URLs
 * @returns A promise that resolves when all images are loaded
 */
export function preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(srcs.map(preloadImage));
}

/**
 * Gets the optimal image size for a given container
 * 
 * @param containerWidth - The container width
 * @param containerHeight - The container height
 * @param devicePixelRatio - The device pixel ratio
 * @returns The optimal image size
 */
export function getOptimalImageSize(
    containerWidth: number, 
    containerHeight: number, 
    devicePixelRatio = window.devicePixelRatio || 1
): { width: number; height: number } {
    const width = Math.ceil(containerWidth * devicePixelRatio);
    const height = Math.ceil(containerHeight * devicePixelRatio);
    return { width, height };
}

/**
 * Checks if an element is in the viewport
 * 
 * @param element - The element to check
 * @param offset - The offset from the viewport edge
 * @returns Whether the element is in the viewport
 */
export function isElementInViewport(element: HTMLElement, offset = 0): boolean {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 - offset &&
        rect.right >= 0 - offset &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset
    );
}

/**
 * Creates an intersection observer that calls the callback when the element enters or exits the viewport
 * 
 * @param element - The element to observe
 * @param callback - The callback to call when the element enters or exits the viewport
 * @param options - The intersection observer options
 * @returns The intersection observer
 */
export function createIntersectionObserver(
    element: HTMLElement,
    callback: (isIntersecting: boolean) => void,
    options: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    }
): IntersectionObserver {
    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        callback(entry.isIntersecting);
    }, options);
    
    observer.observe(element);
    return observer;
}
