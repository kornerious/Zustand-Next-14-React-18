"use client";
import {Container, Typography} from "@mui/material";
import ProductCard from "@/components/ProductCard/ProductCard";
import Grid from "@/components/Grid/Grid";
import ProductModal from "@/components/ProductModal/ProductModal";
import {useState, useEffect} from "react";

// ✅ Hardcoded API Key & ID (Replace with environment variables later)
const JSONBIN_API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || "";
const JSONBIN_ID = process.env.NEXT_PUBLIC_JSONBIN_ID || "";

// ✅ Fetch Products
async function fetchProducts() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
            method: "GET",
            headers: {
                "X-Master-Key": JSONBIN_API_KEY,
                "Content-Type": "application/json",
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`Failed to fetch products. Status: ${response.status}`);
            return [];
        }

        const data = await response.json();

        return data.record.products || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

// ✅ Client Component - ShopPage
export default function ShopPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        };
        loadProducts();
    }, []);

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Shop
            </Typography>
            {products.length > 0 ? (
                <Grid container spacing={6}>
                    {products.map((product: any) => (
                        <Grid key={product.id} sx={{xs: 12, sm: 6, md: 4}}>
                            <ProductCard 
                                setProductOpenModal={setSelectedProductId} 
                                product={product}
                            />
                            {selectedProductId === product.id && (
                                <ProductModal 
                                    product={product}
                                    onClose={() => setSelectedProductId(null)}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h5" color="error">
                    No products found or failed to load.
                </Typography>
            )}
        </Container>
    );
}
