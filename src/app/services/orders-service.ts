import { HttpClient } from '@angular/common/http';

import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import {
  Observable,
  catchError,
  map,
  of,
  shareReplay
} from 'rxjs';

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: number | string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CreateOrderDto {
  userId: string;
  items: OrderItem[];
  currency: string;
  address: {
    fullName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    country: string;
    zip: string;
  };
  notes?: string;
}

export interface Order extends CreateOrderDto {
  id: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  paymentProvider?: 'stripe' | 'paypal';
  paymentRef?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {

  // Inject HttpClient
  private http = inject(HttpClient);
  private baseUrl = '/api/orders';

  // Simple client cache
  private lastOrders = signal<Order[] | null>(null);

  createOrder(payload: CreateOrderDto): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}`, payload).pipe(
      catchError(() => of(null as unknown as Order))
    );
  }

  getOrder(id: string): Observable<Order | null> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  listMyOrders(userId: string, force = false): Observable<Order[]> {
    if (this.lastOrders() && !force) {
      return of(this.lastOrders()!);
    }
    return this.http.get<Order[]>(`${this.baseUrl}?userId=${encodeURIComponent(userId)}`).pipe(
      map(list => {
        this.lastOrders.set(list);
        return list;
      }),
      shareReplay(1),
      catchError(() => of([]))
    );
  }

  updateStatus(id: string, status: OrderStatus): Observable<Order | null> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}`, { status }).pipe(
      catchError(() => of(null))
    );
  }

  cancel(id: string, reason?: string): Observable<Order | null> {
    return this.http.post<Order>(`${this.baseUrl}/${id}/cancel`, { reason }).pipe(
      catchError(() => of(null))
    );
  }

}