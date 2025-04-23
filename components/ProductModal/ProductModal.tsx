'use client';

import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { 
  Modal, 
  Paper, 
  Grid, 
  Box, 
  Typography, 
  IconButton, 
  Stack, 
  Rating,
  Skeleton
} from '@mui/material';
import Image from 'next/image';
import { Product } from '@/types/product';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@/components/Button';
import { formatPrice } from '@/src/utils';
import { useCartStore } from '@/store/cartStore';
import { useRouter as useNextRouter } from 'next/navigation';


interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  redirectToCart?: boolean;
}

/**
 * ProductModal component displays detailed product information in a modal
 * and allows adding the product to cart.
 * 
 * Optimized with:
 * - Memoization to prevent unnecessary re-renders
 * - UseCallback for event handlers
 * - Clean state management with refs for tracking
 * - Proper cleanup to prevent memory leaks
 */
interface ProductModalStorybookRouter {
  push: (path: string) => void;
  replace?: (path: string) => void;
  [key: string]: any;
}

const ProductModal = memo(({
  product,
  open,
  onClose,
  onAddToCart,
  redirectToCart = true,
  router: injectedRouter
}: ProductModalProps & { router?: ProductModalStorybookRouter }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const productIdRef = useRef<number | null>(null);
  const isMounted = useRef(true);
  const router = injectedRouter || useNextRouter();
  const isInCart = useCartStore(state => state.isItemInCart(product.id));
  
  // Reset loading state when product changes
  useEffect(() => {
    // Set mounted ref
    isMounted.current = true;
    
    // Only reset state if the product has changed or modal opened
    if (productIdRef.current !== product.id || open) {
      productIdRef.current = product.id;
      
      // Set initial loading state
      setImageLoaded(false);
      setImageError(false);
      
      // Handle case where no image is provided
      if (!product.image) {
        setImageLoaded(false);
        setImageError(true);
      }
    }
    
    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [product.id, product.image, open]);
  
  // Image handlers
  const handleImageLoad = useCallback(() => {
    if (isMounted.current && productIdRef.current === product.id) {
      setImageLoaded(true);
      setImageError(false);
    }
  }, [product.id]);
  
  const handleImageError = useCallback(() => {
    if (isMounted.current && productIdRef.current === product.id) {
      setImageLoaded(false);
      setImageError(true);
    }
  }, [product.id]);
  
  // Add to cart handler
  const handleAddToCart = useCallback(() => {
    onAddToCart(product);
    
    if (redirectToCart) {
      setTimeout(() => {
        if (isMounted.current) {
          router.push('/cart');
          onClose();
        }
      }, 300);
    } else {
      onClose();
    }
  }, [product, onAddToCart, onClose, redirectToCart, router]);
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="product-modal-title"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          maxWidth: 900,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          p: 4,
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1,
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.9)'
            }
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 400,
                borderRadius: 1,
                overflow: 'hidden',
                backgroundColor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {!imageLoaded && !imageError && (
                <Skeleton 
                  variant="rectangular" 
                  width="100%" 
                  height="100%" 
                  animation="wave" 
                  sx={{ position: 'absolute', top: 0, left: 0 }}
                />
              )}
              
              {!imageError ? (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                >
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                      priority
                      quality={90}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  )}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Image not available
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary'
                }}
                id="product-modal-title"
              >
                {product.title}
              </Typography>

              {product.rating && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.rating?.count || 0} reviews)
                  </Typography>
                </Box>
              )}

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                {formatPrice(product.price)}
              </Typography>

              {product.category && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
                    {product.category}
                  </Typography>
                </Box>
              )}

              {product.description && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {product.description}
                  </Typography>
                </Box>
              )}

              {/* Product Specs if available */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Specifications
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    {Object.entries(product.specs).map(([key, value]) => (
                      value && (
                        <Box key={key} sx={{ display: 'flex' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            width: 120,
                            textTransform: 'capitalize'
                          }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            {value}
                          </Typography>
                        </Box>
                      )
                    ))}
                  </Stack>
                </Box>
              )}

              <Button
                variant="contained"
                size="large"
                onClick={handleAddToCart}
                sx={{ 
                  mt: 2,
                  backgroundColor: '#212121',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#303030',
                  }
                }}
              >
                {isInCart ? 'Add Again to Cart' : 'Add to Cart'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
});

ProductModal.displayName = 'ProductModal';

export default ProductModal; 