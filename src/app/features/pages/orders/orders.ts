import { Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../core/services/auth-service';
import { OrderService } from '../../../core/services/orders-service';
import { Order } from '../../../core/interfaces/order.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss']
})
export class Orders {
  // injects
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

  // variables
  orders = signal<Order[]>([]);
  currentUser = signal<User | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.authService.getUser();
      this.currentUser.set(user);

      if (user) {
        this.orderService.listMyOrders(user.email).subscribe(list => {
          this.orders.set(list);
        });
      }
    }
  }
}
