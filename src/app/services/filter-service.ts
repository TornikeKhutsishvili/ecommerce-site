import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filteredProducts = signal<any[]>([]); // save filtered products

  // Create a BehaviorSubject to hold filtered products
  private filteredProductsSubject = new BehaviorSubject<any[]>(this.filteredProducts()); // Start with an empty array
  filteredProducts$ = this.filteredProductsSubject.asObservable(); // Observable to subscribe to

  // Set filtered products and notify subscribers
  setFilteredProducts(products: any[]) {
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

}
