"use client";
import { useCartStore } from "@/store/cartStore";
import { Card, CardContent, Typography, Button, Box, Stack } from "@mui/material";

// ✅ Define Product Type
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

// ✅ Define Props
interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        addToCart({ ...product, name: product.title, quantity: 1 });
    };

    return (
        <Card sx={{ width: 250, p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
            {/* ✅ Fixed Image Container (Same Size for All) */}
            <Box sx={{ width: "100%", height: "200px", overflow: "hidden", mx: "auto" }}>
                <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} // ✅ Ensures all images fit nicely
                />
            </Box>

            {/* ✅ Product Details */}
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ mt: 2 }}>{product.title}</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>${product.price}</Typography>

                {/* ✅ Add to Cart Button Always at Bottom */}
                <Stack direction="row" justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                        sx={{ mt: "auto" }} // ✅ Ensures button stays at bottom
                    >
                        Add to Cart
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
