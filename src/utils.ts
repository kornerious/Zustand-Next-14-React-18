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
