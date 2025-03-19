import { Controller, Get } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shop') // ✅ This makes "/shop" a valid route
export class ShopController {
    constructor(private readonly shopService: ShopService) {}

    @Get()
    getProducts() {
        const products = this.shopService.getAllProducts();
        console.log("Returning products:", products); // ✅ Debugging output
        return Array.isArray(products) ? products : []; // ✅ Ensure an array response
    }
}