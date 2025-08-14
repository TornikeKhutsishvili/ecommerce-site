import {
  Component,
  effect,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  Router,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductList } from "../products/product-list/product-list";
import { TranslateModule } from '@ngx-translate/core';
import { Carusel } from "../carusel/carusel";
import { ProductService } from '../../services/product-service';
import { dummyProductModel } from '../../models/product.model';
import { FilterService } from '../../services/filter-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductList,
    Carusel,
    TranslateModule
],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {

  // Signals
  allProducts = signal<dummyProductModel[]>([]);
  carouselProducts = signal<dummyProductModel[]>([]);

  // Inject services
  private router = inject(Router);
  private productService = inject(ProductService);
  private filterService = inject(FilterService);

  // Signals for async data
  private productsSignal = toSignal(this.productService.getProducts());
  private carouselSignal = toSignal(this.productService.getRandomProductCarusel());

  constructor() {

    // All products effect
    effect(() => {
      const data = this.productsSignal();
      if (data) {
        this.allProducts.set(data);
        this.filterService.setAllProducts(data);
      }
    });

    // Initial carousel effect
    effect(() => {
      const data = this.carouselSignal();
      if (data) {
        this.carouselProducts.set(data);
      }
    });

    // Update carousel on route change
    effect(() => {
      const url = this.router.url; // reactive read
      const data = this.carouselSignal(); // read existing signal
      if (data) {
        this.carouselProducts.set(data);
      }
    });

  }

  ngOnInit() {
    this.loadData();
  }

  // load Data
  private loadData() {
    // All products
    this.productService.getProducts().subscribe(data => {
      this.allProducts.set(data);
    });

    // Carousel
    this.productService.getRandomProductCarusel().subscribe(data => {
      this.carouselProducts.set(data);
    });

    // load random carousel
    this.loadRandomCarousel();
  }

  // random carousel
  loadRandomCarousel() {
    this.productService.getRandomProductCarusel().subscribe(data => {
      this.carouselProducts.set(data);
    });
  }

}