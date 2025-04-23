"use client";
import React from "react";
import Layout from '@/components/Layout';
import HomePageClient from "@/components/HomePageClient/HomePageClient"; // Import the new client component
import { Product } from "@/types/product";

// --- Server-Side Data Fetching Function ---
async function getFeaturedProducts(): Promise<Product[]> {
    // Define fallback data directly here or import from a constants file
    const fallbackData: Product[] = [
        { id: 1, title: "Premium Engine Oil", price: 49.99, category: "ENGINE", description: "High-quality synthetic engine oil", image: "/products/oil.jpg", rating: { rate: 4.5, count: 89 } },
        { id: 2, title: "Performance Brake Pads", price: 129.99, category: "BRAKES", description: "Enhanced stopping power", image: "/products/brakes.jpg", rating: { rate: 4.7, count: 65 } },
        { id: 3, title: "LED Headlight Kit", price: 199.99, category: "LIGHTING", description: "Ultra-bright LEDs", image: "/products/lights.jpg", rating: { rate: 4.3, count: 42 } },
        { id: 4, title: "Air Filter System", price: 59.99, category: "ENGINE", description: "Better engine performance", image: "/products/filter.jpg", rating: { rate: 4.2, count: 31 } },
        { id: 5, title: "Performance Exhaust", price: 349.99, category: "EXHAUST", description: "Aggressive sound", image: "/products/exhaust.jpg", rating: { rate: 4.8, count: 23 } },
        { id: 6, title: "Suspension Kit", price: 699.99, category: "SUSPENSION", description: "Better handling", image: "/products/suspension.jpg", rating: { rate: 4.6, count: 17 } },
        { id: 7, title: "Spark Plugs (Set of 4)", price: 29.99, category: "ENGINE", description: "Reliable ignition performance", image: "/products/sparkplugs.jpg", rating: { rate: 4.4, count: 55 } },
        { id: 8, title: "All-Weather Floor Mats", price: 89.99, category: "ACCESSORIES", description: "Protect your vehicle's interior", image: "/products/floormats.jpg", rating: { rate: 4.9, count: 112 } }
    ];

    const jsonBinId = process.env.NEXT_PUBLIC_JSONBIN_ID;
    const apiKey = process.env.NEXT_PUBLIC_JSONBIN_API_KEY; // Use if needed for writes/private bins

    // If no JSONBin ID is configured, return fallback immediately
    if (!jsonBinId) {
         console.warn("JSONBin ID not configured, returning fallback featured products.");
         return fallbackData;
    }

    try {
        // Using Next.js extended fetch for caching and revalidation
        // Revalidate every hour (3600 seconds)
        const response = await fetch(`https://api.jsonbin.io/v3/b/${jsonBinId}/latest`, {
            // Add API key header if required by JSONbin for reads
             headers: apiKey ? { 'X-Master-Key': apiKey } : {},
             next: { revalidate: 3600 } // Revalidate data every hour
        });

        if (!response.ok) {
            // Log error but return fallback data on failure
            console.error(`Failed to fetch featured products: ${response.status} ${response.statusText}`);
            return fallbackData;
        }

        const data = await response.json();

        // Validate data structure
        const fetchedProducts = data?.record?.products || data?.record; // Adjust based on actual JSONbin structure
        if (!Array.isArray(fetchedProducts)) {
             console.error('Invalid data structure from JSONbin. Expected an array of products.');
             return fallbackData;
        }

        // Limit to first 8 products for "featured" section
        return fetchedProducts.slice(0, 8);

    } catch (error) {
        console.error("Error fetching featured products:", error);
        return fallbackData; // Return fallback on any fetch error
    }
}

// --- Server Component ---
export default async function Home() {
    // Fetch data on the server
    const featuredProducts = await getFeaturedProducts();

    // Render the layout and pass fetched data to the client component
    return (
        <Layout>
            <HomePageClient featuredProducts={featuredProducts} />
        </Layout>
    );
}
