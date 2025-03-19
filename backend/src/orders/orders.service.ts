import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
    ) {}

    async create(orderData: Partial<Order>): Promise<Order> {
        return await this.ordersRepository.save({ ...orderData, status: "Pending" });
    }

    async findAll(): Promise<Order[]> {
        return await this.ordersRepository.find();
    }

    async findOne(id: number): Promise<Order | null> {
        const order = await this.ordersRepository.findOne({ where: { id } });
        if (!order) throw new NotFoundException("Order not found");
        return order;
    }

    async remove(id: number): Promise<void> {
        const order = await this.ordersRepository.findOne({ where: { id } });
        if (!order) throw new NotFoundException("Order not found");
        await this.ordersRepository.delete(id);
    }
}