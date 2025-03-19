import { Controller, Post, Get, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async createOrder(@Body() orderData: Partial<Order>) {
        console.log("Received Order:", orderData);
        return this.ordersService.create(orderData);
    }

    @Get()
    async getOrders(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Get(':id')
    async getOrder(@Param('id') id: number): Promise<Order> {
        const order = await this.ordersService.findOne(id);
        if (!order) throw new NotFoundException("Order not found");
        return order;
    }

    @Delete(':id')
    async removeOrder(@Param('id') id: number) {
        console.log(`Deleting order with ID: ${id}`);
        return this.ordersService.remove(id);
    }
}