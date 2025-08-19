import {
  Component,
  computed,
  effect,
  Inject,
  inject,
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
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from '../../../services/product-service';
import { DeleteToasts } from '../../toasts/delete-toasts/delete-toasts';
import { AcceptToasts } from '../../toasts/accept-toasts/accept-toasts';
import { AlertToasts } from '../../toasts/alert-toasts/alert-toasts';
import { AddToasts } from '../../toasts/add-toasts/add-toasts';
import { SearchService } from '../../../services/search-service';
import { FilterService } from '../../../services/filter-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterLink,
    RouterModule,
    NgxPaginationModule,
    DeleteToasts,
    AcceptToasts,
    AlertToasts,
    AddToasts
],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit, OnChanges {

  // inject services
  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);
  private translate = inject(TranslateService);

  // Reactive signals
  products = signal<any[]>([]);
  loading = signal(true);
  page = signal(1);
  itemsPerPage = signal(25);


  filteredProducts = computed(() => this.filterService.filteredProducts());
  paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });


  // Input products (optional)
  productsInput: any[] = [];


  // ViewChild toasts
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;
  @ViewChild('addToast') addToast!: AddToasts;


  // Constructor with platform ID injection for SSR compatibility
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Reactive effect for search & filters
    effect(() => {
      this.applyFilters();
    });
  }


  // Initialize component
  ngOnInit() {
    this.loadProducts();

    // Initialize all products in FilterService
    this.filterService.setAllProducts(this.productsInput);
  }


  // change detection for input products
  ngOnChanges() {
    if (this.productsInput && this.productsInput.length) {
      this.filterService.setAllProducts(this.productsInput);
    }
  }


  // Load products from ProductService
  private loadProducts() {
    this.loading.set(true);

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.filterService.setAllProducts(data);
        this.loading.set(false);
        this.acceptToast?.openToast('Products loaded successfully');
      },
      error: () => {
        this.alertToast?.openToast('Failed to load products');
        this.loading.set(false);
      }
    });
  }


  // Apply filters based on search and filter service
  private applyFilters() {
    // Search query applied via FilterService
    this.filterService.setSearchQuery(this.searchService.searchQuery());
  }


  // delete product
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = this.products().filter(p => p.id !== id);
      this.products.set(updated);
      this.filterService.setAllProducts(updated);
      this.deleteToast?.openToast(`🗑 Product deleted: ${id}`);
    }
  }


  // Set filters
  applyPriceFilter(price: number | null) { this.filterService.setPriceFilter(price); }
  applySort(order: 'low' | 'high') { this.filterService.setSortOrder(order); }
  applyCategory(category: string) { this.filterService.setCategory(category); }


  // Pagination
  nextPage() { this.page.set(this.page() + 1); }
  prevPage() { if (this.page() > 1) this.page.set(this.page() - 1); }

}
