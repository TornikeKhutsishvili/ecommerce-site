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

import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';
import { FilterService } from '../../../../services/filter-service';
import { SearchService } from '../../../../services/search-service';

@Component({
  selector: 'app-home-decoration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './home-decoration.html',
  styleUrls: ['./home-decoration.scss']
})
export class HomeDecoration implements OnInit {

  // variables
  productsToShow = signal(12);

  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);
  private translate = inject(TranslateService);

  // Computed: filtered + searched + category
  filteredProducts = computed(() => {
    let products = this.filterService.filteredProducts();

    const query = this.searchService.searchQuery().trim().toLowerCase();
    if (query) {
      products = products.filter(p => {
        const title = this.translate.instant(p.title).toLowerCase();
        const category = this.translate.instant(p.category).toLowerCase();
        return title.includes(query) || category.includes(query);
      });
    }

    products = products.filter(p => p.category === 'home-decoration');

    return products;
  });

  ngOnInit() {
    this.productService.getProductsByCategory('home-decoration')
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