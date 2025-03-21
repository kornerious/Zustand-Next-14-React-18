"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { Container, Typography, Card, CardContent, Button, Box, Stack } from "@mui/material";

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
                    <Card
                        key={product.id}
                        sx={{
                            width: 300,
                            height: 450,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
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
                                    sx={{ width: "100%" }}
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

