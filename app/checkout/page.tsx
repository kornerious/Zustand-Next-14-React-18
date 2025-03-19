"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, CircularProgress } from "@mui/material";

// ✅ Define CartItem & Order Types
interface CartItem {
    id: number;
    name: string;
    title: string; // ✅ Ensure `title` exists
    quantity: number;
    price: number;
    image: string;
}

interface Order {
    id: string;
    email: string;
    items: CartItem[];
}

const JSONBIN_API_KEY = "$2a$10$8F5qQQoWq49Gn.v4zEbZFuSv8bfY2XOXHGqRPI8Efnb5tZEZnf53G"; // Replace with your JSONBin.io API key
const JSONBIN_ID = "67daee698960c979a574d0ba"; // Replace with your JSONBin.io Bin ID

export default function CheckoutPage() {
    const [email, setEmail] = useState("");
    const { items, clearCart } = useCartStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (items.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const newOrder: Order = {
                id: crypto.randomUUID(),
                email,
                items: items.map(item => ({
                    id: item.id,
                    name: item.title, // ✅ Assign `name` properly
                    title: item.title, // ✅ Assign `title`
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                })),
            };

            // ✅ Fetch existing orders from JSONBin
            const fetchResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
                headers: { "X-Master-Key": JSONBIN_API_KEY },
            });

            const fetchData = await fetchResponse.json();
            const updatedOrders = [...(fetchData.record.orders || []), newOrder];

            // ✅ Update JSONBin with new orders array
            const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": JSONBIN_API_KEY,
                },
                body: JSON.stringify({ orders: updatedOrders }),
            });

            if (!response.ok) throw new Error("Failed to place order");

            clearCart();
            router.push("/order-confirmation");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>Checkout</Typography>
            {items.length === 0 ? (
                <Typography>Your cart is empty. Please add items before proceeding.</Typography>
            ) : (
                <>
                    <List>
                        {items.map((item) => (
                            <ListItem key={item.id}>
                                <ListItemText primary={`${item.title} (x${item.quantity}) - $${item.price * item.quantity}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6" sx={{ mt: 2 }}>Total Price: ${totalPrice}</Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ mt: 2 }}>
                            {loading ? <CircularProgress size={24} /> : "Confirm Purchase"}
                        </Button>
                    </form>
                </>
            )}
        </Container>
    );
}
