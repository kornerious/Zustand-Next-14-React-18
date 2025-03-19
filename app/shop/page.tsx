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
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {products.map((product) => (
                    <Card key={product.id} sx={{ width: 300, p: 2 }}>
                        <CardContent>
                            <img src={product.image} alt={product.title} width="100%" />
                            <Typography variant="h5">{product.title}</Typography>
                            <Typography variant="body1">${product.price}</Typography>
                            <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddToCart(product)}
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
