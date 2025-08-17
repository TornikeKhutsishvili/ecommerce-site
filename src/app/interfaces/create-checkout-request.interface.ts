import { PaymentProvider } from "./payment-provider.type";

export interface CreateCheckoutRequest {

  orderId: string;            // ჩვენი OrderService-ით შექმნილი order.id
  provider: PaymentProvider;  // 'stripe' | 'paypal'
  successUrl?: string;
  cancelUrl?: string;

}