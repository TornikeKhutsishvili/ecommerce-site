import { HttpClient } from '@angular/common/http';

import {
  Injectable,
  inject
} from '@angular/core';

import {
  Observable,
  map
} from 'rxjs';

export type PaymentProvider = 'stripe' | 'paypal';

export interface CreateCheckoutRequest {
  orderId: string;            // ჩვენი OrderService-ით შექმნილი order.id
  provider: PaymentProvider;  // 'stripe' | 'paypal'
  // სურვილისამებრ: success/cancel redirect URI-ები
  successUrl?: string;
  cancelUrl?: string;
}

export interface CreateCheckoutResponse {
  provider: PaymentProvider;
  checkoutUrl?: string;   // Stripe hosted page ან PayPal approval URL
  sessionId?: string;     // Stripe session id, თუ front-ზე გინდა SDK redirect
  orderId?: string;       // PayPal order id
}

@Injectable({ providedIn: 'root' })
export class PaymentService {

  // Inject HttpClient
  private http = inject(HttpClient);
  private baseUrl = '/api/payments';

  /**
   * ბექენდს ვთხოვთ შექმნას Stripe Checkout session ან PayPal order.
   * პასუხის მიხედვით ან ვაკეთებთ window.location.href redirect-ს,
   * ან front SDK-ს იყენებ (e.g. Stripe redirectToCheckout) — სურვილისამებრ.
   */
  createCheckout(req: CreateCheckoutRequest): Observable<CreateCheckoutResponse> {
    return this.http.post<CreateCheckoutResponse>(`${this.baseUrl}/checkout`, req);
  }

  /**
   * გადახდის დასრულების შემოწმება (success page-ზე მოვიშვებთ).
   * ბექი უნდა აბრუნებდეს განახლებულ Order-ს.
   */
  confirm(provider: PaymentProvider, sessionOrOrderId: string) {
    return this.http.get<{ status: 'paid' | 'failed' | 'pending'; orderId: string }>(
      `${this.baseUrl}/confirm`,
      { params: { provider, id: sessionOrOrderId } }
    );
  }

}