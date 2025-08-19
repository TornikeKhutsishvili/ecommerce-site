import {
  forkJoin,
  map,
  Observable,
  of
} from 'rxjs';

import {
  Injectable,
  inject
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { OrderService } from './orders-service';
import { ProductService } from './product-service';
import { CartService } from './cart-service';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class AdminAnalyticsService {

  // Inject services
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private translate = inject(TranslateService);

  /**
   * Loads all analytics data in parallel (orders, products, cart, users)
   */
  loadAnalytics(adminId = 'admin@example.com'): Observable<any> {
    return forkJoin({
      orders: this.orderService.listMyOrders(adminId, true),
      products: this.productService.getProducts(),
      cart: of(this.cartService.cartItems()),
      users: of(this.authService.getAllUsers())
    }).pipe(
      map(({ orders, products, cart, users }: any) => {
        return {
          salesChart: this.buildSalesChart(orders),
          productsChart: this.buildProductsChart(cart),
          usersChart: this.buildUsersChart(users),
          revenueTable: this.buildRevenueTable(orders, products),
          summary: this.buildSummary(orders, products, users, cart)
        };
      })
    );
  }

  // -------------------------
  // Chart & Table Builders
  // -------------------------

  /** Orders by month with revenue */
  private buildSalesChart(orders: any[]): any {
    const grouped: Record<string, number> = {};
    for (const order of orders) {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString('default', { month: 'short' });
      grouped[month] = (grouped[month] || 0) + (order.total || 0);
    }
    return {
      labels: Object.keys(grouped),
      datasets: [
        {
          data: Object.values(grouped),
          label: this.translate.instant('Sales'),
          backgroundColor: '#4bc0c0'
        }
      ]
    };
  }

  /** Products sold from cart items */
  private buildProductsChart(cart: any[]): any {
    const grouped: Record<string, number> = {};
    for (const item of cart) {
      grouped[item.title] = (grouped[item.title] || 0) + item.quantity;
    }
    return {
      labels: Object.keys(grouped),
      datasets: [
        {
          data: Object.values(grouped),
          label: this.translate.instant('Products Sold'),
          backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384', '#4BC0C0', '#9966FF']
        }
      ]
    };
  }

  /** Active vs Inactive users */
  private buildUsersChart(users: any[]): any {
    const active = users.filter(u => u.active).length;
    const inactive = users.length - active;

    return {
      labels: [
        this.translate.instant('Active'),
        this.translate.instant('Inactive')
      ],
      datasets: [
        {
          data: [active, inactive],
          backgroundColor: ['#36A2EB', '#FF6384']
        }
      ]
    };
  }

  /** Revenue table per product */
  private buildRevenueTable(orders: any[], products: any[]): any[] {
    return products.map(p => {
      const totalSold = orders
        .flatMap(o => o.items || [])
        .filter((i: any) => i.productId === p.id)
        .reduce((sum: number, i: any) => sum + i.quantity, 0);

      return {
        product: p.title,
        sold: totalSold,
        revenue: totalSold * p.price
      };
    });
  }

  /** General summary KPIs */
  private buildSummary(orders: any[], products: any[], users: any[], cart: any[]) {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;
    const totalProducts = products.length;
    const cartSize = cart.reduce((sum, i) => sum + i.quantity, 0);

    return {
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
      cartSize
    };
  }
  // -------------------------
  // End of Chart & Table Builders

}
