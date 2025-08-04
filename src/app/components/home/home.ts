import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductList } from "../products/product-list/product-list";
import { Carusel } from "../carusel/carusel";
import { ProductService } from '../../services/product-service';
import { dummyProductModel } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductList,
    Carusel
],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {

  private productService = inject(ProductService);
  carouselProducts = signal<dummyProductModel[]>([]);
  allProducts = signal<dummyProductModel[]>([]);

  ngOnInit() {

    // All products
    this.productService.getProducts().subscribe(data => {
      this.allProducts.set(data);
    });

    // carousel
    this.productService.getRandomProductCarusel().subscribe(data => {
      this.carouselProducts.set(data)
    });

    // random carousel
    this.loadRandomCarousel();
  }

  loadRandomCarousel() {
    this.productService.getRandomProductCarusel().subscribe(data => {
      this.carouselProducts.set(data);
    });
  }

}