import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-furniture',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './furniture.html',
  styleUrls: ['./furniture.scss']
})
export class Furniture {

  products = signal<dummyProductModel[]>([]);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProductsByCategory('furniture').subscribe(data => {
      this.products.set(data);
    });
  }

}
