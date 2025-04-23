// lib/dataFetch.ts
import { Product } from '@/types/product';

// Define fallback data (consider moving to a separate constants file)
const fallbackProducts: Product[] = [
    { id: 1, title: "Premium Engine Oil", price: 49.99, category: "ENGINE", description: "High-quality synthetic engine oil", image: "/products/oil.jpg", rating: { rate: 4.5, count: 89 } },
    { id: 2, title: "Performance Brake Pads", price: 129.99, category: "BRAKES", description: "Enhanced stopping power", image: "/products/brakes.jpg", rating: { rate: 4.7, count: 65 } },
    { id: 3, title: "LED Headlight Kit", price: 199.99, category: "LIGHTING", description: "Ultra-bright LEDs", image: "/products/lights.jpg", rating: { rate: 4.3, count: 42 } },
    { id: 4, title: "Air Filter System", price: 59.99, category: "ENGINE", description: "Better engine performance", image: "/products/filter.jpg", rating: { rate: 4.2, count: 31 } },
    { id: 5, title: "Performance Exhaust", price: 349.99, category: "EXHAUST", description: "Aggressive sound", image: "/products/exhaust.jpg", rating: { rate: 4.8, count: 23 } },
    { id: 6, title: "Suspension Kit", price: 699.99, category: "SUSPENSION", description: "Better handling", image: "/products/suspension.jpg", rating: { rate: 4.6, count: 17 } },
    { id: 7, title: "Spark Plugs (Set of 4)", price: 29.99, category: "ENGINE", description: "Reliable ignition performance", image: "/products/sparkplugs.jpg", rating: { rate: 4.4, count: 55 } },
    { id: 8, title: "All-Weather Floor Mats", price: 89.99, category: "ACCESSORIES", description: "Protect your vehicle's interior", image: "/products/floormats.jpg", rating: { rate: 4.9, count: 112 } }
];

const fallbackCategories: string[] = ["ENGINE", "BRAKES", "LIGHTING", "EXHAUST", "SUSPENSION", "ACCESSORIES"];


const jsonBinId = process.env.NEXT_PUBLIC_JSONBIN_ID;
const apiKey = process.env.NEXT_PUBLIC_JSONBIN_API_KEY; // Use if needed for writes/private bins

