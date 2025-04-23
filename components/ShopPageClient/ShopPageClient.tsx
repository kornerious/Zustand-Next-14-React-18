// components/ShopPageClient/ShopPageClient.tsx
"use client";

import React, { useState, useMemo, Suspense } from 'react';
import { Container, Typography, Box, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/product';
import dynamic from 'next/dynamic';

const ProductGrid = dynamic(() => import('@/components/ProductGrid/ProductGrid'), {
  loading: () => <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>,
  ssr: false // Product Grid might need client-side hooks internally or for interactions
});

interface ShopPageClientProps {
    initialProducts: Product[];
    categories: string[];
}

export default function ShopPageClient({ initialProducts = [], categories = [] }: ShopPageClientProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const addToCart = useCartStore(state => state.addToCart);

    // Memoized filtering logic - Added nullish coalescing for description
    const filteredProducts = useMemo(() => {
        return products
            .filter(product => 
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                (product.description ?? '').toLowerCase().includes(searchTerm.toLowerCase()) // Handle potentially undefined description
            )
            .filter(product => 
                selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
    }, [products, searchTerm, selectedCategory]);

    // Placeholder for potential sorting logic
    // const sortedProducts = useMemo(() => { ... }, [filteredProducts, sortOption]);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }} data-testid="shop-page-client">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                Shop All Products
            </Typography>

            {/* Filtering/Searching Controls */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Search Products"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            label="Category"
                        >
                            <MenuItem value="all">All Categories</MenuItem>
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat.toLowerCase()}>{cat}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* Add Sorting Dropdown Here if needed */}
            </Grid>

            <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>}> 
                <ProductGrid
                    products={filteredProducts}
                    loading={false} // Data is pre-fetched
                    error={null}    // Error handled server-side
                    onAddToCart={addToCart}
                    spacing={3}
                    fullWidth={true} // Use full width grid for shop page
                />
            </Suspense>
        </Container>
    );
}
