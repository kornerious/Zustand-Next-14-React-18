"use client";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation"; // ✅ Import router for redirection
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// ✅ Define Props Type
interface ProductProps {
    id: number;
    name: string;
    price: number;
}

export default function ProductCard({ id, name, price }: ProductProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const router = useRouter(); // ✅ Initialize router

    const handleAddToCart = () => {
        addToCart({ id, name, price, quantity: 1 }); // ✅ Ensure 'price' and 'quantity' exist
        router.push("/cart"); // ✅ Redirect to cart after adding item
    };

    return (
        <Card sx={{ maxWidth: 300, p: 2 }}>
            <CardContent>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body1">${price}</Typography>
                <Button variant="contained" color="primary" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
}
