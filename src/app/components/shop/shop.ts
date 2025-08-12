import {
  AfterViewChecked,
  Component,
  Inject,
  inject,
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
  Subject,
  takeUntil
} from 'rxjs';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { dummyProductModel } from '../../models/product.model';
import { FilterService } from '../../services/filter-service';
import { AddToasts } from '../toasts/add-toasts/add-toasts';
import { SearchService } from '../../services/search-service';
import AOS from 'aos';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    AddToasts,
    NgxPaginationModule,
  ],
  templateUrl: './shop.html',
  styleUrls: ['./shop.scss']
})
export class Shop implements OnInit, OnDestroy, AfterViewChecked {

  // variables
  products = signal<dummyProductModel[]>([]);
  filteredProducts = signal<dummyProductModel[]>([]);
  categories = signal<string[]>([]);
  page = signal<number>(1);
  itemsPerPage = signal<number>(12);


  // ViewChild to addToast
  @ViewChild('addToast') addToast!: AddToasts;

  private destroy$ = new Subject<void>();

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  selectedCategory = signal<string>('all');


  // ngOnInit
  ngOnInit(): void {

    // AOS init
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.products.set(data);

        const cats = Array.from(new Set(data.map(p => p.category)));
        this.categories.set([...cats]);

        this.filteredProducts.set(data);
      });

    // Subscribe to filtered products updates from the service
    this.filterService.filteredProducts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filtered) => {
        this.filteredProducts.set(filtered);
      });

    // In SearchService
    this.searchService.searchQuery$
      .pipe(takeUntil(this.destroy$))
      .subscribe(query => {
        this.applyAllFilters(query);
      });

  }



  // AOS refresh
  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh(); // Reflects changes in animations
    }
  }



  // search
  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchService.updateSearchQuery(query);
    this.page.set(1);
  }



  // filter by category
  filterByCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(category);
    this.applyAllFilters(this.searchService.getSearchQueryValue());
    this.page.set(1);
  }



  // apply Price Filter
  applyPriceFilter(price: number) {
    this.applyAllFilters(this.searchService.getSearchQueryValue(), price);
    this.page.set(1);
  }



  // In the main filtering function, we collect all the criteria - category, search, price
  private applyAllFilters(searchQuery: string, maxPrice?: number) {

    // Let's start with the product.
    let filtered = [...this.products()];

    // If category is not All, filter by category
    const cat = this.selectedCategory();
    if (cat && cat !== 'all') {
      filtered = filtered.filter(p => p.category === cat);
    }

    // Search using the search() method of SearchService (which uses Georgian-English regex)
    filtered = this.searchService.search(searchQuery, filtered);

    // Price filter if maxPrice is present
    if (maxPrice !== undefined) {
      filtered = this.filterService.filterByPrice(filtered, maxPrice);
    }

    // Update on both signals
    this.filteredProducts.set(filtered);
    this.filterService.setFilteredProducts(filtered);

  }



  // add to cart
  addToCart(product: dummyProductModel) {
    this.cartService.addToCart(product);
    this.addToast.openToast(`${product.title} added to cart! 🛒`);
  }



  // ngOnDestroy
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
