// components/HomePageClient/HomePageClient.tsx
"use client";

import React, { Suspense, useMemo } from "react";
import { useRouter as useNextRouter } from "next/navigation";
import {
    Container, Typography, Box, CircularProgress
} from "@mui/material";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";
import Image from "next/image";
import dynamic from "next/dynamic";
import Button from "@/components/Button"; // Assuming this is your custom Button

// Dynamically import ProductGrid
const ProductGrid = dynamic(() => import('@/components/ProductGrid/ProductGrid'), {
  loading: () => <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
});

interface HomePageClientStorybookRouter {
  push: (path: string) => void;
  replace?: (path: string) => void;
  [key: string]: any;
}

interface HomePageClientProps {
    featuredProducts: Product[];
    router?: HomePageClientStorybookRouter;
}

export default function HomePageClient({ featuredProducts = [], router: injectedRouter }: HomePageClientProps) {
    const router = injectedRouter || useNextRouter();
    const addToCart = useCartStore(state => state.addToCart);

    // Memoize hero section to optimize rendering if needed, though less critical here
    const heroSection = useMemo(() => (
        <Box sx={{ position: 'relative', width: '100%', height: { xs: '60vh', md: '70vh' }, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
                src="/images/hero-bg.jpg"
                alt="Auto Parts Hero"
                priority={true}
                fill
                style={{ objectFit: "cover", zIndex: -1, filter: 'brightness(0.5)' }}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIyMjIiLz48L3N2Zz4="
            />
            <Container sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                        textShadow: '0 3px 8px rgba(0,0,0,0.6)',
                        mb: 2
                    }}
                >
                    PREMIUM AUTO PARTS
                </Typography>
                <Typography
                    variant="h5"
                    component="p"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        maxWidth: '700px',
                        mx: 'auto',
                        mb: 4,
                        textShadow: '0 2px 5px rgba(0,0,0,0.5)',
                    }}
                >
                    Find the best quality components for your vehicle. Performance, reliability, and style delivered.
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

    return (
        <>
            {heroSection}

            <Box
                sx={{
                    width: '100%',
                    maxWidth: '1500px',
                    mx: 'auto',
                    px: { xs: 2, sm: 3, md: 4 },
                    mb: 6,
                    mt: 8 // Add top margin to separate from hero
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

                <Suspense fallback={<Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}> 
                    <ProductGrid
                        products={featuredProducts}
                        loading={false} // Data is pre-fetched on server
                        error={null}   // Error handling should happen server-side
                        onAddToCart={addToCart}
                        fullWidth={false}
                        spacing={4}
                    />
                </Suspense>

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
        </>
    );
}
