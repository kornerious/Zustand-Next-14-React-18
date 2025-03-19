"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Grid from "@mui/material/Grid";
import ProductCard from "../../../components/ProductCard";

export default function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`/api/products?category=${category}`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [category]);

    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <ProductCard id={product.id} name={product.name} />
                </Grid>
            ))}
        </Grid>
    );
}