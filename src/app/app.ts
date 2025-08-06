import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navigation } from "./components/navigation/navigation";
import { dummyProductModel } from './models/product.model';
import { FilterService } from './services/filter-service';
import { SearchService } from './services/search-service';
import { ProductService } from './services/product-service';
import { Footer } from "./components/footer/footer";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    Navigation,
    Footer
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  protected title = 'TKShop';

  items: WritableSignal<any[]> = signal([]);
  filteredItems = signal<any[]>([]);
  priceFilter = signal<number>(0);
  filteredProducts = signal<any[]>([]);
  allProducts = signal<dummyProductModel[]>([]);

  private filterService = inject(FilterService);
  private searchService = inject(SearchService);
  private productService = inject(ProductService);


  ngOnInit() {

    this.productService.getProducts().subscribe((data:any) => {
      this.items.set(data);
      this.filteredItems.set(data);
      this.allProducts.set(data);
      this.filteredProducts.set([...data]);
      this.filterService.setFilteredProducts([...data]);
    });

    this.filterService.filteredProducts$.subscribe((products) => {
      this.filteredProducts.set(products);
      // console.log('Filtered Products from service:', products); // Log to check the products
    });

  }

  onSearch(event: any) {
    const query = event.target.value;
    const searched = this.searchService.search(query, this.items());
    this.filteredItems.set(searched);
    this.applyFilters(); // Apply filters
  }

  onFilterChange(event: any) {
    const value = +event.target.value;
    this.priceFilter.set(value);
    this.applyFilters(); // Apply filters by price
  }

  applyFilters() {
    let filtered = this.items();

    // Use price filter
    if (this.priceFilter() > 0) {
      filtered = this.filterService.filterByPrice(filtered, this.priceFilter());
    }

    // Filter by search keyword
    this.filteredItems.set(filtered);
  }

  applyFilter(filteredProducts: any[]) {
    // console.log("AppComponent received filtered products:", filteredProducts);
    this.filteredProducts.set(filteredProducts);
    this.filterService.setFilteredProducts(filteredProducts); // Save data in the service
  }

}
