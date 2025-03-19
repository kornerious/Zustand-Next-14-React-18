"use client";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { Container, Typography, List, ListItem, Button } from "@mui/material";

export default function CartPage() {
    const { items, removeFromCart } = useCartStore();
    const router = useRouter();

    const handleCheckoutClick = () => {
        if (items.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        router.push("/checkout"); // ✅ redirect to checkout page
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Your Cart
            </Typography>
            {items.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <List>
                    {items.map((item) => (
                        <ListItem key={item.id}>
                            {item.name} - ${item.price} (x{item.quantity})
                            <Button color="secondary" onClick={() => removeFromCart(item.id)}>
                                Remove
                            </Button>
                        </ListItem>
                    ))}
                </List>
            )}
            {items.length > 0 && (
                <Button variant="contained" color="primary" onClick={handleCheckoutClick}>
                    CHECKOUT
                </Button>
            )}
        </Container>
    );
}