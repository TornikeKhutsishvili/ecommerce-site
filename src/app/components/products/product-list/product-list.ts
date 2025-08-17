import {
  AfterViewChecked,
  Component,
  computed,
  effect,
  Inject,
  inject,
  Input,
  OnChanges,
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
  isPlatformBrowser,
  NgOptimizedImage
} from '@angular/common';

import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
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
    AddToasts,
    NgOptimizedImage
],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList implements OnInit, AfterViewChecked, OnChanges {

  @Input() productsInput: any[] = [];

  filteredProducts = signal<any[]>([]);
  caruselProducts = signal<any[]>([]);
  cartItemCount = signal<number>(0);
  page = signal<number>(1);
  itemsPerPage = signal<number>(12);
  stars = signal<any>([1, 2, 3, 4, 5]);

  private filterService = inject(FilterService);
  private cartService = inject(CartService);
  private searchService = inject(SearchService);
  private translate = inject(TranslateService);

  // ViewChild for AddToasts component
  @ViewChild('addToast') addToast!: AddToasts;


  // Paginated view
  readonly paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Reactively update filteredProducts whenever searchQuery or priceFilter changes
    effect(() => {
      this.applyFilters();
    });
  }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    this.filterService.setAllProducts(this.productsInput);

    // Initialize filtered products
    this.filteredProducts.set([...this.productsInput]);

    // Set initial cart count
    this.cartItemCount.set(this.cartService.cartItems().length);
  }


  ngOnChanges() {
    if (this.productsInput && this.productsInput.length) {
      this.filterService.setAllProducts(this.productsInput);
      this.filteredProducts.set([...this.productsInput]);
    }
  }

  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }


  private applyFilters() {
    // let filtered = [...this.productsInput];
    let products = [...this.filterService.filteredProducts()];

    // Search filter (reactive)
    const query = this.searchService.searchQuery().trim().toLowerCase();
    if (query) {
      products = products.filter(p => {
          const title = this.translate.instant(p.title).toLowerCase();
          const category = this.translate.instant(p.category).toLowerCase();
          return title.includes(query) || category.includes(query);
        }
      );
    }

    this.filteredProducts.set(products);
  }


  getStarFillPercent(productRating: number, star: number): number {
    if (star <= Math.floor(productRating)) {
      return 100;
    }
    if (star === Math.floor(productRating) + 1) {
      return (productRating - Math.floor(productRating)) * 100;
    }
    return 0;
  }


  applyPriceFilter(price: number | null) {
    this.filterService.setPriceFilter(price);
  }


  applySort(order: 'low' | 'high') {
    this.filterService.setSortOrder(order);
  }


  showMore() {
    const current = this.page() * this.itemsPerPage();
    const nextPage = Math.min(current + this.itemsPerPage(), this.filteredProducts().length);
    this.page.set(Math.ceil(nextPage / this.itemsPerPage()));
  }


  addToCart(product: dummyProductModel): void {
    this.cartService.addToCart(product);
    this.cartItemCount.set(this.cartService.cartItems().length);
    this.addToast.openToast(`${product.title} added to cart! 🛒`);
  }

}
