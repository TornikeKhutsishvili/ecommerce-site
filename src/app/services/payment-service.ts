import {
  Injectable,
  inject
} from '@angular/core';

import {
  Observable,
} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { CreateCheckoutRequest } from '../interfaces/create-checkout-request.interface';
import { CreateCheckoutResponse } from '../interfaces/create-checkout-response.interface';
import { PaymentProvider } from '../interfaces/payment-provider.type';

@Injectable({ providedIn: 'root' })
export class PaymentService {

  // Inject HttpClient
  private http = inject(HttpClient);
  private baseUrl = '/api/payments';


  /**
  * We ask the backend to create a Stripe Checkout session or PayPal order.
  * Depending on the response, we either do a window.location.href redirect,
  * or use the front SDK (e.g. Stripe redirectToCheckout) — optional.
  **/
  createCheckout(req: CreateCheckoutRequest): Observable<CreateCheckoutResponse> {
    return this.http.post<CreateCheckoutResponse>(`${this.baseUrl}/checkout`, req);
  }


  /**
  * Checking the completion of the payment (we will be redirected to the success page).
  * The bank should return the updated Order.
  **/
  confirm(provider: PaymentProvider, sessionOrOrderId: string) {
    return this.http.get<{ status: 'paid' | 'failed' | 'pending'; orderId: string }>(
      `${this.baseUrl}/confirm`,
      { params: { provider, id: sessionOrOrderId } }
    );
  }

}
