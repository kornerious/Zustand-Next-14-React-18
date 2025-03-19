import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Order} from "./orders/order.entity";

@Injectable()
export class OrdersService {
  constructor(
      @InjectRepository(Order)
      private ordersRepository: Repository<Order>,
  ) {}

  async create(orderData: Partial<Order>): Promise<Order> {
    const newOrder = this.ordersRepository.create(orderData);
    return this.ordersRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }
}