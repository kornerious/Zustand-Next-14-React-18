export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    rating?: {
        rate: number;
        count: number;
    };
    specs?: {
        engine?: string;
        horsepower?: string;
        acceleration?: string;
        topSpeed?: string;
        range?: string;
        seating?: string;
    };
} 