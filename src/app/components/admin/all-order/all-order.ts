import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Order } from '../../../interfaces/order.interface';
import { OrderService } from '../../../services/orders-service';
import { OrderStatus } from '../../../interfaces/order-status.type';

@Component({
  selector: 'app-all-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './all-order.html',
  styleUrls: ['./all-order.scss']
})
export class AllOrder implements OnInit {

  private orderService = inject(OrderService);

  orders: Order[] = [];
  loading = true;


  // expose status constants to the template (no casts in template)
  public readonly STATUS = {
    COMPLETED: 'completed' as OrderStatus,
    PROCESSING: 'processing' as OrderStatus,
    PENDING: 'pending' as OrderStatus,
    CANCELLED: 'cancelled' as OrderStatus,
    PAID: 'paid' as OrderStatus,
    SHIPPED: 'shipped' as OrderStatus,
    DELIVERED: 'delivered' as OrderStatus
  };


  ngOnInit(): void {
    this.loadOrders();
  }


  loadOrders(): void {
    this.loading = true;
    this.orderService.listMyOrders('admin', true).subscribe({
      next: (res) => {
        this.orders = res || [];
        this.loading = false;
      },
      error: () => {
        this.orders = [];
        this.loading = false;
      }
    });
  }


  updateStatus(orderId: string | number, status: OrderStatus): void {
    const id = String(orderId);
    this.orderService.updateStatus(id, status).subscribe({
      next: () => this.loadOrders(),
      error: () => this.loadOrders()
    });
  }


  cancelOrder(orderId: string | number): void {
    if (!confirm('გსურთ შეკვეთის გაუქმება?')) return;
    const id = String(orderId);
    this.orderService.cancel(id).subscribe({
      next: () => this.loadOrders(),
      error: () => this.loadOrders()
    });
  }

}