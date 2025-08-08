import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProductList } from "../products/product-list/product-list";
import { Carusel } from "../carusel/carusel";
import { ProductService } from '../../services/product-service';
import { dummyProductModel } from '../../models/product.model';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  // variables
  carouselProducts = signal<dummyProductModel[]>([]);
  allProducts = signal<dummyProductModel[]>([]);


  private productService = inject(ProductService);


  // ngOnInit
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



  // random carousel
  loadRandomCarousel() {
    this.productService.getRandomProductCarusel().subscribe(data => {
      this.carouselProducts.set(data);
    });
  }

}