"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Grid } from "@mui/material";
import ProductCard from "../../../components/ProductCard";

// ✅ Define Product Type
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
}

// ✅ JSONBin.io API Config
const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || "";
const JSONBIN_ID = process.env.NEXT_PUBLIC_JSONBIN_ID || "";

export default function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
                    headers: { "X-Master-Key": JSONBIN_API_KEY },
                });

                if (!response.ok) throw new Error("Failed to fetch products");

                const data = await response.json();
                const allProducts: Product[] = data.record.products || [];

                // ✅ Filter products by category
                const filteredProducts = allProducts.filter(product => product.category === category);

                if (filteredProducts.length === 0) {
                    setError(`No products found in category: ${category}`);
                } else {
                    setError("");
                    setProducts(filteredProducts);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products. Please try again.");
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Category: {category}
            </Typography>
            {error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
