import { create } from "zustand";
import { persist } from "zustand/middleware";
import { throttle } from "@/src/utils"; // ensure this utility exists

// ✅ Define CartItem Type
export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    title?: string;
}

// ✅ Define CartState Type
interface CartState {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

// ✅ Zustand Store (Optimized with Throttling and Type Safety)
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => {
            // ✅ Throttled addToCart
            const throttledAddToCart = throttle((item: CartItem) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...item, quantity: 1 }] };
                });
            }, 1000); // 1-second throttle

            return {
                items: [],

                addToCart: (item: CartItem) => throttledAddToCart(item),

                removeFromCart: (id: number) =>
                    set((state) => ({
                        items: state.items.filter((item) => item.id !== id),
                    })),

                clearCart: () => set({ items: [] }),

                getTotalItems: () =>
                    get().items.reduce((total, item) => total + item.quantity, 0),

                getTotalPrice: () =>
                    get().items.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                    ),
            };
        },
        { name: "cart-storage" }
    )
);
