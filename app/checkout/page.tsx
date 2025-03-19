"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    email: string;
    items: CartItem[];
}

export default function CheckoutPage() {
    const [email, setEmail] = useState("");
    const { items, clearCart } = useCartStore();
    const { addOrder } = useOrderStore();
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
            const response = await fetch("http://localhost:4000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, items }),
            });

            if (!response.ok) {
                throw new Error("Failed to place order"); // ✅ Proper error handling
            }

            const orderId = self.crypto.randomUUID(); // ✅ Fix for UMD global variable issue

            const newOrder: Order = {
                id: orderId,
                email,
                items,
            };

            addOrder(newOrder);
            clearCart();
            router.push("/order-confirmation");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
                console.error("Order submission error:", err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Typography variant="h3" gutterBottom>Checkout</Typography>
            {items.length === 0 ? (
                <Typography>Your cart is empty. Please add items before proceeding.</Typography>
            ) : (
                <>
                    <List>
                        {items.map((item) => (
                            <ListItem key={item.id}>
                                <ListItemText primary={`${item.name} (x${item.quantity}) - $${item.price * item.quantity}`} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6" sx={{ mt: 2 }}>Total Price: ${totalPrice}</Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
                    </Box>
                </>
            )}
        </main>
    );
}
