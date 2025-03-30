"use client";
import { useCartStore, CartItem } from "@/store/cartStore";
import { Card, CardContent, Typography, Button, Box, Stack, Snackbar, Alert } from "@mui/material";
import { useState, memo } from "react";
import Image from "next/image"; // ✅ Import next/image

// ✅ Define Product Type
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

// ✅ Define Props
interface ProductCardProps {
    product: Product;
}

const ProductCard = memo(({ product }: ProductCardProps) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // ✅ Handle add to cart with feedback
         const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.title,
            title: product.title,
            image: product.image,
            price: product.price,
            quantity: 1,
        } as CartItem);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Card sx={{ width: 250, p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ width: "100%", height: "200px", overflow: "hidden", mx: "auto" }}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={250} // ✅ Control image size to reduce bandwidth
                        height={200}
                        style={{ objectFit: "cover" }}
                        quality={50} // ✅ Reduce image quality for optimization
                    />
                </Box>

                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {product.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        ${product.price}
                    </Typography>

                    <Stack direction="row" justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ mt: "auto" }}>
                            Add to Cart
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            {/* ✅ Snackbar Notification */}
            <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={handleSnackbarClose}>
                <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
                    Added &quot;{product.title}&quot; to cart!
                </Alert>
            </Snackbar>
        </>
    );
});

ProductCard.displayName = "ProductCard"; // ✅ Set display name to avoid warning

export default ProductCard;
