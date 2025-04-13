'use client';

import { Fragment, useState, useCallback, memo, useRef } from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { ProductGridProps } from './ProductGrid.types';
import { GridContainer, ErrorContainer, LoadingContainer } from './ProductGrid.styled';

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

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading products...
        </Typography>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </ErrorContainer>
    );
  }

  if (!products.length) {
    return (
      <ErrorContainer>
        <Typography variant="body1">{emptyMessage}</Typography>
      </ErrorContainer>
    );
  }

  return (
    <Fragment>
      <Box sx={{ width: '100%', ...(fullWidth ? { maxWidth: '100%' } : {}) }}>
        <Grid container spacing={spacing}>
          {products.map((product, index) => (
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
                onAddToCart={() => handleAddToCart(product)}
                onViewDetails={handleOpenModal}
                priority={index < 4} // Only prioritize loading for first 4 products
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Only render the modal when a product has been selected */}
      {(selectedProduct || modalOpen) && (
        <ProductModal
          open={modalOpen}
          product={selectedProduct || products[0]} // Fallback to first product if none selected
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </Fragment>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid; 