"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Container, Typography, Grid, Box, Paper, Stack, CircularProgress,
    IconButton
} from "@mui/material";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";
import Image from "next/image";
import Button from "@/components/Button";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Verified from "@mui/icons-material/Verified";
import SupportAgent from "@mui/icons-material/SupportAgent";
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';

// Cache for featured products
const productCache = new Map<string, Product[]>();

export default function Home() {
    const router = useRouter();
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>(productCache.get('featured') || []);
    const [loading, setLoading] = useState(!featuredProducts.length);
    const [error, setError] = useState<string | null>(null);
    const addToCart = useCartStore(state => state.addToCart);

    // Memoize product fetching
    const fetchFeaturedProducts = useCallback(async () => {
        setLoading(true);
        try {
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timeout - loading sample data')), 5000)
            );
            const fallbackData = [
                { id: 1, title: "Premium Engine Oil", price: 49.99, category: "ENGINE", description: "High-quality synthetic engine oil", image: "/products/oil.jpg", rating: { rate: 4.5, count: 89 } },
                { id: 2, title: "Performance Brake Pads", price: 129.99, category: "BRAKES", description: "Enhanced stopping power", image: "/products/brakes.jpg", rating: { rate: 4.7, count: 65 } },
                { id: 3, title: "LED Headlight Kit", price: 199.99, category: "LIGHTING", description: "Ultra-bright LEDs", image: "/products/lights.jpg", rating: { rate: 4.3, count: 42 } },
                { id: 4, title: "Air Filter System", price: 59.99, category: "ENGINE", description: "Better engine performance", image: "/products/filter.jpg", rating: { rate: 4.2, count: 31 } },
                { id: 5, title: "Performance Exhaust", price: 349.99, category: "EXHAUST", description: "Aggressive sound", image: "/products/exhaust.jpg", rating: { rate: 4.8, count: 23 } },
                { id: 6, title: "Suspension Kit", price: 699.99, category: "SUSPENSION", description: "Better handling", image: "/products/suspension.jpg", rating: { rate: 4.6, count: 17 } },
                { id: 7, title: "Spark Plugs (Set of 4)", price: 29.99, category: "ENGINE", description: "Reliable ignition performance", image: "/products/sparkplugs.jpg", rating: { rate: 4.4, count: 55 } },
                { id: 8, title: "All-Weather Floor Mats", price: 89.99, category: "ACCESSORIES", description: "Protect your vehicle's interior", image: "/products/floormats.jpg", rating: { rate: 4.9, count: 112 } }
            ];
            
            try {
                const response = await Promise.race([
                    fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}/latest`, {
                        headers: { 'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || '' }
                    }),
                    timeoutPromise
                ]) as Response;

                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                const allProducts = data.record?.products || [];
                
                if (!allProducts.length) {
                    productCache.set('featured', fallbackData);
                    setFeaturedProducts(fallbackData);
                } else {
                    const featured = allProducts.slice(0, 8);
                    productCache.set('featured', featured);
                    setFeaturedProducts(featured);
                }
                setError(null);
            } catch (fetchError) {
                productCache.set('featured', fallbackData);
                setFeaturedProducts(fallbackData);
                setError(null);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            const fallbackData = [
                { id: 1, title: "Premium Engine Oil", price: 49.99, category: "ENGINE", description: "High-quality synthetic engine oil", image: "/products/oil.jpg", rating: { rate: 4.5, count: 89 } },
                { id: 2, title: "Performance Brake Pads", price: 129.99, category: "BRAKES", description: "Enhanced stopping power", image: "/products/brakes.jpg", rating: { rate: 4.7, count: 65 } }
            ];
            setFeaturedProducts(fallbackData);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!featuredProducts.length && !productCache.has('featured')) {
            fetchFeaturedProducts();
        }
    }, [featuredProducts.length, fetchFeaturedProducts]);

    // Memoize handleAddToCart
    const handleAddToCart = useCallback((product: Product) => {
        addToCart(product);
        console.log(`${product.title} added to cart`);
    }, [addToCart]);

    // Hero section
    const heroSection = useMemo(() => (
        <Box
            sx={{
                position: 'relative',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginLeft: 'calc(-50vw + 50%)',
                marginRight: 'calc(-50vw + 50%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))',
                    zIndex: 1
                }
            }}
        >
            <Image
                src="/images/hero-bg.jpg"
                alt="Auto Parts Hero"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                quality={85}
                unoptimized
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIyMjIiLz48L3N2Zz4="
            />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                        fontWeight: 700,
                        color: 'white',
                        mb: 3,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}
                >
                    Premium Auto Parts
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        color: 'white',
                        mb: 4,
                        maxWidth: '600px',
                        mx: 'auto',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                >
                    Quality parts for your vehicle's performance and style
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => router.push('/shop')}
                    sx={{ 
                        fontWeight: 600, 
                        py: 1.5, 
                        px: 4,
                        backgroundColor: '#212121',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#303030',
                        }
                    }}
                >
                    Browse Parts
                </Button>
            </Container>
        </Box>
    ), [router]);

    // Loading state
    if (loading && featuredProducts.length === 0) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    // Error state
    if (error) {
        return (
            <Layout>
                <Container sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="error">{error}</Typography>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            {heroSection}
            
            <Box 
                sx={{ 
                    width: '100%',
                    maxWidth: '1500px',
                    mx: 'auto',
                    px: { xs: 2, sm: 3, md: 4 },
                    mb: 6,
                    mt: 8
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
                    FEATURED PRODUCTS
                </Typography>
                <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ 
                        mb: 6
                    }}
                >
                    Explore our premium selection of high-quality auto parts
                </Typography>
            
                <ProductGrid
                    products={featuredProducts}
                    loading={loading}
                    error={error}
                    onAddToCart={handleAddToCart}
                    columns={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
                    fullWidth={false}
                    spacing={4}
                />
                
                <Box 
                    sx={{ 
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 6 
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => router.push('/shop')}
                        sx={{ 
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
                </Box>
            </Box>
        </Layout>
    );
}
