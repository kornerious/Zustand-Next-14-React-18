'use client';

import { Fragment, useState, useCallback, memo, useRef, useEffect } from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { ProductGridProps } from './ProductGrid.types';
import { GridContainer, ErrorContainer, LoadingContainer } from './ProductGrid.styled';

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
  products,
  loading,
  error,
  onAddToCart,
  emptyMessage = 'No products found.',
  columns,
  fullWidth = false,
  spacing = 4,
  categoryKey,
}: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const prevOpenState = useRef(false);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 12 });
  
  // Progressive loading for large product lists
  useEffect(() => {
    if (products.length > 24) {
      // Initial load of first batch
      setVisibleRange({ start: 0, end: 12 });
      
      const handleScroll = () => {
        if (!gridRef.current) return;
        
        const rect = gridRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && visibleRange.end < products.length) {
          // Load more products as user scrolls
          setVisibleRange(prev => ({
            start: prev.start,
            end: Math.min(prev.end + 12, products.length)
          }));
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // For smaller lists, show all products
      setVisibleRange({ start: 0, end: products.length });
    }
  }, [products.length]);
  
  // Reset modal state when products change
  useEffect(() => {
    if (modalOpen && selectedProduct) {
      // If the selected product is no longer in the products list, close the modal
      const stillExists = products.some(p => p.id === selectedProduct.id);
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

  // Create a memoized visibleProducts array
  const visibleProducts = products.slice(0, visibleRange.end);
  
  // Loading state
  if (loading) {
    return (
      <LoadingContainer>
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
      <ErrorContainer>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </ErrorContainer>
    );
  }

  // Empty state
  if (!products.length) {
    return (
      <ErrorContainer>
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
      >
        <Grid container spacing={spacing}>
          {visibleProducts.map((product, index) => (
            <Grid 
              item 
              key={`${product.id}-${categoryKey || 'all'}`} // Add categoryKey to prevent stale renders when switching categories
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
                redirectToCart={false} // Don't redirect when adding from grid to avoid jarring UX
              />
            </Grid>
          ))}
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