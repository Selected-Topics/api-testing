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

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(req.user.userId, createOrderDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.orderService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.orderService.findOne(id, req.user.userId);
  }

  @Patch(':id/status')
  updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ) {
    return this.orderService.updateStatus(id, req.user.userId, status);
  }

  @Patch(':id/cancel')
  cancelOrder(@Request() req, @Param('id') id: string) {
    return this.orderService.cancelOrder(id, req.user.userId);
  }

  @Patch(':id/tracking')
  addTrackingNumber(
    @Request() req,
    @Param('id') id: string,
    @Body('trackingNumber') trackingNumber: string,
  ) {
    return this.orderService.addTrackingNumber(
      id,
      req.user.userId,
      trackingNumber,
    );
  }
}
