"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Box, 
  Typography, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  ListItem
} from "@mui/material";
import PageContainer from '@/components/PageContainer';
import Layout from '@/components/Layout';
import { Product } from "@/types/product";
import Image from "next/image";
import Button from "@/components/Button";

// Cache for product data
const productCache = new Map<string, Product[]>();

export default function CategoriesPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>(productCache.get('all') || []);
    const [loading, setLoading] = useState(!products.length);
    const [error, setError] = useState<string | null>(null);

    // Memoize product fetching
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            // Add loading timeout protection
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timeout - loading sample data')), 8000)
            );
            
            // Use sample data if API fails
            const fallbackData = [
                { id: 1, title: "Premium Engine Oil", price: 49.99, category: "ENGINE", 
                  description: "High-quality synthetic engine oil", image: "/products/oil.jpg", 
                  rating: { rate: 4.5, count: 89 } },
                { id: 2, title: "Performance Brake Pads", price: 129.99, category: "BRAKES", 
                  description: "Enhanced stopping power for all conditions", image: "/products/brakes.jpg", 
                  rating: { rate: 4.7, count: 65 } },
                { id: 3, title: "LED Headlight Kit", price: 199.99, category: "LIGHTING", 
                  description: "Ultra-bright LED headlight conversion", image: "/products/lights.jpg", 
                  rating: { rate: 4.3, count: 42 } },
                { id: 4, title: "Air Filter System", price: 59.99, category: "ENGINE", 
                  description: "High-flow air filtration system", image: "/products/filter.jpg", 
                  rating: { rate: 4.2, count: 31 } }
            ];

            try {
                console.log('Fetching products - starting request');
                
                // Race between fetch and timeout
                const response = await Promise.race([
                    fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}/latest`, {
                        headers: {
                            'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || ''
                        }
                    }),
                    timeoutPromise
                ]) as Response;

                if (!response.ok) {
                    console.error('Response not OK:', response.status, response.statusText);
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                console.log('Fetched data:', data ? 'Success' : 'No data');
                
                const fetchedProducts = data.record?.products || [];
                
                // Use fallback data if API returns empty array
                if (fetchedProducts.length === 0) {
                    console.warn('API returned empty products array, using fallback data');
                    productCache.set('all', fallbackData);
                    setProducts(fallbackData);
                    return;
                }
                
                console.log('Setting products from fetched data:', fetchedProducts.length);
                productCache.set('all', fetchedProducts);
                setProducts(fetchedProducts);

            } catch (fetchError) {
                console.error('Fetch error, using fallback data:', fetchError);
                productCache.set('all', fallbackData);
                setProducts(fallbackData);
            }
            
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
            
            // Use fallback data if any error occurs at the top level
            const fallbackData = [
                { id: 1, title: "Premium Engine Oil", price: 49.99, category: "ENGINE", 
                  description: "High-quality synthetic engine oil", image: "/products/oil.jpg", 
                  rating: { rate: 4.5, count: 89 } },
                { id: 2, title: "Performance Brake Pads", price: 129.99, category: "BRAKES", 
                  description: "Enhanced stopping power for all conditions", image: "/products/brakes.jpg", 
                  rating: { rate: 4.7, count: 65 } }
            ];
            
            productCache.set('all', fallbackData);
            setProducts(fallbackData);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!products.length) {
            fetchProducts();
        }
    }, [products.length, fetchProducts]);

    // Get unique categories and a sample product from each
    const categories = Array.from(new Set(products.map(product => product.category)));
    const categoryProducts = categories.map(category => {
        const productsInCategory = products.filter(p => p.category === category);
        return {
            category,
            count: productsInCategory.length,
            sampleProduct: productsInCategory[0]
        };
    });

    const handleCategoryClick = (category: string) => {
        // Navigate to shop page with category query parameter
        router.push(`/shop?category=${encodeURIComponent(category)}`);
    };

    if (loading) {
        return (
            <Layout>
                <PageContainer>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '1500px',
                            mx: 'auto',
                            minHeight: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 600,
                                fontSize: { xs: '2.5rem', md: '3rem' },
                                color: 'text.primary',
                                letterSpacing: '-0.03em',
                                mb: 4
                            }}
                        >
                            PRODUCT CATEGORIES
                        </Typography>
                        
                        <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
                        <Typography variant="h6" color="text.secondary">
                            Loading categories...
                        </Typography>
                    </Box>
                </PageContainer>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <PageContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                </PageContainer>
            </Layout>
        );
    }

    return (
        <Layout>
            <PageContainer
                title="Product Categories"
            >
                <Grid container spacing={4}>
                    {categoryProducts.map(({ category, count, sampleProduct }) => (
                        <Grid item xs={12} sm={6} md={4} key={category}>
                            <Card 
                                onClick={() => handleCategoryClick(category)}
                                sx={{
                                    height: 320,
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 6
                                    },
                                    backgroundColor: 'background.paper',
                                    borderRadius: 2,
                                    overflow: 'hidden'
                                }}
                            >
                                <Box sx={{ position: 'relative', height: 200 }}>
                                    {sampleProduct?.image ? (
                                        <Image
                                            src={sampleProduct.image}
                                            alt={category}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 768px) 100vw, 400px"
                                            quality={60}
                                            loading="lazy"
                                            placeholder="blur"
                                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIyMjIiLz48L3N2Zz4="
                                        />
                                    ) : (
                                        <Box 
                                            sx={{ 
                                                height: '100%', 
                                                display: 'flex', 
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: 'grey.800'
                                            }}
                                        >
                                            <Typography variant="h6" color="text.secondary">
                                                {category}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                <CardContent>
                                    <Typography 
                                        variant="h5" 
                                        component="h2"
                                        gutterBottom
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {category}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                    >
                                        {count} {count === 1 ? 'product' : 'products'} available
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Button 
                    variant="contained" 
                    onClick={() => router.push("/shop")}
                    sx={{ 
                        mt: 6, 
                        mx: 'auto', 
                        display: 'block',
                        bgcolor: '#222 !important',
                        color: 'rgba(255, 255, 255, 0.9) !important',
                        border: '1px solid #333 !important',
                        '&:hover': {
                            bgcolor: '#333 !important'
                        }
                    }}
                >
                    View All Products
                </Button>
            </PageContainer>
        </Layout>
    );
} 