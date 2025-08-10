import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';

import {
  RouterLink,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { dummyProductModel } from '../../models/product.model';
import { FilterService } from '../../services/filter-service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { AddToasts } from '../toasts/add-toasts/add-toasts';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

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

  private filterSubscription: Subscription | null = null;

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private filterService = inject(FilterService);


  // ngOnInit
  ngOnInit(): void {

    this.productService.getProducts().subscribe(data => {
      this.products.set(data);
      this.filteredProducts.set(data);
      this.categories.set([...new Set(data.map(p => p.category))]);
    });

    // Subscribe to filtered products updates from the service
    this.filterSubscription = this.filterService.filteredProducts$.subscribe((filtered) => {
      this.filteredProducts.set(filtered);
    });

  }


  // search
  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts.set(
      this.products().filter(p => p.title.toLowerCase().includes(query))
    );
  }


  // filter by category
  filterByCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.filteredProducts.set(
      category ? this.products().filter(p => p.category === category) : [...this.products()]
    );
  }


  // apply Price Filter
  applyPriceFilter(price: number) {
    const filtered = this.filterService.filterByPrice(this.products(), price);
    this.filterService.setFilteredProducts(filtered); // Set filtered products in the service
  }


  // ngOnDestroy
  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }


  // add to cart
  addToCart(product: dummyProductModel) {
    this.cartService.addToCart(product);
    this.addToast.openToast(`${product.title} added to cart!`);
  }

}