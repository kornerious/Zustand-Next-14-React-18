import { Injectable } from '@nestjs/common';

@Injectable()
export class ShopService {
    private products = [
        { id: 1, name: "Laptop", price: 1200 },
        { id: 2, name: "Headphones", price: 100 },
        { id: 3, name: "Smartphone", price: 800 }
    ];

    getAllProducts() {
        return this.products;
    }
}