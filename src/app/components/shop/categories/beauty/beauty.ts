import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';
import { RouterLink, RouterModule } from '@angular/router';
import { FilterService } from '../../../../services/filter-service';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../../services/search-service';

@Component({
  selector: 'app-beauty',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './beauty.html',
  styleUrls: ['./beauty.scss']
})
export class Beauty implements OnInit, OnDestroy {

  products = signal<dummyProductModel[]>([]);
  filteredProducts = signal<dummyProductModel[]>([]);

  private filterSubscription: Subscription | null = null;

  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);


  // ngOnInit
  ngOnInit(): void {

    this.productService.getProductsByCategory('beauty').subscribe(data => {

      this.products.set(data);
      this.filteredProducts.set(data);

      // Insert in filter service
      this.filterService.setFilteredProducts(data);

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
        if (filtered.length > 0) {
          const maxPrice = Math.max(...filtered.map(p => p.price));

          const categoryFiltered = this.products().filter(p => p.price <= maxPrice);
          this.filteredProducts.set(categoryFiltered);
        } else {
          this.filteredProducts.set(this.products());
        }
      });

    });

  }


  // ngOnDestroy
  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

}
