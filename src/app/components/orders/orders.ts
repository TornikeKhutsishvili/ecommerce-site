import {
  Component,
  Inject,
  inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

import {
  Router,
  RouterModule
} from '@angular/router';

import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';
import { OrderService } from '../../services/orders-service';

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

  // variables
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private translate = inject(TranslateService);


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    }
  }


}
