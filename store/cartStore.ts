import { create } from "zustand";
import { persist } from "zustand/middleware";
import { throttle } from "@/src/utils"; // ensure this utility exists
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
}

// Cache for total calculation
let totalCache: number | null = null;

// ✅ Zustand Store (Optimized with Throttling and Type Safety)
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (product: Product) => {
                const { items } = get();
                const existingItem = items.find(item => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map(item => 
                            item.id === product.id 
                                ? { ...item, quantity: (item.quantity || 1) + 1 } 
                                : item
                        ),
                    });
                } else {
                    set({
                        items: [...items, { ...product, quantity: 1 }],
                    });
                }
                
                // Recalculate derived state after updating items
                const updatedItems = get().items;
                const itemCount = updatedItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
                const total = updatedItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
                
                set({ itemCount, total });
            },
            removeFromCart: (productId: number) => {
                const { items } = get();
                const updatedItems = items.filter(item => item.id !== productId);
                
                // Recalculate derived state after updating items
                const itemCount = updatedItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
                const total = updatedItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
                
                set({ items: updatedItems, itemCount, total });
            },
            updateQuantity: (productId: number, quantity: number) => {
                const { items } = get();
                const updatedItems = items.map(item => 
                    item.id === productId 
                        ? { ...item, quantity } 
                        : item
                );
                
                // Recalculate derived state after updating items
                const itemCount = updatedItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
                const total = updatedItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
                
                set({ items: updatedItems, itemCount, total });
            },
            clearCart: () => {
                set({ 
                    items: [],
                    itemCount: 0,
                    total: 0
                });
            },
            itemCount: 0,
            total: 0,
        }),
        {
            name: "cart-storage",
            version: 1,
            partialize: (state) => ({ items: state.items, itemCount: state.itemCount, total: state.total }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.total = state.items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    );
                }
            }
        }
    )
);
