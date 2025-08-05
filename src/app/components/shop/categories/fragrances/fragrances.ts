import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';
import { RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterService } from '../../../../services/filter-service';
import { SearchService } from '../../../../services/search-service';

@Component({
  selector: 'app-fragrances',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './fragrances.html',
  styleUrls: ['./fragrances.scss']
})
export class Fragrances implements OnInit, OnDestroy {

  products = signal<dummyProductModel[]>([]);
  filteredProducts = signal<dummyProductModel[]>([]);

  private filterSubscription: Subscription | null = null;

  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);


  // ngOnInit
  ngOnInit(): void {

    this.productService.getProductsByCategory('fragrances').subscribe(data => {

      this.products.set(data);
      this.filteredProducts.set(data);

      // Check if there are already filtered products in the service
      this.filteredProducts.set(this.filterService.getFilteredProducts());

      // Insert in filter service
      this.filterService.setFilteredProducts(this.products());

      // search products
      this.searchService.searchQuery$.subscribe(query => {
        const filtered = this.products().filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
        this.filteredProducts.set(filtered);
      });

      // Subscribe to filtered products updates from the service
      this.filterSubscription = this.filterService.filteredProducts$.subscribe((filtered) => {
        this.filteredProducts.set(filtered);
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
