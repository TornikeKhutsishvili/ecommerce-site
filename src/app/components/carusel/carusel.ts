import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
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

  @Input() products: dummyProductModel[] = [];
  currentIndex = signal(0);

  currentProduct = computed(() =>
    this.products.length > 0 ? this.products[this.currentIndex()] : null
  );

  nextSlide() {
    if (this.products.length > 0) {
      this.currentIndex.set((this.currentIndex() + 1) % this.products.length);
    }
  }

  prevSlide() {
    if (this.products.length > 0) {
      this.currentIndex.set(
        (this.currentIndex() - 1 + this.products.length) % this.products.length
      );
    }
  }

}
