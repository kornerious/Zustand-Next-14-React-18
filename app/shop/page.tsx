"use client";
import React, { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Modal, 
  Paper, 
  Grid, 
  Box, 
  Typography, 
  IconButton, 
  Stack,
  Tabs,
  Tab,
  CircularProgress
} from "@mui/material";
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@/components/Button";
import { throttle } from "@/src/utils";

// Cache for product data
const productCache = new Map<string, Product[]>();

// Loading fallback component
function ShopPageLoading() {
  return (
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
  );
}

// Main shop page component that uses search params
function ShopPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>(productCache.get('all') || []);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(!products.length);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [categoryKey, setCategoryKey] = useState('all');
    const addToCart = useCartStore(state => state.addToCart);
    const prevCategoryRef = useRef<string>('all');

    // Memoize product fetching
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        
        try {
            // Add loading timeout protection - extend to 8 seconds
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timeout - loading sample data')), 8000)
            );
            
            // Enhanced fallback data with more products
            const fallbackData = [
                { id: 1, title: "Premium Engine Oil", price: 49.99, category: "ENGINE", 
                  description: "High-quality synthetic engine oil for superior engine protection and performance.", 
                  image: "/products/oil.jpg", 
                  rating: { rate: 4.5, count: 89 } },
                { id: 2, title: "Performance Brake Pads", price: 129.99, category: "BRAKES", 
                  description: "Enhanced stopping power brake pads designed for all driving conditions.", 
                  image: "/products/brakes.jpg", 
                  rating: { rate: 4.7, count: 65 } },
                { id: 3, title: "LED Headlight Kit", price: 199.99, category: "LIGHTING", 
                  description: "Ultra-bright LED headlight conversion kit for improved visibility and safety.", 
                  image: "/products/lights.jpg", 
                  rating: { rate: 4.3, count: 42 } },
                { id: 4, title: "Air Filter System", price: 59.99, category: "ENGINE", 
                  description: "High-flow air filtration system for better engine performance and efficiency.", 
                  image: "/products/filter.jpg", 
                  rating: { rate: 4.2, count: 31 } },
                { id: 5, title: "Performance Exhaust", price: 349.99, category: "EXHAUST", 
                  description: "Sport exhaust system for improved flow and a more aggressive sound.", 
                  image: "/products/exhaust.jpg", 
                  rating: { rate: 4.8, count: 23 } },
                { id: 6, title: "Suspension Kit", price: 699.99, category: "SUSPENSION", 
                  description: "Complete suspension upgrade kit for better handling and stance.", 
                  image: "/products/suspension.jpg", 
                  rating: { rate: 4.6, count: 17 } }
            ];

            try {
                console.log('Fetching products - starting request');
                
                // Check if environment variables are available
                if (!process.env.NEXT_PUBLIC_JSONBIN_ID || !process.env.NEXT_PUBLIC_JSONBIN_API_KEY) {
                    console.error('Missing environment variables for JSONbin. Using fallback data.');
                    throw new Error('Missing environment variables');
                }
                
                console.log('JSONbin ID:', process.env.NEXT_PUBLIC_JSONBIN_ID.substring(0, 5) + '...');
                
                // Race between fetch and timeout
                const response = await Promise.race([
                    fetch(`https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_JSONBIN_ID}/latest`, {
                        headers: {
                            'X-Master-Key': process.env.NEXT_PUBLIC_JSONBIN_API_KEY
                        }
                    }),
                    timeoutPromise
                ]) as Response;

                if (!response.ok) {
                    console.error('Response not OK:', response.status, response.statusText);
                    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Fetched data structure:', Object.keys(data));
                
                if (!data || !data.record) {
                    console.error('Invalid data structure from JSONbin, missing record property');
                    throw new Error('Invalid data from JSONbin');
                }
                
                console.log('Record structure:', Object.keys(data.record));
                
                // Check if products array exists in the record
                const fetchedProducts = data.record.products || [];
                console.log('Products found:', fetchedProducts.length);
                
                // Use fallback data if API returns empty array
                if (fetchedProducts.length === 0) {
                    console.warn('API returned empty products array, using fallback data');
                    productCache.set('all', fallbackData);
                    setProducts(fallbackData);
                    setFilteredProducts(fallbackData);
                    
                    // Process category from URL with fallback data
                    processUrlCategory(fallbackData);
                    return;
                }
                
                console.log('Setting products from fetched data:', fetchedProducts.length);
                productCache.set('all', fetchedProducts);
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
                
                // Process category from URL with fetched products
                processUrlCategory(fetchedProducts);

            } catch (fetchError) {
                console.error('Fetch error, using fallback data:', fetchError);
                productCache.set('all', fallbackData);
                setProducts(fallbackData);
                setFilteredProducts(fallbackData);
                
                // Process category from URL with fallback data
                processUrlCategory(fallbackData);
            }
            
        } catch (error) {
            console.error('Error in product fetching:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
            
            // Use the same enhanced fallback data from above
            const fallbackData = [
                { id: 1, title: "Premium Engine Oil", price: 49.99, category: "ENGINE", 
                  description: "High-quality synthetic engine oil for superior engine protection and performance.", 
                  image: "/products/oil.jpg", 
                  rating: { rate: 4.5, count: 89 } },
                { id: 2, title: "Performance Brake Pads", price: 129.99, category: "BRAKES", 
                  description: "Enhanced stopping power brake pads designed for all driving conditions.", 
                  image: "/products/brakes.jpg", 
                  rating: { rate: 4.7, count: 65 } },
                { id: 3, title: "LED Headlight Kit", price: 199.99, category: "LIGHTING", 
                  description: "Ultra-bright LED headlight conversion kit for improved visibility and safety.", 
                  image: "/products/lights.jpg", 
                  rating: { rate: 4.3, count: 42 } },
                { id: 4, title: "Air Filter System", price: 59.99, category: "ENGINE", 
                  description: "High-flow air filtration system for better engine performance and efficiency.", 
                  image: "/products/filter.jpg", 
                  rating: { rate: 4.2, count: 31 } }
            ];
            
            productCache.set('all', fallbackData);
            setProducts(fallbackData);
            setFilteredProducts(fallbackData);
            
            // Process category from URL with fallback data
            processUrlCategory(fallbackData);
        } finally {
            setLoading(false);
        }
    }, []);
    
    // Process URL category with memory of previous state
    const processUrlCategory = useCallback((productsList: Product[]) => {
        const categoryParam = searchParams.get('category');
        const currentCategoryKey = categoryParam ? categoryParam.toLowerCase() : 'all';
        
        // Skip redundant updates if the category hasn't changed
        if (prevCategoryRef.current === currentCategoryKey) return;
        
        prevCategoryRef.current = currentCategoryKey;
        setCategoryKey(currentCategoryKey);
        
        if (!categoryParam) {
            setFilteredProducts(productsList);
            setActiveTab(0);
            return;
        }
        
        // Create uppercase categories list
        const allCategories = ['ALL', ...Array.from(new Set(productsList.map(p => p.category.toUpperCase())))];
        
        // Find exact match first (case-insensitive)
        const exactMatchIndex = allCategories.findIndex(c => 
            c === categoryParam.toUpperCase()
        );
        
        if (exactMatchIndex > 0) {
            // Filter products by category (case-insensitive)
            const filteredList = productsList.filter(p => 
                p.category.toUpperCase() === categoryParam.toUpperCase()
            );
            
            setFilteredProducts(filteredList);
            setActiveTab(exactMatchIndex);
            return;
        }
        
        // If no exact match, try partial match
        const partialMatch = productsList.find(p => 
            p.category.toUpperCase().includes(categoryParam.toUpperCase()) ||
            categoryParam.toUpperCase().includes(p.category.toUpperCase())
        );
        
        if (partialMatch) {
            const partialMatchCategory = partialMatch.category.toUpperCase();
            const partialMatchIndex = allCategories.findIndex(c => c === partialMatchCategory);
            
            if (partialMatchIndex > 0) {
                const filteredList = productsList.filter(p => 
                    p.category.toUpperCase() === partialMatchCategory
                );
                
                setFilteredProducts(filteredList);
                setActiveTab(partialMatchIndex);
                return;
            }
        }
        
        // If no matches at all, show all products
        setFilteredProducts(productsList);
        setActiveTab(0);
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        // Ensure filtered products are set when products change
        if (products.length > 0 && filteredProducts.length === 0) {
            // If coming from SHOP link in header with no category
            if (!searchParams.get('category')) {
                setFilteredProducts(products);
            }
        }
    }, [products, filteredProducts, searchParams]);

    // Memoize handleAddToCart
    const handleAddToCart = useCallback((product: Product) => {
        addToCart(product);
        console.log(`${product.title} added to cart`);
    }, [addToCart]);

    // Get unique categories for tabs
    const categories = ['ALL', ...Array.from(new Set(products.map(product => product.category.toUpperCase())))];

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        const selectedCategory = categories[newValue];
        const newCategoryKey = selectedCategory === 'ALL' ? 'all' : selectedCategory.toLowerCase();
        
        // Skip redundant updates if the category hasn't changed
        if (prevCategoryRef.current === newCategoryKey) return;
        
        prevCategoryRef.current = newCategoryKey;
        setCategoryKey(newCategoryKey);
        setActiveTab(newValue);
        router.push(selectedCategory === 'ALL' ? '/shop' : `/shop?category=${selectedCategory.toLowerCase()}`);
        
        // Use functional updates to ensure we're using the latest state
        if (selectedCategory === 'ALL') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter(p => p.category.toUpperCase() === selectedCategory)
            );
        }
    };

    // Add image optimization function
    const optimizeImageLoading = useCallback(() => {
        // Preload critical images and optimize loading strategy
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('img');
                    if (img && img.dataset.src) {
                        img.src = img.dataset.src;
                        imageObserver.unobserve(entry.target);
                    }
                }
            });
        });
        
        // Create a throttled function with proper cleanup
        const throttledObserve = throttle(() => {
            const containers = document.querySelectorAll('.product-image-container');
            if (containers.length > 0) {
                containers.forEach(container => imageObserver.observe(container));
            }
        }, 200);
        
        // Call the throttled function
        throttledObserve();
        
        // Return cleanup function
        return () => {
            throttledObserve.cancel();
            imageObserver.disconnect();
        };
    }, []);
    
    useEffect(() => {
        let cleanup: (() => void) | undefined;
        
        if (!loading && filteredProducts.length > 0) {
            cleanup = optimizeImageLoading();
        }
        
        return () => {
            if (cleanup) cleanup();
        };
    }, [loading, filteredProducts, optimizeImageLoading]);

    if (loading) {
        return (
            <Layout>
                <Box 
                    sx={{
                        width: '100%',
                        maxWidth: '1500px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, md: 4 },
                        mb: 6,
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
                        OUR PRODUCTS
                    </Typography>
                    
                    <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
                    <Typography variant="h6" color="text.secondary">
                        Loading products...
                    </Typography>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box 
                sx={{
                    width: '100%',
                    maxWidth: '1500px',
                    mx: 'auto',
                    px: { xs: 2, sm: 3, md: 4 },
                    mb: 6
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
                    OUR PRODUCTS
                </Typography>
                
                <Box sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        sx={{ 
                            '& .MuiTab-root': { 
                                color: 'text.secondary',
                                '&.Mui-selected': { color: '#fff' }
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#444'
                            },
                            '& .MuiButtonBase-root': {
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        {categories.map((category, index) => (
                            <Tab key={index} label={category} />
                        ))}
                    </Tabs>
                </Box>
                
                <ProductGrid
                    products={filteredProducts}
                    loading={loading}
                    error={error}
                    onAddToCart={handleAddToCart}
                    emptyMessage={error ? "Error loading products." : "No products found in this category."}
                    fullWidth={true}
                    categoryKey={categoryKey}
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
                        onClick={() => router.push("/")}
                        sx={{ 
                            bgcolor: '#222 !important',
                            color: 'rgba(255, 255, 255, 0.9) !important',
                            border: '1px solid #333 !important',
                            '&:hover': {
                                bgcolor: '#333 !important'
                            }
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Box>
        </Layout>
    );
}

// Main component that wraps ShopPageContent in Suspense
export default function ShopPage() {
  return (
    <Suspense fallback={<ShopPageLoading />}>
      <ShopPageContent />
    </Suspense>
  );
}
