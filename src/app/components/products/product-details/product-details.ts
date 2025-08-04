import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart-service';
import { ProductService } from '../../../services/product-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetails {

  product = signal<any>('');

  private router = inject(Router);
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
    this.router.navigate(['/']);
  }

}