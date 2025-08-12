import {
  AfterViewChecked,
  Component,
  computed,
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
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterService } from '../../../services/filter-service';
import { ProductService } from '../../../services/product-service';
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
export class ProductList implements OnInit, OnDestroy, AfterViewChecked {

  // variables
  products = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);
  caruselProducts = signal<any[]>([]);
  cartItemCount = signal<number>(0);
  page = signal<number>(1);
  itemsPerPage = signal<number>(12);
  stars = signal<any>([1, 2, 3, 4, 5]);

  private filterSubscription: Subscription | null = null;

  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private cartService = inject(CartService);
  private searchService = inject(SearchService);


  // ViewChild addToast
  @ViewChild('addToast') addToast!: AddToasts;


  // how many product should be one page
  readonly paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  // ngOnInit
  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    // filtered products
    this.productService.getProducts().subscribe((data: any) => {
      this.products.set(data);
      this.filteredProducts.set([...data]);

      // Check if there are already filtered products in the service
      this.filteredProducts.set(this.filterService.getFilteredProducts());


      // If no filtered products, set all products to filtered
      if (!this.filteredProducts().length) {
        this.filteredProducts.set([...this.products()]);
      }

      // search
      this.searchService.searchQuery$.subscribe(query => {
        const filtered = this.searchService.search(query, this.products());
        this.filteredProducts.set(filtered);
      });

      // Subscribe to filtered products updates from the service
      this.filterSubscription = this.filterService.filteredProducts$.subscribe((filtered) => {
        this.filteredProducts.set(filtered);
      });

    });


    // cart item count
    this.cartItemCount.set(this.cartService.getCartItems().length);

  }



  // AOS refresh
  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh(); // Reflects changes in animations
    }
  }



  // ng on destroy
  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }


  // get star class
  // getStarClass(productRating: number, star: number): string {
  //   const fullStars = Math.floor(productRating);
  //   const decimal = productRating - fullStars;

  //   if (star <= fullStars) {
  //     return 'bi-star-fill text-warning';
  //   }

  //   if (star === fullStars + 1) {
  //     if (decimal >= 0.75) {
  //       return 'bi-star-fill text-warning';
  //     }
  //     if (decimal >= 0.25) {
  //       return 'bi-star-half text-warning';
  //     }
  //   }

  //   return 'bi-star text-secondary';
  // }


  // get star fill percent
  getStarFillPercent(productRating: number, star: number): number {
    if (star <= Math.floor(productRating)) {
      return 100;
    }
    if (star === Math.floor(productRating) + 1) {
      return (productRating - Math.floor(productRating)) * 100;
    }

    return 0;
  }


  // Example of how to apply a filter or change data
  applyPriceFilter(price: number) {
    const filtered = this.filterService.filterByPrice(this.products(), price);
    this.filterService.setFilteredProducts(filtered); // Set filtered products in the service
  }



  // cart
  addToCart(product: dummyProductModel): void {
    this.cartService.addToCart(product); // add product in cart
    this.cartItemCount.set(this.cartService.getCartItems().length);
    this.addToast.openToast(`${product.title} added to cart! 🛒`);
  }

}
