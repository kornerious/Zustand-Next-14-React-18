"use client";
import {useCartStore, CartItem} from "@/store/cartStore";
import {Card, CardContent, Typography, Button, Box, Stack, Snackbar, Alert, Dialog} from "@mui/material";
import {useState, memo} from "react";

// ✅ Define Product Type
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

// ✅ Define Props
interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

const ProductModal = memo(({product, onClose}: ProductModalProps) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

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
            <Dialog open={!!product.id} onClose={onClose}>
                <Box sx={{p: 3, maxWidth: 500, width: '100%'}}>
                    <Typography variant="h5" gutterBottom>
                        {product.title}
                    </Typography>
                    <Box sx={{my: 2}}>
                        <img 
                            src={product.image} 
                            alt={product.title}
                            style={{width: '100%', height: 'auto', objectFit: 'cover'}}
                        />
                    </Box>
                    <Typography variant="h6" color="primary" gutterBottom>
                        ${product.price}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{mt: 2}}>
                        <Button variant="contained" onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                        <Button variant="outlined" onClick={onClose}>
                            Close
                        </Button>
                    </Stack>
                </Box>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={handleSnackbarClose}>
                <Alert severity="success" variant="filled" sx={{width: "100%"}}>
                    Added &quot;{product.title}&quot; to cart!
                </Alert>
            </Snackbar>
        </>
    );
});

ProductModal.displayName = "ProductModal";

export default ProductModal;
