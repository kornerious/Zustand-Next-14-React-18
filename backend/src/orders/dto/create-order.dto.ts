import { IsEmail, IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsEmail()
    email: string;

    @IsArray()
    @IsNotEmpty()
    items: { id: number; name: string; quantity: number }[];
}