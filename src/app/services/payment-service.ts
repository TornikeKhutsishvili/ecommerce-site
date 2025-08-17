import { HttpClient } from '@angular/common/http';

import {
  Injectable,
  inject
} from '@angular/core';

import {
  Observable,
  map
} from 'rxjs';

import { CreateCheckoutRequest } from '../interfaces/create-checkout-request.interface';
import { CreateCheckoutResponse } from '../interfaces/create-checkout-response.interface';
import { PaymentProvider } from '../interfaces/payment-provider.type';

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

export { PaymentProvider };
