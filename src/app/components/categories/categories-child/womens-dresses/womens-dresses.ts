import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';

import {
  RouterLink,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';
import { FilterService } from '../../../../services/filter-service';
import { SearchService } from '../../../../services/search-service';

@Component({
  selector: 'app-womens-dresses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './womens-dresses.html',
  styleUrls: ['./womens-dresses.scss']
})
export class WomensDresses implements OnInit, OnDestroy {

  // variables
  products = signal<dummyProductModel[]>([]);
  filteredProducts = signal<dummyProductModel[]>([]);

  private destroy$ = new Subject<void>();

  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);


  // Show products
  productsToShow = signal(12);

  get visibleProducts() {
    return this.filteredProducts().slice(0, this.productsToShow());
  }

  showMore() {
    const currentCount = this.productsToShow();
    const filteredCount = this.filteredProducts().length;
    const nextCount = Math.min(currentCount + 8, filteredCount);
    this.productsToShow.set(nextCount);
  }


  ngOnInit(): void {

    this.productService.getProductsByCategory('womens-dresses')
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.products.set(data);
      this.filteredProducts.set(data);

      this.filterService.setFilteredProducts(data);
      });


    // Search filter
    this.searchService.searchQuery$
      .pipe(takeUntil(this.destroy$))
      .subscribe(query => {
        if (!query.trim()) {
          this.filteredProducts.set(this.products());
        } else {

          const filtered = this.products().filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );
          this.filteredProducts.set(filtered);

        }
      });


    // Category filter
    this.filterService.filteredProducts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filtered => {
        if (filtered.length > 0) {

          const categoryFiltered = filtered.filter(p => p.category === 'womens-dresses');
          this.filteredProducts.set(categoryFiltered);

        } else {
          this.filteredProducts.set(this.products());
        }
      });

  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}