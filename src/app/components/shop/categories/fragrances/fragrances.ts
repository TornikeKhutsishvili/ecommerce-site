import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-fragrances',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './fragrances.html',
  styleUrls: ['./fragrances.scss']
})
export class Fragrances {

  products = signal<dummyProductModel[]>([]);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProductsByCategory('fragrances').subscribe(data => {
      this.products.set(data);
    });
  }

}
