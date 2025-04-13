import { Product } from './product';

export interface Order {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    items: Array<{
        id: number;
        title: string;
        price: number;
        image: string;
        category: string;
        description: string;
        specs: {
            material: string;
            compatibility: string;
            warranty: string;
            installation: string;
        };
        quantity: number;
    }>;
    total: number;
    date: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
} 