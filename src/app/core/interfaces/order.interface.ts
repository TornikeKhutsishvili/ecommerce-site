import { OrderItem } from "./order-item.interface";
import { OrderStatus } from "./order-status.type";
import { PaymentProvider } from "./payment-provider.type";

export interface Order extends CreateOrderDto {
  id: string | number;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  paymentProvider?: PaymentProvider;
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
    city: string;
    country: string;
    zip: string;
  };
}