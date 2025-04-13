import { create } from "zustand";
import { persist } from "zustand/middleware";
import { throttle, memoize } from "@/src/utils"; 
import { Product } from '@/types/product';

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

// Memoized calculation functions for better performance
const calculateItemCount = memoize((items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
});

const calculateTotal = memoize((items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
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
                
                // Update state with new items and calculated derived state
                set({
                    items: newItems,
                    itemCount: calculateItemCount(newItems),
                    total: calculateTotal(newItems)
                });
            },
            
            // Remove product from cart
            removeFromCart: (productId: number) => {
                const { items } = get();
                const newItems = items.filter(item => item.id !== productId);
                
                set({
                    items: newItems,
                    itemCount: calculateItemCount(newItems),
                    total: calculateTotal(newItems)
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
                
                set({
                    items: newItems,
                    itemCount: calculateItemCount(newItems),
                    total: calculateTotal(newItems)
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
            getItem: (productId: number) => {
                return get().items.find(item => item.id === productId);
            },
            
            getItemQuantity: (productId: number) => {
                return get().items.find(item => item.id === productId)?.quantity || 0;
            },
            
            isItemInCart: (productId: number) => {
                return get().items.some(item => item.id === productId);
            },
            
            // Initial derived state
            itemCount: 0,
            total: 0,
        }),
        {
            name: "cart-storage",
            version: 1,
            partialize: (state) => ({ items: state.items }),
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
