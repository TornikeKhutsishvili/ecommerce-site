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

import {
  CreateOrderDto,
  Order
} from '../interfaces/order.interface';

import { HttpClient } from '@angular/common/http';
import { OrderStatus } from '../interfaces/order-status.type';

@Injectable({ providedIn: 'root' })
export class OrderService {

  // Inject HttpClient
  private http = inject(HttpClient);
  private baseUrl = '/api/orders';

  // Simple client cache
  private lastOrders = signal<Order[] | null>(null);

  createOrder(payload: CreateOrderDto): Observable<Order | null> {
    return this.http.post<Order>(`${this.baseUrl}`, payload).pipe(
      catchError(() => of(null))
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