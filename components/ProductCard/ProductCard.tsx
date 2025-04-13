"use client";
import {Card, CardContent, Typography, Button, Box, Stack, Snackbar, Alert, Skeleton, Fade, Paper, Rating} from "@mui/material";
import {useState, memo, useEffect, useRef, useCallback} from "react";
import Image from "next/image";
import {Product} from "@/types/product";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/src/utils";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onViewDetails: (product: Product) => void;
    priority?: boolean;
    redirectToCart?: boolean;
}

/**
 * ProductCard component displays product information and allows adding to cart
 * and viewing product details.
 * 
 * Optimized with:
 * - Memoization to prevent unnecessary re-renders
 * - UseCallback for event handlers
 * - Clean state management with refs for tracking
 * - Proper cleanup to prevent memory leaks
 */
const ProductCard = memo(({
    product, 
    onAddToCart, 
    onViewDetails, 
    priority = false,
    redirectToCart = true
}: ProductCardProps) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const productIdRef = useRef<number | null>(null);
    const isMounted = useRef(true);
    const router = useRouter();
    const isInCart = useCartStore(state => state.isItemInCart(product.id));
    
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
            
            // Handle case where no image is provided
            if (!product.image) {
                setImageLoading(false);
                setImageError(true);
            }
        }
        
        // Cleanup function
        return () => {
            isMounted.current = false;
        };
    }, [product.id, product.image]);

    // Memoize event handlers to prevent unnecessary re-renders
    const handleAddToCart = useCallback((e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent bubbling to card click
        onAddToCart(product);
        setSnackbarOpen(true);
        
        // Add a short delay before redirecting to allow snackbar to show
        if (redirectToCart) {
            setTimeout(() => {
                if (isMounted.current) {
                    router.push('/cart');
                }
            }, 800);
        }
    }, [product, onAddToCart, router, redirectToCart]);

    const handleSnackbarClose = useCallback(() => {
        setSnackbarOpen(false);
    }, []);
    
    const handleProductClick = useCallback(() => {
        onViewDetails(product);
    }, [product, onViewDetails]);

    // Image loading handlers
    const handleImageLoad = useCallback(() => {
        if (isMounted.current && productIdRef.current === product.id) {
            setImageLoading(false);
            setImageError(false);
        }
    }, [product.id]);

    const handleImageError = useCallback(() => {
        if (isMounted.current && productIdRef.current === product.id) {
            setImageLoading(false);
            setImageError(true);
        }
    }, [product.id]);

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
                                onLoadingComplete={handleImageLoad}
                                onError={handleImageError}
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
                        {formatPrice(product.price)}
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
                            {isInCart ? 'Add Again' : 'Add to Cart'}
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
