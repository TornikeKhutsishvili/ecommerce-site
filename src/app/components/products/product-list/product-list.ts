import {
  AfterViewChecked,
  Component,
  computed,
  Inject,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild
} from '@angular/core';

import {
  RouterLink,
  RouterModule
} from '@angular/router';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterService } from '../../../services/filter-service';
import { CartService } from '../../../services/cart-service';
import { SearchService } from '../../../services/search-service';
import { AddToasts } from '../../toasts/add-toasts/add-toasts';
import { dummyProductModel } from '../../../models/product.model';
import AOS from 'aos';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    NgxPaginationModule,
    TranslateModule,
    AddToasts
],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList implements OnInit, OnDestroy, AfterViewChecked, OnChanges {

  // This is where the Home data comes from
  @Input() productsInput: any[] = [];

  filteredProducts = signal<any[]>([]);
  caruselProducts = signal<any[]>([]);
  cartItemCount = signal<number>(0);
  page = signal<number>(1);
  itemsPerPage = signal<number>(12);
  stars = signal<any>([1, 2, 3, 4, 5]);

  private filterSubscription: Subscription | null = null;

  private filterService = inject(FilterService);
  private cartService = inject(CartService);
  private searchService = inject(SearchService);

  @ViewChild('addToast') addToast!: AddToasts;

  readonly paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    // We set filteredProducts directly from Input
    this.filteredProducts.set([...this.productsInput]);

    // If a filter already exists in the filterService — we set it
    const existingFiltered = this.filterService.getFilteredProducts();
    if (existingFiltered.length) {
      this.filteredProducts.set(existingFiltered);
    }

    // listening to search
    this.searchService.searchQuery$.subscribe(query => {
      const filtered = this.searchService.search(query, this.productsInput);
      this.filteredProducts.set(filtered);
    });

    // listening to filterService
    this.filterSubscription = this.filterService.filteredProducts$.subscribe((filtered) => {
      this.filteredProducts.set(filtered);
    });

    // Cart quantity
    this.cartItemCount.set(this.cartService.getCartItems().length);
  }

  // when will be change to routing
  ngOnChanges() {
    if(this.productsInput && this.productsInput.length) {
      this.filteredProducts.set([...this.productsInput]);
    }
  }

  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  // stars fill percent
  getStarFillPercent(productRating: number, star: number): number {
    if (star <= Math.floor(productRating)) {
      return 100;
    }
    if (star === Math.floor(productRating) + 1) {
      return (productRating - Math.floor(productRating)) * 100;
    }
    return 0;
  }

  applyPriceFilter(price: number) {
    const filtered = this.filterService.filterByPrice(this.productsInput, price);
    this.filterService.setFilteredProducts(filtered);
  }

  addToCart(product: dummyProductModel): void {
    this.cartService.addToCart(product);
    this.cartItemCount.set(this.cartService.getCartItems().length);
    this.addToast.openToast(`${product.title} added to cart! 🛒`);
  }

}
