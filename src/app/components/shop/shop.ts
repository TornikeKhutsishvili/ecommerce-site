import {
  Component,
  inject,
  signal,
  ViewChild
} from '@angular/core';

import { RouterLink, RouterModule } from '@angular/router';
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
  templateUrl: './shop.html'
})
export class Shop {

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



  // categories image
  categoryImages: Record<string, string> = {

    'beauty': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=cover&q=50&auto=format',
    'fragrances': 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=400&fit=cover&q=50&auto=format',
    'furniture': 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=400&fit=cover&q=50&auto=format',
    'groceries': 'https://images.unsplash.com/photo-1668179456564-db429f9de8e8?w=400&h=400&fit=cover&q=50&auto=format',
    'home-decoration': 'https://plus.unsplash.com/premium_photo-1678402545080-2353b489c0c3?w=400&h=400&fit=cover&q=50&auto=format',
    'kitchen-accessories': 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=400&h=400&fit=cover&q=50&auto=format',
    'laptops': 'https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?w=400&h=400&fit=cover&q=50&auto=format',
    'mens-shirts': 'https://images.unsplash.com/photo-1624222244232-5f1ae13bbd53?w=400&h=400&fit=cover&q=50&auto=format',
    'mens-shoes': 'https://images.unsplash.com/photo-1617689563472-c66428e83d17?w=400&h=400&fit=cover&q=50&auto=format',
    'mens-watches': 'https://images.unsplash.com/photo-1703505841379-2f863b201212?w=400&h=400&fit=cover&q=50&auto=format',
    'mobile-accessories': 'https://images.unsplash.com/photo-1566793474285-2decf0fc182a?w=400&h=400&fit=cover&q=50&auto=format',
    'motorcycle': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&h=400&fit=cover&q=50&auto=format',
    'skin-care': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=cover&q=50&auto=format',
    'smartphones': 'https://images.unsplash.com/photo-1672413514634-4781b15fd89e?w=400&h=400&fit=cover&q=50&auto=format',
    'sports-accessories': 'https://plus.unsplash.com/premium_photo-1709932755399-b61bb0a3aa2a?w=400&h=400&fit=cover&q=50&auto=format',
    'sunglasses': 'https://images.unsplash.com/photo-1502767089025-6572583495f9?w=400&h=400&fit=cover&q=50&auto=format',
    'tablets': 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=400&h=400&fit=cover&q=50&auto=format',
    'tops': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=cover&q=50&auto=format',
    'vehicle': 'https://plus.unsplash.com/premium_photo-1698080249116-de37e81e568e?w=400&h=400&fit=cover&q=50&auto=format',
    'womens-bags': 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=400&h=400&fit=cover&q=50&auto=format',
    'womens-dresses': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=cover&q=50&auto=format',
    'womens-jewellery': 'https://plus.unsplash.com/premium_photo-1661645433820-24c8604e4db5?w=400&h=400&fit=cover&q=50&auto=format',
    'womens-shoes': 'https://images.unsplash.com/photo-1670938258821-2956d4ce9c9b?w=400&h=400&fit=cover&q=50&auto=format',
    'womens-watches': 'https://images.unsplash.com/photo-1653651461471-d4dffd0e5ab0?w=400&h=400&fit=cover&q=50&auto=format'

  };



  // add to cart
  addToCart(product: dummyProductModel) {
    this.cartService.addToCart(product);
    this.addToast.openToast(`${product.title} added to cart!`);
  }

}