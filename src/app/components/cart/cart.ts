import {
  AfterViewChecked,
  Component,
  computed,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterModule
} from '@angular/router';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';
import { SearchService } from '../../services/search-service';
import { FilterService } from '../../services/filter-service';
import { AlertToasts } from "../toasts/alert-toasts/alert-toasts";
import { DeleteToasts } from "../toasts/delete-toasts/delete-toasts";
import AOS from 'aos';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    AlertToasts,
    DeleteToasts
],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart implements OnInit, AfterViewChecked {

  // variables
  private cartService = inject(CartService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);
  private translate = inject(TranslateService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Computed: search + price filter
  filteredProducts = computed(() => {
    // let products = this.cartService.cartItems();
    let products = this.filterService.filteredProducts();

    const cartIds = this.cartService.cartItems().map(p => p.id);
    products = products.filter(p => cartIds.includes(p.id));

    // Search
    const query = this.searchService.searchQuery().trim().toLowerCase();
    if (query) {
      products = products.filter(p => {
          const title = this.translate.instant(p.title).toLowerCase();
          const category = this.translate.instant(p.category).toLowerCase();
          return title.includes(query) || category.includes(query);
        }
      );
    }

    // Add subtotal field
    return products.map(p => ({
      ...p,
      quantity: this.cartService.cartItems().find(ci => ci.id === p.id)?.quantity || 1,
      subtotal: p.price * (this.cartService.cartItems().find(ci => ci.id === p.id)?.quantity || 1)
    }));

  });


  // Computed: total price
  totalPrice = computed(() =>
    this.filteredProducts().reduce((acc, p) => acc + p.subtotal, 0)
  );


  // ViewChild deleteToast
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }


  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }


  updateQuantity(productId: number, quantity: number): void {
    if (quantity >= 1) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.deleteToast.openToast('delete product');
  }

  applyPriceFilter(price: number) {
    this.filterService.priceFilter.set(price);
  }

  updateSearch(query: string) {
    this.searchService.searchQuery.set(query);
  }


  proceedToCheckout(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

}