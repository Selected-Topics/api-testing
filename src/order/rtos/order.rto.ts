import { Order, OrderStatus } from '../order.schema';
import { Types } from 'mongoose';

class OrderItemRto {
  constructor(
    public productId: string,
    public quantity: number,
    public price: number,
    public name: string,
  ) {}
}

class ShippingAddressRto {
  constructor(
    public street: string,
    public city: string,
    public state: string,
    public country: string,
    public zipCode: string,
  ) {}
}

export class OrderRto {
  constructor(
    public id: string,
    public userId: string,
    public totalAmount: number,
    public shippingAddress: ShippingAddressRto,
    public items: OrderItemRto[],
    public status: OrderStatus,
    public createdAt: Date,
    public updatedAt: Date,
    public trackingNumber?: string,
    public estimatedDeliveryDate?: Date,
    public notes?: string,
  ) {}

  static fromDocument(document: Order): OrderRto {
    return new OrderRto(
      document._id.toString(),
      document.userId.toString(),
      document.totalAmount,
      new ShippingAddressRto(
        document.shippingAddress.street,
        document.shippingAddress.city,
        document.shippingAddress.state,
        document.shippingAddress.country,
        document.shippingAddress.zipCode,
      ),
      document.items.map(
        (item) =>
          new OrderItemRto(
            item.productId,
            item.quantity,
            item.price,
            item.name,
          ),
      ),
      document.status,
      document.createdAt,
      document.updatedAt,
      document.trackingNumber,
      document.estimatedDeliveryDate,
      document.notes,
    );
  }

  static fromDocuments(documents: Order[]): OrderRto[] {
    return documents.map((doc) => OrderRto.fromDocument(doc));
  }
} 