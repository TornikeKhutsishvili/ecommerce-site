import {
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  RouterLink,
  RouterModule
} from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';
import { SearchService } from '../../../../services/search-service';
import { FilterService } from '../../../../services/filter-service';

@Component({
  selector: 'app-groceries',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './groceries.html',
  styleUrls: ['./groceries.scss']
})
export class Groceries implements OnInit {

  // variables
  productsToShow = signal(12);

  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);

  // Computed: filtered + searched + category
  filteredProducts = computed(() => {
    let products = this.filterService.filteredProducts();

    const query = this.searchService.searchQuery().trim().toLowerCase();
    if (query) {
      products = products.filter(p =>
        p.title?.toLowerCase().includes(query)
      );
    }

    products = products.filter(p => p.category === 'groceries');

    return products;
  });

  ngOnInit() {
    this.productService.getProductsByCategory('groceries')
      .subscribe((data: dummyProductModel[]) => {
        this.filterService.setAllProducts(data);
      });
  }

  showMore() {
    const currentCount = this.productsToShow();
    const filteredCount = this.filteredProducts().length;
    const nextCount = Math.min(currentCount + 8, filteredCount);
    this.productsToShow.set(nextCount);
  }

  get visibleProducts() {
    return this.filteredProducts().slice(0, this.productsToShow());
  }

}