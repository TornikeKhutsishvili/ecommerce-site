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

  // create
  createCheckout(req: CreateCheckoutRequest): Observable<CreateCheckoutResponse> {
    return this.http.post<CreateCheckoutResponse>(`${this.baseUrl}/checkout`, req);
  }

  // confirm
  confirm(provider: PaymentProvider, sessionOrOrderId: string) {
    return this.http.get<{ status: 'paid' | 'failed' | 'pending'; orderId: string }>(
      `${this.baseUrl}/confirm`,
      { params: { provider, id: sessionOrOrderId } }
    );
  }

}