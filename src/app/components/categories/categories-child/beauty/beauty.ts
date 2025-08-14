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

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';
import { FilterService } from '../../../../services/filter-service';
import { SearchService } from '../../../../services/search-service';

@Component({
  selector: 'app-beauty',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './beauty.html',
  styleUrls: ['./beauty.scss']
})
export class Beauty implements OnInit {

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

    products = products.filter(p => p.category === 'beauty');

    return products;
  });

  ngOnInit() {
    this.productService.getProductsByCategory('beauty')
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