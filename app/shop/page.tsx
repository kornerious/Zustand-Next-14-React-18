"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore"; // ✅ Import Zustand cart store
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCartStore(); // ✅ Get addToCart function
    const router = useRouter(); // ✅ Used for redirection

    useEffect(() => {
        fetch("http://localhost:4000/shop")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
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