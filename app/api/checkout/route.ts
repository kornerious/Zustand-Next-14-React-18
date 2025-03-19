import { NextResponse } from "next/server";
import { useOrderStore } from "@/store/orderStore";

export async function POST(req: Request) {
    const { email, items } = await req.json();
    if (!email || items.length === 0) {
        return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    // Generate a simple order ID
    const orderId = Math.random().toString(36).substring(7);
    const newOrder = { id: orderId, email, items };

    // Save order to Zustand store
    useOrderStore.getState().addOrder(newOrder);

    console.log("Order received:", newOrder);
    return NextResponse.json({ message: "Order successfully placed", orderId });
}