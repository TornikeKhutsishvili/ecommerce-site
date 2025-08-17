import { OrderItem } from "./order-item.interface";
import { OrderStatus } from "./order-status.type";

export interface Order extends CreateOrderDto {

  id: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  paymentProvider?: 'stripe' | 'paypal';
  paymentRef?: string;

}

export interface CreateOrderDto {

  userId: string;
  items: OrderItem[];
  currency: string;
  address: {
    fullName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    country: string;
    zip: string;
  };
  notes?: string;

}