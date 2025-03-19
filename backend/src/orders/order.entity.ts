import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column('simple-json')
    items: { id: number; name: string; quantity: number }[];
}