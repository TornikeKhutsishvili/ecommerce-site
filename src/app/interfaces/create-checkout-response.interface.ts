import { PaymentProvider } from "./payment-provider.type";

export interface CreateCheckoutResponse {

  provider: PaymentProvider;
  checkoutUrl?: string;   // Stripe hosted page ან PayPal approval URL
  sessionId?: string;     // Stripe session id, თუ front-ზე გინდა SDK redirect
  orderId?: string;       // PayPal order id

}