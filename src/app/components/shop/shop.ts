import {
  AfterViewChecked,
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
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
export class Shop implements OnInit, AfterViewChecked {

  categories = signal<string[]>([]);
  page = signal<number>(1);
  itemsPerPage = signal<number>(12);

  @ViewChild('addToast') addToast!: AddToasts;

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);
  private translate = inject(TranslateService);


  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    this.productService.getProducts().subscribe(data => {
      this.filterService.setAllProducts(data);
      const cats = Array.from(new Set(data.map(p => p.category)));
      this.categories.set([...cats]);
    });
  }

  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }

  // Filter changes
  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.trim();
    this.filterService.setSearchQuery(query);
    this.page.set(1);
  }

  filterByCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.filterService.setCategory(category);
    this.page.set(1);
  }

  applyPriceFilter(price: number) {
    this.filterService.setPriceFilter(price);
    this.page.set(1);
  }

  applySort(order: 'low' | 'high' | null) {
    this.filterService.setSortOrder(order);
    this.page.set(1);
  }

  get AllFilteredProducts() {
    return this.filterService.filteredProducts();
  }

  addToCart(product: dummyProductModel) {
    this.cartService.addToCart(product);
    this.addToast.openToast(`${product.title} added to cart! 🛒`);
  }

}