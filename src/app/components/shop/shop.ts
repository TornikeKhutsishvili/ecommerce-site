import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dummyProductModel } from '../../models/product.model';
import { CartService } from '../../services/cart-service';
import { ProductService } from '../../services/product-service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './shop.html',
  styleUrls: ['./shop.scss']
})
export class Shop {

  products = signal<dummyProductModel[]>([]);
  filteredProducts = signal<dummyProductModel[]>([]);
  categories: string[] = [];

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products.set(data);
      this.filteredProducts.set(data);

      // categories list
      this.categories = [...new Set(data.map(p => p.category))];
    });
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts.set(
      this.products().filter(p => p.title.toLowerCase().includes(query))
    );
  }

  filterByCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.filteredProducts.set(
      category ? this.products().filter(p => p.category === category) : [...this.products()]
    );
  }

  addToCart(product: dummyProductModel) {
    this.cartService.addToCart(product);
    alert(`${product.title} added to cart!`);
  }

}