import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order.schema';
import { OrderRto } from './rtos/order.rto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(
      req.user.userId,
      createOrderDto,
    );
    return OrderRto.fromDocument(order);
  }

  @Get()
  async findAll(@Request() req) {
    const orders = await this.orderService.findAll(req.user.userId);
    return OrderRto.fromDocuments(orders);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const order = await this.orderService.findOne(id, req.user.userId);
    return OrderRto.fromDocument(order);
  }

  @Patch(':id/status')
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ) {
    const order = await this.orderService.updateStatus(
      id,
      req.user.userId,
      status,
    );
    return OrderRto.fromDocument(order);
  }

  @Patch(':id/cancel')
  async cancelOrder(@Request() req, @Param('id') id: string) {
    const order = await this.orderService.cancelOrder(id, req.user.userId);
    return OrderRto.fromDocument(order);
  }

  @Patch(':id/tracking')
  async addTrackingNumber(
    @Request() req,
    @Param('id') id: string,
    @Body('trackingNumber') trackingNumber: string,
  ) {
    const order = await this.orderService.addTrackingNumber(
      id,
      req.user.userId,
      trackingNumber,
    );
    return OrderRto.fromDocument(order);
  }
}
