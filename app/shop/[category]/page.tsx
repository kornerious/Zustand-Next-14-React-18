"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    Box, Typography, CircularProgress, Container
} from "@mui/material";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";
import PageContainer from '@/components/PageContainer';
import ProductGrid from '@/components/ProductGrid';

// Cache for product data
const productCache = new Map<string, Product[]>();

// Loading fallback component
function CategoryPageLoading() {
  return (
    <PageContainer title="Loading Category" subtitle="Please wait...">
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    </PageContainer>
  );
}

// Main category page component that uses params
function CategoryPageContent() {
    const { category } = useParams();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const addToCart = useCartStore(state => state.addToCart);

    // Memoize product fetching
    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}/latest`, {
                headers: {
                    'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY || ''
                },
                next: { revalidate: 60 } // Cache for 60 seconds
            });

            if (!response.ok) throw new Error('Failed to fetch products');

            const data = await response.json();
            const allProducts = data.record?.products || [];
            const filteredProducts = allProducts.filter((product: Product) => product.category === category);
            
            if (filteredProducts.length === 0) {
                setError(`No products found in category: ${category}`);
            } else {
                productCache.set(category as string, filteredProducts);
                setProducts(filteredProducts);
                setError(null);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        const cachedProducts = productCache.get(category as string);
        if (cachedProducts) {
            setProducts(cachedProducts);
            setLoading(false);
        } else {
            fetchProducts();
        }
    }, [category, fetchProducts]);

    const handleAddToCart = useCallback((product: Product) => {
        addToCart(product);
        router.push('/cart'); // Redirect to cart page after adding item
    }, [addToCart, router]);

    return (
        <PageContainer 
            title={category as string} 
            subtitle="Browse our selection of high-quality components"
        >
            <ProductGrid
                products={products}
                loading={loading}
                error={error}
                onAddToCart={handleAddToCart}
            />
        </PageContainer>
    );
}

// Main component that wraps CategoryPageContent in Suspense
export default function CategoryPage() {
  return (
    <Suspense fallback={<CategoryPageLoading />}>
      <CategoryPageContent />
    </Suspense>
  );
}
