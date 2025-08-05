import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';

@Component({
  selector: 'app-groceries',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './groceries.html',
  styleUrls: ['./groceries.scss']
})
export class Groceries {

  products = signal<dummyProductModel[]>([]);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProductsByCategory('groceries').subscribe(data => {
      this.products.set(data);
    });
  }

}