async function fetchDataFromBin<T>(fallbackData: T): Promise<T> {
    if (!jsonBinId) {
        console.warn("JSONBin ID not configured, returning fallback data.");
        return fallbackData;
    }

    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${jsonBinId}/latest`, {
            headers: apiKey ? { 'X-Master-Key': apiKey } : {},
            // Cache strategy: Revalidate frequently for potentially dynamic data,
            // or less frequently if data is static. Consider tags for on-demand revalidation.
            next: { revalidate: 600 } // Revalidate every 10 minutes
        });

        if (!response.ok) {
            console.error(`Failed to fetch from JSONbin: ${response.status} ${response.statusText}`);
            return fallbackData;
        }

        const data = await response.json();
        return data?.record || fallbackData; // Assumes data is stored directly in 'record'

    } catch (error) {
        console.error("Error fetching from JSONbin:", error);
        return fallbackData;
    }
}

// --- Fetch All Products ---
export async function fetchAllProducts(): Promise<Product[]> {
    const binData = await fetchDataFromBin<{ products?: Product[] }>({ products: fallbackProducts });

    if (!Array.isArray(binData?.products) || binData.products.length === 0) {
        console.warn("Invalid or empty product data from JSONbin, returning fallback.");
        return fallbackProducts;
    }
    return binData.products;
}

// --- Fetch Categories ---
export async function fetchCategories(): Promise<string[]> {
    // Option 1: Deduce from all products (can be slow if many products)
    // const products = await fetchAllProducts();
    // const categories = [...new Set(products.map(p => p.category.toUpperCase()))];
    // return categories.length > 0 ? categories : fallbackCategories;

    // Option 2: Fetch categories specifically if stored separately in JSONbin
    // const binData = await fetchDataFromBin<{ categories?: string[] }>({ categories: fallbackCategories });
    // if (!Array.isArray(binData?.categories) || binData.categories.length === 0) {
    //     console.warn("Invalid or empty category data from JSONbin, returning fallback.");
    //     return fallbackCategories;
    // }
    // return binData.categories;

    // Option 3: Assume categories are somewhat static and return fallback/hardcoded list for now
     console.warn("Category fetching assumes fallback list for now.");
     return fallbackCategories; // Using fallback until dedicated category fetching is confirmed
}

// --- Fetch Products by Category ---
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
    if (!category) {
        console.error('No category provided to fetchProductsByCategory');
        return [];
    }
    
    // Get all products
    const allProducts = await fetchAllProducts();
    console.log(`[DEBUG] fetchProductsByCategory called with category: "${category}"`);

    // Normalize the incoming category (trim whitespace, uppercase for comparison)
    const normalizedRequestCategory = category.trim().toUpperCase();
    console.log(`[DEBUG] Normalized requested category: "${normalizedRequestCategory}"`);

    // Log all available categories for debugging
    const categorySet = new Set(allProducts.map(p => p.category ? p.category.toUpperCase() : 'UNKNOWN'));
    const availableCategories = Array.from(categorySet);
    console.log(`[DEBUG] Available categories in products: ${JSON.stringify(availableCategories)}`);

    // Special case for 'all' category
    if (normalizedRequestCategory === 'ALL') {
        console.log('[DEBUG] Requested "ALL" category, returning all products');
        return allProducts;
    }

    // Get all available normalized categories for matching
    const normalizedAvailableCategories = availableCategories.map(c => c.trim().toUpperCase());
    
    // Check if we need to perform fuzzy matching (in case of singular/plural or typos)
    let fuzzyMatchedCategory = normalizedRequestCategory;
    let isExactMatch = normalizedAvailableCategories.includes(normalizedRequestCategory);
    
    if (!isExactMatch) {
        console.log(`[DEBUG] Category "${normalizedRequestCategory}" not found exactly, trying fuzzy match`);
        
        // Try to match singular/plural forms
        // Check if requested category is singular form of an available plural category
        if (normalizedRequestCategory.endsWith('S')) {
            const singularForm = normalizedRequestCategory.slice(0, -1);
            const matchingPlural = normalizedAvailableCategories.find(c => c.startsWith(singularForm));
            if (matchingPlural) {
                fuzzyMatchedCategory = matchingPlural;
                console.log(`[DEBUG] Found plural match: "${fuzzyMatchedCategory}" for requested "${normalizedRequestCategory}"`);
            }
        } else {
            // Check if requested category is missing 's' at the end
            const pluralForm = normalizedRequestCategory + 'S';
            if (normalizedAvailableCategories.includes(pluralForm)) {
                fuzzyMatchedCategory = pluralForm;
                console.log(`[DEBUG] Found singular->plural match: "${fuzzyMatchedCategory}" for requested "${normalizedRequestCategory}"`);
            }
        }
    }
    
    // Filter products that match the category (either exact or fuzzy matched)
    const filteredProducts = allProducts.filter(product => {
        if (!product.category) return false;
        
        const normalizedProductCategory = product.category.trim().toUpperCase();
        const isMatch = normalizedProductCategory === fuzzyMatchedCategory;
        
        // Log each product's category comparison
        console.log(`[DEBUG] Product: "${product.title}", Category: "${normalizedProductCategory}", Matches "${fuzzyMatchedCategory}"? ${isMatch}`);
        
        return isMatch;
    });

    console.log(`[DEBUG] Found ${filteredProducts.length} products matching category "${normalizedRequestCategory}"`);
    
    // Extra validation logs
    if (filteredProducts.length === 0) {
        console.warn(`[WARNING] No products found for category "${category}". Check category spelling and case.`);
    }

    return filteredProducts;
}
