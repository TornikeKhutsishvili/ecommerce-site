import {
  Component,
  computed,
  Input,
  signal
} from '@angular/core';

import {
  CommonModule,
  NgOptimizedImage
} from '@angular/common';

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
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './carusel.html',
  styleUrls: ['./carusel.scss']
})
export class Carusel {


  // get products
  @Input() products: dummyProductModel[] = [];


  // current Index
  currentIndex = signal(0);

  // stars
  stars = signal<any>([1, 2, 3, 4, 5]);

  // current product
  currentProduct = computed(() =>
    this.products.length > 0 ? this.products[this.currentIndex()] : null
  );


  // get star fill percent
  getStarFillPercent(productRating: number, star: number): number {
    if (star <= Math.floor(productRating)) {
      return 100;
    }
    if (star === Math.floor(productRating) + 1) {
      return (productRating - Math.floor(productRating)) * 100;
    }

    return 0;
  }


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