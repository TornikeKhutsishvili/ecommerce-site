import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dummyProductModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-beauty',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './beauty.html',
  styleUrls: ['./beauty.scss']
})
export class Beauty {

  products = signal<dummyProductModel[]>([]);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProductsByCategory('beauty').subscribe(data => {
      this.products.set(data);
    });
  }

}