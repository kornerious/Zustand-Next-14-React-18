"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore"; // ✅ Import Zustand cart store
import { Container, Typography, Card, CardContent, Button, Grid } from "@mui/material"; // ✅ Fixed Grid import

// ✅ Define Product & CartItem Types
interface Product {
    id: number;
    name: string;
    price: number;
}

interface CartItem extends Product {
    quantity: number; // ✅ Ensure `quantity` exists
}

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]); // ✅ Explicitly typed state
    const { addToCart } = useCartStore(); // ✅ Get addToCart function
    const router = useRouter(); // ✅ Used for redirection

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:4000/shop");
                if (!res.ok) throw new Error("Failed to fetch products");

                const data: Product[] = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts(); // ✅ Properly handling async function
    }, []);

    // ✅ Ensure `product` has `quantity` before adding to cart
    const handleAddToCart = (product: Product) => {
        const cartItem: CartItem = { ...product, quantity: 1 }; // ✅ Add default quantity
        addToCart(cartItem);
        router.push("/cart"); // ✅ Redirect to cart after adding
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Shop
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{product.name}</Typography>
                                <Typography variant="body1">${product.price}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}