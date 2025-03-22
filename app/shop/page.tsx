import { Container, Typography, Grid } from "@mui/material";
import ProductCard from "@/components/ProductCard";

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
        console.log("Fetched Products:", data.record.products);
        return data.record.products || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

// ✅ Server Component - ShopPage
export default async function ShopPage() {
    const products = await fetchProducts();

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Shop
            </Typography>
            {products.length > 0 ? (
                <Grid container spacing={3}>
                    {products.map((product: any) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <ProductCard product={product} />
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
