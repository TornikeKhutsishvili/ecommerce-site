import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private translate =inject(TranslateService);

  private filteredProducts = signal<any[]>([]); // save filtered products
  // private originalProducts = signal<any[]>([]);

  // Create a BehaviorSubject to hold filtered products
  private filteredProductsSubject = new BehaviorSubject<any[]>(this.filteredProducts()); // Start with an empty array
  filteredProducts$ = this.filteredProductsSubject.asObservable(); // Observable to subscribe to

  // Set filtered products and notify subscribers
  setFilteredProducts(products: any[]) {
    // this.originalProducts.set(products);
    this.filteredProducts.set(products);
    this.filteredProductsSubject.next(this.filteredProducts());  // Update the BehaviorSubject
  }

  // Get filtered products directly from the service (it returns the current state)
  getFilteredProducts(): any[] {
    return this.filteredProducts();
  }

  // Apply price filter
  filterByPrice(items: any[] | undefined, price: number): any[] {
    if (!items) {
      return [];
    }
    return items.filter(item => item.price <= price);
  }

  // Sort products by price
  sortByPrice(items: any[], order: string): any[] {
    return items.sort((a, b) => order === 'low' ? a.price - b.price : b.price - a.price);
  }

  // filterByPrice(price: number): any[] {
  //   const filtered = this.originalProducts.filter(item => item.price <= price);
  //   this.filteredProducts.set(filtered);
  //   this.filteredProductsSubject.next(filtered);
  //   return filtered;
  // }

  // sortByPrice(order: string): any[] {
  //   const sorted = [...this.originalProducts()].sort((a, b) =>
  //     order === 'low' ? a.price - b.price : b.price - a.price
  //   );
  //   this.filteredProducts.set(sorted);
  //   this.filteredProductsSubject.next(sorted);
  //   return sorted;
  // }

}
