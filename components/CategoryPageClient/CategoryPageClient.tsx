// components/CategoryPageClient/CategoryPageClient.tsx
"use client";

import React, { Suspense } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/product';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Button from '@/components/Button';

const ProductGrid = dynamic(() => import('@/components/ProductGrid/ProductGrid'), {
  loading: () => <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>,
  ssr: false
});

interface CategoryPageClientProps {
    products: Product[];
    categoryName: string;
}

export default function CategoryPageClient({ products = [], categoryName = '' }: CategoryPageClientProps) {
    const addToCart = useCartStore(state => state.addToCart);

    // Format the category name for display - capitalize first letter of each word
    const formatCategoryTitle = (category: string) => {
        if (!category) return 'Category Products';
        // Handle potential plural forms by removing trailing 's' from displayed title if original is singular
        const displayCategory = category.toLowerCase();
        return displayCategory
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    
    const title = `${formatCategoryTitle(categoryName)} Products`;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }} data-testid="category-page-client">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                 <Typography variant="h2" component="h1" sx={{ fontWeight: 600 }}>
                    {title}
                 </Typography>
                 <Button component={Link} href="/shop" variant="outlined">
                    Back to Shop
                 </Button>
            </Box>

            {products.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', my: 5 }}>
                    No products found in this category.
                </Typography>
            ) : (
                <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>}> 
                    <ProductGrid
                        products={products}
                        loading={false} // Data is pre-fetched
                        error={null}    // Error handled server-side
                        onAddToCart={addToCart}
                        spacing={3}
                        fullWidth={true}
                    />
                </Suspense>
            )}
        </Container>
    );
}
