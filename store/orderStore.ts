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
    orders: JSON.parse(localStorage.getItem("orders") || "[]"), // Load from localStorage on init

    addOrder: (order) => {
        set((state) => {
            const newOrders = [...state.orders, order];
            localStorage.setItem("orders", JSON.stringify(newOrders)); // Save to localStorage
            return { orders: newOrders };
        });
    },

    loadOrders: () => {
        const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        set({ orders: storedOrders });
    },
}));