// app/shop/[category]/page.tsx - CORRECTED REFACTOR
import React from 'react';
import Layout from '@/components/Layout';
import CategoryPageClient from '@/components/CategoryPageClient/CategoryPageClient';
import { fetchProductsByCategory, fetchCategories } from '@/lib/dataFetch';
import { Product } from '@/types/product';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
    params: { category: string };
}

// Optional: Generate static paths for known categories at build time
export async function generateStaticParams() {
    // Ensure fallback categories are fetched if API fails or is slow
    const categories = await fetchCategories().catch(() => {
        console.warn("Failed to fetch categories for generateStaticParams, using fallback.");
        // Use the same fallback as defined in dataFetch.ts if possible
        return ["ENGINE", "BRAKES", "LIGHTING", "EXHAUST", "SUSPENSION", "ACCESSORIES"]; 
    });
    return categories.map((category) => ({
        category: category.toLowerCase(),
    }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    // Decode and normalize the category URL parameter
    const categoryName = decodeURIComponent(params.category); 
    console.log(`[DEBUG-ROUTE] Category page requested with category param: "${categoryName}"`);
    
    // Get all valid categories and normalize them
    const validCategories = await fetchCategories();
    const normalizedCategoryName = categoryName.trim().toUpperCase();
    const normalizedValidCategories = validCategories.map(cat => cat.trim().toUpperCase());
    
    console.log(`[DEBUG-ROUTE] Checking if "${categoryName}" is valid among: ${JSON.stringify(normalizedValidCategories)}`);
    
    // First check exact match (case insensitive)
    let isValidCategory = normalizedValidCategories.includes(normalizedCategoryName);
    let targetCategory = categoryName;
    
    // If no exact match, try fuzzy matching for singular/plural forms
    if (!isValidCategory) {
        console.log(`[DEBUG-ROUTE] No exact match found for "${categoryName}", trying fuzzy matching...`);
        
        // Special case handling for common categories
        if (normalizedCategoryName === 'BRAKE') {
            const brakesCategory = normalizedValidCategories.find(cat => cat === 'BRAKES');
            if (brakesCategory) {
                const originalCaseCategory = validCategories[normalizedValidCategories.indexOf(brakesCategory)];
                isValidCategory = true;
                targetCategory = originalCaseCategory;
                console.log(`[DEBUG-ROUTE] Found special case match: "${originalCaseCategory}" for "${categoryName}"`);
            }
        }
        // General plural/singular handling if special case didn't match
        else if (normalizedCategoryName.endsWith('S')) {
            // Try removing 's' at the end
            const singularForm = normalizedCategoryName.slice(0, -1);
            const matchingCategory = normalizedValidCategories.find(cat => cat.startsWith(singularForm));
            
            if (matchingCategory) {
                const originalCaseCategory = validCategories[normalizedValidCategories.indexOf(matchingCategory)];
                isValidCategory = true;
                targetCategory = originalCaseCategory;
                console.log(`[DEBUG-ROUTE] Found plural match: "${originalCaseCategory}" for "${categoryName}"`);
            }
        } else {
            // Try adding 's' at the end
            const pluralForm = normalizedCategoryName + 'S';
            if (normalizedValidCategories.includes(pluralForm)) {
                const originalCaseCategory = validCategories[normalizedValidCategories.indexOf(pluralForm)];
                isValidCategory = true;
                targetCategory = originalCaseCategory;
                console.log(`[DEBUG-ROUTE] Found singular->plural match: "${originalCaseCategory}" for "${categoryName}"`);
            }
        }
    }
    
    console.log(`[DEBUG-ROUTE] Is "${categoryName}" a valid category? ${isValidCategory}`);
    
    if (!isValidCategory) {
        console.error(`[ERROR] Invalid category requested: ${categoryName}`);
        notFound(); // Show 404 for invalid categories
    }
    
    // Use the matched category (either exact or fuzzy matched) for fetching products
    console.log(`[DEBUG-ROUTE] Fetching products using category: "${targetCategory}"`);
    const products = await fetchProductsByCategory(targetCategory);
    console.log(`[DEBUG-ROUTE] Fetched ${products.length} products for category: ${targetCategory}`);

    return (
        <Layout>
            <CategoryPageClient products={products} categoryName={categoryName} />
        </Layout>
    );
}
