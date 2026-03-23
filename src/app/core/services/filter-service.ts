import { computed, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { dummyProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  // Filters
  priceFilter = signal<number | null>(null);
  sortOrder = signal<'low' | 'high' | null>(null);
  categoryFilter = signal<string>('all');
  searchFilter = signal<string>('');

  // All products (raw)
  private allProducts = signal<dummyProductModel[]>([]);
  private translate = inject(TranslateService);

  // Filtered + Sorted
  filteredProducts = computed(() => {
    let items = [...this.allProducts()];

    // Category
    const category = this.categoryFilter();
    if (category && category !== 'all') items = items.filter(p => p.category === category);

    // Search filter
    const search = this.searchFilter().toLowerCase();
    if (search) {
      items = items.filter(p => {
        const title = this.translate.instant(p.title)?.toLowerCase() || '';
        const category = this.translate.instant(p.category)?.toLowerCase() || '';

        return (
          title.includes(search) ||
          category.includes(search)
        );
      });
    }

    // Price
    const maxPrice = this.priceFilter();
    if (maxPrice != null) {
      items = items.filter(p => p.price <= maxPrice);
    }

    // Sort
    const order = this.sortOrder();
    if (order) {
      items = items.sort((a, b) =>
        order === 'low' ? a.price - b.price : b.price - a.price
      );
    }

    return items;
  });

  // Setters
  setAllProducts(products: dummyProductModel[]) { this.allProducts.set(products) }
  setPriceFilter(price: number | null) { this.priceFilter.set(price) }
  setSortOrder(order: 'low' | 'high' | null) { this.sortOrder.set(order) }
  setCategory(category: string) { this.categoryFilter.set(category) }
  setSearchQuery(query: string) { this.searchFilter.set(query) }

  // Getter
  getFilteredProducts(): dummyProductModel[] { return this.filteredProducts() }
}
