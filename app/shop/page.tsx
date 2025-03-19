"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { Container, Typography, Card, CardContent, Button, Box, Stack } from "@mui/material";

// ✅ Define Product Type
interface Product {
    id: number;
    title: string; // FakeStore uses "title" instead of "name"
    price: number;
    image: string;
}

// ✅ Define CartItem Type (Ensure it has `name`)
interface CartItem {
    id: number;
    name: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCartStore();
    const router = useRouter();

    useEffect(() => {
        fetch("https://fakestoreapi.com/products") // ✅ Using FakeStore API
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handleAddToCart = (product: Product) => {
        const cartItem: CartItem = {
            ...product,
            name: product.title, // ✅ Assigning `name` since it's required in CartItem
            quantity: 1, // ✅ Ensure product has a quantity field
        };
        addToCart(cartItem);
        router.push("/cart"); // ✅ Redirect to cart after adding product
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Shop
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
                {products.map((product) => (
                    <Card
                        key={product.id}
                        sx={{
                            width: 300,
                            height: 450, // ✅ Ensures all cards have the same height
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between", // ✅ Distributes content evenly
                            p: 2,
                            boxShadow: 3
                        }}
                    >
                        {/* ✅ Image Container: Fixed size & consistent cropping */}
                        <Box sx={{ width: "100%", height: 200, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} // ✅ Ensures all images fit nicely
                            />
                        </Box>

                        {/* ✅ Product Details */}
                        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                            <Typography variant="h6" sx={{ flexGrow: 1, mb: 1 }}>
                                {product.title}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>${product.price}</Typography>

                            {/* ✅ Add to Cart Button Always at Bottom */}
                            <Stack direction="row" justifyContent="center" sx={{ mt: "auto" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddToCart(product)}
                                    sx={{ width: "100%" }} // ✅ Ensures full-width button
                                >
                                    Add to Cart
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}
