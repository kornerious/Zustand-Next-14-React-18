"use client";
import { useCartStore } from "@/store/cartStore";
import { Card, CardContent, Typography, Button } from "@mui/material";

// ✅ Correct Product Type with FakeStore fields
interface Product {
    id: number;
    title?: string;  // ✅ FakeStore API uses "title"
    price: number;
    image?: string;  // ✅ FakeStore API provides "image"
}

// ✅ Define Props Type
interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.title,  // ✅ Converting "title" to "name" for cart store
            price: product.price,
            quantity: 1,
            image: product.image
        });
    };

    return (
        <Card>
            <CardContent>
                <img src={product.image} alt={product.title} width="100" />
                <Typography variant="h5">{product.title}</Typography>
                <Typography variant="body1">${product.price}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
}
