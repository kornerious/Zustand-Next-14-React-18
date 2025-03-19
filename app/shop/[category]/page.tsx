"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Grid } from "@mui/material"; // ✅ Use Grid properly
import ProductCard from "../../../components/ProductCard";

// ✅ Define Product Type
interface Product {
    id: number;
    name: string;
}

export default function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState<Product[]>([]); // ✅ Explicitly typed state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`/api/products?category=${category}`);
                if (!res.ok) throw new Error("Failed to fetch products");

                const data: Product[] = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Category: {category}
            </Typography>
            <Grid container spacing={2}>  {/* ✅ Standard Grid */}
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <ProductCard id={product.id} name={product.name} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
