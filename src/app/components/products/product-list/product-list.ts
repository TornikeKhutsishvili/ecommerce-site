import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterService } from '../../../services/filter-service';
import { ProductService } from '../../../services/product-service';
import { CartService } from '../../../services/cart-service';
import { SearchService } from '../../../services/search-service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { AddToasts } from '../../toasts/add-toasts/add-toasts';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgxPaginationModule,
    TranslateModule,
    AddToasts
],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList {

  products = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);
  caruselProducts = signal<any[]>([]);
  cartItemCount = signal<number>(0);
  page = signal<number>(1);
  itemsPerPage = signal<number>(12);

  private filterSubscription: Subscription | null = null;

  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private cartService = inject(CartService);
  private searchService = inject(SearchService);

  @ViewChild('addToast') addToast!: AddToasts;

  readonly paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });

  ngOnInit() {

    // filtered products
    this.productService.getProducts().subscribe((data: any) => {

      this.products.set(data);
      // console.log('HomeComponent received all products:', this.products());

      // Check if there are already filtered products in the service
      this.filteredProducts.set(this.filterService.getFilteredProducts());
      // console.log('HomeComponent received filtered products:', this.filteredProducts());

      // If no filtered products, set all products to filtered
      if (!this.filteredProducts().length) {
        this.filteredProducts.set([...this.products()]);
      }

      // Subscribe to filtered products updates from the service
      this.filterSubscription = this.filterService.filteredProducts$.subscribe((filtered) => {
        this.filteredProducts.set(filtered);
        // console.log('Filtered updated:', filtered);
      });

    });

    // search
    this.searchService.searchQuery$.subscribe(query => {
      const filtered = this.products().filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
      this.filteredProducts.set(filtered);
    });

    // cart item count
    this.cartItemCount.set(this.cartService.getCartItems().length);
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  // Example of how to apply a filter or change data
  applyPriceFilter(price: number) {
    const filtered = this.filterService.filterByPrice(this.products(), price);
    this.filterService.setFilteredProducts(filtered); // Set filtered products in the service
  }

  // cart
  addToCart(product: any): void {
    this.cartService.addToCart(product); // add product in cart
    this.cartItemCount.set(this.cartService.getCartItems().length);
    this.addToast.openToast('Product added to cart! 🛒');
  }

}
