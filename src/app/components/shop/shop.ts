import {
  Component,
  Inject,
  inject,
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
export class Shop implements OnInit {

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


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


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
        this.filteredProducts.set(data);
        this.categories.set([...new Set(data.map(p => p.category))]);
      });

    // Subscribe to filtered products updates from the service
    this.filterService.filteredProducts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filtered) => {
        this.filteredProducts.set(filtered);
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
    this.filteredProducts.set(
      this.products().filter(p => p.title.toLowerCase().includes(query))
    );
    this.page.set(1);
  }



  // filter by category
  filterByCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.filteredProducts.set(
      category ? this.products().filter(p => p.category === category) : [...this.products()]
    );
    this.page.set(1);
  }



  // apply Price Filter
  applyPriceFilter(price: number) {
    const filtered = this.filterService.filterByPrice(this.products(), price);
    this.filterService.setFilteredProducts(filtered); // Set filtered products in the service
    this.page.set(1);
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
