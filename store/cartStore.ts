import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { shallow } from 'zustand/shallow';
import { throttle, memoize } from "@/src/utils"; 
import { Product } from '@/types/product';

// For immutable state updates
type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

// ✅ Define CartItem Type
export interface CartItem extends Product {
    quantity: number;
}

// ✅ Define CartState Type
interface CartState {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    total: number;
    getItem: (productId: number) => CartItem | undefined;
    getItemQuantity: (productId: number) => number;
    isItemInCart: (productId: number) => boolean;
}

// Improved memoized calculation functions with batch computation
const calculateCart = memoize((items: CartItem[]): { itemCount: number, total: number } => {
    // Compute both values in a single iteration for better performance
    return items.reduce((result, item) => {
        const quantity = item.quantity || 1;
        return {
            itemCount: result.itemCount + quantity,
            total: result.total + (item.price * quantity)
        };
    }, { itemCount: 0, total: 0 });
});

// Individual selectors for backward compatibility
const calculateItemCount = memoize((items: CartItem[]): number => {
    return calculateCart(items).itemCount;
});

const calculateTotal = memoize((items: CartItem[]): number => {
    return calculateCart(items).total;
});

// ✅ Zustand Store (Optimized with Memoization and Type Safety)
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            
            // Add product to cart
            addToCart: (product: Product) => {
                const { items } = get();
                const existingItem = items.find(item => item.id === product.id);

                let newItems: CartItem[];
                if (existingItem) {
                    // Update existing item quantity
                    newItems = items.map(item => 
                        item.id === product.id 
                            ? { ...item, quantity: (item.quantity || 1) + 1 } 
                            : item
                    );
                } else {
                    // Add new item
                    newItems = [...items, { ...product, quantity: 1 }];
                }
                
                // Update state with new items and efficiently calculated derived state
                const { itemCount, total } = calculateCart(newItems);
                set({
                    items: newItems,
                    itemCount,
                    total
                });
            },
            
            // Remove product from cart
            removeFromCart: (productId: number) => {
                const { items } = get();
                const newItems = items.filter(item => item.id !== productId);
                
                // Update state with new items and efficiently calculated derived state
                const { itemCount, total } = calculateCart(newItems);
                set({
                    items: newItems,
                    itemCount,
                    total
                });
            },
            
            // Update quantity of a product
            updateQuantity: (productId: number, quantity: number) => {
                const { items } = get();
                
                // Ensure quantity is valid
                const validQuantity = Math.max(1, quantity);
                
                const newItems = items.map(item => 
                    item.id === productId 
                        ? { ...item, quantity: validQuantity } 
                        : item
                );
                
                // Update state with new items and efficiently calculated derived state
                const { itemCount, total } = calculateCart(newItems);
                set({
                    items: newItems,
                    itemCount,
                    total
                });
            },
            
            // Clear cart
            clearCart: () => {
                set({ 
                    items: [],
                    itemCount: 0,
                    total: 0
                });
            },
            
            // Helper selectors
            // Optimized selectors that efficiently use cache
            getItem: (productId: number) => {
                // Using a cached map lookup is faster than find for large item arrays
                const itemMap = new Map(get().items.map(item => [item.id, item]));
                return itemMap.get(productId);
            },
            
            getItemQuantity: (productId: number) => {
                // Cache-friendly version
                return get().getItem(productId)?.quantity || 0;
            },
            
            isItemInCart: (productId: number) => {
                // Using getItem for better cache utilization
                return !!get().getItem(productId);
            },
            
            // Initial derived state
            itemCount: 0,
            total: 0,
        }),
        {
            name: "cart-storage",
            version: 1,
            partialize: (state) => ({ items: state.items }),
            storage: createJSONStorage(() => {
                // Check if localStorage is available (browser environment)
                if (typeof window !== 'undefined') {
                    return localStorage;
                }
                // Return a mock storage for SSR environments
                return {
                    getItem: () => null,
                    setItem: () => {},
                    removeItem: () => {}
                };
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Recalculate derived state on rehydration
                    const items = state.items || [];
                    state.itemCount = calculateItemCount(items);
                    state.total = calculateTotal(items);
                }
            }
        }
    )
);
