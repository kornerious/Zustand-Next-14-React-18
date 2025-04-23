import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// More comprehensive product data
const products = [
    { id: 1, name: "King Size Bed", category: "bed-frames", price: 999.99, rating: { rate: 4.5, count: 123 } },
    { id: 2, name: "Memory Foam Mattress", category: "mattress", price: 499.99, rating: { rate: 4.8, count: 215 } },
    { id: 3, name: "Nightstand", category: "furniture", price: 149.99, rating: { rate: 4.2, count: 98 } },
    { id: 4, name: "Dresser", category: "furniture", price: 349.99, rating: { rate: 4.4, count: 76 } },
];

// In-memory cache with expiration
type CacheEntry = {
    data: any;
    expiry: number;
};

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 60 * 1000; // 1 minute cache

export async function GET(req: NextRequest) {
    try {
        // Parse query parameters
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const id = searchParams.get("id");
        
        // Generate a cache key based on the request parameters
        const cacheKey = `products_${category || 'all'}_${id || 'all'}`;
        
        // Check cache first
        const cachedResponse = cache.get(cacheKey);
        if (cachedResponse && cachedResponse.expiry > Date.now()) {
            // Set cache headers
            return NextResponse.json(cachedResponse.data, {
                headers: {
                    'Cache-Control': 'public, max-age=60',
                    'X-Cache': 'HIT',
                },
            });
        }
        
        // Process the request
        let result;
        if (id) {
            // Find by ID
            result = products.find(p => p.id === parseInt(id));
            if (!result) {
                return NextResponse.json({ error: "Product not found" }, { status: 404 });
            }
        } else if (category) {
            // Filter by category
            result = products.filter(p => p.category === category);
        } else {
            // Return all products
            result = products;
        }
        
        // Update cache
        cache.set(cacheKey, {
            data: result,
            expiry: Date.now() + CACHE_TTL
        });
        
        // Return the result with cache headers
        return NextResponse.json(result, {
            headers: {
                'Cache-Control': 'public, max-age=60',
                'X-Cache': 'MISS',
            },
        });
    } catch (error) {
        console.error('Product API error:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
