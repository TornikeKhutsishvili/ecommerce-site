import { PaymentProvider } from "./payment-provider.type";

export interface CreateCheckoutRequest {
  orderId: string;
  provider: PaymentProvider;
  successUrl?: string;
  cancelUrl?: string;
}