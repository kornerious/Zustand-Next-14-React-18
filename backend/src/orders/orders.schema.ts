import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true, type: Array })
    items: { id: number; name: string; quantity: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);