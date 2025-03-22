"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import {Container, Typography, Card, CardContent, Button, Box, Stack, Grid} from "@mui/material";
import ProductCard from "@/components/ProductCard";

// ✅ Define Product Type
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

// ✅ Define CartItem Type
interface CartItem extends Product {
    name: string;
    quantity: number;
}

// ✅ JSONBin.io API Config
const JSONBIN_API_KEY = "$2a$10$8F5qQQoWq49Gn.v4zEbZFuSv8bfY2XOXHGqRPI8Efnb5tZEZnf53G"; // Replace with your API key
const JSONBIN_ID = "67daee698960c979a574d0ba"; // Replace with your Bin ID

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCartStore();
    const router = useRouter();
const prod =
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
                    headers: { "X-Master-Key": JSONBIN_API_KEY },
                });

                if (!response.ok) throw new Error("Failed to fetch products");

                const data = await response.json();
                setProducts(data.record.products || []); // ✅ Ensure proper data structure
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        const cartItem: CartItem = {
            ...product,
            name: product.title,
            quantity: 1,
        };
        addToCart(cartItem);
        router.push("/cart");
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Shop
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Box>
        </Container>
    );
}

