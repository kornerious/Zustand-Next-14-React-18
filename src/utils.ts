export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
    let lastFunc: NodeJS.Timeout | null = null;
    let lastRan: number = 0;

    return function(this: any, ...args: Parameters<T>) {
        if (!lastRan || Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            if (lastFunc) clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    } as T;
}
