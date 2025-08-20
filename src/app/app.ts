import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';

import {
  RouterModule,
  RouterOutlet
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navigation } from "./components/navigation/navigation";
import { dummyProductModel } from './models/product.model';
import { FilterService } from './services/filter-service';
import { SearchService } from './services/search-service';
import { ProductService } from './services/product-service';
import { Footer } from "./components/footer/footer";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    Navigation,
    Footer
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  protected title = 'TKShop';

  items: WritableSignal<dummyProductModel[]> = signal([]);
  priceFilter = signal<number | null>(null);
  searchQuery = signal<string>('');

  private filterService = inject(FilterService);
  private searchService = inject(SearchService);
  private productService = inject(ProductService);

  // Computed: filtered products by search + price
  filteredProducts = computed(() => {
    let products = this.items();

    // Apply search filter
    const query = this.searchQuery().trim().toLowerCase();
    if (query) {
      products = products.filter(p =>
        p.title?.toLowerCase().includes(query)
      );
    }

    // Apply price filter using FilterService's priceFilter
    const maxPrice = this.filterService.priceFilter();
    if (maxPrice != null) {
      products = products.filter(p => p.price <= maxPrice);
    }

    return products;
  });

  ngOnInit() {
    this.productService.getProducts().subscribe((data: dummyProductModel[]) => {
      this.items.set(data);
    });
  }

  // Update search query
  onSearch(event: any) {
    this.searchQuery.set(event.target.value);
  }

  // Update price filter
  onFilterChange(event: any) {
    const value = +event.target.value;
    this.filterService.priceFilter.set(value > 0 ? value : null);
  }

  // Apply filtered products from child component
  applyFilter(filteredProducts: dummyProductModel[]) {
    this.items.set(filteredProducts);
  }

}