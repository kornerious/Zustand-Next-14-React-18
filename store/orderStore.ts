import { create } from "zustand";

interface Order {
    id: string;
    email: string;
    items: { id: number; name: string; quantity: number }[];
}

interface OrderState {
    orders: Order[];
    addOrder: (order: Order) => void;
    loadOrders: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    orders: [], // ✅ Initialize with empty array to avoid server-side issues

    addOrder: (order) => {
        set((state) => {
            const newOrders = [...state.orders, order];

            if (typeof window !== "undefined") { // ✅ Ensure browser environment
                localStorage.setItem("orders", JSON.stringify(newOrders));
            }

            return { orders: newOrders };
        });
    },

    loadOrders: () => {
        if (typeof window !== "undefined") { // ✅ Ensure localStorage is accessed only in browser
            const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
            set({ orders: storedOrders });
        }
    },
}));
