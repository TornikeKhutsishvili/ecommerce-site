import {
  Component,
  computed,
  Input,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { dummyProductModel } from '../../models/product.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-carusel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './carusel.html',
  styleUrls: ['./carusel.scss']
})
export class Carusel {


  // get products
  @Input() products: dummyProductModel[] = [];


  // current Index
  currentIndex = signal(0);


  // current product
  currentProduct = computed(() =>
    this.products.length > 0 ? this.products[this.currentIndex()] : null
  );


  // next slide
  nextSlide() {
    if (this.products.length > 0) {
      this.currentIndex.set((this.currentIndex() + 1) % this.products.length);
    }
  }


  // previous slide
  prevSlide() {
    if (this.products.length > 0) {
      this.currentIndex.set(
        (this.currentIndex() - 1 + this.products.length) % this.products.length
      );
    }
  }

}