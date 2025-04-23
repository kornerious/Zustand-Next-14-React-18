'use client';

import { Fragment, useState, useCallback, memo, useRef, useEffect, useMemo } from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import { Product } from '@/types/product';
import dynamic from 'next/dynamic';
import { ProductGridProps } from './ProductGrid.types';
import { GridContainer, ErrorContainer, LoadingContainer } from './ProductGrid.styled';

// Dynamic imports for better code splitting
const ProductCard = dynamic(() => import('@/components/ProductCard'), {
  ssr: false,
  loading: () => (
    <Box sx={{ 
      height: '320px', 
      bgcolor: 'rgba(0,0,0,0.04)',
      borderRadius: 2,
      p: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CircularProgress size={30} />
    </Box>
  )
});

const ProductModal = dynamic(() => import('@/components/ProductModal'), { ssr: false });

/**
 * ProductGrid component displays a grid of products with loading, error states and modal interaction.
 * 
 * Optimized with:
 * - Memoization to prevent unnecessary re-renders
 * - Smart loading strategy for prioritizing visible products
 * - Efficient modal handling to prevent flickering
 * - Performance optimizations for large product lists
 */
const ProductGrid = memo(({
  products = [],
  loading,
  error,
  onAddToCart,
  emptyMessage = 'No products found.',

  fullWidth = false,
  spacing = 4,
  categoryKey,
}: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const prevOpenState = useRef(false);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 12 });
  
  // Enhanced progressive loading with intersection observer for better performance
  useEffect(() => {
    // Set initial visible range based on product count
    const safeProducts = products ?? [];
    const initialCount = safeProducts.length > 24 ? 12 : safeProducts.length;
    setVisibleRange({ start: 0, end: initialCount });
    
    if (!gridRef.current || safeProducts.length <= initialCount) return;
    
    // Use IntersectionObserver for more efficient scroll detection
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleRange.end < safeProducts.length) {
          // Load more products when bottom of grid becomes visible
          setVisibleRange(prev => ({
            start: prev.start,
            end: Math.min(prev.end + (safeProducts.length > 50 ? 8 : 12), safeProducts.length)
          }));
        }
      },
      { threshold: 0.1, rootMargin: '200px' } // Load more before user reaches the end
    );
    
    // Create a sentinel element to observe
    const sentinel = document.createElement('div');
    sentinel.style.height = '10px';
    gridRef.current.appendChild(sentinel);
    observer.observe(sentinel);
    
    return () => {
      if (sentinel.parentNode) sentinel.parentNode.removeChild(sentinel);
      observer.disconnect();
    };
  }, [products?.length]);
  
  // Reset modal state when products change
  useEffect(() => {
    const safeProducts = products ?? [];
    if (modalOpen && selectedProduct) {
      // If the selected product is no longer in the products list, close the modal
      const stillExists = safeProducts.some(p => p.id === selectedProduct.id);
      if (!stillExists) {
        handleCloseModal();
      }
    }
  }, [products]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    prevOpenState.current = true;
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    // Only update if needed to prevent unnecessary re-renders
    if (modalOpen) {
      setModalOpen(false);
      // Keep the selected product in state until modal is fully closed
      // This prevents image blinking when closing the modal
      setTimeout(() => {
        prevOpenState.current = false;
      }, 300); // Match this to your modal transition time
    }
  }, [modalOpen]);

  // Memoize the add to cart handler
  const handleAddToCart = useCallback((product: Product) => {
    onAddToCart(product);
  }, [onAddToCart]);

  // Memoize the visible products to prevent unnecessary re-renders
  const safeProducts = products ?? [];
  const visibleProducts = useMemo(() => {
    return safeProducts.slice(0, visibleRange.end);
  }, [safeProducts, visibleRange.end]);
  
  // Loading state
  if (loading) {
    return (
      <LoadingContainer data-testid="product-grid-loading">
        <CircularProgress size={60} thickness={4} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading products...
        </Typography>
      </LoadingContainer>
    );
  }

  // Error state 
  if (error) {
    return (
      <ErrorContainer data-testid="product-grid-error">
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </ErrorContainer>
    );
  }

  // Empty state
  if (!products || !products.length) {
    return (
      <ErrorContainer data-testid="product-grid-empty">
        <Typography variant="body1">{emptyMessage}</Typography>
      </ErrorContainer>
    );
  }

  return (
    <Fragment>
      <Box 
        ref={gridRef}
        sx={{ 
          width: '100%', 
          ...(fullWidth ? { maxWidth: '100%' } : {}),
          transition: 'opacity 0.3s ease-in-out' 
        }}
        data-testid="product-grid"
      >
        <Grid container spacing={spacing}>
          {visibleProducts.map((product, index) => {
            // Skip rendering items that are way off-screen
            if (index > visibleRange.end + 8) return null;
            
            return (
              <Grid 
                item 
                key={`${product.id}-${categoryKey || 'all'}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleOpenModal}
                  priority={index < 4} // Only prioritize loading for first 4 products
                  redirectToCart={false}
                />
              </Grid>
            );
          })}
        </Grid>
        
        {/* Show loading indicator when loading more products */}
        {products.length > visibleRange.end && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <CircularProgress size={40} />
          </Box>
        )}
      </Box>
      
      {/* Only render the modal when a product has been selected */}
      {selectedProduct && (
        <ProductModal
          open={modalOpen}
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
          redirectToCart={true}
        />
      )}
    </Fragment>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid; 