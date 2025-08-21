import { PaymentProvider } from "./payment-provider.type";

export interface CreateCheckoutResponse {
  provider: PaymentProvider;
  checkoutUrl?: string;
  sessionId?: string;
  orderId?: string;
}