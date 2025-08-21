import { PaymentProvider } from "./payment-provider.type";

export interface CreateCheckoutRequest {
  orderId: string | number;
  provider: PaymentProvider;
  successUrl?: string;
  cancelUrl?: string;
}