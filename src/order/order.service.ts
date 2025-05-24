import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderStatus } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly productService: ProductService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    // Calculate total amount and validate products
    let totalAmount = 0;
    const orderItems: {
      productId: string;
      quantity: number;
      price: number;
      name: string;
    }[] = [];

    for (const item of createOrderDto.items) {
      const product = await this.productService.findOne(item.productId);

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      // Update product stock
      await this.productService.update(item.productId, {
        stock: product.stock - item.quantity,
      });

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        name: product.name,
      });

      totalAmount += product.price * item.quantity;
    }

    const order = new this.orderModel({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress: createOrderDto.shippingAddress,
      notes: createOrderDto.notes,
      status: OrderStatus.PENDING,
    });

    return order.save();
  }

  async findAll(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ _id: id, userId }).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateStatus(
    id: string,
    userId: string,
    status: OrderStatus,
  ): Promise<Order> {
    const order = await this.orderModel
      .findOneAndUpdate({ _id: id, userId }, { status }, { new: true })
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async cancelOrder(id: string, userId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ _id: id, userId }).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (order.status === OrderStatus.DELIVERED) {
      throw new Error('Cannot cancel a delivered order');
    }

    // Restore product stock
    for (const item of order.items) {
      const product = await this.productService.findOne(item.productId);
      await this.productService.update(item.productId, {
        stock: product.stock + item.quantity,
      });
    }

    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, { status: OrderStatus.CANCELLED }, { new: true })
      .exec();

    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return updatedOrder;
  }

  async addTrackingNumber(
    id: string,
    userId: string,
    trackingNumber: string,
  ): Promise<Order> {
    const order = await this.orderModel
      .findOneAndUpdate({ _id: id, userId }, { trackingNumber }, { new: true })
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }
}
