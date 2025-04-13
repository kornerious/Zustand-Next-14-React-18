"use client";
import {Card, CardContent, Typography, Button, Box, Stack, Snackbar, Alert, Skeleton, Fade, Paper, Rating} from "@mui/material";
import {useState, memo, useEffect, useRef} from "react";
import Image from "next/image";
import {Product} from "@/types/product";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onViewDetails: (product: Product) => void;
    priority?: boolean;
}

const ProductCard = memo(({product, onAddToCart, onViewDetails, priority = false}: ProductCardProps) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const productIdRef = useRef<number | null>(null);
    const isMounted = useRef(true);
    const router = useRouter();
    
    // Reset loading state when product changes to prevent blinking
    useEffect(() => {
        // Set mounted ref
        isMounted.current = true;
        
        // Only reset state if the product has changed
        if (productIdRef.current !== product.id) {
            productIdRef.current = product.id;
            
            // Set initial loading state
            setImageLoading(true);
            setImageError(false);
            
            // No need for additional preloading - Next.js Image handles this
            // But we'll still handle cases where no image is provided
            if (!product.image) {
                setImageLoading(false);
                setImageError(true);
            }
        }
        
        // Cleanup function
        return () => {
            isMounted.current = false;
        };
    }, [product.id, product.image, imageLoading, imageError]);

    // Handle add to cart with feedback and redirect
    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent bubbling to card click
        onAddToCart(product);
        setSnackbarOpen(true);
        
        // Add a short delay before redirecting to allow snackbar to show
        setTimeout(() => {
            router.push('/cart');
        }, 800);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    
    const handleProductClick = () => {
        onViewDetails(product);
    };

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                    },
                    cursor: 'pointer'
                }}
                onClick={handleProductClick}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 300,
                        overflow: 'hidden',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    className="product-image-container"
                >
                    {imageLoading && (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height="100%"
                            animation="wave"
                            sx={{ position: 'absolute', top: 0, left: 0 }}
                        />
                    )}
                    <Box 
                        sx={{ 
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: imageLoading ? 0 : 1,
                            transition: 'opacity 0.3s ease'
                        }}
                    >
                        {!imageError && product.image ? (
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                style={{
                                    objectFit: 'cover'
                                }}
                                priority={priority}
                                loading={priority ? "eager" : "lazy"}
                                quality={85}
                                onLoadingComplete={() => {
                                    if (isMounted.current && productIdRef.current === product.id) {
                                        setImageLoading(false);
                                        setImageError(false);
                                    }
                                }}
                                onError={() => {
                                    if (isMounted.current && productIdRef.current === product.id) {
                                        setImageLoading(false);
                                        setImageError(true);
                                    }
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'background.paper'
                                }}
                            >
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary"
                                    sx={{ textAlign: 'center' }}
                                >
                                    {product.image ? 'Image not available' : 'No image provided'}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
                <CardContent 
                    sx={{ 
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        p: 3
                    }}
                >
                    <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="div"
                        sx={{
                            fontWeight: 600,
                            minHeight: '3em',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {product.title}
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                        <Rating
                            value={product.rating?.rate || 0}
                            precision={0.5}
                            readOnly
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: 'primary.main'
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: 'rgba(255, 255, 255, 0.2)'
                                }
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                ml: 1,
                                color: 'text.secondary'
                            }}
                        >
                            ({product.rating?.count || 0})
                        </Typography>
                    </Box>
                    <Typography 
                        variant="body1"
                        sx={{
                            mb: 2,
                            color: 'text.secondary',
                            flexGrow: 1
                        }}
                    >
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering card click
                                handleProductClick();
                            }}
                            sx={{
                                backgroundColor: '#212121',
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#303030',
                                }
                            }}
                        >
                            View Details
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleAddToCart}
                            sx={{
                                borderColor: '#555555',
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    borderColor: '#777777',
                                }
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Stack>
                </CardContent>
            </Paper>

            {/* Snackbar Notification */}
            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={1500} 
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={Fade}
            >
                <Alert 
                    severity="success" 
                    variant="filled" 
                    sx={{ width: "100%" }}
                    onClose={handleSnackbarClose}
                >
                    Added "{product.title}" to cart!
                </Alert>
            </Snackbar>
        </>
    );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
