import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart-service';
import { ProductService } from '../../../services/product-service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetails {

  product = signal<any>('');

  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    const id = Number(productId);
    if (productId) {
      this.productService.getProductById(id).subscribe((data) => {
        this.product.set(data);
      });
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    alert('Product added to cart! 🛒');
  }

  goBack() {
    this.location.back();
  }

}