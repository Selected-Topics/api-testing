import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Order extends Document {
  declare _id: Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({
    type: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    required: true,
  })
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };

  @Prop({
    type: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
    required: true,
  })
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }>;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Prop()
  trackingNumber?: string;

  @Prop()
  estimatedDeliveryDate?: Date;

  @Prop()
  notes?: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
