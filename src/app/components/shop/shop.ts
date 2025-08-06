import { Component, inject, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { dummyProductModel } from '../../models/product.model';
import { FilterService } from '../../services/filter-service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteToasts } from '../toasts/delete-toasts/delete-toasts';
import { AcceptToasts } from '../toasts/accept-toasts/accept-toasts';
import { AlertToasts } from '../toasts/alert-toasts/alert-toasts';
import { AddToasts } from '../toasts/add-toasts/add-toasts';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    AddToasts,
    DeleteToasts,
    AlertToasts,
    AcceptToasts
],
  templateUrl: './shop.html'
})
export class Shop {

  products = signal<dummyProductModel[]>([]);
  filteredProducts = signal<dummyProductModel[]>([]);
  categories: string[] = [];

  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;
  @ViewChild('addToast') addToast!: AddToasts;

  private filterSubscription: Subscription | null = null;

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private filterService = inject(FilterService);

  ngOnInit(): void {

    this.productService.getProducts().subscribe(data => {
      this.products.set(data);
      this.filteredProducts.set(data);
      this.categories = [...new Set(data.map(p => p.category))];
    });

    // Subscribe to filtered products updates from the service
    this.filterSubscription = this.filterService.filteredProducts$.subscribe((filtered) => {
      this.filteredProducts.set(filtered);
    });

  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts.set(
      this.products().filter(p => p.title.toLowerCase().includes(query))
    );
  }

  filterByCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.filteredProducts.set(
      category ? this.products().filter(p => p.category === category) : [...this.products()]
    );
  }

  applyPriceFilter(price: number) {
    const filtered = this.filterService.filterByPrice(this.products(), price);
    this.filterService.setFilteredProducts(filtered); // Set filtered products in the service
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  categoryImages: Record<string, string> = {

    beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600',
    fragrances: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600',
    furniture: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600',
    groceries: 'https://images.unsplash.com/photo-1668179456564-db429f9de8e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  };

  addToCart(product: dummyProductModel) {
    this.cartService.addToCart(product);
    this.addToast.openToast(`${product.title} added to cart!`);
  }

}
