import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';
import { RouterLink, RouterModule } from '@angular/router';
import { FilterService } from '../../../../services/filter-service';
import { SearchService } from '../../../../services/search-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-furniture',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './furniture.html',
  styleUrls: ['./furniture.scss']
})
export class Furniture implements OnInit, OnDestroy {

  products = signal<dummyProductModel[]>([]);
  filteredProducts = signal<dummyProductModel[]>([]);

  private filterSubscription: Subscription | null = null;

  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);


  // ngOnInit
  ngOnInit(): void {

    this.productService.getProductsByCategory('furniture').subscribe(data => {

      this.products.set(data);
      this.filteredProducts.set(data);

      // Insert in filter service
      this.filterService.setFilteredProducts(this.products());

      // search products
      this.searchService.searchQuery$.subscribe(query => {
        if (!query.trim()) {
          this.filteredProducts.set(this.products()); // All on empty
        } else {
          const filtered = this.products().filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );

          this.filteredProducts.set(filtered);
        }
      });

      // Subscribe to filtered products updates from the service
      this.filterSubscription = this.filterService.filteredProducts$.subscribe(filtered => {
        this.filteredProducts.set(filtered.length > 0 ? filtered : this.products());
      });

    });

  }


  // apply filter
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

}
